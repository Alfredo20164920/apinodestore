const express = require('express');
const routing = require("./app/controllers/routes");

const app = express();
const port = 3000;

app.use(express.json());

routing(app)

app.get('/', (req, res) => {
	res.send('Hello');
});


app.listen(port, () => {
	console.log('My app listen on the port ' + port);
});
