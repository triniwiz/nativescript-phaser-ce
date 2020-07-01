import { ImageSource } from "@nativescript/core/image-source/image-source";
import * as fs from "@nativescript/core/file-system";
const icon = "~/examples/core-example/assets/icon.png";
const bullet = "~/examples/core-example/assets/files/bullet.png";
const enemyBullet = "~/examples/core-example/assets/files/enemy-bullet.png";
const explode = "~/examples/core-example/assets/files/explode.png";
const invader = "~/examples/core-example/assets/files/invader32x32x4.png";
const player = "~/examples/core-example/assets/files/player.png";
const starfield = "~/examples/core-example/assets/files/starfield.png";

export const images = {
    icon,
    files: {
        bullet,
        enemyBullet,
        explode,
        invader,
        player,
        starfield,
    },
};

const imageSourceCache = {};

function cacheImages(images: any) {
    const imageArray = Object.keys(images).map((key) => images[key]);
    return imageArray.map((image) => {
        return new Promise((resolve, reject) => {
            ImageSource.fromFile(image)
                .then((imageSrc) => {
                    imageSourceCache[image] = imageSrc;
                    resolve(imageSrc);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    });
}
function uri(value) {
    if (value.startsWith("~/")) {
        return fs.path.join(
            fs.knownFolders.currentApp().path,
           value.replace("~/", "")
        );
    }
    return imageSourceCache[value];
}

export const func = {
    cacheImages,
    uri,
};
