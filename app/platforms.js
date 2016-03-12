/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var platforms = {

    velocity: 3,

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

                // 50% chance to spawn a second platform
                if (Math.ceil(getRandomArbitrary(0, 2)) === 2) {
                    var overlapping = true;
                    var candidatex = _x;
                    
                    while (overlapping) {
                        _x = getRandomArbitrary(1, width - platform_s.width - 1);
                        overlapping = (_x < candidatex + platform_s.width && _x + platform_s.width > candidatex || _x < candidatex + platform_s.width && _x > candidatex);
                    }

                    if (!overlapping) {
                        this._platforms.push(new Platform(_x, -25));
                    }

                    // 50% chance to spawn an iobject
                    if (Math.ceil(getRandomArbitrary(0, 2)) === 1) {
                        var len = this._platforms.length;
                        var x = this._platforms[len - 1].x + platform_s.width / 2 - powerup_s.width / 2;
                        var y = this._platforms[len - 1].y - powerup_s.height;
                        // 25% chance to spawn a powerup / 75% chance to spawn a dangerous object
                        if (Math.ceil(getRandomArbitrary(0, 4)) === 1) {
                            iobjects.spawn('powerup', x, y);
                        } else {
                            iobjects.spawn('danger', x, y);
                        }
                    }
                }
            }
            for (i = 0, len = this._platforms.length; i < len; i++) {
                var p = this._platforms[i];
                
                p.proximity = calcProx(p.x, p.y, platform_s);
                p.isClosest = p.closest();

                if (p.isClosest) {
                    if (p.collision()) {
                        player.onplatform = true;
                        player.y = p.y - player_s_right.height;
                    } else {
                        player.onplatform = false;
                    }
                }

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
    this.isClosest = false;
}

function calcProx(x, y, sprite) {
    var a = (player.x + player.sprite.width / 2) - (x + sprite.width / 2);
    var b = (player.y + player.sprite.height / 2) - (y + sprite.height / 2);
    
    return Math.sqrt( a*a + b*b );
}

// Collision detection
Platform.prototype.collision = function() {

    var px = player.direction > 0 ? player.x + 15 : player.x,
        px2 = player.direction > 0 ? player.x + player_s_right.width : player.x + player_s_right.width - 15,
        py = player.y + player_s_left.height,
        py2 = player.y + player_s_right.height + player.yvelocity,

        platx2 = this.x + platform_s.width,
        platy2 = this.y + platform_s.height;

    if (((px > this.x && px < platx2) || (px2 > this.x && px2 < platx2)) && (py2 >= this.y && py2 <= platy2) && py <= this.y) {
        return true;
    }
};

// Calculate proximity to player and get closest proximity
Platform.prototype.closest = function() {
        
    var minprox = Math.min.apply(Math, platforms._platforms.map(function (obj) {
        return obj.proximity;
    }));

    return this.proximity === minprox;
}