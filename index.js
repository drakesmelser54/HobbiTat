//-------------------------------------------Imports----------------------------------------------/
import { Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";

//-----------------------------------router fxn-----------------------------------------------------
const router = new Navigo(window.location.origin);

router
  .on({
    "/": () => render(state.Home),
    ":page": params => {
      let page = capitalize(params.page);
      render(state[page]);
    }
  })
  .resolve();

//------------------------------------Render fxn----------------------------------------------------
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

//---------------------------------Event Listener Bundler-------------------------------------------
function eventListenerBundler(st) {
  hamburgerDropdown();
  loginLogoutListener(state.User);
  listenForSignup(st);
  listenForLogin(st);
}

//-------------------------------------Event Listeners-------------------------------------------//

//----------------------------------Nav Bar Fxns-------------------------------------------------
//Toggle between hiding and showing hamburger drop down when clicked//
function hamburgerDropdown() {
  document
    .getElementById("hamburger-btn")
    .addEventListener("click", function() {
      document.getElementById("hamburger-dropdown").classList.toggle("show");
    });
}

//-------------------------------------sign-up------------------------------------------------------
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
      let name = inputs[2];
      let location = inputs[3];
      let profilePicture = inputs[4];
      let hobbies = inputs[5];
      let userLinks = inputs[6];
      //create user in firebase
      auth.createUserWithEmailAndPassword(email, password).then(response => {
        console.log("user registered");
        //add user to state and database
        addUserToStateAndDB(
          email,
          password,
          name,
          location,
          profilePicture,
          hobbies,
          userLinks
        );
        console.log(state.User);
        render(state.Profile);
        router.navigate("/Profile");
      });
    });
  }
}

//--------add user to state and db-----------/
function addUserToStateAndDB(
  email,
  password,
  name,
  location,
  profilePicture,
  hobbies,
  userLinks
) {
  state.User.email = email;
  state.User.name = name;
  state.User.location = location;
  state.User.profilePicture = profilePicture;
  state.User.hobbies = hobbies;
  state.User.userLinks = userLinks;
  state.User.loggedIn = true;

  db.collection("users").add({
    email: email,
    signedIn: true,
    password: password,
    name: name,
    location: location,
    profilePicture: profilePicture,
    hobbies: hobbies,
    userLinks: userLinks
  });
}

//-----------------------------------------login----------------------------------------------------
function listenForLogin(st) {
  if (st.view === "Login") {
    document.querySelector("#login-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove the login button so it's not included
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let email = inputs[0];
      let password = inputs[1];
      auth.signInWithEmailAndPassword(email, password).then(() => {
        console.log("user logged in");
        getUserFromDb(email)
          .then(() => render(state.Profile), router.navigate("/Profile"))
          .then(() => {
            populateProfile();
          });
      });
    });
  }
}

function populateProfile() {
  document.querySelector("#user-photo").src = `${state.User.profilePicture}`;
  document.querySelector("#user-name").innerText = `${state.User.name}`;
  document.querySelector("#user-location").innerText = `${state.User.location}`;
  document.querySelector("#user-hobbies").innerText = `${state.User.hobbies}`;
  document.querySelector("#user-links").href = `${state.User.userLinks}`;
}
//------------------------------------//
function getUserFromDb(email) {
  return db
    .collection("users")
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        if (email === doc.data().email) {
          let id = doc.id;
          db.collection("users")
            .doc(id)
            .update({ signedIn: true });
          console.log("user signed in db");
          let user = doc.data();
          state.User.name = user.name;
          state.User.location = user.location;
          state.User.profilePicture = user.profilePicture;
          state.User.hobbies = user.hobbies;
          state.User.userLinks = user.userLinks;
          state.User.loggedIn = true;
          // populateProfile(state.User.profilePicture)
          console.log(state.User);
        }
      })
    );
}

//--------------------------------------Log-out---------------------------------------------------//
function loginLogoutListener(user) {
  //select log-out a tag in nav//
  document.querySelector("#log-out").addEventListener("click", event => {
    //condition if user is logged-in//
    if (user.loggedIn) {
      event.preventDefault();
      //log-out fxn//
      auth.signOut().then(() => {
        console.log("user logged out");
        logOutUserInDb(user.email);
        resetUserInState();
        //update user in db//
        db.collection("users").get;
        render(state.Home);
        router.navigate("/Home");
      });
      console.log(state.User);
    }
  });
}

//---------log-out in Db-------//
function logOutUserInDb(email) {
  if (state.User.loggedIn) {
    db.collection("users")
      .get()
      .then(snapshot =>
        snapshot.docs.forEach(doc => {
          if (email === doc.data().email) {
            let id = doc.id;
            db.collection("users")
              .doc(id)
              .update({ signedIn: false });
          }
        })
      );
    console.log("user signed out in db");
  }
}

//---------reset user in state-------//
function resetUserInState() {
  state.User.email = "";
  state.User.name = "";
  state.User.location = "";
  state.User.profilePicture = "";
  state.User.hobbies = "";
  state.User.userLinks = "";
  state.User.loggedIn = false;
}

//---------------------------Profile Page Functions---------------------------------------------//
//-----add info from database to profile on login------//
// function populateProfile() {
//   document.querySelector(".profilePictureContainer").src =
//     "${state.User.profilePicture}";
// }
//----------------------------Debugging Functions--------------------------------------------------
// function authChangeListener() {
//log user object from auth if user is logged in//
//   auth.onAuthStateChanged(user => (user ? console.log(user) : ""));
// }
