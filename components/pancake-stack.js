const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 650;
const height = 250;
const numOfPancakes = 5;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function makePancakes(numOfPancakes) {
    let pancakes = [];

    for (let i = 0; i < numOfPancakes; i++) {
        pancakes.push({ number: i + 1 });
    }

    return pancakes;
}

let pancakeColor = d3.scaleLinear()
    .domain([0, numOfPancakes])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#EFEBE9"), d3.rgb('#3E2723')])

class pancakeStack extends D3Component {

    reset(){
        const pancakesSorted = makePancakes(numOfPancakes);
        this.pancakes = shuffle(pancakesSorted);
        this.flipNum

        this.redraw();
    }

    doFlip(){
        let flipNum = this.pancakes[0].number
        let pancakesToBeFlipped = this.pancakes.slice(0, flipNum)

        for (let i = 0; i < pancakesToBeFlipped.length; i++) {
            this.pancakes[i] = pancakesToBeFlipped[pancakesToBeFlipped.length - 1 - i]
        }

        this.redraw();
    }

    initialize(node, props) {

        const pancakesSorted = makePancakes(numOfPancakes);
        this.pancakes = shuffle(pancakesSorted);

        const svg = this.svg = d3.select(node).append('svg');
        svg.attr('viewBox', `0 0 ${size} ${height}`)
            .style('width', '100%')
            .style('height', 'auto');

        let stack = svg.selectAll('.pancake')
            .data(this.pancakes)
            .enter()
            .append('g')

        stack.append('rect')
            .attr("rx", 20)
            .attr("ry", 20)
            .attr("x", 50)
            .attr("y", function (d, i) { return (35 * i + 10 * (i + 1)) })
            .attr("width", 300)
            .attr("height", 40)
            .classed('pancake', true)

        stack.append('text')
            .text(function (d, i) { return d.number })
            .attr('x', 50 + 150)
            .attr("y", function (d, i) { return 31 + (35 * i + 10 * (i + 1)) })
            .classed('pancake-label', true)
            .style('fill', '#0948be')
            .style('font-size', '30px')
            .style('font-weight', 700)
            // .style('stroke', '#fff2a4')
            // .style('stroke-width', '0.5px')

        // stack.append('circle')
            // .attr('cx', (d,i) => i*40)
            // .attr('cy', 40)
            // .attr('r', 4)

        let flipMessage = svg.append('text')
            // .text('You flipped pancake 1 to the top!')
            .attr('id', 'flip-message')
            .style('visibility', 'hidden')

        flipMessage
            .append('tspan')
            .text('You flipped pancake 1')
            .attr('x', 400)
            .attr('y', 25)

        flipMessage
            .append('tspan')
            .text('to the top! 🥞')
            .attr('x', 400)
            .attr('y', 55)
    }

    update(props, oldProps) {

        if (props.flip > oldProps.flip){ // We pressed flip
            console.log('Updating pancake stack');
            this.doFlip();
        } else if (props.reset > oldProps.reset){ // We pressed reset
            console.log('Reseting pancake stack');
            this.reset();
        } else {
            console.debug("Error!");
        }
    }

    redraw(){
        d3.selectAll('.pancake-label')
            .data(this.pancakes)
            .text(function (d) { return d.number })

        if (this.pancakes[0].number === 1) {
            d3.select('#flip-message')
                .style('visibility', 'visible')
        } else { 
            d3.select('#flip-message')
                .style('visibility', 'hidden')
        }

        // d3.selectAll('.pancake')
            // .data(this.pancakes)
            // .style('fill', function (d) { return pancakeColor(d.number) })
    }
}

module.exports = pancakeStack;
