module.exports = function () {
    //////////////NAV
};
let nav = document.querySelector("#nav");
let wrapper = document.querySelector("#wrapper");
let burger = document.querySelector("#burger");
let closeBtn = [...document.querySelectorAll(".close-btn")];

burger.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.add("nav_active");
    wrapper.classList.add("wrapper_hidden");
});
for (let i = 0; i < closeBtn.length; i++) {
    const btn = closeBtn[i];
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        nav.classList.remove("nav_active");
        wrapper.classList.remove("wrapper_hidden");
    });
}
