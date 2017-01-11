const width = 800;
const heigth = 450;

var mainState = {
    preload: function() {  
        // Ici, nous préchargeons les actifs
        game.load.image('paddle', './paddle.png');
        game.load.image('brick', './brick.jpeg'); 
        game.load.image('ball', './balle3.png');
        game.load.image('background', './background.jpeg') 
    },

    create: function() {  
        // Ici nous créons le game
        // Définir la couleur de fond en bleu
        this.background = game.add.sprite(0,0, 'background');
        this.background.width = game.width;
        this.background.heigth = game.heigth;
		// game.stage.backgroundColor = '#1BE4C9';

		// Démarrez le système physique de l'Arcade (pour les mouvements et les collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Ajouter le moteur physique à tous les objets du jeu
		game.world.enableBody = true;

		// Create the left/right arrow keys
    	this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    	this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    	// Add the paddle at the bottom of the screen
    	this.paddle = game.add.sprite(200, 400, 'paddle');

    	// Make sure the paddle won't move when it hits the ball
    	this.paddle.body.immovable = true;
    	this.paddle.body.collideWorldBounds = true;

    	    // Create a group that will contain all the bricks
    	this.bricks = game.add.group();  

    		// Add 25 bricks to the group (5 columns and 5 lines)
    	for (var i = 0; i < 12; i++) {
        	for (var j = 0; j < 5; j++) {
            	// Create the brick at the correct position
            	var brick = game.add.sprite(55+i*60, 55+j*25, 'brick');

            	// Make sure the brick won't move when the ball hits it
            	brick.body.immovable = true;

            	// Add the brick to the group
            	this.bricks.add(brick);
        	}
    	}
    	// Add the ball 
    	this.ball = game.add.sprite(200, 300, 'ball');  

    	// Give the ball some initial speed
    	this.ball.body.velocity.x = 200;
    	this.ball.body.velocity.y = 200;

    	// Make sure the ball will bounce when hitting something
    	this.ball.body.bounce.setTo(1); 
    	this.ball.body.collideWorldBounds = true;

    },

    update: function() {  
        // Ici, nous mettons à jour le jeu 60 fois par seconde

        // Move the paddle left/right when an arrow key is pressed
    	if (this.left.isDown) this.paddle.body.velocity.x = -300;
    	else if (this.right.isDown) this.paddle.body.velocity.x = 300; 

    	// Stop the paddle when no key is pressed
    	else this.paddle.body.velocity.x = 0;

    	// Add collisions between the paddle and the ball
    	game.physics.arcade.collide(this.paddle, this.ball);

    	// Call the 'hit' function when the ball hits a brick
    	game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

    	// Restart the game if the ball is below the paddle
    	if (this.ball.y > this.paddle.y)
        	game.state.start('main');  
    },

    // New function that removes a brick from the game
	hit: function(ball, brick) {  
    	brick.kill();
    }
};

// Initialiser le jeu et démarrer notre état
var game = new Phaser.Game(width, heigth);  
game.state.add('main', mainState);  
game.state.start('main');