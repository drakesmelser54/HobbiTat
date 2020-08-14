export default () => `
  <section class="home-page-jumbotron">
    <div class="login-signup-containers">
      <h2>Sign-Up</h2>
      <form id="signup-form" >
        <input type="email" id="signup-email" name="signup-email" placeholder="Email" required />
        <input type="password" id="signup-password" name="signup-password" placeholder="Password" required />
        <input type="submit">
      </form>
      <a id="already" href="/Login" data-navigo>Already have an account?</a>
    </div>
  </section>
`;
