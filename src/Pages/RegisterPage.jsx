import "./LoginPage.css";
import React from "react";

function LoginPage() {
  return (
    <div className="LoginPage--Container">
      <h1>Register</h1>
      <form action="/register" method="POST" className="LoginPage--Form">
        <div className="LoginPage--InputPair">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="LoginPage--InputPair">
          <label htmlFor="userName">Username</label>
          <input type="userName" id="userName" name="userName" required />
        </div>
        <div className="LoginPage--InputPair">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <a href="/login">Login</a>
    </div>
  );
}

export default LoginPage;
