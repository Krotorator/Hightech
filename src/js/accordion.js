module.exports = function () {
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

    if (document.querySelector("#constructor")) {
        ////////// BUILDER ACCORDION WHEN SCREEN < 768px

        let optionLinks = document.querySelectorAll(".functions-builder__function-link");
        optionLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                let optionTitle = link.parentElement.parentElement;
                let optionCard = optionTitle.querySelector(".functions-card");
                if (optionTitle.classList.contains("functions-builder__function_active")) {
                    console.log(optionTitle);
                    optionCard.style.height = getComputedStyle(optionCard).height;
                    optionTitle.classList.remove("functions-builder__function_active");
                    getComputedStyle(optionCard).height;
                    optionCard.style.height = "";
                } else {
                    document.querySelectorAll(".functions-builder__function").forEach((element) => {
                        if (element !== optionCard) {
                            element.classList.remove("functions-builder__function_active");
                        }
                    });
                    optionTitle.classList.add("functions-builder__function_active");

                    let h = getComputedStyle(optionCard).height;
                    optionCard.style.height = "0";
                    getComputedStyle(optionCard).height;
                    optionCard.style.height = h;

                    setTimeout(() => {
                        optionCard.style.height = "";
                    }, 1000);
                }
            });
        });
    }
};
