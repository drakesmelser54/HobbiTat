export default () => `
<div class="profile-card-aligner">
  <div class="profile-card">
    <section class="upperProfileContainer">
    <div class="upper-left">
      <img id="user-photo" src="" alt="profile picture">
    </div>
    <div class="upper-right">
      <button id="back"><i class="fas fa-chevron-left"></i></button>
      <img id="slide" src="" alt="hobby pictures">
      <button id="forward"><i class="fas fa-chevron-right"></i></button>
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
          <a href="/Edit" id="edit-profile"><i class="fas fa-user-edit"></i></a>
          <a href="Schedule" data-navigo><i class="fas fa-calendar-alt"></i></a>
          <a href="/Home" id="log-out"><i class="fas fa-sign-out-alt"></i></a>
        </div>
      </div>
      <div class="lower-middle-container">
        <div class="hobby-container">
          <h3 class="right-profile-headers">Hobbies</h3>
          <p id="user-hobbies">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="interests-container">
          <h3 class="right-profile-headers">What Hobbies Interest Me</h3>
          <p id="user-wants">Stuff</p>
        </div>
      </div>
      <div class="view-container">
        <i id="users-button" class="fas fa-users"></i>
        <a href="Hobbitat" class="hobbitat-button" id="view-hobbitat" data-navigo>View Community</a>
      </div>
    </section>
  </div>
</div>
`;
