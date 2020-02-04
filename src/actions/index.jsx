export const setTree = root => {
  return {
    type: "SET_TREE",
    payload: root
  };
};

export const setNodesNumber = number => {
  return {
    type: "SET_NODES_NUMBER",
    payload: number
  };
};

export const setResult = array => {
  return {
    type: "SET_RESULT",
    payload: array
  };
};

export const setOrderType = type => {
  return {
    type: "SET_ORDER_TYPE",
    payload: type
  };
};

export const setDuration = duration => {
  return {
    type: "SET_DURATION",
    payload: duration
  };
};

export const setAnimate = animate => {
  return {
    type: "SET_ANIMATE",
    payload: animate
  };
};
