export default () => `
  <form action="url" method="post" class="create-profile-forms">
    <h2>Tell us about your hobbies!</h2>
    <label for="userHobbies">What hobbies can you share?</label>
    <textarea id="userHobbies" name="user_hobbies" max-length="100" placeholder="Hobbies go here!"></textarea>
    <label for="userLinks">Share some links to your work!</label>
    <textarea id="userLinks" name="user_links" max-length="100" placeholder="Links to your hobbies go here!"></textarea>
    <button type="submit">Create Profile</button>
  </form>
`;
