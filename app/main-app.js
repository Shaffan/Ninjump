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

    if (gamestate === states.Start && event.type !== 'keyup') {
        gamestate = states.Game;
    } else if (gamestate === states.Death){
        platforms.reset();
        iobjects.reset();
        score = 0;
        gamestate = states.Start;
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
    //if (frames % 2 == 0 || frames == 0) {
        if (gamestate !== states.Death) {
            platforms.update();
            iobjects.update();
        } else {
            best = Math.max(best, score);
            localStorage.setItem("best", best);
        }
        // increment score
        if (gamestate === states.Game && player.yvelocity < 0) {
            score += increment * multiplier;
        }
        player.update();
   // }
    
    frames++;
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    platforms.draw(context);
    iobjects.draw(context);
    player.draw(context);
    

    // Start and score text
    // TODO: Consider moving to separate page
    var text = null;
    if (gamestate === states.Start) {
        text = context.measureText("Press any button to start");
        context.fillText("Press any button to start", width / 2 - (text.width / 2), height / 2);
    } else if (gamestate === states.Death) {
        context.font = "bold 12px Fredoka One";
        score_s.draw(context, width / 2 - (score_s.width / 2), height / 3 - (score_s.height / 2));
        text = context.measureText("Score: " + score + " ");
        context.fillText("Score: " + score + " ", width / 2 - text.width, height / 3 + (score_s.height / 3));
        context.fillText("  Best: " + best, width / 2, height / 3 + (score_s.height / 3));
        context.font = "bold 20px Fredoka One";
        text = context.measureText("Press any key to restart");
        context.fillText("Press any key to restart", width / 2 - text.width / 2, height / 2 - 10);
    } else if (gamestate = states.Game) {
        text = context.measureText(score.toString() + ' x' + multiplier.toString());
        context.fillText(score.toString() + ' x' + multiplier.toString(), width - (width / 45) - text.width + 2, height / 100 + 15);
    }
}

(function main() {

    width = window.innerWidth;
    height = window.innerHeight;
    
    if (width > 500) {
        width = 400;
        height = 600;
        var font = "bold 20px Fredoka One";
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
        player.x = width / 2 - (player_s_right.width / 2);
        player.y = height / 2 - player_s_right.height / 2;
    };
    img.src = "assets/sprites.png";

})();
