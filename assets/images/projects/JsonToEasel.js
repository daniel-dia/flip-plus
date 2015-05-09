var fs = require('fs');
spriteSheet = {};
var opened = 0;
var prefix = process.argv[2];
var out = 	 process.argv[3];

for(var arg =4 ; arg< process.argv.length; arg++){	
	
	opened ++;
	var file = process.argv[arg];
	
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {console.log('Error: ' + err);	return;}
		
		data = JSON.parse(data);
		
		var filename = imagename(data.meta.image,prefix);
		
		
		console.log(filename)
		for(var frameId in data.frames){
		
			var newImage = imagename(frameId,prefix);
			var image = data.frames[frameId];
			
			if(image.frame)
			spriteSheet[newImage] = {
				images:[filename],
				frames:[[image.frame.x,image.frame.y, image.frame.w,image.frame.h,0,-image.spriteSourceSize.x,-image.spriteSourceSize.y]]
			};
		}

		//save file
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


function imagename(image,prefix){
	image = image.replace(".png","");
	image = image.replace(".jpg","");
	image = prefix +"/"+ image;
	return image;
}