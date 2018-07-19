import data from './../routes.data';
import createGraphPoint from './../logic/createGraphPoint';

const points = data.split(', ').map(p => createGraphPoint(p)).filter(p => !!p);

const createGraph = () => {
  return points.reduce((graph, point) => {
    const name = point.name;
    if (!graph[name]) {
      graph[name] = {
        paths: {}
      };
    }
    graph[name].paths[point.path.dest] = point.path.distance;
    return graph;
  },{})
};

export default createGraph;
