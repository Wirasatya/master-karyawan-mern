import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import axios from "axios";
import "./jabatan.scss";
import Modal from "../../components/modal/Modal";

const Jabatan = () => {
  const [{ auth }] = useContext(StateContext);
  const [listJabatan, setListJabatan] = useState([]);

  useEffect(() => {
    const getListJabatan = async () => {
      try {
        const res = await axios.get("/api/jabatan/", {
          headers: { Authorization: auth.token },
        });
        setListJabatan(res.data.jabatan);
      } catch (error) {
        console.log(error);
      }
    };
    getListJabatan();
  }, [auth.token]);

  return (
    <div className="jabatan">
      <div className="titleContainer">
        <h1 className="title">List Jabatan</h1>
        <Link to="/jabatanCreate">
          <button className="addButton">Create</button>
        </Link>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="jabatanTabel">
          <thead>
            <tr>
              <th>ID</th>
              <th>nama</th>
              <th>kode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listJabatan?.map((jabatan, index) => (
              <tr key={index}>
                <td>{jabatan?._id}</td>
                <td>{jabatan?.nama}</td>
                <td>{jabatan?.kode}</td>
                <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Link to={`/jabatanEdit/${jabatan?._id}`}>
                    <i className="fas fa-edit" title="Edit"></i>
                  </Link>
                  <Link to={`/modalDeleteJabatan/${jabatan?._id}`}>
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

export default Jabatan;
