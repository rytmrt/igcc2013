/*----------------------------------------------------------------------------*
 * GameScene.js
 *
 * v0.0.1 (Sep. 13, 2013)
 * Created and maintenance by R.Morita<ryota.morita.3.8@gmail.com>
 * Copyright (c) 2013 moryapps. All rights reserved.
 *----------------------------------------------------------------------------*/


var GameScene = function (game) {
    this.scene = new Scene();

    GameScene.prototype.getScene = function () {
        return this.scene;
    }

    this.scene.backgroundColor = '#aaaaff';

    var bg = new Sprite (960, 640);
    bg.image = game.assets['img/background.png']
    this.scene.addChild(bg);

    var friendlyShip = new Sprite (74, 38);
    friendlyShip.image = game.assets['img/friendly_ship.png'];
    friendlyShip.x = 100;
    friendlyShip.y = 200;
    friendlyShip.npos = new Vec2(friendlyShip.x, friendlyShip.y);
    friendlyShip.pos = new Vec2(friendlyShip.x + 1, friendlyShip.y + 1);
    friendlyShip.dvec = new Vec2(1, 0);
    friendlyShip.dvec.normalize();
    this.scene.addChild(friendlyShip);

    var enemy = new Sprite (74, 38);
    enemy.image = game.assets['img/enemy.png'];
    enemy.x = 400;
    enemy.y = 500;
    this.scene.addChild(enemy);

    var ui = new Sprite (960, 640);
    ui.image = game.assets['img/interface.png']
    this.scene.addChild(ui);

    var touchque = new Array();
    var touchstart = {x:0, y:0};
    this.scene.addEventListener('touchstart', function(e) {
        touchstart.x = e.localX;
        touchstart.y = e.localY;

        var lc = touchstart.x > friendlyShip.x;
        var rc = touchstart.x < (friendlyShip.x + friendlyShip.width);
        var uc = touchstart.y > friendlyShip.y;
        var dc = touchstart.y < friendlyShip.y + friendlyShip.height;
        if (lc && rc && uc && dc) {
            touchque.splice(0, touchque.length);
        }
    });

    this.scene.addEventListener('touchmove', function(e) {
        var lc = touchstart.x > friendlyShip.x;
        var rc = touchstart.x < (friendlyShip.x + friendlyShip.width);
        var uc = touchstart.y > friendlyShip.y;
        var dc = touchstart.y < friendlyShip.y + friendlyShip.height;
        if (lc && rc && uc && dc) {
            touchque.push(new Vec2(e.localX, e.localY));
        }
    });

    var point = new Array();
    this.scene.addEventListener('enterframe', function () {

        for (var j = 0; j < point.length; j++) {
            this.scene.removeChild(point.shift());
        }

        for (var i in touchque) {
            var sur = Circle(2,'#000');
            sur.x = touchque[i].x;
            sur.y = touchque[i].y;
            this.scene.insertBefore(sur, ui);
            point.push(sur);
        }

        var tmp = friendlyShip.npos.subV(friendlyShip.pos);
        if (tmp.length() > 1) {
            tmp.normalize();
            friendlyShip.pos = friendlyShip.pos.addV(tmp.mulS(1));

            friendlyShip.x = friendlyShip.pos.x - (friendlyShip.width / 2);
            friendlyShip.y = friendlyShip.pos.y - (friendlyShip.height / 2);
        }
        else if (touchque.length > 0) {

            friendlyShip.npos = touchque.shift();
        }
    });

};
