class HealthBar {
    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene)
        this.x = x
        this.y = y
        this.total = 100
        this.draw()
        scene.add.existing(this.bar)
    }

    decrease(val) {
        this.total -= val
        this.draw()
    }

    increase(val) {
        this.total += val
        this.draw()
    }

    draw() {
        this.bar.clear()
        if (this.total > 0 && this.total != 25) {
            //  BG
            this.bar.fillStyle(0x000000);
            this.bar.fillRect(this.x, this.y, 104, 16);

            //  Health
            this.bar.fillStyle(0x00ff00);
            this.bar.fillRect(this.x + 2, this.y + 2, this.total, 12);
        }
        else if(this.total == 25) {
            //  BG
            this.bar.fillStyle(0x000000);
            this.bar.fillRect(this.x, this.y, 104, 16);

            //  Health
            this.bar.fillStyle(0xff0000);
            this.bar.fillRect(this.x + 2, this.y + 2, this.total, 12);
        }

        else{
            this.bar.fillStyle(0x000000);
            this.bar.fillRect(this.x, this.y, 104, 16);
        }

    }
}

export default HealthBar