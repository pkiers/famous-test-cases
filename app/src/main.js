/* globals define */
define(function(require, exports, module) {
    'use strict';

    // shims
    require('famous/inputs/FastClick');

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    mainContext.setPerspective(1000);

    var logo = new ImageSurface({
        size: [200, 200],
        content: '/content/images/famous_logo.png',
        classes: ['backfaceVisibility']
    });

    logo.on('click', function(event) {
        if (event instanceof window.CustomEvent)
            alert('clicked by fastclick!');
    });

    mainContext.add(new Modifier({origin: [.5,.5]})).add(logo);
});
