import { GLOBALTYPES, JABATAN_TYPES } from "../globalTypes";
import axios from "axios";

export const createJabatan = async ({ auth, data }, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.post("/api/jabatan", data, {
      headers: { Authorization: auth.token },
    });
    console.log("jabatan baru", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: JABATAN_TYPES.CREATE_JABATAN,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updateJabatan = async ({ auth, data, id }, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.patch(`/api/jabatan/update/${id}`, data, {
      headers: { Authorization: auth.token },
    });
    console.log("update data jabatan", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: JABATAN_TYPES.UPDATE_JABATAN,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const deleteJabatan = async ({ auth, id }, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.patch(`/api/jabatan/delete/${id}`, {
      headers: { Authorization: auth.token },
    });
    console.log("delete data jabatan", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: JABATAN_TYPES.DELETE_JABATAN,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const getJabatan = async (auth, dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.get(`/api/jabatan/`, {
      headers: { Authorization: auth },
    });
    console.log("get data jabatan", res.data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    dispatch({
      type: JABATAN_TYPES.GET_JABATANS,
      payload: { ...res.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
