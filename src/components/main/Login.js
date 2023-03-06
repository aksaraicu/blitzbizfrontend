import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("login", {
        email_user: email,
        password_user: password,
      });
      window.localStorage.setItem("token", res.data.accessToken);
      navigate("/");
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div className="hero min-h-screen">
      <form onSubmit={handleLogin} className="hero-content">
        <div className="card-body shadow-xl w-[340px] md:w-[450px]">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {message}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Anda"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password Anda"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">
              <a href="/forgot-password" className="label-text-alt link link-hover">
                Lupa password?
              </a>
              <Link to={"/register"}>
                <label className="justify-between label-text-alt link link-hover">
                  Register
                </label>
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary rounded-lg">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
