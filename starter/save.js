const loadPost = require("../request/post_body");
const starter = require("./main");
const http = require("http");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "POST") return;
	switch (url.path) {
		case "/goapi/saveTemplate/": {
			loadPost(req, res).then(data => {
				var thumb = data.thumbnail_large && Buffer.from(data.thumbnail_large, 'base64');
				var body = Buffer.from(data.body_zip, 'base64');
				starter.save(body, thumb).then(nId => res.end('0' + nId));
			});
			return true;
		}
		case "/goapi/DeleteUserTemplate/": {
			starter.delete();
			break;
		}
	}
};
