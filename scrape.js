const scraper = require('website-scraper');
const fs = require('fs-extra');
const glob = require("glob");
const path = require('path');


var dir="./springcm";
fs.removeSync(dir);

scraper.scrape({
  urls: [
    'https://login.springcm.com/',	// Will be saved with default filename 'index.html' 
    {url: 'https://login.springcm.com/', filename: 'index.html'},
    {url: 'https://login.springcm.com/Error/', filename: 'Error.html'}
  ],
  directory: dir,
  subdirectories: [
    {directory: 'static/img', extensions: ['.jpg', '.png', '.svg', '.gif']},
    {directory: 'static/fonts', extensions: ['.ttf', '.woff', '.woff2', '.eot']},
    {directory: 'static/js', extensions: ['.js']},
    {directory: 'static/css', extensions: ['.css']}
  ],
  sources: [
    {selector: 'img', attr: 'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'script', attr: 'src'}
  ],
  request: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
    }
  }
}).then(function (result) {
  console.log("Mirrored. Saved in " + dir);

	var templatedir = dir + "/templates/" ;

	fs.mkdirs(templatedir, function (err) {
 	  console.log("Creating " + templatedir)
	  if (err) return console.error(err)
	})


	glob(dir + "/*.html", null, function (er, files) {
		files.forEach(function (item, index, array) {
  			console.log(item, index);
		   console.log("Moving " +  item + " to " + templatedir )
			fs.move(item, templatedir + path.basename(item), {clobber: true}, function (err) {
			  if (err) return console.error(err)
			})	
		});
	})

 
	

}).catch(function(err){
  console.log(err);
});
