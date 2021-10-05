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
// function for displaying message box
function showMessageBox(message, backColor = "darkgreen", color = "white")
{
    var con = document.querySelector(".fullAlertContainer");
    var messageBox = document.querySelector(".fullAlertContainer .alert .message");
    var okBtn = document.querySelector(".fullAlertContainer .alert .btn button");
    messageBox.innerHTML = message;
    con.style.opacity = 1;
    con.style.pointerEvents = "all";
    con.style.animationName = "alert";
    okBtn.style.backgroundColor = backColor;
    okBtn.style.color = color;
}
// function that checks data from a contact form
function CheckData() {
    var userEmail = document.forms["contact"]["email"].value;
    var subject = document.forms["contact"]["subject"].value;
    var message = document.forms["contact"]["message"].value;
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(userEmail != "" && message != "") {
        if(userEmail.match(regex) != null) {
            SendEmail(userEmail, subject, message);
        } else {
            if(html.lang == "en") {
                showMessageBox("Are you sure you typed a valid email address?<br>Please, check it one more time.");
            }
            if(html.lang == "nl") {
                showMessageBox("Weet je zeker dat je een geldig e-mailadres hebt ingevoerd?<br>Controleer het alstublieft nog een keer.");
            }
            if(html.lang == "sr") {
                showMessageBox("Jeste li sigurni da ste uneli dobru mejl adresu?<br>Molim vas, proverite jos jednom.");
            }
        }
    } else {
        if(html.lang == "en") {
            showMessageBox("Email and message field must be filled out!");
        }
        if(html.lang == "nl") {
            showMessageBox("E-mail en berichtveld moeten worden ingevuld!");
        }
        if(html.lang == "sr") {
            showMessageBox("Polja za mejl adresu i poruku moraju biti popunjena!");
        }
    }
}
// function that sends email
function SendEmail(userEmail, subject, message) {
    var check = 0;
    var bodyMail = `Email from: <span style="border:2px solid red;">${userEmail}</span><br/><br/>`;
    bodyMail += `<h1 style="width:100%; text-align: center;">${subject}</h1><br/>`;
    bodyMail += `<h3><pre style="font-size: 1.3rem">${message}</pre></h3>`;
    var title, p1_s1, p1_s2, p2_s1, p2_s2, p3_s1, p4_s1, p4_s2, finalMessage;
    if(html.lang == "en") {
        finalMessage = 'The email sent successfully! &#9989;<br>Thank you for contacting us! &#128536;';
        title = "Big Thank You";
        p1_s1 = "First of all, we want to thank you for contacting us!";
        p1_s2 = "We have taken the first step in cooperation.";
        p2_s1 = "We will respond to your email as soon as possible.";
        p2_s2 = "It will be our pleasure to cooperate with you.";
        p3_s1 = "You don't have to reply, this is an automatic message.";
        p4_s1 = "With respect,";
        p4_s2 = "Team Dronjak Gradnja";
    }
    if(html.lang == "nl") {
        finalMessage = "De e-mail is succesvol verzonden! &#9989;<br> Bedankt dat je contact met ons hebt opgenomen!  &#128536;";
        title = "Grote Dank";
        p1_s1 = "Allereerst willen we je bedanken dat je contact met ons hebt opgenomen!";
        p1_s2 = "We hebben de eerste stap in samenwerking gezet.";
        p2_s1 = "We zullen zo snel mogelijk op uw email reageren.";
        p2_s2 = "Het zal ons een genoegen zijn om met u samen te werken.";
        p3_s1 = "Je hoeft niet te antwoorden, dit is een automatisch bericht.";
        p4_s1 = "Met respect,";
        p4_s2 = "Team Dronjak Gradnja";
    }
    if(html.lang == "sr") {
        finalMessage = "Mejl je uspesno poslat! &#9989;<br>Hvala sto ste nas kontaktirali! &#128536;";
        title = "Veliko Hvala";
        p1_s1 = "Pre svega, želimo da vam se zahvalimo što ste nas kontaktirali!";
        p1_s2 = "Napravili smo prvi korak u našoj saradnji.";
        p2_s1 = "Odgovorićemo vam na vaš mejl u što kraćem roku.";
        p2_s2 = "Biće nam zadovoljstvo da saradjujemo sa vama.";
        p3_s1 = "Ne morate da odgovarate na ovaj email, ovo je automatska poruka.";
        p4_s1 = "S poštovanjem,";
        p4_s2 = "Tim Dronjak Gradnja";
    }
    var bodyMailUser = '<div style="display: flex; justify-content: center; align-items: center; ';
    bodyMailUser += 'width: 100%; height: auto;"><div style="max-width: 500px; height: auto;';
    bodyMailUser += 'font-family: Cambria, serif; background-color: rgb(241, 241, 241); color: black;';
    bodyMailUser += 'padding: 1rem 1rem 0 1rem; margin: 2rem 1rem;"><h1 style="width: 100%; text-align: center;';bodyMailUser += `padding-bottom: 1rem; font-family: Cambria, serif;">&#128149; ${title} &#128149;</h1>`;
    bodyMailUser += `<p style="padding: 1rem 0; font-size: 1.1rem; line-height: 1.8rem;">${p1_s1} &#128536;<br>`;
    bodyMailUser += `${p1_s2} &#128079;</p><p style="padding: 1rem 0; font-size: 1.1rem; line-height: 1.8rem;">`;
    bodyMailUser += `${p2_s1} &#128578; <br>${p2_s2} &#128515;</p><p style="padding: 1rem 0; font-size: 1.1rem; `;
    bodyMailUser += `line-height: 1.8rem;">${p3_s1} &#128521;</p><p style="padding: 1rem 0; font-size: 1.1rem; `;
    bodyMailUser += `line-height: 1.8rem;">${p4_s1} <br>${p4_s2}</p></div></div>`;
    // sending email to us
    Email.send({
        Host : "smtp.gmail.com",
        Username : "dronjakgradnja@gmail.com",
        Password : "dwofabbnxmmhbhdc",
        To : "dronjakgradnja@gmail.com",
        From : "dronjakgradnja@gmail.com",
        Subject : "New potencial client",
        Body : bodyMail 
    }).then( () => {
        check = 1;
    })
    // automatic message to user
    Email.send({
        Host : "smtp.gmail.com",
        Username : "dronjakgradnja@gmail.com",
        Password : "dwofabbnxmmhbhdc",
        To : userEmail,
        From : "dronjakgradnja@gmail.com",
        Subject : "Thank you for contacting us!",
        Body : bodyMailUser 
    }).then( () => {
        // this informs user that an email is sent
        if(check == 1) {
            showMessageBox(finalMessage, "darkblue");
            setTimeout( () => {
                var con = document.querySelector(".fullAlertContainer");
                con.style.opacity = 0;
                con.style.pointerEvents = "none";
                con.style.animationName = "none";
            }, 5000);
        }
    });
}
// function that removes px
function RemovePx(value) {
    var pos = value.indexOf("px");
    var pom = value.substr(0, pos);
    return parseInt(pom);
}
// function that adds a times btn in 'choose language' con
function AddTimes() {
    const times = document.createElement("i");
    times.classList.add("fas");
    times.classList.add("fa-times");
    times.addEventListener("click", () => {
        langCon.classList.toggle("active");
        contentCon.classList.toggle("opened");
        h1LangCon.classList.toggle("opened");
    });
    langCon.appendChild(times);
}