import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [halaman, setHalaman] = useState(0);
  const [limit] = useState(5);
  const [totalHalaman, setTotalHalaman] = useState(0);
  const [totalBaris, setTotalBaris] = useState(0);
  const [kataKunci, setKataKunci] = useState("");
  const [query, setQuery] = useState("");

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/users?cari=${kataKunci}&halaman=${halaman}&limit=${limit}`
    );

    setUsers(response.data.hasil);
    setHalaman(response.data.halaman);
    setTotalHalaman(response.data.totalHalaman);
    setTotalBaris(response.data.totalBaris);
  };

  const hapusUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const gantiHalaman = ({ selected }) => {
    setHalaman(selected);
  };

  const cariData = (e) => {
    e.preventDefault();
    setHalaman(0);
    setKataKunci(query);
  };

  useEffect(() => {
    getUsers();
  }, [halaman, kataKunci]);

  console.log(users);

  return (
    <>
      <div className="container">
        <Link to="/tambah-user" className="btn">
          Tambah User
        </Link>

        <form className="my-3" onSubmit={cariData}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Cari
          </label>
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul/kategori"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-[#000] font-medium rounded-lg text-sm px-4 py-2"
            >
              Cari
            </button>
          </div>
        </form>

        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="!relative">ID</th>
                <th className="sticky left-0">Detil</th>
                <th>Nama</th>
                <th>Verifikasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className="sticky left-0 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.link_gambar_user}
                            alt={user.nama_lengkap_user}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.nama_user}</div>
                        <div className="text-sm opacity-50">
                          {user.peran_user}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.nama_lengkap_user}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user.email_user}
                    </span>
                  </td>
                  <td>{user?.bb_user_datum?.verifikasi_user}</td>
                  <th>
                    <Link
                      to={`/edit-user/${user.id}`}
                      className="btn btn-alt btn-xs mr-1"
                    >
                      edit
                    </Link>
                    <button
                      className="btn btn-error btn-xs text-white"
                      onClick={() => hapusUser(user.id)}
                    >
                      hapus
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th className="!relative">ID</th>
                <th className="sticky left-0">Detil</th>
                <th>Nama</th>
                <th>Verifikasi</th>
                <th>Aksi</th>
              </tr>
            </tfoot>
          </table>
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

        <nav key={totalBaris} className="mb-10">
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
    </>
  );
};

export default UserList;
