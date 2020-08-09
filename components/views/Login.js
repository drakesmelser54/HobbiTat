export default () => `
<section class="home-page-jumbotron">
  <div class="login-signup-containers">
    <h2>Login</h2>
    <form>
      <input type="text" id="username" placeholder="type username here">
      <input type="password" id="password" placeholder="type password here">
      <button type="submit">Login</button>
    </form>
    <a id="dont-have" href="/Signup" data-navigo>Don't have an account?</a>
  </div>
</section>
`;
