class ScrollInteraction{

    /*
        Three modes:
            - Standard, bottom to top scrolling where image either repeats, or a new image is shown
            - Tap screen and it auto-scrolls, with either new image or repeat image
            - Tap screen and image briefly disappears, then either new image or repeat image appears
    */

    constructor(){
        // 3 modes: "scroll", "tap-and-scroll", "tap"
        this.mode = "scroll";

        this.img = new pImage(50, 50, assets.imgs.rand1);
    }

    handleScroll(){
        // Normal scrolling, where an image is displayed off-screen, and the user scrolls down to view it
    }

    tapAndScroll(){
        // Mode where the user taps the screen, and the scroll-effect is replicated
    }

    tap(){
        // User taps the screen, the image disappears, then reappears after a moment
    }

    draw(){
        this.img.draw();
    }
}