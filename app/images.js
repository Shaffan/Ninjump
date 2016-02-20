'use strict';
var player_s, platform_s;

function ImgObj(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y; 
    this.width = width;
    this.height = height;                
}

ImgObj.prototype.draw = function (context, x, y) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height,
        x, y, this.width, this.height);
}

function loadSprites(img) {
    
    player_s = new ImgObj(img, 0, 0, 34, 42);
    platform_s = new ImgObj(img, 0, 42, 81, 11);   
     
} 