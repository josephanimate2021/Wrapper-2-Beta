const loadPost = require('../request/post_body');
const header = process.env.XML_HEADER;
const asset = require('./main');

async function listAssets(data) {
	var response, files;
	switch (data.type) {
		case "char": {
			var themeId;
			switch (data.themeId) { // fix theme id
				case "custom": {
					themeId = "family";
					break;
				}
				case "action": {
					themeId = "cc2";
					break;
				}
				default: {
					themeId = data.themeId;
					break;
				}
			}
			files = await asset.chars(themeId);
			response = `${header}<ugc more="0">${files
				.map(v => `<char id="${v.id}" enc_asset_id="${v.id}" name="Untitled" cc_theme_id="${v.theme}" thumbnail_url="/char_thumbs/${v.id}.png" copyable="Y"><tags></tags></char>`)
				.join("")}</ugc>`;
			break;
		}
		case "bg": {
			files = asset.list(data.movieId, "bg");
			response = {
				"status": "ok",
				"data": {
					"xml": `${header}<ugc more="0">${files
						.map(v => `<background subtype="0" id="${v.id}" enc_asset_id="${v.id}" name="${v.name}" enable="Y" asset_url="${process.env.CACHÉ_FOLDER}/${v.id}"/>`)
						.join("")}</ugc>`
				}
			};
			break;
		}
		case "movie": {
			files = starter.list();
			response = {
				"status": "ok",
				"data": {
					"xml": `${header}<ugc more="0">${files
						.map(v => `<movie id="${v.id}" enc_asset_id="${v.id}" path="/_SAVED/${v.id}" numScene="1" title="${v.name}" thumbnail_url="/starter_thumbs/${v.id}"><tags></tags></movie>`)
						.join("")}</ugc>`
				}
			};
			break;
		}
		case "prop": {
			if (data.subtype) {
				files = asset.list(data.movieId. "prop", "video");
				response = {
					"status": "ok",
					"data": {
						"xml": `${header}<ugc more="0">${files
							.map(v => `<prop subtype="video" id="${v.id}" enc_asset_id="${v.id}" name="${v.name}" enable="Y" holdable="0" headable="0" placeable="1" facing="left" width="640" height="360" asset_url="${process.env.VIDEOS_FOLDER}/${v.id}" thumbnail_url="${process.env.THUMB_URL}"/>`)
							.join("")}</ugc>`
					}
				};
			} else {
				files = asset.list(data.movieId, "prop");
				response = {
					"status": "ok",
					"data": {
						"xml": `${header}<ugc more="0">${files
							.map(v => `<prop subtype="0" id="${v.id}" enc_asset_id="${v.id}" name="${v.name}" enable="Y" holdable="0" headable="0" placeable="1" facing="left" width="0" height="0" asset_url="${process.env.PROP_THUMB_URL}/${v.id}"/>`)
							.join("")}</ugc>`
					}
				};
			}
			break;
		}
		case "sound": {
			files = asset.list(data.movieId, "sound");
			response = {
				"status": "ok",
				"data": {
					"xml": `${header}<ugc more="0">${files
						.map(v => `<sound subtype="${v.subtype}" id="${v.id}" enc_asset_id="${v.id}" name="${v.name}" enable="Y" duration="${v.duration}" downloadtype="progressive"/>`)
						.join("")}</ugc>`
				}
			};
			break;
		}
		default: { // no type? send a blank response
			response = {
				"status": "ok",
				"data": {
					"xml": `${header}<ugc more="0"></ugc>`
				}
			};
			break;
		}
	};
	return response;
}

module.exports = async function (req, res, url) {
        loadPost(req, res).then(data => {
	        switch (url.path) {
		        case "/api_v2/assets/team":
		        case "/api_v2/assets/shared": {
			        listAssets(data).then(a => {
				        res.setHeader("Content-Type", "application/json"), res.end(JSON.stringify(a));
			        });
			        return true;
			        break;
		        }
		        default:
			        return;
	         }
        });
}
