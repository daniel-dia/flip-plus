module gameui {

    export class MenuContainer extends Grid{
        
        constructor(width: number = null, height: number = null, flowHorizontal: boolean = false) {
            if (!flowHorizontal)
                super(1, 0, width, height, 0, flowHorizontal);
            else
                super(0, 1, width, height, 0, flowHorizontal);
        }

        //adds a text object
        public addLabel(text: string):createjs.Text {
            var textObj: Label;
            textObj = new Label(text);
            this.addObject(textObj);
            return textObj.textField;
        }
        
        //creates a button object
        public addButton(text: string, event: (event: createjs.MouseEvent) => any = null ): TextButton {
            var buttonObj: TextButton = new TextButton(text, null, null, null, event);
            this.addObject(buttonObj);
            return buttonObj;
        }

        public addOutButton(text: string, event: (event: createjs.MouseEvent) => any = null): TextButton {
            var buttonObj: TextButton = new TextButton(text,null,null,null, event);
            this.addObject(buttonObj);
            return buttonObj;
        }
    }
}
