/*********************************
 * Copyright © 2016 Stefan Horne *
 *********************************/
var iobjects = {
    x: 0,
    y: 0,

    _iobjects: [],

    velocity: 0,

    spawn: function (type, x, y) {
        this._iobjects.push(new Iobject(x, y, type));
    },

    reset: function () {
        this._iobjects = [];
    },

    update: function () {

        if (gamestate === states.Game) {
            this.velocity = platforms.velocity;

            if (this._iobjects.length) {
                for (i = 0, len = this._iobjects.length; i < len; i++) {
                    var o = this._iobjects[i];
                    
                    

                    o.y += this.velocity;
                    if (o.y > height) {
                        this._iobjects.splice(i, 1);
                        i--;
                        len--;
                    }
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

function Iobject(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
}

/*function collision(o) {

    // offset of 15 to account for player's bandana 
    var px = player.direction > 0 ? player.x + 15 : player.x,
        // right side of player
        px2 = player.direction > 0 ? player.x + player_s_right.width : player.x + player_s_right.width - 15,

        // player feet
        py = player.y + player_s_left.height,
        py2 = player.y + player_s_right.height + player.yvelocity,

        objx2 = o.x + powerup_s.width,
        objy2 = o.y + powerup_s.height;
    
    px -= player.xvelocity;
    px2 += player.xvelocity;
    
    px += player.sprite.width / 4;
    px2 -= player.sprite.width / 4;
    
    py += player.sprite.height / 4;
    py2 -= player.sprite.height / 4;

    if (((px > o.x && px < objx2) || (px2 > o.x && px2 < objx2)) && ((py > o.y && py < objy2) || (py2 >= o.y && py2 <= objy2))) {
        return true;
    }
};*/