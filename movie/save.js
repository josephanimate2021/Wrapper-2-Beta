const loadPost = require('../request/post_body');
const movie = require('./main');
const fs = require('fs');

module.exports = function (req, res, url) {
	var thumb;
	if (req.method != 'POST') return;
	switch (url.path) {
		case '/goapi/saveMovie/': { 
			loadPost(req, res).then(data => {

				const trigAutosave = data.is_triggered_by_autosave;
				if (trigAutosave && !data.movieId) {
					thumb = fs.readFileSync(process.env.THUMB_URL);
				} else {
					thumb = data.thumbnail_large && Buffer.from(data.thumbnail_large, 'base64');
				}

				var body = Buffer.from(data.body_zip, 'base64');
				movie.save(body, thumb, data.movieId || data.presaveId, data.presaveId).then(nId => res.end('0' + nId));
			});
			return true;
		}
		case '/goapi/savePreview/': {
			console.log('Adding preview information.');
			const ip = req.headers['x-forwarded-for'];
			req.on('end', () => res.end());
			movie.savePreview(req, ip);
			return true;
		}
	}
}
