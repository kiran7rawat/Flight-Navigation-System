import { City } from '../types';
import { haversine } from './haversine';

interface Node {
  city: City;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

export function findOptimalRoute(
  cities: City[],
  start: City,
  end: City,
  weatherRisks: Record<string, number>
): City[] {
  const openSet: Node[] = [];
  const closedSet = new Set<string>();
  
  const startNode: Node = {
    city: start,
    g: 0,
    h: haversine(start.latitude, start.longitude, end.latitude, end.longitude),
    f: 0,
    parent: null
  };
  
  startNode.f = startNode.g + startNode.h;
  openSet.push(startNode);

  while (openSet.length > 0) {
    let current = openSet.reduce((min, node) => 
      node.f < min.f ? node : min, openSet[0]);
    
    if (current.city.id === end.id) {
      return reconstructPath(current);
    }

    openSet.splice(openSet.indexOf(current), 1);
    closedSet.add(current.city.id);

    for (const neighbor of cities) {
      if (closedSet.has(neighbor.id)) continue;

      const distance = haversine(
        current.city.latitude,
        current.city.longitude,
        neighbor.latitude,
        neighbor.longitude
      );

      const risk = weatherRisks[neighbor.id] || 1;
      const gScore = current.g + distance * risk;
      
      const neighborNode: Node = {
        city: neighbor,
        g: gScore,
        h: haversine(neighbor.latitude, neighbor.longitude, end.latitude, end.longitude),
        f: 0,
        parent: current
      };
      neighborNode.f = neighborNode.g + neighborNode.h;

      const existingNode = openSet.find(n => n.city.id === neighbor.id);
      if (!existingNode) {
        openSet.push(neighborNode);
      } else if (gScore < existingNode.g) {
        existingNode.g = gScore;
        existingNode.f = gScore + existingNode.h;
        existingNode.parent = current;
      }
    }
  }

  return [];
}

function reconstructPath(endNode: Node): City[] {
  const path: City[] = [];
  let current: Node | null = endNode;
  
  while (current) {
    path.unshift(current.city);
    current = current.parent;
  }
  
  return path;
}