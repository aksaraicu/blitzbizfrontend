import React, { useState, useEffect } from "react";
import Metamask from "../metamask/Metamask";
import axios from "axios";

const Dashboard = () => {
  const [nama,setNama] = useState("");
  const [email,setEmail] = useState("");

  const getMe = async () => {
    try {
      const res = await axios.get("me");
      setNama(res.data.nama_user);
      setEmail(res.data.email_user);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="container mb-10">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Welcome back, {nama}</h2>
          <p className="w-full">{email}</p>
          <Metamask />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
