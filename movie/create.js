module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const match = req.url.match(/\/go\/create$/);
	if (!match) return;
      
	res.statusCode = 302;
	res.setHeader('Location', '/go_full?action=create&tray=retro&usePreviewWindowInStudio=true');
	res.end();
	return true;
}
