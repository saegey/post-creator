import React from "react";
import { Box, Spinner } from "theme-ui";
import mapboxgl, { GeoJSONSource, SkyLayer } from "mapbox-gl";
import { ActivityItem, VisualOverviewType } from "../../../types/common";
import { PostContext } from "../../PostContext";
import { select } from "slate";

// type ActivityEvent = {
//   c: Array<number>;
//   t: number | null;
//   g: number;
//   d: number;
//   e: number | null;
// };

interface MapProps {
  coordinates: Array<any>;
  markerCoordinates: ActivityItem | undefined;
  token: string;
  // selection: [number, number];
  downsampleRate: number;
  element: VisualOverviewType;
}

const routeLayerSettings = {
  id: "routelayer",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "blue",
    "line-width": 2,
  },
};

const routeSelectLayerSettings = {
  id: "routeSelectlayer",
  type: "line",
  source: "routeSelect",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "red",
    "line-width": 2,
  },
};

const currenPositionLayerSettings = {
  id: "currentPosition",
  type: "circle",
  source: "currentPosition",
  layout: {
    visibility: "visible",
  },
  paint: {
    "circle-radius": 6,
    "circle-color": "black",
    "circle-stroke-color": "white",
    "circle-stroke-width": 2,
  },
};

const Map = ({
  coordinates,
  markerCoordinates,
  token,
  element,
  // selection,
  downsampleRate,
}: MapProps): JSX.Element => {
  if (!coordinates || coordinates.length === 0) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
  // console.log(selection);
  const { selection } = React.useContext(PostContext);
  const mapContainerRef = React.useRef();
  const map = React.useRef<mapboxgl.Map>();
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);

  React.useEffect(() => {
    console.log("selection", selection);
  }, [selection]);

  React.useEffect(() => {
    console.log("seleection use", element);
    if (!map || !map.current) {
      console.log("nio map");
      return;
    }
    const geojsonSource = map.current?.getSource(
      "routeSelect"
    ) as GeoJSONSource;

    if (selection === undefined || selection === null) {
      console.log("removesource");
      if (map.current?.getSource("routeSelect")) {
        map.current?.removeSource("routeSelect");
        map.current?.removeLayer("routeSelectlayer");
      }

      return;
    }

    const selectLow =
      selection && selection[0]
        ? selection[0]
        : element && element.selectionStart
        ? element.selectionStart
        : undefined;

    const selectHigh =
      selection && selection[1]
        ? selection[1]
        : element && element.selectionEnd
        ? element.selectionEnd
        : undefined;

    console.log("selectLow", coordinates.slice(selectLow, selectHigh));

    // console.log("useEffect selecttion", selection, geojsonSource);
    if (!geojsonSource && selectLow && selectHigh) {
      // console.log(coordinates.slice(selection[0], selection[1]));
      map.current?.addSource("routeSelect", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates.slice(selectLow, selectHigh),
          },
        },
      });
    } else {
      // console.log(selection[0] * 20, coordinates[0]);
      try {
        const data = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: coordinates.slice(selectLow, selectHigh),
              },
            },
          ],
        } as any;

        // console.log(data);
        geojsonSource.setData(data);
      } catch (e) {
        console.error(e);
      }
    }
  }, [selection, element, isMapLoaded]);

  React.useEffect(() => {
    if (!map || !map.current) {
      return;
    }
    const geojsonSource = map.current?.getSource("route") as GeoJSONSource;
    if (!geojsonSource) {
      map.current?.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      });
    } else {
      // console.log('customMap - updatee source');
      try {
        const data = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: coordinates,
              },
            },
          ],
        } as any;

        // console.log(data);
        geojsonSource.setData(data);
      } catch (e) {
        console.error(e);
      }
    }
    //

    if (!map.current.getSource("currentPosition")) {
      map.current?.addSource("currentPosition", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
    }

    if (!map.current?.getLayer("routelayer")) {
      try {
        map.current?.addLayer(routeLayerSettings as SkyLayer);
      } catch (e) {
        console.error(e);
      }
    }
    if (
      (selection || (element && element.selectionStart)) &&
      !map.current?.getLayer("routeSelectlayer")
    ) {
      try {
        map.current?.addLayer(routeSelectLayerSettings as SkyLayer);
      } catch (e) {
        console.error(e);
      }
    }
    if (!map.current?.getLayer("currentPosition")) {
      try {
        map.current?.addLayer(currenPositionLayerSettings as SkyLayer);
      } catch (e) {
        console.error(e);
      }
    }

    const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);

    coordinates.map((coord) => bounds.extend(coord));

    map.current.fitBounds(bounds, {
      padding: 50,
    });

    map.current.resize();
  }, [coordinates, isMapLoaded, selection]);

  React.useEffect(() => {
    if (!map || !map.current) {
      return;
    }
    if (map.current !== undefined) {
      const geojsonSource = map.current.getSource(
        "currentPosition"
      ) as GeoJSONSource;
      if (!geojsonSource) {
        return;
      }

      if (markerCoordinates) {
        geojsonSource.setData({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { name: "Null Island" },
              geometry: {
                type: "Point",
                coordinates: markerCoordinates?.c,
              },
            },
          ],
        });
      }
    }
  }, [markerCoordinates]);

  React.useEffect(() => {
    if ((map && map.current) || !mapContainerRef.current) {
      return () => {};
    }

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: process.env.MAPBOX_TOKEN ? process.env.MAPBOX_TOKEN : token,
      style: "mapbox://styles/saegey/clkjy1fdl004x01oh25lhe0iz",
      center: coordinates[0],
      zoom: 14,
      scrollZoom: false,
      boxZoom: true,
      doubleClickZoom: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    map.current.once("load", () => {
      setIsMapLoaded(true);
      // console.log('customMap - once load hook');
    });

    // Create a 'LngLatBounds' with both corners at the first coordinate.
    const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);

    coordinates.map((coord) => bounds.extend(coord));

    map.current.fitBounds(bounds, {
      padding: 50,
    });
    map.current.resize();

    if (map.current) {
      return () => {
        map.current?.remove();
      };
    } else {
      return () => {};
    }
  }, []);

  return (
    <Box
      ref={mapContainerRef}
      sx={{
        width: "100%",
        borderRadius: [0, "5px", "5px"],
        height: ["300px", "450px", "450px"],
      }}
    />
  );
};

export default Map;
