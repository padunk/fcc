"use strict";

const dataURL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function renderBar() {
    const { data: dataset } = await fetchData(dataURL);
    // console.log(dataset);
    const chart = document.querySelector("#chart");
    const margin = {
        top: 20,
        right: 50,
        bottom: 50,
        left: 50,
    };
    const w = window.innerWidth - margin.right;
    const h = window.innerHeight;
    const year = dataset.map(d => new Date(d[0]));
    const gdp = dataset.map(d => d[1]);
    const gdpLinearScale = d3
        .scaleLinear()
        .domain([0, d3.max(gdp)])
        .range([0, h - margin.top - margin.bottom]);
    const scaleGDP = gdp.map(g => gdpLinearScale(g));

    const tooltip = d3
        .select(chart)
        .append("div")
        .attr("id", "tooltip");

    const intl = number => {
        return new Intl.NumberFormat("us-US", {
            style: "currency",
            currency: "USD",
        }).format(number);
    };
    const checkQuarter = month => {
        let quarter;
        if (month === "01") {
            quarter = "Q1";
        } else if (month === "04") {
            quarter = "Q2";
        } else if (month === "07") {
            quarter = "Q3";
        } else if (month === "10") {
            quarter = "Q4";
        }
        return quarter;
    };

    // gradient bar
    const renderGradient = svg => {
        const gradient = svg
            .append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "gradientBar")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        gradient
            .append("svg:stop")
            .attr("class", "beginGradient")
            .attr("offset", "0%");
        gradient
            .append("svg:stop")
            .attr("class", "endGradient")
            .attr("offset", "100%");
    };

    // render axis
    const xScale = d3
        .scaleTime()
        .domain([d3.min(year), d3.max(year)])
        .range([margin.left, w]);

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, d => d[1])])
        .range([h - margin.bottom, margin.top]);

    const svg = d3
        .select(chart)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${h - margin.bottom})`)
        .call(xAxis);
    svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);

    // render gradient
    renderGradient(svg);

    // render bar
    svg.selectAll("rect")
        .data(scaleGDP)
        .enter()
        .append("rect")
        .attr("x", (_, i) => xScale(year[i]))
        .attr("y", d => h - margin.bottom - d)
        .attr("width", (w - margin.left) / dataset.length - 0.5)
        .attr("height", d => d)
        .attr("class", "bar")
        .attr("fill", "url(#gradientBar)")
        .attr("data-date", (_, i) => dataset[i][0])
        .attr("data-gdp", (_, i) => gdp[i])
        .on("mouseover", (d, i) => {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 1);
            tooltip
                .text(
                    `
                    ${dataset[i][0].slice(0, 4)} - ${checkQuarter(
                        dataset[i][0].slice(5, 7)
                    )}
                    ${intl(dataset[i][1])} Billion
                `
                )
                .attr("data-date", dataset[i][0]);
        })
        .on("mouseout", d => {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0);
        });
}

function init() {
    document.addEventListener("DOMContentLoaded", renderBar());
}

init();
