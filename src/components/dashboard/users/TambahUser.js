import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const TambahPost = () => {
  const [nama_lengkap_user, setName] = useState("");
  const [nama_user, setUserName] = useState("");
  const [email_user, setEmail] = useState("");
  const [password_user, setPassword] = useState("");
  const [peran_user, setPeran] = useState("Pengguna");
  const [verifikasi_user, setVerifikasi] = useState("Belum Terverifikasi");
  const [gambar_user, setGambar] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const loadImage = (e) => {
    const gambar_user = e.target.files[0];
    setGambar(gambar_user);
    setPreview(URL.createObjectURL(gambar_user));
  };

  const tambahUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_lengkap_user", nama_lengkap_user);
    formData.append("nama_user", nama_user);
    formData.append("email_user", email_user);
    formData.append("password_user", password_user);
    formData.append("peran_user", peran_user);
    formData.append("gambar_user", gambar_user);
    formData.append("verifikasi_user", verifikasi_user);

    try {
      await axios.post("http://localhost:5000/users", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <Link to="/users" className="btn">
          Kembali
        </Link>

        <form onSubmit={tambahUser} className="mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="Nama Anda"
              className="input input-bordered"
              value={nama_lengkap_user}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Anda"
              className="input input-bordered"
              value={email_user}
              onChange={(e) => setEmail(e.target.value)}
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
              value={nama_user}
              onChange={(e) => setUserName(e.target.value)}
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
              value={password_user}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <hr className="my-4"></hr>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Peran</span>
            </label>
            <select
              type="text"
              placeholder="Pengguna/Admin"
              className="select select-bordered w-full"
              value={peran_user}
              onChange={(e) => setPeran(e.target.value)}
            >
              <option>Pengguna</option>
              <option>Kontributor</option>
              <option>Admin</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Verifikasi</span>
            </label>
            <select
              type="text"
              placeholder="Verifikasi/Belum terverifikasi"
              className="select select-bordered w-full"
              value={verifikasi_user}
              onChange={(e) => setVerifikasi(e.target.value)}
            >
              <option>Belum terverifikasi</option>
              <option>Pending verifikasi</option>
              <option>Terverifikasi</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Pilih gambar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={loadImage}
            />
          </div>

          {preview ? (
            <div className="mockup-window border border-base-300 mt-4 w-full max-w-xs">
              <figure className="flex justify-center border-t border-base-300">
                <img src={preview} alt="Gambar preview" />
              </figure>
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="btn my-4">
            Simpan
          </button>
        </form>
      </div>
    </>
  );
};

export default TambahPost;
