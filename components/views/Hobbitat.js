export default () => `
<div class="profile-card-aligner">
  <div class="profile-card">
    <section class="upperProfileContainer">
    <div class="upper-left">
      <img id="user-photo" src="" alt="profile picture">
    </div>
    <div class="upper-right">
      <button id="otherBack"><i class="fas fa-chevron-left"></i></button>
      <img id="otherSlide" src="" alt="hobby pictures">
      <button id="otherForward"><i class="fas fa-chevron-right"></i></button>
    </div>
    </section>
    <section class="lowerProfileContainer">
      <div class="leftProfileContainer">
        <div class="name-location-container">
          <h2 id="user-name">Name</h2>
          <h4 id="user-location">Location</h4>
        </div>
        <div class="links">
          <div>
            <a href="" target="_blank" id="instagram"><i class="fab fa-instagram-square"></i></a>
            <a href="" target="_blank" id="youtube"><i class="fab fa-youtube"></i></a>
          </div>
          <div>
            <a href="" target="_blank" id="pintrest"><i class="fab fa-pinterest"></i></a>
            <a href="" target="_blank" id="facebook"><i class="fab fa-facebook"></i></a>
          </div>
          <a href="" target="_blank" id="blog-website">Blog/Website</a>
        </div>
        <div class="edit-profile-container">
          <a href="Profile" data-navigo><i class="fas fa-user"></i></a>
        </div>
      </div>
      <div class="lower-middle-container">
        <div class="hobby-container">
          <h3 class="right-profile-headers">Hobbies</h3>
          <p id="user-hobbies">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="intrests-container">
          <h3 class="right-profile-headers">What Hobbies Intrest Me</h3>
          <p id="user-wants">Stuff</p>
        </div>
      </div>
      <div class="view-container">
        <h3>Next</h3>
        <div id="hobbitat-controls">
          <a href="" id="next"><i class="far fa-arrow-alt-circle-right"></i></a>
          <a href"Chatlog" data-navigo id="chat"><i class="fas fa-people-arrows"></i></a>
        </div>
        <h3>Exchange</h3>
      </div>
    </section>
  </div>
</div>
`;
