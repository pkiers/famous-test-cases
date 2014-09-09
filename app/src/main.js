/* globals define */
define(function(require, exports, module) {
    'use strict';

    // ClickFix, remove to see clicks on swipe
    // require('famous/inputs/ClickFix');

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Scrollview = require('famous/views/Scrollview');

    var GenericSync = require("famous/inputs/GenericSync");
    var MouseSync   = require("famous/inputs/MouseSync");
    var TouchSync   = require("famous/inputs/TouchSync");

    GenericSync.register({
        mouse : MouseSync,
        touch : TouchSync
    });

    // create the main context
    var mainContext = Engine.createContext();

    var scrollview = new Scrollview();
    var surfaces = [];
    scrollview.sequenceFrom(surfaces);

    var sync = new GenericSync({
        mouse : { direction : GenericSync.DIRECTION_Y, clickThreshold: 5 },
        touch : {direction : GenericSync.DIRECTION_Y }
    });
    sync.pipe(scrollview);

    function _onClick() {
        alert('clicked!');
    }

    for (var i = 0, temp; i < 40; i++) {
        temp = new Surface({
             content: "Surface: " + (i + 1),
             size: [undefined, 200],
             properties: {
                 backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)",
                 lineHeight: "200px",
                 textAlign: "center"
             }
        });

        temp.pipe(sync);
        temp.on('click', _onClick)
        surfaces.push(temp);
    }

    mainContext.add(scrollview);
});