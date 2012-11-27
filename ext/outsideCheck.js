qgSvg.on('init',function(svg){
    var self = svg;
    var out = [];

    function check(els){
        var rctMax = self.canvas[0].getBoundingClientRect();
        els.each(function(i,el){
            var index = out.indexOf(el);
            var rct = el.getBoundingClientRect();
            if(rct.top < rctMax.top || rct.left < rctMax.left || rct.right > rctMax.right || rct.bottom > rctMax.bottom){
                if(index === -1){
                    out.push(el);
                    self.fire('outsideCheck',{els:out,added:el});
                }
            } else {
                if(index !== -1){
                    out.splice(index,1);
                    self.fire('outsideCheck',{els:out,removed:el});
                }
            }
        });
    }
    function checkAll(){
        out.forEach(function(el,i){
            out.splice(i,1);
        	self.fire('outsideCheck',{els:out,removed:el});
        });
        out.length = 0;
        check( self.el.find('text,rect,image') );
    }
    setTimeout(checkAll,10);
    self.on('modify',function(e){
        if(e==='remove'){
        	checkAll();
        } else {
            check(self.Selected);
        }
    });
    self.on('editHistoryLoad',checkAll);
});