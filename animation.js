/*==================================
      AJ WARRIOR
      animation.js
==================================*/

// Fade In Animation on Scroll

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
            entry.target.style.transition = "all 0.8s ease";

        }

    });

}, {
    threshold: 0.2
});

// Apply Animation

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";

    observer.observe(section);

});

// Hero Image Floating Animation

const heroImage = document.querySelector(".hero-image img");

if(heroImage){

    let position = 0;

    setInterval(()=>{

        position = position === 0 ? -10 : 0;

        heroImage.style.transition = "1.5s ease";
        heroImage.style.transform = `translateY(${position}px)`;

    },1500);

}

// Card Glow Effect

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.boxShadow="0 0 35px #8A2BE2";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.boxShadow="0 0 0px transparent";

    });

});

// Button Pulse Animation

const buttons = document.querySelectorAll(".btn,.btn2");

buttons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transition=".3s";
        btn.style.transform="scale(1.08)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});

console.log("AJ WARRIOR Animation Loaded Successfully");