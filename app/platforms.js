'use strict';
var platforms = {

    velocity: 1,

    _platforms: [],

    reset: function () {
        this._platforms = [];
    },

    update: function () {
        if (frames % 200 === 0) {
            var _x = getRandomArbitrary(1, width - platform_s.width - 1);

            this._platforms.push({
                x: _x,
                y: -100,
                width: platform_s.width,
                height: platform_s.height
            });
        }
        for (var i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];

            if (i === 0) {



            }

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
