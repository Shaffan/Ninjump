(function (game) {
  var velocity = 3;

  var _platforms = [];

  function reset() {
    _platforms = [];
  }

  function update() {
    var sprite = platform_s;

    if (game.startState()) {
      reset();

      _platforms.push(
        new Platform(game.getWidth() / 2 - sprite.width / 2, -25, sprite)
      );
    } else {
      if (game.getFrames() % 65 === 0) {
        spawnPlatform(sprite);
      }

      for (i = 0, len = _platforms.length; i < len; i++) {
        var platform = _platforms[i];

        platform.proximity = calcProx(platform, player, sprite);

        if (platform.isClosestToPlayer()) {
          if (platform.collision(player.getPosition())) {
            player.land(platform.y);
          } else {
            player.fall();
          }
        }

        // move down and remove once out of sight
        platform.y += velocity;
        if (platform.y > game.getHeight()) {
          _platforms.splice(i, 1);
          i--;
          len--;
        }
      }
    }
  }

  function draw(context) {
    for (i = 0, len = _platforms.length; i < len; i++) {
      var platform = _platforms[i];
      platform.sprite.draw(context, platform.x, platform.y);
    }
  }

  function spawnPlatform(sprite) {
    var _x = getRandomArbitrary(1, game.getWidth() - sprite.width - 1);

    _platforms.push(new Platform(_x, -25, sprite));

    // 50% chance to spawn an adjacent platform
    if (Math.ceil(getRandomArbitrary(0, 2)) === 2) {
      var overlapping = true;
      var candidatex = _x;

      while (overlapping) {
        _x = getRandomArbitrary(1, game.getWidth() - sprite.width - 1);
        overlapping =
          (_x < candidatex + sprite.width && _x + sprite.width > candidatex) ||
          (_x < candidatex + sprite.width && _x > candidatex);
      }

      _platforms.push(new Platform(_x, -25, sprite));

      // 50% chance to spawn an iobject
      if (Math.ceil(getRandomArbitrary(0, 2)) === 1) {
        var len = _platforms.length;
        var x = _platforms[len - 1].x + sprite.width / 2 - powerup_s.width / 2;
        var y = _platforms[len - 1].y - powerup_s.height;
        // 25% chance to spawn a powerup / 75% chance to spawn a dangerous object
        if (Math.ceil(getRandomArbitrary(0, 4)) === 1) {
          iobjects.spawn("powerup", x, y, powerup_s);
        } else {
          iobjects.spawn("danger", x, y, danger_s);
        }
      }
    }
  }

  function calcProx(platform, player) {
    var a =
      player.getPosition().x +
      player.getDimensions().width / 2 -
      (platform.x + platform.width / 2);
    var b =
      player.getPosition().y +
      player.getDimensions().height / 2 -
      (platform.y + platform.height / 2);

    return Math.sqrt(a * a + b * b);
  }

  function getPlatforms() {
    return _platforms;
  }

  function getConstants() {
    return { velocity };
  }

  function Platform(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.width = sprite.width;
    this.height = sprite.height;
    this.proximity = 0;
    this.isClosest = false;
  }

  // Collision detection
  Platform.prototype.collision = function (player) {
    var rightSide = this.x + this.width;
    var bottomSide = this.y + this.height;

    if (
      ((player.left > this.x && player.left < rightSide) ||
        (player.right > this.x && player.right < rightSide)) &&
      player.bottom >= this.y &&
      player.bottom <= bottomSide &&
      player.top <= this.y
    ) {
      return true;
    }
  };

  // Calculate proximity to player and get closest proximity
  Platform.prototype.isClosestToPlayer = function () {
    var minprox = Math.min.apply(
      Math,
      _platforms.map(function (obj) {
        return obj.proximity;
      })
    );

    return this.proximity === minprox;
  };

  window.platforms = {
    reset,
    update,
    draw,
    getPlatforms,
    getConstants,
  };
})(window.game);
