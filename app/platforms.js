var platforms = {

    velocity: 1.5,

    _platforms: [],

    reset: function () {
        this._platforms = [];
    },

    update: function () {
        if (frames % 110 === 0) {
            var _x = getRandomArbitrary(1, width - platform_s.width - 1);

            this._platforms.push({
                x: _x,
                y: -50,
                proximity: 0,
                width: platform_s.width,
                height: platform_s.height
            });
        }
        for (i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];
            
            /* Collision */

            // right side of player
            var px2 = player.x + player_s.width - 15;
            // player feet
            var py = player.y + player_s.height + player.yvelocity;

            var platx2 = p.x + platform_s.width;
            var platy2 = p.y + platform_s.height / 2;

            /* Platform Collision */

            // Calculate proximity to player and get closest proximity to player
            p.proximity = Math.abs(p.x / 2 - player.x / 2) + Math.abs(p.y / 2 - player.y / 2);
            var minprox = Math.min.apply(Math, this._platforms.map(function (obj) { return obj.proximity; }));
            
            // If this is the closest platform to the player
            if (p.proximity == minprox) {
                if (((player.x > p.x && player.x < platx2) || (px2 > p.x && px2 < platx2)) && (py >= p.y && py <= platy2) && player.yvelocity > 0) {
                    player.onplatform = true;
                    player.y = p.y - player_s.height;
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



    },

    draw: function (context) {
        for (var i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];
            platform_s.draw(context, p.x, p.y);
        }
    },

}
