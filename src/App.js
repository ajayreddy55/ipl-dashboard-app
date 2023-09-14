import { Routes, Route } from "react-router-dom";

import IplDashboardApp from "./components/home/home";

import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<IplDashboardApp />} />
      </Routes>
    </>
  );
};

export default App;
