qgSvg.prototype.canvasSize = function(vs){
	this.canvas.attr(vs);
	this.el.attr(vs);
	this.toolsEl.attr(vs);
};

qgSvg.prototype.canvasGrid = function(dim){
	var pattern = this.canvasGridGet();
	if(dim === undefined){
		return this.canvas.find('.-grid').css('display')==='none' ? false : pattern.attr('width');
	} else {
		this.canvas.find('.-grid')[dim?'show':'hide']();
		dim && pattern.attr({width:dim,height:dim});
	}
};
qgSvg.prototype.canvasOverflow = function(bool){
    this.el.css('overflow', bool ? 'hidden' : 'visible' );
};
qgSvg.prototype.canvasGridGet = function(){
    var pattern = this.canvas.find('.-pattern');
    if(!pattern[0]){
		var defs = qgSvg.el('defs').prependTo(this.canvas);
		pattern = qgSvg.el('pattern').attr({ 'class':'-pattern',id:'qgSvg_canvasGrid' ,x:0 ,y:0 ,width:10 ,height:10, transform:'scale(2)'}).prependTo(defs);
		pattern[0].setAttributeNS(null,'patternUnits','userSpaceOnUse');
        pattern.append( qgSvg.el('path').attr({d:'M0 0 L0 10 L10 10',stroke:'#cccccc'}) );
        this.canvas.attr('fill','#fff');
	}
	return pattern;
};
qgSvg.on('init',function(svg){
	svg.el.css('overflow','visible');
	svg.canvas = qgSvg.el('svg').attr({'class':'-canvas',style:'pointer-events:none'}).insertBefore(svg.el);
	qgSvg.el('rect').attr({width:'100%',height:'100%',fill:'#fff','class':'-bg'}).appendTo(svg.canvas);
	qgSvg.el('rect').attr({width:'100%',height:'100%',fill:'url(#qgSvg_canvasGrid)','class':'-grid'}).appendTo(svg.canvas);
});