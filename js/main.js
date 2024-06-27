// -- PARAMS --
var assets = {"imgs" : {}, "fonts" : {}}
var params = {verbose: false, positionMode: "PERCENTAGE", textAlign: "CENTER", imageMode: "CENTER", rectMode: "CENTER"};
// ------------
var content = {};
var myGame;

function handleClick(e){
    // -- p5.js click listener -- //
    pClickListener(e)
}

function touchEnded(e) {
    touches.forEach(touch => {
        console.log(touch.x, touch.y)
    })
}

function preload(){

    assets.imgs.rand1 = loadImage("static/imgs/rand1.png");
    assets.imgs.rand2 = loadImage("static/imgs/rand2.png");

}

function setup(){
    var canvas = createCanvas(window.innerWidth, 1500);
    pixelDensity(1);
    frameRate(60)
    canvas.parent("gameCanvas")
    document.addEventListener("click", (e) => {handleClick(e)});
    myGame = new Game();

    content.s = new ScrollInteraction();
    content.devMode = new DevMode();
}

function draw(){
    clear();
    // background("#b59d9c")
    content.s.draw();
    content.devMode.draw();

}

class ScrollInteraction{

    /*
        Three modes:
            - Standard, bottom to top scrolling where image either repeats, or a new image is shown
            - Tap screen and it auto-scrolls, with either new image or repeat image
            - Tap screen and image briefly disappears, then either new image or repeat image appears
    */

    constructor(){
        // 3 modes: "scroll", "tap-and-scroll", "tap"
        // this.mode = "tap";
        // this.mode = _.sample(["tap", "tap-and-scroll", "scroll"]);
        this.mode = "scroll"
        this.txt = new pText("", 50, 7.5, {textSize: 32});
        this.img = new pImage(50, 30, assets.imgs.rand1);
        this.secondImg = new pImage(50, 70, assets.imgs.rand2);

        this.repeat = _.sample([true, false]);
        console.log(this.repeat ? "With repeat" : "Without repeat")

        this.hide1 = false;
        this.hide2 = false;

        this.runMode();
        
    }

    runMode(){
        switch (this.mode) {
            case "scroll":
                this.handleScroll()
                break;
            case "tap-and-scroll":
                this.tapAndScroll()
                break;
            case "tap":
                this.tap();
                break;
            default:
                throw new Error(`Interaction mode ${this.mode} not recognised. Must be one of: "scroll", "tap-and-scroll", or "tap".`)
        }
    }

    resetImg(){
        document.body.scroll({top: 0, behavior: "smooth"});
        document.body.style.overflowY = "auto";
        document.body.style["touch-action"] = "pan-y";
        this.img.img = assets.imgs.rand1;
        this.hide2 = false;
        this.hide1 = false;
        this.repeat = _.sample([true, false]);
        console.log(this.repeat ? "With repeat" : "Without repeat")
        setTimeout(() => {
            this.runMode();
        }, 250)
        
    }

    handleScroll(){
        // Normal scrolling, where an image is displayed off-screen, and the user scrolls down to view it
        // Turn off scroll-block
        document.body.style["touch-action"] = "pan-y";
        // if this.repeat is true, set second image to first image - and vice versa
        // this.secondImg.img = (this.repeat ? assets.imgs.rand1 : assets.imgs.rand2);
        if (this.repeat){
            this.secondImg.img = assets.imgs.rand1;
        } else {
            this.secondImg.img = assets.imgs.rand2;
        }
        // this.secondImg.img = assets.imgs.rand1;
        // Make sure any leftover click listeners on the image are turned off
        if (this.img.isClickable){this.img.toggleClickable()};
        // Update text instructions
        this.txt.text = "Scroll down to view\n image";
    }

    tapAndScroll(){
        // Mode where the user taps the screen, and the scroll-effect is replicated
        // Lock scrolling
        document.body.style.overflowY = "hidden";
        document.body.style["touch-action"] = "none";
        // Update text instructions
        this.txt.text = "Tap image below to\n reveal image";
        // Add clickable property to image
        if (!this.img.isClickable){this.img.toggleClickable()};
        // if this.repeat is true, set second image to first image - and vice versa
        this.secondImg.img = (this.repeat ? assets.imgs.rand1 : assets.imgs.rand2);
        // On click, simulate a smooth scroll with scrolling API
        this.img.onClick = (e) => {
            // convert difference between images to pixels to feed to scroll function, plus an offset
            let scrollDiff = 1.2*(this.secondImg.pos.y - this.img.pos.y)*height/100;
            document.body.scroll({top: scrollDiff, behavior: "smooth"});
        }
    }

    tap(){
        // User taps the screen, the image disappears, then reappears after a moment
        document.body.style.overflowY = "hidden";
        document.body.style["touch-action"] = "none";
        this.hide2 = true;
        this.txt.text = "Tap image below to\n reveal image";
        if (!this.img.isClickable){this.img.toggleClickable()};
        this.img.onClick = (e) => {
            this.hide1 = true;
            setTimeout(() => {
                this.img.img = (this.repeat ? assets.imgs.rand1 : assets.imgs.rand2);
                this.hide1 = false;
            }, 1000)
            
        }
    }

    draw(){

        this.txt.draw();

        if (!this.hide1){
            this.img.draw();
        }
        if (!this.hide2){
            this.secondImg.draw();
        }

    }
}

class DevMode{
    /*
        This is just a development mode that adds in buttons so you can test all three styles of interaction.
        In this real experiment this wouldn't be available to participants.
    */
    constructor(){
        // add in 3 buttons to show each type of interaction mode

        this.btn1 = new pButton(20, 3, 20, 2.5).addText("scroll", {textSize: 16});
        this.btn2 = new pButton(50, 3, 20, 2.5).addText("tap-and-scroll", {textSize: 10});
        this.btn3 = new pButton(80, 3, 20, 2.5).addText("tap", {textSize: 16});

        this.resetBtn = new pButton(50, 90, 30, 5, {backgroundColor: "red"}).addText("Reset", {textSize: 18, textColor: "white"});
        this.resetBtn.onClick = () => {
            content.s.resetImg();
        }

        // this.btn1.toggleClickable();
        this.btn1.onClick = () => {
            content.s.resetImg();
            content.s.mode = "scroll";
            content.s.handleScroll();
            
        }

        // this.btn2.toggleClickable();
        this.btn2.onClick = () => {
            content.s.resetImg();
            content.s.mode = "tap-and-scroll";
            content.s.tapAndScroll();
        }

        // this.btn3.toggleClickable();
        this.btn3.onClick = () => {
            content.s.resetImg();
            content.s.mode = "tap";
            content.s.tap();
        }
    }

    draw(){
        this.btn1.draw();
        this.btn2.draw();
        this.btn3.draw();
        this.resetBtn.draw();
    }
}