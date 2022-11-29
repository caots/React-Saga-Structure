export const _inArrayPolygonDefinitions = (myPolygon: any) => {
	let pointStr = '';
	let len = myPolygon.getPath().getLength();
	for (let i = 0; i < len; i++) {
		pointStr += `${myPolygon.getPath().getAt(i).lng()} ${myPolygon.getPath().getAt(i).lat()},`;
	}
	pointStr += `${myPolygon.getPath().getAt(0).lng()} ${myPolygon.getPath().getAt(0).lat()}`;
	return pointStr;
};

export const _inArrayPolylineDefinitions = (myPolygon: any) => {
	let pointStr = '';
	let len = myPolygon.getPath().getLength();
	for (let i = 0; i < len; i++) {
		pointStr += `${myPolygon.getPath().getAt(i).lng()} ${myPolygon.getPath().getAt(i).lat()},`;
	}
	return pointStr.slice(0, pointStr.length - 1);
};

export const _outArrayPolygonDefinitions = (polygon = '') => {
	let points = polygon.split(',');
	const pointsObj: any[] = [];
	points.forEach((point) => {
		let latLong = point.split(' ');
		let pointObj = {
			lng: parseFloat(latLong[0]),
			lat: parseFloat(latLong[1])
		}
		pointsObj.push(pointObj);
	});

	return pointsObj;
};
export const polygonsCenter = (polygon = '') => {
	let bounds = new window.google.maps.LatLngBounds();
	let points = polygon.split(',');
	points.forEach((point) => {
		let latLong = point.split(' ');
		let ll = new window.google.maps.LatLng(parseFloat(latLong[1]), parseFloat(latLong[0]));
		bounds.extend(ll);
	});
	return bounds;
}

export const getPixelPositionOffset = (offsetWidth: number, offsetHeight: number, labelAnchor: any) => {
	return {
		x: offsetWidth + labelAnchor.x,
		y: offsetHeight + labelAnchor.y,
	};
};
