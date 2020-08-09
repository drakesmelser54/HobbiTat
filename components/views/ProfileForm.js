export default () => `
<form action="" method="post" class="create-profile-forms">
  <h2>Tell us about yourself!</h2>
  <label for="name">What's your name?</label>
  <input type="text" id="name" name="user" placeholder="Name">
  <label for="userLocation">Where are you from?</label>
  <input type="text" id="userLocation" name="user_location" placeholder="City/Town">
  <label for="userPic">Add a profile picture</label>
  <input id="userPic" name="user_pic" type="text" placeholder="Enter Your Photo URL">
  <h2>Tell us about your hobbies!</h2>
  <label for="userHobbies">What hobbies can you share?</label>
  <textarea id="userHobbies" name="user_hobbies" max-length="100" placeholder="Hobbies go here!"></textarea>
  <label for="userLinks">Share some links to your work!</label>
  <textarea id="userLinks" name="user_links" max-length="100" placeholder="Links to your hobbies go here!"></textarea>
  <button type="submit">Create Profile</button>
</form>
`;
