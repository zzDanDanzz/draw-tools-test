/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import { Map } from "react-map-gl";
import constants from "./constants";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import DrawControl from "./draw-control";

function App() {
  const drawRef = useRef<MapboxDraw>();
  const transformRequest = useCallback((url: string) => {
    return {
      url,
      headers: {
        "x-api-key": constants.headers["x-api-key"],
      },
    };
  }, []);

  return (
    <Map
      transformRequest={transformRequest}
      hash
      initialViewState={{
        longitude: 51.414178828767945,
        latitude: 35.68490079732125,
        zoom: 11,
      }}
      mapStyle="https://dev.map.ir/vector/styles/main/mapir-xyz-light-style.json"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {
        <DrawControl
          ref={drawRef}
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
            combine_features: true,
            line_string: true,
            point: true,
            uncombine_features: true,
          }}
          position="top-right"
          onCreate={(e) => {
            console.log("onCreate", e);
          }}
          onUpdate={(e) => {
            console.log("onUpdate", e);
          }}
          onDelete={(e) => {
            console.log("onDelete", e);
          }}
          onModeChange={(e) => {
            console.log("onModeChange", e);
          }}
        />
      }
    </Map>
  );
}

export default App;
