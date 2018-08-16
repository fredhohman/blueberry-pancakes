const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 650;
const height = 700;
const numOfPancakes = 10;

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
    pancakes.push({number: i+1});
  }

  return pancakes;
}

const pancakesSorted = makePancakes(numOfPancakes);
const pancakes = shuffle(pancakesSorted);

let pancakeColor = d3.scaleLinear()
    .domain([0, numOfPancakes])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#EFEBE9"), d3.rgb('#3E2723')])

class pancakeStack extends D3Component {

  initialize(node, props) {

    const svg = this.svg = d3.select(node).append('svg');
    svg.attr('viewBox', `0 0 ${size} ${height}`)
      .style('width', '100%')
      .style('height', 'auto');

    let stack = svg.selectAll('.pancake')
        .data(pancakes)
        .enter()
        .append('g')

    stack.append('rect')
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("x", 50)
        .attr("y", function(d,i) { return (50*i + 10*(i+1)) })
        .attr("width", 300)
        .attr("height", 50)
        .classed('pancake', true)
        .style('fill', function(d) { return pancakeColor(d.number) })

    stack.append('text')
        .text(function(d,i) { return d.number })
        .attr('x', 50 + 150)
        .attr("y", function (d, i) { return 34 + (50 * i + 10 * (i + 1)) })
        .classed('pancake-label', true)


  }

  update(props) {
    console.log('update pancake stack')

    let flipNum = pancakes[0].number
    console.log(flipNum)
    let pancakesToBeFlipped = pancakes.slice(0, flipNum)

    for (let i = 0; i < pancakesToBeFlipped.length; i++) {
        pancakes[i] = pancakesToBeFlipped[pancakesToBeFlipped.length - 1 - i]
    }
    console.log(pancakes)

    d3.selectAll('.pancake-label')
        .data(pancakes)
        .text(function(d) { return d.number })


      d3.selectAll('.pancake')
          .data(pancakes)
          .style('fill', function (d) { return pancakeColor(d.number) })

    // if (propsUpdated === false) {

    //   if (props.iterVar === 0) {
    //     cards = makeCards(suits, cardPrimitives);
    //     // console.log(cards)
    //   }

    //   let lastPoint = props.points[props.points.length - 1];

    //   if (lastPoint.y !== 1) {
    //     propsUpdated = true;

    //     // console.log('riffle', props.iterVar);

    //     function riffle(cards) {
    //       let randCardIndex = Math.floor(Math.random() * cards.length);
    //       let topCard = cards.shift();
    //       cards.splice(randCardIndex, 0, topCard);
    //       return cards;
    //     }
    //     cards = riffle(cards);

    //     this.svg.selectAll('.card')
    //       .data(cards)
    //       .attr('fill', function (d) {
    //         if (d === 'K♦') {
    //           return '#f44336';
    //         } else {
    //           return '#FFFFFF';
    //         }
    //       });

    //     this.svg.selectAll('.card-text')
    //       .data(cards)
    //       .text(function (d) { return d; })
    //       .attr('fill', function (d) {
    //         if (d === 'K♦') {
    //           return '#FFFFFF';
    //         }
    //         if ((d[d.length - 1] === suits[0]) || (d[d.length - 1] === suits[1])) {
    //           return 'black';
    //         }
    //         if ((d[d.length - 1] === suits[2]) || (d[d.length - 1] === suits[3])) {
    //           return '#f44336';
    //         }
    //       });

    //     const newXValue = props.iterVar;
    //     const newYValue = cards.indexOf('K♦') + 1;
    //     // console.log('updateprops');

    //     // Make sure you put this code in a conditional 
    //     // so that it doesn't loop infinitely
    //     props.updateProps({
    //       points: props.points.concat([{
    //         x: newXValue,
    //         y: newYValue
    //       }])
    //     });
    //   }
    // } else {
    //   propsUpdated = false;
    // }
  }
}

module.exports = pancakeStack;
