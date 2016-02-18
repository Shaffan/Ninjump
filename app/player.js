'use strict'
var player = {

    x: 160 - 16,
    y: 120 - 32,

    gravity: 0.25,

    _jump: 5,
    jumpcount: 0,
    canjump: true,

    moving: false,
    acceleration: 0,
    maxspeed: 2.5,
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
    },

    move: function (direction, evttype) {

        this.moving = evttype === "keydown" ? true : false;

        // Move to update function
        this.acceleration = direction > 0 ? this.acceleration + 0.25 : this.acceleration - 0.25;

    },
    // test
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
        
        // jump
        if (this.yvelocity === 0 && this.y >= height - 32) {
            this.jumpcount = 0;
        };

        // movement
        if (this.xvelocity > this.maxspeed) {
            this.xvelocity = this.maxspeed;
        } else if (this.xvelocity < -this.maxspeed) {
            this.xvelocity = -this.maxspeed;
        }

        if (!this.moving) {
            this.xvelocity = 0;
            this.acceleration = 0;
        } else {
            this.xvelocity += this.acceleration;
        }

        if (this.x >= (0 - this.xvelocity) && this.x <= width - (32 + this.xvelocity)) {
            this.x += this.xvelocity;
        } else {
            this.xvelocity = 0;
        }

    },

    draw: function (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        var n = this.animation[this.currentframe];

        context.drawImage(images[n], 0, 0, 32, 32, this.x, this.y, 32, 32);
    }
};
