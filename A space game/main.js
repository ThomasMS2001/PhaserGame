var mainState = {

    preload: function() {
        //load graphics
        game.load.image('player', 'assets/Space turtle.png');
        game.load.image('block', 'assets/meteor.png');
        game.load.image('baddy', 'assets/squid person.png');
        game.load.image('door', 'assets/end.png');
        game.load.image('background', 'assets/Space background 1.jpg');
        game.load.image('lava block', 'assets/lava (fin).png');
     
    },
    
    create: function() {
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
        
        // create baddy
        baddy=game.add.sprite(210,210,'baddy');
        game.physics.arcade.enable(baddy);

        
        //create door
        door=game.add.sprite(50,100,'door');
        game.physics.arcade.enable(door);
        
        //trap
        lavablock=game.add.sprite(400,250, 'lava block');
        game.physics.arcade.enable(lavablock);
            
        // initialise keyboard cursors
        cursors = game.input.keyboard.createCursorKeys();
       
    },
    
    update: function() {
        // set up collisions
        game.physics.arcade.collide(player,maze);
        
        game.physics.arcade.overlap(player,baddy,this.endGame,null,this);
        
        game.physics.arcade.collide(maze,baddy);
        
        game.physics.arcade.overlap (player,lavablock,this.endGame,null,this);
        
        game.physics.arcade.overlap(player,door,this.winGame,null,this);

        this.movePlayer();
        this.moveBaddy();

    },
    
    buildMaze: function(){
        // make maze a group of objects
        maze = game.add.group();
        maze.enableBody = true; // add physics to the maze
        maze.setAll('body.immovable', true); // make the maze objects immovable
        
        
        var blockArray = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
            [1,0,1,1,1,0,0,1,0,1,1,0,0,1,0,1],
            [1,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,1],
            [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            ];
        
        for (var r=0;r<blockArray.length;r++){
            
            for (var c=0; c<blockArray[r].length;c++){
                console.log("Column",c);
                console.log("Row",r);
                if(blockArray[r][c]==1){
                   var block=game.add.sprite(c*50,r*50,'block');
                    maze.add(block);
                }
            }
            
        }
        
        maze.setAll('body.immovable', true);
    },
    
    movePlayer: function(){
        if (cursors.left.isDown){
             if (player.x>0){
                 player.body.velocity.x=-200;
             }
                       
        }else if (cursors.right.isDown){
            if (player.x<460){
                player.body.velocity.x=200;
            }
            
        }else{
            player.body.velocity.x=0;
        }
        
        
        if (cursors.up.isDown){
             if (player.y>0){
                 player.body.velocity.y=-200;
             }
                       
        }else if (cursors.down.isDown){
            if (player.y<460){
                player.body.velocity.y=200;
            }
            
        }else{
            
            player.body.velocity.y=0;
        }
        
        
    },
    
    moveBaddy: function(){
        
        if (player.x>baddy.x){
            baddy.body.velocity.x=180;
        }else if (player.x<baddy.x){
            baddy.body.velocity.x=-180;
        }
        
        if (player.y>baddy.y){
            baddy.body.velocity.y=180;
        }else if (player.y<baddy.y){
            baddy.body.velocity.y=-180;
        }
        
    },
    
    endGame: function(){
        
        game.state.start('main');
             
        
    },
    
    winGame: function(){
        
        // display message
        messageLabel = game.add.text(100, 250, 'you won a cookie, but I ate your cookie, you have no cookie ',{ font: '25px Arial', fill: '#ffffff' });
        
        player.kill();
       baddy.kill();
    },

    
    
};


var game = new Phaser.Game(800,500, Phaser.AUTO, 'gameDiv');
var player, baddy, key, door,cursors,maze;

game.state.add('main', mainState);
game.state.start('main');
