import React, { createContext, useReducer } from "react";
import auth from "../context/reducers/authReducer";
import alert from "../context/reducers/alertReducer";

function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

export const initialState = {
  auth: {
    token: null,
    user: null,
  },
  alert: {
    email: null,
    loading: false,
    success: null,
    error: null,
  },
};

export const StateContext = createContext();
// Build the provider
export const StateProvider = ({ children }) => {
  return (
    <StateContext.Provider
      value={useReducer(
        combineReducers({
          auth,
          alert,
        }),
        initialState
      )}
    >
      {children}
    </StateContext.Provider>
  );
};
