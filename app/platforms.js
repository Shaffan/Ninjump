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
                    var oldx = _x;
                    // TODO: Refactor
                    while (overlapping) {
                        _x = getRandomArbitrary(1, width - platform_s.width - 1);
                        overlapping = (_x < oldx + platform_s.width && _x + platform_s.width > oldx || _x < oldx + platform_s.width && _x > oldx);
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
                
                p.proximity = Math.abs(p.x / 2 - player.x / 2) + Math.abs(p.y / 2 - player.y / 2);
                
                if (p.closest()) {
                    if (p.collision()) {
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
}

// Collision detection
Platform.prototype.collision = function() {

    // offset of 15 to account for player's bandana 
    var px = player.direction > 0 ? player.x + 15 : player.x,
        // right side of player
        px2 = player.direction > 0 ? player.x + player_s_right.width : player.x + player_s_right.width - 15,

        // player feet
        py = player.y + player_s_left.height,
        pyv = player.y + player_s_right.height + player.yvelocity,

        platx2 = this.x + platform_s.width,
        platy = this.y + platforms.velocity,
        platy2 = this.y + platform_s.height + platforms.velocity;
    
        px -= player.xvelocity;
        px2 += player.xvelocity;

    if (((px > this.x && px < platx2) || (px2 > this.x && px2 < platx2)) && (pyv >= platy && pyv <= platy2) && (py <= this.y) && player.yvelocity > 0) {
        return true;
    }
};

// Get closest proximity and determine whether platform is the closest one to the player
Platform.prototype.closest = function() {
    
    var minprox = Math.min.apply(Math, platforms._platforms.map(function (obj) {
        return obj.proximity;
    }));

    return this.proximity === minprox;
}
