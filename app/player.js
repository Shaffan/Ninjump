var player = {

    x: 0,
    y: 0,

    gravity: 0.35,

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

        if (this.y >= height - 75) {
            this.jumpcount = 0;
        };

    },

    move: function (direction, evttype) {
        this.moving = evttype === "keydown" ? true : false;
        this.direction = direction;
    },

    update: function () {
        frames++

        if (this.onplatform) {
            this.yvelocity = platforms.velocity;
            this.jumpcount = 0;
        } else if (this.y + player_s.height < height) {
            this.yvelocity += this.gravity;
        } else {
            // player dies
            this.yvelocity = 0;
            this.y = height - player_s.height;
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
        }

        // wall collision
        if (this.x <= (0 - this.xvelocity)) {
            this.xvelocity = 0;
            this.x = 0;
        }
        if (this.x >= width - (player_s.width + this.xvelocity)) {
            this.xvelocity = 0;
            this.x = width - player_s.width;
        }
        
        // apply values
        this.xvelocity += this.acceleration;
        this.y += this.yvelocity;
        this.x += this.xvelocity;
        console.log("yvelocity: " + this.yvelocity);
        console.log("on platform: " + this.onplatform);
        
        

    },

    draw: function (context) {
        player_s.draw(context, this.x, this.y);
    }
};
