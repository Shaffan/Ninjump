player = {

		x: 160 - 16,
		y: 120 - 32,

        velocity: 0,
        gravity: 0.25,

        _jump: 5,
        jumpcount: 0,
        canjump: true,

        animation: [0],
		currentframe: 0,

        jump: function() {

            if (this.velocity === 0) {
                this.canjump = true;
                this.jumpcount = 0;
            }

            if (this.jumpcount < 2) {
                this.jumpcount += 1;
                this.velocity = -this._jump;
            } else {
                this.canjump = false;
            }

        },

		update: function() {
			frames++

			// this.currentframe += frames % 5 === 0 ? 1 : 0;

            // gravity
            if (this.y <= height - (32 + this.velocity)) {
                this.velocity += this.gravity;
                this.y += this.velocity;
            } else {
                this.velocity = 0;
            }

			// sets the currentframe to 0 when it reaches the end of the animation
			this.currentframe %= this.animation.length;

			// console.log("frames: " + frames);

		},

        draw: function(context) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            var n = this.animation[this.currentframe];

            context.drawImage(images[n], 0, 0, 32, 32, this.x, this.y, 32, 32);
        }
	};
