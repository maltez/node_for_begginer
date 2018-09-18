const { EventEmitter } = require('events');

class Test extends EventEmitter {
    constructor(name) {
        super(name);
        this.name = name;
        this.testStatus = 'not started';
        this.on('listen', () => console.log(`${this.name} is ${this.testStatus}`));
    }

    test(a, b) {
        const result = a + b;
        const expected = 6;
        if (result !== expected) {
            this.testStatus = 'failed';
            console.log(`${this.name} equality ${expected}: Test ${this.testStatus}`)
        } else {
            this.testStatus = 'passed';
            console.log(`${this.name} equality ${expected}: Test ${this.testStatus} successfully`);
        }
    }

    run(a, b) {
        this.test(a, b);
        this.testStatus = 'done';
        this.emit('listen')
    }
}

module.exports = Test;