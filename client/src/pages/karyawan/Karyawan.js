import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import axios from "axios";
import "./karyawan.scss";

const Karyawan = () => {
  const [{ auth }] = useContext(StateContext);
  const [listKaryawan, setListKaryawan] = useState([]);

  useEffect(() => {
    const getListKaryawan = async () => {
      try {
        const res = await axios.get("/api/karyawan/", {
          headers: { Authorization: auth.token },
        });
        setListKaryawan(res.data.karyawan);
      } catch (error) {
        console.log(error);
      }
    };
    getListKaryawan();
  }, [auth.token]);

  return (
    <div className="jabatan">
      <div className="titleContainer">
        <h1 className="title">List Karyawan</h1>
        <Link to="/karyawanCreate">
          <button className="addButton">Create</button>
        </Link>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="jabatanTabel">
          <thead>
            <tr>
              <th>ID</th>
              <th>nama</th>
              <th>tanggal lahir</th>
              <th>jabatan</th>
              <th>NIP</th>
              <th>jenis kelamin</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {listKaryawan?.map((karyawan, index) => (
              <tr key={index}>
                <td>{karyawan?._id}</td>
                <td>{karyawan?.nama}</td>
                <td>{karyawan?.tanggal_lahir}</td>
                <td>{karyawan?.jabatan}</td>
                <td>{karyawan?.nip}</td>
                <td>{karyawan?.jenis_kelamin}</td>
                <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Link to={`/karyawanEdit/${karyawan?._id}`}>
                    <i className="fas fa-edit" title="Edit"></i>
                  </Link>
                  <Link to={`/modalDeleteKaryawan/${karyawan?._id}`}>
                    <i className="fas fa-trash-alt" title="Remove"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Karyawan;
