import React from "react";
import PredictionResults from "../components/PredictionResults";
import PredictionTable from "../components/PredictionTable";
import StatusLegend from "../components/StatusLegend";

function Prediction() {
  return (
    <div className="content">
      <PredictionResults />
      <PredictionTable />
      <StatusLegend />
    </div>
  );
}

export default Prediction;

