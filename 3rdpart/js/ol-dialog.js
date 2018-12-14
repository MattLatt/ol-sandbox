
ol.control.Dialog = function (opt_options) {

  this.options_ = opt_options ? opt_options : {};

  var className = this.options_.className !== undefined ? this.options_.className : 'ol-dialog';
  

  
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
   * @type {Array of number|undefined}
   */

  var initPos = this.options_.anchor !== undefined ? this.options_.anchor : null;
    
  
  this._oldMousePos  = initPos;
  
  
  /**
   * @private
   * @type {string}
   */
  this.renderedHTML_ = '';
  
  var render = this.options_.render ? this.options_.render : ol.control.Dialog.render;

  ol.control.Control.call(this, {
    element: this.element_,
    render: render,
    target: this.options_.target
  });

  /*
  ol.interaction.Pointer.call(this, {
    handleDownEvent: this.moveStart,
    handleDragEvent: this.mouseMove,
    handleMoveEvent: null,
    handleUpEvent: this.mouseUp
  });  
*/
};

ol.inherits(ol.control.Dialog, ol.control.Control);
//ol.inherits(ol.control.Dialog, ol.interaction.Pointer);
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
ol.control.Dialog.prototype.initLayout_ = function() {


    var className = this.options_.className !== undefined ? this.options_.className : 'ol-dialog';

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
//   this.grabberElement_.addEventListener ('mousedown', this.moveStart.bind(this), false);
//   this.grabberElement_.addEventListener ('mousemove', this.mouseMove.bind(this), false);
//   this.grabberElement_.addEventListener ('mouseup', this.mouseUp.bind(this), false);

  /*
  this.grabberElement_.addEventListener ('click', function() {
        console.log('click');
  });

  this.grabberElement_.addEventListener ('movestart', function() {
        console.log('movestart');
  });
  this.grabberElement_.addEventListener ('moveend', function() {
        console.log('moveend');
  });
  this.grabberElement_.addEventListener ('mousedown', function() {
        console.log('mousedown');
  });
  this.grabberElement_.addEventListener ('mouseup', function() {
        console.log('mouseup');
  });	
  this.grabberElement_.addEventListener ('mousemove', function() {
        console.log('mousemove');	
  });
  this.grabberElement_.addEventListener ('pointerdrag', function() {
        console.log('pointerdrag');
  });
  this.grabberElement_.addEventListener ('dblclick', function() {
        console.log('dblclick');
  });
*/
  

  this.grabberElement_.addEventListener ('pointerdrag', function() {
        console.log('grabberElement_ -> pointerdrag');
  });
  this.grabberElement_.addEventListener ('pointermove', function() {
        console.log('grabberElement_ -> pointermove');
  });

  this.grabberElement_.addEventListener ('drag', function() {
        console.log('grabberElement_ -> drag');
  });
  this.grabberElement_.addEventListener ('dragstart', function() {
        console.log('grabberElement_ -> dragstart');
  });
  this.grabberElement_.addEventListener ('dragend', function() {
        console.log('grabberElement_ -> dragend');
  });  

  
    
  this.grabberElement_.addEventListener ('mouseout', function() {
        console.log('mouseout');
  });
  this.grabberElement_.addEventListener ('mouseenter', function() {
        console.log('mouseenter');
  });
  this.grabberElement_.addEventListener ('mouseleave', function() {
        console.log('mouseleave');
  });  
 
  
/* 
 * 
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
  this.element_.className = className ;//+ ' ol-selectable';
   
  

  this.element_.addEventListener ('pointerdrag', function() {
        console.log('this.element_ -> pointerdrag');
  });
  this.element_.addEventListener ('drag', function() {
        console.log('this.element_ -> drag');
  });
  this.element_.addEventListener ('dragstart', function() {
        console.log('this.element_ -> dragstart');
  });
  this.element_.addEventListener ('dragend', function() {
        console.log('this.element_ -> dragend');
  });  
  
  
     
  this.element_.style.width = this.options_.size[0] + "px";
  this.element_.style.height = this.options_.size[1] + "px";

  this.element_.style.top = this.options_.anchor[0] + "px";
  this.element_.style.left = this.options_.anchor[1] + "px";       
    
  
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


/**
 * Close the dilaog element.
 * @param {ol.x} .
 * @this {ol.control.Dialog}
 * @api
 */
ol.control.Dialog.prototype.close = function() {
    this.element_.style.visibility = "hidden";
    
    this.dispatchEvent({ type:'change:active', key:'active', oldValue:false, active:true });
  };
 

/**
 * Close the dilaog element.
 * @param {ol.x} .
 * @this {ol.control.Dialog}
 * @api
 */
ol.control.Dialog.prototype.moveStart= function(e) {
    this._oldMousePos[0] = e.clientX;
    this._oldMousePos[1] = e.clientY;

    console.log("moveStart @("+this._oldMousePos[0]+", "+this._oldMousePos[1]+")");
    
    //L.DomEvent.on(this._map, "mousemove", this._handleMouseMove, this);
    //L.DomEvent.on(this._map, "mouseup", this._handleMouseUp, this);

    //this._map.fire("dialog:movestart", this);
    this._moving = true;
};  
  

/**
 * Close the dilaog element.
 * @param {ol.x} .
 * @this {ol.control.Dialog}
 * @api
 */

ol.control.Dialog.prototype.mouseMove= function(e) {
    var diffX = e.clientX - this._oldMousePos[0],
      diffY = e.clientY - this._oldMousePos[1];

    console.log("mouseMove of ("+diffX+", "+diffY+")");      
      

/*    if (this._resizing) {
      this._resize(diffX, diffY);
    }
*/
    if (this._moving) {
      this.move(diffX, diffY);
    }
};

/**
 * Close the dilaog element.
 * @param {ol.x} .
 * @this {ol.control.Dialog}
 * @api
 */
ol.control.Dialog.prototype.mouseUp= function() {
    //L.DomEvent.off(this._map, "mousemove", this._handleMouseMove, this);
    //L.DomEvent.off(this._map, "mouseup", this._handleMouseUp, this);
/*
    if (this._resizing) {
      this._resizing = false;
      this._map.fire("dialog:resizeend", this);
    }
*/
    console.log('stopMove');
    if (this._moving) {
      console.log('_moving = false');
      this._moving = false;
      //this._map.fire("dialog:moveend", this);
    }
};

/**
 * Close the dilaog element.
 * @param {ol.x} .
 * @this {ol.control.Dialog}
 * @api
 */
ol.control.Dialog.prototype.move= function(diffX, diffY) {
    var newY = this.options_.anchor[0] + diffY;
    var newX = this.options_.anchor[1] + diffX;

    this.options_.anchor[0] = newY;
    this.options_.anchor[1] = newX;

    this.element_.style.top = this.options_.anchor[0] + "px";
    this.element_.style.left = this.options_.anchor[1] + "px";

    //this._map.fire("dialog:moving", this);

    this._oldMousePos[0] += diffY;
    this._oldMousePos[1] += diffX;
};
  
  
