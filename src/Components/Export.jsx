import React from "react";
import { TbFileDownload } from "react-icons/tb";
import "./Export.css";
const Export = ({ data }) => {
  const [words, frq] = data;
  const downloadCSV = () => {
    const data = frq.map((val, i) => [words[i], val]);
    const header = ["Word", "Frequency"];

    // Generate CSV content
    const csvContent = `${header.join(",")}\n${data
      .map((row) => row.join(","))
      .join("\n")}`;

    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(
      new Blob([csvContent], { type: "text/csv" })
    );
    downloadLink.download = "histogram_data.csv";

    document.body.appendChild(downloadLink);

    downloadLink.click();
  };

  return (
    <button className="export__btn" onClick={downloadCSV}>
      Download CSV
      <TbFileDownload size="2rem" />
    </button>
  );
};

export default Export;
