export default links => `
<nav class="nav-bar">
  <div class="dropdown">
    <button type="button" id="hamburger-btn" class="nav-btns"><i class="fa fa-bars"></i></button>
    <div id="hamburger-dropdown" class="dropdown-content">
      ${links
        .map(link => `<a href="/${link}" data-navigo>${link}</a>`)
        .join("")}
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
