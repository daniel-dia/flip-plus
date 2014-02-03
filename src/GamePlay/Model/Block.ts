module InvertCross.GamePlay.Model {
    export class Block {

        public col: number;
        public row: number;
        public state: boolean;
        public inverted: boolean;
        public draw: boolean;

        constructor(col: number, row: number) {
            this.col = col;
            this.row = row;
        }

        toString() {
            return "(status = " + this.state + ", pos=" + this.col + "," + this.row + ")";
        }

        toggleState() {
            this.state = !this.state;
        }

        toggleInverted() {
            this.inverted = !this.inverted;
        }

        toggleDraw() {
            this.draw= !this.draw;
        }

    }
}

