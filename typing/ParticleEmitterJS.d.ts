
declare module createjs {

    export enum ParticleEmitterState {
        Created,
        Running,
        Finished
    }

    export enum ParticleEmitterType {
        Emit,
        OneShot
    }

    export class ParticleEmitter extends DisplayObject{
    
        constructor();
        constructor(particleObject: string);
        constructor(particleObject: HTMLImageElement);

        public reset();

        public position: Point;
        public accelerationX: number;
        public accelerationY: number;
        public angle: number;
        public angleVar: number;
        public autoRemoveOnFinished: number;
        public debugMode: number;
        public duration: number;
        public emissionRate: number;
        public emitterType: createjs.ParticleEmitterType;
        public endColor: Array<number>;
        public endColorVar: Array<number>;
        public endOpacity: number;
        public endSize: number;
        public endSizeVar: number;
        public endSpin: number;
        public endSpinVar: number;
        public image: number;
        public life: number;
        public lifeVar: number;
        public maxParticles: number;
        public positionVarX: number;
        public positionVarY: number;
        public radialAcceleration: number;
        public radialAccelerationVar: number;
        public speed: number;
        public speedVar: number;
        public startColor: Array<number>;
        public startColorVar: Array<number>;
        public startOpacity: number;
        public startSize: number;
        public startSizeVar: number;
        public startSpin: number;
        public startSpinVar: number;
        public state: createjs.ParticleEmitterState;
        public tangentalAcceleration: number;
        public tangentalAccelerationVar: number;

    }
} 