const { EventEmitter } = require('events');

class Task extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.taskStatus = 'Not started';
    }

    execute() {
        this.taskStatus = 'Done';
    }
}

module.exports = Task;