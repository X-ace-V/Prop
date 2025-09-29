document.addEventListener('DOMContentLoaded', () => {
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const expensesList = document.getElementById('expenses');
    const totalAmountSpan = document.getElementById('totalAmount');

    let expenses = [];
    let total = 0;

    const renderExpenses = () => {
        expensesList.innerHTML = '';
        total = 0;
        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${expense.name}</span>
                <span>$${expense.amount.toFixed(2)}</span>
            `;
            expensesList.appendChild(listItem);
            total += expense.amount;
        });
        totalAmountSpan.textContent = total.toFixed(2);
    };

    addExpenseBtn.addEventListener('click', () => {
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (name && !isNaN(amount) && amount > 0) {
            expenses.push({ name, amount });
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
            renderExpenses();
        } else {
            alert('Please enter a valid expense name and a positive amount.');
        }
    });

    // Initial render
    renderExpenses();
});
