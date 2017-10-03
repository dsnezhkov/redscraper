const config = require('config');
const scraper = require('website-scraper');
const fs = require('fs-extra');
const glob = require("glob");
const path = require('path');

var topsite = config.get('site.name');

// var topsite = process.argv[2]; 
// node scraper.js <topsite>
// console.log(topsite);
// process.exit(1);

var dir="./" + topsite;
fs.removeSync(dir);

scraper.scrape({
  // Modify URL as needed.
  urls: config.get('site.scraper.urls'),
  urlFilter: function(url){
    return url.indexOf('GetPic') === 0;
  },
  directory: dir,
  subdirectories: [
    {directory: 'static/img', extensions: ['.jpg', '.jpeg', '.png', '.svg', '.gif']},
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
		 // Modify UA string as needed
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'
    }
  }
}).then(function (result) {
  console.log("Mirrored. Saved in " + dir);

	var templatedir = dir + "/templates/" ;

	fs.mkdirs(templatedir, function (err) {
 	  console.log("Creating " + templatedir)
	  if (err) return console.error(err)
	})


   const mExtensions = ['/*.html', '/*.dll'];  
	mExtensions.forEach(function(mext) {
		glob(dir + mext, null, function (er, files) {
			files.forEach(function (item, index, array) {
				//console.log(item, index);
				console.log("Moving " +  item + " to " + templatedir )
				fs.move(item, templatedir + path.basename(item), {clobber: true}, function (err) {
				  if (err) return console.error(err)
				})	
			});
		});
	});

 
	

}).catch(function(err){
  console.log(err);
});
