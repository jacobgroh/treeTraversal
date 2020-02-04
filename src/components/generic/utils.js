//Simply function taken from stack overflow to see if obj is empty
export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
