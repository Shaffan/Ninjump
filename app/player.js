(function (game) {
  {
    var x = 0;
    var y = 0;

    var sprite = null;

    var gravity = 0.35;
    var maxfallspeed = 8;

    var _jump = 6;
    var jumpcount = 0;

    var moving = false;
    var direction = 0;
    var acceleration = 0;
    var maxspeed = 3;
    var xvelocity = 0;
    var yvelocity = 0;

    var onplatform = false;

    function jump() {
      if (jumpcount < 2) {
        jumpcount += 1;
        yvelocity = -_jump;
        y += yvelocity;
      }
    }

    function move(dir, evttype) {
      moving = evttype === "keydown";
      direction = dir;
    }

    function update() {
      sprite = direction > 0 ? player_s_right : player_s_left;

      if (game.startState()) {
        x = game.getWidth() / 2 - sprite.width / 2 + 5;
        yvelocity = platforms.getConstants().velocity;
        y =
          platforms.getPlatforms().map(function (obj) {
            return obj.y;
          }) - sprite.height;
      } else {
        if (yvelocity > 0 && yvelocity > maxfallspeed) {
          yvelocity = maxfallspeed;
        }

        if (onplatform) {
          yvelocity = platforms.getConstants().velocity;
          jumpcount = 0;
        } else if (y + sprite.height < game.getHeight()) {
          yvelocity += gravity;
        } else {
          game.die();
        }

        // movement
        if (xvelocity > maxspeed) {
          xvelocity = maxspeed;
        } else if (xvelocity < -maxspeed) {
          xvelocity = -maxspeed;
        }

        acceleration =
          direction > 0 ? acceleration + 0.08 : acceleration - 0.08;

        if (!moving) {
          xvelocity = 0;
          acceleration = 0;
        }

        // wall collision
        if (x <= 0 - xvelocity) {
          xvelocity = 0;
          x = 0;
        }
        if (x >= game.getWidth() - (sprite.width + xvelocity)) {
          xvelocity = 0;
          x = game.getWidth() - sprite.width;
        }

        // apply values
        xvelocity += acceleration;
        y += yvelocity;
        x += xvelocity;

        console.log({ x, y });
      }
    }

    function draw(context) {
      sprite.draw(context, x, y);
    }
    function land(y) {
      onplatform = true;
      y = y - player_s_right.height;
    }
    function fall() {
      onplatform = false;
    }
    function getPosition() {
      var left = direction > 0 ? x + 15 : x;
      var right =
        direction > 0
          ? x + player_s_right.width
          : x + player_s_right.width - 15; // bandana is 15 pixels wide
      var top = y + player_s_left.height;
      var bottom = y + player_s_right.height + yvelocity;

      return { x, y, direction, left, right, top, bottom };
    }
    function getVelocity() {
      return { x: xvelocity, y: yvelocity };
    }
    function getDimensions() {
      return { width: sprite.width, height: sprite.height };
    }

    window.player = {
      jump,
      move,
      update,
      draw,
      land,
      fall,
      getPosition,
      getVelocity,
      getDimensions
    };
  }
})(window.game);
