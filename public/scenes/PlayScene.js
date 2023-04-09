import Stickman from "../objects/Stickman.js"
import HealthBar from "../objects/HealthBar.js"
import Enemy from "../objects/Enemy.js"
import Health from "../objects/Health.js"

class PlayScene extends Phaser.Scene {
    constructor() {
        super("playGame")
        this.totalWidth = 4500
        this.groundPlane = 975
        this.enemyKills = 0
    }

    create() {
        //set scene background
        this.background = this.add.tileSprite(0, 0, this.totalWidth, 1000, "background")
        this.background.setOrigin(0, 0)

        //platform group
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(0, this.groundPlane, "ground")
        this.platforms.create(1200, 900, "ground")
        this.platforms.create(2400, this.groundPlane - 200, "ground")
        this.platforms.create(3600, this.groundPlane, "ground")
        this.platforms.create(4900, this.groundPlane - 150, "ground")

        //enemy group, spawn an enemy on each platform
        this.enemies = this.physics.add.group()

        for (let i = 0; i < this.platforms.getChildren().length; i++) {
            let plat = this.platforms.getChildren()[i]
            let x = plat.x
            if (i == 0) {
                this.enemies.add(new Enemy(this, 300, 500))
            }
            else {
                this.enemies.add(new Enemy(this, x, 500))
            }
        }

        this.enemies.children.iterate((enemy, i) => {
            let plat = this.platforms.getChildren()[i]
            let x = plat.x
            let y = plat.y 
            let width = plat.width
            if(i == 0) {
                enemy.create([0, width / 2])
            }
            else{
                enemy.create([x - width / 2, x - width / 2 + width])
            }
        })

        //health group
        this.healthGroup = this.physics.add.staticGroup()

        //create player sprite
        this.stickman = new Stickman(this, 50, 500)
        this.stickman.create()

        //create scene physics
        this.physics.world.setBounds(0, 0, 4500, 2000)
        this.physics.add.collider(this.stickman, this.enemies, this.handleEnemyCollision, null, this)
        this.physics.add.collider(this.stickman, this.platforms, () => this.stickman.onGround = true)
        this.physics.add.collider(this.enemies, this.platforms)

        //get keyboard inputs
        this.cursorKeys = this.input.keyboard.createCursorKeys()

        //create healthbar for scene
        this.healthbar = new HealthBar(this, 25, 20)
        this.healthbar.bar.setScrollFactor(0, 0)

        this.cameras.main.setBounds(0, 0, 4500, this.background.displayHeight)
        this.cameras.main.startFollow(this.stickman)
    }

    update() {
        if (this.stickman) {
            this.stickman.moveStickman()
            if (this.cursorKeys.space.isDown && this.stickman.onGround) {
                this.stickman.jump()
                setTimeout(() => {
                    this.stickman.onGround = false
                }, 300)
            }
            if (this.stickman.y > this.groundPlane + 100) {
                this.gameOver()
            }
        }

        this.enemies.children.iterate((enemy) => {
            enemy.move()
        })
    }

    handleEnemyCollision(stickman, enemy) {
        //check if the stickman jumped on top of the enemy
        let attackedEnemy = stickman.body.touching.down && enemy.body.touching.up
        if (attackedEnemy) {
            enemy.setVelocityY(-250)
            enemy.setRotation(3.14)
            enemy.setVelocityX(0)
            let x = enemy.x
            let y = enemy.y
            enemy.disableBody()
            setTimeout(() => {
                enemy.destroy()
                this.enemyKills += 1
                let plat = this.platforms.getChildren()[this.enemyKills]
                let newEnemyX = plat.x
                let yBound = plat.y
                let widthBounds = plat.width
                this.healthGroup.add(this.health = new Health(this, x, y))
                this.healthGroup.children.iterate((health) => {
                    this.health.create()
                    this.physics.add.collider(health, stickman, this.getHealth, null, this)
                })
            }, 700)
        }
        else {
            if (this.healthbar.total == 25) {
                this.healthbar.decrease(25)
                this.gameOver()
            }
            this.healthbar.decrease(25)
            if (stickman.x <= enemy.x) {
                stickman.x -= 100
            }
            else {
                stickman.x += 100
            }
            enemy.disableBody()
            setTimeout(() => {
                enemy.enableBody()
            }, 1000)
        }
    }

    getHealth(health) {
        if (this.healthbar.total < 100) {
            this.healthbar.increase(25)
        }
        health.destroy()
    }

    gameOver() {
        this.stickman.disableBody()
        this.add.text(this.cameras.main.midPoint.x, this.game.config.height / 2, "GAME OVER", { font: "20px, Arial", fill: "black" }).setScale(3)
        setTimeout(() => {
            this.stickman.destroy()
            this.scene.restart()
        }, 2000)
    }
}

export default PlayScene