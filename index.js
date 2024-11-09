const express = require('express');
const routing = require("./app/routes");

const app = express();
const port = 3000;

routing(app)

app.get('/', (req, res) => {
	res.send('Hello');
});


app.listen(port, () => {
	console.log('My app listen on the port ' + port);
});
