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
        <div class="edit-profile-container">
          <a href=""><i class="fas fa-user-edit"></i></a>
          <a href="/Home" id="log-out">Log-out</a>
        </div>
      </div>
      <div class="rightProfileContainer">
        <h3>Hobbies</h3>
        <p id="user-hobbies">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <h3>Project Links</h3>
        <p id="user-links">Lorem ipsum dolor sit amet.</p>
      </div>
    </section>
  </div>
</div>
`;
