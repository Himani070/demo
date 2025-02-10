import React from "react";
import PredictResults from "../components/PredictResults";
import StatusLegend from "../components/StatusLegend";
import PredictionTable from "../components/PredictionTable";
import "../styles/global.css";

const Home = () => {
  return (
    <div className="home-container">
      <PredictResults/>
      <PredictionTable />
      <StatusLegend />
    </div>
  );
};

export default Home;
