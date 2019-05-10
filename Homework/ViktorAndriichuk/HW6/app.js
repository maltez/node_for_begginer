const app = require('express')();

app.get('/', (req, res) => {
	res.json({status: 200, message: 'Working now'});
})

app.listen(3000, () => {
	console.log('Server working')
});