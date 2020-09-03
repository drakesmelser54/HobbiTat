//-------------------------------------------Imports----------------------------------------------/
import { Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import "./env";
import { capitalize } from "lodash";
import { auth, db } from "./firebase";

//-----------------------------------router fxn-----------------------------------------------------
const router = new Navigo(window.location.origin);

router
  .on({
    ":page": params => render(state[capitalize(params.page)]),
    "/": () => render(state.Home)
  })
  .resolve();

//------------------------------------Render fxn----------------------------------------------------
function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;

  router.updatePageLinks();
  eventListenerBundler(st);
}

//---------------------------------Event Listener Bundler-------------------------------------------
function eventListenerBundler(st) {
  hamburgerDropdown();
  checkLogInBeforeProfile();
  checkLogInBeforeHobbitat();
  loginLogoutListener(state.User);
  listenForSignup(st);
  listenForLogin(st);
  profileListener(st);
  nextUserListener(st);
  hobbitatListener(st);
  viewHobbitat(st);
  editProfile(st);
}

//-------------------------------------Event Listeners-------------------------------------------//
function profileListener(st) {
  if (st.view === "Profile") {
    populateProfile();
    slideShow(st);
  }
}

function hobbitatListener(st) {
  if (st.view === "Hobbitat") {
    populateHobbitat();
    otherSlideShow(st);
  }
}

//----------------------------------Nav Bar Fxns-------------------------------------------------
//Toggle between hiding and showing hamburger drop down when clicked//
function hamburgerDropdown() {
  document
    .getElementById("hamburger-btn")
    .addEventListener("click", function() {
      document.getElementById("hamburger-dropdown").classList.toggle("show");
    });
}

//check if user is logged in before allowing profile and hobbitat view access
function checkLogInBeforeProfile() {
  document.querySelector("#Profile").addEventListener("click", function() {
    if (state.User.loggedIn == false) {
      render(state.Login), router.navigate("/Login");
    }
  });
}

function checkLogInBeforeHobbitat() {
  document.querySelector("#Hobbitat").addEventListener("click", function() {
    if (state.User.loggedIn == false) {
      render(state.Login), router.navigate("/Login");
    }
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
      let hobbyPicture1 = inputs[6];
      let hobbyPicture2 = inputs[7];
      let hobbyPicture3 = inputs[8];
      let hobbyPicture4 = inputs[9];
      let instagram = inputs[10];
      let youtube = inputs[11];
      let pintrest = inputs[12];
      let facebook = inputs[13];
      let otherSite = inputs[14];
      let userWants = inputs[15];

      //create user in firebase
      auth.createUserWithEmailAndPassword(email, password).then(response => {
        //add user to state and database
        addUserToStateAndDB(
          email,
          password,
          name,
          location,
          profilePicture,
          hobbies,
          hobbyPicture1,
          hobbyPicture2,
          hobbyPicture3,
          hobbyPicture4,
          instagram,
          youtube,
          pintrest,
          facebook,
          otherSite,
          userWants
        );
        render(state.Profile);
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
  hobbyPicture1,
  hobbyPicture2,
  hobbyPicture3,
  hobbyPicture4,
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
  state.User.hobbyPicture1 = hobbyPicture1;
  state.User.hobbyPicture2 = hobbyPicture2;
  state.User.hobbyPicture3 = hobbyPicture3;
  state.User.hobbyPicture4 = hobbyPicture4;
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
    hobbyPicture1: hobbyPicture1,
    hobbyPicture2: hobbyPicture2,
    hobbyPicture3: hobbyPicture3,
    hobbyPicture4: hobbyPicture4,
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
  document.querySelector("#slide").src = `${state.User.hobbyPicture1}`;
  document.querySelector("#instagram").href = `${state.User.instagram}`;
  document.querySelector("#youtube").href = `${state.User.youtube}`;
  document.querySelector("#pintrest").href = `${state.User.pintrest}`;
  document.querySelector("#facebook").href = `${state.User.facebook}`;
  document.querySelector("#blog-website").href = `${state.User.otherSite}`;
  document.querySelector("#user-wants").innerText = `${state.User.userWants}`;
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
          let user = doc.data();
          state.User.email = user.email;
          state.User.name = user.name;
          state.User.location = user.location;
          state.User.profilePicture = user.profilePicture;
          state.User.hobbies = user.hobbies;
          state.User.hobbyPicture1 = user.hobbyPicture1;
          state.User.hobbyPicture2 = user.hobbyPicture2;
          state.User.hobbyPicture3 = user.hobbyPicture3;
          state.User.hobbyPicture4 = user.hobbyPicture4;
          state.User.instagram = user.instagram;
          state.User.youtube = user.youtube;
          state.User.pintrest = user.pintrest;
          state.User.facebook = user.facebook;
          state.User.otherSite = user.otherSite;
          state.User.userWants = user.userWants;
          state.User.loggedIn = true;
          // populateProfile(state.User.profilePicture)
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
        logOutUserInDb(user.email);
        resetUserInState();
        //update user in db//
        db.collection("users").get;
        render(state.Home);
        router.navigate("/Home");
      });
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
  }
}

//---------reset user in state-------//
function resetUserInState() {
  state.User.email = "";
  state.User.name = "";
  state.User.location = "";
  state.User.profilePicture = "";
  state.User.hobbies = "";
  state.User.hobbyPicture1 = "";
  state.User.hobbyPicture2 = "";
  state.User.hobbyPicture3 = "";
  state.User.hobbyPicture4 = "";
  state.User.instagram = "";
  state.User.youtube = "";
  state.User.pintrest = "";
  state.User.facebook = "";
  state.User.otherSite = "";
  state.User.userWants = "";
  state.User.loggedIn = false;
}

//---------------------------------------------View other Users------------------------------//
//button from profile page//
function viewHobbitat(st) {
  if (st.view === "Profile") {
    document
      .querySelector("#view-hobbitat")
      .addEventListener("click", event => {
        event.preventDefault();

        let userArray = [];
        db.collection("users")
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => userArray.push(doc.data()));
          })
          .then(() => {
            let randomUser =
              userArray[Math.floor(Math.random() * userArray.length)];

            addRandomUserToState(randomUser);

            if (randomUser.email === state.User.email) {
              nextUserListener(st);
            } else {
              render(state.Hobbitat);
              router.navigate("/Hobbitat");
              populateHobbitat();
            }
          });
      });
  }
}

