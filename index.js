var fs = require('fs');
var path = require('path');


//异步mkdir
var mkdir = function (dist, callback) {
	dist = path.resolve(dist);
	fs.exists(dist, function (exists) {
		if (!exists) {
			mkdir(path.dirname(dist), function () {
				fs.mkdir(dist, function (err) {
					callback && callback(err);
				});
			});
		} else {
			callback && callback(null);
		}
	});
};

//同步mkdir
var mkdirSync = function (dist, callback) {
	dist = path.resolve(dist);
	console.log('before:', dist);
	if (!fs.existsSync(dist)) {
		console.log('after:', path.dirname(dist));
		mkdirSync(path.dirname(dist));
		//fs.mkdirSync(dist);
	}
}

//复制文件
var copyFile = function (source, target, callback) {
	if (!fs.existsSync(source)) {
		return false;
	}

	var targetDir = path.dirname(target);

	if (!fs.existsSync(targetDir)) {
		mkdirSync(targetDir);
	}

	var targetWriteSteam = fs.createWriteStream(target);

	fs.createReadStream(source).pipe(targetWriteSteam);

	targetWriteSteam.on('close', function () {
		callback && callback();
	});
}

//获取文件大小

var getSize = function (file,unit) {
	unit =  unit || 'byte'
	var stats = fs.statSync(file);
	var size = stats['size'];
	var ret;
	switch (unit){
		case 'byte':
			ret = size;
			break;
		case 'kb':
			ret = size/1024;
			break;
		case 'mb':
			ret = size/(1024*1024);
			break;
		case 'gb':
			ret = size/(1024*1024*1024);
			break;
	}
	return ret;
};


module.exports = {
	mkdir: mkdir,
	mkdirSync: mkdirSync,
	copyFile: copyFile,
	getSize: getSize
}
