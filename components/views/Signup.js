export default () => `
  <section class="login-signup-containers">
    <h2>Sign-Up</h2>
      <form action="/url" method="post">
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <input type="password" id="password" placeholder="Confirm Password">
        <button type="submit">Signup</button>
      </form>
    <p>Already have an account?</p>
  </section>
`;
