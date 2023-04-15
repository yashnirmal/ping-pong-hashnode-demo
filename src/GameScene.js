import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene{

	constructor(){
		super()
		this.score = 0
		this.speedControl = 0
	}

	/* When a scene is loaded, the create() function is called once,
	 and everything that we add to the scene in this function will stay in the scene
	 until we explicitly remove it. */
	create(){

		// create a circle 400 unit from left and 100 unit from top of
		// the ball has color #ffffff(white) and opacity 1 
		this.ball = this.add.circle(400,100,10,0xffffff,1)
		// adding the physic that we created in game config objec tot ball
		this.physics.add.existing(this.ball)
		// settin the bounce in x and y direction
		this.ball.body.setBounce(1,1)
		// below line is added, to make the ball bounce off the world(game screen)
		this.ball.body.setCollideWorldBounds(true,1,1)
		// giving velocity of 200 and 200 in both x and y direction
		this.ball.body.setVelocity(200,200)


		// adding tha paddle at 400 units from left and 450 from top
		// with width of 200 and 20 height
		// color is #ffffff(white) and opacity is 1
		this.paddle = this.add.rectangle(400,450,200,20,0xffffff,1)
		// we are adding the physics to paddle but the static(2nd argument) is set to true, so our paddle won't move automatically
		this.physics.add.existing(this.paddle,true)
		// enabling collision between paddle and ball
		this.physics.add.collider(this.paddle,this.ball)

		// it creates an object containing four properties: up, down, left, and right, that correspond to the arrow keys on a keyboard.
		// we are storing the object in 'cursors'
		this.cursors = this.input.keyboard.createCursorKeys()


		// adding text in the scene, that will show score
		// its added is position 10 from left and 10 from top
		this.scoreText = this.add.text(10,10,"Score : "+this.score)
	}

	/*
	The update() function in a Phaser scene is called every frame of the game loop, usually 60 times per second,
	It is used to update the position of the elements present in the scene, like ball in our case
	*/
	update(){

		// checking if the user pressed left key
		if(this.cursors.left.isDown){
			this.paddle.x -= 10  // moving paddle to10 units left
			this.paddle.body.updateFromGameObject()  //updating the physics body of a paddle to match its current position
		}
		else if (this.cursors.right.isDown){ // checking if the user pressed right key
			this.paddle.x += 10
			this.paddle.body.updateFromGameObject()
		}
		

		//do game over if the ball touches the bottom surface
		if(this.ball.y+this.ball.radius>=500){
			// stopping the ball and showing alert
			this.ball.body.setVelocity(0,0)
			alert("Game Over!!! Your Score : "+this.score)

			// after user interact with alert
			// score becomes zero and its position and velocity is reset
			this.score=0
			this.ball.setPosition(400,100)
			this.ball.body.setVelocity(200,200)
		}

		// updating the speedcontrol every time update is run and rendering the score
		this.speedControl +=1
		this.scoreText.text = "Score : "+this.score	

		// rememer the update function is run about 60 times a second
		// and we don't want to increase the score this fast
		// so we make a condition that everytime speedcontrol become a multiple of 100 we update the score
		// this makes the code inside the if condition run 100 time slower that the update
		// you can change 100 with a number you like, to make the code inside if run faster or slower
		if(this.speedControl%100===0){
			// increase the score
			this.score+=1                 
			// increasing the ball velocity in y direction by little, to make the game more challenging 
			const vel = this.ball.body.velocity
			this.ball.body.setVelocityY(vel.y*1.05)
		}
	}
}