import Phaser from './phaser';
import { isAndroid } from 'tns-core-modules/platform';
function game({
  canvas,
  width,
  height,
  renderer,
  preventLoop,
  onRender,
  title,
  state,
  transparent,
  antialias,
  physicsConfig,
}) {
  let realWidth;
  let realHeight;
  if (isAndroid) {
    realWidth = canvas.nativeView.getWidth() || 1;
    realHeight = canvas.nativeView.getHeight() || 1;
  } else {
    realWidth = canvas.nativeView.width || 1;
    realHeight = canvas.nativeView.height || 1;
  }

  const config = {
    width: width || realWidth,
    height: height || realHeight,
    renderer: renderer || Phaser.CANVAS,
    title: title || 'tns-phaser-game',
    state: state || null,
    transparent: transparent || false,
    antialias: antialias || true,
    physicsConfig: physicsConfig || null,
  };

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
        //canvas.nativeView.setHandleInvalidationManually(true);
      } else {
        // canvas.nativeView.handleInvalidationManually = true;
      }
      break;
  }

  global.__context = context || null;
  global.document.readyState = 'complete';

  const game = new Phaser.Game(
    width || realWidth,
    height || realHeight,
    renderer || Phaser.CANVAS,
    title || 'tns-phaser-game',
    state || null,
    transparent || false,
    antialias || true,
    physicsConfig || null
  );
  game.width = width || realWidth;
  game.height =  height || realHeight;


  // Use gameloop for smoother drawing
  game.context = context;

  const render = () => {
    requestAnimationFrame(render);
    onRender && onRender();
    if (isAndroid && !is2D) {
      canvas.nativeView.flush();
    } else if (!is2D) {
      canvas.nativeView.flush();
    }
  };
  if (!preventLoop) {
    render();
  }

  return game;
}
export default game;
