import ReactPaginate from "react-paginate";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListingPost = () => {
  const [data, setData] = useState([]);
  const [halaman, setHalaman] = useState(0);
  const [limit] = useState(10);
  const [totalHalaman, setTotalHalaman] = useState(0);
  const [totalBaris, setTotalBaris] = useState(0);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/listings?halaman=${halaman}&limit=${limit}`
    );
    console.log(res.data.hasil);
    setData(res.data.hasil);
    setTotalHalaman(res.data.totalHalaman);
    setTotalBaris(res.data.totalBaris);
  };

  useEffect(() => {
    getData();
  }, [halaman]);

  const gantiHalaman = ({ selected }) => {
    setHalaman(selected);
  };

  const renderedData = data.map((item) => {
    return (
      <div key={item.id}>
        <div className="flex flex-col flex-wrap lg:flex-nowrap lg:flex-row bg-base-100 shadow-xl">
          <div className="h-max-400 lg:w-1/2">
            <img
              src={item.link_gambar_listing}
              alt="product"
              className="object-center h-full"
            />
          </div>
          <div className="card-body lg:w-1/2">
            <h2 className="card-title">{item.nama_listing}</h2>
            <div>
              {item.slogan_listing}
            </div>
            <div className="card-actions justify-end">
              <p className="text-xl">
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp"
                  value={item.harga_listing}
                  displayType={"text"}
                />
              </p>
              <Link to={`/listings/${item.id}`}>
                <button className="btn btn-primary rounded-lg hover:bg-white hover:text-black">
                  VIEW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="overflow-hidden container">
      <h2 className="font-medium text-lg mb-[30px] text-center">
        Telusuri yang sedang dijual
      </h2>
      <div className="grid grid-cols-1 gap-5 pb-5">{renderedData}</div>
      <nav key={totalBaris} className="mb-10 mt-3">
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

export default ListingPost;
