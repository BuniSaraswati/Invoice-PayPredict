import React, { useContext } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DataContext } from "../context/Context";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

export const PieChart = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const labels = [
    "Unilever",
    "Johnson and Johnson",
    "Bose",
    "Kellog's",
    "Sony",
    "Puma",
    "Others",
  ];

  return (
    <Doughnut
      data={{
        labels: labels,
        datasets: [
          {
            label: "No of customers vs Business",
            data: state.cust_count,
            backgroundColor: ["#c03215",
            "#32c015",
            "#c0c015",
            "#abc015",
            "#15a0c0",
            "#15c4rc",
            "#1565c0"],
          },
        ],
      }}
    />
  );
};
