
var gameScene = function (game) {

    var scene = new Scene ();
    scene.backgroundColor = 'rgba(128, 128, 256, 1)';

    var friendlyShip = new Sprite (79, 82);
    friendlyShip.image = game.assets['img/friendly_ship.png'];
    friendlyShip.x = 100;
    friendlyShip.y = 100;
    friendlyShip.npos = new Vec2(friendlyShip.x, friendlyShip.y);
    friendlyShip.pos = new Vec2(friendlyShip.x + 1, friendlyShip.y + 1);
    friendlyShip.dvec = (new Vec2(1, 0)).normalize();

    var touchque = new Array();
    var touchstart = {x:0, y:0};
    scene.addEventListener('touchstart', function(e) {
        var lc = touchstart.x > friendlyShip.x;
        var rc = touchstart.x < (friendlyShip.x + friendlyShip.width);
        var uc = touchstart.y > friendlyShip.y;
        var dc = touchstart.y < friendlyShip.y + friendlyShip.height;
        if (lc && rc && uc && dc) {
            touchque.splice(0, touchque.length);
        }
        touchstart.x = e.localX;
        touchstart.y = e.localY;
    });

    scene.addEventListener('touchmove', function(e) {
        var lc = touchstart.x > friendlyShip.x;
        var rc = touchstart.x < (friendlyShip.x + friendlyShip.width);
        var uc = touchstart.y > friendlyShip.y;
        var dc = touchstart.y < friendlyShip.y + friendlyShip.height;
        if (lc && rc && uc && dc) {
            touchque.push(new Vec2(e.localX, e.localY));
        }
    });

    scene.addEventListener('enterframe', function () {
        var tmp = friendlyShip.npos.subV(friendlyShip.pos);
        if (tmp.length() > 1) {
            tmp.normalize();
            friendlyShip.pos = friendlyShip.pos.addV(tmp);

            friendlyShip.x = friendlyShip.pos.x - (friendlyShip.width / 2);
            friendlyShip.y = friendlyShip.pos.y - (friendlyShip.height / 2);
        }
        else if (touchque.length > 0) {
            friendlyShip.npos = touchque.shift();
        }

    });

    scene.addChild(friendlyShip);

    return scene;
};
