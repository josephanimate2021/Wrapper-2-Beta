const fUtil = require("../fileUtil");
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const query = url.query;

	var params;
	switch (url.pathname) {
		case "/movieRemote": {
			break;
		}

		default:
			return;
	}
	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	Object.assign(params.flashvars, query);
	res.end(`<html>
	<head>
		<script>
			function genorateId() { 
				window.location = '${query.return}?newId=${query.movieId && query.movieId.startsWith("m") ? query.movieId : `m-${fUtil[query.noAutosave ? "getNextFileId" : "fillNextFileId"]("movie-", ".xml")}`}&tray=${query.theme}&api=${query.api}'; 
			}
		</script>
	</head>
	<body onload="genorateId()"></body>
</html>`)
	return true;
};
