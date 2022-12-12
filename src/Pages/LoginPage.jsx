import "./LoginPage.css";
import React from "react";

function LoginPage() {
  return (
    <div className="LoginPage--Container">
      <h1>Login</h1>
      <form action="/login" method="POST" className="LoginPage--Form">
        <div className="LoginPage--InputPair">
          <label for="userName">Username</label>
          <input type="userName" id="userName" name="userName" required />
        </div>
        <div className="LoginPage--InputPair">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/register">Register</a>
    </div>
  );
}

export default LoginPage;
