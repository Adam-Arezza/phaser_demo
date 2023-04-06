class Health extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene,x,y,"health")
        this.x = x
        this.y = y
        this.val = 25
        this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this)
        this.scene = scene
        this.scene.add.existing(this)
    }

    create(){
        this.body.collideWorldBounds = true
        this.body.setGravityY(1000)
        this.body.pushable = false
        this.scene.physics.add.collider(this, this.scene.ground)
    }
}

export default Health