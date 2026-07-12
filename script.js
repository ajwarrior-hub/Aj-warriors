/*====================================
 AJ WARRIOR Gaming Website
 script.js
====================================*/

// Loading Message
window.addEventListener("load", () => {
    console.log("AJ WARRIOR Website Loaded Successfully!");
});

// Smooth Scroll
document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function(e){

        let target = this.getAttribute("href");

        if(target.startsWith("#")){

            e.preventDefault();

            document.querySelector(target).scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// Button Hover Animation

const buttons=document.querySelectorAll(".btn,.btn2");

buttons.forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.08)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// Card Animation

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px)";

});

});

// Logo Rotation

const logo=document.querySelector(".logo img");

if(logo){

logo.addEventListener("mouseenter",()=>{

logo.style.transition=".5s";

logo.style.transform="rotate(360deg)";

});

logo.addEventListener("mouseleave",()=>{

logo.style.transform="rotate(0deg)";

});

}

// Hero Banner Glow

const banner=document.querySelector(".hero-image img");

if(banner){

setInterval(()=>{

banner.style.filter="drop-shadow(0 0 25px #8A2BE2)";

setTimeout(()=>{

banner.style.filter="none";

},1000);

},2000);

}

// Footer Year

const footer=document.querySelector("footer p");

if(footer){

footer.innerHTML=`© ${new Date().getFullYear()} AJ WARRIOR | Official Gaming Website`;

}