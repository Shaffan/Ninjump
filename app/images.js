'use strict';
var player_s_left, player_s_right, platform_s, score_s;

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

    player_s_left = new ImgObj(img, 0, 0, 34, 42);
    player_s_right = new ImgObj(img, 34, 0, 34, 42);
    platform_s = new ImgObj(img, 68, 0, 81, 11);
    score_s = new ImgObj(img, 149, 0, 250, 100);
     
} 