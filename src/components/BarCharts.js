import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import _, { mapValues, values, times, max, floor } from "lodash";
import Navigation from "./Navigation";
import { Radio } from "antd";
import {
  getEnergyGenerationValues,
  getRevenueValues,
  copyTexts,
} from "../utils";

const BarCharts = ({ dataByScenarios, dataByLifecycles }) => {
  // InitialValues
  const [viewOption, setViewOption] = useState(copyTexts.scenario);
  const [currentSummary, setCurrentSummary] = useState(null);
  const [scenarioGraphData, setScenarioGraphData] = useState({
    options: {},
    series: [],
  });
  const options = [
    {
      label: copyTexts.scenarios,
      value: copyTexts.scenario,
    },
    {
      label: copyTexts.lifecycles,
      value: copyTexts.lifecycles,
    },
  ];

  const updateGraphData = ({
    series,
    title,
    dataLength,
    stepSize,
    options,
  }) => {
    // Generate Scenario / Lifecycle names based on index since we don't have the data for scenario details for now
    const categories = times(
      dataLength || series[0].data.length,
      (index) => `${viewOption} ${index + 1}`
    );

    if (series.length === 1) series[0].color = "#008FFB";

    setScenarioGraphData({
      series,

      options: {
        title: { margin: 50, text: `${title} by ${viewOption}` || "" },
        xaxis: { categories },
        yaxis: { stepSize: stepSize || floor(max(series[0].data) / 4) },
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        bar: {
          horizontal: false,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
      },
    });
  };

  // PERFORMANCE BY SCENARIO ID
  // Average execution time, Energy output, curtailment and production by Scenario ID
  const energyGenerationByScenario = getEnergyGenerationValues(dataByScenarios);

  // Revenue by Scenario ID
  const revenueByScenario = getRevenueValues(dataByScenarios);

  // PERFORMANCE BY LIFECYCLE ID
  // Energy output, curtailment and production by Lifecycle
  const energyGenerationByLifecycle =
    getEnergyGenerationValues(dataByLifecycles);

  // Revenue by lifecycle
  const revenueByLifecycles = getRevenueValues(dataByLifecycles);

  // Graph updaters
  const getDataValues = (property) => {
    const data =
      viewOption === copyTexts.scenario
        ? energyGenerationByScenario
        : energyGenerationByLifecycle;
    const dataValues = values(
      mapValues(data, (item) => item[property].toFixed(2))
    );

    return dataValues;
  };

  // OnClick Handlers
  const getAverageExecutionTime = () => {
    updateGraphData({
      series: [{ data: getDataValues("average_execution_time") }],
      title: copyTexts.averageExecutionTime,
    });
    setCurrentSummary(copyTexts.averageExecutionTimeKey);
  };

  const getAverageEnergyOutput = () => {
    updateGraphData({
      series: [{ data: getDataValues("average_energy_output") }],
      title: copyTexts.averageEnergyOutput,
    });
    setCurrentSummary("averageEnergyOutput");
  };

  const getAverageEnergyCurtailment = () => {
    updateGraphData({
      series: [{ data: getDataValues("average_energy_curtailment") }],
      title: copyTexts.averageEnergyCurtailment,
    });
    setCurrentSummary("averageEnergyCurtailment");
  };

  const getAverageEnergyProduction = () => {
    updateGraphData({
      series: [{ data: getDataValues("average_energy_production") }],
      title: copyTexts.averageEnergyProduction,
    });
    setCurrentSummary("averageEnergyProduction");
  };

  const getTotaleEnergyOutput = () => {
    updateGraphData({
      series: [{ data: getDataValues("total_energy_output") }],
      title: copyTexts.totalEnergyOutput,
    });
    setCurrentSummary("totalEnergyOutput");
  };

  const getTotalEnergyCurtailment = () => {
    updateGraphData({
      series: [{ data: getDataValues("total_energy_curtailment") }],
      title: copyTexts.totalEnergyCurtailment,
    });
    setCurrentSummary("totalEnergyCurtailment");
  };

  const getTotalEnergyProduction = () => {
    updateGraphData({
      series: [{ data: getDataValues("total_energy_production") }],
      title: copyTexts.totalEnergyProduction,
    });
    setCurrentSummary("totalEnergyProduction");
  };

  const getAverageRevenue = () => {
    updateGraphData({
      series: [{ data: getDataValues("average_revenue") }],
      title: copyTexts.averageRevenue,
    });
    setCurrentSummary("averageRevenue");
  };

  const getTotalRevenue = () => {
    updateGraphData({
      series: [{ data: getDataValues("total_revenue") }],
      title: copyTexts.totalRevenue,
    });
    setCurrentSummary("totalRevenue");
  };

  const getEnergySummaryValues = () => {
    const dataValues = [
      {
        name: "Energy Curtailment",
        data: getDataValues("average_energy_curtailment"),
        color: "#FFACAD",
      },
      {
        name: "Energy Output",
        data: getDataValues("average_energy_output"),
        color: "#008FFB",
      },
    ];

    updateGraphData({
      series: dataValues,
      title: copyTexts.energySummary,
      dataLength: dataValues[0].length,
      stepSize: floor(max(dataValues[1].data) / 4),
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
        },
      },
    });
    setCurrentSummary(null);
  };

  const onViewOptionClick = ({ target: { value } }) => {
    setViewOption(value);
  };

  useEffect(() => {
    getEnergySummaryValues();
  }, []);

  useEffect(() => {
    switch (currentSummary) {
      case copyTexts.averageExecutionTimeKey:
        getAverageExecutionTime();
        break;
      case copyTexts.averageEnergyOutputKey:
        getAverageEnergyOutput();
        break;
      case copyTexts.averageEnergyCurtailmentKey:
        getAverageEnergyCurtailment();
        break;
      case copyTexts.averageEnergyProductionKey:
        getAverageEnergyProduction();
        break;
      case copyTexts.averageRevenueKey:
        getAverageRevenue();
        break;
      case copyTexts.totalEnergyOutputKey:
        getTotaleEnergyOutput();
        break;
      case copyTexts.totalEnergyCurtailmentKey:
        getTotalEnergyCurtailment();
        break;
      case copyTexts.totalEnergyProductionKey:
        getTotalEnergyProduction();
        break;
      case copyTexts.totalRevenueKey:
        getTotalRevenue();
        break;

      default:
        getEnergySummaryValues();
        break;
    }
  }, [viewOption]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "7rem",
            height: 600,
            alignContent: "center",
            gap: "1rem",
          }}
        >
          <h4>Summaries By Scenario & Lifecycle</h4>

          <Navigation
            onClickAverageExecutionTime={getAverageExecutionTime}
            onClickAverageEnergyOutput={getAverageEnergyOutput}
            onClickAverageEnergyCurtailment={getAverageEnergyCurtailment}
            onClickAverageEnergyProduction={getAverageEnergyProduction}
            onClickTotalEnergyOutput={getTotaleEnergyOutput}
            onClickTotalEnergyCurtailment={getTotalEnergyCurtailment}
            onClickTotalEnergyProduction={getTotalEnergyProduction}
            onClickAverageRevenue={getAverageRevenue}
            onClickTotalRevenue={getTotalRevenue}
            onClickEnergySummary={getEnergySummaryValues}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "8rem",
            marginTop: "1rem",
            gap: "2rem",
            height: 600,
            alignContent: "center",
          }}
        >
          <Radio.Group
            options={options}
            onChange={onViewOptionClick}
            value={viewOption}
            defaultValue={viewOption}
            optionType="button"
            buttonStyle="solid"
          />
          <Chart
            type="bar"
            width={1000}
            height={600}
            series={scenarioGraphData?.series}
            options={scenarioGraphData?.options}
          />
        </div>
      </div>
    </>
  );
};

export default BarCharts;
