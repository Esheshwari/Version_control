import React, { useState, useEffect } from "react";
import { useAuth } from "../../authContext";
import { authAPI } from "../../api";

import { PageHeader } from "@primer/react/drafts";
import { Box, Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState("email"); // 'email' or 'username'
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const loginPayload = {
        password: password,
      };
      
      if (loginMode === "email") {
        loginPayload.email = identifier;
      } else {
        loginPayload.username = identifier;
      }

      const res = await authAPI.login(loginPayload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>
        <div className="login-box">
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
              <label style={{ flex: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="radio"
                  name="loginMode"
                  value="email"
                  checked={loginMode === "email"}
                  onChange={(e) => {
                    setLoginMode(e.target.value);
                    setIdentifier("");
                  }}
                />
                Email
              </label>
              <label style={{ flex: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="radio"
                  name="loginMode"
                  value="username"
                  checked={loginMode === "username"}
                  onChange={(e) => {
                    setLoginMode(e.target.value);
                    setIdentifier("");
                  }}
                />
                Username
              </label>
            </div>
            <label className="label">
              {loginMode === "email" ? "Email address" : "Username"}
            </label>
            <input
              autoComplete="off"
              name="Identifier"
              id="Identifier"
              className="input"
              type={loginMode === "email" ? "email" : "text"}
              placeholder={loginMode === "email" ? "your@email.com" : "your-username"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;