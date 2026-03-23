document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  updateTotal();
  renderList();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    console.log(name, amount);
    if (!name || !amount || amount < 0) {
      alert("Write name to your expense or enter amount");
      return;
    }
    const newExpense = {
      id: Date.now() + Math.random(),
      name: name,
      amount: amount,
    };
    expenses.push(newExpense);
    saveToLocal();
    updateTotal();
    renderList();

    expenseAmount.value = "";
    expenseName.value = "";
  });

  function saveToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function renderList() {
    expenseList.innerHTML = "";
    expenses.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = `${element.name}: ${element.amount} <button class="delete-btn" data-id="${element.id}">delete</button>`;
      expenseList.appendChild(li);
    });
  }

  function calTotalAmount() {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount.innerHTML = `$${calTotalAmount()}`;
    saveToLocal();
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    console.log(e.target);
    const eleId = e.target.getAttribute("data-id");
    expenses = expenses.filter((p) => p.id !== Number(eleId));
    saveToLocal();
    updateTotal();
    renderList();
  });
});
