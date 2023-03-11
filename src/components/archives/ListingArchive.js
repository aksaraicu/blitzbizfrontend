import ReactPaginate from "react-paginate";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListingArchive = () => {
  const [data, setData] = useState([]);
  const [halaman, setHalaman] = useState(0);
  const [limit] = useState(10);
  const [totalHalaman, setTotalHalaman] = useState(0);
  const [totalBaris, setTotalBaris] = useState(0);
  const [kataKunci, setKataKunci] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);

  const getMe = async () => {
    try {
      const res = await axios.get("me");
      setStatus(res.data.bb_user_datum.peran_user);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const getData = async () => {
    const res = await axios.get(
      `listings?cari=${kataKunci}&halaman=${halaman}&limit=${limit}`
    );
    setData(res.data.hasil);
    setTotalHalaman(res.data.totalHalaman);
    setTotalBaris(res.data.totalBaris);
  };

  const findData = (event) => {
    event.preventDefault();
    setHalaman(0);
    setKataKunci(search);
  };

  const deleteListing = async (id) => {
    await axios.delete(`listings/${id}`);
    getData();
  };

  useEffect(() => {
    getMe();
    getData();
  }, [halaman, kataKunci]);

  const gantiHalaman = ({ selected }) => {
    setHalaman(selected);
  };

  const renderedData = data.map((item) => {
    console.log(item);
    return (
      <div key={item.id}>
        <div className="card w-full bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={item.link_gambar_listing}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{item.nama_listing}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: item.deskripsi_listing.substring(0, 50),
              }}
            ></div>
            <div className="card-actions">
              <Link to={`/listings/${item.id}`}>
                <button className="btn btn-primary btn-md rounded-lg">
                  Lihat
                </button>
              </Link>
              <Link to={`edit-listing/${item.id}`}>
                <button className="btn btn-primary btn-md rounded-lg">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteListing(item.id)}
                className="btn btn-primary btn-md rounded-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <Link to="/post-listing" className="btn rounded-lg">
        TAMBAH LISTING
      </Link>
      <form className="my-3" onSubmit={findData}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Post/Listing"
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-[#000] font-medium rounded-lg text-sm px-4 py-2"
          >
            Cari
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-7 pt-2">
        {renderedData}
      </div>
      <div className="alert alert-info shadow-lg my-4 bg-[#000]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-white flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-white">
            Total baris: {totalBaris}. Halaman: {totalBaris ? halaman + 1 : 0}{" "}
            dari {totalHalaman}.
          </span>
        </div>
      </div>
      <nav key={totalBaris} className="mb-5">
        <ReactPaginate
          previousLabel={"«"}
          nextLabel={"»"}
          pageCount={totalHalaman}
          onPageChange={gantiHalaman}
          containerClassName={"btn-group flex items-center justify-center"}
          pageLinkClassName={""}
          activeClassName={"btn-active"}
          pageClassName={"btn"}
          disabledLinkClassName={"btn-disabled"}
          previousClassName={"btn"}
          nextClassName={"btn"}
        />
      </nav>
    </div>
  );
};

export default ListingArchive;
