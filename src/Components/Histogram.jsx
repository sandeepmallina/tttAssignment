import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Histogram.css";
import Chart from "chart.js/auto";
import Export from "./Export";
export const Histogram = (Data) => {
  const words = [];
  const frq = [];
  const [showCommonWords, setShowCommonwords] = useState(false);
  function NoCommonWords() {
    setShowCommonwords(!showCommonWords);
  }
  const filteredData = showCommonWords
    ? Data.Data.filter(
        (pair) =>
          pair[1].length > 2 &&
          ![
            "who",
            "are",
            "you",
            "com",
            "can",
            "the",
            "and",
            "ttt",
            "where",
            "your",
            "for",
            "our",
            "how",
            "get",
            "from",
            "all",
            "have",
            "with",
            "yes"
          ].includes(pair[1])
      )
    : Data.Data;
  for (let index = 0; index < filteredData.length; index++) {
    words.push(filteredData[index][1]);
    frq.push(filteredData[index][0]);
  }

  return (
    <div className="container">
      <div className="chart" style={{ maxWidth: "850px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: words.slice(0, 20),
            datasets: [
              {
                // Label for bars
                label: " worddata set ",
                // Data or value of your each variable
                data: frq.slice(0, 20),
                // Color of each bar
                backgroundColor: [
                  "rgba(255, 99, 132)",
                  "rgba(255, 159, 64)",
                  "rgba(255, 205, 86)",
                  "rgba(75, 192, 192)",
                  "rgba(54, 162, 235)",
                  "rgba(153, 102, 255)",
                  "rgba(201, 203, 207)"
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)"
                ],

                borderWidth: 0.5,
                barPercentage: 1,
                categoryPercentage: 1
              }
            ]
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    precision: 0,
                    stepSize: 1
                  }
                }
              ]
            },
            legend: {
              labels: {
                fontSize: 15
              }
            }
          }}
        />
      </div>
      <div className="right__container">
        <div className="export">
          <Export data={[words.slice(0, 20), frq.slice(0, 20)]} />
        </div>
        <button
          className={showCommonWords ? "commonword__btn" : "commonword__btnOff"}
          onClick={NoCommonWords}
        >
          {showCommonWords ? "Include common words" : "Disclude common words"}
        </button>
      </div>
    </div>
  );
};
