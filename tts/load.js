const loadPost = require('../request/post_body');
const mp3Duration = require('mp3-duration');
const voices = require('./info').voices;
const processVoice = require('./main');
const asset = require('../asset/main');
const util = require('../movie/main');
const get = require('../request/get');
const qs = require('querystring');
const brotli = require('brotli');
const https = require('https');
const http = require('http');

module.exports = function (req, res, url) {
	if (req.method != 'POST' || url.path != '/goapi/convertTextToSoundAsset/') return;
	loadPost(req, res).then(data => {
		processVoice(data.voice, data.text).then(buffer => {
			mp3Duration(buffer, (e, duration) => {
				if (e || !duration) return res.end(1 + util.loadError('ERR_ASSET_404', 'Unable to retrieve MP3 stream.'));

				const title = `[${voices[data.voice].desc}] ${data.text}`;
				const id = asset.saveLocal(buffer, data.presaveId, '-tts.mp3');
				res.end(`0<response><asset><id>${id}</id><enc_asset_id>${id}</enc_asset_id><type>sound</type><subtype>tts</subtype><title>${title}</title><published>0</published><tags></tags><duration>${1e3 * duration}</duration><downloadtype>progressive</downloadtype><file>${id}</file></asset></response>`)
			});
		}).catch((e) => {
			res.end(1 + util.loadError('ERR_ASSET_404', e));
		});
	});
	return true;
}
