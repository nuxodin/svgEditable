!function(qgSvg){
	var proto = qgSvg.prototype;
	
	proto.editHistoryPos = null;
	proto.editHistoryLoad = function(pos){
		this.select(null);
		var item = this.editHistory[pos];
		if(item){
			this.val( item.content );
			this.editHistoryPos = pos;
            this.fire('editHistoryLoad');
		}
		return this.editHistoryPos;
	};
	proto.getEditHistoryPos = function(){
		this.editHistoryPos===null && ( this.editHistoryPos = this.editHistory.length-1 );
        return this.editHistoryPos;
    };
    proto.undo = function(){ this.editHistoryLoad( this.getEditHistoryPos()-1); };
    proto.redo = function(){ this.editHistoryLoad( this.getEditHistoryPos()+1); };

    qgSvg.on('init',function(qgSvg){
		qgSvg.editHistory = [];
		
		function saveState(e){
			qgSvg.editHistory.push({ content:qgSvg.val(), event:e });
			qgSvg.editHistoryPos = null;
			//svg.fire('editHistorySave');
		}
		saveState();
		this.on('modify',saveState.wait(400) );
	});
	
}(qgSvg);
