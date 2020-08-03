/*Importing all modules */
import { Nav, Main } from "./components";
import * as state from "./store";

/*Render fxn */
function render(st) {
  document.querySelector("#root").innerHTML = `
  ${Nav(state.Links)}
  ${Main(st)}
  `;
  eventListenerBundler();
}
render(state.Home);

//bundle event listeners for render fxn//
function eventListenerBundler() {
  homeButtonEventListener();
  hamburgerDropdown();
  hamburgerEventListeners();
}
//hamburger button//
function hamburgerEventListeners() {
  document.querySelectorAll(".dropdown-content a").forEach(link =>
    link.addEventListener("click", event => {
      event.preventDefault();
      let linkText = event.target.textContent;
      let pieceOfState = state[linkText];
      render(pieceOfState);
    })
  );
}
//home button//
function homeButtonEventListener() {
  document.querySelector("#home").addEventListener("click", event => {
    event.preventDefault();
    render(state.Home);
  });
}

/*Toggle between hiding and showing hamburger drop down when clicked*/
function hamburgerDropdown() {
  document
    .getElementById("hamburger-btn")
    .addEventListener("click", function() {
      document.getElementById("hamburger-dropdown").classList.toggle("show");
    });
}
