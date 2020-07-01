import Phaser from './phaser';
import { isAndroid } from '@nativescript/core/platform';
export default function game({
  canvas,
  width = null,
  height = null,
  renderer,
  preventLoop  = null,
  onRender  = null,
  title  = null,
  state  = null,
  transparent  = null,
  antialias  = null,
  physicsConfig  = null,
}) {
  const realWidth = canvas.width || 1;
  const realHeight = canvas.height || 1;

  /*
  const config = {
    width: width || realWidth,
    height: height || realHeight,
    renderer: renderer || Phaser.CANVAS,
    title: title || 'tns-phaser-game',
    state: state || null,
    transparent: transparent || false,
    antialias: antialias || true,s
    physicsConfig: physicsConfig || null,
  };
  */

  let context;
  let is2D = false;
  switch (renderer) {
    case 2:
      context = canvas.getContext('webgl');
      is2D = false;
      break;
    default:

      context = canvas.getContext('2d');
      is2D = true;
      // handle raf using gameloop
      if (isAndroid) {
        // canvas.nativeView.setHandleInvalidationManually(true);
      } else {
        // canvas.nativeView.handleInvalidationManually = true;
      }
      break;
  }

 // (global as any).__context = context || null;
  (global as any).document.readyState = 'complete';

  canvas.__tag = 'realCanvas';
  const config = {
    width: width || realWidth,
    height: height || realHeight,
    renderer: renderer || Phaser.CANVAS,
    title: title || 'tns-phaser-game',
    state: state || null,
    transparent: transparent || false,
    antialias: antialias || true,
    physicsConfig: physicsConfig || null,
    canvas
  }

  const game = new Phaser.Game(config);

  // Use gameloop for smoother drawing
  // game.context = context;
  //game.canvas = canvas;

  const render = () => {
    requestAnimationFrame(render);
    onRender && onRender();
    if (isAndroid && !is2D) {
      canvas.flush();
    } else if (!is2D) {
      canvas.flush();
    }
  };
  if (!preventLoop) {
    render();
  }

  return game;
}
