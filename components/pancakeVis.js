const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 650;
const height = 200;
const pancakeWidthMultiplier = 2.5;
const pancakeHeightMultiplier = 3.5;
const pancakeSize = 15;

let propsUpdated = false;

function makePancakes() {
  const numOfPancakes = 100;
  let pancakes = [];

  for (let i = 0; i < numOfPancakes; i++) {
    pancakes.push({number: i+1});
  }

  return pancakes;
}

const pancakes = makePancakes();

class pancakeVis extends D3Component {

  initialize(node, props) {

    const svg = this.svg = d3.select(node).append('svg');
    svg.attr('viewBox', `0 0 ${size} ${height}`)
      .style('width', '100%')
      .style('height', 'auto');

    svg.selectAll('rect')
      .data(pancakes)
      .enter()
      .append('circle')
      .attr('class', 'card')
      .attr('cx', function (d, i) {
        return 16 + i % 20 * 32;
      })
      .attr('cy', function (d, i) {
        if (i < (pancakes.length - 1) * (1 / 5)) {
          return height * (1 / 5) - 16;
        }
        if (i > (pancakes.length - 1) * (1 / 5) && i < (pancakes.length - 1) * (2 / 5)) {
          return height * (2 / 5) - 16;
        }
        if (i > (pancakes.length - 1) * (2 / 5) && i < (pancakes.length - 1) * (3 / 5)) {
          return height * (3 / 5) - 16;
        }
        if (i > (pancakes.length - 1) * (3 / 5) && i < (pancakes.length - 1) * (4 / 5)) {
          return height * (4 / 5) - 16;
        }
        if (i > (pancakes.length - 1) * (4 / 5) && i <= (pancakes.length - 1) * (5 / 5)) {
          return height * (5 / 5) - 16;
        }
      })
      .attr('r', 14)
      .attr('fill', '#fff2a4')
      .attr('stroke', '#b45326')
      .attr('stroke-width', 2)

    svg.selectAll('text')
      .data(pancakes)
      .enter()
      .append('text')
      .attr('class', 'pancake-text')
      .attr('x', function (d, i) { return 16 + i % 20 * 32; })
      .attr('y', function (d, i) {
        if (i < (pancakes.length - 1) * (1 / 5)) {
          return height * (1 / 5) - 12;
        }
        if (i > (pancakes.length - 1) * (1 / 5) && i < (pancakes.length - 1) * (2 / 5)) {
          return height * (2 / 5) - 12;
        }
        if (i > (pancakes.length - 1) * (2 / 5) && i < (pancakes.length - 1) * (3 / 5)) {
          return height * (3 / 5) - 12;
        }
        if (i > (pancakes.length - 1) * (3 / 5) && i < (pancakes.length - 1) * (4 / 5)) {
          return height * (4 / 5) - 12;
        }
        if (i > (pancakes.length - 1) * (4 / 5) && i <= (pancakes.length - 1) * (5 / 5)) {
          return height * (5 / 5) - 12;
        }
      })
      .text(function (d) { return d.number; })
      .attr('text-anchor', 'middle')
      .attr('fill', '#0948be')
      .style('font-size', '12px')
      .style('font-weight', 700);
  }

  update(props) {

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

module.exports = pancakeVis;
