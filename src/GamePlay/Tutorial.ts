module InvertCross.GamePlay {
    export class Tutorial extends Puzzle {

        private currentTutorialStep: number = 0;
        private tutorialSteps: Array<Projects.tutorialStep>;

        constructor(levelData: Projects.Level) {
            super(levelData);
            this.tutorialSteps = levelData.tutorial;
                
            //start tutorial steps
            this.playNextTurorialStep();

        }

        //create tutorial steps and callbacks
        //TODO fazer os callbacks
        private executeTutorialActions(step: Projects.tutorialStep) {

            //creates a tutorial step
            if (step.text) {
                this.popup.showtext(step.text, 3000);
                var listener = this.popup.addEventListener("onclose", () => {
                    this.playNextTurorialStep();
                    this.popup.removeEventListener("onclose", listener);
                });
            }

            if (step.item) {
                this.popup.showtext(step.item, 3000);
                var listener2 = this.popup.addEventListener("onclose", () => {
                    this.playNextTurorialStep();
                    this.popup.removeEventListener("onclose", listener2);
                });
            }

            if (step.click != undefined) {
                this.boardSprite.tutorialHighlightBlocks(step.click);
                var listener3 = this.boardSprite.addEventListener("ontutorialclick", () => {
                    this.playNextTurorialStep();
                    this.boardSprite.removeEventListener("ontutorialclick", listener3);
                });
            }
                    
        }

        private playNextTurorialStep() {

            //Execute one more tutorial step
            if (this.currentTutorialStep < this.tutorialSteps.length) {
                this.executeTutorialActions( this.tutorialSteps[this.currentTutorialStep]);
                this.currentTutorialStep++;
            }

            //if tutorial is over unlock all board
            else {
                this.boardSprite.tutorialRelease();
                //alert("is over 9000");
            }

        }
    }
}