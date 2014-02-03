
module InvertCross.Parts {

    // Model
    export class PartsManager {

        private ballance: number =  0;

        constructor() {
            this.loadParts();
        }
        
        //Use parts from user amount
        public useParts(parts: number): number {
            
            if (parts > this.ballance)
                return 0;
            
            this.ballance -= parts;
            
            this.saveParts();

            return parts;
        } 

        //add parts to user amount
        public addParts(parts: number) {
            this.ballance += parts;
            this.saveParts();
        }

        //get total balance
        public getBallance(): number {
            return this.ballance;
        }

        //---------------------------- user data storage ----------------------

        //save parts data to storage
        public saveParts(): void  { 
            try {
                localStorage.setItem("partsa", this.ballance.toString());
            }
            catch (e) {
                alert(e);
            }
            
        }

        //loads parts data from storage
        public loadParts(): void {
            var b:string = localStorage.getItem("partsa");
            if (b == null)
                this.ballance = 0;
            else
                this.ballance = parseInt(b);

        }


    }

}
