/* eslint-disable @typescript-eslint/no-unused-vars */
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { forwardRef, useImperativeHandle } from "react";
import { useControl } from "react-map-gl";

import { SnapPolygonMode, SnapModeDrawStyles } from "mapbox-gl-draw-snap-mode";

import type { ControlPosition } from "react-map-gl";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position: ControlPosition;
  onCreate: (evt: { features: object[] }) => void;
  onUpdate: (evt: { features: object[]; action: string }) => void;
  onDelete: (evt: { features: object[] }) => void;
  onModeChange: (evt: { features: object[] }) => void;
};

const DrawControl = forwardRef((props: DrawControlProps, ref) => {
  const { onCreate, onDelete, onUpdate, onModeChange, ...drawProps } = props;

  const draw = useControl<MapboxDraw>(
    () =>
      new MapboxDraw({
        modes: { ...MapboxDraw.modes, draw_polygon: SnapPolygonMode },
        styles: SnapModeDrawStyles,
        userProperties: true,
        // Config snapping features
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        snap: true,
        snapOptions: {
          snapPx: 15, // defaults to 15
          snapToMidPoints: true, // defaults to false
          snapVertexPriorityDistance: 0.0025, // defaults to 1.25
        },
        guides: false,

        ...drawProps,
      }),
    ({ map }) => {
      map.on("draw.create", onCreate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
      map.on("draw.modechange", onModeChange);
    },
    ({ map }) => {
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
      map.off("draw.modechange", onModeChange);
    },
    {
      position: props.position,
    }
  );

  useImperativeHandle(ref, () => draw, [draw]);

  return null;
});

export default DrawControl;
