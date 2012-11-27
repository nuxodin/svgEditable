!function(proto, qgSvg){
	

	var editorCont = $('<div id="qgSvgTexteditor">').css({position:'absolute',boxShadow:'0 0 20px rgba(0,0,0,.3)',width:500,background:'rgba(238, 238, 238, .2)',padding:4,whiteSpace:'nowrap'});
    editorCont.append(
        '<div class="-tools">'+
            '<div class="-doBold" title=""></div>'+
            '<div class="-doItalic" title=""></div>'+
            '<div class="-doBigger" title=""></div>'+
            '<div class="-doSmaller"title=""></div>'+
            '<div class="-doFont" title=""></div>'+
            '<div class="-doColor" title=""></div>'+
        '</div><div class="clear"/>'
    ).draggable({handle:'.-tools'});
	var editor = $('<div>').attr('contenteditable',true).css({boxShadow:'0 0 3px #000',minHeight:100,maxHeight:200,background:'rgba(255,255,255,0.85)',padding:8,overflow:'auto'}).appendTo(editorCont);

    editorCont.on('mousedown',function(e){
        if(!e.target.isContentEditable){
            e.preventDefault();
        }
    });
    editorCont.find('.-doBold').on('mousedown',function(){
        document.execCommand('bold', false, null);
    });
    editorCont.find('.-doItalic').on('mousedown',function(){
        document.execCommand('italic', false, null);
    });
    editorCont.find('.-doBigger').on('mousedown',function(){
        var sel = document.getSelection();
        var div = sel.anchorNode.tagName ? sel.anchorNode : sel.anchorNode.parentNode;
        div = $(div);
        var size = parseInt( div.css('font-size') );
        div.css('font-size',size*1.2);
    });
    editorCont.find('.-doSmaller').on('mousedown',function(){
        var sel = document.getSelection();
        var div = sel.anchorNode.tagName ? sel.anchorNode : sel.anchorNode.parentNode;
        div = $(div);
        var size = parseInt( div.css('font-size') );
        div.css('font-size',size/1.2);
    });

    editorCont.append(
        '<div class="-fonts" style="display:none; position:absolute; top:0; left:0; z-index:10; width:100%; height:100%; overflow:auto; background:#eee">'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Arial</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">JunebugStompNF</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Arial</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Times</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Arial</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Times</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Arisl</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Times</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Arisl</div>'+
            '<div class="" title="" style="border-bottom:1px solid #aaa; border-top:1px solid #fff; padding:10px; cursor:pointer">Times</div>'+
        '</div>'
    );
    editorCont.find('.-doFont').on('mousedown',function(){
        editorCont.find('.-fonts').fadeIn();
    });
    editorCont.find('.-fonts').on('mousedown',function(e){
        var font = e.target.innerHTML;
        var div = $(document.getSelection().anchorNode).closest('div');
        div.css('font-family',font);
        editorCont.find('.-fonts').fadeOut();
    });

    editorCont.append(
        '<div class="-colors" style="display:none; position:absolute; top:0; left:0; z-index:10; width:100%; height:100%; overflow:auto; background:#eee">'+
            '<table style="width:100%; height:100%">'+'<tr><td bgColor="#FBEFEF"></td><td bgColor="#FBF2EF"></td><td bgColor="#FBF5EF"></td><td bgColor="#FBF8EF"></td><td bgColor="#FBFBEF"></td><td bgColor="#F8FBEF"></td><td bgColor="#F5FBEF"></td><td bgColor="#F2FBEF"></td><td bgColor="#EFFBEF"></td><td bgColor="#EFFBF2"></td><td bgColor="#EFFBF5"></td><td bgColor="#EFFBF8"></td><td bgColor="#EFFBFB"></td><td bgColor="#EFF8FB"></td><td bgColor="#EFF5FB"></td><td bgColor="#EFF2FB"></td><td bgColor="#EFEFFB"></td><td bgColor="#F2EFFB"></td><td bgColor="#F5EFFB"></td><td bgColor="#F8EFFB"></td><td bgColor="#FBEFFB"></td><td bgColor="#FBEFF8"></td><td bgColor="#FBEFF5"></td><td bgColor="#FBEFF2"></td><td bgColor="#FFFFFF"></td></tr>'+ '<tr><td bgColor="#F8E0E0"></td><td bgColor="#F8E6E0"></td><td bgColor="#F8ECE0"></td><td bgColor="#F7F2E0"></td><td bgColor="#F7F8E0"></td><td bgColor="#F1F8E0"></td><td bgColor="#ECF8E0"></td><td bgColor="#E6F8E0"></td><td bgColor="#E0F8E0"></td><td bgColor="#E0F8E6"></td><td bgColor="#E0F8EC"></td><td bgColor="#E0F8F1"></td><td bgColor="#E0F8F7"></td><td bgColor="#E0F2F7"></td><td bgColor="#E0ECF8"></td><td bgColor="#E0E6F8"></td><td bgColor="#E0E0F8"></td><td bgColor="#E6E0F8"></td><td bgColor="#ECE0F8"></td><td bgColor="#F2E0F7"></td><td bgColor="#F8E0F7"></td><td bgColor="#F8E0F1"></td><td bgColor="#F8E0EC"></td><td bgColor="#F8E0E6"></td><td bgColor="#FAFAFA"></td></tr>'+ '<tr><td bgColor="#F6CECE"></td><td bgColor="#F6D8CE"></td><td bgColor="#F6E3CE"></td><td bgColor="#F5ECCE"></td><td bgColor="#F5F6CE"></td><td bgColor="#ECF6CE"></td><td bgColor="#E3F6CE"></td><td bgColor="#D8F6CE"></td><td bgColor="#CEF6CE"></td><td bgColor="#CEF6D8"></td><td bgColor="#CEF6E3"></td><td bgColor="#CEF6EC"></td><td bgColor="#CEF6F5"></td><td bgColor="#CEECF5"></td><td bgColor="#CEE3F6"></td><td bgColor="#CED8F6"></td><td bgColor="#CECEF6"></td><td bgColor="#D8CEF6"></td><td bgColor="#E3CEF6"></td><td bgColor="#ECCEF5"></td><td bgColor="#F6CEF5"></td><td bgColor="#F6CEEC"></td><td bgColor="#F6CEE3"></td><td bgColor="#F6CED8"></td><td bgColor="#F2F2F2"></td></tr>'+ '<tr><td bgColor="#F5A9A9"></td><td bgColor="#F5BCA9"></td><td bgColor="#F5D0A9"></td><td bgColor="#F3E2A9"></td><td bgColor="#F2F5A9"></td><td bgColor="#E1F5A9"></td><td bgColor="#D0F5A9"></td><td bgColor="#BCF5A9"></td><td bgColor="#A9F5A9"></td><td bgColor="#A9F5BC"></td><td bgColor="#A9F5D0"></td><td bgColor="#A9F5E1"></td><td bgColor="#A9F5F2"></td><td bgColor="#A9E2F3"></td><td bgColor="#A9D0F5"></td><td bgColor="#A9BCF5"></td><td bgColor="#A9A9F5"></td><td bgColor="#BCA9F5"></td><td bgColor="#D0A9F5"></td><td bgColor="#E2A9F3"></td><td bgColor="#F5A9F2"></td><td bgColor="#F5A9E1"></td><td bgColor="#F5A9D0"></td><td bgColor="#F5A9BC"></td><td bgColor="#E6E6E6"></td></tr>'+ '<tr><td bgColor="#F78181"></td><td bgColor="#F79F81"></td><td bgColor="#F7BE81"></td><td bgColor="#F5DA81"></td><td bgColor="#F3F781"></td><td bgColor="#D8F781"></td><td bgColor="#BEF781"></td><td bgColor="#9FF781"></td><td bgColor="#81F781"></td><td bgColor="#81F79F"></td><td bgColor="#81F7BE"></td><td bgColor="#81F7D8"></td><td bgColor="#81F7F3"></td><td bgColor="#81DAF5"></td><td bgColor="#81BEF7"></td><td bgColor="#819FF7"></td><td bgColor="#8181F7"></td><td bgColor="#9F81F7"></td><td bgColor="#BE81F7"></td><td bgColor="#DA81F5"></td><td bgColor="#F781F3"></td><td bgColor="#F781D8"></td><td bgColor="#F781BE"></td><td bgColor="#F7819F"></td><td bgColor="#D8D8D8"></td></tr>'+ '<tr><td bgColor="#FA5858"></td><td bgColor="#FA8258"></td><td bgColor="#FAAC58"></td><td bgColor="#F7D358"></td><td bgColor="#F4FA58"></td><td bgColor="#D0FA58"></td><td bgColor="#ACFA58"></td><td bgColor="#82FA58"></td><td bgColor="#58FA58"></td><td bgColor="#58FA82"></td><td bgColor="#58FAAC"></td><td bgColor="#58FAD0"></td><td bgColor="#58FAF4"></td><td bgColor="#58D3F7"></td><td bgColor="#58ACFA"></td><td bgColor="#5882FA"></td><td bgColor="#5858FA"></td><td bgColor="#8258FA"></td><td bgColor="#AC58FA"></td><td bgColor="#D358F7"></td><td bgColor="#FA58F4"></td><td bgColor="#FA58D0"></td><td bgColor="#FA58AC"></td><td bgColor="#FA5882"></td><td bgColor="#BDBDBD"></td></tr>'+ '<tr><td bgColor="#FE2E2E"></td><td bgColor="#FE642E"></td><td bgColor="#FE9A2E"></td><td bgColor="#FACC2E"></td><td bgColor="#F7FE2E"></td><td bgColor="#C8FE2E"></td><td bgColor="#9AFE2E"></td><td bgColor="#64FE2E"></td><td bgColor="#2EFE2E"></td><td bgColor="#2EFE64"></td><td bgColor="#2EFE9A"></td><td bgColor="#2EFEC8"></td><td bgColor="#2EFEF7"></td><td bgColor="#2ECCFA"></td><td bgColor="#2E9AFE"></td><td bgColor="#2E64FE"></td><td bgColor="#2E2EFE"></td><td bgColor="#642EFE"></td><td bgColor="#9A2EFE"></td><td bgColor="#CC2EFA"></td><td bgColor="#FE2EF7"></td><td bgColor="#FE2EC8"></td><td bgColor="#FE2E9A"></td><td bgColor="#FE2E64"></td><td bgColor="#A4A4A4"></td></tr>'+ '<tr><td bgColor="#FF0000"></td><td bgColor="#FF4000"></td><td bgColor="#FF8000"></td><td bgColor="#FFBF00"></td><td bgColor="#FFFF00"></td><td bgColor="#BFFF00"></td><td bgColor="#80FF00"></td><td bgColor="#40FF00"></td><td bgColor="#00FF00"></td><td bgColor="#00FF40"></td><td bgColor="#00FF80"></td><td bgColor="#00FFBF"></td><td bgColor="#00FFFF"></td><td bgColor="#00BFFF"></td><td bgColor="#0080FF"></td><td bgColor="#0040FF"></td><td bgColor="#0000FF"></td><td bgColor="#4000FF"></td><td bgColor="#8000FF"></td><td bgColor="#BF00FF"></td><td bgColor="#FF00FF"></td><td bgColor="#FF00BF"></td><td bgColor="#FF0080"></td><td bgColor="#FF0040"></td><td bgColor="#848484"></td></tr>'+ '<tr><td bgColor="#DF0101"></td><td bgColor="#DF3A01"></td><td bgColor="#DF7401"></td><td bgColor="#DBA901"></td><td bgColor="#D7DF01"></td><td bgColor="#A5DF00"></td><td bgColor="#74DF00"></td><td bgColor="#3ADF00"></td><td bgColor="#01DF01"></td><td bgColor="#01DF3A"></td><td bgColor="#01DF74"></td><td bgColor="#01DFA5"></td><td bgColor="#01DFD7"></td><td bgColor="#01A9DB"></td><td bgColor="#0174DF"></td><td bgColor="#013ADF"></td><td bgColor="#0101DF"></td><td bgColor="#3A01DF"></td><td bgColor="#7401DF"></td><td bgColor="#A901DB"></td><td bgColor="#DF01D7"></td><td bgColor="#DF01A5"></td><td bgColor="#DF0174"></td><td bgColor="#DF013A"></td><td bgColor="#6E6E6E"></td></tr>'+'<tr><td bgColor="#B40404"></td><td bgColor="#B43104"></td><td bgColor="#B45F04"></td><td bgColor="#B18904"></td><td bgColor="#AEB404"></td><td bgColor="#86B404"></td><td bgColor="#5FB404"></td><td bgColor="#31B404"></td><td bgColor="#04B404"></td><td bgColor="#04B431"></td><td bgColor="#04B45F"></td><td bgColor="#04B486"></td><td bgColor="#04B4AE"></td><td bgColor="#0489B1"></td><td bgColor="#045FB4"></td><td bgColor="#0431B4"></td><td bgColor="#0404B4"></td><td bgColor="#3104B4"></td><td bgColor="#5F04B4"></td><td bgColor="#8904B1"></td><td bgColor="#B404AE"></td><td bgColor="#B40486"></td><td bgColor="#B4045F"></td><td bgColor="#B40431"></td><td bgColor="#585858"></td></tr>'+'<tr><td bgColor="#8A0808"></td><td bgColor="#8A2908"></td><td bgColor="#8A4B08"></td><td bgColor="#886A08"></td><td bgColor="#868A08"></td><td bgColor="#688A08"></td><td bgColor="#4B8A08"></td><td bgColor="#298A08"></td><td bgColor="#088A08"></td><td bgColor="#088A29"></td><td bgColor="#088A4B"></td><td bgColor="#088A68"></td><td bgColor="#088A85"></td><td bgColor="#086A87"></td><td bgColor="#084B8A"></td><td bgColor="#08298A"></td><td bgColor="#08088A"></td><td bgColor="#29088A"></td><td bgColor="#4B088A"></td><td bgColor="#6A0888"></td><td bgColor="#8A0886"></td><td bgColor="#8A0868"></td><td bgColor="#8A084B"></td><td bgColor="#8A0829"></td><td bgColor="#424242"></td></tr>'+'<tr><td bgColor="#610B0B"></td><td bgColor="#61210B"></td><td bgColor="#61380B"></td><td bgColor="#5F4C0B"></td><td bgColor="#5E610B"></td><td bgColor="#4B610B"></td><td bgColor="#38610B"></td><td bgColor="#21610B"></td><td bgColor="#0B610B"></td><td bgColor="#0B6121"></td><td bgColor="#0B6138"></td><td bgColor="#0B614B"></td><td bgColor="#0B615E"></td><td bgColor="#0B4C5F"></td><td bgColor="#0B3861"></td><td bgColor="#0B2161"></td><td bgColor="#0B0B61"></td><td bgColor="#210B61"></td><td bgColor="#380B61"></td><td bgColor="#4C0B5F"></td><td bgColor="#610B5E"></td><td bgColor="#610B4B"></td><td bgColor="#610B38"></td><td bgColor="#610B21"></td><td bgColor="#2E2E2E"></td></tr>'+'<tr><td bgColor="#3B0B0B"></td><td bgColor="#3B170B"></td><td bgColor="#3B240B"></td><td bgColor="#3A2F0B"></td><td bgColor="#393B0B"></td><td bgColor="#2E3B0B"></td><td bgColor="#243B0B"></td><td bgColor="#173B0B"></td><td bgColor="#0B3B0B"></td><td bgColor="#0B3B17"></td><td bgColor="#0B3B24"></td><td bgColor="#0B3B2E"></td><td bgColor="#0B3B39"></td><td bgColor="#0B2F3A"></td><td bgColor="#0B243B"></td><td bgColor="#0B173B"></td><td bgColor="#0B0B3B"></td><td bgColor="#170B3B"></td><td bgColor="#240B3B"></td><td bgColor="#2F0B3A"></td><td bgColor="#3B0B39"></td><td bgColor="#3B0B2E"></td><td bgColor="#3B0B24"></td><td bgColor="#3B0B17"></td><td bgColor="#1C1C1C"></td></tr>'+'<tr><td bgColor="#2A0A0A"></td><td bgColor="#2A120A"></td><td bgColor="#2A1B0A"></td><td bgColor="#29220A"></td><td bgColor="#292A0A"></td><td bgColor="#222A0A"></td><td bgColor="#1B2A0A"></td><td bgColor="#122A0A"></td><td bgColor="#0A2A0A"></td><td bgColor="#0A2A12"></td><td bgColor="#0A2A1B"></td><td bgColor="#0A2A22"></td><td bgColor="#0A2A29"></td><td bgColor="#0A2229"></td><td bgColor="#0A1B2A"></td><td bgColor="#0A122A"></td><td bgColor="#0A0A2A"></td><td bgColor="#120A2A"></td><td bgColor="#1B0A2A"></td><td bgColor="#220A29"></td><td bgColor="#2A0A29"></td><td bgColor="#2A0A22"></td><td bgColor="#2A0A1B"></td><td bgColor="#2A0A12"></td><td bgColor="#151515"></td></tr>'+ '<tr><td bgColor="#190707"></td><td bgColor="#190B07"></td><td bgColor="#191007"></td><td bgColor="#181407"></td><td bgColor="#181907"></td><td bgColor="#141907"></td><td bgColor="#101907"></td><td bgColor="#0B1907"></td><td bgColor="#071907"></td><td bgColor="#07190B"></td><td bgColor="#071910"></td><td bgColor="#071914"></td><td bgColor="#071918"></td><td bgColor="#071418"></td><td bgColor="#071019"></td><td bgColor="#070B19"></td><td bgColor="#070719"></td><td bgColor="#0B0719"></td><td bgColor="#100719"></td><td bgColor="#140718"></td><td bgColor="#190718"></td><td bgColor="#190714"></td><td bgColor="#190710"></td><td bgColor="#19070B"></td><td bgColor="#000000"></td></tr>'+'</table>'+
        '</div>'
    );
    editorCont.find('.-doColor').on('mousedown',function(){
        editorCont.find('.-colors').fadeIn();
    });
    editorCont.find('.-colors').on('mousedown',function(e){
        var color = e.target.getAttribute('bgcolor');
        var div = $(document.getSelection().anchorNode).closest('div');
        div.css('color',color);
        editorCont.find('.-colors').fadeOut();
    });

    
	editor.on('blur',function(){
		editorCont.detach();
	}).on('keydown',function(e){
		if(e.which===13){ // on enter make div
			e.preventDefault();
            var sel = document.getSelection();
			var range = sel.getRangeAt(0);
			var rand = 'tmp'+Math.random();

            var oldDiv = sel.anchorNode;
            if(!oldDiv.tagName){oldDiv = oldDiv.parentNode;}
            var oldCss = oldDiv.style.cssText;

			range.insertNode( document.createTextNode(rand) );
			editor[0].innerHTML = editor[0].innerHTML.replace(rand,'</div><div><span id="tmpQgSvgCursor">x</span>');

            sel.collapse(document.getElementById('tmpQgSvgCursor'), 0);

            $('#tmpQgSvgCursor').remove();

            var x = document.getSelection();
            //var newDiv = x.anchorNode.previousSibling;
            var newDiv = x.anchorNode;
            newDiv.style.cssText = oldCss;
            
            if(newDiv.innerHTML===''){
                newDiv.innerHTML = '\u00A0';
            }
		}
	});

	proto.texteditorShow = function(el){
		var self = this;
		el = $(el);

        var offsetEl = this.wrapper.offsetParent();
        var offsetElPos = offsetEl[0].getBoundingClientRect();
		editorCont.appendTo(offsetEl).zTop();;
        var elPos = el[0].getBoundingClientRect();
        var pos = {
            left: elPos.left - offsetElPos.left -23,
            top: elPos.top - offsetElPos.top -57,
        };

		editorCont.css({left:pos.left,top:pos.top});
		editor.focus();
		/* svg-text to html-text */
		editor.html( svgToHtml(el[0]) );

		editor.one('blur',function(){
            el.empty();
			htmlToSvg(el[0], editor[0]);
            setTimeout(function(){ // chrome??
                el.show(); 
                self.select(el);
    			self.fire('modify');
    			self.fire('textChange',{target:el});
            },1); 

		});
		
		return editor;
	};
	
	qgSvg.on('init',function(qgSvg){
		var self = qgSvg;
		self.wrapper.on('dblclick','text',function(e){
			editor.trigger('blur');
			self.texteditorShow(this);
		});
	});


	function svgToHtml(node){
		var str = '';
		$.each( node.childNodes, function(i,el){
			var endStr = '';
			if(el.nodeType===1){
                var size = el.getAttribute('font-size');
                var font = el.getAttribute('font-family') || 'Arial';
                var color = el.getAttribute('fill')||'#000';
				if(el.tagName === 'tspan' && el.hasAttribute('x')){
					str += '<div style="font-size:'+size+'; font-family:'+font+'; color:'+color+'">';
					endStr = endStr+'</div>';
				}
				if( el.hasAttribute('font-weight') && el.getAttribute('font-weight') === 'bold' ){
					str += '<b>';
					endStr = endStr+'</b>';
				}
				if( el.hasAttribute('font-style') && el.getAttribute('font-style') === 'italic' ){
					str += '<i>';
					endStr = endStr+'</i>';
				}
			}
			if(el.nodeType===3){
				str += el.nodeValue;
			}
			str += svgToHtml(el);
			str += endStr;
		});
		return str;
	}
	function htmlToSvg(svgN, htmN){
		var firstLine = true;
		$.each( htmN.childNodes, function(i,el){
			var sel;
			if(el.nodeType===1){
				sel = qgSvg.el('tspan');
				if(el.tagName === 'DIV'){

                    var size = parseInt($(el).css('font-size')) || 12;
                    sel.attr('font-size',size+'px');

                    var font = $(el).css('font-family') || 'Arial';
                    sel.attr('font-family',font);

                    var color = $(el).css('color') || '#000';
                    sel.attr('fill',color);

					sel.attr('x',svgN.getAttribute('x'));
					if(!firstLine){
						sel.attr('dy',(size*1.1)+3 );
					} else {
						firstLine = false;
					}
				}
				if( el.tagName==='B' || el.tagName==='STRONG' ){
					sel.attr('font-weight','bold');
				}
				if( el.tagName==='I' || el.tagName==='ITALIC' ){
					sel.attr('font-style','italic');
				}
			}
			if(el.nodeType===3){
				sel = document.createTextNode(el.nodeValue);
			}
			htmlToSvg(sel[0]||sel,el);
			$(svgN).append(sel);
		});
	}


}(qgSvg.prototype, qgSvg);



