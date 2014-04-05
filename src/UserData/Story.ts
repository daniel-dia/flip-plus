module InvertCross.UserData {

    export class Story {

        private storyPrefix = "history_";
        private storyPlayed = "played";

        public getStoryPlayed(storyId: string): boolean {
            var hist = localStorage.getItem(this.storyPrefix + storyId);
            if (hist == this.storyPlayed) return true;
            return false;
        }

        public setStoryPlayed(storyId: string) {
            localStorage.setItem(this.storyPrefix + storyId, this.storyPlayed);
        }

    }
}