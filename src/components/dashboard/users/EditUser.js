import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditUser = () => {
  const [nama_lengkap_user, setName] = useState("");
  const [nama_user, setUserName] = useState("");
  const [email_user, setEmail] = useState("");
  const [password_user, setPassword] = useState("");
  const [peran_user, setPeran] = useState("Pengguna");
  const [verifikasi_user, setVerifikasi] = useState("Belum Terverifikasi");
  const [gambar_user, setGambar] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.nama_lengkap_user);
    setUserName(response.data.nama_user);
    setEmail(response.data.email_user);
    setPassword(response.data.password_user);
    setPeran(response.data.bb_user_datum.peran_user);
    setVerifikasi(response.data.bb_user_datum.verifikasi_user);
    setGambar(response.data.gambar_user);
    setPreview(response.data.link_gambar_user);
  };

  const loadImage = (e) => {
    const gambar_user = e.target.files[0];
    setGambar(gambar_user);
    setPreview(URL.createObjectURL(gambar_user));
  };

  const editUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_lengkap_user", nama_lengkap_user);
    formData.append("nama_user", nama_user);
    formData.append("email_user", email_user);
    formData.append("password_user", password_user);
    formData.append("peran_user", peran_user);
    formData.append("gambar_user", gambar_user);
    formData.append("verifikasi_user", verifikasi_user);

    console.log(formData);

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          authorization: `Bearer ${window.localStorage.token}`,
        },
      });
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <div className="container">
        <Link to="/users" className="btn">
          Kembali
        </Link>
        <form onSubmit={editUser} className="mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="Nama Anda"
              className="input input-bordered"
              defaultValue={nama_lengkap_user}
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
              defaultValue={email_user}
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
              defaultValue={nama_user}
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
              defaultValue={password_user}
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
              <option value="Pengguna">Pengguna</option>
              <option value="Kontributor">Kontributor</option>
              <option value="Admin">Admin</option>
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
              <option value="Belum terverifikasi">Belum terverifikasi</option>
              <option value="Pending verifikasi">Pending verifikasi</option>
              <option value="Terverifikasi">Terverifikasi</option>
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

export default EditUser;
