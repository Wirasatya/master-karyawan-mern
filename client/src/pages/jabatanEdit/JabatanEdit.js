import React, { useState, useContext } from "react";
import { StateContext } from "../../context/StateProvider";
import { useHistory, Link, useParams } from "react-router-dom";
import "./jabatanEdit.scss";
import axios from "axios";
import Modal from "../../components/modal/Modal";

const JabatanEdit = () => {
  const history = useHistory();
  const [{ auth }] = useContext(StateContext);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const initialState = {
    nama: "",
    kode: "",
  };
  const [jabatanData, setJabatanData] = useState(initialState);
  const { nama, kode } = jabatanData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setJabatanData({ ...jabatanData, [name]: value });
  };

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/jabatan/update/" + id, jabatanData, {
        headers: { Authorization: auth.token },
      });
      setJabatanData(initialState);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="jabatanEdit">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Edit Jabatan</h3>

        <div className="form-group">
          <label htmlFor="nama">Nama Jabatan</label>
          <input
            type="text"
            className="form-control"
            id="nama"
            name="nama"
            onChange={handleChangeInput}
            value={nama}
          />
        </div>

        <div className="form-group">
          <label htmlFor="kode">Kode Jabatan</label>
          <input
            type="text"
            className="form-control"
            id="kode"
            name="kode"
            onChange={handleChangeInput}
            value={kode}
          />
        </div>
        <div className="buttonWrapper">
          <button>
            <Link to="/">cancel</Link>
          </button>
          <button onClick={handleModal} className="submit">
            edit
          </button>
          {showModal && (
            <Modal
              text={"mengedit"}
              setShowModal={setShowModal}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default JabatanEdit;
