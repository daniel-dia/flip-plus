module FlipPlus.Menu {

    //screens that presents a slideshows
    export class SlideShow extends gameui.ScreenState {

        //images array. contains all loaded images for slideshow
        private images: Array<createjs.DisplayObject>;
        private currentSlide: number;

        //slide interval
        private slideTimeOut: number;

        //callback to finish the slideshow
        public onfinish: ()=> any;

        
        //constructor
        constructor(slides: Array<string>) {
            super();

            //load allimages
            this.loadSlides(slides);

            //add hitarea
            this.content.hitArea = new createjs.Shape(new createjs.Graphics().drawRect(0, 0, DefaultWidth, DefaultHeight));

            //adds callback forrr touch
            this.content.addEventListener("click", () => {
                this.nextSlide();
            });

            //adds hitarea
            var s = new createjs.Shape();
            s.graphics.beginFill("#FFF").rect(0, 0, DefaultWidth, DefaultHeight);
            this.content.hitArea = s;
        }

        //loadSlideShowImages
        private loadSlides(slides: Array<string>) {

            //initializes the image array
            this.images = new Array();

            //load all images in images array
            for (var s in slides) {
                var image = gameui.AssetsManager.getBitmap(slides[s]);
                this.images.push(image);
                this.content.addChild(image);
            }
        }

        //displau next slide in sequence
        private nextSlide() {

            if (this.currentSlide===undefined)
                //verifies if currentSlide is set
                this.currentSlide = 0;
            else
                //increment the current slide
                this.currentSlide ++

            //if slidesshows ends, then dispatch a event
            if (this.currentSlide > this.images.length - 1) {

                //clear interval
                clearTimeout(this.slideTimeOut);

                //sends callback
                if (this.onfinish) this.onfinish();
                return;
            }
            
            //show the currentSlide
            this.showSlide(this.currentSlide);

        }

        //show a slide
        private showSlide(slideIndex: number) {

            //verifies if slide is valid
            if (slideIndex > this.images.length - 1 || slideIndex  <0) return;
             
            //hide all images   
            for (var i in this.images)
                this.images[i].visible = false;
            
            //show s a current slide
            this.images[slideIndex].visible = true;

            //set slide interval
            clearTimeout(this.slideTimeOut);
            this.slideTimeOut = setTimeout(() => {
                this.nextSlide();
            },3000);
        }

        //when the screen is activated
        activate(parameters?: any) {

            //clear interval
            clearTimeout(this.slideTimeOut);

            //stars a slideshow
            this.nextSlide();
        }
    }
} 