module.exports = function () {
    //////////////NAV
    if (document.querySelector("#nav")) {
        let nav = document.querySelector("#nav");
        let wrapper = document.querySelector("#wrapper");
        let burger = document.querySelector("#burger");
        let closeBtn = [...document.querySelectorAll(".close-btn")];

        //open nav
        burger.addEventListener("click", (e) => {
            e.preventDefault();
            nav.classList.add("nav_active");
            document.body.classList.add("body_hidden");
        });

        //close nav
        for (let i = 0; i < closeBtn.length; i++) {
            const btn = closeBtn[i];
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                nav.classList.remove("nav_active");
                document.body.classList.remove("body_hidden");
            });
        }
    }
};
