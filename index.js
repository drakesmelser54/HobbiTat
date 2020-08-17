//-------------------------------------------Imports----------------------------------------------/
import { Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";
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
  eventListenerBundler(st);
}
render(state.Home);

//------------------------------------------------Event Listener Bundler-------------------------
function eventListenerBundler(st) {
  hamburgerDropdown();
  listenForSignup(st);
}

//-----------------------------------------------Event Listeners-----------------------------------
/*Toggle between hiding and showing hamburger drop down when clicked*/
function hamburgerDropdown() {
  document
    .getElementById("hamburger-btn")
    .addEventListener("click", function() {
      document.getElementById("hamburger-dropdown").classList.toggle("show");
    });
}

//-------------------------------------sign-up-------------------------------/

//----------signup-form-------------/
function listenForSignup(st) {
  if (st.view === "Signup") {
    document.querySelector("#signup-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove submit button so it's not included
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let email = inputs[0];
      let password = inputs[1];

      //create user in firebase
      auth.createUserWithEmailAndPassword(email, password).then(response => {
        console.log("user registered");
        console.log("response", response);
        console.log("response.user", response.user);
        // addUserToState(email);
        render(state.ProfileForm);
      });
    });
  }
}

// function addUserToState(email) {
//   state.User.email = email;
// }
