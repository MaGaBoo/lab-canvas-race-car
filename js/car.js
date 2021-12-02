class Car {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.width = 70;
        this.height = 100;

        this.speed = 3;

        this.vx = 0;
        this.vy = 0;

        this.movements = {
           left : false,
           right : false
        }

        this.img = new Image();
        this.img.src ="./images/car.png";
        this.img.isReady = false;

        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    draw() {

        this.ctx.save();
    if (this.img.isReady) {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height,
          )

          this.ctx.restore();
    }
       
      }

      setUpListeners (event) {
          const status = event.type === 'keydown';

       switch(event.keyCode) {
           case KEY_RIGHT:
               this.movements.right = status;
               break;

            case KEY_LEFT:
                this.movements.left = status;
                break;

            default:
                break;
       }
      }

      move() {
          if(!this.movements.right && !this.movements.left) {
              this.vx = 0;
          }

          if (this.movements.right) {
            this.vx = this.speed;
          }
          if (this.movements.left) {
            this.vx = -this.speed;
          }

          this.x += this.vx;
          this.y += this.vy;

          if (this.x <= 0) {
            this.x = 0
          }
          if (this.x + this.size >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.size
          }
      }

      collidesWith(obstacle) {
        if (
          this.x < obstacle.x + obstacle.width &&
          this.x + this.width > obstacle.x &&
          this.y < obstacle.y + obstacle.height &&
          this.y + this.height > obstacle.y
        ) {
          return true
        }
    
        return false
      }
}