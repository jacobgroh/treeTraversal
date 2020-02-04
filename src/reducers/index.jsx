import { combineReducers } from "redux";

const treeReducer = (tree = {}, action) => {
  if (action.type === "SET_TREE") {
    return { ...action.payload };
  }
  return tree;
};

const resultReducer = (result = [], action) => {
  if (result === action.payload) return result;
  if (action.type === "SET_RESULT") {
    return action.payload;
  }
  return result;
};

const orderTypeReducer = (orderType = "", action) => {
  if (action.type === "SET_ORDER_TYPE") {
    return action.payload;
  }
  return orderType;
};

const nodeNumberReducer = (nodes = 10, action) => {
  if (nodes === action.payload) return nodes;
  if (action.type === "SET_NODES_NUMBER") {
    return action.payload;
  }
  return nodes;
};

const durationReducer = (duration = 10, action) => {
  if (action.type === "SET_DURATION") {
    return action.payload;
  }
  return duration;
};

const animateReducer = (animate = false, action) => {
  if (action.type === "SET_ANIMATE") {
    return action.payload;
  }
  return animate;
};

export default combineReducers({
  root: treeReducer,
  result: resultReducer,
  orderType: orderTypeReducer,
  nodeNumber: nodeNumberReducer,
  duration: durationReducer,
  animate: animateReducer
});
