export default () => `
  <section class="home-page-jumbotron">
    <section class="login-signup-containers">
      <h2>Signup</h2>
      <form id="signup-form" action="" method="POST">
        <input type="email" id="signup-email" name="signup-email" placeholder="Email" required />
        <input type="password" id="signup-password" name="signup-password" placeholder="Password" required />
        <input type="submit" value="Signup">
      </form>
      <a id="already" href="/Login" data-navigo>Already have an account?</a>
    </section>
  </section>
`;
