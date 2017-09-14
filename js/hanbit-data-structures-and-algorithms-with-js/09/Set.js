function Set() {
  this.dataStore = [];
  this.add = add;
  this.remove = remove;
  // this.size = size;
  // this.union = union;
  // this.intersect = intersect;
  // this.subset = subset;
  // this.difference = difference;
  this.show = show;  
}

function add(data) {
  if (this.dataStore.indexOf(data) < 0) {
    this.dataStore.push(data);
    return true;
  } else {
    return false;
  }
}

function remove(data) {
  var pos = this.dataStore.indexOf(data);
  if (pos > -1) {
    this.dataStore.splice(pos, 1);
    return true;
  } else {
    return false;
  }
}

function show() {
  return this.dataStore;
}

module.exports.Set = Set;
