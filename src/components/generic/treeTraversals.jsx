/*
 Three methods have two functionalities:
  1. To traverse tree and set nodes in ordered array
  2. To Add paths and nodes id's to the rootsAndPaths array to help with animation
*/
//Work on in order traversal
export const inOrderTraversal = root => {
  let result = { ordered: [], rootsAndPaths: [] };

  //Conditions
  if (root === undefined || root.length === 0) {
    return [{ ordered: [], rootsAndPaths: [] }];
  }
  var returnedArray;
  while (root !== undefined) {
    //Add link to path as you followed link to get here
    if (root.parent) {
      result.rootsAndPaths.push({
        id: `${root.name}-${root.parent}`,
        final: false,
        node: false
      });
    }
    //Add Root to path
    result.rootsAndPaths.push({
      id: `node${root.name}`,
      final: false,
      node: true
    });
    // Go Left node to null
    if (root.children[0].name !== "") {
      //Push returned array to array
      returnedArray = inOrderTraversal(root.children[0]);
      //Add to the order
      result.ordered.push(...returnedArray.ordered);
      //add to the rootsAndPaths
      result.rootsAndPaths.push(...returnedArray.rootsAndPaths);
    }
    //Add current node as the final time visit
    result.rootsAndPaths.push({
      id: `node${root.name}`,
      final: true,
      node: true
    });
    // current
    result.ordered.push(root.name);
    // Right

    if (root.children[1].name !== "") {
      //Push returned array to arra
      returnedArray = inOrderTraversal(root.children[1]);
      result.ordered.push(...returnedArray.ordered);
      //add to the rootsAndPaths
      result.rootsAndPaths.push(...returnedArray.rootsAndPaths);
    }

    //before returning add path to parent
    if (root.parent) {
      result.rootsAndPaths.push({
        id: `${root.name}-${root.parent}`,
        final: true,
        node: false
      });
    }
    return result;
  }
  return result;
};

//Work on in order traversal
export const postOrderTraversal = root => {
  let result = { ordered: [], rootsAndPaths: [] };

  //Conditions
  if (root === undefined || root.length === 0) {
    return [{ ordered: [], rootsAndPaths: [] }];
  }
  var returnedArray;
  while (root !== undefined) {
    //Add link to path as you followed link to get here
    if (root.parent) {
      result.rootsAndPaths.push({
        id: `${root.name}-${root.parent}`,
        final: false,
        node: false
      });
    }
    //Add Root to path
    result.rootsAndPaths.push({
      id: `node${root.name}`,
      final: false,
      node: true
    });
    // Right
    if (root.children[1].name !== "") {
      //Push returned array to arra
      returnedArray = postOrderTraversal(root.children[1]);
      result.ordered.push(...returnedArray.ordered);
      //add to the rootsAndPaths
      result.rootsAndPaths.push(...returnedArray.rootsAndPaths);
    }

    //Add current node as the final time visit
    result.rootsAndPaths.push({
      id: `node${root.name}`,
      final: true,
      node: true
    });
    // current
    result.ordered.push(root.name);

    // Go Left node to null
    if (root.children[0].name !== "") {
      //Push returned array to array
      returnedArray = postOrderTraversal(root.children[0]);
      //Add to the order
      result.ordered.push(...returnedArray.ordered);
      //add to the rootsAndPaths
      result.rootsAndPaths.push(...returnedArray.rootsAndPaths);
    }
    //before returning add path to parent
    if (root.parent) {
      result.rootsAndPaths.push({
        id: `${root.name}-${root.parent}`,
        final: true,
        node: false
      });
    }
    return result;
  }
  return result;
};

//Work on in order traversal
export const preOrderTraversal = root => {
  let result = { ordered: [], rootsAndPaths: [] };

  //Conditions
  if (root === undefined || root.length === 0) {
    return [{ ordered: [], rootsAndPaths: [] }];
  }
  var returnedArray;
  while (root !== undefined) {
    //Add link to path as you followed link to get here
    if (root.parent) {
      result.rootsAndPaths.push({
        id: `${root.name}-${root.parent}`,
        final: false,
        node: false
      });
    }
    //Add Root to path
    result.rootsAndPaths.push({
      id: `node${root.name}`,
      final: false,
      node: true
    });

    //Add current node as the final time visit
    result.rootsAndPaths.push({
      id: `node${root.name}`,
      final: true,
      node: true
    });
    // current
    result.ordered.push(root.name);

    // Go Left node to null
    if (root.children[0].name !== "") {
      //Push returned array to array
      returnedArray = preOrderTraversal(root.children[0]);
      //Add to the order
      result.ordered.push(...returnedArray.ordered);
      //add to the rootsAndPaths
      result.rootsAndPaths.push(...returnedArray.rootsAndPaths);
    }

    // Right
    if (root.children[1].name !== "") {
      //Push returned array to arra
      returnedArray = preOrderTraversal(root.children[1]);
      result.ordered.push(...returnedArray.ordered);
      //add to the rootsAndPaths
      result.rootsAndPaths.push(...returnedArray.rootsAndPaths);
    }
    //before returning add path to parent
    if (root.parent) {
      result.rootsAndPaths.push({
        id: `${root.name}-${root.parent}`,
        final: true,
        node: false
      });
    }
    return result;
  }
  return result;
};
