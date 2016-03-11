var player = {

    x: 0,
    y: 0,

    sprite: null,

    gravity: 0.35,
    maxfallspeed: 8,

    _jump: 6,
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

        this.sprite = this.direction > 0 ? player_s_right : player_s_left;

        if (gamestate === states.Start) {
            player.x = width / 2 - (this.sprite.width / 2) + 5;
            this.yvelocity = platforms.velocity;
            this.y = platforms._platforms.map(function (obj) {
                return obj.y
            }) - this.sprite.height;
        } else {
            if (this.yvelocity > 0 && this.yvelocity > this.maxfallspeed) {
                this.yvelocity = this.maxfallspeed;
            }

            if (this.onplatform) {
                this.yvelocity = platforms.velocity;
                this.jumpcount = 0;
            } else if (this.y + this.sprite.height < height) {
                this.yvelocity += this.gravity;
            } else {
                gamestate = states.Death;

                // TODO: Remove eventually
                //this.yvelocity = 0;
                //this.y = height - this.sprite.height;
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
            if (this.x >= width - (this.sprite.width + this.xvelocity)) {
                this.xvelocity = 0;
                this.x = width - this.sprite.width;
            }

            // apply values
            this.xvelocity += this.acceleration;
            this.y += this.yvelocity;
            this.x += this.xvelocity;
        }

    },
    
    draw: function (context) {
        this.sprite.draw(context, this.x, this.y);
    }
};
