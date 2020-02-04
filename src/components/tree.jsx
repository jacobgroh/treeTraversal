import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setTree } from "../actions";
import { useState } from "react";
import ChartTree from "./chartTree";

import { isEmpty } from "./generic/utils";
// need to create higharchy of objects with each object having a
// children array
const createChildNode = value => {
  return {
    name: value,
    children: [{ name: "" }, { name: "" }],
    parent: ""
  };
};

const generateDataSet = number => {
  const arrayOfNumbers = Array.apply(null, { length: number }).map(
    (first, i) => i + 1
  );

  //Go through array and randomly create [{name: "", children=""}]
  const root = {
    name: arrayOfNumbers[0],
    children: [{ name: "" }, { name: "" }],
    parent: null
  };
  //Create the random structure of the tree
  arrayOfNumbers.map((number, index) => {
    if (index !== 0) {
      let goLeft;
      let pointer = root;
      while (true) {
        goLeft = Math.ceil(Math.random() * 2);

        if (goLeft === 1) {
          if (pointer.children[0].name === "") {
            pointer.children[0] = createChildNode(number);
            pointer.children[0].parent = pointer.name;
            pointer = root;
            break;
          } else {
            pointer = pointer.children[0];
          }
        } else {
          if (pointer.children[1].name === "") {
            pointer.children[1] = createChildNode(number);
            pointer.children[1].parent = pointer.name;
            pointer = root;
            break;
          } else {
            pointer = pointer.children[1];
          }
        }
      }
    }
    return "";
  });
  return root;
};

const Tree = props => {
  const [root, setRoot] = useState({});
  useEffect(() => {
    //Trigger change to reset tree
    setRoot({});
  }, [props.nodes]);

  useEffect(() => {
    let treeRoot;
    if (isEmpty(root)) {
      treeRoot = generateDataSet(props.nodes);
      props.setTree(treeRoot);
      setRoot(treeRoot);
    }
  }, [root]);

  if (props.width === undefined) return "";

  const width = props.width * 0.8;
  const height = props.height * 0.8;
  return (
    <div
      className="chart_tree_container"
      style={{ width: props.width, height: props.height }}
    >
      <ChartTree width={width} height={height} root={root} />
    </div>
  );
};

const mapStateToProps = state => {
  return { root: state.root, nodes: state.nodeNumber };
};

export default connect(mapStateToProps, { setTree })(Tree);
