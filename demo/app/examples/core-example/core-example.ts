import { PhaserExampleViewModel } from "./core-example-view-model";
import {maskTest} from './mask-test';
let canvas;
let vm: PhaserExampleViewModel = new PhaserExampleViewModel();
vm.on("propertyChange", (args) => {
    if (!vm.isLoading && !vm.didInit && canvas) {
        vm.setupGame(canvas);
       vm.set("didInit", true);
    }
});


export function loaded(args) {
    const page = args.object;
     page.bindingContext = vm;
    // vm.set('useAccelerometer', false);
}
export function canvasLoaded(args) {
    canvas = args.object;
    if (!vm.isLoading && !vm.didInit && canvas) {
        vm.setupGame(canvas);
        vm.set("didInit", true);
    }
  //  maskTest(canvas);
}
export function indicatorLoaded(args) {
    vm.preloadAssetsAsync();
}
