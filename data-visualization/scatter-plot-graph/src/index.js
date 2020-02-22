"use strict";

const dataUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

let svgWidth = window.innerWidth;
let svgHeight = window.innerHeight;
const margin = {
    top: 20,
    right: 50,
    bottom: 50,
    left: 50,
};

async function fetchData(url) {
    let response = await fetch(url);
    return await response.json();
}

function createLegend(parentEl, className, bgColor, text) {
    const wrapper = d3
        .select(parentEl)
        .append("div")
        .attr("class", className);

    wrapper
        .append("span")
        .attr("class", `color-${className}`)
        .style("background-color", bgColor)
        .style("width", "10px")
        .style("height", "10px")
        .style("display", "inline-block")
        .style("margin-right", "10px");

    wrapper.append("span").text(text);
}

async function renderScatterPlot() {
    const data = await fetchData(dataUrl);
    // console.log(data);
    const plot = document.querySelector("#scatter-plot");
    const legend = document.querySelector("#legend");
    const tooltip = document.querySelector("#tooltip");
    const year = data.map(d => d.Year);
    const time = data.map(
        d => new Date(2020, 0, 1, 0, Math.floor(d.Seconds / 60), d.Seconds % 60)
    );
    const doping = data.map(d => d.Doping === "");

    createLegend(legend, "doping", "orangered", "Doping allegiations");
    createLegend(legend, "no-doping", "aqua", "No doping allegiations");

    // create the main svg
    const svg = d3
        .select(plot)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // create axis
    // X axis
    const xScale = d3
        .scaleLinear()
        .domain([d3.min(year) - 1, d3.max(year) + 1])
        .range([margin.left, svgWidth - margin.right]);

    const xAxis = d3
        .axisBottom(xScale)
        .ticks(10)
        .tickFormat(d3.format(""));

    svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${svgHeight - margin.bottom})`);

    // Y axis
    const yScale = d3
        .scaleTime()
        .domain([d3.min(time), d3.max(time)])
        .range([margin.top, svgHeight - margin.bottom]);

    const yAxis = d3
        .axisLeft(yScale)
        .ticks(15)
        .tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`);

    // render the scatter plot
    svg.selectAll("a")
        .data(time)
        .enter()
        .append("a")
        .attr("href", (_, i) => data[i].URL)
        .attr("target", "_blank")
        .attr("rel", "noopener noreferrer")
        .append("circle")
        .attr("cy", d => yScale(d))
        .attr("cx", (_, i) => xScale(year[i]))
        .attr("r", 5)
        .attr("class", "dot")
        .attr("data-yvalue", d => d)
        .attr("data-xvalue", (_, i) => year[i])
        .style("fill", (_, i) => (doping[i] ? "aqua" : "orangered"))
        .on("mouseover", (d, i) => {
            const height = svgHeight - margin.top - margin.bottom;
            const yPos = yScale(d);
            const width = svgWidth - margin.right - margin.left;
            const wPos = xScale(year[i]);

            const addTooltip = d3.select(tooltip).attr("data-year", year[i]);

            addTooltip.append("p")
            .attr('class', 'riders-name')
            .text(`${data[i].Name}`);
            addTooltip.append("p")
            .attr('class', 'riders-nationality')
            .text(`${data[i].Nationality}`);
            addTooltip.append("p")
            .attr('class', 'riders-year')
            .text(`Year: ${data[i].Year}`);
            addTooltip.append("p")
            .attr('class', 'riders-time')
            .text(`Time: ${data[i].Time}`);
            addTooltip
                .append("p")
                .attr('class', 'riders-allegations')
                .text(
                    `${
                        data[i].Doping === ""
                            ? "No doping allegiations"
                            : data[i].Doping
                    }`
                );

            const offsetHeight = tooltip.getBoundingClientRect().height;
            const top = yPos > height / 2 ? yPos - offsetHeight : yPos;
            const offsetWidth = tooltip.getBoundingClientRect().width;
            const left = wPos > width / 2 ? wPos - offsetWidth - 7 : wPos + 7;
            addTooltip
                .style("top", `${top}px`)
                .style("left", `${left}px`)
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            const selectTooltip = d3
                .select(tooltip)
                .style("opacity", 0)
                .attr("data-year", "");
            const len = tooltip.children.length;
            for (let i = 0; i < len; i++) {
                selectTooltip.select("p").remove();
            }
        });
}

function init() {
    document.addEventListener("DOMContentLoaded", renderScatterPlot);
}

window.addEventListener("resize", function() {
    svgWidth = window.innerWidth;
    svgHeight = window.innerHeight;
    // renderScatterPlot();
});

init();
