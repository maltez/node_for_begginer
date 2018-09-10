const Task = require('./Task');

class ObservableTask extends Task {
    constructor(name){
        super(name);
        this.listeners = [];
        this.funcs = [];
        this.logs = [];
        this.on('error', (err) => {
            console.log(`Error appears ${err.message}`);
            process.exit(1);
        });
    }

    logger() {
        console.log(this.logs);
    }

    set(listener, func, max) {
        try {
            if (!func) {
                this.logs.push(`Adding failed. Function is not set`);
                return;
            } 
            this.listeners.push({listener, func});
            this.logs.push(`Adding ${listener}`);
            if ((max)&&(typeof max === 'number')) this.setMaxListeners(max);
        } catch(err) {
            this.emit('error', err);
        }      
    }

    remove(listener, resetmax) {
        try {
            this.listeners = this.listeners.filter(item => item.listener !== listener);
            this.logs.push(`Remove ${listener}`);
            if ((resetmax)&&(typeof resetmax === 'number')) this.setMaxListeners(10);            
        } catch(err) {
            this.emit('error', err);
        }
    }

    notify() {
        try {
            this.listeners.forEach(({listener, func}) => {
                this.logs.push(`${listener} notified`);
                this.on(listener, () => func());
            });
        } catch(err) {
            this.emit('error', err);
        }
    }

    execute() {
        this.notify();
        this.listeners.forEach(({listener}) => {
            this.logs.push(`${listener} was emited`);
            this.emit(listener)
        });
        super.execute();
    }
}

module.exports = ObservableTask;