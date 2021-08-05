import React, { useContext } from "react";
import "./modalDelete.scss";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../../context/StateProvider";

const ModalDeleteKaryawan = () => {
  const [{ auth }] = useContext(StateContext);
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = async (id) => {
    try {
      const res = await axios.patch(
        `/api/karyawan/delete`,
        { id },
        {
          headers: { Authorization: auth.token },
        }
      );
      history.replace("/karyawan");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal">
      <div className="modalWrapper">
        <p>anda yakin delete data ini</p>
        <div className="buttonWrapper">
          <button onClick={() => history.replace("/karyawan")}>tidak</button>
          <button onClick={() => handleSubmit(id)}>ya</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteKaryawan;
