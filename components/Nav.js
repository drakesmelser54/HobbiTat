export default links => `
<nav class="nav-bar">
  <div class="dropdown">
    <button type="button" id="hamburger-btn" class="nav-btns"><i class="fa fa-bars" style="font-size: 28px; color: white"></i></button>
    <div id="hamburger-dropdown" class="dropdown-content">
      ${links.map(link => `<a href="#">${link}</a>`).join("")}
    </div>
  </div>
  <div class="hobbySketches"></div>
  <button type="button" class="nav-btns"><i class="fa fa-home" style="font-size: 28px; color: white"></i></button>
</nav>
`;
