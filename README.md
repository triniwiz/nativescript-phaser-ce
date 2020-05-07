# nativescript-phaser-ce

Tools for using Phaser-ce to build native 2D games in Expo 👾

- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)

### Installation

```bash
npm i nativescript-phaser-ce
```

### Usage

Import the library into your JavaScript file:

```js
import TNSPhaser from "nativescript-phaser-ce";
```

## Functions

### `TNSPhaser.game({ canvas, renderer: Phaser.WEBGL || Phaser.CANVAS, ...extras })`

Given a `canvas` from a
[`TNSCanvas`](https://github.com/triniwiz/nativescript-canvas-plugin), return a
[`Phaser.Game`](https://photonstorm.github.io/phaser-ce/Phaser.Game.html)
that draws into it.

#### Props

| Property    |         Type          | Description                                                                 |         Default Value         |
| ----------- | :-------------------: | --------------------------------------------------------------------------- | :---------------------------: |
| canvas     | TNSCanvas| Required: canvas that the `Phaser.Game` will render to                     |            `null`             |
| width       |        number?        | Optional: height of the `Phaser.Game`                                       | `canvas height`  |
| height      |        number?        | Optional: width of the `Phaser.Game`                                        | `canvas width` |
| title       |        string?        | Optional: title of the `Phaser.Game`                                        |     `"tns-phaser-game"`      |
| preventLoop |       boolean?        | Optional: Prevents the app from calling `canvas.nativeView.flush()` every frame |            `false`            |

#### Returns

| Property |                              Type                              | Description                                      |
| -------- | :------------------------------------------------------------: | ------------------------------------------------ |
| game     | [`Phaser.Game`](https://photonstorm.github.io/phaser-ce/Phaser.Game.html) | The Phaser-ce game used for rendering game logic |

## Example

```js
const game = TNSPhaser.game({ canvas });
```

## What does it do?

Under the hood, ExpoPhaser is maintaining global instances of a few libraries.

- [Custom Phaser Pixi.js](https://github.com/photonstorm/phaser-ce/tree/master/src/pixi)
- [Custom Phaser p2.js](https://github.com/photonstorm/phaser-ce/blob/master/build/custom/p2.js)
- [Phaser-ce (Community Edition)](https://github.com/photonstorm/phaser-ce)

```js
window.PIXI = require("phaser-ce/build/custom/pixi");
window.p2 = require("phaser-ce/build/custom/p2");
window.Phaser = require("phaser-ce/build/phaser");
```

Other libs can be included but are not required. For instance you can import the custom Creature lib the same way.
We also [override the `PIXI.WebGLRenderer.updateTexture`](https://github.com/expo/expo-phaser/tree/master/lib/Phaser.js) to make it compatible with NativeScript.

Finally when a new instance of `TNSPhaser.Game` is created, we set the `document.readyState` to `'complete'` and save the global instance of `context`

```js
global.__context = context;
global.document.readyState = "complete";
```

Then we create a standard render loop and call `canvas.nativeView.flush()` to flush the frame queue and render our context.

```js
const render = () => {
  requestAnimationFrame(render);
  canvas.nativeView.flush();
};
```

## License

Apache License Version 2.0, January 2004
