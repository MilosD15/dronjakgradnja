function  DisplaySideMenu() {
    // CHANGING ANIMATIONS FOR MENU BUTTON
    const topLine = document.querySelector("header .side .btn .top");
    const middleLine = document.querySelector("header .side .btn .middle");
    const bottomLine = document.querySelector("header .side .btn .bottom");
    const aside = document.querySelector("header .side aside");
    const dropdown = document.querySelector("header .side aside .wrapper .dropdown");
    if(window.getComputedStyle(middleLine).opacity === "0") {
        topLine.style.animationName = "topLineReverse";
        middleLine.style.animationName = "fadeIn";
        bottomLine.style.animationName = "bottomLineReverse";
    }
    if(window.getComputedStyle(middleLine).opacity === "1") {
        topLine.style.animationName = "topLine";
        middleLine.style.animationName = "fadeOut";
        bottomLine.style.animationName = "bottomLine";
    }
    // DISPLAYING NAVIGATION LINKS
    if(window.getComputedStyle(middleLine).opacity === "0") {
        aside.style.opacity = "0";
        aside.style.pointerEvents = "none";
        dropdown.style.pointerEvents = "none";
        DropDownSmall(1);
    }
    if(window.getComputedStyle(middleLine).opacity === "1") {
        aside.style.opacity = "1";
        aside.style.pointerEvents = "all";
        dropdown.style.pointerEvents = "all";
    }
}
// function that hides side navigation menu
function HideMenu() {
    const topLine = document.querySelector("header .side .btn .top");
    const middleLine = document.querySelector("header .side .btn .middle");
    const bottomLine = document.querySelector("header .side .btn .bottom");
    const aside = document.querySelector("header .side aside");
    const dropdown = document.querySelector("header .side aside .wrapper .dropdown");
    topLine.style.animationName = "topLineReverse";
    middleLine.style.animationName = "fadeIn";
    bottomLine.style.animationName = "bottomLineReverse";
    aside.style.opacity = "0";
    aside.style.pointerEvents = "none";
    dropdown.style.pointerEvents = "none";
}
// function that shows/hides a dropdown menu for services (large screens)
function DropDownLarge(br) {
    if(br == 1) {
        OpenDropDown();
        br = 0;
    }
    else {
        CloseDropDown();
        br = 1;
    }
    return br;
}
function CloseDropDown() {
    const arrow = document.querySelector("header nav .wrapper .triangle");
    const dropdown = document.querySelector("header nav .wrapper .dropdown");
    dropdown.style.animation = "slideDown 0.7s ease forwards";
    dropdown.style.borderWidth = "2px";
    arrow.style.animation = "triangleRotateUp 0.5s ease forwards";
}
function OpenDropDown() {
    const arrow = document.querySelector("header nav .wrapper .triangle");
    const dropdown = document.querySelector("header nav .wrapper .dropdown");
    dropdown.style.animation = "slideUp 0.7s ease forwards";
    dropdown.style.borderWidth = "0";
    arrow.style.animation = "triangleRotateDown 0.5s ease forwards";
}
// function that shows/hides a dropdown menu for services (small screens)
function DropDownSmall(br) {
    const arrow = document.querySelector("header .side aside .wrapper .triangle");
    const dropdown = document.querySelector("header .side aside .wrapper .dropdown");
    const whyLink = document.querySelector("header .side aside a[href=\"#why_sec\"]");
    if(br == 1) {
        dropdown.style.animation = "slideUpSmall 0.7s ease forwards";
        arrow.style.animation = "triangleRotateDown 0.5s ease forwards";
        whyLink.style.animation = "moveLinkUp 0.7s ease forwards";
        br = 0;
    }
    else {
        dropdown.style.animation = "slideDownSmall 0.7s ease forwards";
        arrow.style.animation = "triangleRotateUp 0.5s ease forwards";
        whyLink.style.animation = "moveLinkDown 0.7s ease forwards";
        br = 1;
    }
    return br;
}
// function that increases slider's image size
function ShowBigImage(source) {
    const popUp = document.querySelector(".largeImage");
    const image = document.querySelector(".largeImage .image img");
    image.src = source;
    popUp.style.animationName = "ShowImage";
}
function HideBigImage() {
    const popUp = document.querySelector(".largeImage");
    popUp.style.animationName = "HideImage";
    document.querySelector("body, html").style.overflowY = "scroll";
}
// additional function that calculates height of an element
function getHeight(selector, section2 = ".images") {
    const element = document.querySelector(selector);
    const element_img_sec = element.querySelector(section2);
    const element_text_sec = element.querySelector(".text");
    return element_img_sec.clientHeight + element_text_sec.clientHeight;
}
// listener function for a contact form
function SendContactMessageListener(e) {
    e.preventDefault();
    CheckData();
}
// function that checks data from a contact form
function CheckData() {
    var userEmail = document.forms["contact"]["email"].value;
    var message = document.forms["contact"]["message"].value;
    var submitBtn = document.querySelector("[data-contact-submit-btn]");
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (localStorage.getItem("formSubmission") === "inProgress") return;

    if (userEmail != "" && message != "") {
        if (userEmail.match(regex) != null) {
            // proceed to the server validation
            localStorage.setItem("scrollTop", window.scrollY);
            submitBtn.dataset.state = "processing-data";
            localStorage.setItem("formSubmission", "inProgress");
            document.forms["contact"].submit();
        } else {
            if (html.lang == "en") {
                showMessageBox("Are you sure you entered a valid email address?<br>Please, check it one more time.");
            }
            if (html.lang == "nl") {
                showMessageBox("Weet u zeker dat u een geldig e-mailadres heeft ingevoerd?<br>Controleer het nog een keer alstublieft.");
            }
            if (html.lang == "sr") {
                showMessageBox("Jeste li sigurni da ste uneli dobru mejl adresu?<br>Molim vas, proverite jos jednom.");
            }
        }
    } else {
        if (html.lang == "en") {
            showMessageBox("Email and message fields cannot be empty.");
        }
        if (html.lang == "nl") {
            showMessageBox("Email- en berichtvelden mogen niet leeg zijn.");
        }
        if (html.lang == "sr") {
            showMessageBox("Polja za e-mail i poruku ne mogu biti prazna.");
        }
    }
}
// function that removes px
function RemovePx(value) {
    var pos = value.indexOf("px");
    var pom = value.substr(0, pos);
    return parseInt(pom);
}