import Chart from "react-apexcharts";
import { getEnergyGenerationValues, getRevenueValues } from "../utils";
import { values, keys } from "lodash";

const PieChart = ({ dataByStorageOptions }) => {
  // IMPACT OF STORAGE
  // Energy output, curtailment and production by Storage options
  const energyGenerationByStorage =
    getEnergyGenerationValues(dataByStorageOptions);

  // Revenue by Storage Options
  const revenueByStorage = getRevenueValues(dataByStorageOptions);

  const revenueValues = values(revenueByStorage).map(
    (storage) => storage.total_revenue
  );

  const auroraTotalEnergyOutput =
    dataByStorageOptions["AURORA"].total_energy_output;
  const auroraTotalEnergyCurtailemnt =
    dataByStorageOptions["AURORA"].total_energy_curtailment;

  const noStorageTotalEnergyOutput =
    dataByStorageOptions["No Storage"].total_energy_output;
  const noStorageTotalEnergyCurtailemnt =
    dataByStorageOptions["No Storage"].total_energy_curtailment;
  return (
    <div
      style={{
        marginTop: "10rem",
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAFAFA",
          width: 700,
        }}
      >
        <h5 style={{ paddingLeft: "2rem", marginTop: "2rem" }}>
          Total Revenues by Storage
        </h5>
        <Chart
          options={{
            labels: keys(revenueByStorage),
          }}
          series={revenueValues}
          type="pie"
          width="500"
          style={{ paddingLeft: "8rem", marginTop: "2rem" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#FAFAFA",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            backgroundColor: "#FAFAFA",
            height: 250,
          }}
        >
          <h5 style={{ paddingLeft: "2rem", marginTop: "2rem" }}>
            AURORA Total Energy Output & Curtailment
          </h5>
          <Chart
            options={{
              labels: ["AURORA - Energy Output", "AURORA - Energy Curtailment"],
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 90,
                  offsetY: 10,
                },
              },
            }}
            series={[auroraTotalEnergyOutput, auroraTotalEnergyCurtailemnt]}
            type="donut"
            width="600"
            height="250"
            style={{
              paddingLeft: "1rem",
              paddingRight: "3rem",
              paddingTop: "0.5rem",
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: "#FAFAFA",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            backgroundColor: "#FAFAFA",
            height: 250,
          }}
        >
          <h5 style={{ paddingLeft: "2rem", marginTop: "2rem" }}>
            No Storage Total Energy Output & Curtailment
          </h5>
          <Chart
            options={{
              labels: [
                "No Storage - Energy Output",
                "No Storage - Energy Curtailment",
              ],
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 90,
                  offsetY: 10,
                },
              },
            }}
            series={[
              noStorageTotalEnergyOutput,
              noStorageTotalEnergyCurtailemnt,
            ]}
            type="donut"
            width="600"
            height="250"
            style={{
              paddingLeft: "1rem",
              paddingRight: "3rem",
              paddingTop: "0.5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
