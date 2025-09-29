document.addEventListener('DOMContentLoaded', () => {
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const addExpenseButton = document.getElementById('addExpense');
    const expenseList = document.getElementById('expenseList');
    const totalAmountSpan = document.getElementById('totalAmount');

    let total = 0;

    addExpenseButton.addEventListener('click', () => {
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);

        if (name && !isNaN(amount) && amount > 0) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${name}</span><span>$${amount.toFixed(2)}</span>`;
            expenseList.appendChild(listItem);

            total += amount;
            totalAmountSpan.textContent = total.toFixed(2);

            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        } else {
            alert('Please enter a valid expense name and amount.');
        }
    });
});
