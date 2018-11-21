/**
 * Units for the scale line. Supported values are `'degrees'`, `'imperial'`,
 * `'nautical'`, `'metric'`, `'us'`.
 * @enum {string}
 */
ol.control.ScaleLineUnits = {
  DEGREES: 'degrees',
  IMPERIAL: 'imperial',
  NAUTICAL: 'nautical',
  METRIC: 'metric',
  US: 'us'
};


ol.control.ViewInfo = function (opt_options) {

  var options = opt_options ? opt_options : {};

  var className = options.className !== undefined ? options.className : 'ol-view-info';

  /**
   * @private
   * @type {Element}
   */
  this.innerElement_ = document.createElement('DIV');
  this.innerElement_.className = className + '-inner';

  /**
   * @private
   * @type {Element}
   */
  this.element_ = document.createElement('DIV');
  this.element_.className = className + ' ol-unselectable';
  this.element_.appendChild(this.innerElement_);

  /**
   * @private
   * @type {?olx.ViewState}
   */
  this.viewState_ = null;

  /**
   * @private
   * @type {number}
   */
  this.minWidth_ = options.minWidth !== undefined ? options.minWidth : 64;

  /**
   * @private
   * @type {boolean}
   */
  this.renderedVisible_ = false;

  /**
   * @private
   * @type {number|undefined}
   */
  this.renderedWidth_ = undefined;

  /**
   * @private
   * @type {string}
   */
  this.renderedHTML_ = '';

   /**
   * @private
   * @type {string}
   */
  this.coordsource_ = options.coordsource || 'center'
  
 
   /**
   * @private
   * @type {string}
   */
  this.coordprojection_ = options.coordproj || 'EPSG:3857' 
  
  var render = options.render ? options.render : ol.control.ViewInfo.render;

  ol.control.Control.call(this, {
    element: this.element_,
    render: render,
    target: options.target
  });
    
  
  this.setUnits(/** @type {ol.control.ScaleLineUnits} */ (options.units) ||
      ol.control.ScaleLineUnits.METRIC);    
};

ol.inherits(ol.control.ViewInfo, ol.control.Control);


/**
 * @const
 * @type {Array.<number>}
 */
ol.control.ViewInfo.LEADING_DIGITS = [1, 2, 5];


/**
 * Return the units to use in the view info.
 * @return {ol.control.ScaleLineUnits|undefined} The units to use in the view
 *     info.
 * @observable
 * @api
 */
ol.control.ViewInfo.prototype.getUnits = function() {
  return /** @type {ol.control.ScaleLineUnits|undefined} */ (
    this.get(ol.control.ViewInfo.Property_.UNITS));
};

/**
 * Return the projection to use in the view info.
 * @return {string} The proj to use in the view info.
 * @observable
 * @api
 */
ol.control.ViewInfo.prototype.getProj= function() {
  return /** @type {ol.control.ScaleLineUnits|undefined} */ (
    this.get(ol.control.ViewInfo.Property_.COORDPROJ));
};


/**
 * Update the view info element.
 * @param {ol.MapEvent} mapEvent Map event.
 * @this {ol.control.ViewInfo}
 * @api
 */
ol.control.ViewInfo.render = function(mapEvent) {
  var frameState = mapEvent.frameState;
  if (!frameState) {
    this.viewState_ = null;
  } else {
    this.viewState_ = frameState.viewState;
  }
  this.updateElement_();
};


/**
 * @private
 */
ol.control.ViewInfo.prototype.handleUnitsChanged_ = function() {
  this.updateElement_();
};


/**
 * @private
 */
ol.control.ViewInfo.prototype.handleProjectionChanged_ = function() {
  this.updateElement_();
};


/**
 * Set the units to use in the view info.
 * @param {ol.control.ScaleLineUnits} units The units to use in the view info.
 * @observable
 * @api
 */
