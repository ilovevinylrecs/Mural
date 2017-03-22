// Definitions
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cons = require('consolidate');
var fs = require('fs');
var logger = require('logger').createLogger();
var path = require('path');
var reload = require('reload');
var watch = require('node-watch');

var data = JSON.parse(fs.readFileSync('data/storyboard.json'));

// Set Mustache as the Template Engine
app.engine('html', cons.mustache);

// Set up Views and Partials
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up Static Files
app.use('/', express.static('assets'));

// Set up the data API
app.use('/data', express.static('data'));

// Home View
app.get('/', function (req, res){
	res.render('home', {
		partials: {
			preview: 'home'
		}
	});
});

// Editor Views

// Main Editor View
app.get('/editor', function (req, res){
	res.render('editor/editor', {
		meta: data["meta"],
		items: data["items"],
		partials: {
			editor: 'editor',
			editornav: 'fragments/editornav'
		}
	});
});

// Editor Fragments

// Form Controls Fragment
app.get('/editor/fragment/formcontrols', function(req, res){
	res.render('editor/fragments/formcontrols', {
		partials: {
			formcontrols: 'formcontrols'
		}
	});
});

// Fullpage Toggle Fragment
app.get('/editor/fragment/fullpage', function(req, res){
	res.render('editor/fragments/fullpage', {
		partials: {
			fullpage: 'fullpage'
		}
	});
});

// Image Fragment
app.get('/editor/fragment/image', function(req, res){
	res.render('editor/fragments/image', {
		partials: {
			image: 'image'
		}
	});
});

// Image Sources Fragment
app.get('/editor/fragment/imagesources', function(req, res){
	res.render('editor/fragments/imagesources', {
		partials: {
			imagesources: 'imagesources'
		}
	});
});

// Intro Fragment
app.get('/editor/fragment/intro', function(req, res){
	res.render('editor/fragments/intro', {
		partials: {
			intro: 'intro'
		}
	});
});

// Slide Fragment
app.get('/editor/fragment/slide', function(req, res){
	res.render('editor/fragments/slide', {
		partials: {
			slide: 'slide',
			image: 'image',
			title: 'title'
		}
	});
});

// Subtitle Fragment
app.get('/editor/fragment/subtitle', function(req, res){
	res.render('editor/fragments/subtitle', {
		partials: {
			subtitle: 'subtitle'
		}
	});
});

// Text Fragment
app.get('/editor/fragment/text', function(req, res){
	res.render('editor/fragments/text', {
		partials: {
			text: 'text'
		}
	});
});

// Title Fragment
app.get('/editor/fragment/title', function(req, res){
	res.render('editor/fragments/title', {
		partials: {
			title: 'title'
		}
	});
});

// Video Sources Fragment
app.get('/editor/fragment/videosources', function(req, res){
	res.render('editor/fragments/videosources', {
		partials: {
			videosources: 'videosources'
		}
	});
});

// Editor Components (composed fragments)

// Meta Info Page
app.get('/editor/page/meta', function(req, res){
	res.render('editor/pages/meta', {
		partials: {
			formcontrols: '../fragments/formcontrols'
		}
	});
});

// Textcentred Page
app.get('/editor/page/textcentred', function(req, res){
	res.render('editor/pages/textcentred', {
		partials: {
			formcontrols: '../fragments/formcontrols'
		}
	});
});

// Imagebackground Page
app.get('/editor/page/imagebackground', function(req, res){
	res.render('editor/pages/imagebackground', {
		partials: {
			fullpage: '../fragments/fullpage',
			imagebackground: '../fragments/imagesources',
			text: '../fragments/text',
			title: '../fragments/title',
			subtitle: '../fragments/subtitle'
		}
	});
});

// Slideshow Horizontal Page
app.get('/editor/page/slideshowhorizontal', function(req, res){
	res.render('editor/pages/slideshowhorizontal', {
		partials: {
			title: '../fragments/title'
		}
	});
});

// Videobackground Page
app.get('/editor/page/videobackground', function(req, res){
	res.render('editor/pages/videobackground', {
		partials: {
			formcontrols: '../fragments/formcontrols',
			image: '../fragments/image',
			videobackground: 'videobackground'
		}
	});
});

// Preview View
app.get('/preview', function (req, res){
	res.render('preview', {
		meta: data["meta"],
		items: data["items"],
		partials : {
			body: 'partials/body',
			fb: 'partials/fb',
			head: 'partials/head',
			header: 'partials/header',
			imagebackground: 'partials/imagebackground',
			imageparallax: 'partials/imageparallax',
			intro: 'partials/intro',
			loader: 'partials/loader',
			textcentered: 'partials/textcentred',
			title: 'partials/title',
			slideshowhorizontal: 'partials/slideshowhorizontal',
			slideshowvertical: 'partials/slideshowvertical',
			snippets: 'partials/snippets',
			social: 'partials/social',
			subdataposterloadingimage: 'partials/subdataposterloadingimage',
			subvideosource: 'partials/subvideosource',
			videobackground: 'partials/videobackground',
			videofullpage: 'partials/videofullpage'
		}
	});
});

app.listen(8000, function () {
  console.log('Server is running. Point your browser to: http://localhost:8000');
});

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/update', function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	//mimic a slow network connection

	var meta = {"meta":{}};

	var items = req.body;

	for (var item in items) {
		meta["meta"][item] = items[item];
	}

	res.send(JSON.stringify({
		data: data
	}));

});

// Hot Reload the Preview
watch('data', function(filename) {
	console.log(filename, ' changed, reloading.');
	delete require.cache;
	reload(server, app);
});
