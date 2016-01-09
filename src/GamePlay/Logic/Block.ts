module FlipPlus.GamePlay.Logic {
    export class Block {

        //intrinsic data
        public col: number;
        public row: number;
        public state: boolean;

        //modificators
        public inverted: boolean;
        public draw: boolean;
        public hidden: boolean;
        public mirror: boolean;

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

