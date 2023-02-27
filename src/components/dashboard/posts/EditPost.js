import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";

const EditPost = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const getMe = async () => {
    try {
      const res = await axios.get("me");
      setStatus(res.data.bb_user_datum.peran_user);
      console.log(res.data.bb_user_datum.peran_user);
      return res.data;
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const getPostById = async () => {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    setJudul(response.data.judul);
    setIsi(response.data.isi);
    setKategori(response.data.kategori);
    setGambar(response.data.gambar);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const gambar = e.target.files[0];
    setGambar(gambar);
    setPreview(URL.createObjectURL(gambar));
  };

  const editPost = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("kategori", kategori);
    formData.append("isi", isi);
    formData.append("gambar", gambar);

    try {
      await axios.patch(`http://localhost:5000/posts/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          authorization: `Bearer ${window.localStorage.token}`,
        },
      });
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getMe().then((res) => {
      if (res.bb_user_datum.peran_user !== "Admin") {
        navigate("/");
      }
    });
    getPostById();
  }, [status]);

  console.log(status);

  return (
    <>
      <div className="container">
        <Link to="/posts" className="btn">
          Kembali
        </Link>
        <form onSubmit={editPost}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Judul</span>
            </label>
            <input
              type="text"
              placeholder="Judul post"
              className="w-full input input-bordered"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Kategori</span>
            </label>
            <input
              type="text"
              placeholder="Isi kategori"
              className="w-full input input-bordered"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Isi</span>
            </label>
            <DefaultEditor
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
            />
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
            {loading ? "Loading..." : "Simpan"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
