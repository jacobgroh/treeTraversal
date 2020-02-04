import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {
  setOrderType,
  setNodesNumber,
  setDuration,
  setAnimate
} from "../actions";

const Header = props => {
  const [results, setResults] = useState(props.result);
  const [traversal, setTraversal] = useState("in");
  const [nodes, setNodes] = useState(10);
  const startAnimation = () => {
    props.setOrderType(traversal);
  };

  useEffect(() => {
    setResults(props.result);
  }, [props.result]);
  return (
    <section className="header">
      <header className="header__label">Tree Project</header>
      <section className="options">
        <form
          onSubmit={e => {
            e.preventDefault();
            //Set nodes for tree:
            props.setNodesNumber(nodes);
            startAnimation();
            props.setAnimate(true);
          }}
          className="options__form"
        >
          <label htmlFor="nodes">Node Value:</label>
          <input
            id="nodes"
            type="text"
            className="input__Value field__sm"
            value={nodes}
            onChange={e => {
              props.setAnimate(false);
              setNodes(e.target.value);
            }}
          />
          <select
            name="orderTraversal"
            value={traversal}
            onChange={e => {
              props.setAnimate(false);
              setTraversal(e.target.value);
            }}
            className="input__Value"
          >
            <option value="in">In Order</option>
            <option value="pre">Pre-Order</option>
            <option value="post">Post-Order</option>
          </select>
          <label htmlFor="duration">
            Animation Duration ({props.duration} sec)
          </label>
          <input
            id="duration"
            type="range"
            min="5"
            max="30"
            value={props.duration}
            onChange={e => {
              props.setAnimate(false);
              props.setDuration(e.target.value);
            }}
            className="slider input__Value"
          />

          <input type="submit" value="Submit" />
        </form>
      </section>

      <section className="results">
        Results:
        {(results &&
          results.map(value => {
            return value + " ";
          })) ||
          ""}
      </section>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    result: state.result,
    root: state.root,
    nodes: state.nodeNumber,
    duration: state.duration
  };
};
export default connect(mapStateToProps, {
  setOrderType,
  setDuration,
  setNodesNumber,
  setAnimate
})(Header);
