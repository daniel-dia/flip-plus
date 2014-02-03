/// <reference path="../../lib/easeljs.d.ts" />
/// <reference path="UIItem.ts" />

module Gbase.UI  {

    //this class alow user to arrange objects in a grid forrmat
    //the anchor point is the center of object
    export class Grid extends UIItem {

        //default spacing
        private defaultWSpacing = 800;
        private defaultHSpacing = 300;

        //provided variables
        private flowHorizontal = false;
        private cols: number;
        private rows: number;

        private padding: number;
        private scroll;

        //defined variabples
        private hSpacing: number;
        private wSpacing: number;

        //control variables;
        private currentCol: number = 0;
        private currentRow: number = 0;

        constructor(cols: number = null, rows: number = null, width?: number, height?: number, padding: number = 20, flowHorizontal: boolean = false) {
            super();

            //define the variables
            this.flowHorizontal = flowHorizontal;
            this.cols = cols;
            this.rows = rows;
            this.padding = padding;

            if (width == null) width = 1536;
            if (height == null) height = 2048;

            this.width = width;
            this.height = height;

            //define other parameters
            this.wSpacing = cols == 0 ? this.defaultWSpacing : (width - padding * 2) / cols;
            this.hSpacing = rows == 0 ? this.defaultHSpacing : (height - padding * 2) / rows;

            if (rows == null) this.hSpacing = this.wSpacing
            if (cols == null) this.wSpacing = this.hSpacing
        }

        //place objecrs into a grid format
        public addObject(object: createjs.DisplayObject, clickCallback: (event: createjs.MouseEvent) => any = null) {

            this.addChild(object);
            object.x = this.getXPos();
            object.y = this.getYPos();
            if (clickCallback != null) object.addEventListener("click", clickCallback);
            this.updatePosition();
        }

        private getXPos(): number {
            return this.padding + this.currentCol * this.wSpacing + this.wSpacing / 2;
        }
        private getYPos(): number {
            return this.padding + this.currentRow * this.hSpacing + this.hSpacing / 2;
        }

        //define next Item position
        private updatePosition() {

            if (!this.flowHorizontal) {
                this.currentCol++;
                if (this.currentCol >= this.cols) {
                    this.currentCol = 0;
                    this.currentRow++;
                }
            } else {
                this.currentRow++;
                if (this.currentRow >= this.rows) {
                    this.currentRow = 0;
                    this.currentCol++;
                }
            }
        }

    }
}