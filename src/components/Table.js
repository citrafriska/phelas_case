import React, { useState } from "react";
import { Button, Space, Table as AntdTable, Select } from "antd";
import { values, forEach } from "lodash";
import { copyTexts } from "../utils";

const Table = ({ dataValues, dataByScenarios, dataByLifecycle }) => {
  const jsonDataValues = dataValues;
  const [filteredInfo, setFilteredInfo] = useState({});

  const [filters, setFilters] = useState({
    scenario_id: null,
    lifecycle_id: null,
  });

  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilters({
      scenario_id: null,
      lifecycle_id: null,
    });
  };

  const scenariosSortValues = values(
    forEach(dataByScenarios, (data, index) => {
      data.text = "Scenario ";
      data.value = index;
      return data;
    })
  );

  const lifecycleSortValues = values(
    forEach(dataByLifecycle, (data, index) => {
      data.text = "Lifecycle ";
      data.value = index;
      return data;
    })
  );

  const data = jsonDataValues.filter((optimization) =>
    filters.scenario_id
      ? filters.scenario_id.includes(optimization.scenario_id)
      : filters.lifecycle_id
      ? filters.lifecycle_id.includes(optimization.lifecycle_id)
      : optimization
  );

  const columns = [
    {
      title: "Optimization ID",
      dataIndex: "optimization_id",
      key: "optimization_id",
      width: 300,
    },
    {
      title: "Execution Time",
      dataIndex: "execution_time",
      key: "execution_time",
      sorter: (a, b) => a.execution_time - b.execution_time,
      sortOrder:
        sortedInfo.columnKey === "execution_time" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Energy Output",
      dataIndex: ["instance_data", "RE_Generation_1", "sum", "energy_output"],
      key: "energy_output",
      sorter: (a, b) =>
        a.instance_data.RE_Generation_1.sum.energy_output -
        b.instance_data.RE_Generation_1.sum.energy_output,
      sortOrder:
        sortedInfo.columnKey === "energy_output" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Energy Curtailment",
      dataIndex: [
        "instance_data",
        "RE_Generation_1",
        "sum",
        "energy_curtailment",
      ],
      key: "energy_curtailment",
      sorter: (a, b) =>
        a.instance_data.RE_Generation_1.sum.energy_curtailment -
        b.instance_data.RE_Generation_1.sum.energy_curtailment,
      sortOrder:
        sortedInfo.columnKey === "energy_curtailment" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Energy Production",
      dataIndex: [
        "instance_data",
        "RE_Generation_1",
        "sum",
        "energy_production",
      ],
      key: "energy_production",
      sorter: (a, b) =>
        a.instance_data.RE_Generation_1.sum.energy_production -
        b.instance_data.RE_Generation_1.sum.energy_production,
      sortOrder:
        sortedInfo.columnKey === "energy_production" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Revenue",
      dataIndex: ["instance_data", "DayAhead", "sum", "revenue"],
      key: "revenue",
      sorter: (a, b) =>
        a.instance_data.DayAhead.sum.energy_production -
        b.instance_data.DayAhead.sum.energy_production,
      sortOrder: sortedInfo.columnKey === "revenue" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <div
      style={{
        marginTop: "7rem",
        display: "flex",
        flexDirection: "column",
        padding: "0 8rem",
      }}
    >
      <Space
        style={{
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      >
        <h4>
          {copyTexts.optimizationData}
          <span style={{ opacity: 0.9, color: "#1677FF", fontWeight: 400 }}>
            {" "}
            ({data.length})
          </span>
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <div>
            <h5 style={{ padding: 0, margin: 0, paddingBottom: "0.5rem" }}>
              Sort by Scenario ID:
            </h5>
            <Select
              style={{
                width: 200,
              }}
              onChange={(value) =>
                setFilters({ ...filters, scenario_id: value })
              }
              options={scenariosSortValues}
              disabled={filters.lifecycle_id}
              value={filters.scenario_id}
              title="Scenario"
            />
          </div>

          <div>
            <h5 style={{ padding: 0, margin: 0, paddingBottom: "0.5rem" }}>
              Sort by Lifecycle ID:
            </h5>
            <Select
              style={{
                width: 200,
              }}
              onChange={(value) =>
                setFilters({ ...filters, lifecycle_id: value })
              }
              options={lifecycleSortValues}
              disabled={filters.scenario_id}
              value={filters.lifecycle_id}
            />
          </div>

          <Button style={{ marginTop: "1.45rem" }} onClick={clearFilters}>
            Reset
          </Button>
        </div>
      </Space>
      <AntdTable columns={columns} dataSource={data} onChange={handleChange} />
    </div>
  );
};
export default Table;
