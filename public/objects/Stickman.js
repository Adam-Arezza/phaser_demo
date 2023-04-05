class Stickman extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene,x,y,"stickman")
        this.body = new Phaser.Physics.Arcade.Body(scene.physics.world,this)
        this.scene = scene
        scene.physics.add.existing(this)
        this.scene.add.existing(this)
    }

    create(){
        this.setScale(2)
        this.body.collideWorldBounds = true
        this.body.setBounceX(1)
        this.body.setGravityY(1000)
        this.body.pushable = false
        this.anims.create({
            key:"jump",
            frames: this.scene.anims.generateFrameNames("stickman", {prefix: "sprite2", zeroPad:0}),
            repeat: -1
        })

        this.anims.create({
            key:"stand",
            frames: this.scene.anims.generateFrameNames("stickman", {prefix:"sprite1", zeroPad:0}),
            repeat: -1
        })

        this.scene.physics.add.collider(this, this.scene.ground)
        this.play("stand")
    }

    moveStickman() {
        this.play("stand")
        if(this.scene.cursorKeys.right.isDown && this.x <= this.scene.game.config.width - this.width) {
            if(this.x >= this.scene.game.config.width / 2 + this.width * 5){
                this.scene.background.tilePositionX += 4
                this.body.setVelocityX(0)
            }
            else {
                this.body.setVelocityX(250)
            }  
        }

        else if(this.scene.cursorKeys.left.isDown && this.x >= this.width){
            if(this.x <= this.width * 2) {
                // this.scene.background.tilePositionX -= 4
                this.body.setVelocityX(0)
            }
            else{
                this.body.setVelocityX(-250)
            }
        }

        else {
            this.body.setVelocityX(0)
        }
    }

    jump() {
        if(this.y > 500){
            this.play("jump")
            this.body.setVelocityY(-200)
        }
    }

    lose(){
        this.destroy(true,true)
    }
}

export default Stickman