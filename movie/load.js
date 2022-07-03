const movie = require('./main');
const base = Buffer.alloc(1, 0);

module.exports = function (req, res, url) {
	switch (req.method) {
		case 'GET': {
			switch (url.path) {
				case '/goapi/getPreview': {
					const ip = req.headers['x-forwarded-for'];
					const stream = movie.load(ip);
					stream.pipe(res);
					return true;
				}
				default: {
					const match = req.url.match(/\/movies\/([^.]+)(?:\.(zip|xml))?$/);
					if (!match) return;

					var id = match[1], ext = match[2];
					switch (ext) {
						case 'zip':
							res.setHeader('Content-Type', 'application/zip');
							movie.loadZip(id).then(v => { res.statusCode = 200, res.end(v) })
								.catch(e => { res.statusCode = 404, res.end() })
							break;
						default:
							res.setHeader('Content-Type', 'text/xml');
							movie.loadXml(id).then(v => { res.statusCode = 200, res.end(v) })
								.catch(e => { res.statusCode = 404, res.end() })
					}
					return true;
				}
			}
		}

		case 'POST': {
			if (!url.path.startsWith('/goapi/getMovie/')) return;
			res.setHeader('Content-Type', 'application/zip');

			movie.loadZip(url.query.movieId).then(b =>
				res.end(Buffer.concat([base, b]))
			).catch(e => res.end('1' + movie.loadError()));
			return true;
		}
		default: return;
	}
}
