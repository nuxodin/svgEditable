!function(){
	'use strict';

window.qgSvg = function(el){
	this.el = $(el);
	this.init();
};
qgSvg.prototype = {
	init:function(){
		q9.ext(q9.Eventer,this);

		this.wrapper = qgSvg.el('svg')
		.attr({
			width:this.el.attr('width')
			,height:this.el.attr('height')
			,style:this.el.attr('style')
			,'class':'qgSvgWrapper' // addClass not working on svg elements
		})
		.insertAfter(this.el)
		.data('qgSvg',this)
		.attr('tabindex','-1');

        this.g = qgSvg.el('g').appendTo(this.wrapper);

		this.el.appendTo(this.g);

        this.toolsEl = qgSvg.el('svg').attr('style','overflow:visible').appendTo(this.g);
        
        
		this.pt = this.el[0].createSVGPoint();
		this.opt = {};
		qgSvg.fire('init',this);
	},
	val:function(v){
		if(v!==undefined){
			/* the svg-element itself is not replaced */
            return qgSvg.fromStr(this.el[0],v);
		} else {
            var str = qgSvg.toStr(this.el[0]);
            return str;
		}
	}
	,setMode:function(mode){ // for now not used
		this.mode = mode;
		this.fire('setMode');
	}
    ,export:function(){
        var clone = this.el.clone();
        clone.attr({x:0,y:0});
        clone.find('[ignore=true]').remove();
        var str = qgSvg.toStr(clone[0]);
        clone.remove();
        this.fire('export');
        return str;
    }
	,mode:'select'
};
q9.ext(q9.Eventer,qgSvg);


/* matrix */
qgSvg.prototype.pointFromEvent = function(e){
	this.pt.x = e.clientX;
	this.pt.y = e.clientY;
	return this.pt.matrixTransform( this.el[0].getScreenCTM().inverse() );
};
qgSvg.prototype.pointIn = function( el , x , y ){
	this.pt.x = x;
	this.pt.y = y;
	return this.pt.matrixTransform( el[0].getTransformToElement( this.el[0] ).inverse() );
};


/* shape */
qgSvg.shape = function(el){
	this.el = $(el);
};
qgSvg.shape.prototype = {
	getWrapper: function(){
		if( !this.wrapper ){ // cache it;
			this.wrapper = this.el.closest('.qgSvgWrapper');
		}
		return this.wrapper;
	},
	qgSvg: function(){
		return this.getWrapper().data('qgSvg');
	},
};
// jquery integration
$.fn.qgSvg = function(){
	var shape = this.data('qgSvg');
	if(!shape){
		shape = new qgSvg.shape(this);
		this.data('qgSvg',shape);
	}
	return shape;
};


/* select */
qgSvg.prototype.select = function(el,multiple){
	if(!multiple && this.Selected[0]){
		 this.fire('unselect');
		 this.Selected = $();
	}
	this.Selected = this.Selected.add(el);
	this.Selected[0] && this.fire('select');
};
qgSvg.on('init',function(svg){
	var self = svg;
	self.Selected = $();
	self.el.on('mousedown',function(e){
		var shape = qgSvg.getShape(e.target);
		if( shape ){
			e.stopPropagation();
			var multiple = e.ctrlKey;
			self.select(shape, multiple);
		}
	});
	self.wrapper.on('mousedown',function(e){
		e.target === self.wrapper[0] && self.select();
	});
});


/* toolsEl */
q9.ext({
	toolsElGet: function(){
		if(!this.toolsEl){
			this.toolsEl = qgSvg.el('g').appendTo( this.qgSvg().toolsEl );
		}
		return this.toolsEl;
	},
	toolsElDraw: function(){
		this.toolsElGet().attr('transform',this.el.attr('transform') );
	},
	toolsElRemove: function(){
		if(this.toolsEl){
			this.toolsEl.remove();
			this.toolsEl = null;
		}
	}	
},qgSvg.shape.prototype);

qgSvg.on('init',function(svg){
	svg.on('select modify',function(){
		this.Selected.each(function(){
			$(this).qgSvg().toolsElDraw();
		});
	});
	svg.on('unselect',function(){
		this.Selected.each(function(){
			$(this).qgSvg().toolsElRemove();
		});
	});
});


/* move */
qgSvg.shape.prototype.pos = function(x,y){
    if(x===undefined){
        return qgSvg.xy(this.el);
    } else {
    	$.each(this.el[0].childNodes, function(i,el){
    		if(el.tagName=='tspan'){
    			el.setAttribute('x',x);
    		}
    	});
    	qgSvg.xy(this.el, x, y );
    }
};
qgSvg.on('init',function(svg){
	var self = svg;

	self.el.on('mouseover',function(){ self.wrapper.css('cursor','move');    });
	self.el.on('mouseout' ,function(){ self.wrapper.css('cursor','default'); });

	var pf = new q9PointerFollower1(svg.el);
	pf.on('move',function(e){
		if(!self.Selected[0]){ return; }
		self.Selected.each(function(){
			var el = $(this);

			var tmp;
			if( (tmp = el.qgSvg().rotate() ) ){
				el.qgSvg().rotate( tmp );
			}
			var diff = pf.startDiff();
			var elStart = el.data('moveStartPos');
			var x = elStart.x - diff.x;
			var y = elStart.y - diff.y;
			if(e.shiftKey){
				var steps = 10;
				x = Math.round(x/steps)*steps;
				y = Math.round(y/steps)*steps;
			}
            el.qgSvg().pos(x,y);
		});
		self.fire('move modify','move');
	});
	pf.on('start',function(e){
		e.preventDefault();
		self.Selected.each(function(){
			var el = $(this);
			el.data('moveStartPos', qgSvg.xy(el) );
		});
	});
});



/* resize */
q9.ext({
	size:function(w,h){
		if(w===undefined){
            return {w:this.el.attr('width'),h:this.el.attr('height')};
		} else {
			w = Math.max( w, 2 );
			h = Math.max( h, 2 );

			this.el.attr({
				width: w,
				height: h
			});
			/*
				self.rotate( self.rotate() );
				var r = self.rotate();
				var center = qgSvg.getCenter(this.el);
				self.el.attr('transform','rotate('+r+', '+center.x+', '+center.y+' )');
			*/
			this.qgSvg().fire('resize modify','resize');
		}
	},
	handlesGet: function(){

		if(!this.handles){
			var self = this;
			var toolsEl = this.toolsElGet();
			var els = {
				box:qgSvg.el('path').attr({fill:'none',stroke:'#22C','stroke-dasharray':'5,5'}),
				points:{}
			};
			var dim = {};
			if(this.el[0].tagName==='image'){
				var url = this.el.attr('xlink:href');
				var nImg = new Image();
				nImg.src = url;
				$(nImg).on('load',function(){
					dim.w = nImg.width;
					dim.h = nImg.height;
				});
			}
			
			//['nw','n','ne','e','se','s','sw','w'].forEach(function(i){
			['se'].forEach(function(i){
				var el = els.points[i] = qgSvg.el('circle')
				.appendTo(toolsEl)
				.attr({fill:'#22C','stroke-width':'2',r:4})
				.css('cursor',i+'-resize');

				var pf = new q9PointerFollower1(el);
				pf.on('move',function(e){
					var target = self.el;
					var pos = self.qgSvg().pointFromEvent(e);
					var localPos = self.qgSvg().pointIn( target, pos.x, pos.y ); // to local
	  				var w = localPos.x - target[0].x.animVal.value ;
	  				var h = localPos.y - target[0].y.animVal.value ;

	  				if(e.shiftKey){
	  					var step = 10;
	  					w = Math.round(w/step)*step;
	  					h = Math.round(h/step)*step;
	  				}
	  				if(dim.w){
	  					var f = dim.w / dim.h;
	  					f > w / h ? w = f * h : h = (1/f) * w;
	  				}
	  				self.size(w,h);
				});
				pf.on('start',function(e){ e.preventDefault(); });
			});
			els.box.appendTo( toolsEl );
			this.handles = els; 
		}
		return this.handles;
	},
	handlesRemove: function(){
		if(this.handles){
			this.handles = null;
		}
	},
	handlesDraw: function(){

		var handles = this.handlesGet();

		var bb = this.el[0].getBBox();
		
		var margin = 5;
		var x = bb.x-margin;
		var y = bb.y-margin;
		var x2 = bb.x+bb.width+margin;
		var y2 = bb.y+bb.height+margin;

		handles.box.attr({ d:'M'+x+','+y+' L'+x2+','+y+' '+x2+','+y2+' '+x+','+y2+'z' });

        if( this.el[0].tagName==='text' ){
            handles.points.se[0].style.display = 'none';
            return;
        }
		// handles.points.nw.attr({ cx: x,       cy:y });
		// handles.points.n.attr({  cx:(x+x2)/2, cy:y });
		// handles.points.ne.attr({ cx: x2,      cy:y });
		// handles.points.e.attr({  cx: x2,      cy:(y+y2)/2 });
		handles.points.se.attr({ cx: x2, 	  cy:y2 });
		// handles.points.s.attr({  cx:(x+x2)/2, cy:y2 });
		// handles.points.sw.attr({ cx:x,        cy:y2 });
		// handles.points.w.attr({  cx:x, 		  cy:(y+y2)/2 });

	}	
},qgSvg.shape.prototype);

qgSvg.on('init',function(svg){
	var self = svg;
	self.on('select modify',function(){
		this.Selected.each(function(){
			$(this).qgSvg().handlesDraw();
		});
	});
	self.on('unselect',function(){
		this.Selected.each(function(){
			$(this).qgSvg().handlesRemove();
		});
	});
});




/* rotate */
q9.ext({
	rotate:function(v){
		if(v===undefined){
			var x = this.el.attr('transform');
			x = x ? x.match(/.*rotate\(([0-9\.-]+)/) : 0;
			return x && x[1] ? parseInt(x[1]) : 0;
		} else {
			var center = qgSvg.getCenter(this.el);
			this.el.attr('transform','rotate('+v+', '+center.x+', '+center.y+' )');
			this.qgSvg().fire('rotate modify');
		}
	},
	rotateHandlesGet: function(){
		var self = this;
		if(!this.rotateHandles){
			var els = {
				line:qgSvg.el('line').attr({stroke:'#22C'}).appendTo( this.toolsElGet() ),
				point:qgSvg.el('circle').attr({fill:'lime',r:'5',stroke:'#22C','stroke-width':2,'class':'rotating'}).appendTo( this.toolsElGet() )
			};
			var pf = new q9PointerFollower1(els.point);
			pf.on('move',function(e){
				var center = qgSvg.getCenter(self.el);
				var mousePos = self.qgSvg().pointFromEvent(e);
				var x = mousePos.x - center.x;
				var y = mousePos.y - center.y;
				
				var theta = Math.atan2(y, x);
				var deg = theta * (180 / Math.PI)+90;

				if(e.shiftKey){
					var steps = 360/16;
					deg = Math.round(deg/steps)*steps;
				}
				
				self.rotate( deg );
				qgSvg.elAddClass(self.qgSvg().wrapper[0],'rotating');
			});
			pf.on('start',function(e){
				e.preventDefault();
				qgSvg.elAddClass(self.qgSvg().wrapper[0], 'rotating'); 
			});
			pf.on('stop',function(){ qgSvg.elRemoveClass(self.qgSvg().wrapper[0],'rotating'); });
			
			this.rotateHandles = els; 
		}
		return this.rotateHandles;
	},
	rotateHandlesRemove: function(){
		if(this.rotateHandles){
			this.rotateHandles = null;
		}
	},
	rotateHandlesDraw: function(){
		var handles = this.rotateHandlesGet();
		var bb = this.el[0].getBBox();
		var margin = 5;
		var x = bb.x-margin;
		var y = bb.y-margin;
		var x2 = bb.x+bb.width+margin;
		//var y2 = bb.y+bb.height+margin;
		handles.line.attr({
			x1:(x+x2)/2,
			y1:y,
			x2:(x+x2)/2,
			y2:y-15
		});
		handles.point.attr({
			cx:(x+x2)/2,
			cy:y-15
		});
	}	
},qgSvg.shape.prototype);

qgSvg.on('init',function(svg){
	svg.on('modify select',function(){
		this.Selected.each(function(){
			$(this).qgSvg().rotateHandlesDraw();
		});
	});
	svg.on('unselect',function(){
		this.Selected.each(function(){
			$(this).qgSvg().rotateHandlesRemove();
		});
	});
});

}();
