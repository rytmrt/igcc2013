window.onload = function () {
    var game = new Game (960, 640);
    game.fps = 30;
    // load image.
    game.preload(
        'img/bullet.png',
        'img/enemy.png',
        'img/friendly_ship.png'
    );
    game.onload = function () {
        game.replaceScene(gameScene(game));
    };

    game.start();
};

