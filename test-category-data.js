/**
 * Test script to verify personal_finance_category data handling
 */

// Simulate backend response with personal_finance_category
const mockTransaction = {
  transaction_id: "test123",
  amount: 100.50,
  personal_finance_category: {
    primary: "LOAN_PAYMENTS",
    detailed: "LOAN_PAYMENTS_STUDENT_LOAN_PAYMENT"
  }
};

// Test 1: How production extension would handle it (JSON.stringify)
console.log("=== Production Extension Behavior (v0.4.3) ===");
console.log("Raw value:", mockTransaction.personal_finance_category);
console.log("JSON.stringify:", JSON.stringify(mockTransaction.personal_finance_category));
console.log("Truthy check:", mockTransaction.personal_finance_category ? "YES" : "NO");
console.log("Cell value:", mockTransaction.personal_finance_category ? JSON.stringify(mockTransaction.personal_finance_category) : '');

// Test 2: What if backend returns null
const mockTransactionNull = {
  transaction_id: "test456",
  amount: 50.25,
  personal_finance_category: null
};

console.log("\n=== With null value ===");
console.log("Raw value:", mockTransactionNull.personal_finance_category);
console.log("Truthy check:", mockTransactionNull.personal_finance_category ? "YES" : "NO");
console.log("Cell value:", mockTransactionNull.personal_finance_category ? JSON.stringify(mockTransactionNull.personal_finance_category) : '');

// Test 3: What if field is undefined/missing
const mockTransactionMissing = {
  transaction_id: "test789",
  amount: 75.00
};

console.log("\n=== With undefined/missing field ===");
console.log("Raw value:", mockTransactionMissing.personal_finance_category);
console.log("Truthy check:", mockTransactionMissing.personal_finance_category ? "YES" : "NO");
console.log("Cell value:", mockTransactionMissing.personal_finance_category ? JSON.stringify(mockTransactionMissing.personal_finance_category) : '');

// Test 4: New feature branch behavior (split columns)
console.log("\n=== Feature Branch Behavior (split columns) ===");
console.log("Primary:", mockTransaction.personal_finance_category?.primary || '');
console.log("Detailed:", mockTransaction.personal_finance_category?.detailed || '');

// Test 5: Optional chaining with null
console.log("\n=== Feature Branch with null ===");
console.log("Primary:", mockTransactionNull.personal_finance_category?.primary || '');
console.log("Detailed:", mockTransactionNull.personal_finance_category?.detailed || '');
