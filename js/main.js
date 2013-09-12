window.onload = function () {
    var game = new Game (960, 640);
    game.fps = 30;
    // load image.
    game.preload(
        'img/background.png',
        'img/interface.png',
        'img/bullet.png',
        'img/enemy.png',
        'img/friendly_ship.png'
    );
    game.onload = function () {
        var gameScene = new GameScene(game);
        game.replaceScene(gameScene.getScene());
    };

    game.start();
};

