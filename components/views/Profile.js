export default () => `
<div class="profile-card-aligner">
  <div class="profile-card">
    <section class="upperProfileContainer">
      <img id="user-photo" src="https://raw.githubusercontent.com/drakesmelser54/HobbiTat/master/Images/oceanPhoto.png" alt="profile picture">
    </section>
    <section class="lowerProfileContainer">
      <div class="leftProfileContainer">
        <div class="name-location-container">
          <h2 id="user-name">Name</h2>
          <h4 id="user-location">Location</h4>
        </div>
        <div class="links">
          <a href="" target="_blank" id="instagram"><i class="fab fa-instagram-square"></i></a>
          <a href="" target="_blank" id="youtube"><i class="fab fa-youtube"></i></a>
          <a href="" target="_blank" id="pintrest"><i class="fab fa-pinterest"></i></a>
          <a href="" target="_blank" id="facebook"><i class="fab fa-facebook"></i></a>
          <a href="" target="_blank" id="blog-website">Blog/Website</a>
        </div>
        <div class="edit-profile-container">
          <a href=""><i class="fas fa-user-edit"></i></a>
          <a href="/Home" id="log-out">Log-out</a>
        </div>
      </div>
      <div class="rightProfileContainer">
        <div class="hobbies-containers">
          <h3 class="right-profile-headers">Hobbies</h3>
          <p id="user-hobbies">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="hobbies-containers">
          <h3 class="right-profile-headers">What Hobbies Intrest Me</h3>
          <p id="user-wants">Stuff</p>
        </div>
      </div>
      <div class="view-container">
        <a href="/HobbiTat" id="view-hobbitat">View HobbiTat</a>
      </div>
    </section>
  </div>
</div>
`;
