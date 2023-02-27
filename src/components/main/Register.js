import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [namaUser, setNamaUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("register", {
          nama_user: namaUser,
          nama_lengkap_user: namaLengkap,
          email_user: email,
          password_user: password,
        })
        .then(() => {
          navigate("/login");
        });
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  let messageAlert;

  if (message) {
    messageAlert = <p className="pt-3 pb-3 text-center text-sm">{message}</p>;
  }

  let passwordAlert;

  if (confPassword !== password) {
    passwordAlert = (
      <p className="pt-3 pb-1 text-center text-sm text-red-400">
        Password tidak sama
      </p>
    );
  }

  let passwordLengthErr =
    password.length < 8 && password.length > 0 ? (
      <p className="text-center pt-3 pb-1 text-sm text-red-400">
        password minimal 8 kata
      </p>
    ) : null;

  let emailAlert =
    email.length > 0 && !email.includes("@") ? (
      <p className="text-center pt-3 text-sm text-red-400">Email tidak valid</p>
    ) : null;

  return (
    <div className="hero min-h-screen pb-14 overflow-hidden">
      <form onSubmit={handleRegister} className="hero-content">
        <div className="card-body shadow-xl w-[330px] md:w-[450px]">
          <h1 className="text-2xl font-bold mb-4">Register</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="Nama Anda"
              className="input input-bordered"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username Anda"
              className="input input-bordered"
              value={namaUser}
              onChange={(e) => setNamaUser(e.target.value.toLowerCase())}
              required
            />
          </div>
          <div className="form-control">
            {emailAlert ? emailAlert : null}
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
            <div className="form-control">
              {" "}
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Password Anda"
                className="input input-bordered"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
              {messageAlert}
              {passwordAlert ? passwordAlert : passwordLengthErr}
            </div>
            <label className="label">
              <label className="justify-between label-text-alt link link-hover">
                <Link to="/login">Sudah punya akun?</Link>
              </label>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary rounded-lg"
              disabled={
                password !== confPassword
                  ? true
                  : false || (password.length < 8 && password.length > 0)
                  ? true
                  : false || (email.length > 0 && !email.includes("@"))
                  ? true
                  : false
              }
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
