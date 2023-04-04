class scene_1 extends Phaser.Scene {
    constructor(){
        super("bootGame")

    }

    preload(){
        this.load.image("background", "assets/images/backgrounds/background_1.png")
        // this.load.image("stickman", "assets/sprites/stickman.png")
        this.load.image("gameover", "assets/images/backgrounds/gameover.png")
        this.load.atlas("stickman", "assets/spritesheets/stickman.png", "assets/spritesheets/stickman.json")
        this.load.image("ground", "assets/images/backgrounds/ground.png")
        this.load.image("baddy", "assets/sprites/baddy.png")
    }

    create() {
        this.add.text(20,20, "loading game...")
        this.loading()
    }

    loading() {
        let interval = setTimeout(() => {
            this.scene.start("playGame")
        }, 1000)
    }
}