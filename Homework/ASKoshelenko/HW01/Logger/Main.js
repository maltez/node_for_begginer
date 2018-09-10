const ObservableTask = require('./ObservableTask');

const task = new ObservableTask('My Task');
task.set('logger', () => console.log('logger'));
task.set('read', function() {
    console.log('Read');
});
task.set('update', () => console.log('update'));
task.remove('logger');

task.execute();
task.logger();