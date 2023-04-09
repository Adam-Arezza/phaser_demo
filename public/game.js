import BootScene from './scenes/BootScene.js'
import PlayScene from './scenes/PlayScene.js'

const config = {
    width: 960,
    height: 720,
    backgroundColor: 0x000000,
    physics: {
        default: "arcade",
        arcade: {
            debug:true
        }
    }
}

const game = new Phaser.Game(config)
game.scene.add("bootGame", BootScene)
game.scene.add("playGame", PlayScene)
game.scene.start("bootGame")