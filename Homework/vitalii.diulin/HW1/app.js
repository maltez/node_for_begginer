const {EventEmitter} = require('events');
class Logger extends EventEmitter{
    constructor(){
        super();
        this.on('log', () => console.log(' The method was called'));
    }
    someMethod(){
        try {
            //some code
            const a = a + b;
            this.emit('log');
        }
        catch (e) {
            console.log(e.message);
        }

    }
    maxListeners(count){
        this.setMaxListeners(count);
    }
    deleteListener(name){
        this.removeListener(name);
    }
}
 const logger = new Logger();
logger.someMethod();