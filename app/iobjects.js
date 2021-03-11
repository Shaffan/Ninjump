(function (game) {
  var _iobjects = [];

  var _fallSpeed = 0;

  function spawn(type, x, y, sprite) {
    _iobjects.push(new IObject(type, x, y, sprite));
  }

  function reset() {
    _iobjects = [];
  }

  function update(fallSpeed, player) {
    if (game.gameState()) {
      _fallSpeed = fallSpeed;

      if (_iobjects.length) {
        for (i = 0, len = _iobjects.length; i < len; i++) {
          var obj = _iobjects[i];

          obj.proximity = calcProx(obj, player, danger_s);
          
          if (obj.closest()) {
            if (obj.collision(player.getPosition())) {
              _iobjects.splice(i, 1);
              i--;
              len--;

              if (obj.type === "powerup") game.incrementMultiplier(1);
              else game.resetMultiplier();
            }
          }

          obj.y += _fallSpeed;
          if (obj.y > game.getHeight()) {
            _iobjects.splice(i, 1);
            i--;
            len--;
          }
        }
      }
    }
  }

  function draw(context) {
    for (i = 0, len = _iobjects.length; i < len; i++) {
      var o = _iobjects[i];
      o.sprite.draw(context, o.x, o.y);
    }
  }

  function calcProx(obj, player) {
    var a =
      player.getPosition().x +
      player.getDimensions().width / 2 -
      (obj.x + obj.width / 2);
    var b =
      player.getPosition().y +
      player.getDimensions().height / 2 -
      (obj.y + obj.height / 2);

    return Math.sqrt(a * a + b * b);
  }

  function IObject(type, x, y, sprite) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprite = sprite;
    this.width = sprite.width;
    this.height = sprite.height;
    this.proximity = 0;
    this.isClosest = false;
  }

  IObject.prototype.collision = function (player) {
    // reduce the hitbox a little
    var leftSide = this.x + this.sprite.width / 3;
    var rightSide = leftSide + this.sprite.width - this.sprite.width / 3;

    var bottomSide = this.y + this.sprite.height;

    if (
      ((player.left > leftSide && player.left < rightSide) ||
        (player.right > leftSide && player.right < rightSide)) &&
      ((player.top > this.y && player.top < bottomSide) ||
        (player.bottom >= this.y && player.bottom <= bottomSide))
    ) {
      return true;
    }
  };

  IObject.prototype.closest = function () {
    var minprox = Math.min.apply(
      Math,
      _iobjects.map(function (obj) {
        return obj.proximity;
      })
    );

    return this.proximity === minprox;
  };

  window.iobjects = {
    update,
    reset,
    draw,
    spawn
  };
})(window.game);
