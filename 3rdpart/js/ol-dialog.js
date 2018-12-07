
ol.control.Dialog = function (opt_options) {

  var options = opt_options ? opt_options : {};

  var className = options.className !== undefined ? options.className : 'ol-dialog';
  
  this.initLayout_(opt_options);

  /**
   * @private
   * @type {?olx.ViewState}
   */
  this.viewState_ = null;

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
  
  var render = options.render ? options.render : ol.control.Dialog.render;

  ol.control.Control.call(this, {
    element: this.element_,
    render: render,
    target: options.target
  });
    

};

ol.inherits(ol.control.Dialog, ol.control.Control);
//ol.inherits(ol.control.Dialog, ol.Observable);


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

/*  
  var html ="HTML<br>HTML";
  
  if (this.renderedHTML_ != html) {
    this.innerElement_.innerHTML = html;
    this.renderedHTML_ = this.contentsElement_.innerHTML;
  }
*/
  if (!this.renderedVisible_) {
    this.element_.style.display = '';
    this.renderedVisible_ = true;
  }

};

/**
 * @private
 */
ol.control.Dialog.prototype.initLayout_ = function(opt_options) {

    var options = opt_options ? opt_options : {};

    var className = options.className !== undefined ? options.className : 'ol-dialog';

/*
    var stop = L.DomEvent.stopPropagation;
    L.DomEvent.on(container, "click", stop)
      .on(container, "mousedown", stop)
      .on(container, "touchstart", stop)
      .on(container, "dblclick", stop)
      .on(container, "mousewheel", stop)
      .on(container, "contextmenu", stop)
      .on(container, "MozMousePixelScroll", stop);
*/
    
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
  this.grabberElement_ = document.createElement('DIV');
  this.grabberElement_.className = className + '-grabber';
  var grabberIcon = document.createElement('I');
  grabberIcon.className = 'fa fa-arrows-alt';
  this.grabberElement_.appendChild(grabberIcon);

/* 
  var grabberNode = (this._grabberNode = L.DomUtil.create(
      "div",
      className + "-grabber"
    ));
  
  var grabberIcon = L.DomUtil.create("i", "fa fa-arrows");
    grabberNode.appendChild(grabberIcon);

    L.DomEvent.on(grabberNode, "mousedown", this._handleMoveStart, this);
*/
    
  /**
   * @private
   * @type {Element}
   */
  this.closeElement_ = document.createElement('DIV');
  this.closeElement_.className = className + '-close';
  var closeIcon = document.createElement('I');
  closeIcon.className =  'fa fa-times';
  this.closeElement_.appendChild(closeIcon);
  this.closeElement_.addEventListener ('click', this.close.bind(this), false);

  
  /**
   * @private
   * @type {Element}
   */
  this.resizerElement_ = document.createElement('DIV');
  this.resizerElement_.className = className + '-resizer';
  var resizeIcon = document.createElement('I' );
  //resizeIcon.className = 'fa fa-angle-double-right fa-rotate-45';
  resizeIcon.className = 'fa fa-arrows-alt-h fa-rotate-45';  
  this.resizerElement_.appendChild(resizeIcon);
      
/*    
    var resizerNode = (this._resizerNode = L.DomUtil.create(
      "div",
      className + "-resizer"
    ));
    var resizeIcon = L.DomUtil.create("i", "fa fa-arrows-h fa-rotate-45");
    resizerNode.appendChild(resizeIcon);

    L.DomEvent.on(resizerNode, "mousedown", this._handleResizeStart, this);

*/   

 /**
   * @private
   * @type {Element}
   */
  this.contentsElement_ = document.createElement('DIV');
  this.contentsElement_.className = className + '-contents';

/*  
    var contentNode = (this._contentNode = L.DomUtil.create(
      "div",
      className + "-contents"
    ));
*/ 
  
  /**
   * @private
   * @type {Element}
   */
  this.element_ = document.createElement('DIV');
  this.element_.className = className + ' ol-selectable';
   
     
  this.element_.style.width = options.size[0] + "px";
  this.element_.style.height = options.size[1] + "px";

  this.element_.style.top = options.anchor[0] + "px";
  this.element_.style.left = options.anchor[1] + "px";       
    
  
  this.innerElement_.appendChild(this.contentsElement_);
  this.innerElement_.appendChild(this.grabberElement_);
  this.innerElement_.appendChild(this.closeElement_);
  this.innerElement_.appendChild(this.resizerElement_);

  this.element_.appendChild(this.innerElement_);  
/*
  for (var i = 0; i < this.innerElement_.children.length; i++) {
      var child = this.innerElement_.children[i];
      console.log(child.tagName + ' - ' + child.className );
      for (var j = 0; i < child.children.length; i++) {
        console.log(child.children[j].tagName + ' - ' + child.children[j].className );
      }
  }
*/  
  
  //this._oldMousePos = { x: 0, y: 0 };    
    
};


ol.control.Dialog.prototype.close = function() {
    this.element_.style.visibility = "hidden";
    
    this.dispatchEvent({ type:'change:active', key:'active', oldValue:false, active:true });

    //this.dispatchEvent({ type:'dialog:close', key:'close', oldValue:'open', active:true });


  };

