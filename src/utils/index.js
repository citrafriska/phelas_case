import _, { uniq, uniqWith, reduce, forEach } from "lodash";

export const copyTexts = {
  scenarios: "Scenarios",
  scenario: "Scenario",
  lifecycle: "Lifecycle",
  lifecycles: "Lifecycles",
  energySummary: "Energy Summary",
  averageExecutionTime: "Average Execution Time",
  averageEnergyOutput: "Average Energy Output",
  averageEnergyCurtailment: "Average Energy Curtailment",
  averageEnergyProduction: "Average Energy Production",
  totalEnergyOutput: "Total Energy Output",
  totalEnergyCurtailment: "Total Energy Curtailment",
  totalEnergyProduction: "Total Energy Production",
  revenueSummary: "Revenue Summary",
  averageRevenue: "Average Revenue",
  totalRevenue: "Total Revenue",
  averageExecutionTimeKey: "averageExecutionTime",
  averageEnergyOutputKey: "averageEnergyOutput",
  averageEnergyCurtailmentKey: "averageEnergyCurtailment",
  averageEnergyProductionKey: "averageEnergyProduction",
  totalEnergyOutputKey: "totalEnergyOutput",
  totalEnergyCurtailmentKey: "totalEnergyCurtailment",
  totalEnergyProductionKey: "totalEnergyProduction",
  averageRevenueKey: "averageRevenue",
  totalRevenueKey: "totalRevenue",
  optimizationData: "Optimization Data",
};

// export const checkUniqueDatas = (data) => {
//   const example = data.map((dt) => dt.execution_time);
//   const isUnique = uniq(example);
//   const isEqualData = uniqWith(example, _.isEqual);
//   console.log("isUniq", isUnique.length > 1, isUnique);
//   console.log("isEqualData", isEqualData.length === 1, isEqualData);
// };

export const getTotalValues = (values) => reduce(values, (a, c) => a + c);
export const getEnergyGenerationValues = (values) =>
  forEach(values, (data) => {
    const energyOutputs = [];
    const energyCurtailments = [];
    const energyProductions = [];
    const executionTimes = [];

    // Mapping optimization by scenario
    data.map((optimization) => {
      const energyGeneration = optimization.instance_data.RE_Generation_1.sum;
      energyOutputs.push(energyGeneration.energy_output);
      energyCurtailments.push(energyGeneration.energy_curtailment);
      energyProductions.push(energyGeneration.energy_production);
      executionTimes.push(optimization.execution_time);
    });

    // Energy Ouput total and average
    data.total_energy_output = getTotalValues(energyOutputs);
    data.average_energy_output = data.total_energy_output / data.length;

    // Energy Curtailment total and average
    data.total_energy_curtailment = getTotalValues(energyCurtailments);
    data.average_energy_curtailment =
      data.total_energy_curtailment / data.length;

    // Energy Production total and average
    data.total_energy_production = getTotalValues(energyProductions);
    data.average_energy_production = data.total_energy_production / data.length;

    // Execution Time total and average
    data.total_execution_time = getTotalValues(executionTimes);
    data.average_execution_time = data.total_execution_time / data.length;

    return data;
  });

export const getRevenueValues = (values) =>
  forEach(values, (data) => {
    const revenue = data.map((optimization) => {
      const energyRevenue = optimization.instance_data.DayAhead.sum.revenue;
      return energyRevenue;
    });
    data.total_revenue = reduce(revenue, (a, c) => a + c);
    data.average_revenue = data.total_revenue / data.length;
    return data;
  });
