import "./App.css";

import { useState, useEffect } from "react";
import { groupBy, values } from "lodash";
import BarCharts from "./components/BarCharts";
import Table from "./components/Table";
import PieChart from "./components/PieChart";
import { Spin } from "antd";

function App() {
  const [dataByScenarios, setDataByScenarios] = useState();
  const [dataByLifecycles, setDataByLifecycles] = useState();
  const [dataByStorageOptions, setDataByStorageOptions] = useState();
  const [dataValues, setDataValues] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/data/consolidated_results.json")
      .then((response) => response.json())
      .then((data) => {
        setDataByScenarios(groupBy(data, "scenario_id"));
        setDataByLifecycles(groupBy(data, "lifecycle_id"));
        setDataByStorageOptions(
          groupBy(data, "project_structure_config.Storage.type")
        );
        setDataValues(values(data));
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

          <PieChart dataByStorageOptions={dataByStorageOptions} />

          <Table
            dataValues={dataValues}
            dataByScenarios={dataByScenarios}
            dataByLifecycle={dataByLifecycles}
            dataByStorageOptions={dataByStorageOptions}
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