ol.control.ViewInfo.prototype.setUnits = function(units) {
  this.set(ol.control.ViewInfo.Property_.UNITS, units);
};


/**
 * Set the units to use in the view info.
 * @param {string} projection The proj to use in the view info.
 * @observable
 * @api
 */
ol.control.ViewInfo.prototype.setProjection = function(proj) {
  this.set(ol.control.ViewInfo.Property_.COORDPROJ, proj);
};


/**
 * @private
 */
ol.control.ViewInfo.prototype.updateElement_ = function() {
  var viewState = this.viewState_;

  if (!viewState) {
    if (this.renderedVisible_) {
      this.element_.style.display = 'none';
      this.renderedVisible_ = false;
    }
    return;
  }

  var center = viewState.center;
  console.log('center ('+center[0]+', '+center[1]+');');
  var projection = viewState.projection;
  console.log('projection ('+projection+');');  
  var units = this.getUnits();
  console.log('units ('+units+');');  
  
  var pointResolutionUnits = (units == ol.control.ScaleLineUnits.DEGREES) ?  ol.proj.Units.DEGREES :  ol.proj.Units.METERS;
     
  console.log('pointResolutionUnits ('+pointResolutionUnits+');');  

  var pointResolution = ol.proj.getPointResolution(projection, viewState.resolution, center, pointResolutionUnits);

  console.log('pointResolution ('+pointResolution+');');  
  
  if (units != ol.control.ScaleLineUnits.DEGREES) {
    pointResolution *= projection.getMetersPerUnit();
  }
  
  var coordDisplay = ol.proj.transform(center, projection, this.coordprojection_);
  
  console.log('coordDisplay ('+coordDisplay[0]+', '+coordDisplay[1]+');');  
  
  // Retina device
  //var ratio = e.frameState.pixelRatio;
  var ratio = 1.0;
  
  var scaleMap = pointResolution*ratio*96.0/0.0254;
  scaleMap = scaleMap*96./101.6;
  var roundDigits = Math.min(Math.floor(Math.log10(scaleMap))-1., 5);
  var roundedScale=Math.round(scaleMap/Math.pow(10,roundDigits))*Math.pow(10,roundDigits);
  var roundedX=Math.round(coordDisplay[0]*100.)/100.;
  var roundedY=Math.round(coordDisplay[1]*100.)/100.;  
    
  var html= 'Env 1/'+roundedScale+'<br>';
  
  /*
  var algnLeft = '<br><p class="ol-view-info-alignleft">';
  var algnRight = '</p><p class="ol-view-info-alignright">';  
  var algnReset = '<div style="clear: both;"></div>';
    
  var coordTemplate = algnLeft +'X ('+this.coordsource_+')='+algnRight+'{x}</p>'+algnReset;
  coordTemplate = coordTemplate + algnLeft + 'Y ('+this.coordsource_+')='+algnRight+'{y}</p>';
  
  //MLA TODO tester bootstrao clearfix <div class="clearfix">...</div> https://getbootstrap.com/docs/4.0/utilities/clearfix/
  
  */
  
  var coordTemplate = 'X ('+this.coordsource_+')= {x}<br>Y ('+this.coordsource_+')= {y}';
  
  var precision = 2;
  if (units == ol.control.ScaleLineUnits.DEGREES)  {
    precision = 5
  }
  
  html = html + ol.coordinate.format(coordDisplay, coordTemplate, precision);
  
  if (this.renderedHTML_ != html) {
    this.innerElement_.innerHTML = html;
    this.renderedHTML_ = html;
  }

  //if (this.renderedWidth_ != width) {
  if (true) {
    width = 135;
    this.innerElement_.style.width = width + 'px';
    this.renderedWidth_ = width;
  }

  if (!this.renderedVisible_) {
    this.element_.style.display = '';
    this.renderedVisible_ = true;
  }

};


/**
 * @enum {string}
 * @private
 */
ol.control.ViewInfo.Property_ = {
  UNITS: 'units'
};

