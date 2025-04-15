// Base URL of your backend
const API_URL = 'http://localhost:3000/api/expenses';

// HTML element references
const form = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

// Fetch and display expenses
async function loadExpenses() {
  const res = await fetch(API_URL);
  const data = await res.json();
  expenseList.innerHTML = '';

  data.forEach(expense => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.category} - ₹${expense.amount} on ${new Date(expense.date).toLocaleDateString()}
      <button onclick="deleteExpense('${expense._id}')">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Add new expense
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const expense = {
    category: document.getElementById('category').value,
    amount: document.getElementById('amount').value,
    description: document.getElementById('description').value,
    date: document.getElementById('date').value
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(expense)
  });

  form.reset();
  loadExpenses();
});

// Delete an expense
async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  loadExpenses();
}

// Load on startup
loadExpenses();
