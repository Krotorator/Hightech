import Blazy from "blazy";
require("waypoints/lib/noframework.waypoints.js");
let animations = require("./animations.js");
let accordion = require("./accordion.js");
let nav = require("./nav.js");
let slider = require("./slider.js");

document.addEventListener("DOMContentLoaded", () => {
    var bLazy = new Blazy();
    accordion();
    animations();
    nav();
    slider();

    ///////////////// MODAL STATE-MESSAGE SUCCESS/ERROR/NORMAL
    function modalSucces(modal) {
        let thisModal = modal || document.querySelector(".modal_open");
        thisModal.querySelector(".title-wrapper").innerHTML = `
            <span  class="section-subtitle contacts-form__subtitle">СпАСИБО</span>
            <h2  class="title section-title contacts-form__title">зА ЗАЯВКУ!</h2>
            <span >Мы свяжемся с Вами в кратчайшие сроки</span>
     `;

        thisModal.querySelector(".title-wrapper").classList.add("title-wrapper_form-succes");
        thisModal.querySelector(".main-form").classList.add("form-isHide");
        thisModal.classList.add("modal__message");
    }
    function createModalSucces() {
        let thisModal = document.querySelector("#modal");
        modal.style.display = "block";
        modal.classList.add("modal_open");
        document.body.classList.add("body_hidden");
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
        let thisModal = modal || document.querySelector(".modal_open");
        thisModal.querySelector(".title-wrapper").innerHTML = `
            <h2  class="title section-title contacts-form__title">Ошибка</h2>
            <span >Не удалось отправть заявку! <br> Попробуйте позжею</span>
       `;

        thisModal.querySelector(".title-wrapper").classList.add("title-wrapper_form-succes");
        thisModal.querySelector(".main-form").classList.add("form-isHide");
        thisModal.classList.add("modal__message");
    }
    function createModalError() {
        let thisModal = document.querySelector("#modal");
        modal.style.display = "block";
        modal.classList.add("modal_open");
        document.body.classList.add("body_hidden");
        thisModal.querySelector(".title-wrapper").innerHTML = `
            <h2  class="title section-title contacts-form__title">Ошибка</h2>
            <span >Не удалось отправть заявку! <br> Попробуйте позжею</span>
       `;

        modal.querySelector(".title-wrapper").classList.add("title-wrapper_form-succes");
        modal.querySelector(".main-form").classList.add("form-isHide");
        modal.classList.add("modal__message");
    }
    function modalNormal(modal) {
        let thisModal = modal || document.querySelector(".modal_open");
        thisModal.querySelector(".title-wrapper").innerHTML = `
            <h2 class="title section-title contacts-form__title">свяжитесь</h2>
                <span class="section-subtitle contacts-form__subtitle">с нами</span>
                <div class="decor-square decor-square_title-wrapper"></div>
       `;

        thisModal.querySelector(".title-wrapper").classList.remove("title-wrapper_form-succes");
        thisModal.querySelector(".main-form").classList.remove("form-isHide");
        thisModal.classList.remove("modal__message");
    }

    if (document.querySelector("#modal")) {
        ////////////////// MODAL

        function openModal(modal) {
            modal.style.display = "block";
            modal.classList.add("modal_open");
            document.body.classList.add("body_hidden");
        }
        function closeModal(modal) {
            modal.classList.remove("modal_open");
            modal.classList.add("modal_close");
        }

        let modal = document.querySelector("#modal");
        let closeModalBtn = document.querySelector("#modalClose");
        let btnsForModal = [...document.querySelectorAll(".btnForModal")];

        // open modal
        for (let i = 0; i < btnsForModal.length; i++) {
            ///// SHOW MODAL ON CLICK
            btnsForModal[i].addEventListener("click", (e) => {
                e.preventDefault();
                openModal(modal);
            });
        }

        closeModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            closeModal(modal);
            let form = modal.querySelector(".main-form");
            for (const child of form.children) {
                child.classList.contains("main-form__input-wrapper")
                    ? (child.classList = "main-form__input-wrapper")
                    : false; /////////// REMOVE INPUT STATES
            }
            form.reset(); /////////// RESET FORM
            document.body.classList.remove("body_hidden");
            setTimeout(() => {
                modalNormal(modal); ////// RETURN TO NORMAL MODAL STATE
            }, 500);

            setTimeout(() => {
                modal.style.display = "none";
                modal.classList.remove("modal_close");
            }, 600);
        });
    }

    ///// BUILDER OPTIONS SUBMIT BUTTON

    if (document.querySelector("#orderModal") && document.querySelector("#constructor")) {
        let odreModal = document.querySelector("#orderModal");

        let optionsBtnSubmit = document.querySelector(".functions-builder__btn-submit");

        optionsBtnSubmit.addEventListener("click", (e) => {
            let optionsList = document.querySelectorAll(".functions-builder__function");
            let price = 0;
            //// CHECKING FOR ACTIVE OPTIONS
            optionsList.forEach((option, index) => {
                if (option.querySelector('input[type="checkbox"]').checked) {
                    let box = option.querySelector('input[type="checkbox"]');

                    /// if option is chosen create option element
                    let choosenOption = document.createElement("DIV");
                    choosenOption.classList.add("order-options__item");
                    choosenOption.dataset.name = option.dataset.name;
                    choosenOption.dataset.price = option.dataset.price;
                    choosenOption.innerHTML = ` 
                        <span class="order-options__name">${option.dataset.name}</span>
                        <a href="#" class="order-options__delete-link">
                            <svg class="order-options__deleteBtn">
                                <use xlink:href="#orderOptionDelete"></use>
                            </svg>
                        </a>`;
                    /// append option element to form
                    odreModal.querySelector(".order-options__choosen-items").append(choosenOption);

                    //// calculate and show total price
                    price += parseInt(option.dataset.price);
                    odreModal.querySelector(".main-form__total-price").innerText = price;
                }
            });

            /// if there are no chosen options change option-title in form
            if (!odreModal.querySelector(".order-options__item")) {
                odreModal.querySelector(
                    ".order-options__title"
                ).innerText = `Вы не выбрали ни одной дополнительной опции.`;
            } else {
                odreModal.querySelector(".order-options__title").innerText = `Вы выбрали:`;
            }
            //// delete option on click
            let deleteBtns = odreModal.querySelectorAll(".order-options__delete-link");

            deleteBtns.forEach((deleteBtn) => {
                deleteBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    //recalculate total price minus deleted option
                    let priceContainer = odreModal.querySelector(".main-form__total-price");
                    let price = parseInt(priceContainer.innerText);
                    price -= deleteBtn.parentElement.dataset.price;
                    priceContainer.innerText = price;
                    //delete option element
                    deleteBtn.parentElement.remove();

                    /// remove checked state of checkbox in builder
                    //compare elements data-name
                    document
                        .querySelectorAll(".functions-builder__checkbox")
                        .forEach((checkbox) => {
                            if (
                                checkbox.parentElement.parentElement.dataset.name ===
                                deleteBtn.parentElement.dataset.name
                            ) {
                                checkbox.checked = false; /// remove checked state of checkbox
                            }
                        });

                    //// reflow options elements count
                    let deleteBtnsReflow = odreModal.querySelectorAll(
                        ".order-options__delete-link"
                    );
                    /// if all options are deleted change title text
                    if (deleteBtnsReflow.length < 1) {
                        odreModal.querySelector(
                            ".order-options__title"
                        ).innerText = `Вы не выбрали ни одной дополнительной опции.`;
                    }
                });
            });

            e.preventDefault();
            odreModal.style.display = "block";
            odreModal.classList.add("modal_open");
            document.body.classList.add("body_hidden");

            let closeModalBtn = odreModal.querySelector("#modalClose");

            closeModalBtn.addEventListener("click", (e) => {
                e.preventDefault();
                odreModal.classList.remove("modal_open");
                odreModal.classList.add("modal_close");
                document.body.classList.remove("body_hidden");

                //remove chosen options
                odreModal.querySelector(".order-options__choosen-items").innerHTML = "";

                /// REMOVE INPUT STATES
                let form = odreModal.querySelector(".main-form");
                for (const child of form.children) {
                    !child.classList.contains("main-form__submit-group")
                        ? (child.classList = "main-form__input-wrapper")
                        : false; /////////// REMOVE INPUT STATES
                }
                form.reset(); /////////// RESET FORM

                setTimeout(() => {
                    modalNormal(odreModal); ////// RETURN TO NORMAL MODAL STATE
                }, 500);

                setTimeout(() => {
                    odreModal.style.display = "none";
                    odreModal.classList.remove("modal_close");
                }, 600);
            });
        });
    }

    //////////////FORM

    let mainForms = [...document.querySelectorAll(".main-form")];
    let inputs = [...document.querySelectorAll(".main-form__input")];
    let inputWrappers = [...document.querySelectorAll(".main-form__input-wrapper")];
    let submitBtns = [...document.querySelectorAll(".main-form__btn")];

    //////////// FORM INPUTS STATES

    function nameIsEmpty(element) {
        return element.value == "";
    }
    function emailIsValid(element) {
        return element.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
    }
    function phoneIsValid(element) {
        return element.value.match(/^\d[\d\(\)\ -]{4,14}\d$/);
    }

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.addEventListener("focus", () => {
            input.parentElement.classList.add("main-form__input-wrapper_active");
            input.parentElement.classList.remove("main-form__input-wrapper_alert");
            input.parentElement.classList.remove("main-form__input-wrapper_succes");
        });
        input.addEventListener("blur", () => {
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
            } else if (input.name == "userPhone") {
                if (phoneIsValid(input)) {
                    input.parentElement.classList.add("main-form__input-wrapper_succes");
                    input.parentElement.classList.remove("main-form__input-wrapper_alert");
                } else {
                    input.parentElement.classList.add("main-form__input-wrapper_alert");
                    input.parentElement.classList.remove("main-form__input-wrapper_succes");
                }
            }
        });
    }

    function ajax(method, url, data, succes, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                succes();
            } else {
                error();
            }
        };
        xhr.send(data);
    }

    ////////////// FORM VALIDATE AND SUBMIT
    for (let i = 0; i < submitBtns.length; i++) {
        const submitBtn = submitBtns[i];
        submitBtn.addEventListener("click", (e) => {
            let thisForm = submitBtn.parentElement.parentElement;
            let name = thisForm.userName;
            let email = thisForm.userMail;
            let phone = thisForm.userPhone;
            let thisModal = thisForm.parentElement.parentElement.parentElement;
            e.preventDefault();
            // checking for valid inputs
            if (!nameIsEmpty(name) && emailIsValid(email) && phoneIsValid(phone)) {
                //create form data
                let formData = new FormData(thisForm);
                //append form type
                formData.append(`Тип формы`, thisForm.dataset.formname);
                //append page href
                formData.append(`Форма отправлена со страницы`, window.location.href);
                //checking if there are some aditional options in order
                if (
                    thisForm.firstElementChild.lastElementChild.classList.contains(
                        "order-options__choosen-items"
                    )
                ) {
                    let chosenOptions = [...thisForm.firstElementChild.lastElementChild.children];
                    //create and fill an array of options
                    let optionsArr = [];
                    chosenOptions.forEach((el, ind) => {
                        optionsArr.push(el.innerText);
                    });
                    //append aditional options to form data
                    formData.append(`Выбранные опции`, optionsArr);
                    // send form
                    ajax(
                        thisForm.method,
                        "https://formspree.io/mwkrkwwg",
                        formData,
                        modalSucces,
                        modalError
                    );
                } else {
                    //if there are no aditional options sending just form
                    //if form parent != modal we create new modal with message
                    if (thisForm.parentElement.parentElement.parentElement.id !== "modal") {
                        console.log("no modal");

                        ajax(
                            thisForm.method,
                            "https://formspree.io/mwkrkwwg",
                            formData,
                            createModalSucces,
                            createModalError
                        );
                    } else {
                        //if form parent === modal, append message to this modal
                        ajax(
                            thisForm.method,
                            "https://formspree.io/mwkrkwwg",
                            formData,
                            modalSucces,
                            modalError
                        );
                    }
                }
                inputWrappers.forEach((el) => {
                    ///////DISABLING INPUTS IF SUCCESS
                    el.classList = "main-form__input-wrapper";
                    let formElements = [...el.parentElement.elements];
                    formElements.forEach((input) => {
                        input.setAttribute("disabled", "disabled");
                    });
                });
                thisForm.reset();
                submitBtn.setAttribute("disabled", "disabled");
            } else if (nameIsEmpty(name)) {
                ///// ALERT STATE OF INPUTS
                name.parentElement.classList.add("main-form__input-wrapper_alert");
            } else if (!emailIsValid(email)) {
                email.parentElement.classList.add("main-form__input-wrapper_alert");
            }
        });
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
    }
});

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
    document.addEventListener("DOMContentLoaded", () => {
        changeGridItems();
        ///////////////// MODAL STATE-MESSAGE SUCCESS/ERROR/NORMAL
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
        ////// ORDER BUTTONS MODAL
        let odreModal = document.querySelector("#orderModal");

        let orderBtns = document.querySelectorAll(".btnOrder");

        let price = 0;
        orderBtns.forEach((orderBtn) => {
            orderBtn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log(orderBtn);
                odreModal.style.display = "block";
                odreModal.classList.add("modal_open");
                document.body.classList.add("body_hidden");

                /// if option is chosen create option element
                let choosenOption = document.createElement("DIV");
                choosenOption.classList.add("order-options__item");
                choosenOption.dataset.name = orderBtn.dataset.name;
                choosenOption.dataset.price = orderBtn.dataset.price;
                choosenOption.innerHTML = ` 
                        <span class="order-options__name">${orderBtn.dataset.name} ( ${orderBtn.dataset.option} )</span>
                        <br>
                       `;
                /// append option element to form
                odreModal.querySelector(".order-options__choosen-items").append(choosenOption);

                //// calculate and show total price
                price += parseInt(orderBtn.dataset.price);
                odreModal.querySelector(".main-form__total-price").innerText = price;
            });

            let closeModalBtn = odreModal.querySelector("#modalClose");

            closeModalBtn.addEventListener("click", (e) => {
                e.preventDefault();
                odreModal.classList.remove("modal_open");
                odreModal.classList.add("modal_close");
                price = 0;
                //remove chosen options
                odreModal.querySelector(".order-options__choosen-items").innerHTML = "";

                /// REMOVE INPUT STATES
                let form = odreModal.querySelector(".main-form");
                for (const child of form.children) {
                    !child.classList.contains("main-form__submit-group")
                        ? (child.classList = "main-form__input-wrapper")
                        : false; /////////// REMOVE INPUT STATES
                }
                form.reset(); /////////// RESET FORM

                setTimeout(() => {
                    modalNormal(odreModal); ////// RETURN TO NORMAL MODAL STATE
                }, 500);

                setTimeout(() => {
                    odreModal.style.display = "none";
                    odreModal.classList.remove("modal_close");
                }, 600);
            });
        });
    });
    window.addEventListener("resize", () => {
        changeGridItems();
        let odreModal = document.querySelector("#orderModal");

        let orderBtns = document.querySelectorAll(".btnOrder");

        let price = 0;
        orderBtns.forEach((orderBtn) => {
            orderBtn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log(orderBtn);
                odreModal.style.display = "block";
                odreModal.classList.add("modal_open");
                document.body.classList.add("body_hidden");

                /// if option is chosen create option element
                let choosenOption = document.createElement("DIV");
                choosenOption.classList.add("order-options__item");
                choosenOption.dataset.name = orderBtn.dataset.name;
                choosenOption.dataset.price = orderBtn.dataset.price;
                choosenOption.innerHTML = ` 
                        <span class="order-options__name">${orderBtn.dataset.name} ( ${orderBtn.dataset.option} )</span>
                        <br>
                       `;
                /// append option element to form
                if (odreModal.querySelector(".order-options__choosen-items").children.length < 1) {
                    odreModal.querySelector(".order-options__choosen-items").append(choosenOption);
                }

                //// calculate and show total price
                price += parseInt(orderBtn.dataset.price);
                odreModal.querySelector(".main-form__total-price").innerText = price;
            });

            let closeModalBtn = odreModal.querySelector("#modalClose");

            closeModalBtn.addEventListener("click", (e) => {
                e.preventDefault();
                odreModal.classList.remove("modal_open");
                odreModal.classList.add("modal_close");
                price = 0;
                //remove chosen options
                odreModal.querySelector(".order-options__choosen-items").innerHTML = "";

                /// REMOVE INPUT STATES
                let form = odreModal.querySelector(".main-form");
                for (const child of form.children) {
                    !child.classList.contains("main-form__submit-group")
                        ? (child.classList = "main-form__input-wrapper")
                        : false; /////////// REMOVE INPUT STATES
                }
                form.reset(); /////////// RESET FORM

                setTimeout(() => {
                    modalNormal(odreModal); ////// RETURN TO NORMAL MODAL STATE
                }, 500);

                setTimeout(() => {
                    odreModal.style.display = "none";
                    odreModal.classList.remove("modal_close");
                }, 600);
            });
        });
    });
}
//////////////  CONSTRUCTOR PAGE
if (document.querySelector("#constructor")) {
    ////////// BUILDER

    //////BUILDER OPTION CARD BTN -> CHECKBOX:CHECKED
    document.querySelectorAll(".functions-card").forEach((card) => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(e.target);
            if (e.target.classList.contains("functions-card__btn")) {
                card.parentElement.querySelector(".functions-builder__checkbox").checked = "true";
            }
        });
    });
}
