!function(){
	var undf, k, d=document, w=self
    , vendor = w.controllers?'moz':(w.opera?'o':(d.all?'ms':'webkit'));
	Function.prototype.multi = function(){
	        var fn = this;
	        return function(a,b){
	            if(b === undf && typeof a == 'object'){
	                for(var i in a)
	                    if(a.hasOwnProperty(i))
	                        fn.call(this,i,a[i]);
	                return;
	            }
	            return fn.apply(this,arguments);
	        };
	};

	q9 = {};
	q9.Eventer = {
	    initEvent : function(n){
	        !this._Es && (this._Es={});
	        !this._Es[n] && (this._Es[n]=[]);
	        return this._Es[n];
	    }
	    ,on:function(ns,fn){
	    	var ns = ns.split(' ');
	    	for(var i=0, n; n = ns[i++];){
		        this.initEvent(n).push(fn);
	    	}
	    }.multi()
	    ,no:function(ns,fn){
	    	var ns = ns.split(' ');
	    	for(var i=0, n; n = ns[i++];){
		        var Events = this.initEvent(n);
		        Events.splice( Events.indexOf(fn) ,1);
	    	}
	    }.multi()
	    ,fire:function(ns,e){
	    	var ns = ns.split(' ')
	    		,self = this;
	    	for(var i=0, n; n = ns[i++];){
		    	var Events = this.initEvent(n);
		        Events.forEach(function(E){
		            E.bind(self)(e);
		        });
	    	}
	    }
	};
	q9.ext = function(src, target){ target=target||{}; for(k in src) target[k]===undf && (target[k] = src[k]); return target; };


	/* usefull */
	if (!RegExp.escape){
		RegExp.escape = function(text){
		    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		};
	}

	/* polyfils */
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			  return this.replace(/^\s+|\s+$/g,'');
		};
	}
	if (!Function.prototype.bind){
		Function.prototype.bind = (function(){
			  var _slice = Array.prototype.slice;
			  return function(context) {
			    var fn = this,
			        args = _slice.call(arguments, 1);

			    if (args.length) { 
			      return function() {
			        return arguments.length
			          ? fn.apply(context, args.concat(_slice.call(arguments)))
			          : fn.apply(context, args);
			      };
			    } 
			    return function() {
			      return arguments.length
			        ? fn.apply(context, arguments)
			        : fn.call(context);
			    }; 
			  };
		})();		
	}
	if( !Array.prototype.forEach ){
		Array.prototype.forEach = function( callback, thisArg ){
			var T, k;
			if ( this == null ){
				throw new TypeError( "this is null or not defined" );
			}
			var O = Object(this);
			var len = O.length >>> 0; // Hack to convert O.length to a UInt32
			if ( {}.toString.call(callback) != "[object Function]" ){
				throw new TypeError( callback + " is not a function" );
			}
			if ( thisArg ){
				T = thisArg;
			}
			k = 0;
			while( k < len ){
				var kValue;
				if ( k in O ){
					kValue = O[ k ];
					callback.call( T, kValue, k, O );
				}
				k++;
			}
		};
	}


	// ie<=8 does not support negative values (splice?)
	if('ab'.substr(-1) != 'b'){ 
		String.prototype.substr = function(substr){
			return function(start, length){
				if (start < 0) start = this.length + start;
				return substr.call(this, start, length);
			};
		}(String.prototype.substr);
	}	
	
	
	var proto;
	if( window.Element && (proto = Element.prototype) && !proto.matchesSelector ){
		proto.matchesSelector = proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
	}


}();
