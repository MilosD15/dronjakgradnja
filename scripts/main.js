const menuBtn = document.querySelector("header .side .btn");
menuBtn.addEventListener("click", DisplaySideMenu);
const servicesBtnLargeScreens = document.querySelector("header nav .wrapper > a[href=\"#works\"]");
const sideNavLinks = document.querySelectorAll("header .side aside a");
// hiding menu when user is clicked on any link in menu
sideNavLinks.forEach( link => { link.addEventListener("click", e => {
    if(e.target.href.toString().indexOf("#work") == -1) {
        HideMenu();
    }
    }); 
});
// dropdown for large screens
var br = 0;
const servicesBtn = document.querySelector("header nav .wrapper");
servicesBtn.addEventListener("click", () => {
    DropDownSmall(br);
    br = DropDownLarge(br); 
});
// hiding dropdown con when user is clicked on any of links in dropdown
const dropdownLinks = document.querySelectorAll("header nav .wrapper .dropdown > a");
dropdownLinks.forEach( link => {
    link.addEventListener("click", () => {
        CloseDropDown();
        br = 1;
    });
});
// dropdown for small screens
const worksBtn = document.querySelector("header .side aside .wrapper");
worksBtn.addEventListener("click", () => {
    DropDownLarge(br);
    br = DropDownSmall(br);
});
// preventing dragging images across the page
const images = Array.from(document.querySelectorAll("img"));
images.forEach( element => {
    element.addEventListener("dragstart", e => {
        e.preventDefault();
    })
});
// hiding menu for small screens and dropdown for services when user clicks out of it
window.addEventListener("click", e => {
    if(e.composedPath()[1].classList.value.indexOf("wrapper") != -1 && e.composedPath()[2].tagName == "NAV") {
    } else {
        if(e.composedPath()[0].classList.value.indexOf("btn") == -1 || e.composedPath()[1].classList.value.indexOf("side") == -1) {
            if(e.composedPath()[1].classList.value.indexOf("wrapper") == -1 || e.composedPath()[2].tagName != "ASIDE") {
                const middleLine = document.querySelector("header .side .btn .middle");
                if(window.getComputedStyle(middleLine).opacity === "0") {
                    // br = 1;
                    // DropDownSmall(br);
                    HideMenu();
                }
            } else {
                return;
            }
        } else {
            return;
        }
        const dropdown = document.querySelector("header nav .wrapper .dropdown");
        if(window.getComputedStyle(dropdown).borderWidth != "0px") {
            DropDownSmall(br);
            OpenDropDown();
            br = 0;
        }
    }
    // if(e.composedPath()[0].classList.value.indexOf("btn") == -1 || e.composedPath()[1].classList.value.indexOf("side") == -1) {
    //     if(e.composedPath()[1].classList.value.indexOf("wrapper") == -1 || e.composedPath()[2].tagName != "ASIDE") {
    //         HideMenu();
    //     } else {
    //         console.log(br);
    //         DropDownLarge(br);
    //         br = DropDownSmall(br);
    //         console.log(br);
    //     }
    // }
});
// disabling context menu
//window.oncontextmenu = function (e) {
//    e.preventDefault();
//    e.stopPropagation();
//    return false;
//};
// getting sliders width
var root = document.querySelector(":root");
var slidersWidth = getComputedStyle(root).getPropertyValue("--services-sliders-width");
var slidingArea = 0;
if(slidersWidth.indexOf("px") != -1) {
    var pos = slidersWidth.indexOf("px");
    var pom = slidersWidth.substr(0, pos);
    slidersWidth = parseInt(pom);
    slidingArea = slidersWidth;
}
else {
    slidersWidth = parseInt(slidersWidth.substr(0, slidersWidth.length - 1));
    if(window.innerWidth <= 750)
        slidingArea = window.innerWidth * slidersWidth / 100;
    else
        slidingArea = (window.innerWidth / 2) * slidersWidth / 100;
}
// start slider
const startSliderContainer = document.querySelector("main .start .slider");
const startSliderImages = Array.from(startSliderContainer.querySelectorAll(".content img"));
const startRightSliderBtn = document.querySelector("main .start .slider .right-btn");
const startLeftSliderBtn = document.querySelector("main .start .slider .left-btn");
const startSlider = new DraggableSlider(startSliderImages, 621, startSliderContainer, startRightSliderBtn, startLeftSliderBtn, 5);
startSliderImages.forEach(startSlider.PerformDraggingEvents, startSlider);
startRightSliderBtn.addEventListener("click", () => { startSlider.OnRightBtnClick(); });
startLeftSliderBtn.addEventListener("click", () => { startSlider.OnLeftBtnClick(); });
// painting services slider
const paintingSliderContainer = document.querySelector("main .services .painting .images .painting_slider");
const paintingSliderImages = Array.from(paintingSliderContainer.querySelectorAll(".content img"));
const paintingRightSliderBtn = paintingSliderContainer.querySelector(".right-btn");
const paintingLeftSliderBtn = paintingSliderContainer.querySelector(".left-btn");
const paintingSlider = new DraggableSlider(paintingSliderImages, slidingArea, paintingSliderContainer, paintingRightSliderBtn, paintingLeftSliderBtn);
paintingSliderImages.forEach(paintingSlider.PerformDraggingEvents, paintingSlider);
paintingRightSliderBtn.addEventListener("click", () => { paintingSlider.OnRightBtnClick(); });
paintingLeftSliderBtn.addEventListener("click", () => { paintingSlider.OnLeftBtnClick(); });
// electrical works slider
const electricianSliderContainer = document.querySelector("main .services .electrican_works .images .electrican_slider");
const electricianSliderImages = Array.from(electricianSliderContainer.querySelectorAll(".content img"));
const electricianRightSliderBtn = electricianSliderContainer.querySelector(".right-btn");
const electricianLeftSliderBtn = electricianSliderContainer.querySelector(".left-btn");
const electricianSlider = new DraggableSlider(electricianSliderImages, slidingArea, electricianSliderContainer, electricianRightSliderBtn, electricianLeftSliderBtn, 5);
electricianSliderImages.forEach(electricianSlider.PerformDraggingEvents, electricianSlider);
electricianRightSliderBtn.addEventListener("click", () => { electricianSlider.OnRightBtnClick(); });
electricianLeftSliderBtn.addEventListener("click", () => { electricianSlider.OnLeftBtnClick(); });
// gypsum works slider
const gypsumSliderContainer = document.querySelector("main .services .gypsum_works .images .gypsum_slider");
const gypsumSliderImages = Array.from(gypsumSliderContainer.querySelectorAll(".content img"));
const gypsumRightSliderBtn = gypsumSliderContainer.querySelector(".right-btn");
const gypsumLeftSliderBtn = gypsumSliderContainer.querySelector(".left-btn");
const gypsumSlider = new DraggableSlider(gypsumSliderImages, slidingArea, gypsumSliderContainer, gypsumRightSliderBtn, gypsumLeftSliderBtn);
gypsumSliderImages.forEach(gypsumSlider.PerformDraggingEvents, gypsumSlider);
gypsumRightSliderBtn.addEventListener("click", () => { gypsumSlider.OnRightBtnClick(); });
gypsumLeftSliderBtn.addEventListener("click", () => { gypsumSlider.OnLeftBtnClick(); });
// additional works slider
const additionalSliderContainer = document.querySelector("main .services .additional .images .additional_slider");
const additionalSliderImages = Array.from(additionalSliderContainer.querySelectorAll(".content img"));
const additionalRightSliderBtn = additionalSliderContainer.querySelector(".right-btn");
const additionalLeftSliderBtn = additionalSliderContainer.querySelector(".left-btn");
const additionalSlider = new DraggableSlider(additionalSliderImages, slidingArea, additionalSliderContainer, additionalRightSliderBtn, additionalLeftSliderBtn, 5);
additionalSliderImages.forEach(additionalSlider.PerformDraggingEvents, additionalSlider);
additionalRightSliderBtn.addEventListener("click", () => { additionalSlider.OnRightBtnClick(); });
additionalLeftSliderBtn.addEventListener("click", () => { additionalSlider.OnLeftBtnClick(); });
// controling services section height
function ControlHeights() {
    var root = document.querySelector(":root");
    if(window.innerWidth <= 750) {
        var paint = getHeight("main .services .painting");
        var electrician = getHeight("main .services .electrican_works");
        var gypsum = getHeight("main .services .gypsum_works");
        var adds = getHeight("main .services .additional");
        var sum = parseInt(paint) + parseInt(electrician) + parseInt(gypsum) + parseInt(adds);
        root.style.setProperty("--services-section-height", sum + "px");
    }
    else if(window.innerWidth <= 900 && window.innerWidth > 750) {
        root.style.setProperty("--services-section-height", "1520px");
    }
    else if(window.innerWidth <= 1150 && window.innerWidth > 900) {
        root.style.setProperty("--services-section-height", "1800px");
    }
    else {
        root.style.setProperty("--services-section-height", "2000px");
    }
}
window.addEventListener("resize", ControlHeights);
window.addEventListener("load", ControlHeights);
// making textarea autosizable
const textarea = document.getElementsByTagName("textarea")[0];
textarea.addEventListener("input", e => {
    if(e.target.clientHeight > 160) {
        textarea.style.height = "10rem";
    }
    textarea.style.height = e.target.scrollHeight + "px";
});
// event listener for 'send message' btn in 'contact us' section
const sendBtn = document.querySelector("main #contact_sec .row button");
sendBtn.addEventListener("click", e => {
    e.preventDefault();
    CheckData();
});
// OK button of alert box and its event click
var alertBtn = document.querySelector(".fullAlertContainer .alert .btn button");
alertBtn.addEventListener("click", e => {
    e.preventDefault();
    var con = document.querySelector(".fullAlertContainer");
    con.style.opacity = 0;
    con.style.pointerEvents = "none";
    con.style.animationName = "none";
});
// when user changes tab in browser
window.addEventListener("blur", () => {
    var html = document.querySelector("html");
    if(html.lang == "en") document.title = "We're waiting for you! | Dronjak Gradnja";
    if(html.lang == "nl") document.title = "We wachten op je! | Dronjak Gradnja";
    if(html.lang == "sr") document.title = "Čekamo te ovde! | Dronjak Gradnja";
});
window.addEventListener("focus", () => {
    document.title = "Dronjak Gradnja";
});
// events in resources container
const openRes = document.querySelector("body > .ResWrapper > .con > .label");
openRes.addEventListener("click", () => {
    const openResCon = document.querySelector("body > .ResWrapper > .con > .links");
    const arrow = document.querySelector("body > .ResWrapper > .con > .label > i.fas");
    arrow.classList.toggle("open");
    openResCon.classList.toggle("active");
    const links = document.querySelectorAll(".con > .links a");
    setTimeout(() => {
        links.forEach( link => {
            link.classList.toggle("appear");
        });
    }, 500)
});
const okResBtn = document.querySelector("body > .ResWrapper > .con > button");
okResBtn.addEventListener("click", () => {
    localStorage.setItem("ResourcesSeen", "1");
    location.reload();
});
// 'choose language' container/wrapper
var langCon = document.querySelector(".langWrapper");
// container for content in 'choose language' con
const contentCon = langCon.querySelector(".conForItems");
// title in 'choose language' con
const h1LangCon = langCon.querySelector("h1");
// translator btn click event
const transBtns = document.querySelectorAll("header nav > .lang-btn, header .side > .lang-btn");
transBtns.forEach( btn => {
    btn.addEventListener("click", e => {
        var btnType = "small";
        e.composedPath().forEach( tag => {
            if(tag.nodeName == "NAV") {
                btnType = "large";
            }
        });
        AddTimes();
        langCon.classList.toggle("active");
        if(btnType == "large") {
            contentCon.style.transformOrigin = "top right";
            h1LangCon.style.transformOrigin = "top right";
        }
        if(btnType == "small") {
            contentCon.style.transformOrigin = "top";
            h1LangCon.style.transformOrigin = "top";
        }
        h1LangCon.classList.toggle("opened");
        contentCon.classList.toggle("opened");
    });
});
// language btns in 'choose language' con and their event click
var langBtns = document.querySelectorAll(".langWrapper > .conForItems > .item");
langBtns.forEach( btn => {
    btn.addEventListener("click", e => {
        if(e.target.parentElement.classList.contains("en") || e.target.classList.contains("en")) {
            localStorage.setItem("lang", "en");
        }
        if(e.target.parentElement.classList.contains("nl") || e.target.classList.contains("nl")) {
            localStorage.setItem("lang", "nl");
        }
        if(e.target.parentElement.classList.contains("sr") || e.target.classList.contains("sr")) {
            localStorage.setItem("lang", "sr");
        }
    });
});
// onload global event
window.onload = function () {
    // elements
    const loader = document.getElementById("loader");
    const html_tag = document.querySelector("html");
    const wrapper = document.querySelector("body > .ResWrapper");
    var language = localStorage.getItem("lang");
    // hiding loader animation when page is loaded
    loader.style.opacity = 0;
    loader.style.pointerEvents = "none";
    html_tag.style.overflowY = "auto";
    // checking if page is not loaded in start section
    var startHeight = getComputedStyle(root).getPropertyValue("--start-section-height");
    startHeight = RemovePx(startHeight);
    var headerHeight = getComputedStyle(root).getPropertyValue("--height-header");
    headerHeight = RemovePx(headerHeight);
    if(document.documentElement.scrollTop > startHeight + headerHeight) {
        const introMessage = document.querySelector("main .start .intro-message");
        const slider = document.querySelector("main .start .slider");
        const contactBtn = document.querySelector("main .start .contact");
        const whyBtn = document.querySelector("main .start .why");
        const aboutBtn = document.querySelector("main .start .about");
        introMessage.style.animation = "none";
        contactBtn.style.animation = "none";
        whyBtn.style.animation = "none";
        aboutBtn.style.animation = "none";
        slider.style.animation = "none";
    }
    // resources con manipulation
    if(localStorage.getItem("ResourcesSeen") != "1") {
        wrapper.style.animation = "Hide-Show-Res 0.5s ease reverse forwards";
    }
    if(localStorage.getItem("ResourcesSeen") == "1") {
        wrapper.style.display = "none";
    }
    // language con manipulation
    if(html_tag.lang == "en") {
        if(language != "en" && language != "nl" && language != "sr") {
            langCon.style.animation = "openLangCon 0.3s ease-in-out forwards";
            langCon.style.pointerEvents = "all";
            contentCon.style.transformOrigin = "center";
            h1LangCon.style.transformOrigin = "center";
            h1LangCon.style.transform = "scale(1)";
            contentCon.style.transform = "scale(1)";
        }
    }
    // redirecting to a appropriate page related to language
    if(language == "en" && html_tag.lang != "en") location.href = "./index.html";
    if(language == "nl" && html_tag.lang != "nl") location.href = "./nl_index.html";
    if(language == "sr" && html_tag.lang != "sr") location.href = "./sr_index.html";
};