!function(proto,qgSvg){
    proto.fakeTextGet = function(text){
        var fake = text.next().attr('ignore') ? text.next() : qgSvg.el('g').css('pointer-events','none').attr('ignore',true).insertAfter(text);
        text.data('fake',fake); // better deprecated?
        return fake;
    };
    proto.fakeTextRender = function(text){
		text = $(text);
        var self = this;
        var fake = this.fakeTextGet(text);

        var clone = text.clone().insertBefore(text).attr({x:0,y:0,'transform':''}).css('opacity',1);
        clone.children().attr({x:0});
		var svg = qgSvg.toStr(clone[0]);
        clone.remove();

        text.attr('class','');
        fake.attr('class','-hide');
		$fn('qgSvg::textToPath')(svg).then(function(path){
            text.attr('class','-hide');
            fake.attr('class','');
	        var parser=new DOMParser();
            var newSvg = parser.parseFromString(path,'text/xml').documentElement;
            newSvg && newSvg.style && (newSvg.style.overflow = 'visible');
            $(newSvg).find('defs').remove(); // cleanup
            fake.empty().append(newSvg);
            self.fakeTextPositionize(text);
		});
    };
    proto.fakeTextPositionize = function(text){
        text = $(text);

		var fake = text.data('fake');
        fake = fake || this.fakeTextGet(text);

        if(!fake){ return; }
        var pos = text.qgSvg().pos();
        var transform = text.attr('transform');
        fake.children().first().attr({x:pos.x,y:pos.y});
        fake.attr('transform',transform);
        fake.insertAfter(text); // toFront!
    };
    proto.fakeTextInit = function(){
		var self = this;
		self.el.find('text').each(function(i,text){
            self.fakeTextRender(text);
		});
	};
	

	qgSvg.on('init',function(svg){
		svg.fakeTextInit();
		svg.on('modify',function(){
	        var self = this;
	        self.el.find('text').each(function(i,text){
	            self.fakeTextPositionize(text);
	        });
		}.wait(3));
	    svg.on('remove',function(el){
	        el.data('fake') && el.data('fake').remove();
	    });
		svg.on('textChange',function(e){
		   this.fakeTextRender(e.target);
		}.wait(90));
	});
    /*
    svg.on('beforeGevValue',function(){
        var self = this;
		self.el.find('text').each(function(i,text){
            text = $(text);
            var fake = text.data('fake');
            if(fake){
                text.show();
                fake.remove();
                text.data('fake',null);
            }
        });
    });
    */
}(qgSvg.prototype, qgSvg);