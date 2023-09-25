import React from 'react';
import { Box } from 'theme-ui';
import mapboxgl, { GeoJSONSource, SkyLayer } from 'mapbox-gl';

type ActivityEvent = {
  c: Array<number>;
  t: number | null;
  g: number;
  d: number;
  e: number | null;
};

interface MapProps {
  coordinates: Array<any>;
  markerCoordinates: ActivityEvent;
  token: string;
}

const routeLayerSettings = {
  id: 'routelayer',
  type: 'line',
  source: 'route',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': 'blue',
    'line-width': 2,
  },
};

const currenPositionLayerSettings = {
  id: 'currentPosition',
  type: 'circle',
  source: 'currentPosition',
  layout: {
    visibility: 'visible',
  },
  paint: {
    'circle-radius': 6,
    'circle-color': 'black',
    'circle-stroke-color': 'white',
    'circle-stroke-width': 2,
  },
};

const Map = ({
  coordinates,
  markerCoordinates,
  token,
}: MapProps): JSX.Element => {
  const mapContainerRef = React.useRef();
  const map = React.useRef<mapboxgl.Map>();
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!map || !map.current) {
      return;
    }
    const geojsonSource = map.current?.getSource('route') as GeoJSONSource;
    if (!geojsonSource) {
      console.log('customMap - source is mssing, add sourcee', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      });
      map.current?.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      });
    } else {
      console.log('customMap - updatee source');
      try {
        const data = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
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

    if (!map.current.getSource('currentPosition')) {
      map.current?.addSource('currentPosition', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
    }
    // console.log(
    //   map.current?.getLayer('routelayer'),
    //   map.current?.getLayer('currentPosition')
    // );
    if (!map.current?.getLayer('routelayer')) {
      try {
        map.current?.addLayer(routeLayerSettings as SkyLayer);
        // console.log('routeLayerSettings - add');
      } catch (e) {
        console.error(e);
      }
    }
    if (!map.current?.getLayer('currentPosition')) {
      try {
        map.current?.addLayer(currenPositionLayerSettings as SkyLayer);
        // console.log('currenPositionLayerSettings - add');
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
  }, [coordinates, isMapLoaded]);

  React.useEffect(() => {
    if (!map || !map.current) {
      return;
    }
    if (map.current !== undefined) {
      const geojsonSource = map.current.getSource(
        'currentPosition'
      ) as GeoJSONSource;
      if (!geojsonSource) {
        return;
      }

      geojsonSource.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { name: 'Null Island' },
            geometry: {
              type: 'Point',
              coordinates: markerCoordinates?.c,
            },
          },
        ],
      });
    }
  }, [markerCoordinates]);

  React.useEffect(() => {
    if ((map && map.current) || !mapContainerRef.current) {
      return () => {};
    }

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: process.env.MAPBOX_TOKEN ? process.env.MAPBOX_TOKEN : token,
      style: 'mapbox://styles/saegey/clkjy1fdl004x01oh25lhe0iz',
      center: coordinates[0],
      zoom: 14,
      scrollZoom: false,
      boxZoom: true,
      doubleClickZoom: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.once('load', () => {
      setIsMapLoaded(true);
      console.log('customMap - once load hook');
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
        console.log('map destroy');
      };
    } else {
      return () => {
        console.log('map destroy empty');
      };
    }
  }, []);

  return (
    <Box
      ref={mapContainerRef}
      sx={{
        width: '100%',
        borderRadius: [0, '5px', '5px'],
        height: ['300px', '450px', '450px'],
      }}
    />
  );
};

export default Map;
