/*----------------------------------------------------------------------------*
 * Circle.js
 *
 * v0.0.1 (Sep. 13, 2013)
 * Created and maintenance by R.Morita<ryota.morita.3.8@gmail.com>
 * Copyright (c) 2013 moryapps. All rights reserved.
 *----------------------------------------------------------------------------*/


var Circle = function (radius, color) {
    var surface = new Surface(radius * 2, radius * 2);
    surface.context.beginPath();
    surface.context.arc(radius, radius, radius, 0, Math.PI*2, false);
    surface.context.fillStyle = color;
    surface.context.fill();
    var sprite = new Sprite(radius * 2, radius * 2);
    sprite.image = surface;
    return sprite;
};