module FlipPlus.GamePlay {
    export class Tutorial extends LevelPuzzle {

        private currentTutorialStep: number = 0;

        private tutorialSteps: Array<Levels.tutorialStep>;
        private tutorialStepsEnd: Array<Levels.tutorialStep>;

        private endTutorial:() =>any;

        constructor(levelData: Levels.Level) {
            super(levelData);

            this.tutorialSteps = [];
            this.tutorialStepsEnd = []

            this.endTutorial = () => {
                this.boardSprite.tutorialRelease();
            }

            for (var t in levelData.tutorial) {
                if (levelData.tutorial[t].atEnd)
                    this.tutorialStepsEnd.push(levelData.tutorial[t]);
                else
                    this.tutorialSteps.push(levelData.tutorial[t]);
            }
        }

        //create tutorial steps and callbacks
        private executeTutorialActions(step: Levels.tutorialStep) {

            //create for text step
            if (step.text) {

                var text = StringResources[step.text];
                var title = StringResources[step.title];
                var image = step.image;

                this.popup.showTextImage(title, text, image);
                var listener = this.popup.once("onclose", () => {
                    this.playNextTurorialStep();
                });
            }

            //create for menu item step
            if (step.item) {
                this.boardSprite.tutorialLockBlocks();
                this.gameplayMenu.tutorial_HighlightItem(step.item,step.parameter);
                var listener2 = this.gameplayMenu.once(step.item, () => {
                    this.boardSprite.tutorialRelease();
                    this.gameplayMenu.tutorial_unlockAllButtons();
                    this.playNextTurorialStep();
                });
            }

            //create for block item clicks
            if (step.clicks) {

                var listeners = new Array<PIXI.EventEmitter>();
                for (var c in step.clicks) {
                    //this.boardSprite.tutorialHighlightBlocks(step.clicks[c]);
                    //this.gameplayMenu.tutorial_lockAllButtons();
                    //
                    //this.boardSprite.once("ontutorialclick", next);
                    //
                    //var next = ()=>{
                    //    this.playNextTurorialStep();
                    //    this.gameplayMenu.tutorial_unlockAllButtons();
                    //}
                }
            }

            //create for block item click
            if (step.click != undefined) {
                this.boardSprite.tutorialHighlightBlocks(step.click);
                this.gameplayMenu.tutorial_lockAllButtons();
                var listener5 = this.boardSprite.once("ontutorialclick", () => {
                    this.playNextTurorialStep();
                    this.gameplayMenu.tutorial_unlockAllButtons();
                });
            }
        }

        private playNextTurorialStep() {

            //Execute one more tutorial step
            if (this.currentTutorialStep < this.tutorialSteps.length) {
                this.executeTutorialActions( this.tutorialSteps[this.currentTutorialStep]);
                this.currentTutorialStep++;
            }
            else 
                this.endTutorial();
                
        }

        public activate(parameters?: any) {
            super.activate(parameters);

            //start tutorial steps
            this.playNextTurorialStep();
        }
  
        public win(col: number, row: number) {


            if (this.tutorialStepsEnd.length == 0)
                super.win(col, row);
            else {
                this.boardSprite.mouseEnabled = false;

                setTimeout(() => {
                    this.currentTutorialStep = 0;
                    this.tutorialSteps = this.tutorialStepsEnd;

                    this.playNextTurorialStep();

                    this.endTutorial = () => {
                        super.win(col, row, false);
                    }

                }, 500);
            }
          
        }
    }
}