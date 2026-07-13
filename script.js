/*==================================
      AJ WARRIOR
      script.js
==================================*/

// Website Loaded
window.addEventListener("load", () => {
    console.log("AJ WARRIOR Website Loaded Successfully");
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});

// Card Hover Animation
const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.05)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});

// Button Click Animation
const buttons = document.querySelectorAll(".btn, .btn2");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.95)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        },200);

    });

});

// Logo Rotation
const logo = document.querySelector(".logo img");

if(logo){

logo.addEventListener("mouseenter",()=>{

logo.style.transition="0.6s";
logo.style.transform="rotate(360deg)";

});

logo.addEventListener("mouseleave",()=>{

logo.style.transform="rotate(0deg)";

});

}

// Current Year
const footer=document.querySelector("footer p");

if(footer){

footer.innerHTML=`© ${new Date().getFullYear()} AJ WARRIOR | All Rights Reserved`;

}