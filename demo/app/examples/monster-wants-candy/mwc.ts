let canvas;
import TNSPhaser from 'nativescript-phaser-ce';
import { Candy } from './src/Game';
declare var Phaser;
export function loaded(args) {
    const page = args.object;
}
export function canvasLoaded(args) {
    canvas = args.object;

    var game = new TNSPhaser.game({canvas, renderer: 1});
    // add game states
	game.state.add('Boot', Candy.Boot);
	game.state.add('Preloader', Candy.Preloader);
	game.state.add('MainMenu', Candy.MainMenu);
	game.state.add('Game', Candy.Game);
	// start the Boot state
	game.state.start('Boot');

}
export function indicatorLoaded(args) {

}
