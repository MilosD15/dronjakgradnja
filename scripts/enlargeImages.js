// two variables for storing images of sliders and for current image index
var biggerImages, currentBigImageIndex;
// fatching all btns for enlarging images in sliders
const enlargeBtns = document.querySelectorAll(".makeBig");
// fatching container for img in pop-up section for enlarging images
const currentBigImage = document.querySelector(".largeImage .image img");
// left and right btns for changing images
const bigLeftBtn = document.querySelector(".largeImage .fa-chevron-left");
const bigRightBtn = document.querySelector(".largeImage .fa-chevron-right");
// times icon for closing pop-up window for enlarging images
const times = document.querySelector(".largeImage .fa-times");
// closing pop-up window
times.addEventListener("click", () => {
    HideBigImage();
    // removing events for btns
    bigLeftBtn.removeEventListener("click", LeftBtnClickEventHandler);
    bigRightBtn.removeEventListener("click", RightBtnClickEventHandler);
})
// adding event listener click for every enlarge btn on a page
enlargeBtns.forEach( btn => {
    btn.addEventListener("click", e => {
        // animation for displaying pop-up
        const largeImageCon = document.querySelector(".largeImage");
        largeImageCon.style.animationName = "ShowImage";
        largeImageCon.style.pointerEvents = "all";
        // removing scrollbar when pop-up is shown
        document.querySelector("body, html").style.overflowY = "hidden";
        // fatching suitable images and current image index for specific sliders
        if(e.composedPath()[2].classList.value === "slider") {
            currentBigImageIndex = startSlider.getCurrentIndex();
            biggerImages = startSliderImages;
        }
        if(e.composedPath()[2].classList.value.indexOf("painting_slider") != -1) {
            currentBigImageIndex = paintingSlider.getCurrentIndex();
            biggerImages = paintingSliderImages;
        }
        if(e.composedPath()[2].classList.value.indexOf("electrican_slider") != -1) {
            currentBigImageIndex = electricianSlider.getCurrentIndex();
            biggerImages = electricianSliderImages;
        }
        if(e.composedPath()[2].classList.value.indexOf("gypsum_slider") != -1) {
            currentBigImageIndex = gypsumSlider.getCurrentIndex();
            biggerImages = gypsumSliderImages;
        }
        if(e.composedPath()[2].classList.value.indexOf("additional_slider") != -1) {
            currentBigImageIndex = additionalSlider.getCurrentIndex();
            biggerImages = additionalSliderImages;
        }
        // showing / hiding left and right btns
        BTNSManip(currentBigImageIndex, biggerImages.length, "beginning");
        // applaying changes
        ApplyChanges();
        // event listener for left and right btn
        bigRightBtn.addEventListener("click", RightBtnClickEventHandler);
        bigLeftBtn.addEventListener("click", LeftBtnClickEventHandler);
    });
});
// right btn callback
function RightBtnClickEventHandler() {
    BTNSManip(currentBigImageIndex, biggerImages.length, "right");
    var previousBigImageIndex = currentBigImageIndex;
    // changing index
    currentBigImageIndex = Next(currentBigImageIndex, biggerImages.length);
    if(currentBigImageIndex == previousBigImageIndex) {
        return;
    }
    // applying animation
    currentBigImage.style.animationName = "ChangeImage";
    ApplyChanges();
    setTimeout(() => {
        currentBigImage.style.animationName = "none";
    }, 500);
}
// left btn callback
function LeftBtnClickEventHandler() {
    BTNSManip(currentBigImageIndex, biggerImages.length, "left");
    var previousBigImageIndex = currentBigImageIndex;
    // changing index
    currentBigImageIndex = Previous(currentBigImageIndex);
    if(currentBigImageIndex == previousBigImageIndex) {
        return;
    }
    // applying animation
    currentBigImage.style.animationName = "ChangeImage";
    ApplyChanges();
    setTimeout(() => {
        currentBigImage.style.animationName = "none";
    }, 500);
}
// function that sets new url of the image
function ApplyChanges() {
    currentBigImage.src = biggerImages[currentBigImageIndex].src;
}
// function that occurs when user click on right btn
function Next(index, max) {
    if(index < max - 1) {
        index++;
    }
    return index;
}
// function that occurs when user click on left btn
function Previous(index) {
    if(index > 0) {
        index--;
    }
    return index;
}
// function that controls if btn for changing images are shown or not
function BTNSManip(index, max, which) {
    // default
    bigLeftBtn.classList.remove("disappear");
    bigRightBtn.classList.remove("disappear");
    bigRightBtn.classList.add("appear");
    bigLeftBtn.classList.add("appear");
    // other specific cases
    if(index == 1 && which == "left") {
        bigLeftBtn.classList.remove("appear");
        bigLeftBtn.classList.add("disappear");
    }
    if(index == 0 && which == "right") {
        bigLeftBtn.classList.remove("disappear");
        bigLeftBtn.classList.add("appear");
    }
    if(index == max - 2 && which == "right") {
        bigRightBtn.classList.remove("appear");
        bigRightBtn.classList.add("disappear");
    }
    if(index == max - 1 && which == "left") {
        bigRightBtn.classList.remove("disappear");
        bigRightBtn.classList.add("appear");
    }
    if(index == 0 && which == "beginning") {
        bigLeftBtn.classList.remove("appear");
        bigLeftBtn.classList.add("disappear");
    }
    if(index == max - 1 && which == "beginning") {
        bigRightBtn.classList.remove("appear");
        bigRightBtn.classList.add("disappear");
    }
}

