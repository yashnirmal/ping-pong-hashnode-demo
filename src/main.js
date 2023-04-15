import Phaser from 'phaser'
import GameScene from "./GameScene"


const config = {
	width: 800,
	height: 500,
	type:Phaser.AUTO,   // automatically choose the best renderer
	backgroundColor:'#5D3FD3',

	/* we will use the Arcade Physics system, which is a lightweight 2D physics engine that comes with Phaser.
	The gravity property is set to { y: 0 }, which means there is no gravity in the game.
	If you want gravity to be enabled, you can change the value of the y property to a positive number, like { y: 500 }.
	*/
	physics :{
		default:'arcade',   
		arcade:{
			gravity:{ y:0 },
			// debug is set to true, so it is easy for us to visualiza the physics of the game
			// in prodcution, comment it out
			// debug:true
		}
	}
}

var game = new Phaser.Game(config)
game.scene.add('game-scene',GameScene)
game.scene.start('game-scene')
