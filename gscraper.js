const scraper = require('website-scraper');
const fs = require('fs-extra');
const glob = require("glob");
const path = require('path');


var topsite = process.argv[2]; 
//node scraper.js <topsite>
//console.log(topsite);
//process.exit(1);

var dir="./" + topsite;
fs.removeSync(dir);

scraper.scrape({
  // Modify URL as needed.
  urls: [
    { url: 'https://sts.jvservices.com/adfs/ls/?mkt=en-US&client-request-id=06670d8d-1182-4d64-9f63-87a5f2c40bf3&username=d%40dow.com&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQIIAXWRvW_TUADE63ypLQUKC0yoSEwgJ37-eIkjdahjJ3ESPzeNI8dZosRxEtfxR5wXXpMRhJiQOjFUQkhICKkjE2Jm6pQZJjbEWBZG0j-A4W76SXe6e5oEWVB8wnO80M8PRFrsQ47mRcDQfZ6FNCdwkGMZMBQYLr6_u__m9jjz4t5Qe2-__nj97dafS-rBBONoXszlCCHZcDRybSdrh37uC0WtKeoXRV0k0k5At1uXiTnkIM8KMF_gIQ8ZFnBiFlW0lW62ua6hYWRaAnIZBslj0jBrrmUq2DLsFao0Gd1QAVrVfOQrAMnqGTq1sG7YS23Daytl1TC8M8vXcLdy4umytFGTaLICvifu6kcLPGFvLIzdlXOd2BmFsd-Lwjm-SH6i9MgJ1GEpDALHxtkbzAmwa_exGwbHcRg5MXad-eFQPYotE_aW9U2EjfUpMnxrLIJaPXrOCDW73SqVo7LZDVszQqrmpGo2mgsicaoElwt9CJ32pHsCq2URR7J3ulRn44JU6089RjFO6DoLWtYxN0cW6SraTDN7nIL8Vod0iWM0lgZRwedkZjOrHwZXyTubUoE7PIjicOROnXWK-p3aY9LF7e3d_b2H6YOtvynqQ3rz1vrHy1c_e0LlLd167Lx7tHWVzoUdTzHliSiW5EVzAUYwkqX64hmW2u6AEKXfacNKXoYFNPAOmSI4z1DnmczXnf-9_A81&cbcxt=&lc=', filename: 'index.html'},	
	// ... more URLS: with additional sections {url: 'https://login.springcm.com/Error/', filename: 'Error.html'}

  ],
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


	glob(dir + "/*.html", null, function (er, files) {
		files.forEach(function (item, index, array) {
  			//console.log(item, index);
		   console.log("Moving " +  item + " to " + templatedir )
			fs.move(item, templatedir + path.basename(item), {clobber: true}, function (err) {
			  if (err) return console.error(err)
			})	
		});
	})

 
	

}).catch(function(err){
  console.log(err);
});
