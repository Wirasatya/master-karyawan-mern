import { KARYAWAN_TYPES } from "../globalTypes";

const karyawanReducer = (state, action) => {
  switch (action.type) {
    case KARYAWAN_TYPES.LOADING_KARYAWAN:
      return {
        ...state,
        loading: action.payload,
      };
    case KARYAWAN_TYPES.CREATE_KARYAWAN:
      return {
        ...state,
        karyawan: [action.payload, ...state.karyawan],
      };
    case KARYAWAN_TYPES.GET_KARYAWANS:
      return {
        ...state,
        karyawan: [action.payload, ...state.karyawan],
      };
    case KARYAWAN_TYPES.UPDATE_KARYAWAN:
      return {
        ...state,
        karyawan: [action.payload, ...state.karyawan],
      };
    case KARYAWAN_TYPES.DELETE_KARYAWAN:
      return {
        ...state,
        karyawan: [action.payload, ...state.karyawan],
      };
    default:
      return state;
  }
};

export default karyawanReducer;
