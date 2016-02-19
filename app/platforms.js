var platforms = {

    velocity: 2,

    _platforms: [],

    reset: function () {
        this._platforms = [];
    },

    update: function () {
        if (frames % 200 === 0) {
            var _x = getRandomArbitrary(1, width - platform_s.width - 1);

            this._platforms.push({
                x: _x,
                y: -50,
                width: platform_s.width,
                height: platform_s.height
            });
        }
        for (i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];

            // Collision

            // left side of player
            var px = player.x;
            // right side of player
            var px2 = player.x + player_s.width;
            // player feet
            var py = player.y + player_s.height;

            var platx = p.x;
            var platx2 = p.x + platform_s.width;
            var platy = p.y;
            var platy2 = p.y + platform_s.height;

            if (((px <= platx2 && px >= platx) || (px2 >= platx && px2 <= platx2)) && (py >= platy && py <= platy2)) {
                player.y = p.y - player_s.height;
            }

            // platform movement
            p.y += this.velocity;

            // remove platforms after they leave the canvas
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
