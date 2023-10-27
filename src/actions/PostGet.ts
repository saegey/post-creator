import { ActivityItem, TimeSeriesDataType } from "../types/common";

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

const getActivity = async (post: TimeSeriesDataType) => {
  const coordinates = post.coordinates ? post.coordinates : [];
  const elevation = post.elevation ? post.elevation : [];
  const distances = post.distances ? post.distances : [];
  const grades = post.elevationGrades ? post.elevationGrades : "{}";
  if (!coordinates) {
    return undefined;
  }

  return coordinates
    .map((_: [number, number, number], i: number) => {
      if (i % 20 === 0) {
        return {
          t: i,
          e: elevation[i] ? Number(elevation[i]) : 0,
          g: grades[i] ? Number(grades[i]) : 0,
          d: distances[i] ? distances[i] : 0,
          c: [coordinates[i][0], coordinates[i][1]],
        };
      }
    })
    .filter(isDefined);
};

export { getActivity };
