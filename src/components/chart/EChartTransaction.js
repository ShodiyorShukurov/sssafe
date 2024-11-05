import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import useDashboard from "../../hooks/UseDashboard";
// import eChart from "./configs/eChart";

function EChartTransaction() {
  const { Title } = Typography;
  const { monthStatistics } = useDashboard();

  const eChart = {
    series: [
      {
        name: "Sales",
        data: monthStatistics
          ? monthStatistics.map((total) =>
              Number(total.total_amount / 100).toFixed(2)
            )
          : [],
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: monthStatistics
          ? monthStatistics.map((month) => month.month.slice(0, 3))
          : [],

        labels: {
          show: true,
          align: "left",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "left",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val + " so'm";
          },
        },
      },
    },
  };

  return (
    <>
      <Title level={5}>Transactions statistics</Title>

      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
}

export default EChartTransaction;