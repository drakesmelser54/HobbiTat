export default () => `
  <form action="url" method="post" class="create-profile-forms">
    <h2>Tell us about yourself!</h2>
    <label for="name">What's your name?</label>
    <input type="text" id="name" name="user" placeholder="Name">
    <label for="userLocation">Where are you from?</label>
    <input type="text" id="userLocation" name="user_location" placeholder="City/Town">
    <label for="userPic">Add a profile picture</label>
    <input id="userPic" name="user_pic" type="text" placeholder="Enter Your Photo URL">
    <button type="submit">Finish Creating Profile</button>
  </form>
`;
