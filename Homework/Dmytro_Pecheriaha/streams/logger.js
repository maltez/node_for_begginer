const { EventEmitter }  = require('events');



class Logger extends EventEmitter {
    constructor() {
        super();
        
        this.on('change', () => {
            console.log('something changed');
        })

    }
    setListenets(n) {
        this.setMaxListeners(n);
    }
    deleteListenerByName (name) {
        this.removeListener(name);
    }
    doingSomething () {
        this.emit('change');
    }
}

const logger  = new Logger();
logger.doingSomething();