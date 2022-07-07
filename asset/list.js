const loadPost = require('../request/post_body');
const header = process.env.XML_HEADER;
const fUtil = require('../fileUtil');
const nodezip = require('node-zip');
const base = Buffer.alloc(1, 0);
const asset = require('./main');
const starter = require('../starter/main');

async function listAssets(data, makeZip, makeJson) {
	if (makeJson == "true") {
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
					.map(v => `<char id="${v.id}" enc_asset_id="${v.id}" name="Untitled" cc_theme_id="${v.
					     theme}" thumbnail_url="/char_thumbs/${
					     v.id}.png" copyable="Y"><tags></tags></char>`).join("")}</ugc>`;
				break;
			}
			case "bg": {
				files = asset.getBackgrounds();
				response = {
					"status": "ok",
					"data": {
						"xml": `${header}<ugc more="0">${files.map(v => `<background subtype="0" id="${v.id}" enc_asset_id="${v.
									id}" name="Untitled" enable="Y" asset_url="/assets/${v.id}"/>`).join("")}</ugc>`
					}
				};
				break;
			}
			case "prop": {
				if (data.subtype) {
					files = asset.getVideos();
					response = {
						"status": "ok",
						"data": {
							"xml": `${header}<ugc more="0">${files.map(v => `<prop subtype="video" id="${
							v.id}" enc_asset_id="${
							v.id}" name="Untitled" enable="Y" placeable="1" facing="left" width="0" height="0" asset_url="/assets/${
												   v.id}"/>`)
							.join("")}</ugc>`
						}
					};
				} else {
					files = asset.getProps();
					response = {
						"status": "ok",
						"data": {
							"xml": `${header}<ugc more="0">${files.map(v => `<prop subtype="0" id="${
				v.id}" enc_asset_id="${
				v.id}" name="Untitled" enable="Y" holdable="0" headable="0" placeable="1" facing="left" width="0" height="0" asset_url="/assets/${
												   v.id}"/>`)
							.join("")}</ugc>`
						}
					};
				}
				break;
			}
			case "sound": {
				files = asset.getSounds();
				response = {
					"status": "ok",
					"data": {
						"xml": `${header}<ugc more="0">${files.map(v => `<sound subtype="${v.subtype}" id="${v.id}" enc_asset_id="${
									v.id}" name="Untitled" enable="Y" duration="${v.duration}" downloadtype="progressive"/>`)
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
	} else {
		var xmlString, files;
		switch (data.type) {
			case 'char': {
				const chars = await asset.chars(data.themeId);
				xmlString = `${header}<ugc more="0">${chars.map(v => `<char id="${v.id}" name="Untitled" cc_theme_id="${
					v.theme}" thumbnail_url="char_default.png" copyable="Y"><tags/></char>`).join('')}</ugc>`;
				break;
			}
			case 'bg': {
				files = asset.getBackgrounds();
				xmlString = `${header}<ugc more="0">${files.map(v => `<bg id="${v.id}"/>`)}</ugc>`;
				break;
			}
			case 'prop': {
				files = asset.getProps();
				xmlString = `${header}<ugc more="0">${files.map(v => `<prop id="${v.id}"/>`).join('')}</ugc>`;
				break;
			}
			default: {
				xmlString = `${header}<ugc more="0"></ugc>`;
				break;
			}
		};

		if (makeZip) {
			const zip = nodezip.create();
			fUtil.addToZip(zip, 'desc.xml', Buffer.from(xmlString));

			switch (data.type) {
				case 'bg': {
					for (let c = 0; c < files.length; c++) {
						const file = files[c];
						fUtil.addToZip(zip, `bg/${file.id}`, asset.loadLocal(file.id));
					}
					break;
				}
			};
			return Buffer.concat([base, await zip.zip()]);
		} else {
			return Buffer.from(xmlString);
		}
	}
}

module.exports = function (req, res, url) {
	var makeZip = false; 
	var makeJson = false; 
	switch (url.path) {
		case '/goapi/getUserAssets/':
		case '/goapi/getCommunityAssets/':
		case '/goapi/searchCommunityAssets/': {
			makeZip = true; 
			break;
		}
		case '/api_v2/assets/team':
		case '/api_v2/assets/shared': {
			makeJson = "true"; 
			break;	
		}
		case '/goapi/getUserAssetsXml/': {
			break;
		}
		default: {
			return;
		}
	}
	var type;
	switch (req.method) {
		case 'GET': {
			listAssets(url.query, makeZip).then(buff => {
				if (makeJson) {
					type = makeJson ? 'application/json' : 'text/html';
				} else {
					type = makeZip ? 'application/zip' : 'text/xml';
				}
				res.setHeader('Content-Type', type), res.end(buff);
			});
			return true;
		}
		case 'POST': {
			loadPost(req, res).then(data => listAssets(data, makeZip)).then(buff => {
				if (makeJson) {
					type = makeJson ? 'application/json' : 'text/html';
				} else {
					type = makeZip ? 'application/zip' : 'text/xml';
				}
				res.setHeader('Content-Type', type), res.end(buff);
			});
			return true;
		}
		default: return;
	}
}
