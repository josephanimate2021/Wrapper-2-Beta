const fUtil = require("../fileUtil");
const movie = require("./main");
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const query = url.query;

	var object, html, htmlOnEdit;
	let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId : `m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', 'xml')}`;
	let movieId = presave;
	let ip = req.headers['x-forwarded-for'];
	if (query.noImport == "true") {
		if (query.useRemotePreview == "true") {
			html = `<html><head><title>Video Maker</title><script>interactiveTutorial = {neverDisplay: function() {return true}};function studioLoaded(arg) {console.log(arg)}function initPreviewPlayer(xml){console.log('Starting preview transfer.');var a=xml.split('');function f(){var s=a.splice(0,5e5);if(s.length)fetch('/goapi/savePreview/',{method:'POST',body:s.join('')}).then(f);else window.open('previewVideo?movieId=${presave}','MsgWindow','width=1280,height=720,left='+(screen.width/2-640)+',top='+(screen.height/2-360))};f()};function exitStudio() {window.location='/player?movieId=${presave}'}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="presaveId=${presave}&amp;movieId=&amp;loadas=0&amp;asId=&amp;originalId=&amp;apiserver=https%3A%2F%2Fworetro.herokuapp.com%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2F&amp;ve=false&amp;isEmbed=0&amp;nextUrl=javascript:exitStudio()&amp;bgload=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2Fgo_full.swf&amp;lid=0&amp;ctc=go&amp;themeColor=silver&amp;tlang=en_US&amp;siteId=13&amp;templateshow=false&amp;forceshow=false&amp;appCode=go&amp;lang=en&amp;tmcc=4048901&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;is_published=0&amp;is_private_shared=1&amp;is_password_protected=false&amp;upl=1&amp;hb=1&amp;pts=1&amp;msg_index=&amp;ad=0&amp;has_asset_bg=1&amp;has_asset_char=0&amp;initcb=studioLoaded&amp;retut=0&amp;&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;st=&amp;uisa=0&amp;u_info=OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ&amp;tm=FIN&amp;tray=${query.tray}&amp;isWide=0&amp;newusr=1&amp;goteam_draft_only=0"><param name="movie" value="https://josephanimate2021.github.io/animation/18/go_full.swf"></object></body></html>`;
			htmlOnEdit = `<html><head><title>Video Maker</title><script>interactiveTutorial = {neverDisplay: function() {return true}};function studioLoaded(arg) {console.log(arg)}function initPreviewPlayer(xml){console.log('Starting preview transfer.');var a=xml.split('');function f(){var s=a.splice(0,5e5);if(s.length)fetch('/goapi/savePreview/',{method:'POST',body:s.join('')}).then(f);else window.open('previewVideo?movieId=${query.movieId}','MsgWindow','width=1280,height=720,left='+(screen.width/2-640)+',top='+(screen.height/2-360))};f()};function exitStudio() {window.location='/player?movieId=${query.movieId}'}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieId=${query.movieId}&amp;loadas=0&amp;asId=&amp;originalId=&amp;apiserver=https%3A%2F%2Fworetro.herokuapp.com%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2F&amp;ve=false&amp;isEmbed=0&amp;nextUrl=javascript:exitStudio()&amp;bgload=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2Fgo_full.swf&amp;lid=0&amp;ctc=go&amp;themeColor=silver&amp;tlang=en_US&amp;siteId=13&amp;templateshow=false&amp;forceshow=false&amp;appCode=go&amp;lang=en&amp;tmcc=4048901&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;is_published=0&amp;is_private_shared=1&amp;is_password_protected=false&amp;upl=1&amp;hb=1&amp;pts=1&amp;msg_index=&amp;ad=0&amp;has_asset_bg=1&amp;has_asset_char=0&amp;initcb=studioLoaded&amp;retut=0&amp;&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;st=&amp;uisa=0&amp;u_info=OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ&amp;tm=FIN&amp;isWide=0&amp;newusr=1&amp;goteam_draft_only=0"><param name="movie" value="https://josephanimate2021.github.io/animation/18/go_full.swf"></object></body></html>`;
		} else {
			html = `<html><head><title>Video Maker</title></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="apiserver=%2F&storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&isEmbed=1&ctc=go&ut=60&bs=default&appCode=go&page=&siteId=go&lid=13&isLogin=Y&retut=1&clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&themeId=${query.tray}&tlang=en_US&presaveId=${presave}&goteam_draft_only=1&isWide=1&nextUrl=javascript:exitStudio()&tray=${query.tray}"><param name="movie" value="https://josephanimate2021.github.io/animation/18/go_full.swf"></object></body></html>`;
			htmlOnEdit = `<html><head><title>Video Maker</title></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="apiserver=%2F&storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&isEmbed=1&ctc=go&ut=60&bs=default&appCode=go&page=&siteId=go&lid=13&isLogin=Y&retut=1&clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&themeId=${query.tray}&tlang=en_US&movieId=${query.movieId}&goteam_draft_only=1&isWide=1&nextUrl=javascript:exitStudio()"><param name="movie" value="https://josephanimate2021.github.io/animation/18/go_full.swf"></object></body></html>`;
		}
	} else {
		if (query.usePreviewWindowInStudio == "true") {
			html = `<html><head><title>Video Maker</title></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/457/go_full.swf" type="application/x-shockwave-flash" width="100%" height="100%"><param name="flashvars" value="apiserver=%2F&storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&isEmbed=1&ctc=go&ut=50&bs=default&appCode=go&page=&siteId=go&lid=13&isLogin=Y&userId=2152&retut=1&clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&themeId=${query.tray}&tlang=en_US&presaveId=${presave}8&goteam_draft_only=1&isWide=0&collab=0&nextUrl=%2Fgo%2Flist%2F&tray=${query.tray}"><param name="allowScriptAccess" value="always"></object></body></html>`;
			htmlOnEdit = `<html><head><title>Video Maker</title></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/457/go_full.swf" type="application/x-shockwave-flash" width="100%" height="100%"><param name="flashvars" value="apiserver=%2F&storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&isEmbed=1&ctc=go&ut=50&bs=default&appCode=go&page=&siteId=go&lid=13&isLogin=Y&userId=2152&retut=1&clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&tlang=en_US&movieId=${query.movieId}8&goteam_draft_only=1&isWide=0&collab=0&nextUrl=%2Fgo%2Flist%2F"><param name="allowScriptAccess" value="always"></object></body></html>`;
		} else {
			html = `<html><head><title>Video Maker</title><script>interactiveTutorial = {neverDisplay: function() {return true}};function studioLoaded(arg) {console.log(arg)}function initPreviewPlayer(xml){console.log('Starting preview transfer.');var a=xml.split('');function f(){var s=a.splice(0,5e5);if(s.length)fetch('/goapi/savePreview/',{method:'POST',body:s.join('')}).then(f);else window.open('previewVideo?movieId=${presave}','MsgWindow','width=1280,height=720,left='+(screen.width/2-640)+',top='+(screen.height/2-360))};f()};function exitStudio() {window.location='/player?movieId=${presave}'}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="presaveId=${presave}&amp;movieId=&amp;loadas=0&amp;asId=&amp;originalId=&amp;apiserver=https%3A%2F%2Fworetro.herokuapp.com%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2F&amp;userId=0cf4CMw1ZNCk&amp;username=bakeryb40488&amp;uemail=bakeryb40488%40gmail.com&amp;numContact=0&amp;ut=23&amp;ve=false&amp;isEmbed=0&amp;nextUrl=javascript:exitStudio()&amp;bgload=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2Fgo_full.swf&amp;lid=0&amp;ctc=go&amp;themeColor=silver&amp;tlang=en_US&amp;siteId=13&amp;templateshow=false&amp;forceshow=false&amp;appCode=go&amp;lang=en&amp;tmcc=4048901&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;is_published=0&amp;is_private_shared=1&amp;is_password_protected=false&amp;upl=1&amp;hb=1&amp;pts=1&amp;msg_index=&amp;ad=0&amp;has_asset_bg=1&amp;has_asset_char=0&amp;initcb=studioLoaded&amp;retut=0&amp;&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;st=&amp;uisa=0&amp;u_info=OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ&amp;tm=FIN&amp;tray=${query.tray}&amp;isWide=0&amp;newusr=1&amp;goteam_draft_only=0"><param name="movie" value="https://josephanimate2021.github.io/animation/18/go_full.swf"></object></body></html>`;
			htmlOnEdit = `<html><head><title>Video Maker</title><script>interactiveTutorial = {neverDisplay: function() {return true}};function studioLoaded(arg) {console.log(arg)}function initPreviewPlayer(xml){console.log('Starting preview transfer.');var a=xml.split('');function f(){var s=a.splice(0,5e5);if(s.length)fetch('/goapi/savePreview/',{method:'POST',body:s.join('')}).then(f);else window.open('previewVideo?movieId=${query.movieId}','MsgWindow','width=1280,height=720,left='+(screen.width/2-640)+',top='+(screen.height/2-360))};f()};function exitStudio() {window.location='/player?movieId=${query.movieId}'}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieId=${query.movieId}&amp;loadas=0&amp;asId=&amp;originalId=&amp;apiserver=https%3A%2F%2Fworetro.herokuapp.com%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2F&amp;userId=0cf4CMw1ZNCk&amp;username=bakeryb40488&amp;uemail=bakeryb40488%40gmail.com&amp;numContact=0&amp;ut=23&amp;ve=false&amp;isEmbed=0&amp;nextUrl=javascript:exitStudio()&amp;bgload=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2Fgo_full.swf&amp;lid=0&amp;ctc=go&amp;themeColor=silver&amp;tlang=en_US&amp;siteId=13&amp;templateshow=false&amp;forceshow=false&amp;appCode=go&amp;lang=en&amp;tmcc=4048901&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;is_published=0&amp;is_private_shared=1&amp;is_password_protected=false&amp;upl=1&amp;hb=1&amp;pts=1&amp;msg_index=&amp;ad=0&amp;has_asset_bg=1&amp;has_asset_char=0&amp;initcb=studioLoaded&amp;retut=0&amp;&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;st=&amp;uisa=0&amp;u_info=OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ&amp;tm=FIN&amp;isWide=0&amp;newusr=1&amp;goteam_draft_only=0"><param name="movie" value="https://josephanimate2021.github.io/animation/18/go_full.swf"></object></body></html>`;
		}
	}
	switch (url.pathname) {
		case "/go_full": {
			if (query.year == "lvm") {
				switch (query.action) {
					case "create": {
						object = `<html><head><title>Video Maker</title><script>interactiveTutorial = {neverDisplay: function() {return true}};function studioLoaded(arg) {console.log(arg)}function initPreviewPlayer(xml){console.log('Starting preview transfer.');var a=xml.split('');function f(){var s=a.splice(0,5e5);if(s.length)fetch('/goapi/savePreview/',{method:'POST',body:s.join('')}).then(f);else window.open('previewVideo?movieId=${presave}&year=lvm','MsgWindow','width=1280,height=720,left='+(screen.width/2-640)+',top='+(screen.height/2-360))};f()};function exitStudio() {window.location='/player?movieId=${presave}&year=lvm'}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/66453a3ba2cc5e1b/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="presaveId=${presave}&amp;movieId=&amp;loadas=0&amp;asId=&amp;originalId=&amp;apiserver=https%3A%2F%2Fworetro.herokuapp.com%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F55910a7cd204c37c%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2F&amp;userId=0cf4CMw1ZNCk&amp;username=bakeryb40488&amp;uemail=bakeryb40488%40gmail.com&amp;numContact=0&amp;ut=23&amp;ve=false&amp;isEmbed=0&amp;nextUrl=javascript:exitStudio()&amp;bgload=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2Fgo_full.swf&amp;lid=13&amp;ctc=go&amp;themeColor=silver&amp;tlang=en_US&amp;siteId=13&amp;templateshow=false&amp;forceshow=false&amp;appCode=go&amp;lang=en&amp;tmcc=4048901&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;is_published=0&amp;is_private_shared=1&amp;is_password_protected=false&amp;upl=1&amp;hb=1&amp;pts=1&amp;msg_index=&amp;ad=0&amp;has_asset_bg=1&amp;has_asset_char=0&amp;initcb=studioLoaded&amp;retut=0&amp;&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;st=&amp;uisa=0&amp;u_info=OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ&amp;tm=FIN&amp;tray=${query.tray}&amp;isWide=1&amp;newusr=1&amp;goteam_draft_only=0"><param name="movie" value="https://josephanimate2021.github.io/animation/66453a3ba2cc5e1b/go_full.swf"></object></body></html>`;
						break;
					}
					case "edit": {
						object = `<html><head><title>Video Editor</title><script>interactiveTutorial = {neverDisplay: function() {return true}};function studioLoaded(arg) {console.log(arg)}function initPreviewPlayer(xml){console.log('Starting preview transfer.');var a=xml.split('');function f(){var s=a.splice(0,5e5);if(s.length)fetch('/goapi/savePreview/',{method:'POST',body:s.join('')}).then(f);else window.open('previewVideo?movieId=${query.movieId}&year=lvm','MsgWindow','width=1280,height=720,left='+(screen.width/2-640)+',top='+(screen.height/2-360))};f()};function exitStudio() {window.location='/player?movieId=${query.movieId}&year=lvm'}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/66453a3ba2cc5e1b/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieId=${query.movieId}&amp;loadas=0&amp;asId=&amp;originalId=&amp;apiserver=https%3A%2F%2Fworetro.herokuapp.com%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F55910a7cd204c37c%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2F&amp;userId=0cf4CMw1ZNCk&amp;username=bakeryb40488&amp;uemail=bakeryb40488%40gmail.com&amp;numContact=0&amp;ut=23&amp;ve=false&amp;isEmbed=0&amp;nextUrl=javascript:exitStudio()&amp;bgload=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2Fgo_full.swf&amp;lid=13&amp;ctc=go&amp;themeColor=silver&amp;tlang=en_US&amp;siteId=13&amp;templateshow=false&amp;forceshow=false&amp;appCode=go&amp;lang=en&amp;tmcc=4048901&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;is_published=0&amp;is_private_shared=1&amp;is_password_protected=false&amp;upl=1&amp;hb=1&amp;pts=1&amp;msg_index=&amp;ad=0&amp;has_asset_bg=1&amp;has_asset_char=0&amp;initcb=studioLoaded&amp;retut=0&amp;&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;st=&amp;uisa=0&amp;u_info=OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ&amp;tm=FIN&amp;tray=${query.tray}&amp;isWide=1&amp;newusr=1&amp;goteam_draft_only=0"><param name="movie" value="https://josephanimate2021.github.io/animation/66453a3ba2cc5e1b/go_full.swf"></object></body></html>`;
						break;
					}
				}
			} else {
				switch (query.action) {
					case "edit": {
						object = htmlOnEdit;
						break;
					}
					case "create": {
						object = html;
						break;
					}
				}
			}
			movie.presave(movieId, ip)
			break;
		}
		case "/previewVideo": {
			if (query.format == "previewPlayer") {
				if (query.year == "lvm") {
					object = `<html><head><title>Video Previewer</title><script>function retrievePreviewPlayerData(){var r=new XMLHttpRequest();r.open('GET','/goapi/getPreview',false);r.send(null);return r.responseText}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/930/player.swf" type="application/x-shockwave-flash" id="Player" width="100%" height="100%"><param name="quality" value="high"><param name="scale" value="exactfit"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieOwner=&amp;movieOwnerId=&amp;movieId=${query.movieId}&amp;ut=-1&amp;movieLid=8&amp;movieTitle=&amp;movieDesc=&amp;userId=&amp;username=&amp;uemail=&amp;apiserver=%2F&amp;thumbnailURL=&amp;copyable=0&amp;isPublished=0&amp;ctc=go&amp;tlang=en_US&amp;is_private_shared=0&amp;autostart=1&amp;appCode=go&amp;is_slideshow=0&amp;originalId=0&amp;is_emessage=0&amp;isEmbed=0&amp;refuser=&amp;utm_source=&amp;uid=&amp;isTemplate=1&amp;showButtons=0&amp;chain_mids=&amp;showshare=0&amp;averageRating=&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;ratingCount=&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;numContact=0&amp;isInitFromExternal=1&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F55910a7cd204c37c%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fjosephanimate2021.github.io%2Fanimation%2F930%2F&amp;startFrame=1"><param name="movie" value="https://josephanimate2021.github.io/animation/930/player.swf"></object></body></html>`;
				} else {
					object = `<html><head><title>Video Previewer</title><script>function retrievePreviewPlayerData(){var r=new XMLHttpRequest();r.open('GET','/goapi/getPreview',false);r.send(null);return r.responseText}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/player.swf" type="application/x-shockwave-flash" id="Player" width="100%" height="100%"><param name="quality" value="high"><param name="scale" value="exactfit"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieOwner=&amp;movieOwnerId=&amp;movieId=${query.movieId}&amp;ut=-1&amp;movieLid=8&amp;movieTitle=&amp;movieDesc=&amp;userId=&amp;username=&amp;uemail=&amp;apiserver=%2F&amp;thumbnailURL=&amp;copyable=0&amp;isPublished=0&amp;ctc=go&amp;tlang=en_US&amp;is_private_shared=0&amp;autostart=1&amp;appCode=go&amp;is_slideshow=0&amp;originalId=0&amp;is_emessage=0&amp;isEmbed=0&amp;refuser=&amp;utm_source=&amp;uid=&amp;isTemplate=1&amp;showButtons=0&amp;chain_mids=&amp;showshare=0&amp;averageRating=&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;ratingCount=&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;numContact=0&amp;isInitFromExternal=1&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fjosephanimate2021.github.io%2Fanimation%2F18%2F&amp;startFrame=1"><param name="movie" value="https://josephanimate2021.github.io/animation/18/player.swf"></object>`;
				}
			} else {
				if (query.year == "lvm") {
					object = `<html><head><title>Video Previewer</title><script>function retrievePreviewPlayerData(){var r=new XMLHttpRequest();r.open('GET','/goapi/getPreview',false);r.send(null);return r.responseText}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/930/player.swf" type="application/x-shockwave-flash" id="Player" width="100%" height="100%"><param name="quality" value="high"><param name="scale" value="exactfit"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieOwner=&amp;movieOwnerId=&amp;movieId=${query.movieId}&amp;ut=-1&amp;movieLid=8&amp;movieTitle=&amp;movieDesc=&amp;userId=&amp;username=&amp;uemail=&amp;apiserver=%2F&amp;thumbnailURL=&amp;copyable=0&amp;isPublished=0&amp;ctc=go&amp;tlang=en_US&amp;is_private_shared=0&amp;autostart=1&amp;appCode=go&amp;is_slideshow=0&amp;originalId=0&amp;is_emessage=0&amp;isEmbed=0&amp;refuser=&amp;utm_source=&amp;uid=&amp;isTemplate=1&amp;showButtons=0&amp;chain_mids=&amp;showshare=0&amp;averageRating=&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;ratingCount=&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;numContact=0&amp;isInitFromExternal=1&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F55910a7cd204c37c%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fjosephanimate2021.github.io%2Fanimation%2F930%2F&amp;startFrame=1"><param name="movie" value="https://josephanimate2021.github.io/animation/930/player.swf"></object></body></html>`;
				} else {
					object = `<html><head><title>Video Previewer</title><script>function retrievePreviewPlayerData(){var r=new XMLHttpRequest();r.open('GET','/goapi/getPreview',false);r.send(null);return r.responseText}</script></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/player.swf" type="application/x-shockwave-flash" id="Player" width="100%" height="100%"><param name="quality" value="high"><param name="scale" value="exactfit"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieId=${query.movieId}&amp;apiserver=%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&amp;ut=60&amp;autostart=1&amp;isWide=0&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&amp;isInitFromExternal=1&amp;animationPath=https%3A%2F%2Fjosephanimate2021.github.io%2Fanimation%2F18%2F"><param name="movie" value="https://josephanimate2021.github.io/animation/18/player.swf"></object>`;
				}
			}
			break;
		}
		case "/player": {
			if (query.year == "lvm") {
				object = `<html><head><title>Video Player</title></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/66453a3ba2cc5e1b/player.swf" type="application/x-shockwave-flash" id="Player" width="100%" height="100%"><param name="quality" value="high"><param name="scale" value="exactfit"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieId=${query.movieId}&amp;apiserver=%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;ut=23&amp;autostart=1&amp;isWide=0&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F55910a7cd204c37c%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fjosephanimate2021.github.io%2Fanimation%2F66453a3ba2cc5e1b%2F"><param name="movie" value="https://josephanimate2021.github.io/animation/66453a3ba2cc5e1b/player.swf"></object>`;
				break;
			} else {
				object = `<html><head><title>Video Player</title></head><body style="margin:0px"><object data="https://josephanimate2021.github.io/animation/18/player.swf" type="application/x-shockwave-flash" id="Player" width="100%" height="100%"><param name="quality" value="high"><param name="scale" value="exactfit"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieId=${query.movieId}&amp;userId=&amp;apiserver=%2F&amp;storePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstore%2F50%2F%3Cstore%3E&amp;ut=23&amp;autostart=1&amp;isWide=0&amp;clientThemePath=https%3A%2F%2Fjosephanimate2021.github.io%2Fstatic%2F477%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fjosephanimate2021.github.io%2Fanimation%2F18%2F"><param name="movie" value="https://josephanimate2021.github.io/animation/18/player.swf"></object>`;
				break;
			}
			break;
		}

		default:
			return;
	}
	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	Object.assign(query);
	res.end(object)
	return true;
};
