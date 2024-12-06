import { carouselData } from "./data.js";
import { teamData } from "./data.js";


alert("Working");
// Caching the  DOM elements 
const carouselImg = document.getElementById("carouselImage");
const carouselText = document.getElementById("carouselText");
const teamImage = document.getElementById("teamImage");
const teamName = document.getElementById("teamName");
const teamDots = document.querySelectorAll('.teamDot');
const teamPosition = document.getElementById("teamPosition");
const navbarIcon = document.getElementById("navbarIcon");
const navbarContainer = document.getElementById("navbarContainer");

//Function for navbar
function navbar(){
 navbarContainer.classList.toggle('active');
 if(navbarContainer.classList.contains('active')){
    headerText.style.display = 'none';
 }else{
    headerText.style.display = 'block';
 }
}

navbarIcon.addEventListener('click', navbar);

// Define and call function for updating carousel
let currentIndex = 0;
updateCard(currentIndex);

//Prev button for carousel
document.getElementById("prevBtn").addEventListener('click', function(){
    currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
    updateCard(currentIndex);
});

//Next button for carousel
document.getElementById("nextBtn").addEventListener('click', function(){
    currentIndex = (currentIndex + 1) % carouselData.length;
    updateCard(currentIndex);
});

//Function that updates the carousel with their respective circles
function updateCard(){
    const {imgSrc, descrip} = carouselData[currentIndex];
    carouselImg.src = imgSrc;
    carouselText.innerHTML = descrip;

    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}
let teamIndex = 0

//Function that updates team card
function updateTeam(){
    const {imgSrc, name, position} = teamData[teamIndex];

    //Update the team card
    teamImage.src = imgSrc;
    teamName.innerHTML = name;
    teamPosition.innerHTML = position;

    //Update the dots
    teamDots.forEach(dot => dot.classList.remove('active'));
    teamDots[teamIndex].classList.add('active');

    //Increment the teamIndex and wrap if it exceed
    teamIndex =(teamIndex + 1) % teamData.length;
}

//Set interval for team
setInterval(updateTeam, 3000);

//Select all the details elements
const faqCards = document.querySelectorAll('.faq-card');

//Function to close all details that are not opened
faqCards.forEach( faq => {
    faq.addEventListener('toggle', function() {
        if(this.open) {
            faqCards.forEach(card => {
                if(card !== this && card.open){
                    card.open = false;
                    card.querySelector('img').src = './assets/.dropdown.png';
                }
            });
            this.querySelector('img').src = './assets/dropUp.png';
        } else {
            this.querySelector('img').src = './assets/dropdown.png';
        }
    });
});

// Call the function to shrink header upon scrolling
window.onscroll = function() {
    shrinkHeader();
};

function shrinkHeader(){
    const header = document.getElementById("headerContainer");
    const headerText = document.getElementById("headerText");

    const minHeight = 40; //Final height of header after shrinking
    const maxHeight = 218; //Initial height of header

    let scrollPosition = window.scrollY;
    let headerHeight = maxHeight - scrollPosition;

    if(headerHeight < minHeight) {
        headerHeight = minHeight; // Prevent the header shrink
    }

    header.style.height = `${headerHeight}px`; // Set the height of header dynamically


    //Change the opacity proportional to scrolling
    let opacity = 1 - (scrollPosition / (maxHeight /1.5));
    if(opacity < 0) opacity = 0;
    headerText.style.opacity = opacity;

    let moveUp = -scrollPosition / 2;
    if(scrollPosition > maxHeight) moveUp = -maxHeight / 2;
    headerText.style.transform = `translateY(${moveUp}px)`;
}