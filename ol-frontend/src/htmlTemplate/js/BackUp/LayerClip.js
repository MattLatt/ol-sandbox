/**
  * @constructor
  * @extends {ol.control.Control}
  * @param {Object=} opt_options Control options.
  */

class clippedTile extends ol.layer.Tile {

	/**
	* @constructor
	* @extends {ol.control.Control}
	* @param {Object=} opt_options Control options.
	*/
	constructor(clipGeom, style) {
	super();
	this.clipGeom = clipGeom;
	this.style = style;
	}

	//Before compositing layer, perform clip with geometry
	on('precompose', function(event) {
		var vecCtx = event.vectorContext;
		var ctx = event.context;
		ctx.save();
		
		vecCtx.setStyle(this.style);
		vecCtx.drawGeometry(this.smpClip);
		ctx.clip();
	})	


	laySMP.on('postcompose', function(event) {
		var ctx = event.context;
		ctx.restore();
	})

}
