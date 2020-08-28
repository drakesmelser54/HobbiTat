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
      let instagram = inputs[6];
      let youtube = inputs[7];
      let pintrest = inputs[8];
      let facebook = inputs[9];
      let otherSite = inputs[10];
      let userWants = inputs[11];

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
          instagram,
          youtube,
          pintrest,
          facebook,
          otherSite,
          userWants
        );
        console.log(state.User);
        render(state.Profile);
        router.navigate("/Profile");
        populateProfile();
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
  instagram,
  youtube,
  pintrest,
  facebook,
  otherSite,
  userWants
) {
  state.User.email = email;
  state.User.name = name;
  state.User.location = location;
  state.User.profilePicture = profilePicture;
  state.User.hobbies = hobbies;
  state.User.instagram = instagram;
  state.User.youtube = youtube;
  state.User.pintrest = pintrest;
  state.User.facebook = facebook;
  state.User.otherSite = otherSite;
  state.User.userWants = userWants;
  state.User.loggedIn = true;

  db.collection("users").add({
    email: email,
    signedIn: true,
    password: password,
    name: name,
    location: location,
    profilePicture: profilePicture,
    hobbies: hobbies,
    instagram: instagram,
    youtube: youtube,
    pintrest: pintrest,
    facebook: facebook,
    otherSite: otherSite,
    userWants: userWants,
    loggedIn: true
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
  document.querySelector("#instagram").href = `${state.User.instagram}`;
  document.querySelector("#youtube").href = `${state.User.youtube}`;
  document.querySelector("#pintrest").href = `${state.User.pintrest}`;
  document.querySelector("#facebook").href = `${state.User.instagram}`;
  document.querySelector("#blog-website").href = `${state.User.otherSite}`;
  document.querySelector("#user-wants").innerText = `${state.User.hobbies}`;
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
          state.User.instagram = user.instagram;
          state.User.youtube = user.youtube;
          state.User.pintrest = user.pintrest;
          state.User.facebook = user.facebook;
          state.User.otherSite = user.otherSite;
          state.User.userWants = user.userWants;
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
  state.User.instagram = "";
  state.User.youtube = "";
  state.User.pintrest = "";
  state.User.facebook = "";
  state.User.otherSite = "";
  state.User.userWants = "";
  state.User.loggedIn = false;
}

//---------------------------------
function next(st) {
  if (st.view === profile)
  document.querySelector("#next").addEventListener("click", event => {
    event.preventDefault();
  });
}
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
//----------------------------Debugging Functions--------------------------------------------------
// function authChangeListener() {
//log user object from auth if user is logged in//
//   auth.onAuthStateChanged(user => (user ? console.log(user) : ""));
// }
