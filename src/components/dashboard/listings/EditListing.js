import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";

const EditListing = () => {
  const [gambar, setGambar] = useState("");
  const [preview, setPreview] = useState("");
  const [details, setDetails] = useState({
    nama_listing: "",
    slogan_listing: "",
    link_website_listing: "",
    link_kontak_listing: "",
    link_youtube_listing: "",
    deskripsi_listing: "",
  });

  const [number, setNumber] = useState({
    hasil_perbulan_listing: 0,
    pengeluaran_perbulan_listing: 0,
    total_pengunjung_listing: 0,
    pengguna_aktif_listing: 0,
    harga_listing: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchPostById = async () => {
    const res = await axios.get(`http://localhost:5000/listings/${id}`);
    console.log(res.data);
    setDetails((prev) => {
      return {
        ...prev,
        nama_listing: res.data.nama_listing,
        slogan_listing: res.data.slogan_listing,
        link_website_listing: res.data.bb_listing_link.link_website_listing,
        link_kontak_listing: res.data.bb_listing_link.link_kontak_listing,
        link_youtube_listing: res.data.bb_listing_link.link_youtube_listing,
        deskripsi_listing: res.data.deskripsi_listing,
      };
    });
    setNumber((prev) => {
      return {
        ...prev,
        hasil_perbulan_listing:
          res.data.bb_listing_datum.hasil_perbulan_listing,
        pengeluaran_perbulan_listing:
          res.data.bb_listing_datum.hasil_perbulan_listing,
        total_pengunjung_listing:
          res.data.bb_listing_datum.total_pengunjung_listing,
        pengguna_aktif_listing:
          res.data.bb_listing_datum.pengguna_aktif_listing,
        harga_listing: res.data.harga_listing,
      };
    });
    setGambar(res.data.gambar_listing);
    setPreview(res.data.link_gambar_listing);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    setNumber((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImage = (e) => {
    const objectGambar = e.target.files[0];
    setGambar(objectGambar);
    setPreview(URL.createObjectURL(objectGambar));
  };

  const editPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_listing", details.nama_listing);
    formData.append("slogan_listing", details.slogan_listing);
    formData.append("link_website_listing", details.link_website_listing);
    formData.append("link_kontak_listing", details.link_kontak_listing);
    formData.append("link_youtube_listing", details.link_youtube_listing);
    formData.append("deskripsi_listing", details.deskripsi_listing);
    formData.append("gambar_listing", gambar);
    formData.append("hasil_perbulan_listing", number.hasil_perbulan_listing);
    formData.append(
      "pengeluaran_perbulan_listing",
      number.pengeluaran_perbulan_listing
    );
    formData.append(
      "total_pengunjung_listing",
      number.total_pengunjung_listing
    );
    formData.append("pengguna_aktif_listing", number.pengguna_aktif_listing);
    formData.append("harga_listing", number.harga_listing);

    try {
      await axios.patch(`http://localhost:5000/listings/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/listings-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, []);

  return (
    <div className="flex flex-wrap entry-content basis-full sm:basis-full md:basis-full lg:basis-4/5 h-fit w-full">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body pt-0">
          <form onSubmit={editPost}>
            <button
              className="btn btn-sm rounded-lg hover:bg-white hover:text-black"
              onClick={() => navigate(-1)}
            >
              Kembali
            </button>
            <h1 className="text-4xl font-bold leading-10 pb-5 w-full pt-2">
              Form Penjualan
            </h1>
            <p className="excerpt pb-5 w-full">
              Tulis detil listing bisnis Anda pada form dibawah ini dengan
              lengkap untuk mulai menjual!
            </p>
            <div className="form-control w-full">
              <h2 className="text-xl font-bold  mb-5">Informasi Umum</h2>
              <label className="label">
                <span className="label-text">Nama bisnis</span>
              </label>
              <label className="input-group basis-1/2">
                <input
                  type="text"
                  placeholder="BlitzBiz"
                  className="input input-bordered w-full"
                  onChange={handleChangeInput}
                  name="nama_listing"
                  value={details.nama_listing || ""}
                />
              </label>
              <label className="label">
                <span className="label-text">Slogan/Deskripsi singkat</span>
              </label>
              <label className="input-group basis-1/2">
                <input
                  type="text"
                  placeholder="Marketplace dan konsultasi bisnis"
                  className="input input-bordered w-full"
                  onChange={handleChangeInput}
                  name="slogan_listing"
                  value={details.slogan_listing || ""}
                />
              </label>
              <label className="label">
                <span className="label-text">Link website</span>
              </label>
              <label className="input-group">
                <input
                  type="url"
                  placeholder="https://blitzbiz.id"
                  className="input input-bordered w-full"
                  onChange={handleChangeInput}
                  name="link_website_listing"
                  value={details.link_website_listing || ""}
                />
              </label>
              <label className="label">
                <span className="label-text">Link kontak</span>
              </label>
              <label className="input-group">
                <input
                  type="url"
                  placeholder="https://blitzbiz.id/contact"
                  className="input input-bordered w-full"
                  onChange={handleChangeInput}
                  name="link_kontak_listing"
                  value={details.link_kontak_listing || ""}
                />
              </label>
              <label className="label">
                <span className="label-text">Harga</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder={200000}
                  className="input input-bordered w-full"
                  onChange={handleNumberInput}
                  name="harga_listing"
                  value={number.harga_listing}
                />
              </label>
              <div>
                <label className="label">
                  <span className="label-text">Deskripsi</span>
                </label>
                <DefaultEditor
                  value={details.deskripsi_listing}
                  onChange={handleChangeInput}
                  name="deskripsi_listing"
                />
              </div>
              <label className="label">
                <span className="label-text">Gambar bisnis</span>
              </label>
              <label className="input-group">
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImage}
                />
              </label>
              {preview ? (
                <div className="mockup-window border border-base-300 mt-4 w-full max-w-xs">
                  <figure className="flex justify-center border-t border-base-300">
                    <img src={preview} alt="Gambar preview" />
                  </figure>
                </div>
              ) : (
                ""
              )}
              <h2 className="text-xl font-bold mt-10 mb-5">Metriks</h2>
              <label className="label">
                <span className="label-text">Hasil perbulan</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder={200000}
                  className="input input-bordered w-full"
                  onChange={handleNumberInput}
                  name="hasil_perbulan_listing"
                  value={number.hasil_perbulan_listing}
                />
              </label>
              <label className="label">
                <span className="label-text">Pengeluaran perbulan</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder={200000}
                  className="input input-bordered w-full"
                  onChange={handleNumberInput}
                  name="pengeluaran_perbulan_listing"
                  value={number.pengeluaran_perbulan_listing}
                />
              </label>
              <label className="label">
                <span className="label-text">Total pengunjung</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder={200000}
                  className="input input-bordered w-full"
                  onChange={handleNumberInput}
                  name="total_pengunjung_listing"
                  value={number.total_pengunjung_listing}
                />
              </label>
              <label className="label">
                <span className="label-text">Pengguna aktif</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder={200000}
                  className="input input-bordered w-full"
                  onChange={handleNumberInput}
                  name="pengguna_aktif_listing"
                  value={number.pengguna_aktif_listing}
                />
              </label>
              <h2 className="text-xl font-bold mt-10 mb-5">Opsional</h2>
              <label className="label">
                <span className="label-text">Link video demo (YouTube)</span>
              </label>
              <label className="input-group">
                <input
                  type="url"
                  placeholder="https://youtube.com/watch"
                  className="input input-bordered w-full"
                  onChange={handleChangeInput}
                  name="link_youtube_listing"
                  value={details.link_youtube_listing || ""}
                />
              </label>
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn mt-5 rounded-lg hover:bg-white hover:text-black"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditListing;
