let numOfPanels, rotateYvalue, rotateByDegree, nextPanel, verticalHorizontal, changeOrient, howToRotate;


const btnCarousel = document.querySelector(".btn-carousel");
const btnSlider = document.querySelector(".btn__carousel-slider");
const btnContainer = document.querySelector(".btn__left-right");
const carousel = document.querySelector(".carousel__carousel");
let btnRadio = document.querySelector(".radio__container");
// Select All HTML Carousel panels
let allPanelNL = document.querySelectorAll(".carousel__cell");
// turn nodeList into array
let allPanelArr = Array.prototype.slice.call(allPanelNL);


//GLOBAL variables
nextPanel = 0;
verticalHorizontal = "horizontal";


// Calculate distance from the center for each set of panels
// radians to degrees, tangent function  *********
let radianToDeg = 1 / (180 / Math.PI);
let mathTan = function(deg) {
    return Math.tan(deg * radianToDeg);
};
setPanels();

// ********* init function ************
function setPanels() {
    let widthOfPanel, heightOfPanel, angle, adjacent, opposite, transformZvalue, rotateYIncrease, sideOfTriangle, changeRotation ;
    
    numOfPanels = btnSlider.value;
    widthOfPanel = 210;
    heightOfPanel = 140;
    changeOrient = verticalHorizontal === "horizontal" ? sideOfTriangle = widthOfPanel : sideOfTriangle = heightOfPanel;
    console.log(changeOrient);
    changeRotation = verticalHorizontal === "horizontal" ? howToRotate = "rotateY" : howToRotate = "rotateX";

    //    panelsToHide = numOfPanels;
    // TRIANGLE CALCULATION
    opposite = changeOrient / 2;
    angle = (360 / numOfPanels) / 2;
    adjacent = opposite / mathTan(angle);
    
    // "translateZ()" & "rotateY()" values
    transformZvalue = adjacent;
    rotateYvalue = 360 / numOfPanels;
    rotateByDegree = rotateYvalue;
    rotateYIncrease = 0;
    
    // apply "transform" styles dynamically to the panels;
    for (let i=0; i<allPanelArr.length; i++) {
        if (i < numOfPanels) {
            allPanelArr[i].style.transform = `${howToRotate}(${rotateYIncrease}deg) translateZ(${transformZvalue}px)`;
            rotateYIncrease += rotateYvalue;
            allPanelArr[i].style.opacity = "1"; 
            allPanelArr[i].style.transition = "transform 1s";    
        } else {
            allPanelArr[i].style.transform = `${howToRotate}(-${rotateYIncrease}deg) translateZ(-${transformZvalue}px)`;
            rotateYIncrease -= rotateYvalue;
            allPanelArr[i].style.opacity = "0"; 
            allPanelArr[i].style.transition = "transform 1s, opacity 1s"; 
        }
    }
}


// SLIDER BTN:  eventListener & callback function ****************
function readSlider(e) {
//    numOfPanels = e.target.value;
    setPanels();
}
btnSlider.addEventListener("change", readSlider);


// LEFT/RIGHT btns: eventListener & callback function ********************
function spinCarousel(e) {
    let targetValue = e.target.value;
    targetValue === "right" ? nextPanel -= rotateYvalue : nextPanel += rotateYvalue;
    console.log(howToRotate);
    carousel.style.transform = `translateZ(-288px) ${howToRotate}(${nextPanel}deg)`;
}
btnContainer.addEventListener("click", spinCarousel);


// Horizontal & Vertical - RADIO buttons ***************
function selectOrientation() {
    verticalHorizontal = btnRadio.querySelector(":checked").value;
    console.log(verticalHorizontal);
    setPanels();
}
btnRadio.addEventListener("change", selectOrientation);