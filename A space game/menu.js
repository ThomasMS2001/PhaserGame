var menuState = {
    
    create: function () {
        
        var nameLabel = game.add.text(80, 80, 'Play Space Game' ,
        { font: '50px Arial' , fill: '#ffffff'});
        
        var startLabel = game.add.text(80, game.world.height -80,
        'press the "S" key to start',
        {font: '25px Arial' , fill: '#ffffff'});
        
        var Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
        Skey.onDown.addOnce(this.start, this);
        
        
    },
    
    start: function () {
        game.state.start('space game');
    },
};