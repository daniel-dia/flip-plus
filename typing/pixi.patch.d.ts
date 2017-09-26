declare module PIXI {
    
    export interface DisplayObject {

       scaleX: number;
       scaleY: number;
       regX: number;
       regY: number;
       skewX: number;
       skewY: number;
       addEventListener: (event: string, fn: Function, context?: any) => PIXI.utils.EventEmitter;
       removeEventListener: (event: string, fn: Function, context?: any) => PIXI.utils.EventEmitter;
       set: (properties: any) => any;
       mouseEnabled: boolean;
       dispatchEvent: (event: string, ...args: any[]) => boolean;

    }

    export interface Container {
        removeAllChildren: () => void;
    }

    
}

declare module PIXI.extras {

    class MovieClip extends DisplayObject {
        constructor(textures: any)
        public play();
        public gotoAndPlay(frame: number|string);
        public stop();
        public pause();
        public loop: boolean;
        public onComplete: any;
    }

}