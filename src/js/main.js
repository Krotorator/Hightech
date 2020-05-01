//= _jquery.js
//= _swiper.js
//= _scripts.js
import Swiper from "swiper";
import Blazy from "blazy";
require("waypoints/lib/noframework.waypoints.js");

document.addEventListener("DOMContentLoaded", () => {
    var bLazy = new Blazy();

    /////////////////////////////SLIDER
    var testimonialsSliderThumbs = new Swiper(".testimonials-thumbs", {
        spaceBetween: 224,
        slidesPerView: 2,
        loop: true,
        freeMode: true,
        loopedSlides: 3, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            1024: {
                spaceBetween: 360,
            },
        },
    });

    var testimonialsSliderTop = new Swiper(".testimonials-slider", {
        // Optional parameters
        spaceBetween: 100,
        loop: true,
        centeredSlides: true,
        grabCursor: false,
        slidesPerView: 1,
        loopedSlides: 3, //looped slides should be the same
        navigation: {
            nextEl: ".testimonials-slider-button-next",
            prevEl: ".testimonials-slider-button-prev",
        },
        thumbs: {
            swiper: testimonialsSliderThumbs,
        },
        pagination: {
            el: ".testimonials-slider-pagination",
            clickable: true,
        },
    });

    //////////////NAV
    let nav = document.querySelector("#nav");
    let navLinks = [...document.querySelectorAll(".nav__link")];
    let wrapper = document.querySelector("#wrapper");
    let burger = document.querySelector("#burger");
    let closeBtn = [...document.querySelectorAll(".close-btn")];

    burger.addEventListener("click", (e) => {
        e.preventDefault();
        nav.classList.add("nav_active");
        document.body.classList.add("body_hidden");
    });
    for (let i = 0; i < closeBtn.length; i++) {
        const btn = closeBtn[i];
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            nav.classList.remove("nav_active");
            document.body.classList.remove("body_hidden");
        });
    }

    //set active nav-link

    navLinks.forEach((link) => {
        if (window.location.href === link.href) {
            link.classList.add("nav__link_active");
        }
        link.addEventListener("click", () => {
            let thisLink = link;
            link.classList.add("nav__link_active");
            navLinks.forEach((link) => {
                if (link !== thisLink) {
                    link.classList.remove("nav__link_active");
                }
            });
        });
    });

    if (document.querySelector("#modal")) {
        ////////////////// MODAL

        let modal = document.querySelector("#modal");
        let closeModalBtn = document.querySelector("#modalClose");
        let btnsForModal = [...document.querySelectorAll(".btnForModal")];

        // open modal
        for (let i = 0; i < btnsForModal.length; i++) {
            ///// SHOW MODAL ON CLICK
            btnsForModal[i].addEventListener("click", (e) => {
                e.preventDefault();
                modal.style.display = "block";
                modal.classList.add("modal_open");
                document.body.classList.add("body_hidden");
            });
        }

        closeModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.remove("modal_open");
            modal.classList.add("modal_close");

            let form = modal.querySelector(".main-form");
            for (const child of form.children) {
                child.tagName !== "BUTTON" ? (child.classList = "main-form__input-wrapper") : false; /////////// REMOVE INPUT STATES
            }
            form.reset(); /////////// RESET FORM

            setTimeout(() => {
                modalNormal(modal); ////// RETURN TO NORMAL MODAL STATE
            }, 500);

            setTimeout(() => {
                modal.style.display = "none";
                modal.classList.remove("modal_close");
            }, 600);
        });
    }

    //////////////FORM

    let mainForms = [...document.querySelectorAll(".main-form")];
    let inputs = [...document.querySelectorAll(".main-form__input")];
    let inputWrappers = [...document.querySelectorAll(".main-form__input-wrapper")];
    let submitBtns = [...document.querySelectorAll(".main-form__btn")];

    //////////// FORM INPUTS STATES
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.addEventListener("focus", () => {
            input.parentElement.classList.add("main-form__input-wrapper_active");
        });
        input.addEventListener("blur", () => {
            if (input.value == "") {
                input.parentElement.classList = "main-form__input-wrapper";
            }
        });
        input.addEventListener("input", () => {
            if (input.name == "userName") {
                if (!nameIsEmpty(input)) {
                    input.parentElement.classList.add("main-form__input-wrapper_succes");
                    input.parentElement.classList.remove("main-form__input-wrapper_alert");
                } else {
                    input.parentElement.classList.add("main-form__input-wrapper_alert");
                    input.parentElement.classList.remove("main-form__input-wrapper_succes");
                }
            } else if (input.name == "userMail") {
                if (emailIsValid(input)) {
                    input.parentElement.classList.add("main-form__input-wrapper_succes");
                    input.parentElement.classList.remove("main-form__input-wrapper_alert");
                } else {
                    input.parentElement.classList.add("main-form__input-wrapper_alert");
                    input.parentElement.classList.remove("main-form__input-wrapper_succes");
                }
            }
        });
    }

    ////////////// FORM VALIDATE AND SUBMIT
    for (let i = 0; i < submitBtns.length; i++) {
        const submitBtn = submitBtns[i];
        submitBtn.addEventListener("click", (e) => {
            let name = submitBtn.parentElement.userName;
            let email = submitBtn.parentElement.userMail;
            e.preventDefault();
            if (!nameIsEmpty(name) && emailIsValid(email)) {
                console.log("ok!"); ///////////////////////////// AJAX script here
                modalSucces(modal); //////////// CHANGE STATE/INNER HTML OF MODAL FOR SUCCES MESSAGE IF SENDING SUCCES
                // modalError(modal); //////////// CHANGE STATE/INNER HTML OF MODAL FOR ERROR MESSAGE IF SENDING FAILED

                inputWrappers.forEach((el) => {
                    ///////DISABLING INPUTS IF SUCCES
                    el.classList = "main-form__input-wrapper";
                    let formElements = [...el.parentElement.elements];
                    formElements.forEach((input) => {
                        input.setAttribute("disabled", "disabled");
                    });
                });
                submitBtn.parentElement.reset();
                submitBtn.setAttribute("disabled", "disabled");
            } else if (nameIsEmpty(name)) {
                ///// ALERT STATE OF INPUTS
                name.parentElement.classList.add("main-form__input-wrapper_alert");
            } else if (!emailIsValid(email)) {
                email.parentElement.classList.add("main-form__input-wrapper_alert");
            }
        });
    }

    function nameIsEmpty(element) {
        return element.value == "";
    }
    function emailIsValid(element) {
        return element.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
    }

    ///////////////// MODAL MESSAGE SUCCESS/ERROR/NORMAL
    function modalSucces(modal) {
        modal.querySelector(".title-wrapper").innerHTML = `
            <span  class="section-subtitle contacts-form__subtitle">СпАСИБО</span>
            <h2  class="title section-title contacts-form__title">зА ЗАЯВКУ!</h2>
            <span >Мы свяжемся с Вами в кратчайшие сроки</span>
     `;
        modal.querySelector(".title-wrapper").classList.add("title-wrapper_form-succes");
        modal.querySelector(".main-form").classList.add("form-isHide");
        modal.classList.add("modal__message");
    }
    function modalError(modal) {
        modal.querySelector(".title-wrapper").innerHTML = `
            <h2  class="title section-title contacts-form__title">Ошибка</h2>
            <span >Не удалось отправть заявку! <br> Попробуйте позжею</span>
       `;
        modal.querySelector(".title-wrapper").classList.add("title-wrapper_form-succes");
        modal.querySelector(".main-form").classList.add("form-isHide");
        modal.classList.add("modal__message");
    }
    function modalNormal(modal) {
        modal.querySelector(".title-wrapper").innerHTML = `
            <h2 class="title section-title contacts-form__title">свяжитесь</h2>
                <span class="section-subtitle contacts-form__subtitle">с нами</span>
                <div class="decor-square decor-square_title-wrapper"></div>
       `;
        modal.querySelector(".title-wrapper").classList.remove("title-wrapper_form-succes");
        modal.querySelector(".main-form").classList.remove("form-isHide");
        modal.classList.remove("modal__message");
    }

    ///// animations fot title
    var decorSquare = document.querySelectorAll(".decor-square_title-wrapper");
    for (var i = 0; i < decorSquare.length; i++) {
        new Waypoint({
            element: decorSquare[i],
            handler: function () {
                this.element.classList.toggle("decor-square_title-wrapper_animate");
            },
            offset: "100%",
        });
    }
    var titleWrapper = document.querySelectorAll(".title-wrapper_section");
    for (var i = 0; i < titleWrapper.length; i++) {
        new Waypoint({
            element: titleWrapper[i],
            handler: function () {
                this.element.classList.toggle("title-wrapper_section-animate");
            },
            offset: "120%",
        });
    }

    if (document.querySelector("#portfolio")) {
        var portfolioImage = document.querySelectorAll(".portfolio__img");
        for (var i = 0; i < portfolioImage.length; i++) {
            new Waypoint({
                element: portfolioImage[i],
                handler: function () {
                    this.element.classList.toggle("portfolio__img_animate");
                },
                offset: "100%",
            });
        }
        var portfolioDescription = document.querySelectorAll(".portfolio__desc");
        for (var i = 0; i < portfolioDescription.length; i++) {
            new Waypoint({
                element: portfolioDescription[i],
                handler: function () {
                    this.element.classList.toggle("portfolio__desc_animate");
                },
                offset: "100%",
            });
        }
    }

    if (document.querySelector("#homePage")) {
        ///////////////////// CONTACTS CHANGE TITLES TEXT

        function contactsChangeTitlesOnMobile() {
            if (document.body.clientWidth < 786) {
                document.querySelector(".contacts-form .contacts-form__title").innerText = "наши";
                document.querySelector(".contacts-form .contacts-form__subtitle").innerText =
                    "контакты";
            } else {
                document.querySelector(".contacts-form .contacts-form__title").innerText =
                    "свяжитесь";
                document.querySelector(".contacts-form .contacts-form__subtitle").innerText =
                    "с нами";
            }
        }

        contactsChangeTitlesOnMobile();

        window.addEventListener(
            `resize`,
            () => {
                contactsChangeTitlesOnMobile();
            },
            false
        );

        ///////////////// ANIMATIONS
        const heroContent = document.querySelector(".hero__content");
        heroContent.classList.add("hero__content_animate");

        var whyIcons = document.querySelectorAll(".why__icon");
        for (var i = 0; i < whyIcons.length; i++) {
            new Waypoint({
                element: whyIcons[i],
                handler: function () {
                    this.element.parentElement.classList.toggle("why__card_animate");
                },
                offset: "70%",
            });
        }

        var servicesCards = document.querySelectorAll(".services__card");
        for (var i = 0; i < servicesCards.length; i++) {
            new Waypoint({
                element: servicesCards[i],
                handler: function () {
                    this.element.classList.add("services__card_animate");
                    setTimeout(() => {
                        this.element.classList.remove("services__card_animate");
                    }, 1000);
                },
                offset: "80%",
            });
        }
        var buttons = document.querySelectorAll(".btn");
        for (var i = 0; i < buttons.length; i++) {
            new Waypoint({
                element: buttons[i],
                handler: function () {
                    if (this.element.classList.contains("header__btn")) {
                        return false;
                    }
                    this.element.classList.add("btn_animate");
                    setTimeout(() => {
                        this.element.classList.remove("btn_animate");
                    }, 1000);
                },
                offset: "110%",
            });
        }

        var worksBtnLine = new Waypoint({
            element: document.querySelector(".works__btn-wrapper"),
            handler: function () {
                this.element.classList.toggle("works__btn-wrapper_animate");
            },
            offset: "100%",
        });
        var form = new Waypoint({
            element: document.querySelector(".main-form "),
            handler: function () {
                this.element.classList.toggle("main-form_animate");
            },
            offset: "110%",
        });
        var sliderControls = new Waypoint({
            element: document.querySelector(".testimonials-slider-pagination "),
            handler: function () {
                document
                    .querySelector(".testimonials__sliders")
                    .classList.toggle("testimonials__sliders_animate");
            },
            offset: "100%",
        });
    }

    /////////// STAGES ACCORDION
    if (document.querySelector(".stages")) {
        let stagesLink = [...document.querySelectorAll(".stages__arrow-link")];
        let stagesItems = [...document.querySelectorAll(".stages__item")];
        let stagesBody = [...document.querySelectorAll(".stages__body")];

        stagesItems.forEach((stagesItem) => {
            stagesItem.addEventListener("click", (e) => {
                e.preventDefault();
                if (e.target.classList.contains("stages__arrow-link")) {
                    e.preventDefault();
                    let link = e.target;
                    link.classList.toggle("stages__arrow-link_isOpened");
                    let itemBody = stagesItem.querySelector(".stages__body");
                    if (itemBody.classList.contains("stages__body_isOpened")) {
                        itemBody.style.height = getComputedStyle(itemBody).height;
                        itemBody.classList.remove("stages__body_isOpened");
                        getComputedStyle(itemBody).height;
                        itemBody.style.height = "";
                    } else {
                        itemBody.classList.add("stages__body_isOpened");
                        let h = getComputedStyle(itemBody).height;
                        itemBody.style.height = "0";
                        getComputedStyle(itemBody).height;
                        itemBody.style.height = h;
                        setTimeout(() => {
                            itemBody.style.height = "";
                        }, 1000);
                    }
                } else if (e.target.classList.contains("stages__arrow")) {
                    return false;
                }
            });
        });
    }
});

