'use strict';
var platforms = {
    
    velocity: 1,
    
    _platforms: [],
    
    reset: function() {
        this._platforms= [];    
    },
     
    temp: true,
     
    update: function() {
        if (frames % 100 === 0) {
            var _x =  width - (width*Math.random() + 2) - platform_s.width;
            
            this._platforms.push({
                x: _x,
                y: -100,
                width: platform_s.width,
                height: platform_s.height    
            });
        }
        for (var i = 0, len = this._platforms.length; i < len; i++) {
            var p = this._platforms[i];

            p.y += this.velocity;

            if (p.y > height) {
                this._platforms.splice(i, 1);
                i--;
                len--;
            }

        }
        
        
            
    },
    
    draw: function(context) {        
        for (var i=0, len=this._platforms.length; i < len; i++) {
            var p = this._platforms[i];            
            platform_s.draw(context, p.x, p.y);   
        }        
    },
    
}