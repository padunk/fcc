"use strict";
const mapWrapper = document.querySelector("#usa-map");
const legend = document.querySelector("#legend");

const { json, geoPath, select, scaleQuantize, schemeBlues } = d3;
const { feature, mesh } = topojson;

const path = geoPath();

const educationUrl =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyUrl =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const svgWidth = window.innerWidth * 0.8;
const svgHeight = window.innerHeight;

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

async function renderChoropleth() {
    const svg = select(mapWrapper)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const color = scaleQuantize([1, 100], schemeBlues[9]);

    const us = await getData(countyUrl);
    const eduData = await getData(educationUrl);
    const eduDataObj = {};
    eduData.forEach(d => {
        eduDataObj[d.fips] = d;
    });
    const bachelorPercentage = eduData.map(d => [d.fips, d.bachelorsOrHigher]);

    const data = Object.assign(new Map(bachelorPercentage), {
        title: "Bachelor degree or higher (%)",
    });

    // render legend
    renderLegend(bachelorPercentage, schemeBlues[9]);

    // create tooltip
    const tip = select(mapWrapper)
        .append("div")
        .attr("id", "tooltip");

    // render map
    svg.append("g")
        .selectAll("path")
        .data(feature(us, us.objects.counties).features)
        .join("path")
        .attr("fill", d => color(data.get(d.id)))
        .attr("d", path)
        .attr("class", "county")
        .attr("data-fips", d => d.id)
        .attr("data-education", d => data.get(d.id))
        .on("mouseover", d => {
            tip.attr("data-education", data.get(d.id))
                .html(
                    `
                <p>${eduDataObj[d.id].area_name}, ${eduDataObj[d.id].state}: ${
                        eduDataObj[d.id].bachelorsOrHigher
                    }%</p>
            `
                )
                .style("left", `${d.geometry.coordinates[0][0][0] + 170}px`)
                .style("top", `${d.geometry.coordinates[0][0][1]}px`);
        });

    svg.on("mouseover", () => {
        // console.log('show');
        tip.attr('class') === 'show'
        ? ''
        : tip.attr("class", "show");
    }).on("mouseleave", () => {
        // console.log('hide');
        tip.attr("class", "hide");
    });

    svg.append("path")
        .datum(mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

    
}

function renderLegend(dataset, colorScheme) {
    const p = Math.max(0, d3.precisionFixed(0.05) - 2);
    const format = d3.format(`.${p}%`);
    const percentage = dataset.map(d => d[1] / 100);
    const legendWidth = 50;
    const legendHeight = 15;
    const svg = select(legend)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", 50);

    const xScale = d3
        .scaleLinear()
        .domain([d3.min(percentage), d3.max(percentage)])
        .range([0, legendWidth * colorScheme.length]);

    const xAxis = d3.axisBottom(xScale).tickFormat(format);

    svg.append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${legendHeight})`);

    svg.append("g")
        .selectAll("rect")
        .data(colorScheme)
        .enter()
        .append("rect")
        .attr("fill", d => d)
        .attr("x", (_, i) => i * legendWidth)
        .attr("y", 0)
        .attr("width", legendWidth)
        .attr("height", legendHeight);
}

function init() {
    document.addEventListener("DOMContentLoaded", renderChoropleth);
}

init();
