const express = require('express');
const routing = require("./app/controllers/routes");
const {logErrors, errorHandler, boomErrorHandler} = require("./app/middlewares/error.handlers");

const app = express();
const port = 3000;

app.use(express.json());

routing(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
	res.send('Hello');
});


app.listen(port, () => {
	console.log('My app listen on the port ' + port);
});
