import Stickman from "../objects/Stickman.js"
import Enemy from "../objects/Enemy.js"

class PlayScene extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

    create() {
        
        //set scene background
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background")
        this.background.setOrigin(0, 0)

        //create ground platform as sprite for physics
        this.ground = this.physics.add.sprite(0, 665, "ground")
        this.ground.setOrigin(0, 0)
        this.ground.setImmovable()

        //create enemy sprite
        this.enemy = new Enemy(this, 500, 500)
        this.enemy.create()

        //create player sprite
        this.stickman = new Stickman(this, 50, 500)
        this.stickman.create()

        // create scene physics
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height)
        this.physics.add.collider(this.stickman, this.enemy, () => this.lose())
        this.physics.add.collider(this.enemy, this.ground)

        //get keyboard inputs
        this.cursorKeys = this.input.keyboard.createCursorKeys()

        //create healthbar for scene
        this.healthbar = this.makeBar(25, 20, 0x2ecc71)
    }

    update() {
        if (this.stickman) {
            this.stickman.moveStickman()
            if (this.cursorKeys.space.isDown) {
                this.stickman.jump()
            }
        }
        this.enemy.move()
    }

    makeBar(x, y, color) {
        let bar = this.add.graphics()
        bar.fillStyle(color, 1)
        bar.fillRect(0, 0, 200, 25)
        bar.x = x
        bar.y = y
        return bar
    }

    setHealth(bar, val) {
        bar.scaleX = val / 100
    }

    lose() {
        this.stickman.disableBody()
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "GAME OVER" ,{ font: "20px, Arial", fill: "black" }).setScale(3)
        setTimeout(() => {
            this.scene.start()
        }, 2000)
    }
}

export default PlayScene