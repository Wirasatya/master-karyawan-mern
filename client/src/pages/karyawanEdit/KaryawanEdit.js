import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../../context/StateProvider";
import { useHistory, Link, useParams } from "react-router-dom";
import "./karyawanEdit.scss";
import axios from "axios";
import Modal from "../../components/modal/Modal";

const KaryawanEdit = () => {
  const history = useHistory();
  const [{ auth }] = useContext(StateContext);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const initialState = {
    nama: "",
    tanggal_lahir: Date.now,
    nip: "",
    jabatan: "",
    jenis_kelamin: 1,
  };
  const [karyawanData, setKaryawanData] = useState(initialState);
  const { nama, nip, tanggal_lahir } = karyawanData;
  const [listJabatan, setListJabatan] = useState([]);

  useEffect(() => {
    const getDataKaryawan = async () => {
      try {
        const res = await axios.get("/api/karyawan/" + id, {
          headers: { Authorization: auth.token },
        });
        setKaryawanData(res.data.karyawan);
      } catch (error) {}
    };
    getDataKaryawan();
  }, [id, auth.token]);

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
      const res = await axios.patch(
        "/api/karyawan/update/" + id,
        karyawanData,
        {
          headers: { Authorization: auth.token },
        }
      );
      console.log(res.data);
      setKaryawanData(initialState);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="karyawanEdit">
      <form onSubmit={handleSubmit}>
        <h3 className="title">Edit Karyawan</h3>

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
              <option key={jabatan.nama} value={jabatan._id}>
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

export default KaryawanEdit;
