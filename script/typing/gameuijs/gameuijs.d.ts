/// <reference path="../createjs/createjs.d.ts" />
declare module gameui {
    class UIItem extends createjs.Container {
        public width: number;
        public height: number;
        public centered: boolean;
        public animating: boolean;
        private antX;
        private antY;
        public centralize(): void;
        public fadeOut(scaleX?: number, scaleY?: number): void;
        public fadeIn(scaleX?: number, scaleY?: number): void;
        public createHitArea(): void;
    }
}
declare module gameui {
    class Grid extends UIItem {
        private flowHorizontal;
        private cols;
        private rows;
        private padding;
        private hSpacing;
        private wSpacing;
        private currentCol;
        private currentRow;
        constructor(cols: number, rows: number, width: number, height: number, padding?: number, flowHorizontal?: boolean);
        public addObject(object: createjs.DisplayObject): void;
        private getXPos();
        private getYPos();
        private updatePosition();
    }
}
declare module gameui {
    class Button extends UIItem {
        static DefaultSoundId: string;
        static setDefaultSoundId(soundId: string): void;
        private soundId;
        public enableAnimation: boolean;
        private originalScaleX;
        private originalScaleY;
        private mouse;
        constructor(soundId?: string);
        public returnStatus(): void;
        private onPressUp(Event);
        private onPress(Event);
        public setSound(soundId: string): void;
    }
    class ImageButton extends Button {
        public background: createjs.Bitmap;
        constructor(image: string, event?: (event?: createjs.MouseEvent) => any, soundId?: string);
        public centralizeImage(): void;
    }
    class TextButton extends ImageButton {
        public text: createjs.Text;
        constructor(text?: string, font?: string, color?: string, background?: string, event?: (event?: createjs.MouseEvent) => any, soundId?: string);
    }
    class IconButton extends TextButton {
        public icon: createjs.DisplayObject;
        constructor(icon?: string, text?: string, font?: string, color?: string, background?: string, event?: (event?: createjs.MouseEvent) => any, soundId?: string);
        public updateLabel(value: string): void;
        public centralizeIcon(): void;
    }
}
declare module gameui {
    class MenuContainer extends Grid {
        constructor(width?: number, height?: number, flowHorizontal?: boolean);
        public addLabel(text: string): createjs.Text;
        public addButton(text: string, event?: (event: createjs.MouseEvent) => any): TextButton;
        public addOutButton(text: string, event?: (event: createjs.MouseEvent) => any): TextButton;
    }
}
declare module gameui {
    class Label extends UIItem {
        private background;
        public textField: createjs.Text;
        constructor(text?: string, font?: string, color?: string);
    }
}
declare function exitApp(): void;
declare module gameui {
    class ScreenState {
        public content: createjs.Container;
        public header: createjs.Container;
        public footer: createjs.Container;
        public background: createjs.Container;
        public view: createjs.Container;
        public bgmusic: createjs.SoundInstance;
        constructor();
        public activate(parameters?: any): void;
        public desactivate(parameters?: any): void;
        public redim(headerY: number, footerY: number, width: number): void;
        public back(): void;
    }
}
declare function getQueryVariable(variable: string): any;
declare function setMobileScale(a: number): any;
declare var assetscale: number;
declare module gameui {
    class GameScreen {
        public stage: createjs.Stage;
        private myCanvas;
        private defaultWidth;
        private defaultHeight;
        private canvasWidth;
        private canvasHeight;
        private headerPosition;
        private footerPosition;
        private viewerOffset;
        private currentScreen;
        private screenContainer;
        constructor(canvasElement: string, gameWidth: number, gameHeight?: number, fps?: number, showFps?: boolean);
        public switchScreen(newScreen: ScreenState, parameters?: any, transition?: Transition): void;
        public resizeGameScreen(deviceWidth: number, deviceHeight: number, updateCSS?: boolean): void;
        private updateViewerScale(realWidth, realHeight, defaultWidth, defaultHeight);
        private removeOldScreen(oldScreen);
    }
}
declare module gameui {
    class AssetsManager {
        private static loader;
        private static spriteSheets;
        private static imagesArray;
        private static assetsManifest;
        static loadAssets(assetsManifest: any[], spriteSheets?: any[], imagesArray?: HTMLImageElement[]): createjs.LoadQueue;
        static cleanAssets(): void;
        static getImagesArray(): HTMLImageElement[];
        static getBitmap(name: string): createjs.DisplayObject;
        private static getLoadedImage(name);
        static getMovieClip(name: string): createjs.Sprite;
        static getSprite(name: string, play?: boolean): createjs.Sprite;
        static playSound(name: string, interrupt?: boolean, delay?: number, offset?: number, loop?: number, volume?: number): createjs.SoundInstance;
        private static currentMusicName;
        private static currentMusic;
        static playMusic(name: string, volume?: number): void;
    }
}
declare module gameui {
    class Transition {
        public time: number;
        public type: string;
    }
}
