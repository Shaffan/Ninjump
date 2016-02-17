var


    playerS;

// rotation is given in degrees
function Sprite(img, x, y, width, height, rotation) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation ? rotation * (Math.PI / 180) : 0;
};
Sprite.prototype.draw = function (context, x, y) {
    context.save();
    context.rotate(this.rotation);
    context.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
    context.restore();
};

function initSprites(img) {
    playerS = [

    ];
}
