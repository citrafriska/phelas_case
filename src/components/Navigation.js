import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { copyTexts } from "../utils";

const Navigation = ({
  onClickEnergySummary,
  onClickAverageExecutionTime,
  onClickAverageEnergyOutput,
  onClickAverageEnergyCurtailment,
  onClickAverageEnergyProduction,
  onClickTotalEnergyOutput,
  onClickTotalEnergyCurtailment,
  onClickTotalEnergyProduction,
  onClickAverageRevenue,
  onClickTotalRevenue,
}) => {
  const subMenus = [
    {
      key: "sub1",
      label: "Energy Summary",
      icon: <AppstoreOutlined />,
      onClick: onClickEnergySummary,
      children: [
        {
          key: copyTexts.averageExecutionTimeKey,
          label: "Average Execution Time",
          onClick: onClickAverageExecutionTime,
        },
        {
          key: copyTexts.averageEnergyOutputKey,
          label: "Average Energy Output",
          onClick: onClickAverageEnergyOutput,
        },
        {
          key: copyTexts.averageEnergyCurtailmentKey,
          label: "Average Energy Curtailment",
          onClick: onClickAverageEnergyCurtailment,
        },
        {
          key: copyTexts.averageEnergyProductionKey,
          label: "Average Energy Production",
          onClick: onClickAverageEnergyProduction,
        },
        {
          key: copyTexts.totalEnergyOutputKey,
          label: "Total Energy Output",
          onClick: onClickTotalEnergyOutput,
        },
        {
          key: copyTexts.totalEnergyCurtailmentKey,
          label: "Total Energy Curtailment",
          onClick: onClickTotalEnergyCurtailment,
        },
        {
          key: copyTexts.totalEnergyProductionKey,
          label: "Total Energy Production",
          onClick: onClickTotalEnergyProduction,
        },
      ],
    },
    {
      key: "sub2",
      label: "Revenue Summary",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: copyTexts.averageRevenueKey,
          label: "Average Revenue",
          onClick: onClickAverageRevenue,
        },
        {
          key: copyTexts.totalRevenueKey,
          label: "Total Revenue",
          onClick: onClickTotalRevenue,
        },
      ],
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        style={{
          width: 260,
        }}
        defaultOpenKeys={["sub1"]}
        defaultSelectedKeys={["sub1"]}
      >
        {subMenus.map((sub) => (
          <Menu.SubMenu
            title={sub.label}
            key={sub.key}
            onTitleClick={sub.onClick}
          >
            {sub.children.map((item) => (
              <Menu.Item key={item.key} onClick={item.onClick}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </>
  );
};
export default Navigation;
