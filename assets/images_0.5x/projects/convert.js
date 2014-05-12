var fs = require('fs');
spriteSheet = {};
var opened = 0;
var prefix = process.argv[2];
var out = process.argv[3];

for(var arg =4 ; arg< process.argv.length; arg++){	
	
	opened ++;
	var file = process.argv[arg];
	
	fs.readFile(file, 'utf8', function (err, data) {
		
		
		if (err) {console.log('Error: ' + err);	return;}

		data = JSON.parse(data);
		
		for (var i in data.images){
			data.images[i] = data.images[i].replace(".png","");
			data.images[i] = data.images[i].replace(".jpg","");
			data.images[i] = prefix +"/"+ data.images[i];
		}
		
		for(name in data.animations){
				spriteSheet[prefix+"/"+name]={
				images:data.images,
				frames:[data.frames[data.animations[name]]]
			}
		}
		opened --;
		
		if(opened == 0){
		var result= JSON.stringify(spriteSheet);
		result = result.replace(/\},/g,"},\n");
			fs.writeFile(out, result, function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("The file "+ process.argv[3] +" was saved!");
				}
		})
		}
	});
}


