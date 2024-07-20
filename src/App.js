import "./App.css";

import { useState, useEffect } from "react";
import { groupBy } from "lodash";
import BarCharts from "./component/BarCharts";
import { Spin } from "antd";

function App() {
  const [dataByScenarios, setDataByScenarios] = useState();
  const [dataByLifecycles, setDataByLifecycles] = useState();
  const [dataByStorageOptions, setDataByStorageOptions] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/data/consolidated_results.json")
      .then((response) => response.json())
      .then((data) => {
        setDataByScenarios(groupBy(data, "scenario_id"));
        setDataByLifecycles(groupBy(data, "lifecycle_id"));
        setDataByStorageOptions(
          groupBy(data, "project_structure_config.Storage.type")
        );
      });
  }, []);

  return (
    <div className="App">
      {dataByScenarios && dataByLifecycles && dataByStorageOptions ? (
        <>
          <BarCharts
            dataByScenarios={dataByScenarios}
            dataByLifecycles={dataByLifecycles}
          />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
          className="spinner"
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default App;
