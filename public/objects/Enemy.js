class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene,x,y,"enemy")
        this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)
        this.scene = scene
        scene.physics.add.existing(this)
        this.scene.add.existing(this)
    }

    create(){
        this.body.setGravityY(1000)
        this.body.pushable = false
        this.scene.physics.add.collider(this, this.scene.ground)
    }

    move() {
        // Move towards the left wall, if you reach the left wall, move towards the right wall, continue
        if(this.body) {
            if(this.body.velocity.x < 0 && this.x <= this.scene.physics.world.bounds.x + 100) {
                this.body.setVelocityX(100)
            }
            if(this.body.velocity.x > 0 && this.x >= this.scene.physics.world.bounds.width - 100) {
                this.body.setVelocityX(-100)
            }
            if(this.body.velocity.x == 0) {
                this.body.setVelocityX(-100)
            }
        }
        
    }
}

export default Enemy