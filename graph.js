class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    if (!this.nodes.has(vertex)) this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      if (!this.nodes.has(vertex)) this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (v1.adjacent.has(v2)) v1.adjacent.delete(v2);
    if (v2.adjacent.has(v1)) v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    let arr = Array.from(this.nodes);
    arr.map((n) => {
      if (n.adjacent.has(vertex)) n.adjacent.delete(vertex);
    });
    this.nodes = new Set(arr);
    if (this.nodes.has(vertex)) this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let arrOFNodes = [];
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    while (toVisitQueue.length > 0) {
      let currentNode = toVisitQueue.pop();
      if (arrOFNodes.indexOf(currentNode.value) == -1) {
        arrOFNodes.push(currentNode.value);
      }
      for (let neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return arrOFNodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let arrOFNodes = [];
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    while (toVisitQueue.length > 0) {
      let currentNode = toVisitQueue.shift();
      if (arrOFNodes.indexOf(currentNode.value) == -1) {
        arrOFNodes.push(currentNode.value);
      }
      for (let neighbor of currentNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return arrOFNodes;
  }
}

module.exports = { Graph, Node };
