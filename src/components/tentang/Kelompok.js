import React from "react";

const Kelompok = () => {
  return (
    <section className="container py-10">
      <h2 className="text-3xl font-bold pb-10 text-center">Anggota Kelompok</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body px-10">
            <h2 className="card-title">Muhammad Fachrul Hasan</h2>
            <p>
              Author is an active freelancer at Arasa Corporation and Head of
              Digital at Muara. Even before his college years, he had always
              been eager to learn all things related to the development of
              intelligence using the science of computers.
            </p>
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-xl">
          {/* <figure className="px-10 pt-10">
            <img
              src="https://media.licdn.com/dms/image/D5603AQG11sNLcqFyXQ/profile-displayphoto-shrink_800_800/0/1664949471155?e=1680739200&v=beta&t=VgaJGFhAGrX49eH7wnHft48BwECbVJ-X2EiZUGoYVGw"
              alt="Rahman Nurudin"
              className="rounded-full"
            />
          </figure> */}
          <div className="card-body px-10">
            <h2 className="card-title">Rahman Nurudin</h2>
            <p>
              Majoring in Informatic Engineering and plan to graduate in 2025.
              Currently holding a 3.88 GPA, and has already acquired strong
              knowledge about HTML,CSS,Javascript and currently studying ReactJS
            </p>
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body px-10">
            <h2 className="card-title">Muhammad Arya Kurniawan</h2>
            <p>
              Hanyalah pekerja bersepeda bercita menjadi petani dan guru yang
              ingin masuk dalam sabda Rasulullah SAW: Sebaik-baik kalian adalah
              orang yg paling banyak memberi manfaat bagi orang lain.
            </p>
          </div>
        </div>

        {/* <div className="card bg-base-100 shadow-xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          <figure className="p-10">
            <img
              src="https://media.licdn.com/dms/image/D5603AQHIXKgqZb7Nuw/profile-displayphoto-shrink_800_800/0/1673030371470?e=1680739200&v=beta&t=e8jiN6wDBn4MLyrdfo0X7Q0Cg0tpEJd9NpLP9Az0LY8"
              alt="Muhammad Fachrul Hasan"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center px-10 self-center">
            <h2 className="card-title">Muhammad Fachrul Hasan</h2>
            <p>
              Author is an active freelancer at Arasa Corporation and Head of
              Digital at Muara. Even before his college years, he had always
              been eager to learn all things related to the development of
              intelligence using the science of computers.{" "}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          <figure className="p-10">
            <img
              src="https://media.licdn.com/dms/image/D5603AQG11sNLcqFyXQ/profile-displayphoto-shrink_800_800/0/1664949471155?e=1680739200&v=beta&t=VgaJGFhAGrX49eH7wnHft48BwECbVJ-X2EiZUGoYVGw"
              alt="Rahman Nurudin"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center px-10 self-center">
            <h2 className="card-title">Rahman Nurudin</h2>
            <p>
              Majoring in Informatic Engineering and plan to graduate in 2025.
              Currently holding a 3.88 GPA, and has already acquired strong
              knowledge about HTML,CSS,Javascript and currently studying ReactJS
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Kelompok;
