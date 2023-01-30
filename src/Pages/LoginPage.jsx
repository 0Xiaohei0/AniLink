import "./LoginPage.css";
import React from "react";

function LoginPage() {
  return (
    <div className="LoginPage--Container">
      {/* <h1>Login</h1>
      <form action="/login" method="POST" className="LoginPage--Form">
        <div className="LoginPage--InputPair">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="LoginPage--InputPair">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/register">Register</a> */}
      <div id="signInDiv"></div>
    </div>
  );
}

export default LoginPage;
