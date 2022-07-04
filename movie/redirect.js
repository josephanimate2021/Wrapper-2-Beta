module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const match = req.url.match(/\/$/);
	if (!match) return;
      
	res.statusCode = 302;
	res.setHeader('Location', '/pages/html/list.html');
	res.end();
	return true;
}
