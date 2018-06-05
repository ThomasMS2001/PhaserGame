var game = new Phaser.Game(800, 480, Phaser.AUTO, 'gameDiv'); 

game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('space game', mainState);
game.state.start('boot');
