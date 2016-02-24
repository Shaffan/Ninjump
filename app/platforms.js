/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var platforms = {

    velocity: 3.5,

    _platforms: [],

    colfeq: [0, 0, 0, 0],
    column: {
        absLeft: 0,
        Left: 1,
        Right: 2,
        absRight: 3
    },
    coltoggle: [true, true, true, true],


    reset: function () {
        this._platforms = [];
    },

    update: function () {

        if (gamestate === states.Start) {
            this._platforms.splice(0, this._platforms.length);

            this._platforms.push({
                x: width / 2 - (platform_s.width / 2),
                y: height / 9,
                proximity: 0,
                width: platform_s.width,
                height: platform_s.height
            });
        } else {
            if (frames % 65 === 0) {
                var _x = null;
                if (this.coltoggle[0]) {
                    _x = getRandomArbitrary(1, width - (width / 4) * 3);
                } else if (this.coltoggle[1]) {
                    _x = getRandomArbitrary(width - (width / 4) * 3, width - (width / 4) * 2);
                } else if (this.coltoggle[2]) {
                    _x = getRandomArbitrary(width - (width / 4) * 2, width - (width / 4));
                } else if (this.coltoggle[3]) {
                    _x = getRandomArbitrary(width - (width / 4), width);
                }

                // _x = getRandomArbitrary(1, width - platform_s.width - 1);

                var sum = 0;
                for (i = 0, len = this.colfeq.length; i < len; i++) {
                    sum += this.colfeq[i];
                }
                var avg = sum / this.colfeq.length;

                _x += platform_s.width / 2;
                if ((_x >= 0 && _x <= width - (width / 4) * 3)) {
                    console.log("absLeft");
                    this.colfeq[0]++;
                    this.coltoggle[0] = this.colfeq[0] < avg;
                } else if (_x >= width - (width / 4) * 3 && _x <= width - (width / 4) * 2) {
                    console.log("Left");
                    this.colfeq[0]++;
                    this.coltoggle[0] = this.colfeq[1] < avg;
                } else if (_x >= width - (width / 4) * 2 && _x <= width - (width / 4)) {
                    console.log("Right");
                    this.colfeq[2]++;
                    this.coltoggle[0] = this.colfeq[2] < avg;
                } else if (_x >= width - (width / 4) && _x <= width) {
                    console.log("absRight");
                    this.colfeq[3]++;
                    this.coltoggle[0] = this.colfeq[3] < avg;
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
                var p = this._platforms[i],

                /* Collision */

                    px = player.direction > 0 ? player.x + 15 : player.x,
                // right side of player
                    px2 = player.direction > 0 ? player.x + player_s_right.width : player.x + player_s_right.width - 15,
                // player feet
                    py = player.y + player_s_left.height;
                    pyv = player.y + player_s_right.height + player.yvelocity,

                    platx2 = p.x + platform_s.width,
                    platy2 = p.y + platform_s.height;




                /* Platform Collision */

                // Calculate proximity to player and get closest proximity
                p.proximity = Math.abs(p.x / 2 - player.x / 2) + Math.abs(p.y / 2 - player.y / 2);
                var minprox = Math.min.apply(Math, this._platforms.map(function (obj) {
                    return obj.proximity;
                }));

                this.closest = p.proximity == minprox;

                // If this is the closest platform to the player
                if (this.closest) {
                    if (((px > p.x && px < platx2) || (px2 > p.x && px2 < platx2)) && (pyv >= p.y && pyv <= platy2) && py <= p.y) {
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
        for (var i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];
            platform_s.draw(context, p.x, p.y);
        }
    }

};
