qgSvg.prototype.unloadWarning = function(txt){
	this.unloadWarningTxt = txt;
};
qgSvg.on('init',function(svg){
	var changed = false;
	var savedHistoryPos = 0;
	
	svg.on('modify',function(){
		changed = true;
	});
	svg.on('editHistoryLoad',function(){
		changed = savedHistoryPos !== svg.getEditHistoryPos();
	});
	svg.on('export',function(){
		savedHistoryPos = svg.getEditHistoryPos();
		changed = false;
	});
	
	$(window).on('beforeunload',function(e){
	    	if( !svg.unloadWarningTxt ){ return; }
	    	if(!changed){ return; }
	        var e = e.originalEvent;
	        var message = svg.unloadWarningTxt;
	        if(e){
	            e.returnValue = message;
	        }
	        return message;
	});
});
