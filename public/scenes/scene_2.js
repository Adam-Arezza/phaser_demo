class scene_2 extends Phaser.Scene {
    constructor(){
        super("playGame")
    }

    create(){
        this.background = this.add.tileSprite(0,0, config.width,config.height,"background")
        this.background.setOrigin(0,0)
        this.ground = this.physics.add.sprite(0,665,"ground")
        this.ground.setOrigin(0,0)
        this.ground.setImmovable()
        this.gameover = this.add.image(0,0,'gameover')
        this.anims.create({
            key:"jump",
            frames: this.anims.generateFrameNames("stickman", {prefix: "sprite2", zeroPad:0}),
            repeat: -1
        })

        this.anims.create({
            key:"stand",
            frames: this.anims.generateFrameNames("stickman", {prefix:"sprite1", zeroPad:0}),
            repeat: -1
        })

        this.baddy = this.physics.add.sprite(500,500, "baddy")
        this.physics.world.setBounds(0,0,config.width, config.height)
        this.stickman = this.physics.add.sprite(50, 500, "stickman")
        this.stickman.setScale(2)
        this.physics.add.collider(this.stickman, this.ground)
        this.physics.add.collider(this.stickman, this.baddy)
        this.physics.add.collider(this.baddy, this.ground)
        this.stickman.setGravityY(1000)
        this.baddy.setGravityY(500)
        this.add.text(20,20,"game",{font:"20px, Arial", fill:"black"})
        this.cursorKeys = this.input.keyboard.createCursorKeys()
        this.timer = null
        this.healthbar = this.makeBar(100,20,0x2ecc71)
    }

    update() {
        this.moveStickman()
        // this.background.tilePositionX += 1
        if(this.cursorKeys.space.isDown) {
            this.jump()
        }
        this.moveBaddy()
    }

    moveStickman() {
        this.stickman.play("stand")
        if(this.cursorKeys.right.isDown && this.stickman.x <= config.width - this.stickman.width) {
            if(this.stickman.x >= config.width / 2 + this.stickman.width * 5){
                this.background.tilePositionX += 4
                this.stickman.setVelocityX(0)
            }
            else {
                this.stickman.setVelocityX(250)
            }  
        }

        else if(this.cursorKeys.left.isDown && this.stickman.x >= this.stickman.width){
            if(this.stickman.x <= this.stickman.width * 6) {
                this.background.tilePositionX -= 4
                this.stickman.setVelocityX(0)
            }
            else{
                this.stickman.setVelocityX(-250)
            }
        }

        else {
            this.stickman.setVelocityX(0)
        }
    }

    jump() {
        if(this.stickman.y > 500){
            this.stickman.play("jump")
            this.stickman.setVelocityY(-200)
        }
    }

    makeBar(x,y,color) {
        let bar = this.add.graphics()

        bar.fillStyle(color,1)
        bar.fillRect(0,0,200,25)
        bar.x = x
        bar.y = y
        return bar
    }

    setHealth(bar,val){
        bar.scaleX = val / 100
    }

    moveBaddy() {
        if(this.baddy.y >=500) {
            this.baddy.setVelocityX(-100)
        }
    }

    lose() {
        let restarts = setTimeout(() => {
            this.scene.start()
        },2000)
    }
}
