if (!document.cookie.includes('token')) window.location.href = "/sections/auth.html"

let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".bx-search");

btn.onclick = function () {
    sidebar.classList.toggle("active");
}
