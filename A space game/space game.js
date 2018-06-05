var mainState = {

    
    preload: function () {
        //load graphics
        game.load.image('player', 'assets/Space turtle.png');
        game.load.image('block', 'assets/meteor.png');
        game.load.image('baddy', 'assets/squid person.png');
        game.load.image('door', 'assets/end.png');
        game.load.image('background', 'assets/Space background 1.jpg');
        game.load.image('lava block', 'assets/lava (fin).png');
        game.load.audio('Music', 'assets/AceRimmer.mp3');
        
    },
    
    create: function () {
        // set BG colour
        game.stage.backgroundColor = '#3928b9';
        game.physics.startSystem(Phaser.Physics.ARCADE); // start the physics engine
        background=game.add.sprite(0,0,'background');
        //make maze
        this.buildMaze();
    
        //create player
        
        //create player
        player=game.add.sprite(60,405,'player');
        game.physics.arcade.enable(player);
        
        // make baddies a group of objects
        baddies = game.add.group();
        baddies.enableBody = true; // add physics to the baddies
        
        // create baddy
        var baddy = game.add.sprite(210,210,'baddy');
        baddies.add(baddy);
        
        //create baddy 2
        var baddy = game.add.sprite(700,100,'baddy');
        baddies.add(baddy);

        
        //create door
        door=game.add.sprite(50,100,'door');
        game.physics.arcade.enable(door);
            
        // initialise keyboard cursors
        cursors = game.input.keyboard.createCursorKeys();
		
		//this is my music loop
		Music = game.add.audio('Music');
		Music.loop = true;
		Music.play();
       
    },
    
    update: function() {
        // set up collisions
        game.physics.arcade.collide(player,maze);
        
        game.physics.arcade.overlap(player,baddies,this.endGame,null,this);
        
        game.physics.arcade.collide(maze,baddies);
        
        game.physics.arcade.overlap (player,lava,this.endGame,null,this);
        
        game.physics.arcade.overlap(player,door,this.winGame,null,this);

        this.movePlayer();
        this.moveBaddies();

    },
    
    buildMaze: function(){
        // make maze a group of objects
        maze = game.add.group();
        maze.enableBody = true; // add physics to the maze
        maze.setAll('body.immovable', true); // make the maze objects immovable
        
        // make maze a group of objects
        lava = game.add.group();
        lava.enableBody = true; // add physics to the maze
        lava.setAll('body.immovable', true); // make the maze objects immovable
        
        var blockArray = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
            [1,0,1,2,1,0,0,1,0,1,1,0,0,1,0,1],
            [1,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,2,1,1,0,1,0,1,1],
            [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,0,1,1,2,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            ];
        
        for (var r=0;r<blockArray.length;r++){
            
            for (var c=0; c<blockArray[r].length;c++){
                console.log("Column",c);
                console.log("Row",r);
                
                // create wall if 1
                if(blockArray[r][c]==1){
                   var block=game.add.sprite(c*50,r*50,'block');
                    maze.add(block);
                }
                
                // create lava if 2
                if(blockArray[r][c]==2){
                   var block=game.add.sprite(c*50,r*50,'lava block');
                    lava.add(block);
                }
            }
            
        }
        
        maze.setAll('body.immovable', true);
    },
    
    movePlayer: function(){
        if (cursors.left.isDown) {
            player.body.velocity.x=-200;                       
        } else if (cursors.right.isDown) {
            player.body.velocity.x=200;
        } else {
            player.body.velocity.x=0;
        }
        
        
        if (cursors.up.isDown) {
            player.body.velocity.y=-200;
        } else if (cursors.down.isDown) {
            player.body.velocity.y = 200;
        } else {
            player.body.velocity.y = 0;
        }
        
        
    },
    
    moveBaddies: function() {
        
        baddies.forEach(function(baddy){
            if (player.x>baddy.x){
                baddy.body.velocity.x=170;
            }else if (player.x<baddy.x){
                baddy.body.velocity.x=-170;
            }

            if (player.y>baddy.y){
                baddy.body.velocity.y=170;
            }else if (player.y<baddy.y){
                baddy.body.velocity.y=-170;
            }
        });
    },
    
    endGame: function(){
        console.log('hit enemy');
        game.state.start('menu');
             
        
    },
    
    winGame: function(){
        
        // display message
        messageLabel = game.add.text(100, 250, 'Congradulations you won press "F5" to replay',{ font: '25px Arial', fill: '#ffffff' });
        game.stage.backgroundColor = '#182d3b';
        
        player.kill();
        baddies.forEach(function(baddy){
            baddy.kill();
        });
        background.kill();
        door.kill();
        
        maze.forEach(function(block){
            block.kill();
        });
        lava.forEach(function(block){
            block.kill();
        });
    },

    
    
};


var player, key, door,cursors,maze;

