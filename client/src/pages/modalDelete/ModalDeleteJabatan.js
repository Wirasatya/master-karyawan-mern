import React, { useContext } from "react";
import "./modalDelete.scss";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../../context/StateProvider";

const ModalDeleteJabatan = () => {
  const [{ auth }] = useContext(StateContext);
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = async (id) => {
    try {
      const res = await axios.put(
        `/api/jabatan/delete/`,
        { id },
        {
          headers: { Authorization: auth.token },
        }
      );
      history.replace("/jabatan");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal">
      <div className="modalWrapper">
        <p>anda yakin delete data ini</p>
        <div className="buttonWrapper">
          <button onClick={() => history.replace("/jabatan")}>tidak</button>
          <button onClick={() => handleSubmit(id)}>ya</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteJabatan;
