/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
'use strict';
var canvas,
    context,
    width,
    height,
    // This needs to be initialised
    frames = 0,
    
    gamestate,
    states = {Start: 0, Game: 1};
    
    

function input(event) {

    if (event.which === 37) {
        player.move(-1, event.type);
    }
    if (event.which === 38 && event.type != 'keyup') {
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
    context.fillText("Copyright © 2016 Stefan Horne", width - width / 3,  height - height / 65);
    platforms.draw(context);
    player.draw(context);

}

(function main() {

    // width = window.innerWidth;
    // height = window.innerHeight;
    width = 400;
    height = 600;

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
    context.font = "bold 8px Helvetica";

    document.body.appendChild(canvas);

    var img = new Image();
    img.onload = function () {
        loadSprites(this);
        run();
        player.x = width / 2 - player_s.width / 2;
        player.y = height / 2 - player_s.height / 2;
    };
    img.src = "assets/sprites.png";

})();
