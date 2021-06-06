## 🖱️ Mouse Click Effect

![matter-js](https://img.shields.io/badge/matter--js-0.17.1-blue.svg)
![quality](https://img.shields.io/badge/quality-experimental-green.svg)
![browsers](https://img.shields.io/badge/browsers-chrome%20edge%20firefox-yellow.svg)
![license](https://img.shields.io/badge/license-MIT%20(inherited)-blueviolet.svg)

Fancy onclick actions when using mouse in web apps. The plugin script is based on [matter-js](https://github.com/liabru/matter-js), which is a physics engine on html canvas.


### ✨ How To Use

First, finsh your own web frontend with basic functionality. Download and place [matter.js](https://github.com/liabru/matter-js/blob/master/build/matter.js), [mouseclick-effect.js](https://github.com/der3318/mouseclick-effect/blob/main/mouseclick-effect.js) and [star.jpg](https://github.com/der3318/mouseclick-effect/blob/main/star.jpg) into the same folder.

Add the canvas element and scripts to the starting section of "body":

```html
<html>
  <head> <!-- some stuff --> </head>
  <body>
    <canvas id="mouseclick-effect-canvas" style="position: fixed; z-index: 1;"></canvas>
    <script src="./matter.js"></script>
    <script src="./mouseclick-effect.js"></script>
    <!-- main content -->
  </body>
</html>
```

Noted that `z-index: 1;` is optional. Without the css styling property, the effect will be limited to only the blank spaces. On the order hand, when the z-index is specified, the canvas is put on top of the web app, while some of the mouse actions may not be propagated to the right layer:

| Style | w/o z-index | w/ z-index |
| :-: | :-: | :-: |
| Sample | ![mode1.gif](/mode1.gif) | ![mode2.gif](/mode2.gif) |


### 🔧 Configurations - Texture & Quantity

Modify [mouseclick-effect.js](https://github.com/der3318/mouseclick-effect/blob/main/mouseclick-effect.js) to set customized image (128×128 in pixels) and the instance count of the effect:

```javascript
// at the config section of mouseclick-effect.js
var textureFile = "PATH-TO-THE-IMG-FILE";
var quantity = PREFERRED-INSTANCE-COUNT;
```

