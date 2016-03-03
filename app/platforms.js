/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var platforms = {

    velocity: 3.5,

    _platforms: [],

    reset: function () {
        this._platforms = [];
    },

    update: function () {

        if (gamestate === states.Start) {
            this.reset();

            this._platforms.push(new Platform(width / 2 - (platform_s.width / 2), height / 9));
        } else {
            if (frames % 65 === 0) {
                var _x = getRandomArbitrary(1, width - platform_s.width - 1);

                this._platforms.push(new Platform(_x, -25));

                // 20% chance to spawn a second platform
                if (Math.ceil(getRandomArbitrary(0, 2)) === 2) {
                    var overlapping = true;
                    var oldx = _x;
                    while (overlapping) {
                        _x = getRandomArbitrary(1, width - platform_s.width - 1);
                        overlapping = (_x < oldx + platform_s.width && _x + platform_s.width > oldx || _x < oldx + platform_s.width && _x > oldx);
                    }

                    if (!overlapping) {
                        this._platforms.push(new Platform(_x, -25));
                    }
                }

            }
            for (i = 0, len = this._platforms.length; i < len; i++) {
                var p = this._platforms[i];

                if (closest(p)) {
                    if (collision(p)) {
                        player.onplatform = true;
                        player.y = p.y - player_s_right.height;
                    } else {
                        player.onplatform = false;
                    }
                }

                // Platform movement and remove platforms after they leave the canvas
                p.y += this.velocity;
                if (p.y > height) {
                    this._platforms.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    },

    draw: function (context) {
        for (i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];
            platform_s.draw(context, p.x, p.y);
        }
    }

};

// Platform constructor
function Platform(x, y) {
    this.x = x;
    this.y = y;
    this.proximity = 0;
    this.closes = false;
    this.width = platform_s.width;
    this.height = platform_s.height;
}

// Collision detection
function collision(p) {

    // offset of 15 to account for player's bandana 
    var px = player.direction > 0 ? player.x + 15 : player.x,
        // right side of player
        px2 = player.direction > 0 ? player.x + player_s_right.width : player.x + player_s_right.width - 15,
        
        // player feet
        py = player.y + player_s_left.height,
        pyv = player.y + player_s_right.height + player.yvelocity,

        platx2 = p.x + platform_s.width,
        platy2 = p.y + platform_s.height;

    if (((px > p.x && px < platx2) || (px2 > p.x && px2 < platx2)) && (pyv >= p.y && pyv <= platy2) && (py <= p.y) && player.yvelocity > 0) {
        return true;
    }
};

// Calculate proximity to player and get closest proximity
function closest(p) {
    p.proximity = Math.abs(p.x / 2 - player.x / 2) + Math.abs(p.y / 2 - player.y / 2);
    var minprox = Math.min.apply(Math, platforms._platforms.map(function (obj) {
        return obj.proximity;
    }));

    return p.proximity == minprox;
}