q9.ext({
	shapes:'a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,text,use'.split(',')
	,getShape: function(el){
		el = $(el);
		while( el[0] ){
			if(this.shapes.indexOf( $(el)[0].tagName ) !== -1){
				return el;
			}
			el = el.parent();
		}
		return false;
	}
	,el:function(tag){
		  return $(document.createElementNS('http://www.w3.org/2000/svg', tag));
	}
    ,fromStr:function(node,str){
        var childs = node.childNodes;
        for(var child, l=childs.length; child = childs[--l];){
        	node.removeChild(child);
        }
		// neue Elemente einfügen
		var parser=new DOMParser();
        var newSvg = parser.parseFromString(str,'text/xml').documentElement;

        childs = newSvg.childNodes;
        for(var child, l=childs.length; child = childs[--l];){
        	node.appendChild(child);
        }
        /* korrekt image tag in chrome  hack!! */
        $(node).find('image').each(function(i,el){
        	el = $(el);
            el[0].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', el.attr('xlink:href') );
        });
    }
    ,toStr:function(node){
        // var string = xmlNode.xml; ie??
		var s = new XMLSerializer();
		var str = s.serializeToString(node);
		str = str.replace(/ href="/g, ' xlink:href="');
		str = str.replace(/ xlink="/g, ' xmlns:xlink="');
		str = str.replace(/&nbsp;/g, '\u00A0');
		return str;
    }
	,xy: function(el,x,y){
		el = $(el);
		var useC = ['circle','ellipse'].indexOf(el[0].tagName) !== -1;
		var xAtt = useC ? 'cx' : 'x';
		var yAtt = useC ? 'cy' : 'y';
		if(x!==undefined){
			el.attr(xAtt,x).attr(yAtt,y);
		} else {
			var bb = el[0].getBBox();
			var xv = el[0][xAtt].animVal.value;
			var yv = el[0][yAtt].animVal.value;
			return {
				x : xv !== undefined ? xv : el.attr(xAtt) ,
				y : yv !== undefined ? yv : el.attr(yAtt) 
			};
		}
	},
	getCenter:function(el){
		el = $(el);
		var useC = ['circle','ellipse'].indexOf(el[0].tagName) !== -1;
		var bb = el[0].getBBox();
		return {
			x: bb.x + (bb.width / 2),
			y: bb.y + (bb.height / 2)
		};
	}
	,alt_getCenter:function(el){
		el = $(el);
		var useC = ['circle','ellipse'].indexOf(el[0].tagName) !== -1;
		if(useC){
			return {
				x: el[0].cx.animVal.value,
				y:el[0].cy.animVal.value
			};
		}
		if(el[0].width){
			return {
				x: el[0].x.animVal.value + (el[0].width.animVal.value / 2),
				y: el[0].y.animVal.value + (el[0].height.animVal.value / 2)
			};
		} else {
			var bb = el[0].getBBox();
			return {
				x: el[0].x.animVal.value + (bb.width / 2),
				y: el[0].y.animVal.value + (bb.height / 2)
			};
		}
	},
	
	elAddClass:    function(el,v){ !this.elHasClass(el,v) && (el.setAttribute('class',el.className.animVal+' '+v) ); },
    elRemoveClass: function(el,v){ el.setAttribute('class',el.className.animVal.replace(new RegExp("(^|\\s)"+v+"(\\s|$)"), '')); },
    elHasClass:    function(el,v){ var reg = new RegExp("(^|\\s)"+v+"(\\s|$)"); return el.className.animVal.match( reg ); }
	
},qgSvg);



var q9PointerFollower1 = function(el){
	var self = this;
	this.el = $(el);
	this.pos = {};
	this.last = {};
	this.start = {};
	this.diff = {};
	var mousemove = function(e){
		var oe = e.originalEvent || e;
		self.last = self.pos;
		self.pos = {x:oe.pageX,y:oe.pageY};
        if( self.last.x===self.pos.x && self.last.y === self.pos.y ){return;}
		self.diff = { x : self.last.x - self.pos.x , y : self.last.y - self.pos.y };
		self.fire('move', e);
	};
	var mouseup = function(e){
		var oe = e.originalEvent || e;
		self.last = self.pos;
		self.pos = {x:oe.pageX,y:oe.pageY};
		self.diff = { x : self.last.x - self.pos.x , y : self.last.y - self.pos.y };
		self.fire('stop', e);
		$(document).off('mousemove touchmove',mousemove);
		$(document).off('mouseup touchend',mouseup);
	};
	this.el.on('mousedown touchstart', function(e){
		var oe = e.originalEvent || e;
		self.start = self.pos = {x:oe.pageX,y:oe.pageY};
		$(document).on('mousemove touchmove',mousemove);
		$(document).on('mouseup touchend',mouseup);
		self.fire('start', e);
	});
};
q9PointerFollower1.prototype.startDiff = function(){
	return {
		x:this.start.x-this.pos.x,
		y:this.start.y-this.pos.y,
	};
};
q9.ext( q9.Eventer, q9PointerFollower1.prototype );




ImageGetRealSize = function(){
    var cache = {}, undef;
    return function (url,cb){
        if(cache[url]===undef){
    		var nImg = new Image();
    		nImg.src = url;
    		$(nImg).on('load',function(){
                cb.apply( null, cache[url] = [ nImg.width, nImg.height ] );
    		});
        } else {
            cb.apply(null,cache[url]);
        }
    };
}();
