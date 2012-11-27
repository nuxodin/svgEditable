qgSvg.prototype.toFront = function(el){
    var changed = 0;
	el.each(function(){
        changed = this.nextElementSibling && $(this).parent().append(this);
	});
	changed && this.fire('modify','toFront');
};

/* always to front
qgSvg.prototype.on('init',function(){
    var self = this;
    self.on('select',function(el){
    	if(self.opt.onSelectFront){
    		setTimeout(function(){ // wait for possible dblclick before change
    			self.toFront(self.Selected);
    		},400);
    	}
    });
});
*/

/* to Front if not moved  */
qgSvg.on('init',function(svg){
    var self = svg, shape = null, startX, startY, doc = $(document);
	var move = function(e){
    	if(e.pageX!==startX || e.pageY!==startY){
    		shape = null;
    	}
	};
	var up = function(){
		doc.off('mouseup',up);
		doc.off('mousemove',move);
		if(!shape){ return; }
		setTimeout(function(){ // wait for possible dblclick before change
			shape && self.toFront(shape);
		},300);
	};
	self.el.on('mousedown',function(e){
		startX = e.pageX;
		startY = e.pageY;
    	if(!self.opt.onSelectFront){ return; }
		shape = qgSvg.getShape(e.target);
		doc.on('mousemove',move);
		doc.on('mouseup',up);
	});
});


