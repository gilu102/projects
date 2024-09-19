import action from "./action.js";

class actionManager {
    constructor() {

        this.actions = this.loadActions()
        this.balance = this.calcBalance()

    }
    addAction(action) {
        this.actions.push(action);
        this.balance = this.calcBalance()
        this.saveActions();
        document.getElementById("balance").innerText = `balance:${this.balance.toFixed(2)}`;
    }
    deleteAction(id) {
        this.actions = this.actions.filter((action) => action.id !== id);
        this.balance = this.calcBalance();
        this.saveActions();
        document.getElementById("balance").innerText = `balance:${this.balance.toFixed(2)}`
    }

    updateAction(id, newAmount) {
        let index = this.actions.findIndex((action) => action.id == id);
        this.actions[index].amount = newAmount;
        this.balance = this.calcBalance();
        this.saveActions();
        document.getElementById("balance").innerText = `balance:${this.balance.toFixed(2)}`
    }

    calcBalance() {
        let balance = 0
        for (let action of this.actions) {
            if (action.type === "income") {
                balance += action.amount
            } else if (action.type === "expense") {
                balance -= action.amount
            }
        }
        return balance
    }
    saveActions() {
        sessionStorage.setItem('actions', JSON.stringify(this.actions));
    }

    loadActions() {
        const savedActions = sessionStorage.getItem('actions');
        return savedActions ? JSON.parse(savedActions) : [];
    }
}
export default actionManager;