//button from hobbitat page//
function nextUserListener(st) {
  if (st.view === "Hobbitat") {
    document.querySelector("#next").addEventListener("click", event => {
      event.preventDefault();

      let userArray = [];
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => userArray.push(doc.data()));
        })
        .then(() => {
          let randomUser =
            userArray[Math.floor(Math.random() * userArray.length)];

          addRandomUserToState(randomUser);

          if (randomUser.email === state.User.email) {
            nextUserListener(st);
          } else {
            render(state.Hobbitat);
            populateHobbitat();
          }
        });
    });
  }
}

//popuates the profile card for other users, the values are stored in state at Community if there's any confusion
function populateHobbitat() {
  document.querySelector(
    "#user-photo"
  ).src = `${state.Community.profilePicture}`;
  document.querySelector("#user-name").innerText = `${state.Community.name}`;
  document.querySelector(
    "#user-location"
  ).innerText = `${state.Community.location}`;
  document.querySelector(
    "#user-hobbies"
  ).innerText = `${state.Community.hobbies}`;
  document.querySelector(
    "#otherSlide"
  ).src = `${state.Community.hobbyPicture1}`;
  document.querySelector("#instagram").href = `${state.Community.instagram}`;
  document.querySelector("#youtube").href = `${state.Community.youtube}`;
  document.querySelector("#pintrest").href = `${state.Community.pintrest}`;
  document.querySelector("#facebook").href = `${state.Community.facebook}`;
  document.querySelector("#blog-website").href = `${state.Community.otherSite}`;
  document.querySelector(
    "#user-wants"
  ).innerText = `${state.Community.userWants}`;
}

//addRandomUserToState
function addRandomUserToState(randomUser) {
  state.Community.email = randomUser.email;
  state.Community.name = randomUser.name;
  state.Community.location = randomUser.location;
  state.Community.profilePicture = randomUser.profilePicture;
  state.Community.hobbies = randomUser.hobbies;
  state.Community.hobbyPicture1 = randomUser.hobbyPicture1;
  state.Community.hobbyPicture2 = randomUser.hobbyPicture2;
  state.Community.hobbyPicture3 = randomUser.hobbyPicture3;
  state.Community.hobbyPicture4 = randomUser.hobbyPicture4;
  state.Community.instagram = randomUser.instagram;
  state.Community.youtube = randomUser.youtube;
  state.Community.pintrest = randomUser.pintrest;
  state.Community.facebook = randomUser.facebook;
  state.Community.otherSite = randomUser.otherSite;
  state.Community.userWants = randomUser.userWants;
}

//------------------------------------Edit Profile Page-------------------------------------
function editProfile(st) {
  if (st.view === "Edit") {
    document.querySelector("#edit-form").addEventListener("submit", event => {
      event.preventDefault();
      //convert html elements to Array
      let inputList = Array.from(event.target.elements);
      //remove submit button so it's not included
      inputList.pop();
      const inputs = inputList.map(input => input.value);
      let email = inputs[0];
      let name = inputs[1];
      let location = inputs[2];
      let profilePicture = inputs[3];
      let hobbies = inputs[4];
      let hobbyPicture1 = inputs[5];
      let hobbyPicture2 = inputs[6];
      let hobbyPicture3 = inputs[7];
      let hobbyPicture4 = inputs[8];
      let instagram = inputs[9];
      let youtube = inputs[10];
      let pintrest = inputs[11];
      let facebook = inputs[12];
      let otherSite = inputs[13];
      let userWants = inputs[14];

      //editInStateAndDB
      editInStateAndDB(
        email,
        name,
        location,
        profilePicture,
        hobbies,
        hobbyPicture1,
        hobbyPicture2,
        hobbyPicture3,
        hobbyPicture4,
        instagram,
        youtube,
        pintrest,
        facebook,
        otherSite,
        userWants
      );
      render(state.Profile);
      router.navigate("/Profile");
      populateProfile();
    });
  }
}

