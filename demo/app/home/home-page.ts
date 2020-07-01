/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { NavigatedData, Page } from "@nativescript/core/ui/page";
import { Frame } from "@nativescript/core/ui/frame";
import { HomeViewModel } from "./home-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;

    page.bindingContext = new HomeViewModel();
}

function goTo(menu) {
    switch (menu) {
        case "core":
            Frame.topmost().navigate("examples/core-example/core-example");
            break;
        case "goToMWC":
            Frame.topmost().navigate("examples/monster-wants-candy/mwc");
            break;
        default:
            break;
    }
}

export function goToCore(menu) {
    goTo("core");
}

export function goToMWC(menu) {
    goTo("goToMWC");
}
