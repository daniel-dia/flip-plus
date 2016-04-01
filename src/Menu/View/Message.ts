module FlipPlus.Menu.View {

    // View Class
    export class Message extends gameui.UIItem{

        private closeinterval;

        //class contructor
        constructor() {
            super();
              
            //centralize the popup on screen
            this.width = defaultWidth;
            this.height = defaultHeight;
            this.x = defaultWidth / 2;
            this.y = defaultHeight / 2;

            this.pivot = this.position;
            
            
            //hide popup
            this.visible = false;

            this.mouseEnabled = true;

            this.addEventListener("mousedown", () => { this.closePopUp() });

        }

        //public method to invoke the popup
        public showtext(text: string, timeout: number= 3000,delay:number=0) {


            //clean everything
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/message")
            bg.x = 0;
            bg.y = defaultHeight/2 -500;
            this.addChild(bg);

            //create a text 
            var titleDO = gameui.AssetsManager.getBitmapText(text.toUpperCase(), "fontTitle");
            titleDO.pivot.x = titleDO.textWidth/2;
            titleDO.x = defaultWidth / 2;
            titleDO.y = defaultHeight / 2 - 100;; 
            this.addChild(titleDO);
            
            //shows the popus
            this.closeinterval = setTimeout(() => {
                this.fadeIn(1,0.5);

                // play sound
                gameui.AudiosManager.playSound("Open")

            },delay);;

            //create a interval for closing the popopu
            this.closeinterval = setTimeout(() => {
                this.closePopUp();
            }, timeout+delay);
        }

        //method for close popup 
        private closePopUp() {
            gameui.AudiosManager.playSound("Close")
            //hide the popup{
            clearTimeout(this.closeinterval);
            this.emit("onclose");
            this.fadeOut(1,0.5);
        }
    }
}
