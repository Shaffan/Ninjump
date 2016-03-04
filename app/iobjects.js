var iobjects = {
    x: 0,
    y: 0,

    _iobjects: [],

    velocity: 0,

    spawn: function (type, x, y) {
        this._iobjects.push(type === 'powerup' ? new Powerup(x, y) : new Danger(x, y));
    },
    
    reset: function() {
        this._iobjects = [];
    },

    update: function () {

        if (gamestate === states.Game) {
            this.velocity = platforms.velocity;

            if (this._iobjects.length) {
                for (i = 0, len = this._iobjects.length; i < len; i++) {
                    var o = this._iobjects[i];

                    o.y += this.velocity;
                }

                if (o.y < height) {
                    this._iobjects.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    },

    draw: function (context) {
        for (i = 0, len = this._iobjects.length; i < len; i++) {
            var o = this._iobjects[i];
            o.type === 'powerup' ? powerup_s.draw(context, o.x, o.y) : danger_s.draw(context, o.x, o.y);
        }
    }

}

function Powerup(x, y) {
    this.x = x;
    this.y = y;
    this.type = 'powerup';
}

function Danger(x, y) {
    this.x = x;
    this.y = y;
    this.type = 'danger';
}