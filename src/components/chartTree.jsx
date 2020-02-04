import React, { Component } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";

import {
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal
} from "./generic/treeTraversals";
import { setResult, setAnimate } from "../actions/index";

class ChartTree extends Component {
  componentDidMount() {
    this.updateTree();
  }
  componentDidUpdate() {
    this.updateTree();

    //Only animate if form was submitted
    if (this.props.animate) {
      this.animateOrder();
    }
  }

  animateOrder = () => {
    let type = this.props.orderType;

    //Recursively go through tree with the order
    let result;
    switch (type) {
      case "in":
        result = inOrderTraversal(this.props.root);
        break;
      case "pre":
        result = preOrderTraversal(this.props.root);
        break;
      case "post":
        result = postOrderTraversal(this.props.root);
        break;
      default:
        result = {};
        break;
    }

    // const result = inOrderTraversal(this.props.root);
    //Set the result of the traversal
    this.props.setResult(result.ordered);
    //Animation time in miliseconds
    const animationTime = this.props.duration * 1000;
    const delay = animationTime / result.rootsAndPaths.length;
    const duration = delay / 2;

    result.rootsAndPaths.forEach(async (d, i) => {
      //Node Path
      if (d.node) {
        if (!d.final) {
          d3.select(`#${d.id} circle`)
            .transition()
            .delay(delay + delay * i)
            .duration(duration)
            .attr("fill", "orange")
            .attr("stroke-width", "2px")
            .transition()
            .duration(duration)
            // .delay(duration * i)
            .attr("fill", "yellow")
            .attr("stroke-width", "1px");
        } else {
          d3.select(`#${d.id} circle`)
            .transition()
            .delay(delay + delay * i)
            .duration(duration)
            .attr("fill", "chartreuse")
            .attr("stroke-width", "2px")
            .transition()
            .duration(duration)
            // .delay(duration * i)
            .attr("fill", "green")
            .attr("stroke-width", "1px");
        }
      } else if (!d.node) {
        if (!d.final) {
          d3.select(`#link_${d.id} `)
            .transition()
            .delay(delay + delay * i)
            .duration(duration)
            .attr("stoke", "orange")
            .attr("stroke-width", "7px")
            .transition()
            .duration(duration)
            .attr("stroke", "#b0b84b")
            .attr("stroke-width", "4px");
        } else {
          d3.select(`#link_${d.id} `)
            .transition()
            .delay(delay + delay * i)
            .duration(duration)
            .attr("stroke", "chartreuse")
            .attr("stroke-width", "7px")
            .transition()
            .duration(duration)
            .attr("stroke", "green")
            .attr("stroke-width", "4px");
        }
      }
    });
  };

  updateTree = () => {
    d3.select("svg").remove();

    var width = this.props.width;
    var height = this.props.height;

    var treemap = d3.tree().size([width, height]);

    var nodes = d3.hierarchy(this.props.root);

    nodes = treemap(nodes);
    var svg = d3
        .select(this.refs.svgContainer)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "svg__Container"),
      g = svg
        .append("g")
        .attr("transform-origin", "center")
        .attr("transform", "translate(0,25) scale(.9)")
        .attr("width", width)
        .attr("height", height);

    //Create links
    g.selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("id", d => {
        let parent = d.data.parent ? d.data.parent : "root";
        return "link_" + d.data.name + "-" + parent;
      })
      .attr("d", function(d) {
        const x = Math.floor(d.x);
        const y = Math.floor(d.y);
        const string =
          "M" +
          x +
          "," +
          y +
          "L" +
          Math.floor(d.parent.x) +
          "," +
          Math.floor(d.parent.y);
        return string;
      })
      .attr("stroke", "red")
      .attr("stroke-width", "4px");

    // Add nodes
    var node = g
      .selectAll(".node")
      .data(nodes.descendants())
      .enter()
      .append("g")
      .attr("id", function(d) {
        return "node" + d.data.name;
      })
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // adds the circle to the node
    node
      .append("circle")
      .attr("r", 10)
      .attr("fill", "red")
      .attr("stroke", "black");

    // adds the text to the node
    node
      .append("text")
      .attr("dy", ".35em")
      .attr("y", function(d) {
        return d.children ? -20 : 20;
      })
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.name || "";
      });
  };

  render() {
    return (
      <div
        ref="svgContainer"
        className="tree"
        style={{ width: this.props.width, height: this.props.height }}
      ></div>
    );
  }
}
const mapStateToProps = state => {
  return {
    orderType: state.orderType,
    root: state.root,
    duration: state.duration,
    animate: state.animate
  };
};

export default connect(mapStateToProps, { setResult, setAnimate })(ChartTree);
