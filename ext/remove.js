qgSvg.prototype.remove = function(el){
	var self = this;
	el = $(el);
	el.each(function(){
        var el = $(this);
		el.qgSvg().toolsElRemove();
    	self.fire('remove',el);
		self.Selected = self.Selected.not(el); // remove referenz in Selected
	});
	$(el).remove();
	this.fire('modify','remove');
};