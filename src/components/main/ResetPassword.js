import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  
  const [allert, setAllert] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const {token} = useParams()
  // console.log(token)
  const SavePassword = (e) => {
    e.preventDefault();
    const data = {
      password: password,
      token: token,
    }
     axios.put('http://localhost:5000/resetpassword', data)
      .then(res => {
        setPassword('')
        setConfPassword('')
        setAllert('Pasword telah diperbaharui')
        setTimeout(() =>{
          setAllert('')
        }, 3000)

      }).catch(error => {
        setError(error.response.data.message)
      });
   
  }
  
  let passwordAlert;
  if (confPassword !== password) {
    passwordAlert = (
      <div className="alert alert-error shadow-lg mt-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Password Tidak Sama.</span>
      </div>
    </div>
    );
  }

  let passwordLengthErr =
    password.length < 8 && password.length > 0 ? (
      <div className="alert alert-error shadow-lg mt-4">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Password minimal 8 karakter.</span>
      </div>
    </div>
    ) : null;

  return (
    <div className="hero min-h-screen">
      <form className="hero-content">
        <div className="card-body shadow-xl w-[340px] md:w-[450px]">
          <h1 className="text-2xl font-bold mb-4">Masukan Password Baru
          </h1>
              {
                allert && (
                  <div className="alert alert-success shadow-lg mt-4">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{allert}</span>
                    </div>
                  </div>
                )
              }
              {
                error && (
                  <div className="alert alert-error shadow-lg mt-4">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )
              }
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password baru</span>
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
              {passwordAlert ? passwordAlert : passwordLengthErr}
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary rounded-lg" onClick={SavePassword} >Save New Password</button>
          </div>
        </div>
      </form>
    </div>
  );
};


export default ResetPassword;
