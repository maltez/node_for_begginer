const Test = require('./Test');

const test = new Test('My test');
test.on('start', () => console.log(`${test.name} is ${test.testStatus}`));
test.emit('start');
test.run(3, 3);
test.run(9, 12);