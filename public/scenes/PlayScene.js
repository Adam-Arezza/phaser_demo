import Stickman from "../objects/Stickman.js"
import HealthBar from "../objects/HealthBar.js"
import Enemy from "../objects/Enemy.js"
import Health from "../objects/Health.js"

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
        this.spawnEnemy()

        //create player sprite
        this.stickman = new Stickman(this, 50, 500)
        this.stickman.create()

        // create scene physics
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height)
        this.physics.add.collider(this.stickman, this.enemy, () => this.handleEnemyCollision())

        //get keyboard inputs
        this.cursorKeys = this.input.keyboard.createCursorKeys()

        //create healthbar for scene
        this.healthbar = new HealthBar(this, 25, 20)
    }

    update() {
        if (this.stickman) {
            this.stickman.moveStickman()
            if (this.cursorKeys.space.isDown) {
                this.stickman.jump()
            }
        }
        if (typeof this.enemy != undefined) {
            this.enemy.move()
        }
        let isEnemy = this.enemy.body
        if (!isEnemy) {
            this.spawnEnemy()
            this.physics.add.collider(this.stickman, this.enemy, () => this.handleEnemyCollision())
        }
    }

    handleEnemyCollision() {
        //check if the stickman jumped on top of the enemy
        let attackedEnemy = this.stickman.body.touching.down && this.enemy.body.touching.up
        if (attackedEnemy) {
            this.enemy.setRotation(3.14)
            this.enemy.setVelocityX(0)
            let x = this.enemy.x
            let y = this.enemy.y
            this.enemy.setVelocityY(-200)
            setTimeout(() => {
                this.enemy.destroy()

            }, 700)
            if (!this.health || !this.health.body) {
                this.health = new Health(this, x, y)
                this.health.create()
                this.physics.add.collider(this.health, this.stickman, () => this.getHealth())
            }
        }
        else {
            if (this.healthbar.total == 25) {
                this.healthbar.decrease(25)
                this.stickman.disableBody()
                this.add.text(this.game.config.width / 2, this.game.config.height / 2, "GAME OVER", { font: "20px, Arial", fill: "black" }).setScale(3)
                setTimeout(() => {
                    this.scene.start()
                }, 2000)
            }
            this.healthbar.decrease(25)
            if (this.stickman.x <= this.enemy.x) {
                this.stickman.x -= 100
            }
            else {
                this.stickman.x += 100
            }
            this.enemy.disableBody()
            setTimeout(() => {
                this.enemy.enableBody()
            }, 1000)
        }
    }

    spawnEnemy() {
        //create enemy sprite
        this.enemy = new Enemy(this, 500, 500)
        this.enemy.create()
        // this.physics.add.collider(this.stickman, this.enemy, () => this.handleEnemyCollision())
    }

    getHealth() {
        if (this.healthbar.total < 100) {
            this.healthbar.increase(25)
        }
        this.health.destroy()
    }
}

export default PlayScene