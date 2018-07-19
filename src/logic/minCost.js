const minCost = (graph, from, to) => {
  let start = from;
  const end = to;
  graph[start].pathLength = 0;
  
  goThroughPaths(graph, false, start);

  return graph[end].pathLength || null;
};

const goThroughPaths = (graph, markVisited, start) => {
  const paths = graph[start].paths;
  const neighbours = Object.keys(paths).filter(p => !graph[p].visited);

  if(!neighbours.length) return;

  neighbours.forEach(p => {
    const point = graph[p];
    if(point.pathLength) {
      point.pathLength = Math.min(point.pathLength, paths[p] + graph[start].pathLength)
      return;
    };
    point.pathLength = paths[p] + graph[start].pathLength;
  });

  graph[start].visited = markVisited;

  neighbours.forEach(goThroughPaths.bind(null, graph, true))
}

export default minCost;