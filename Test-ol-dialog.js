var dlgInfoControl = new ol.control.Dialog({
  size: [300,300],
  anchor: [250,250],
  minSize: [ 100, 100 ],
  maxSize: [ 350, 350 ],
});

  
var map = new ol.Map({
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen(),
    dlgInfoControl
  ]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [600000.0, 5850000.0],
    zoom: 6
  })
});