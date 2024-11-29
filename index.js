const express = require('express');
const cors = require('cors');
const routing = require("./app/controllers/routes");
const {logErrors, errorHandler, boomErrorHandler} = require("./app/middlewares/error.handlers");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

routing(app);

const whiteList = ["http://localhost:8080", "htpps://myapp.co"];
const options = {
	origin: (origin, callback) => {
		if(whiteList.includes(origin) || !origin) callback(null, true);
		else callback(new Error("No allowed"));
	}
}

app.use(cors(options));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
	res.send('Hello');
});


app.listen(port, () => {
	console.log('My app listen on the port ' + port);
});
