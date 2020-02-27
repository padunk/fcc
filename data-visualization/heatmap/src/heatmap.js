"use strict";
const heatMap = document.querySelector("#heat-map");
const legend = document.querySelector("#legend");

const url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const margin = {
    top: 20,
    right: 50,
    bottom: 50,
    left: 80,
};

async function getData(dataURL) {
    const response = await fetch(dataURL);
    return await response.json();
}

async function renderHeatMap() {
    const rawData = await getData(url);
    const BASE = rawData.baseTemperature;
    const DATA = rawData.monthlyVariance;
    // const colorScheme = d3.schemeRdYlBu[11];
    const colorScheme = [
        "#313695",
        "#4575b4",
        "#74add1",
        "#abd9e9",
        "#e0f3f8",
        "#ffffbf",
        "#fee090",
        "#fdae61",
        "#f46d43",
        "#d73027",
        "#a50026",
    ];

    const year = Array.from(new Set(DATA.map(d => d.year)));
    const variance = Array.from(DATA.map(d => d.variance)).sort(
        (a, b) => a - b
    );
    const varianceSteps = (data, len) => {
        let min = Math.min(...data);
        let max = Math.max(...data);

        let steps = Math.abs(max - min) / len;
        let result = [];
        for (let i = 0; i < len; i++) {
            result.push(min + steps * (i + 1));
        }
        return result;
    };

    const cellWidth = 5;
    const svgWidth = cellWidth * year.length;
    const svgHeight = window.innerHeight;

    // create tooltip element
    const tip = d3
        .select(heatMap)
        .append("div")
        .attr("id", "tooltip");

    const svg = d3
        .select(heatMap)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const series = [];
    for (let i = 1; i < 13; i++) {
        let element = DATA.filter(d => d.month === i);
        element = element.map(el => [
            el.year,
            monthName[el.month - 1],
            el.variance,
        ]);
        series[i - 1] = element;
    }

    // create and add axis
    const xScale = d3
        .scaleLinear()
        .domain([d3.min(year), d3.max(year)])
        .range([margin.left, svgWidth - margin.right]);

    const xAxis = d3
        .axisBottom(xScale)
        .ticks(10)
        .tickFormat(d3.format(""));

    svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${svgHeight - margin.bottom})`);

    const yScale = d3
        .scaleBand()
        .domain(monthName)
        .range([margin.top, svgHeight - margin.bottom]);

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`);

    // create color scale
    const color = d3
        .scaleThreshold()
        .domain(varianceSteps(variance, colorScheme.length))
        .range(colorScheme)
        .unknown("#444");

    svg.append("g")
        .selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("fill", d => color(d[2]))
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .attr("width", cellWidth)
        .attr("height", yScale.bandwidth())
        .attr("class", "cell")
        .attr("data-month", d => monthName.indexOf(d[1]))
        .attr("data-year", (_, i) => year[i])
        .attr("data-temp", d => BASE + d[2])
        // toggle tooltip
        .on("mouseover", (d, e, f, g) => {
            let temp = (BASE + d[2]).toFixed(2);
            let offset = 20;
            let xPos =
                xScale(d[0]) + offset > svgWidth / 2
                    ? xScale(d[0]) - 220
                    : xScale(d[0]) + offset;
            tip
                .attr("class", "show")
                .attr("data-year", d[0])
                .style("left", `${xPos}px`)
                .style("top", `${yScale(d[1])}px`).html(`
                    <p style="text-align: center;">${d[0]} - ${d[1]}</p>
                    <p style="text-align: center;">${temp}<sup>o</sup>C</p>
                    <p style="text-align: center;">${d[2]}<sup>o</sup>C</p>
                `);
        })
        .on("mouseout", d => {
            tip.attr("class", "hide");
        });

    // add legend
    const legendWidth = 30;
    const legendElement = d3
        .select(legend)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", margin.bottom);

    const xLegendData = varianceSteps(variance, colorScheme.length).map(
        v => BASE + v
    );

    const xLegendScale = d3
        .scaleLinear()
        .domain([d3.min(xLegendData), d3.max(xLegendData)])
        .range([
            margin.left + legendWidth,
            margin.left + colorScheme.length * legendWidth,
        ]);

    const xLegendAxis = d3
        .axisBottom(xLegendScale)
        .tickValues(xLegendData)
        .tickFormat(d3.format(".1f"));

    legendElement
        .append("g")
        .call(xLegendAxis)
        .attr("transform", `translate(0, ${legendWidth})`);

    legendElement
        .append("g")
        .selectAll("rect")
        .data(varianceSteps(variance, colorScheme.length))
        .enter()
        .append("rect")
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("fill", (d, i) => colorScheme[i])
        .attr("x", (d, i) => i * legendWidth)
        .attr("y", 0)
        .attr("width", legendWidth)
        .attr("height", legendWidth);
}

function init() {
    document.addEventListener("DOMContentLoaded", renderHeatMap);
}

init();
