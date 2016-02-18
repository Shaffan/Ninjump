'use strict'
var player = {

    x: width / 2 - 16,
    y: height / 2 - 32,

    gravity: 0.25,

    _jump: 5,
    jumpcount: 0,

    moving: false,
    direction: 0,
    acceleration: 0,
    maxspeed: 3,
    xvelocity: 0,
    yvelocity: 0,

    animation: [0],
    currentframe: 0,

    jump: function () {


        // TODO: Refactor

        if (this.jumpcount < 2) {
            this.jumpcount += 1;
            this.yvelocity = -this._jump;
            this.y += this.yvelocity;
        }

        if (this.yvelocity === 0 && this.y >= height - 32) {
            this.jumpcount = 0;
        };

    },

    move: function (direction, evttype) {

        this.moving = evttype === "keydown" ? true : false;
        this.direction = direction;

    },

    update: function () {
        frames++

        // this.currentframe += frames % 5 === 0 ? 1 : 0;
        // sets the currentframe to 0 when it reaches the end of the animation
        this.currentframe %= this.animation.length;

        // gravity and floor collision
        if (this.y <= height - (32 + this.yvelocity)) {
            this.yvelocity += this.gravity;
            this.y += this.yvelocity;
        } else {
            this.yvelocity = 0;
        }

        // movement
        if (this.xvelocity > this.maxspeed) {
            this.xvelocity = this.maxspeed;
        } else if (this.xvelocity < -this.maxspeed) {
            this.xvelocity = -this.maxspeed;
        }

        this.acceleration = this.direction > 0 ? this.acceleration + 0.1 : this.acceleration - 0.1;

        if (!this.moving) {
            this.xvelocity = 0;
            this.acceleration = 0;
        } else {
            this.xvelocity += this.acceleration;
        }

        if (this.x <= (0 - this.xvelocity) || this.x >= width - (32 + this.xvelocity)) {
            this.xvelocity = 0;
        }

        this.x += this.xvelocity;

    },

    draw: function (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        var n = this.animation[this.currentframe];

        context.drawImage(images[n], 0, 0, 32, 32, this.x, this.y, 32, 32);
    }
};
