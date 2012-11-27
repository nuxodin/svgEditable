qgSvg.prototype.align = function(els, $x, $y){
    var self = this;
    var rctMax = this.canvas[0].getBoundingClientRect();

	els.each(function(){
        var el = $(this);

        var rct = el[0].getBoundingClientRect();

        var diffX = 0, diffY = 0;
        if($x){
            if($x=='start'){
                diffX = rctMax.left - rct.left;
            }
            if($x=='end'){
                diffX = rctMax.right - rct.right;
            }
            if($x=='center'){
                diffX = (rctMax.right+rctMax.left)/2 - (rct.right+rct.left)/2;
            }
        }
        if($y){
            if($y=='start'){
                diffY = rctMax.top - rct.top;
            }
            if($y=='end'){
                diffY = rctMax.bottom - rct.bottom;
            }
            if($y=='center'){
                diffY = (rctMax.bottom-rctMax.top) - (rct.bottom-rct.top)
            }
        }
        var pos = el.qgSvg().pos()
        var x = 1*pos.x+diffX;
        var y = 1*pos.y+diffY;

        el.qgSvg().pos( x, y );

		var tmp;
		if( (tmp = el.qgSvg().rotate() ) ){
			el.qgSvg().rotate( tmp );
		}

	});
	this.fire('modify');
};
