import { JABATAN_TYPES } from "../globalTypes";

const jabatanReducer = (state, action) => {
  switch (action.type) {
    case JABATAN_TYPES.LOADING_JABATAN:
      return {
        ...state,
        loading: action.payload,
      };
    case JABATAN_TYPES.CREATE_JABATAN:
      return {
        ...state,
        jabatan: [action.payload, ...state.jabatan],
      };
    case JABATAN_TYPES.GET_JABATANS:
      return {
        ...state,
        jabatan: [action.payload, ...state.jabatan],
      };
    case JABATAN_TYPES.UPDATE_JABATAN:
      return {
        ...state,
        jabatan: [action.payload, ...state.jabatan],
      };
    case JABATAN_TYPES.DELETE_JABATAN:
      return {
        ...state,
        jabatan: [action.payload, ...state.jabatan],
      };
    default:
      return state;
  }
};

export default jabatanReducer;
