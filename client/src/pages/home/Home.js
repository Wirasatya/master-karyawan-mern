import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const handleLogout = (e) => {
    e.preventDefault();
  };
  return (
    <div className="home">
      <div className="contentWrapper">
        <h2 className="textTitle">Selamat Datang di Karyawan Master</h2>
        <div className="buttonWrapper">
          <button className="buttonLink">
            <Link to="/karyawan">Karyawan</Link>
          </button>
          <button className="buttonLink">
            <Link to="/karyawan">Jabatan</Link>
          </button>
          <button onClick={handleLogout} className="buttonLink">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
