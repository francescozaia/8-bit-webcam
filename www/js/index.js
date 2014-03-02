;(function ( _app, undefined ) {

    "use strict";

    var _capturing = false,
        _imageElement = new Image(),
        _mainElement = document.getElementById("main");

    var _imageCanvas = document.createElement("canvas"),
        _imageCanvasContext = _imageCanvas.getContext("2d");


    var _pixelCanvas = document.createElement("canvas"),
        _pixelCanvasContext = _pixelCanvas.getContext("2d");

    var _inputRGB = document.getElementsByName("rgb")[0],
        _inputBW = document.getElementsByName("bw")[0],
        _inputPixel = document.getElementsByName("pixel")[0],
        _inputBigPixel = document.getElementsByName("bigpixel")[0];

    _app._checkedBW = false;
    _app._checkedRGB = false;
    _app._checkedPixel = false;
    _app._checkedBigPixel = false;


    function _getBit(_v) {
        var _ret = 0;
        if ( _v < 16 ) {
            _ret = 0;
        } else if ( _v < 48 ) {
            _ret = 32;
        } else if ( _v < 80 ) {
            _ret = 64;
        } else if ( _v < 112 ) {
            _ret = 96;
        } else if ( _v < 144 ) {
            _ret = 128;
        } else if ( _v < 176 ) {
            _ret = 160;
        } else if ( _v < 208 ) {
            _ret = 192;
        } else if ( _v < 240 ) {
            _ret = 224;
        } else {
            _ret = 256;
        }
        return _ret;
    }

    function _grayscale(_r, _g, _b) {
        var _brightness = 0.34 * _r + 0.5 * _g + 0.16 * _b;
        return _brightness;
    }

    function checkBW() {
        if (_inputBW.checked) {
            _inputRGB.checked = false;
            _app._checkedRGB = false;
            _app._checkedBW = true;
        } else {
            _app._checkedBW = false;
        }
    }

    function checkRGB() {
        if (_inputRGB.checked) {
            _inputBW.checked = false;
            _app._checkedBW = false;
            _app._checkedRGB = true;
        } else {
            _app._checkedRGB = false;
        }
    }

    function checkPixel() {
        if (_inputPixel.checked) {
            _inputBigPixel.checked = false;
            _app._checkedBigPixel = false;
            _app._checkedPixel = true;
        } else {
            _app._checkedPixel = false;
        }
    }

    function checkBigPixel() {
        if (_inputBigPixel.checked) {
            _inputPixel.checked = false;
            _app._checkedPixel = false;
            _app._checkedBigPixel = true;
        } else {
            _app._checkedBigPixel = false;
        }
    }

    function createImage() {
        window.location.href = _imageElement;
    }

    /* private method */
    function init() {

        document.body.insertBefore(_imageElement, _mainElement);

        _imageCanvas.width = 640;
        _imageCanvas.height = 480;

        _pixelCanvas.width = 640;
        _pixelCanvas.height = 480;

        _pixelCanvasContext.mozImageSmoothingEnabled = false;
        _pixelCanvasContext.webkitImageSmoothingEnabled = false;
        _pixelCanvasContext.imageSmoothingEnabled = false;

        _inputBW.onchange = checkBW;
        _inputRGB.onchange = checkRGB;
        _inputPixel.onchange = checkPixel;
        _inputBigPixel.onchange = checkBigPixel;

        camera.init({

            mirror: true,
            width: 640,
            height: 480,

            onFrame: function(canvas) {

                if (_app._checkedRGB || _app._checkedBW) {

                    var imgData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);

                    // rendering 8-bit image

                    for (var i=0;i<imgData.data.length;i+=4) {
                        imgData.data[i+0] = _getBit(imgData.data[i+0]); //R
                        imgData.data[i+1] = _getBit(imgData.data[i+1]); //G
                        imgData.data[i+2] = _getBit(imgData.data[i+2]); //B
                        if (_app._checkedBW) {
                            var _b = _grayscale(imgData.data[i+0], imgData.data[i+1], imgData.data[i+2]);
                            imgData.data[i+0] = _b
                            imgData.data[i+1] = _b
                            imgData.data[i+2] = _b;
                        }
                    }

                    _imageCanvasContext.putImageData(imgData,0,0);

                    _imageElement.src = _imageCanvas.toDataURL("image/png");
                } else {
                    _imageElement.src = canvas.toDataURL("image/png");
                }

                if (_app._checkedPixel || _app._checkedBigPixel) {

                    var _xres = 160,
                        _yres = 120;

                    if (_app._checkedBigPixel) {
                        _xres = 80;
                        _yres = 60;
                    }

                    _pixelCanvasContext.drawImage(_imageElement, 0, 0, _xres, _yres);
                    _pixelCanvasContext.drawImage(_pixelCanvas, 0, 0, _xres, _yres, 0, 0, _pixelCanvas.width, _pixelCanvas.height);

                    _imageElement.src = _pixelCanvas.toDataURL("image/png");
                }



            },

            onSuccess: function() {
                document.getElementById("info").style.display = "none";

                _capturing = true;
                document.getElementById("pause").style.display = "block";
                document.getElementById("pause").onclick = function() {
                    if (_capturing) {
                        camera.pause();
                    } else {
                        camera.start();
                    }
                    _capturing = !_capturing;
                };

            },

            onError: function(error) {
                // TODO: log error
            },

            onNotSupported: function() {
                document.getElementById("info").style.display = "none";
                document.getElementById("notSupported").style.display = "block";
            }

        });
    }

    /* public method here used as "constructor" */
    _app.initialize = function () {
        init();
    };

}(window.app = window.app || {}));

app.initialize();
