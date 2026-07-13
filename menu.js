/*==================================
      AJ WARRIOR
      menu.js
==================================*/

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav ul");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

// Close Menu After Clicking Link
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

    });

});

// Close Menu When Window is Resized
window.addEventListener("resize", () => {

    if (window.innerWidth > 768 && navMenu) {

        navMenu.classList.remove("active");

    }

});