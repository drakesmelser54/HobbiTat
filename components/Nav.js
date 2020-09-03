export default () => `
<nav class="nav-bar">
  <div class="dropdown">
    <button type="button" id="hamburger-btn" class="nav-btns"><i class="fa fa-bars"></i></button>
    <div id="hamburger-dropdown" class="dropdown-content">
      <a href="Profile" id="Profile" data-navigo><i class="fas fa-user"></i>&nbsp&nbsp&nbsp Profile</a>
      <a href="Hobbitat" id="Hobbitat" data-navigo><i class="fas fa-users"></i>&nbsp&nbsp&nbsp View HobbiTat</a>
      <a href="Chatlog" id="ChatLog" data-navigo><i class="fas fa-people-arrows"></i>&nbsp&nbsp&nbsp Chat-Log</a>
      <a href="Schedule"><i class="fas fa-calendar-alt"></i>&nbsp&nbsp&nbsp Scheduled Exchanges</a>
      <a href="Contact" data-navigo><i class="fas fa-phone"></i>&nbsp&nbsp&nbsp Contact Us</a>
      <a href="" id="log-out" data-navigo><i class="fas fa-sign-out-alt"></i>&nbsp&nbsp&nbsp Log-out</a>
    </div>
  </div>
  <div class="hobby-sketches">
    <img src="https://raw.githubusercontent.com/drakesmelser54/HobbiTat/master/Artist%20Sketches/artist-sketch.png" alt="artist sketch">
    <img src="https://raw.githubusercontent.com/drakesmelser54/HobbiTat/master/Artist%20Sketches/construction-sketch.png" alt="construction worker sketch">
    <img src="https://raw.githubusercontent.com/drakesmelser54/HobbiTat/master/Artist%20Sketches/chef-sketch-black.png" alt="chef sketch">
  </div>
  <a href="/Home" class="nav-btns" id="home-btn" data-navigo><i class="fa fa-home"></i></a>
</nav>
`;
