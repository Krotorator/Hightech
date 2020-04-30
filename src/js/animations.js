module.exports = function () {
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
};
