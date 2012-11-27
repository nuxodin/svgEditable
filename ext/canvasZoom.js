qgSvg.on('init', function(svg){
    var self = svg;
    self.wrapper.on('mousewheel', function(e){ // firefox!!
        if(!e.shiftKey){ return; }

        var abstufung = 1.1;
        var f = e.originalEvent.wheelDelta > 0 ? abstufung : 1/abstufung;
        
        var last = self.zoom();
        var zoom = last.z*f;
        zoom = Math.max(zoom,0.3);
        
        var pt = self.pointFromEvent(e.originalEvent);
        
        pt = self.pointIn(self.g,pt.x,pt.y);

        var wPos = self.wrapper[0].getBoundingClientRect();

        var faktorX = pt.x / wPos.width;
        var maxX = wPos.width - wPos.width*zoom;
        x = maxX * faktorX; 

        var faktorY = pt.y / wPos.height;
        var maxY = wPos.height - wPos.height*zoom;
        y = maxY * faktorY;

        self.zoom(zoom,x,y);
        e.preventDefault();
   });
});
qgSvg.prototype.zoom = function(z,x,y){
    if(z===undefined){
        var att = this.g.attr('transform');
        var vs = att ? att.replace(/.*matrix\(([^)]+)\).*/,'$1').split(',') : [1,0,0,1,0,0];
        return { z:parseFloat(vs[0]), x:parseFloat(vs[5]), y:parseFloat(vs[6]) };
    } else {
        this.g.attr('transform','matrix('+z+',0,0,'+z+','+x+','+y+')');
    }
};

