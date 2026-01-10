/**
 * SheetLink Recipes Runner
 * Phase 3.23.0 - Recipes Framework
 *
 * Orchestrates recipe execution with validation, error handling, and logging.
 */

/**
 * Run a recipe by ID
 * @param {string} recipeId - Recipe identifier
 * @returns {Object} {success: boolean, message: string, executionTime: number}
 */
function runRecipe(recipeId) {
  const startTime = new Date();

  try {
    // Validate recipe exists
    if (!recipeExists(recipeId)) {
      return {
        success: false,
        message: `Recipe "${recipeId}" not found`,
        executionTime: 0
      };
    }

    const recipe = getRecipe(recipeId);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Validate transactions sheet
    const validation = validateTransactionsSheet(ss);
    if (!validation.valid) {
      showError(validation.error);
      return {
        success: false,
        message: validation.error,
        executionTime: 0
      };
    }

    // Log execution start
    logRecipe(recipe.name, `Starting execution...`);

    // Execute recipe
    const result = recipe.entry(ss);

    // Calculate execution time
    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000; // seconds

    if (result.success) {
      const message = `${recipe.name} completed successfully in ${executionTime.toFixed(2)}s`;
      logRecipe(recipe.name, message);
      showToast(message, "Recipe Complete");

      return {
        success: true,
        message: message,
        executionTime: executionTime
      };
    } else {
      const errorMessage = result.error || "Unknown error occurred";
      logRecipe(recipe.name, `Failed: ${errorMessage}`);
      showError(`${recipe.name} failed: ${errorMessage}`);

      return {
        success: false,
        message: errorMessage,
        executionTime: executionTime
      };
    }

  } catch (error) {
    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000;

    Logger.log(`Recipe execution error: ${error.message}`);
    Logger.log(error.stack);

    showError(`Recipe execution error: ${error.message}`);

    return {
      success: false,
      message: error.message,
      executionTime: executionTime
    };
  }
}

/**
 * Run all recipes in sequence
 * @returns {Object[]} Array of execution results
 */
function runAllRecipes() {
  const recipeIds = listRecipeIds();
  const results = [];

  showToast("Running all recipes...", "SheetLink Recipes");

  for (const recipeId of recipeIds) {
    const result = runRecipe(recipeId);
    results.push({
      recipeId: recipeId,
      ...result
    });

    // Small delay between recipes
    Utilities.sleep(500);
  }

  // Summary
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  const message = `Completed ${successCount}/${totalCount} recipes successfully`;

  showToast(message, "All Recipes Complete", 10);

  return results;
}

/**
 * Create custom menu for recipe execution
 */
function createRecipesMenu() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('SheetLink Recipes');

  // Add individual recipes
  const recipes = getAvailableRecipes();
  for (const [recipeId, recipe] of Object.entries(recipes)) {
    menu.addItem(recipe.name, `runRecipe${capitalizeFirst(recipeId)}`);
  }

  menu.addSeparator();
  menu.addItem('Run All Recipes', 'runAllRecipes');
  menu.addSeparator();
  menu.addItem('About Recipes', 'showRecipesInfo');

  menu.addToUi();
}

/**
 * Helper function to capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string}
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Show information about recipes
 */
function showRecipesInfo() {
  const recipes = getAvailableRecipes();
  let message = "SheetLink Recipes - Available Recipes:\\n\\n";

  for (const [recipeId, recipe] of Object.entries(recipes)) {
    message += `${recipe.name} (v${recipe.version})\\n`;
    message += `${recipe.description}\\n`;
    message += `Output tabs: ${recipe.outputTabs.join(', ')}\\n\\n`;
  }

  message += "\\nRecipes transform your raw transaction data into useful financial systems.";
  message += "\\nAll recipes are read-only and will not modify your transaction data.";

  SpreadsheetApp.getUi().alert("SheetLink Recipes", message, SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Wrapper functions for menu items
 * These are needed because custom menu items require function names as strings
 */
function runRecipeBudget() {
  runRecipe('budget');
}

function runRecipeCashflow() {
  runRecipe('cashflow');
}

function runRecipeRecurring() {
  runRecipe('recurring');
}

function runRecipeLedger() {
  runRecipe('ledger');
}

/**
 * On spreadsheet open - create menu
 */
function onOpen() {
  createRecipesMenu();
}
