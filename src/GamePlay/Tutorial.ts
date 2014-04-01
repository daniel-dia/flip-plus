module InvertCross.GamePlay {
    export class Tutorial extends Puzzle {

        private currentTutorialStep: number = 0;
        private tutorialSteps: Array<Projects.tutorialStep>;

        constructor(levelData: Projects.Level) {
            super(levelData);

            this.tutorialSteps = levelData.tutorial;
          
        }

        //create tutorial steps and callbacks
        private executeTutorialActions(step: Projects.tutorialStep) {

            //create for text step
            if (step.text) {
                this.popup.showtext(step.title,step.text);
                var listener = this.popup.addEventListener("onclose", () => {
                    this.playNextTurorialStep();
                    this.popup.removeEventListener("onclose", listener);
                });
            }

            //create for menu item step
            if (step.item) {
                this.boardSprite.tutorialLockBlocks();
                this.menuOverlay.tutorial_HighlightItem(step.item,step.parameter);
                var listener2 = this.menuOverlay.addEventListener(step.item, () => {
                    this.boardSprite.tutorialRelease();
                    this.menuOverlay.tutorial_unlockAllButtons();
                    this.playNextTurorialStep();
                    this.menuOverlay.removeEventListener(step.item, listener2);
                });
            }

            //create for block click item
            if (step.click != undefined) {
                this.boardSprite.tutorialHighlightBlocks(step.click);
                this.menuOverlay.tutorial_lockAllButtons();
                var listener3 = this.boardSprite.addEventListener("ontutorialclick", () => {
                    this.playNextTurorialStep();
                    this.boardSprite.removeEventListener("ontutorialclick", listener3);
                    this.menuOverlay.tutorial_unlockAllButtons();
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

        public activate(parameters?: any) {
            super.activate(parameters);

            //start tutorial steps
            this.playNextTurorialStep();
        }
    }
}