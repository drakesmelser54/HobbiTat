export default () => `
      <form id="edit-form" action="" method="POST" class="forms">
        <h2>Edit Profile</h2>
        <label for="email">Enter your user-email</label>
        <input type="email" id="signup-email" name="signup-email" placeholder="email" required />
        <label for="name">What's your name?</label>
        <input type="text" id="name" name="user" placeholder="Name">
        <label for="userLocation">Where are you from?</label>
        <input type="text" id="userLocation" name="user_location" placeholder="City/Town">
        <label for="userPic">Add a profile picture</label>
        <input id="userPic" name="user_pic" type="text" placeholder="Enter Your Photo URL">
        <h2>Tell us about your hobbies!</h2>
        <label for="userHobbies">What hobbies can you share?</label>
        <textarea id="userHobbies" name="user_hobbies" max-length="100" placeholder="Hobbies go here!"></textarea>
        <h2>Share some pictures that showcase your hobby!</h2>
        <input id="hobbyPicture1" name="hobbyPicture1" type="text" placeholder="Enter Your Photo URL">
        <input id="hobbyPicture2" name="hobbyPicture2" type="text" placeholder="Enter Your Photo URL">
        <input id="hobbyPicture3" name="hobbyPicture3" type="text" placeholder="Enter Your Photo URL">
        <input id="hobbyPicture4" name="hobbyPicture4" type="text" placeholder="Enter Your Photo URL">
        <h2>Share links that showcase your hobby!</h2>
        <input type="text" id="instagram" name="instagram" placeholder="Instagram Profile Link">
        <input type="text" id="youtube" name="youtube" placeholder="Youtube Profile Link">
        <input type="text" id="pintrest" name="pintrest" placeholder="Pintrest Profile Link">
        <input type="text" id="facebook" name="facebook" placeholder="Facebook Profile Link">
        <input type="text" id="blog-website" name="blog-website" placeholder="Blog/Website Link">
        <h2>What hobbies are you looking to learn/exchange?</h2>
        <textarea id="userWants" name="user_wants" max-length="100" placeholder="Enter hobbies you want to learn/exchange here"></textarea>
        <input type="submit" value="Edit">
      </form>
`;
