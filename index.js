//-------------------------------------------Imports----------------------------------------------/
import { Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

//---------------------------------------------router fxn---------------------------------------/
const router = new Navigo(window.location.origin);

router
  .on({
    "/": () => render(state.Home),
    ":page": params => {
      let routeEntered = params.page;
      let formattedRoute = capitalize(routeEntered);
      let pieceOfState = state[formattedRoute];
      render(pieceOfState);
    }
  })
  .resolve();
//-------------------------------------------------Render fxn-------------------------------------/
function render(st) {
  document.querySelector("#root").innerHTML = `
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;

  router.updatePageLinks();
  eventListenerBundler();
}
render(state.Home);

//------------------------------------------------Event Listener Bundler-------------------------
function eventListenerBundler() {
  hamburgerDropdown();
  homeLoginButtonEventListener();
  homeSignupButtonEventListener();
  alreadyEventListener();
  dontHaveEventListener();
  signupToProfileForm();
}

//-----------------------------------------------Event Listeners-----------------------------------
//login and signup buttons on home page//
function homeLoginButtonEventListener() {
  document.querySelector("#login-button").addEventListener("click", event => {
    event.preventDefault();
    render(state.Login);
  });
}
function homeSignupButtonEventListener() {
  document.querySelector("#signup-button").addEventListener("click", event => {
    event.preventDefault();
    render(state.Signup);
  });
}
//already have an acounnt?//
function alreadyEventListener() {
  document.querySelector("#already").addEventListener("click", event => {
    event.preventDefault();
    render(state.Login);
  });
}
//don't have an account?//
function dontHaveEventListener() {
  document.querySelector("#dont-have").addEventListener("click", event => {
    event.preventDefault();
    render(state.Signup);
  });
}

function signupToProfileForm() {
  document
    .querySelector("#signup-to-create")
    .addEventListener("click", event => {
      event.preventDefault();
      render(state.ProfileForm);
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
