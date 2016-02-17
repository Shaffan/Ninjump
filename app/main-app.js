'use strict';
var canvas,
    context,
    width,
    height,
    frames = 0,
    images = [],
    urls = [
        "assets/cube.png"
    ];

function input(event) {

    switch (event.which) {
    case 37:
        // player.moveLeft();
        break;
    case 38:
        player.jump();
        break;
    case 39:
        // player.moveRight();
        break;
    default:
        return;
    }
    // prevent scroll etc
    event.preventDefault();
}

function loadImages() {
    for (var i = 0; i < urls.length; i++) {
        var img = new Image();
        img.src = urls[i];
        images.push(img)
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

(function main() {

    // width = window.innerWidth;
    // height = window.innerHeight;
    width = 320;
    height = 480;

    $(document).keydown(function (event) {
        input(event);
    });

    canvas = document.createElement('canvas');
    canvas.style.backgroundColor = "green";
    canvas.style.border = "1px solid #000";

    console.log("Width " + width);
    console.log("Height " + height);

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");

    document.body.appendChild(canvas);

    var img = new Image();
    img.onload = function () {
        loadImages();
        run();

    };
    img.src = "assets/cube.png";

})();
