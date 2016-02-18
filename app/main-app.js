'use strict';
var canvas,
    context,
    width,
    height,
    frames = 0,
    images = [],
    urls = [
        "assets/ninja.png"
    ];

function input(event) {

    if (event.which === 37) {
        player.move(-1, event.type);
    }
    if (event.which === 38) {
        player.jump();
    }
    if (event.which === 39) {
        player.move(1, event.type);
    }
    // prevent scroll etc
    event.preventDefault();
}

function loadImages() {
    for (var i = 0; i < urls.length; i++) {
        var img = new Image();
        img.src = urls[i];
        images.push(img);
    }
}

function run() {
    var loop = function () {
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);

}

function update() {
    player.update();
}

function render() {
    player.draw(context);
}

(function main(test) {

    // width = window.innerWidth;
    // height = window.innerHeight;
    width = 500;
    height = 750;

    $(document).keydown(function (event) {
        input(event);
    });

    $(document).keyup(function (event) {
        input(event);
    });

    canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");

    document.body.appendChild(canvas);

    var img = new Image();
    img.onload = function () {
        loadImages();
        run();

    };
    img.src = "assets/ninja.png";

})();
