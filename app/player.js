/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var player = {

    x: 0,
    y: 0,

    gravity: 0.35,
    maxfallspeed: 8,

    _jump: 6.5,
    jumpcount: 0,

    moving: false,
    direction: 0,
    acceleration: 0,
    maxspeed: 3,
    xvelocity: 0,
    yvelocity: 0,

    onplatform: false,

    jump: function () {


        // TODO: Refactor

        if (this.jumpcount < 2) {
            this.jumpcount += 1;
            this.yvelocity = -this._jump;
            this.y += this.yvelocity;
        }
    },

    move: function (direction, evttype) {
        this.moving = evttype === "keydown";
        this.direction = direction;
    },

    update: function () {

        if (gamestate === states.Start) {
            player.x = width / 2 - (player_s_right.width / 2) + 5;
            this.yvelocity = platforms.velocity;
            this.y = platforms._platforms.map(function (obj) {
                    return obj.y
                }) - player_s_right.height;
        } else {
            if (this.yvelocity > 0 && this.yvelocity > this.maxfallspeed) {
                this.yvelocity = this.maxfallspeed;
            }

            if (this.onplatform) {
                this.yvelocity = platforms.velocity;
                this.jumpcount = 0;
            } else if (this.y + player_s_right.height < height) {
                this.yvelocity += this.gravity;
            } else {
                gamestate = states.Death;

                //this.yvelocity = 0;
                //this.y = height - player_s_right.height;
            }

            // movement
            if (this.xvelocity > this.maxspeed) {
                this.xvelocity = this.maxspeed;
            } else if (this.xvelocity < -this.maxspeed) {
                this.xvelocity = -this.maxspeed;
            }

            this.acceleration = this.direction > 0 ? this.acceleration + 0.08 : this.acceleration - 0.08;

            if (!this.moving) {
                this.xvelocity = 0;
                this.acceleration = 0;
            }

            // wall collision
            if (this.x <= (0 - this.xvelocity)) {
                this.xvelocity = 0;
                this.x = 0;
            }
            if (this.x >= width - (player_s_right.width + this.xvelocity)) {
                this.xvelocity = 0;
                this.x = width - player_s_right.width;
            }

            // apply values
            this.xvelocity += this.acceleration;
            this.y += this.yvelocity;
            this.x += this.xvelocity;
        }


    },

    draw: function (context) {
        if (this.direction > 0) {
            player_s_right.draw(context, this.x, this.y);
        } else {
            player_s_left.draw(context, this.x, this.y);
        }

    }
};
