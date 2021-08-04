import "./app.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import { useContext, useEffect } from "react";

import { refreshToken } from "./context/actions/authAction";
import { StateContext } from "./context/StateProvider";
import { GLOBALTYPES } from "./context/globalTypes";

import PrivateRouter from "./router/PrivateRouter";
import PageRender from "./router/PageRender";

import Notify from "./components/alert/Notify";
import { getJabatan } from "./context/actions/jabatanAction";
import { getKaryawan } from "./context/actions/karyawanAction";

function App() {
  const [{ auth }, dispatch] = useContext(StateContext);
  useEffect(() => {
    refreshToken(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      getKaryawan(auth.token, dispatch);
      getJabatan(auth.token, dispatch);
    }
  }, [dispatch, auth.token]);
  return (
    <Router>
      <Notify></Notify>
      <div className="app">
        <div className="main">
          {/* {auth.token && <Header />} */}

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          <PrivateRouter exact path="/:page">
            <PageRender auth={auth}></PageRender>
          </PrivateRouter>
          <PrivateRouter exact path="/:page/:id">
            <PageRender auth={auth}></PageRender>
          </PrivateRouter>
        </div>
      </div>
    </Router>
  );
}

export default App;
