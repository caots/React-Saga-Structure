export const MapConfig = {
    Zoom: 15,
    Saudi: {
        Lat: 20.969610,
        Lng: 105.832224
    }
}
//20.971678, 105.837516

export const DRAW_MAP_TYPE = {
  POLYGON: 1,
  POLYLINE: 2,
  MARKER: 3
}

export const REACT_APP_MAP_KEY_API = process.env.REACT_APP_MAP_KEY_API
export const MAP_LIBRARY: any = ["geometry", "drawing", "places"]

export const POSITION_LABEL_MAKER_SELECTED = {x: 40, y: -25};
export const POSITION_LABEL_POLYGON_SELECTED = {x: 0, y: 0};
export const POSITION_LABEL_LINE = {x: 0, y: -50};

export const optionsPolygonDefault = {
  fillColor: `#FFC20F`,
  strokeColor: "#a1a5b7",
  fillOpacity: 0.5,
  strokeWeight: 5,
  clickable: true,
  editable: true,
  zIndex: 1
}

export const polygonOptionsDefault = {
  fillColor: `#FFC20F`,
  fillOpacity: 0.5,
  strokeWeight: 5,
  clickable: true,
  editable: true,
  zIndex: 1
}