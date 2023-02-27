import { useState } from "react";
import axios from "axios";

const LupaPassword = () => {
  const [email, setEmail] = useState("");
  const [allert, setAllert] = useState("");
  const [error, setError] = useState("");
  
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setError('')
  }


  const kirimResetEmail = (e) => {
    e.preventDefault();
    if(!email) {
      setError ('Email dibutuhkan untuk mengirim link reset')
    } else {
      axios.put('http://localhost:5000/forgotpassword', {email:email})
      .then(res => { 
        setEmail('')
        setAllert('Link Reset Email telah dikirim ke email anda')
        setTimeout(() =>{
          setAllert('')
        }, 3000)
      })
    }
  }

  return (
    <div className="hero min-h-screen">
      <form onSubmit={kirimResetEmail} className="hero-content">
        <div className="card-body shadow-xl w-[340px] md:w-[450px]">
          <h1 className="text-2xl font-bold mb-4">Forgot Password </h1>
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
            <input
              type="email"
              placeholder="Masukan Email Anda"
              className="input input-bordered"
              value={email}
              onChange={handleEmail}
            />
          </div>
         
          <div className="form-control mt-6">
            <button className="btn btn-primary rounded-lg">Reset Password</button>
          </div>
        </div>
      </form>
    </div>
  );
};



export default LupaPassword;
