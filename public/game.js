const config = {
    width: 960,
    height: 720,
    backgroundColor: 0x000000,
    scene:[scene_1,scene_2],
    physics: {
        default: "arcade",
        arcade: {
            debug:false
        }
    }
}

window.onload = () => {
    const game = new Phaser.Game(config)
}