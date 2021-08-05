import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../../context/StateProvider";
import { useHistory, Link } from "react-router-dom";
import "./karyawanCreate.scss";
import axios from "axios";
import Modal from "../../components/modal/Modal";

const KaryawanCreate = () => {
  const history = useHistory();
  const [{ auth }] = useContext(StateContext);
  const [showModal, setShowModal] = useState(false);

  const initialState = {
    nama: "",
    tanggal_lahir: Date.now,
    nip: "",
    jabatan: null,
    jenis_kelamin: 1,
  };
  const [karyawanData, setKaryawanData] = useState(initialState);
  const { nama, jabatan, nip, tanggal_lahir, jenis_kelamin } = karyawanData;
  const [listJabatan, setListJabatan] = useState([]);

  useEffect(() => {
    const getJabatan = async () => {
      try {
        const res = await axios.get("/api/jabatan/", {
          headers: { Authorization: auth.token },
        });
        setListJabatan(res.data.jabatan);
      } catch (error) {
        console.log(error);
      }
    };
    getJabatan();
  }, [auth.token]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setKaryawanData({ ...karyawanData, [name]: value });
  };

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/karyawan/", karyawanData, {
        headers: { Authorization: auth.token },
      });
      console.log(res.data);
      setKaryawanData(initialState);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="karyawanCreate">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Create Karyawan</h3>

        <div className="form-group">
          <label htmlFor="nama">Nama Karyawan</label>
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
          <label htmlFor="tanggal_lahir">Tanggal Lahir Karyawan</label>
          <input
            type="date"
            className="form-control"
            id="tanggal_lahir"
            name="tanggal_lahir"
            onChange={handleChangeInput}
            value={tanggal_lahir}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nip">NIP Karyawan</label>
          <input
            type="text"
            className="form-control"
            id="nip"
            name="nip"
            onChange={handleChangeInput}
            value={nip}
          />
        </div>

        <div className="selectContainer">
          <label htmlFor="jabatan">Pilih Jabatan</label>
          <select
            name="jabatan"
            id="jabatan"
            className="selectGender"
            onChange={handleChangeInput}
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>
            {listJabatan.map((jabatan) => (
              <option key={jabatan.nama} value={jabatan?._id}>
                {jabatan.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="selectWrap">
          <label htmlFor="male">
            Male:{" "}
            <input
              type="radio"
              id="male"
              name="jenis_kelamin"
              value={1}
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="female">
            Female:{" "}
            <input
              type="radio"
              id="female"
              name="jenis_kelamin"
              value={2}
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="other">
            Other:{" "}
            <input
              type="radio"
              id="other"
              name="jenis_kelamin"
              value={3}
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <div className="buttonWrapper">
          <button>
            <Link to="/">cancel</Link>
          </button>
          <button onClick={handleModal} className="submit">
            create
          </button>
          {showModal && (
            <Modal
              text={"menyimpan"}
              setShowModal={setShowModal}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default KaryawanCreate;
