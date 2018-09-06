const { EventEmitter } = require('events');
const amount = require("./testingFunction");
const testing = new EventEmitter();
const TEST = 'Testing amount function';

testing.on(TEST, () => {
		let result = amount(6, 7),
			expected = 14;
		if (result !== expected) {
			console.log(`${TEST}: Test failed`);
		} else {
			console.log(`${TEST}: Test passed successfully`);
		}
})

testing.on(TEST, () => {
	let result = amount(2, 2),
		expected = 4;
	if (result !== expected) {
		console.log(`${TEST}: Test failed`);
	} else {
		console.log(`${TEST}: Test passed successfully`);
	}
})

testing.emit(TEST);