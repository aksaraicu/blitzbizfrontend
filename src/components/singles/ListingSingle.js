import axios from "axios";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const ListingSingle = () => {
  const [listing, setListing] = useState(null);
  const [convert, setConvert] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;

  const fetchDataById = async () => {
    try {
      const res = await axios.get(`/listings/${id}`);
      const resETH = await axios.get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=IDR"
      );
      console.log(res.data);
      setListing(res.data);
      const converted = res.data.harga_listing / resETH.data.ETH.IDR;
      setConvert(converted);
    } catch (err) {
      console.log(err);
    }
  };

  const sendTransaction = async () => {
    const res = await axios.get(`/listings/${id}`);
    const resETH = await axios.get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=IDR"
    );

    const converted = res.data.harga_listing / resETH.data.ETH.IDR;

    let params = [
      {
        from: window.ethereum.selectedAddress,
        to: "0x4044278750C4C098494775f56A4078a9c06450f9",
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
        value: Number(converted * 1000000000000000000).toString(16),
      },
    ];

    await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //

  useEffect(() => {
    fetchDataById();
  }, []);

  return (
    <section className="flex container content mb-12">
      {listing && (
        <div className="flex flex-row gap-10 flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap">
          <div className="flex flex-wrap entry-content basis-full sm:basis-full md:basis-full lg:basis-3/5">
            <button
              className="btn btn-sm rounded-lg hover:bg-white hover:text-black"
              onClick={() => navigate(-1)}
            >
              Kembali
            </button>
            <h1 className="text-4xl font-bold leading-10 pb-5 w-full pt-2">
              {listing.nama_listing}
            </h1>
            <p className="excerpt pb-5 w-full">{listing.slogan_listing}</p>
            <div className="featured-image flex w-full flex-wrap">
              <img
                src={listing.link_gambar_listing}
                alt={listing.nama_listing}
              />
            </div>
            <div className="flex w-full my-3 flex-row gap-3 flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap">
              <div className="flex w-full basis-full">
                <div className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-sm">Hasil perbulan</h2>
                    <p>
                      <NumericFormat
                        value={listing.bb_listing_datum.hasil_perbulan_listing}
                        prefix="Rp"
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType={"text"}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full basis-full">
                <div className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-sm">Pengeluaran perbulan</h2>
                    <p>
                      <NumericFormat
                        value={
                          listing.bb_listing_datum.pengeluaran_perbulan_listing
                        }
                        prefix="Rp"
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType={"text"}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full basis-full">
                <div className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-sm">Total pengunjung</h2>
                    <p>
                      <NumericFormat
                        value={
                          listing.bb_listing_datum.total_pengunjung_listing
                        }
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType={"text"}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full basis-full">
                <div className="card w-full bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-sm">Pengguna aktif</h2>
                    <p>
                      <NumericFormat
                        value={listing.bb_listing_datum.pengguna_aktif_listing}
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType={"text"}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-black w-full mt-7"></div>
            <div className="description">
              <h2 className="text-xl font-bold mt-7 mb-5">Deskripsi</h2>
              <div
                className="my-10"
                dangerouslySetInnerHTML={{
                  __html: listing.deskripsi_listing,
                }}
              ></div>
            </div>
          </div>
          <aside className="flex basis-full sm:basis-full md:basis-full lg:basis-2/5 h-fit sticky top-5">
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-3xl font-bold text-center">
                  <NumericFormat
                    value={listing.harga_listing}
                    prefix="Rp"
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType={"text"}
                  />
                </h2>
                <p>ETH: {convert}</p>
                <div className="card-actions py-5">
                  <form className="w-full" onSubmit={sendTransaction}>
                    <button
                      className="btn btn-info w-full"
                      type="submit"
                      value="Send"
                    >
                      Purchase with Metamask
                    </button>
                  </form>
                  <a
                    href={listing.bb_listing_link.link_kontak_listing}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary w-full"
                  >
                    Kontak penjual
                  </a>
                  <a
                    href={listing.bb_listing_link.link_website_listing}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-secondary w-full"
                  >
                    Lihat company profile
                  </a>
                </div>
                <hr className="my-3" />
                <h2 className="text-xl font-bold mb-5">Video demo</h2>
                <ReactPlayer
                  url={listing.bb_listing_link.link_youtube_listing}
                  width="auto"
                />
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default ListingSingle;
