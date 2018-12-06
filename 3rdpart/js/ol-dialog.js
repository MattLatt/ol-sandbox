
ol.control.Dialog = function (opt_options) {

  var options = opt_options ? opt_options : {};

  var className = options.className !== undefined ? options.className : 'ol-dialog';

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
  this.element_.className = className + ' ol-selectable';
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
  this.renderedVisible_ = true;

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
  this.coordprojection_ = options.coordproj || 'EPSG:3857' 
  
  var render = options.render ? options.render : ol.control.Dialog.render;

  ol.control.Control.call(this, {
    element: this.element_,
    render: render,
    target: options.target
  });
    

};

ol.inherits(ol.control.Dialog, ol.control.Control);



/**
 * Update the view info element.
 * @param {ol.MapEvent} mapEvent Map event.
 * @this {ol.control.ViewInfo}
 * @api
 */
ol.control.Dialog.render = function(mapEvent) {
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
ol.control.Dialog.prototype.updateElement_ = function() {
  var viewState = this.viewState_;

  if (!viewState) {
    if (this.renderedVisible_) {
      this.element_.style.display = 'none';
      this.renderedVisible_ = false;
    }
    return;
  }

  
  var html ="qsdqdqdqsdqsqsdqs\ndqsdqdsqqddqdsqddsqds";
  
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

