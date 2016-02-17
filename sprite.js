
var


playerS;

// rotation is given in degrees
function Sprite(img, x, y, width, height, rotation) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation ? rotation * (Math.PI/180) : 0;
};
Sprite.prototype.draw = function(context, x, y) {
    context.save();
    context.rotate(this.rotation);
    context.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
    context.restore();
};

function initSprites(img) {
    playerS = [
        new Sprite(img, 1, 680, 185, 307, 0),
        new Sprite(img, 694, 228, 183, 296, 95),
        new Sprite(img, 188, 680, 297, 287, 95),
        new Sprite(img, 954, 1, 238, 321, 0),
        new Sprite(img, 1, 1, 229, 395, 0),
        new Sprite(img, 694, 1, 225, 311, 95),
        new Sprite(img, 733, 669, 273, 270, 95),
        new Sprite(img, 477, 669, 254, 287, 0),
        new Sprite(img, 1, 348, 285, 330, 0),
        new Sprite(img, 232, 1, 220, 329, 0),
        new Sprite(img, 288, 332, 173, 326, 0),
        new Sprite(img, 463, 324, 220, 319, 0),
        new Sprite(img, 685, 413, 254, 317, 95),
    ];
}