///////////// services page animations

if (document.querySelector("#servicesPage")) {
    var weDoDesc = new Waypoint({
        element: document.querySelector(".weDo__desc"),
        handler: function () {
            this.element.classList.toggle("weDo__desc_animate");
        },
        offset: "100%",
    });

    var optionsIcons = document.querySelectorAll(".options__icon");
    for (var i = 0; i < optionsIcons.length; i++) {
        new Waypoint({
            element: optionsIcons[i],
            handler: function () {
                this.element.classList.toggle("options__icon_animate");
            },
            offset: "100%",
        });
    }

    var weDoIcons = document.querySelectorAll(".weDo__info-icon");
    for (var i = 0; i < weDoIcons.length; i++) {
        new Waypoint({
            element: weDoIcons[i],
            handler: function () {
                this.element.classList.toggle("weDo__info-icon_animate");
            },
            offset: "100%",
        });
    }

    var resultNumber = document.querySelectorAll(".result__number");
    for (var i = 0; i < resultNumber.length; i++) {
        new Waypoint({
            element: resultNumber[i],
            handler: function () {
                this.element.classList.toggle("result__number_animate");
            },
            offset: "100%",
        });
    }
}

///// CHANGING GRID-ITEMS IN PRICE BLOCK

if (document.querySelector("#prices")) {
    let grid = document.querySelector("#grid").children;
    let action = document.querySelector("#action").outerHTML;
    let standart = document.querySelector("#standart").outerHTML;
    let busines = document.querySelector("#busines").outerHTML;
    let top = document.querySelector("#top").outerHTML;
    function changeGridItems() {
        if (window.innerWidth <= 1442 && window.innerWidth >= 768) {
            grid[0].innerHTML = action + busines;
            grid[1].innerHTML = standart + top;
        } else if (window.innerWidth <= 768) {
            grid[0].innerHTML = action + standart;
            grid[1].innerHTML = busines + top;
        } else if (window.innerWidth >= 1442) {
            grid[0].innerHTML = action + standart;
            grid[1].innerHTML = busines + top;
        }
    }
    window.addEventListener("load", () => {
        changeGridItems();
    });
    window.addEventListener("resize", () => {
        changeGridItems();
    });
}