// ZOOM IN AND ZOOM OUT FUNCTIONS AND EVENT LISTENERS

// all variables for zooming image
// var previousState = 0, currentState = 0;
var start = 0, animationID, startTransX = 0, startTransY = 0 , currentTransX = 0, currentTransY = 0, boolean = 0, mageWidth, imageHeight, device = "pc";
// a place where zooming starts or ends
currentBigImage.addEventListener("click", e => {
    const html = document.querySelector("html");
    if(start == 1) {
        cancelAnimationFrame(animationID);
        e.target.style.cursor = "zoom-in";
        if(html.lang == "en") e.target.title = "Zoom-in";
        if(html.lang == "nl") e.target.title = "In zoomen";
        if(html.lang == "sr") e.target.title = "Zumiraj";
        previousState = 1;
        start = 0;
    } else {
        e.target.style.transform = "scale(1.5, 1.5) translate(0px, 0px)";
        e.target.style.cursor = "zoom-out";
        if(html.lang == "en") e.target.title = "Zoom-out";
        if(html.lang == "nl") e.target.title = "Uitzoomen";
        if(html.lang == "sr") e.target.title = "Odzurmiraj";
        start = 1;
        startTransX = parseInt(e.pageX);
        startTransY = parseInt(e.pageY);
        currentTransX = startTransX;
        currentTransY = startTransY;
        imageWidth = Math.floor(currentBigImage.getBoundingClientRect().width);
        imageHeight = Math.floor(currentBigImage.getBoundingClientRect().height);
        animationID = requestAnimationFrame(animation);
    }
    // CODE FOR DOUBLE ZOOM
    //      ||
    //      \/
    // if(currentState == 0) {
    //     e.target.style.transform = "scale(1.5, 1.5) translate(0px, 0px)";
    //     e.target.style.cursor = "zoom-in";
    //     e.target.style.mar
    //     previousState = 0;
    //     currentState = 1;
    //     start = 1;
    //     startTransX = parseInt(e.pageX);
    //     startTransY = parseInt(e.pageY);
    //     currentTransX = startTransX;
    //     currentTransY = startTransY;
    //     imageWidth = Math.floor(currentBigImage.getBoundingClientRect().width);
    //     imageHeight = Math.floor(currentBigImage.getBoundingClientRect().height);
    //     animationID = requestAnimationFrame(animation);
    //     return;
    // }
    // if(currentState == 1 && previousState == 0) {
    //     e.target.style.transform = `scale(2, 2) translate(${0}px, ${0}px)`;
    //     e.target.style.cursor = "zoom-out";
    //     previousState = 1;
    //     currentState = 2;
    //     start = 1;
    //     startTransX = parseInt(e.pageX);
    //     startTransY = parseInt(e.pageY);
    //     currentTransX = startTransX;
    //     currentTransY = startTransY;
    //     imageWidth = Math.floor(currentBigImage.getBoundingClientRect().width);
    //     imageHeight = Math.floor(currentBigImage.getBoundingClientRect().height);
    //     return;
    // }
    // if(currentState == 2) {
    //     e.target.style.transform = "scale(1.5, 1.5) translate(0px, 0px)";
    //     e.target.style.cursor = "zoom-out";
    //     previousState = 2;
    //     currentState = 1;
    //     start = 1;
    //     startTransX = parseInt(e.pageX);
    //     startTransY = parseInt(e.pageY);
    //     currentTransX = startTransX;
    //     currentTransY = startTransY;
    //     imageWidth = Math.floor(currentBigImage.getBoundingClientRect().width);
    //     imageHeight = Math.floor(currentBigImage.getBoundingClientRect().height);
    //     return;
    // }
    // if(currentState == 1 && previousState == 2) {
    //     cancelAnimationFrame(animationID);
    //     e.target.style.cursor = "zoom-in";
    //     previousState = 1;
    //     currentState = 0;
    //     start = 0;
    //     return;
    // }
});
// events for getting current translate
currentBigImage.addEventListener("touchmove", e => {
    // mobile phones and tablets
    device = "mobile";
    currentTransX = parseInt(e.touches[0].clientX);
    currentTransY = parseInt(e.touches[0].clientY);
    imageWidth = Math.floor(currentBigImage.getBoundingClientRect().width);
    imageHeight = Math.floor(currentBigImage.getBoundingClientRect().height);
});
currentBigImage.addEventListener("mousemove", e => {
    // desktop computers
    device = "pc";
    currentTransX = parseInt(e.pageX);
    currentTransY = parseInt(e.pageY);
    imageWidth = Math.floor(currentBigImage.getBoundingClientRect().width);
    imageHeight = Math.floor(currentBigImage.getBoundingClientRect().height);
});
// function that provides smooth animation when user moves mouse or finger
function animation() {
    let transX = (startTransX - currentTransX);
    let transY = (startTransY - currentTransY);
    var translate = CheckBorders(transX, transY);
    {
    // CODE FOR DOUBLE ZOOM
    //      ||
    //      \/
    // if(currentState == 2) {
    //     currentBigImage.style.transform = `scale(2, 2) translate${translate}`;
    // } else {
    //     currentBigImage.style.transform = `scale(1.5, 1.5) translate${translate}`;
    // }
    }
    currentBigImage.style.transform = `scale(1.5, 1.5) translate${translate}`;
    if(start == 1) {
        requestAnimationFrame(animation);
    }
    if(start == 0) {
        currentBigImage.style.transform = "scale(1, 1) translate(0px, 0px)";
    }
}
// function that prevents a big translate values
function CheckBorders(transX, transY) {
    if(window.innerWidth < imageWidth) {
        var maxTranslateX = Math.floor((imageWidth - window.innerWidth) / 2);
        if(Math.abs(transX) > maxTranslateX) {
            if(transX > 0)
                transX = maxTranslateX;
            else
                transX = -maxTranslateX;
        }
    } else {
        transX = 0;
    }
    if(window.innerHeight < imageHeight) {
        var maxTranslateY = Math.floor((imageHeight - window.innerHeight) / 2);
        if(Math.abs(transY) > maxTranslateY) {
            if(transY > 0)
                transY = maxTranslateY;
            else
                transY = -maxTranslateY;
        }
    } else {
        transY = 0;
    }
    if(device == "mobile") {
        return `(${-transX}px, ${-transY}px)`;
    }
    return `(${transX}px, ${transY}px)`;
}