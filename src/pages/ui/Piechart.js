import React from "react";
import { Chart } from "react-google-charts";

function PieChart({ data }) {
    const options = {
        title: "My Daily Activities",   // 보여지는 제목
        is3D: true,
        animation: {
            duration: 1000,
        },
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"100%"}
        />
    );
}

export default PieChart;