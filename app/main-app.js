'use strict';
var canvas,
    context,
    width,
    height,
    frames = 0;

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

function run() {
    var loop = function () {
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);
}

function update() {
    platforms.update();
    player.update();

}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    platforms.draw(context);
    player.draw(context);

}

(function main() {

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
        loadSprites(this);
        run();
    };
    img.src = "assets/sprites.png";

})();
