document.addEventListener('DOMContentLoaded', () => {
    const incomeDescInput = document.getElementById('incomeDesc');
    const incomeInput = document.getElementById('income');
    const expenseDescInput = document.getElementById('expenseDesc');
    const expenseInput = document.getElementById('expense');
    const addEntryBtn = document.getElementById('addEntryBtn');
    const incomeList = document.querySelector('#incomeList ul');
    const expenseList = document.querySelector('#expenseList ul');
    const resultSpan = document.getElementById('result');

    let totalIncome = 0;
    let totalExpenses = 0;

    addEntryBtn.addEventListener('click', () => {
        const incomeDesc = incomeDescInput.value.trim();
        const income = parseFloat(incomeInput.value) || 0;
        const expenseDesc = expenseDescInput.value.trim();
        const expense = parseFloat(expenseInput.value) || 0;

        if (incomeDesc && income > 0) {
            totalIncome += income;
            const incomeItem = document.createElement('li');
            incomeItem.innerHTML = `
                ${incomeDesc}: $${income.toFixed(2)}
                <button class="remove-btn" data-type="income">Eliminar</button>
            `;
            incomeList.appendChild(incomeItem);
        }

        if (expenseDesc && expense > 0) {
            totalExpenses += expense;
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `
                ${expenseDesc}: $${expense.toFixed(2)}
                <button class="remove-btn" data-type="expense">Eliminar</button>
            `;
            expenseList.appendChild(expenseItem);
        }

        updateBalance();

        // Clear inputs
        incomeDescInput.value = '';
        incomeInput.value = '';
        expenseDescInput.value = '';
        expenseInput.value = '';
    });

    function removeEntry(button) {
        const item = button.parentElement;
        const amount = parseFloat(item.textContent.match(/\$([\d.]+)/)[1]);
        const type = button.dataset.type;

        if (type === 'income') {
            totalIncome -= amount;
        } else if (type === 'expense') {
            totalExpenses -= amount;
        }
        
        item.remove();
        updateBalance();
    }

    function updateBalance() {
        const balance = totalIncome - totalExpenses;
        resultSpan.textContent = balance.toFixed(2);

        if (balance < 0) {
            resultSpan.classList.add('negative');
            resultSpan.classList.remove('positive');
        } else {
            resultSpan.classList.add('positive');
            resultSpan.classList.remove('negative');
        }
    }

    // Event delegation for removing entries
    document.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('remove-btn')) {
            removeEntry(event.target);
        }
    });
});
