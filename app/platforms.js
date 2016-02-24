/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var platforms = {

    velocity: 3.5,

    _platforms: [],

    colfeq: [0, 0, 0, 0],
    spawncol: [true, true, true, true],

    reset: function () {
        this._platforms = [];
    },

    update: function () {

        if (gamestate === states.Start) {
            this.reset();

            this._platforms.push({
                x: width / 2 - (platform_s.width / 2),
                y: height / 9,
                proximity: 0,
                width: platform_s.width,
                height: platform_s.height
            });
        } else {
            if (frames % 65 === 0) {
                var _x,
                    
                    colabsleft = 1,
                    colleft = width - (width / 4) * 3,
                    colcenter = width - (width / 4) * 2,
                    colright = width - (width / 4),
                    colabsright = width;
                
                if (this.spawncol[0]) {
                    _x = getRandomArbitrary(colabsleft, colleft);
                } else if (this.spawncol[1]) {
                    _x = getRandomArbitrary(colleft, colcenter);
                } else if (this.spawncol[2]) {
                    _x = getRandomArbitrary(colcenter, colright);
                } else if (this.spawncol[3]) {
                    _x = getRandomArbitrary(colright, colabsright);
                }

                var sum = 0;
                for (i = 0, len = this.colfeq.length; i < len; i++) {
                    sum += this.colfeq[i];
                }
                var avg = sum / this.colfeq.length;

                _x += platform_s.width / 2;
                if (_x >= colabsleft && _x <= colleft) {
                    this.colfeq[0]++;
                    this.spawncol[0] = this.colfeq[0] < avg;
                } else if (_x >= colleft && _x <= colcenter) {
                    this.colfeq[0]++;
                    this.spawncol[0] = this.colfeq[1] < avg;
                } else if (_x >= colcenter && _x <= colright) {
                    this.colfeq[2]++;
                    this.spawncol[0] = this.colfeq[2] < avg;
                } else if (_x >= colright && _x <= colabsright) {
                    this.colfeq[3]++;
                    this.spawncol[0] = this.colfeq[3] < avg;
                }

                this._platforms.push({
                    x: _x,
                    y: -25,
                    proximity: 0,
                    closest: false,
                    width: platform_s.width,
                    height: platform_s.height
                });

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

// Collision detection
function collision(p) {

    var px = player.direction > 0 ? player.x + 15 : player.x,
        // right side of player
        px2 = player.direction > 0 ? player.x + player_s_right.width : player.x + player_s_right.width - 15,
        // player feet
        py = player.y + player_s_left.height,
        pyv = player.y + player_s_right.height + player.yvelocity,

        platx2 = p.x + platform_s.width,
        platy2 = p.y + platform_s.height;

    if (((px > p.x && px < platx2) || (px2 > p.x && px2 < platx2)) && (pyv >= p.y && pyv <= platy2) && (py <= p.y) && (player.yvelocity > 0)) {
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