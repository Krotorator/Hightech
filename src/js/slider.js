import Swiper from "swiper";

module.exports = function () {
    if (document.querySelector("#sliders")) {
    }
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
};
