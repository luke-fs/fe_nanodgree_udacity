/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

//Define Global Variables
let sections;
let navbarList;
let isScrolling = false;
let timeout;

//Helper Functions//

// Scroll to anchor ID using scrollTO event
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
// Function to check whether active class needs to be changed
function makeActive(){
    console.log("Scroll Event")
    console.log(sections)
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        const currentSectionId = section.getAttribute('id');
        const currentNavLink = document.querySelector(`[href="#${currentSectionId}"]`);
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('your-active-class');
            currentNavLink.classList.add('your-active-class');


        } else {
            section.classList.remove('your-active-class');
            currentNavLink.classList.remove('your-active-class');
        }
        }
}

//Main Code Functions//

// Generate navbar function
function generateNavbar(){
    sections = document.querySelectorAll('section');

    // Loop through all sections to generate navbar elements
    sections.forEach((section, index) => {
        const sectionTitle = section.getAttribute('data-nav');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#section${index + 1}" class=menu__link>${sectionTitle}</a>`; 
        navbarList.appendChild(listItem);
    });
}

//Eventlistener to DOM Content Loaded to generate the navbar and nest other even listeners
document.addEventListener('DOMContentLoaded', function () {
    sections = document.querySelectorAll('section'); 
    navbarList = document.getElementById('navbar__list');

    //Call function to generate the navbar
    generateNavbar();

// Eventlistener to scroll to set active class
window.addEventListener('scroll', function () {
    //Call makeActive to mark active section
    makeActive()

    isScrolling = true;

    navbarList.classList.remove('hidden-nav');

    // Clear the timeout to prevent hiding the navbar while scrolling
    clearTimeout(timeout);

    // Set a timeout to hide the navbar if the user stops scrolling after a certain time
    timeout = setTimeout(function () {
    isScrolling = false;

    if (!isScrolling) {
        navbarList.classList.add('hidden-nav');
    }
    }, 150000);
  });
  
    //Even Listener to Click on Navbar link and make sure it is of type A
      navbarList.addEventListener('click', function (event) {
          if (event.target.tagName === 'A') {
              event.preventDefault();
              const sectionId = event.target.getAttribute('href').slice(1); 
              scrollToSection(sectionId); 
          }
      });
  });


