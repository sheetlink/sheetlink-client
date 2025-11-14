// rules.js - Rules engine for transaction categorization

import { CONFIG } from '../config.js';

/**
 * Rules schema (from Rules tab):
 * active | match_type | pattern | category_code
 *
 * match_type can be:
 * - exact: exact match on transaction name/merchant
 * - contains: substring match (case insensitive)
 * - regex: regular expression match
 * - signature: matches amount + normalized description
 */

/**
 * Get settings from chrome storage
 * @returns {Promise<object>} Settings object
 */
async function getSettings() {
  const settings = await chrome.storage.sync.get([
    'enableRulesTab',
    'rulesTabName',
    'enableMLAssist',
    'mlConfidenceThreshold'
  ]);

  return {
    enableRulesTab: settings.enableRulesTab || false,
    rulesTabName: settings.rulesTabName || 'Rules',
    enableMLAssist: settings.enableMLAssist || false,
    mlConfidenceThreshold: settings.mlConfidenceThreshold || 0.7
  };
}

/**
 * Get auth token via service worker
 * @returns {Promise<string>} OAuth token
 */
async function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: 'GET_AUTH_TOKEN' },
      (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response.token);
        }
      }
    );
  });
}

/**
 * Read rules from Google Sheets
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Rules tab name
 * @returns {Promise<array>} Array of rule objects
 */
async function readRules(sheetId, tabName) {
  try {
    const token = await getAuthToken();

    // Read entire Rules tab
    const range = `${tabName}!A:D`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // If rules tab doesn't exist, return empty array
      if (response.status === 400) {
        return [];
      }
      throw new Error(`Failed to read rules: ${response.statusText}`);
    }

    const data = await response.json();
    const values = data.values || [];

    if (values.length === 0) {
      return [];
    }

    // Skip header row and parse rules
    const rules = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];

      // Skip empty rows
      if (!row || row.length === 0) {
        continue;
      }

      // Parse rule
      const active = row[0]?.toString().toLowerCase() === 'true' || row[0] === '1' || row[0] === 'yes';
      const matchType = row[1]?.toString().toLowerCase().trim() || 'contains';
      const pattern = row[2]?.toString().trim() || '';
      const categoryCode = row[3]?.toString().trim() || '';

      // Only add active rules with valid patterns
      if (active && pattern && categoryCode) {
        rules.push({
          matchType,
          pattern,
          categoryCode
        });
      }
    }

    return rules;
  } catch (error) {
    console.error('Error reading rules:', error);
    return [];
  }
}

/**
 * Normalize text for matching (lowercase, trim, remove extra spaces)
 * @param {string} text - Text to normalize
 * @returns {string} Normalized text
 */
function normalizeText(text) {
  if (!text) return '';
  return text.toString().toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Check if a transaction matches a rule
 * @param {object} transaction - Transaction object
 * @param {object} rule - Rule object
 * @returns {boolean} True if match
 */
function matchesRule(transaction, rule) {
  const descriptionRaw = normalizeText(transaction.description_raw || transaction.name || '');
  const merchantName = normalizeText(transaction.merchant_name || '');
  const combinedText = `${descriptionRaw} ${merchantName}`;
  const pattern = rule.pattern;

  try {
    switch (rule.matchType) {
      case 'exact':
        // Exact match on either description or merchant
        return normalizeText(pattern) === descriptionRaw ||
               normalizeText(pattern) === merchantName;

      case 'contains':
        // Substring match (case insensitive)
        return combinedText.includes(normalizeText(pattern));

      case 'regex':
        // Regular expression match
        const regex = new RegExp(pattern, 'i');
        return regex.test(descriptionRaw) || regex.test(merchantName);

      case 'signature':
        // Signature match: amount + normalized description
        // Format: "amount:description" e.g., "50.00:starbucks"
        const parts = pattern.split(':');
        if (parts.length !== 2) {
          return false;
        }

        const amountPattern = parseFloat(parts[0]);
        const descPattern = normalizeText(parts[1]);
        const txnAmount = parseFloat(transaction.amount);

        return Math.abs(txnAmount - amountPattern) < 0.01 &&
               combinedText.includes(descPattern);

      default:
        return false;
    }
  } catch (error) {
    console.error(`Error matching rule:`, error, rule);
    return false;
  }
}

/**
 * Apply rules to transactions and add final_category field
 * @param {string} sheetId - Spreadsheet ID
 * @param {array} transactions - Array of transaction objects
 * @returns {Promise<array>} Transactions with final_category field added
 */
async function applyRules(sheetId, transactions) {
  try {
    // Check if rules are enabled
    const settings = await getSettings();

    if (!settings.enableRulesTab) {
      // Rules not enabled, add empty final_category to all transactions
      return transactions.map(txn => ({
        ...txn,
        final_category: ''
      }));
    }

    // Read rules from sheet
    const rules = await readRules(sheetId, settings.rulesTabName);

    if (rules.length === 0) {
      // No rules defined, add empty final_category
      return transactions.map(txn => ({
        ...txn,
        final_category: ''
      }));
    }

    // Apply rules to each transaction
    const categorizedTransactions = transactions.map(txn => {
      let finalCategory = '';

      // Apply first matching rule (rules are processed in order)
      for (const rule of rules) {
        if (matchesRule(txn, rule)) {
          finalCategory = rule.categoryCode;
          break; // Stop at first match
        }
      }

      return {
        ...txn,
        final_category: finalCategory
      };
    });

    return categorizedTransactions;
  } catch (error) {
    console.error('Error applying rules:', error);
    // On error, return transactions with empty final_category
    return transactions.map(txn => ({
      ...txn,
      final_category: ''
    }));
  }
}

/**
 * Check if rules tab exists in the spreadsheet
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Rules tab name
 * @returns {Promise<boolean>} True if Rules tab exists
 */
async function rulesTabExists(sheetId, tabName) {
  try {
    const token = await getAuthToken();

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    const sheets = data.sheets || [];

    return sheets.some(sheet => sheet.properties.title === tabName);
  } catch (error) {
    console.error('Error checking rules tab:', error);
    return false;
  }
}

/**
 * Create Rules tab with headers
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Rules tab name
 * @returns {Promise<void>}
 */
async function createRulesTab(sheetId, tabName) {
  try {
    const token = await getAuthToken();

    // Create the tab
    const createUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`;
    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [{
          addSheet: {
            properties: {
              title: tabName
            }
          }
        }]
      })
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}));
      throw new Error(`Failed to create tab: ${createResponse.status} - ${errorData.error?.message || createResponse.statusText}`);
    }

    // Write headers
    const headers = ['active', 'match_type', 'pattern', 'category_code'];
    const range = `${tabName}!A1:D1`;
    const writeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;

    const headersResponse = await fetch(writeUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range,
        values: [headers]
      })
    });

    if (!headersResponse.ok) {
      const errorData = await headersResponse.json().catch(() => ({}));
      throw new Error(`Failed to write headers: ${headersResponse.status} - ${errorData.error?.message || headersResponse.statusText}`);
    }

    // Add example rules
    const exampleRules = [
      ['true', 'contains', 'starbucks', 'Coffee'],
      ['true', 'contains', 'uber', 'Transportation'],
      ['true', 'contains', 'whole foods', 'Groceries'],
      ['false', 'exact', 'Amazon Prime', 'Subscriptions'],
      ['false', 'regex', 'mcdonald.*|burger king', 'Fast Food']
    ];

    const exampleRange = `${tabName}!A2:D6`;
    const exampleUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(exampleRange)}?valueInputOption=RAW`;

    const exampleResponse = await fetch(exampleUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: exampleRange,
        values: exampleRules
      })
    });

    if (!exampleResponse.ok) {
      const errorData = await exampleResponse.json().catch(() => ({}));
      throw new Error(`Failed to write example rules: ${exampleResponse.status} - ${errorData.error?.message || exampleResponse.statusText}`);
    }
  } catch (error) {
    console.error('Error creating rules tab:', error);
    throw error;
  }
}

