qgSvg.prototype.keyNavListener = function(e){
	var instance = e.data;
	var x = e.which == 37 ? -1 : e.which===39 ? +1 : 0;
	var y = e.which == 38 ? -1 : e.which===40 ? +1 : 0;
	if(x!==0||y!==0){
		if(e.shiftKey){ x*=10;y*=10; } 
		instance.Selected.each(function(){
			var shape = $(this).qgSvg();
			var pos = shape.pos();
			shape.pos( pos.x+x, pos.y+y );
		});
		instance.Selected.length && instance.fire('modify');
		e.preventDefault();
	}
};
qgSvg.prototype.keyNavEnable = function(){
	this.wrapper.on('keydown',this,this.keyNavListener);
};
qgSvg.prototype.keyNavDisable = function(){
	this.wrapper.off('keydown',this.keyNavListener);
};
qgSvg.on('init',function(instance){
	instance.keyNavEnable();
	instance.on('select',function(){
		instance.wrapper.focus();
	});
});
