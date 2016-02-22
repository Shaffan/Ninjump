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
    states = {Start: 0, Game: 1, Death: 2},

    score = 0,
    increment = 1,
    multiplier = 1,
    best = localStorage.getItem("best") || 0;

function input(event) {

    player.xvelocity = 0;

    if (gamestate === states.Start) {
        gamestate = states.Game;
    }

    if (event.which === 37) {
        player.move(-1, event.type);
    }
    if (event.which === 38 && event.type !== 'keyup') {
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
        window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
}

function update() {
    frames++;
    if (gamestate !== states.Death) {
        platforms.update();
    } else {
        best = Math.max(best, score);
        localStorage.setItem("best", best);
    }
    // increment score
    if (gamestate === states.Game && player.yvelocity < 0) {
        score += increment * multiplier;
    }
    player.update();

}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    platforms.draw(context);
    player.draw(context);

    // Start and score text
    // TODO: Consider moving to separate page
    var text = null;
    if (gamestate === states.Start) {
        text = context.measureText("Press any button to start");
        context.fillText("Press any button to start", width / 2 - (text.width / 2), height / 2);
    } else if (gamestate === states.Death) {
        canvas.style.backgroundColor = '#a2b4c3'
        context.font = "bold 12px Kristen ITC";
        score_s.draw(context, width / 2 - (score_s.width / 2), height / 2 - (score_s.height / 2));
        text = context.measureText("Score: " + score + " ");
        context.fillText("Score: " + score + " ", width / 2 - text.width, height / 2 + (score_s.height / 3));
        context.fillText("  Best: " + best, width / 2, height / 2 + (score_s.height / 3));
    } else if (gamestate = states.Game) {
        text = context.measureText(score.toString());
        context.fillText(score.toString(), width - (width / 45) - text.width + 2, height / 100 + 15);
    }
}

(function main() {

    width = window.innerWidth;
    height = window.innerHeight;

    // TODO: Remove if I decide to keep this font
    var font = "bold 20px Kristen ITC";
    if (width > 500) {
        width = 400;
        height = 600;
        font = "bold 20px Kristen ITC";
    }

    canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.font = font;

    document.body.appendChild(canvas);

    $(document).keydown(function (event) {
        input(event);
    });
    $(document).keyup(function (event) {
        input(event);
    });

    gamestate = states.Start;

    var img = new Image();
    img.onload = function () {
        loadSprites(this);
        run();
    };
    img.src = "assets/sprites.png";

})();
