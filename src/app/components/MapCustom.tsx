import { DirectionsRenderer, DrawingManager, GoogleMap, Marker, OverlayView, Polygon, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { MapConfig, MAP_LIBRARY, optionsPolygonDefault, polygonOptionsDefault, POSITION_LABEL_MAKER_SELECTED, POSITION_LABEL_POLYGON_SELECTED, REACT_APP_MAP_KEY_API } from 'app/utils/common/constants';
import { Coord } from 'app/utils/common/models';
import { getPixelPositionOffset, _inArrayPolygonDefinitions, _inArrayPolylineDefinitions, _outArrayPolygonDefinitions } from 'app/utils/helpers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap-v5';

type Props = {
  type?: number;
  data?: any;
  onlyView?: boolean;
  updateCoordData?: () => void;
  openModalPointInfo?: () => void;
}

const formattedOrigin = { lat: 20.969610, lng: 105.832224 };
const formattedDestination = { lat: 20.971678, lng: 105.837516 };

const MapCustom: React.FC<Props> = ({ type, data, onlyView, updateCoordData, openModalPointInfo }) => {
  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: (REACT_APP_MAP_KEY_API || ""), libraries: MAP_LIBRARY })
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: MapConfig.Saudi.Lat, lng: MapConfig.Saudi.Lng });
  const [polygonCoords, setPolygonCoords] = useState<Coord[]>([]);
  const [polylineCoords, setPolylineCoords] = useState<Coord[]>([]);
  const [markerCoord, setMarkerCoord] = useState<Coord | null>(null);
  // display direction  
  let [directions, setDirections] = useState<any>("");
  useEffect(() => {
    if (!isLoaded) return;
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: formattedOrigin,
        destination: formattedDestination,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [isLoaded])



  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenerPolygonsRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const listenerPolylinesRef = useRef<any[]>([]);

  const onMapLoad = useCallback(function callback(map) {
    setMap(map)
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  const onEditPolygon = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef?.current
        .getPath()
        .getArray()
        .map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPolygonCoords(nextPath);
    }
  }, [setPolygonCoords]);

  const onEditPolyline = useCallback(() => {
    if (polylineRef.current) {
      const nextPath = polylineRef?.current
        .getPath()
        .getArray()
        .map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPolylineCoords(nextPath);
    }
  }, [setPolylineCoords]);

  // Bind refs to current Polygon and listeners
  const onLoadPolygon = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path: any = polygon.getPath();
      listenerPolygonsRef.current.push(
        path.addListener("set_at", onEditPolygon),
        path.addListener("insert_at", onEditPolygon),
        path.addListener("remove_at", onEditPolygon)
      );
    },
    [onEditPolygon]
    // updateValueMapArea(nextPath);
  );

  const onLoadPolyline = useCallback(
    polyline => {
      polylineRef.current = polyline;
      const path: any = polyline.getPath();
      listenerPolylinesRef.current.push(
        path.addListener("set_at", onEditPolyline),
        path.addListener("insert_at", onEditPolyline),
        path.addListener("remove_at", onEditPolyline)
      );
    },
    [onEditPolyline]
    // updateValueMapArea(nextPath);
  );

  // Clean up refs
  const onUnmountPolygon = useCallback(() => {
    listenerPolygonsRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

  const onUnmountPolyline = useCallback(() => {
    listenerPolylinesRef.current.forEach((lis: any) => lis.remove());
    polylineRef.current = null;
  }, []);


  const onPolygonComplete = (polygon: any) => {
    polygon.setMap(null);
    let shape = _inArrayPolygonDefinitions(polygon);
    let _polygon = _outArrayPolygonDefinitions(shape);
    console.log(_polygon);
    setPolygonCoords(_polygon);
    // updateValueMapArea(_polygon);
  }

  const onPolylineComplete = (polyline: any) => {
    polyline.setMap(null);
    let shape = _inArrayPolylineDefinitions(polyline);
    let _polyline = _outArrayPolygonDefinitions(shape);
    setPolylineCoords(_polyline)
  }


  const onMarkerComplete = (marker: any) => {
    marker.setMap(null);
    const value = {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng()
    };
    setMarkerCoord(value);
  }

  const renderMarker = (markerCoord: Coord, index: number) => {
    return (
      <div key={`${index}${Math.random()}`}>
        <Marker
          position={markerCoord}
          icon={"https://homeet.s3.ap-southeast-1.amazonaws.com/statics/marker-purple.png"}
          onClick={() => {
            openModalPointInfo?.();
          }}
        />
        <OverlayView
          position={markerCoord}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(x, y) => getPixelPositionOffset(POSITION_LABEL_MAKER_SELECTED.x, POSITION_LABEL_MAKER_SELECTED.y, { x: -70, y: -35 })}>
          <div className="overlay-view-default" onClick={() => { }}>
            {'Event Name'}
          </div>
        </OverlayView>
      </div>
    )
  }

  return (!isLoaded ? <></> :
    <>
      <div className='wrapper-googlemap'>
        <div className='clear-render-googleamap'>
          <Button variant='' className='btn btn-dark btn-sm' onClick={() => { }}>
            Clear
          </Button>
        </div>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={MapConfig.Zoom}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
          options={{ streetViewControl: true, clickableIcons: true, mapTypeControl: true }}
        >
          {!onlyView && <DrawingManager
            onPolygonComplete={onPolygonComplete}
            onPolylineComplete={onPolylineComplete}
            onMarkerComplete={onMarkerComplete}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  window.google.maps.drawing.OverlayType.POLYGON,
                  window.google.maps.drawing.OverlayType.POLYLINE,
                  window.google.maps.drawing.OverlayType.MARKER
                ],
              },
              polygonOptions: polygonOptionsDefault
            }}
          />}
          {/* Direction  */}
          {
            directions && (<DirectionsRenderer directions={directions} />)
          }

          {/* Marrker  */}
          {markerCoord && (renderMarker(markerCoord, 0))}
          {/* Polygon  */}
          {polygonCoords && polygonCoords.length > 0 && (
            <>
              <Polygon
                onLoad={onLoadPolygon}
                onMouseUp={onEditPolygon}
                onDragEnd={onEditPolygon}
                onUnmount={onUnmountPolygon}
                path={polygonCoords}
                editable={!onlyView}
                draggable={!onlyView}
                options={optionsPolygonDefault}
              />
              <OverlayView
                key='Polygon'
                position={polygonCoords[1]}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(x, y) => getPixelPositionOffset(POSITION_LABEL_POLYGON_SELECTED.x, POSITION_LABEL_POLYGON_SELECTED.y, { x: 0, y: 0 })}>
                <div className={"overlay-view-default"}>
                  {'Event Name'}
                </div>
              </OverlayView>
            </>
          )}
          {/* Polyline  */}
          {polylineCoords && polylineCoords.length > 0 && (
            <>
              <Polyline
                onLoad={onLoadPolyline}
                onMouseUp={onEditPolyline}
                onDragEnd={onEditPolyline}
                onUnmount={onUnmountPolyline}
                path={polylineCoords}
                editable={!onlyView}
                draggable={!onlyView}
                options={optionsPolygonDefault}
              />
              <OverlayView
                key='Polyline'
                position={polylineCoords[1]}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(x, y) => getPixelPositionOffset(POSITION_LABEL_POLYGON_SELECTED.x, POSITION_LABEL_POLYGON_SELECTED.y, { x: 0, y: 0 })}>
                <div className={"overlay-view-default"}>
                  {'Event Name'}
                </div>
              </OverlayView>
            </>
          )}
        </GoogleMap>
      </div>
    </>
  )
}

export { MapCustom };