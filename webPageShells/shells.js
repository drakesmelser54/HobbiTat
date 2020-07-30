/*Toggle between hiding and showing hamburger drop down when clicked*/
document.getElementById("hamburger-btn").addEventListener("click", function() {
  document.getElementById("hamburger-dropdown").classList.toggle("show");
});

/*Array of Artist Sketches*/
const artistSketches = [
  {
    url:
      "https://raw.githubusercontent.com/drakesmelser54/HobbiTat/master/Artist%20Sketches/artist%20white.png",
    title: "chef sketch"
  }
];
/*Populate artist sketches for nav bar*/
const navBarSketches = document.querySelector(".hobbySketches");
artistSketches.forEach(pic => {
  let img = document.createElement("img");
  img.src = pic.url;
  img.alt = pic.title;
  navBarSketches.appendChild(img);
});
