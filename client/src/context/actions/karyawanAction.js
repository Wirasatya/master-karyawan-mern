import { GLOBALTYPES, KARYAWAN_TYPES } from "../globalTypes";
import axios from "axios";

export const createKaryawan = async ({ auth, data }, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.post("/api/karyawan", data, {
      headers: { Authorization: auth.token },
    });
    console.log("karyawan baru", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: KARYAWAN_TYPES.CREATE_KARYAWAN,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updateKaryawan = async ({ auth, data, id }, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.patch(`/api/karyawan/update/${id}`, data, {
      headers: { Authorization: auth.token },
    });
    console.log("update data karyawan", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: KARYAWAN_TYPES.UPDATE_KARYAWAN,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const deleteKaryawan = async ({ auth, id }, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.patch(`/api/karyawan/delete/${id}`, {
      headers: { Authorization: auth.token },
    });
    console.log("delete data karyawan", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: KARYAWAN_TYPES.DELETE_KARYAWAN,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const getKaryawan = async (auth, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.get(`/api/karyawan/`, {
      headers: { Authorization: auth },
    });
    console.log("get data karyawan", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: KARYAWAN_TYPES.GET_KARYAWANS,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
