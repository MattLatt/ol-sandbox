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
 * Set the units to use in the view info.
 * @param {ol.control.ScaleLineUnits} units The units to use in the view info.
 * @observable
 * @api
 */
ol.control.ViewInfo.prototype.setUnits = function(units) {
  this.set(ol.control.ViewInfo.Property_.UNITS, units);
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
  var projection = viewState.projection;
  var units = this.getUnits();
  var pointResolutionUnits = units == ol.control.ScaleLineUnits.DEGREES ?
    ol.proj.Units.DEGREES :
    ol.proj.Units.METERS;
  var pointResolution =
      ol.proj.getPointResolution(projection, viewState.resolution, center, pointResolutionUnits);
  if (units != ol.control.ScaleLineUnits.DEGREES) {
    pointResolution *= projection.getMetersPerUnit();
  }

  var nominalCount = this.minWidth_ * pointResolution;
  var suffix = '';
  if (units == ol.control.ScaleLineUnits.DEGREES) {
    var metersPerDegree = ol.proj.METERS_PER_UNIT[ol.proj.Units.DEGREES];
    if (projection.getUnits() == ol.proj.Units.DEGREES) {
      nominalCount *= metersPerDegree;
    } else {
      pointResolution /= metersPerDegree;
    }
    if (nominalCount < metersPerDegree / 60) {
      suffix = '\u2033'; // seconds
      pointResolution *= 3600;
    } else if (nominalCount < metersPerDegree) {
      suffix = '\u2032'; // minutes
      pointResolution *= 60;
    } else {
      suffix = '\u00b0'; // degrees
    }
  } else if (units == ol.control.ScaleLineUnits.IMPERIAL) {
    if (nominalCount < 0.9144) {
      suffix = 'in';
      pointResolution /= 0.0254;
    } else if (nominalCount < 1609.344) {
      suffix = 'ft';
      pointResolution /= 0.3048;
    } else {
      suffix = 'mi';
      pointResolution /= 1609.344;
    }
  } else if (units == ol.control.ScaleLineUnits.NAUTICAL) {
    pointResolution /= 1852;
    suffix = 'nm';
  } else if (units == ol.control.ScaleLineUnits.METRIC) {
    if (nominalCount < 0.001) {
      suffix = 'μm';
      pointResolution *= 1000000;
    } else if (nominalCount < 1) {
      suffix = 'mm';
      pointResolution *= 1000;
    } else if (nominalCount < 1000) {
      suffix = 'm';
    } else {
      suffix = 'km';
      pointResolution /= 1000;
    }
  } else if (units == ol.control.ScaleLineUnits.US) {
    if (nominalCount < 0.9144) {
      suffix = 'in';
      pointResolution *= 39.37;
    } else if (nominalCount < 1609.344) {
      suffix = 'ft';
      pointResolution /= 0.30480061;
    } else {
      suffix = 'mi';
      pointResolution /= 1609.3472;
    }
  } else {
    ol.asserts.assert(false, 33); // Invalid units
  }

  var i = 3 * Math.floor(
      Math.log(this.minWidth_ * pointResolution) / Math.log(10));
  var count, width;
  while (true) {
    count = ol.control.ViewInfo.LEADING_DIGITS[((i % 3) + 3) % 3] *
        Math.pow(10, Math.floor(i / 3));
    width = Math.round(count / pointResolution);
    if (isNaN(width)) {
      this.element_.style.display = 'none';
      this.renderedVisible_ = false;
      return;
    } else if (width >= this.minWidth_) {
      break;
    }
    ++i;
  }

  var html = count + ' ' + suffix+ '<br> Centre X= <br> Centre Y=';
  if (this.renderedHTML_ != html) {
    this.innerElement_.innerHTML = html;
    this.renderedHTML_ = html;
  }

  if (this.renderedWidth_ != width) {
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

