import { Routes, Route } from "react-router-dom";

import IplDashboardApp from "./components/home/home";

import "./App.css";
import TeamMatches from "./components/teamMatches";
import NotFound from "./components/notfound";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<IplDashboardApp />} />
        <Route exact path="/team-matches/:id" element={<TeamMatches />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
