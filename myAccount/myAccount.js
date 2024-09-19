import actionManager from "./myAccClasses/actionManager.js";
import action from "./myAccClasses/action.js";

const manager = new actionManager();

window.addNewAction = function addNewAction() {
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount)) {
        alert("Please enter a number.");
        return;
    }

    let newAction = new action(type, description, amount);
    manager.addAction(newAction);

    addActionToTable(newAction);
};





function addActionToTable(action) {
    let table = document.getElementById("actionTable");
    let row = table.insertRow();

    let descriptionCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    let editCell = row.insertCell(2);
    let deleteCell = row.insertCell(3);

    descriptionCell.innerText = action.description;
    amountCell.innerText = action.amount.toFixed(2);

    editCell.innerHTML = '<i class="fa-regular fa-pen-to-square text-success"></i>';
    deleteCell.innerHTML = '<i class="fa-solid fa-trash-can text-danger"></i>';

    deleteCell.addEventListener('click', function () {
        let confirmDelete = confirm("Are you sure you want to remove this from your balance?");
        if (confirmDelete) {
            row.remove();
            manager.deleteAction(action.id);
        }
    });

    editCell.addEventListener('click', function () {
        let newAmount = prompt("Enter new amount: ", amountCell.innerText);
        if (newAmount !== null) {
            newAmount = parseFloat(newAmount);
            if (!isNaN(newAmount)) {
                amountCell.innerText = newAmount.toFixed(2);
                manager.updateAction(action.id, newAmount);
            } else {
                alert("Please enter a valid number.");
            }
        }
    });
}


window.onload = function () {
    const actions = manager.loadActions();
    actions.forEach(action => addActionToTable(action));
    document.getElementById("balance").innerText = `balance: ${manager.balance.toFixed(2)}`;
    console.log("Actions loaded", actions);
};
