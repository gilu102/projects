
class Task {
    constructor(description) {
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.completed = false;
    }
}

//

export default Task;
// function func() {
//     num = false
// }

// let num = true
// export { Task, num, func };