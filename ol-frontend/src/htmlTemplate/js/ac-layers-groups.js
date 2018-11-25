/**
  * @Groups : Definition of the 'archives'
  * group with all AtlasCity SMPs
  ****************************************/
 var grpArchivesSMP = new ol.layer.Group({
    title: 'Achives AtlasCity',
    layers: [ smpParis1942/*, smpParis1998, smpParis1999, smpParis2000, 
        smpIDF2002, smpIDF2005, smpPC2008, smpPC2012, smpIDF2014*/]
})

/**
  * @Groups : Declaration of the group 
  * containin only raster maps layers
  **************************************/
 var grpCarto = new ol.layer.Group({
    title: 'Groupe Carto',
  layers: [ layCarto ]
});

/**
  * @Groups : Declaration of the overlay group 
  * containin only raster labels layers displayed 
  * over the imagery group
  **************************************/
var grpImgOverlay = new ol.layer.Group({
    title: 'Texte sur Photos',
      visible: false,
  layers: [ bordersOverlay, roadsOverlay ]
});

/**
  * @Groups : Declaration of the Imagery group 
  * containin only raster aerial data layers
  **************************************/
var grpImagery = new ol.layer.Group({
  title: 'Groupe Photos',
  layers: [ 
    layImagery,
    smpLatest,
    smpParis1942,
    grpImgOverlay  
  ]
});

