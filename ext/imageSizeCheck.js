qgSvg.on('init',function(svg){
	'use strict';
	
	var self = svg;
    var out = [];
    
    self.imageSizeCheckBad = out;
    
    function check(els){
        
        var faktor = self.opt.imageSizeCheck_faktor || 1;
        
        els.each(function(i,el){
            var index = out.indexOf(el);

            el = $(el);
            ImageGetRealSize( el.attr('xlink:href'), function(w,h){
    			var size = el.qgSvg().size();
                if( size.w > w / faktor || size.h > h / faktor ){
                    if(index === -1){
                        out.push(el[0]);
                        self.fire('imageSizeCheck',{status:true,el:el,els:out});
                    }
                } else {
                    if(index !== -1){
                        out.splice(index,1);
                        self.fire('imageSizeCheck',{status:false,el:el,els:out});
                    }
                }
            });
        });
    }
    function checkAll(){
        out.length = 0;
        check( self.el.find('image') );
    }
    setTimeout(checkAll,10);
    self.on('modify',function(e){
        if(e==='resize'){
            check(self.Selected);
        }
    });
    self.on('editHistoryLoad',checkAll);
    
    /* mark *
    self.on('select',function(){
    	var self = this;
    	self.Selected.each(function(){
    		if( $.inArray(this,out) !== -1 ){
                $(this).qgSvg().handles && $(this).qgSvg().handlesGet().points.se.attr('fill','red');
                $(this).qgSvg().handles && $(this).qgSvg().handlesGet().box.attr('stroke','red');
    		} else {
                $(this).qgSvg().handles && $(this).qgSvg().handlesGet().points.se.attr('fill','#22C');
                $(this).qgSvg().handles && $(this).qgSvg().handlesGet().box.attr('stroke','#22C');
    		}
    	});
    });
    self.on('imageSizeCheck',function(e){
        var el = e.el;
        if(e.status){
            el.qgSvg().handles && el.qgSvg().handlesGet().points.se.attr('fill','red');
            el.qgSvg().handles && el.qgSvg().handlesGet().box.attr('stroke','red');
        } else {
        	el.qgSvg().handles && el.qgSvg().handlesGet().points.se.attr('fill','#22C');
            el.qgSvg().handles && el.qgSvg().handlesGet().box.attr('stroke','#22C');
        }
    });
	/**/
});