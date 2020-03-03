"use strict";
const mapWrapper = document.querySelector("#tree-map");
const legend = document.querySelector("#legend");

const movieURL =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const color = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(",d");
const padding = 50;
const svgWidth = window.innerWidth - padding;
const svgHeight = window.innerHeight - padding;

const treemap = data =>
    d3
        .treemap()
        .size([svgWidth, svgHeight])
        .padding(1)(
        d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
    );

async function getData(url) {
    let response = await fetch(url);
    return response.json();
}

async function renderTreeMap() {
    const dataset = await getData(movieURL);
    const root = treemap(dataset);

    // tooltip
    const tip = d3
        .select(mapWrapper)
        .append("div")
        .attr("id", "tooltip");

    const svg = d3
        .select(mapWrapper)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // console.log(root.leaves());
    const allData = root.leaves();

    const children = svg
        .selectAll("g")
        .data(allData)
        .join("g")
        .attr("transform", d => `translate(${d.x0}, ${d.y0})`);

    children
        .append("rect")
        .attr("class", "tile")
        .attr("data-name", d => d.data.name)
        .attr("data-category", d => d.data.category)
        .attr("data-value", d => d.data.value)
        .attr("fill", d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0);

    children
        .append("text")
        .selectAll("tspan")
        .data(d => {
            d.data.value = format(d.data.value);
            return Object.values(d.data);
        })
        .join("tspan")
        .attr("x", 5)
        .attr("y", (_, i) => (i + 1) * 15)
        .attr("fill-opacity", (_, i, t) => (i === t.length - 1 ? 0.5 : null))
        .text(d => d);

    children
        .on("mouseenter", d => {
            tip.attr("data-value", d.data.value.replace(/\,/g, ""))
                .selectAll("p")
                .data(Object.values(d.data))
                .join("p")
                .text(d => d);

            let { width } = document
                .getElementById("tooltip")
                .getBoundingClientRect();

            tip.style("top", `${d.y0}px`)
                .style(
                    "left",
                    d.x1 > svgWidth / 2 ? `${d.x0 - width}px` : `${d.x1}px`
                )
                .style("opacity", 1);
        })
        .on("mouseleave", d => {
            tip.style("opacity", 0);
        });

    let cat = allData[0];
    while (cat.depth > 1) {
        cat = cat.parent;
    }
    cat = cat.parent.children.map(c => c.data.name);
    createLegend(cat);
    // add feature for text wrap.
}

function createLegend(category) {
    let rectWidth = 50;

    const svg = d3
        .select(legend)
        .append("svg")
        .attr("width", category.length * (rectWidth + 20))
        .attr("height", 100);

    svg.append("g")
        .selectAll("rect")
        .data(category)
        .join("rect")
        .attr("class", "legend-item")
        .attr("width", rectWidth)
        .attr("height", rectWidth)
        .attr("x", (_, i) => i * (rectWidth + 20))
        .attr("fill", (_, i) => d3.schemeCategory10[i]);

    svg.append("g")
        .selectAll("text")
        .data(category)
        .join("text")
        .text(d => d)
        .attr("x", (_, i) => i * (rectWidth + 20))
        .attr("fill", "linen")
        .attr("transform", `translate(0, ${rectWidth + 15})`)
        .style("font-size", "12px");
}

function init() {
    document.addEventListener("DOMContentLoaded", renderTreeMap);
}

init();
