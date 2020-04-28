//= _jquery.js
//= _swiper.js
//= _scripts.js
import Swiper from "swiper";
require("waypoints/lib/noframework.waypoints.js");

console.log(2);

document.addEventListener("DOMContentLoaded", () => {
    console.log(1);
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

    ///////////////////// CONTACTS CHANGE TITLES TEXT

    function contactsChangeTitlesOnMobile() {
        if (document.body.clientWidth < 786) {
            document.querySelector(".contacts-form .contacts-form__title").innerText = "наши";
            document.querySelector(".contacts-form .contacts-form__subtitle").innerText =
                "контакты";
        } else {
            document.querySelector(".contacts-form .contacts-form__title").innerText = "свяжитесь";
            document.querySelector(".contacts-form .contacts-form__subtitle").innerText = "с нами";
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

    var portfolioBtnLine = new Waypoint({
        element: document.querySelector(".portfolio__btn-wrapper"),
        handler: function () {
            this.element.classList.toggle("portfolio__btn-wrapper_animate");
        },
        offset: "100%",
    });
    var mainForm = new Waypoint({
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
});
