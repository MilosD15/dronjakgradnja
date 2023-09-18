

//                          OnScroll Animations


// global observer
const sections = document.querySelectorAll("main section.about-us, \
main .services .painting .text, \
main .services .gypsum_works .text, \
main .services .electrician_works .text, \
main .services .additional .text, \
main .start, main #why_sec, \
main #contact, footer");
const html = document.querySelector("html");
const globalObserver = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        if(entry.isIntersecting) {
            // console.log(entry.target);
            // when user scrolled into start section
            if(entry.target.id == "beginning") {
                const introMessage = document.querySelector("main .start .intro-message");
                const slider = document.querySelector("main .start .slider");
                const seeProjectsBtn = document.querySelector("main .start .see-projects");
                // various animations related to different screens sizes
                if(window.innerWidth > 1000) {
                    introMessage.style.animation = "slideRight 1s ease 0.3s forwards";
                    seeProjectsBtn.style.animation = "slideRight 1s ease 0.3s forwards";
                    slider.style.animation = "slideLeft 1s ease 0.3s forwards";
                }
                if(window.innerWidth <= 1000 && window.innerWidth > 800) {
                    introMessage.style.animation = "slideRight 1s ease 0.3s forwards";
                    seeProjectsBtn.style.animation = "slideRight 1s ease 0.3s forwards";
                    slider.style.animation = "slideLeft 1s ease 0.3s forwards";
                }
                if(window.innerWidth <= 800 && window.innerWidth > 630) {
                    introMessage.style.animation = "slideRightMessage 1s ease 0.3s forwards";
                    seeProjectsBtn.style.animation = "slideRight 1s ease 0.3s forwards";
                    slider.style.animation = "slideLeftStart 1s ease 0.3s forwards";
                }
                if(window.innerWidth <= 630 && window.innerWidth > 530) {
                    introMessage.style.animation = "slideRightMessage 1s ease 0.3s forwards";
                    if(html.lang == "nl") {
                        if(window.innerWidth <= 630 && window.innerWidth > 580) {
                            seeProjectsBtn.style.animation = "slideRight 1s ease 0.3s forwards";
                        }
                        if(window.innerWidth <= 580 && window.innerWidth > 530) {
                            seeProjectsBtn.style.animation = "slideRightMessage 1s ease 0.3s forwards";
                        }
                    } else {
                        seeProjectsBtn.style.animation = "slideRight 1s ease 0.3s forwards";
                    }
                    slider.style.animation = "slideLeftStart 1s ease 0.3s forwards";
                }
                if(window.innerWidth <= 530) {
                    introMessage.style.animation = "slideRightMessage 1s ease 0.3s forwards";
                    seeProjectsBtn.style.animation = "slideRightMessage 1s ease 0.3s forwards";
                    slider.style.animation = "slideLeftStart 1s ease 0.3s forwards";
                }
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into about us section
            if(entry.target.classList.contains("about-us")) {
                const h1 = document.querySelector("main section.about-us .text h1");
                const p1 = document.querySelector("main section.about-us .text .second-animated");
                const p2 = document.querySelector("main section.about-us .text .third-animated");
                const image = document.querySelector("main section.about-us .image");
                h1.style.animation = "slideRight 1s ease forwards";
                p1.style.animation = "slideRight 1s ease 0.3s forwards";
                p2.style.animation = "slideRight 1s ease 0.6s forwards";
                image.style.animation = "slideLeft 1s ease 0.9s forwards";
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into painting works section
            if(entry.target.id == "PW") {
                const h1 = document.querySelector("main .services .painting .text .wrapper h1");
                const ul = document.querySelector("main .services .painting .text .wrapper ul");
                const li1 = document.querySelector("main .services .painting .text .wrapper ul .first-li");
                const li2 = document.querySelector("main .services .painting .text .wrapper ul .second-li");
                const li3 = document.querySelector("main .services .painting .text .wrapper ul .third-li");
                const slider = document.querySelector("main .services .painting .images .painting_slider");
                h1.style.animation = "slideRight 1s ease forwards";
                ul.style.animation = "slideRight 1s ease 0.3s forwards";
                li1.style.animation = "slideRight 1s ease 0.6s forwards";
                li2.style.animation = "slideRight 1s ease 0.9s forwards";
                li3.style.animation = "slideRight 1s ease 1.2s forwards";
                slider.style.animation = "slideLeftSlider 1s ease 1.5s forwards";
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into gypsum works section
            if(entry.target.id == "GW") {
                const h1 = document.querySelector("main .services .gypsum_works .text .wrapper h1");
                const ul = document.querySelector("main .services .gypsum_works .text .wrapper ul");
                const li1 = document.querySelector("main .services .gypsum_works .text .wrapper ul .first-li");
                const li2 = document.querySelector("main .services .gypsum_works .text .wrapper ul .second-li");
                const li3 = document.querySelector("main .services .gypsum_works .text .wrapper ul .third-li");
                const slider = document.querySelector("main .services .gypsum_works .images .gypsum_slider");
                h1.style.animation = "slideRight 1s ease forwards";
                ul.style.animation = "slideRight 1s ease 0.3s forwards";
                li1.style.animation = "slideRight 1s ease 0.6s forwards";
                li2.style.animation = "slideRight 1s ease 0.9s forwards";
                li3.style.animation = "slideRight 1s ease 1.2s forwards";
                slider.style.animation = "slideLeftSlider 1s ease 1.5s forwards";
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into electrician works section
            if(entry.target.id == "EW") {
                const h1 = document.querySelector("main .services .electrician_works .text .wrapper h1");
                const ul = document.querySelector("main .services .electrician_works .text .wrapper ul");
                const li1 = document.querySelector("main .services .electrician_works .text .wrapper ul .first-li");
                const li2 = document.querySelector("main .services .electrician_works .text .wrapper ul .second-li");
                const li3 = document.querySelector("main .services .electrician_works .text .wrapper ul .third-li");
                const slider = document.querySelector("main .services .electrician_works .images .electrician_slider");
                h1.style.animation = "slideLeft 1s ease forwards";
                ul.style.animation = "slideLeft 1s ease 0.3s forwards";
                li1.style.animation = "slideLeft 1s ease 0.6s forwards";
                li2.style.animation = "slideLeft 1s ease 0.9s forwards";
                li3.style.animation = "slideLeft 1s ease 1.2s forwards";
                slider.style.animation = "slideRightSlider 1s ease 1.5s forwards";
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into additional works section
            if(entry.target.id == "AW") {
                const h1 = document.querySelector("main .services .additional .text .wrapper h1");
                const ul = document.querySelector("main .services .additional .text .wrapper ul");
                const li1 = document.querySelector("main .services .additional .text .wrapper ul .first-li");
                const li2 = document.querySelector("main .services .additional .text .wrapper ul .second-li");
                const li3 = document.querySelector("main .services .additional .text .wrapper ul .third-li");
                const slider = document.querySelector("main .services .additional .images .additional_slider");
                h1.style.animation = "slideLeft 1s ease forwards";
                ul.style.animation = "slideLeft 1s ease 0.3s forwards";
                li1.style.animation = "slideLeft 1s ease 0.6s forwards";
                li2.style.animation = "slideLeft 1s ease 0.9s forwards";
                li3.style.animation = "slideLeft 1s ease 1.2s forwards";
                slider.style.animation = "slideRightSlider 1s ease 1.5s forwards";
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into why section
            if(entry.target.id == "why_sec") {
                const h1 = document.querySelector("main #why_sec .text h1");
                const li1 = document.querySelector("main #why_sec .text ul .first-li");
                const li2 = document.querySelector("main #why_sec .text ul .second-li");
                const li3 = document.querySelector("main #why_sec .text ul .third-li");
                const li4 = document.querySelector("main #why_sec .text ul .fourth-li");
                const li5 = document.querySelector("main #why_sec .text ul .fifth-li");
                const image = document.querySelector("main #why_sec .image img");
                h1.style.animation = "slideRight 1s ease forwards";
                li1.style.animation = "slideRight 1s ease 0.3s forwards";
                li2.style.animation = "slideRight 1s ease 0.6s forwards";
                li3.style.animation = "slideRight 1s ease 0.9s forwards";
                li4.style.animation = "slideRight 1s ease 1.2s forwards";
                li5.style.animation = "slideRight 1s ease 1.5s forwards";
                image.style.animation = "slideLeft 1s ease 1.8s forwards";
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into contact section
            if(entry.target.id == "contact") {
                const h1 = document.querySelector("main #contact h1");
                const p = document.querySelector("main #contact p");
                const email = document.querySelector("main #contact .row .first-hr");
                const subject = document.querySelector("main #contact .row .second-hr");
                const message = document.querySelector("main #contact .row .whole-row");
                const button = document.querySelector("main #contact .row button");
                h1.style.animation = "slideRight 1s ease forwards";
                p.style.animation = "slideRight 1s ease 0.3s forwards";
                email.style.animation = "slideRight 1s ease 0.6s forwards";
                subject.style.animation = "slideRight 1s ease 0.9s forwards";
                message.style.animation = "slideRight 1s ease 1.2s forwards";
                button.style.animation = "slideRight 1s ease 1.5s forwards";
                globalObserver.unobserve(entry.target);
            }
            // when user scrolled into footer
            if(entry.target.tagName == "FOOTER") {
                const h1 = document.querySelector("footer .lastInfo .footerText h1");
                const number = document.querySelector("footer .lastInfo .footerText .number");
                const mail = document.querySelector("footer .lastInfo .footerText .mail");
                const image = document.querySelector("footer .lastInfo .logoImage .conImg");
                const copyright = document.querySelector("footer .credits .wrapper");
                h1.style.animation = "slideRight 1s ease forwards";
                number.style.animation = "slideRight 1s ease 0.3s forwards";
                mail.style.animation = "slideRight 1s ease 0.6s forwards";
                image.style.animation = "slideLeft 1s ease 0.9s forwards";
                copyright.style.animation = "copyrightFade 1s ease 1.2s forwards";
                globalObserver.unobserve(entry.target);
            }
        }
    });
});
// global observer is called to observe
sections.forEach( section => {
    globalObserver.observe(section);
});