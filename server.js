const env = Object.assign(process.env,
	require('./env'),
	require('./config'));

const http = require('http');
const pmc = require('./character/premade');
const chl = require('./character/load');
const chs = require('./character/save');
const asu = require('./asset/upload');
const stl = require('./static/load');
const stp = require('./static/page');
const asl = require('./asset/load');
const asL = require('./asset/list');
const ast = require('./asset/thmb');
const mtp = require('./movie/page');
const Mtp = require('./movie/remote');
const mvl = require('./movie/load');
const mvL = require('./movie/list');
const mvm = require('./movie/meta');
const mvs = require('./movie/save');
const mvc = require('./movie/create');
const mvr = require('./movie/redirect');
const mvt = require('./movie/thmb');
const svs = require("./starter/save");
const svt = require("./starter/thmb");
const thL = require('./theme/list');
const thl = require('./theme/load');
const tsv = require('./tts/voices');
const tsl = require('./tts/load');
const evt = require('./events');
const url = require('url');

const functions = [
	mvL,
	svs,
	svt,
	pmc,
	asl,
	evt,
	chl,
	thl,
	thL,
	chs,
	asL,
	tsl,
	ast,
	mvm,
	mvl,
	mvs,
	mvt,
	tsv,
	asu,
	stp,
	stl,
	mtp,
	mvc,
	mvr,
	Mtp
];

module.exports = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	//if (!parsedUrl.path.endsWith('/')) parsedUrl.path += '/';
	const found = functions.find(f => f(req, res, parsedUrl));
	if (!found) { res.statusCode = 404; res.end(); }
}).listen(env.PORT || env.SERVER_PORT, console.log);
