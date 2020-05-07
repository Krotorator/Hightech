module.exports = function () {
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
        console.log("portfolio");

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
        console.log("homepage");

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
                offset: "100%",
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
                offset: "100%",
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

    if (document.querySelector(".main-form")) {
        var form = new Waypoint({
            element: document.querySelector(".main-form "),
            handler: function () {
                this.element.classList.toggle("main-form_animate");
            },
            offset: "110%",
        });
    }
    if (document.querySelector("#constructor")) {
        let constructorSubtitle = document.querySelector(".constructor-hero__subtitle");
        setTimeout(() => {
            constructorSubtitle.classList.add("constructor-hero__subtitle_animate");
        }, 500);

        var funcs = new Waypoint({
            element: document.querySelector(".base-functions__list"),

            handler: function () {
                let children = [...this.element.children];
                let i = 0;
                let interval = setInterval(() => {
                    children[i].classList.add("base-functions__item_animate");
                    i++;
                    if (i === children.length) {
                        clearInterval(interval);
                    }
                }, 50);
            },
            offset: "110%",
        });
    }
};
