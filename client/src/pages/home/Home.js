import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import { logout } from "../../context/actions/authAction";

const Home = ({ dispatch }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
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
            <Link to="/jabatan">Jabatan</Link>
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
