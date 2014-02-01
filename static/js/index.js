/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

(function() {
    var asciiContainer = document.getElementById("ascii");
    var capturing = false;
    var image = new Image();
    var my_div = document.getElementById("imageContainer");
    document.body.insertBefore(image, my_div);

    var myc = document.createElement("canvas");
    myc.width = 640;
    myc.height = 480;
    var ctx=myc.getContext("2d");

    var myc2 = document.createElement("canvas");
    myc2.width = 640;
    myc2.height = 480;
    var ctx2=myc2.getContext("2d");
    ctx2.mozImageSmoothingEnabled = false;
    ctx2.webkitImageSmoothingEnabled = false;
    ctx2.imageSmoothingEnabled = false;


    var size = 0.4;

    camera.init({
        mirror: true,

        onFrame: function(canvas) { //TODO clean allllllll

            var imgData = canvas.getContext("2d").getImageData(0,0,640,480);

            for (var i=0;i<imgData.data.length;i+=4) {
                imgData.data[i+0] = _getBit(imgData.data[i+0]); //R
                imgData.data[i+1] = _getBit(imgData.data[i+1]); //G
                imgData.data[i+2] = _getBit(imgData.data[i+2]); //B
            }

            ctx.putImageData(imgData,0,0);

            image.src = myc.toDataURL("image/png");

            ctx2.drawImage(image, 0, 0, 160, 120);

            ctx2.drawImage(myc2, 0, 0, 160, 120, 0, 0, myc2.width, myc2.height);

            image.src = myc2.toDataURL("image/png");

            function _getBit (_v) {
                var _r = 0
                if ( _v < 16 ) {
                    _r = 0;
                } else if ( _v < 48 ) {
                    _r = 32;
                } else if ( _v < 80 ) {
                    _r = 64;
                } else if ( _v < 112 ) {
                    _r = 96;
                } else if ( _v < 144 ) {
                    _r = 128;
                } else if ( _v < 176 ) {
                    _r = 160;
                } else if ( _v < 208 ) {
                    _r = 192;
                } else if ( _v < 240 ) {
                    _r = 224;
                } else {
                    _r = 256;
                }
                return _r;
            }

        },

        onSuccess: function() {
            document.getElementById("info").style.display = "none";

            capturing = true;
            document.getElementById("pause").style.display = "block";
            document.getElementById("pause").onclick = function() {
                if (capturing) {
                    camera.pause();
                } else {
                    camera.start();
                }
                capturing = !capturing;
            };
        },

        onError: function(error) {
            // TODO: log error
        },

        onNotSupported: function() {
            document.getElementById("info").style.display = "none";
            asciiContainer.style.display = "none";
            document.getElementById("notSupported").style.display = "block";
        }
    });
})();