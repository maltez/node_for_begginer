const { EventEmitter } = require('events');
const testing = new EventEmitter();
const TEST = 'Testing the addition function for';

testing.on(TEST, (a, b) => {
	const result = a + b;
	const expected = 6;
	result !== expected ? console.error(`${TEST} equality ${expected}: Test failed`) : console.log(`${TEST} equality ${expected}: Test passed successfully`);
		
})

testing.on(TEST, (a, b) => {
	!a && !b ? console.error(`${TEST} arguments: Test failed`) : console.log(`${TEST} arguments: Test passed successfully`);
})

testing.emit(TEST, 6, 7);
testing.emit(TEST, 7);
testing.emit(TEST, 3, 3);
testing.emit(TEST);