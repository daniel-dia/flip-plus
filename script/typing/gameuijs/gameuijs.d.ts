/// <reference path="../createjs/createjs.d.ts" />
declare module gameui.ui {
    class UIItem extends createjs.Container {
        public width: number;
        public height: number;
        public centered: boolean;
        public animating: boolean;
        private antX;
        private antY;
        public centralize(): void;
        public fadeOut(): void;
        public fadeIn(): void;
        public createHitArea(): void;
    }
}
declare module gameui.ui {
    class Grid extends UIItem {
        private defaultWSpacing;
        private defaultHSpacing;
        private flowHorizontal;
        private cols;
        private rows;
        private padding;
        private scroll;
        private hSpacing;
        private wSpacing;
        private currentCol;
        private currentRow;
        constructor(cols?: number, rows?: number, width?: number, height?: number, padding?: number, flowHorizontal?: boolean);
        public addObject(object: createjs.DisplayObject, clickCallback?: (event: createjs.MouseEvent) => any): void;
        private getXPos();
        private getYPos();
        private updatePosition();
    }
}
declare module gameui.ui {
    class Button extends UIItem {
        public enableAnimation: boolean;
        private originalScaleX;
        private originalScaleY;
        private mouse;
        constructor();
        public returnStatus(): void;
        private onPressUp(Event);
        private onPress(Event);
    }
    class ImageButton extends Button {
        public background: createjs.DisplayObject;
        constructor(background: string, event?: (event: createjs.MouseEvent) => any);
    }
    class TextButton extends ImageButton {
        public text: createjs.Text;
        constructor(text?: string, event?: (event: createjs.MouseEvent) => any, background?: string, font?: string, color?: string);
    }
    class IconButton extends TextButton {
        public icon: createjs.DisplayObject;
        constructor(icon?: string, text?: string, background?: string, event?: (event: createjs.MouseEvent) => any, font?: string, color?: string);
    }
}
declare module gameui.ui {
    class MenuContainer extends Grid {
        constructor(width?: number, height?: number, flowHorizontal?: boolean);
        public addLabel(text: string): createjs.Text;
        public addButton(text: string, event?: (event: createjs.MouseEvent) => any): TextButton;
        public addOutButton(text: string, event?: (event: createjs.MouseEvent) => any): TextButton;
    }
}
declare module gameui.ui {
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
        private stage;
        private myCanvas;
        private defaultWidth;
        private defaultHeight;
        private canvasWidth;
        private canvasHeight;
        private viewer;
        private headerPosition;
        private footerPosition;
        private viewerOffset;
        private currentScreen;
        constructor(canvasElement: string, gameWidth: number, gameHeight?: number, fps?: number, showFps?: boolean);
        public switchScreen(newScreen: ScreenState, parameters?: any, transition?: Transition): void;
        private resizeGameScreen(deviceWidth, deviceHeight, updateCSS?);
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
        static getImagesArray(): HTMLImageElement[];
        static getBitmap(name: string): createjs.DisplayObject;
        private static getImage(name);
        static getMovieClip(name: string): createjs.Sprite;
        static getSprite(name: string, play?: boolean): createjs.Sprite;
    }
}
declare module gameui {
    class Transition {
        public time: number;
        public type: string;
    }
}
