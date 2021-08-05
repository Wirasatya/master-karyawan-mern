import "./app.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Jabatan from "./pages/jabatan/Jabatan";
import JabatanCreate from "./pages/jabatanCreate/JabatanCreate";
import JabatanEdit from "./pages/jabatanEdit/JabatanEdit";
import Login from "./pages/login/Login";
import ModalDeleteJabatan from "./pages/modalDelete/ModalDeleteJabatan";
import ModalDeleteKaryawan from "./pages/modalDelete/ModalDeleteKaryawan";
import Karyawan from "./pages/karyawan/Karyawan";

import { useContext, useEffect } from "react";

import { refreshToken } from "./context/actions/authAction";
import { StateContext } from "./context/StateProvider";

import Notify from "./components/alert/Notify";
import KaryawanCreate from "./pages/karyawanCreate/KaryawanCreate";
import KaryawanEdit from "./pages/karyawanEdit/KaryawanEdit";

function App() {
  const [{ auth }, dispatch] = useContext(StateContext);
  useEffect(() => {
    refreshToken(dispatch);
  }, [dispatch]);
  return (
    <Router>
      <Notify></Notify>
      <div className="app">
        <div className="main">
          <Switch>
            <Route
              exact
              path="/"
              dispatch={dispatch}
              component={auth.token ? Home : Login}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/jabatan" component={Jabatan} />
            <Route exact path="/jabatanCreate" component={JabatanCreate} />
            <Route exact path="/jabatanEdit/:id" component={JabatanEdit} />
            <Route
              exact
              path="/modalDeleteJabatan/:id"
              component={ModalDeleteJabatan}
            />
            <Route
              exact
              path="/modalDeleteKaryawan/:id"
              component={ModalDeleteKaryawan}
            />
            <Route exact path="/karyawan" component={Karyawan} />
            <Route exact path="/karyawanCreate" component={KaryawanCreate} />
            <Route exact path="/karyawanEdit/:id" component={KaryawanEdit} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
