const http = require('http');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require("child_process");
const ytdl = require('ytdl-core');
const config = require('../extension/config.json');

http.createServer(async function (request, response) {
	console.log('request starting...');

	let url = request.url.substring(1);
	console.log('url:' + url);

	if(url == ''){
		return 
	}


	let filename = 'myfile.mp3';

	let stream = ytdl(url);

	let info = await ytdl.getInfo(url);

	filename = info.videoDetails.title.replace(/[^a-zA-Z0-9-_ ]/g, '') + '.mp3';

	console.log('filename3 : '+ filename);

	var proc = new ffmpeg({source: stream});

	proc.withAudioCodec('libmp3lame')
	.toFormat('mp3')
	.output(filename)
	.run();
	proc.on('end', function() {
		console.log('answering');

		var contentType = 'audio/mpeg3';

		console.log('filename2 : '+ filename);

		respondWithFile(response, filename, contentType);
		console.log('finished');

	});

}).listen(config.downloadPort);


let respondWithFile = (response, filename, contentType) => {
	fs.readFile(filename, function(error, content) {
		if (error) {

			console.log('Error : '+error.code);
			if(error.code == 'ENOENT'){
				fs.readFile('./404.html', function(error, content) {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				});
			}
			else {
				response.writeHead(500);
				response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
				response.end(); 
			}
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType, 'Content-Disposition': 'attachment; filename="'+encodeURIComponent(filename)+'"' });
			response.end(content, 'utf-8');
		}
	});
}

let popupPage = (response) =>{
	
}
console.log('Server running at ' + config.downloadServer + ':' + config.downloadPort);