//edit and update user profile
function editInStateAndDB(
  email,
  name,
  location,
  profilePicture,
  hobbies,
  hobbyPicture1,
  hobbyPicture2,
  hobbyPicture3,
  hobbyPicture4,
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
  state.User.hobbyPicture1 = hobbyPicture1;
  state.User.hobbyPicture2 = hobbyPicture2;
  state.User.hobbyPicture3 = hobbyPicture3;
  state.User.hobbyPicture4 = hobbyPicture4;
  state.User.instagram = instagram;
  state.User.youtube = youtube;
  state.User.pintrest = pintrest;
  state.User.facebook = facebook;
  state.User.otherSite = otherSite;
  state.User.userWants = userWants;

  updateInDB(
    email,
    name,
    location,
    profilePicture,
    hobbies,
    hobbyPicture1,
    hobbyPicture2,
    hobbyPicture3,
    hobbyPicture4,
    instagram,
    youtube,
    pintrest,
    facebook,
    otherSite,
    userWants
  );
}

//update db with changes from profile edit
function updateInDB(
  name,
  location,
  profilePicture,
  hobbies,
  hobbyPicture1,
  hobbyPicture2,
  hobbyPicture3,
  hobbyPicture4,
  instagram,
  youtube,
  pintrest,
  facebook,
  otherSite,
  userWants
) {
  return db
    .collection("users")
    .get()
    .then(snapshot =>
      snapshot.docs.forEach(doc => {
        if (state.Community.email === doc.data().email) {
          let id = doc.id;
          db.collection("users")
            .doc(id)
            .update({
              name: name,
              location: location,
              profilePicture: profilePicture,
              hobbies: hobbies,
              hobbyPicture1: hobbyPicture1,
              hobbyPicture2: hobbyPicture2,
              hobbyPicture3: hobbyPicture3,
              hobbyPicture4: hobbyPicture4,
              instagram: instagram,
              youtube: youtube,
              pintrest: pintrest,
              facebook: facebook,
              otherSite: otherSite,
              userWants: userWants
            });
        }
      })
    );
}

//---------------------------------profile slideshow--------------------------------------------/
//for profile page//
let slideShowIndex = 0;

function slideShow(st) {
  let back = document.querySelector("#back");
  let forward = document.querySelector("#forward");
  if (back.addEventListener) {
    back.addEventListener(
      "click",
      function() {
        processClicks("back", st);
      },
      false
    );
    forward.addEventListener(
      "click",
      function() {
        processClicks("forward", st);
      },
      false
    );
  } else if (back.attachEvent) {
    back.attachEvent("onclick", function() {
      processClicks("back", st);
    });
    forward.attachEvent("onclick", function() {
      processClicks("forward", st);
    });
  }
}

//function to process clicks on profile page slideshow
function processClicks(action) {
  let slideShowImages = [
    `${state.User.hobbyPicture1}`,
    `${state.User.hobbyPicture2}`,
    `${state.User.hobbyPicture3}`,
    `${state.User.hobbyPicture4}`
  ];
  if (action == "back") slideShowIndex -= 1;
  else if (action == "forward") slideShowIndex++;
  if (slideShowIndex < 0 || slideShowIndex > slideShowImages.length - 1)
    slideShowIndex = 0;
  document.querySelector("#slide").src = `${slideShowImages[slideShowIndex]}`;
}

//------------------------for hobbitat page
let otherSlideShowIndex = 0;

function otherSlideShow(st) {
  let back = document.querySelector("#otherBack");
  let forward = document.querySelector("#otherForward");
  if (back.addEventListener) {
    back.addEventListener(
      "click",
      function() {
        otherProcessClicks("back", st);
      },
      false
    );
    forward.addEventListener(
      "click",
      function() {
        otherProcessClicks("forward", st);
      },
      false
    );
  } else if (back.attachEvent) {
    back.attachEvent("onclick", function() {
      otherProcessClicks("back", st);
    });
    forward.attachEvent("onclick", function() {
      otherProcessClicks("forward", st);
    });
  }
}

//function to process clicks on hobbitat page slideshow
function otherProcessClicks(action) {
  let slideShowImages = [
    `${state.Community.hobbyPicture1}`,
    `${state.Community.hobbyPicture2}`,
    `${state.Community.hobbyPicture3}`,
    `${state.Community.hobbyPicture4}`
  ];
  if (action == "back") otherSlideShowIndex -= 1;
  else if (action == "forward") otherSlideShowIndex++;
  if (
    otherSlideShowIndex < 0 ||
    otherSlideShowIndex > slideShowImages.length - 1
  )
    otherSlideShowIndex = 0;
  document.querySelector(
    "#otherSlide"
  ).src = `${slideShowImages[otherSlideShowIndex]}`;
}
