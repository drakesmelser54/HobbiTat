export default () => `
  <section class="home-page-jumbotron">
    <div class="login-signup-containers">
      <h2>Sign-Up</h2>
      <form action="" method="post">
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <input type="password" id="password" placeholder="Confirm Password">
        <button type="submit" id="signup-to-create"><a href="/ProfileForm" data-navigo>Signup</a></button>
      </form>
      <a id="already" href="/Login" data-navigo>Already have an account?</a>
    </div>
  </section>
`;