/**
 * Apply ML-based category suggestions to transactions
 * @param {array} transactions - Array of transaction objects
 * @param {number} confidenceThreshold - Minimum confidence for auto-apply (0-1)
 * @returns {Promise<array>} Transactions with ML suggestions applied
 */
async function applyMLSuggestions(transactions, confidenceThreshold = 0.7) {
  try {
    const BACKEND_URL = CONFIG.BACKEND_URL;

    // Only apply ML to uncategorized transactions
    const uncategorized = transactions.filter(txn => !txn.final_category);

    if (uncategorized.length === 0) {
      return transactions;
    }

    // Call backend ML endpoint
    const response = await fetch(`${BACKEND_URL}/categorize/suggest-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transactions: uncategorized,
        confidence_threshold: confidenceThreshold
      })
    });

    if (!response.ok) {
      console.warn('ML suggestions unavailable:', response.statusText);
      return transactions;
    }

    const data = await response.json();

    // If model not trained, return original transactions
    if (!data.model_trained || !data.suggestions || data.suggestions.length === 0) {
      console.log('ML model not trained or no suggestions available');
      return transactions;
    }

    // Apply suggestions
    const result = [...transactions];
    for (const suggestion of data.suggestions) {
      const txnIndex = transactions.findIndex(t => t === uncategorized[suggestion.transaction_index]);

      if (txnIndex !== -1) {
        if (suggestion.auto_apply) {
          // High confidence - auto apply
          result[txnIndex].final_category = suggestion.suggested_category;
          result[txnIndex].ml_confidence = suggestion.confidence;
          result[txnIndex].ml_applied = true;
        } else {
          // Low confidence - add as suggestion for manual review
          result[txnIndex].ml_suggestion = suggestion.suggested_category;
          result[txnIndex].ml_confidence = suggestion.confidence;
          result[txnIndex].ml_applied = false;
        }
      }
    }

    return result;
  } catch (error) {
    console.error('Error applying ML suggestions:', error);
    return transactions;
  }
}

/**
 * Apply rules and optionally ML suggestions to transactions
 * @param {string} sheetId - Spreadsheet ID
 * @param {array} transactions - Array of transaction objects
 * @param {boolean} useML - Whether to apply ML suggestions
 * @returns {Promise<array>} Transactions with categorization applied
 */
async function applyRulesAndML(sheetId, transactions, useML = false) {
  try {
    // First apply rules
    let categorized = await applyRules(sheetId, transactions);

    // Then optionally apply ML to uncategorized transactions
    if (useML) {
      const settings = await getSettings();
      const threshold = settings.mlConfidenceThreshold || 0.7;
      categorized = await applyMLSuggestions(categorized, threshold);
    }

    return categorized;
  } catch (error) {
    console.error('Error applying rules and ML:', error);
    return transactions.map(txn => ({
      ...txn,
      final_category: ''
    }));
  }
}

// Export functions
window.RulesEngine = {
  applyRules,
  applyMLSuggestions,
  applyRulesAndML,
  readRules,
  rulesTabExists,
  createRulesTab,
  getSettings
};
