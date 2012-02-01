/*
ChocolateChip-UI
Copyright 2011 Robert Biggs: www.chocolatechip-ui.com
License: BSD
Version: 1.2.0
*/
(function(){var $=function(a,b){if(!!b){if(typeof b==="string"){return document.querySelector(b+" "+a)}else if(b.nodeType===1){return b.querySelector(a)}}else if(typeof a==="function"){$.ready(function(){a.call(a);return this})}else{return document.querySelector(a)}return false};$.extend=function(a,b){if(!Object.keys){if(!b){b=a;a=this}for(var i in b){a[i]=b[i]}return a}else{Object.keys(b).forEach(function(p){if(b.hasOwnProperty(p)){Object.defineProperty(a,p,{value:b[p],writable:true,enumerable:false,configurable:true})}})}return this};$.extend(Array.prototype,{each:Array.prototype.forEach});$.extend($,{version:"1.2.0",libraryName:"ChocolateChip",$$:function(a,b){if(!!b){if(typeof b==="string"){return[].slice.apply(document.querySelectorAll(b+" "+a))}else if(b.nodeType===1){return[].slice.apply(b.querySelectorAll(a))}}else{return[].slice.apply(document.querySelectorAll(a))}},make:function(a){var b=document.createElement("div");b.innerHTML=a;return Array.prototype.slice.apply(b.childNodes)},replace:function(a,b){b.parentNode.replaceChild(a,b)},processJSON:function(b){var c=document.createElement("script");c.setAttribute("type","text/javascript");var d=$.UIUuid();c.setAttribute("id",d);c.insert(b);$("head").insert(c,"last");$.defer(function(){var a="#"+d;$(a).remove()})}});$.extend(Object.prototype,{each:function(a){for(key in this){if(a(key,this[key])===false){return this}}}});$.extend(HTMLElement.prototype,{find:function(a){return $(a,this)},findAll:function(a){return $$(a,this)},previous:function(){return this.previousElementSibling},next:function(){return this.nextElementSibling},first:function(){return this.firstElementChild},last:function(){return this.lastElementChild},ancestor:function(a){if(!a){return false}var b=new RegExp("^#");var c=new RegExp("^.");var d=null;var e=null;var p=this.parentNode;if(!p){return false}if(typeof a==="string"){a.trim()}if(typeof a==="number"){d=a||1;for(var i=1;i<d;i++){if(p.nodeName==="HTML"){return p}else{if(p!==null){p=p.parentNode}}}return p}else if(a.substr(0,1)==="."){e=a.split(".")[1];if(p.nodeName==="BODY"){return false}if(p.hasClass(e)){return p}else{return p.ancestor(a)}}else if(a.substr(0,1)==="#"){e=a.split("#")[1];if(p.getAttribute("id")===e){return p}else{return p.ancestor(a)}}else{if(p.tagName.toLowerCase()===a){return p}else{return p.ancestor(a)}}},clone:function(a){if(a===true||!a){return this.cloneNode(true)}else{return this.cloneNode(false)}},wrap:function(a){var b=$.make(a);b=b[0];var c=this.clone(true);b.appendChild(c);this.after(b,this);this.remove(this);return this},unwrap:function(){if(this.parentNode.nodeName==="BODY"){return false}var a=this.cloneNode(true);$.replace(a,this.parentNode);return this},text:function(a){if(!!a){this.innerText=a;return this}else{return this.innerText}},fill:function(a){this.empty();if(typeof a==="string"){this.textContent=a}else{this.insert(a)}return this},empty:function(){this.removeEvents();this.textContent="";return this},remove:function(){this.removeEvents();this.parentNode.removeChild(this)},insert:function(a,b){var c="";if(typeof a==="string"){c=$.make(a)}else if(a.nodeType===1){c=[];c.push(a)}else{c=a}var i=0;var d=c.length;if(!b||b>(this.children.length+1)||b==="last"){while(i<d){this.appendChild(c[i]);i++}}else if(b===1||b==="first"){while(i<d){this.insertBefore(c[i],this.firstElementChild);i++}}else{while(i<d){this.insertBefore(c[i],this.children[b-1]);i++}}return this},prepend:function(a){this.insert(a,"first")},append:function(a){this.insert(a,"last")},before:function(a){if(typeof a==="string"){a=$.make(a)}if(a.constructor===Array){var b=a.length;var i=0;while(i<b){this.parentNode.insertBefore(a[i],this);i++}}else{this.parentNode.insertBefore(a,this)}return this},after:function(a){var b=this.parentNode;if(typeof a==="string"){a=$.make(a)}if(a.constructor===Array){var i=0,len=a.length;while(i<len){if(this===b.lastChild){b.appendChild(a[i])}else{b.insertBefore(a[i],this.nextSibling)}i++}}else{b.appendChild(a)}return this},hasClass:function(a){return new RegExp('(?:^|\\s+)'+a+'(?:\\s+|$)').test(this.className)},addClass:function(a){if(!this.hasClass(a)){this.className=[this.className,a].join(' ').replace(/^\s*|\s*$/g,"");return this}},removeClass:function(a){if(this.hasClass(a)){var b=this.className;this.className=b.replace(new RegExp('(?:^|\\s+)'+a+'(?:\\s+|$)','g'),' ').replace(/^\s*|\s*$/g,"");return this}},disable:function(){this.addClass("disabled");this.css("{cursor: default;}");this.preventDefault();return this},enable:function(){this.removeClass("disabled");this.css("{cursor: pointer;}");return this},toggleClass:function(a,b){if(!b){if(!this.hasClass(a)){this.addClass(a)}else{this.removeClass(a)}}else if(b){if(!this.hasClass(a)){this.addClass(a);this.removeClass(b)}else{this.removeClass(a);this.addClass(b)}}return this},getTop:function(){var a=this;var b=0;while(a.offsetParent){b+=a.offsetTop;a=a.offsetParent}b=b+document.body.offsetTop;return b},getLeft:function(a){a=this;var b=0;while(a.offsetParent){b+=a.offsetLeft;a=a.offsetParent}b=b+document.body.offsetLeft;return b},css:function(a,b){if(a instanceof Object){for(var c in a){this.style[c]=a[c]}}else if(typeof a==="string"&&(/:/).test(a)&&!b){this.style.cssText+=a}else if(!b){return document.defaultView.getComputedStyle(this,null).getPropertyValue(a.toLowerCase())}else if(b){this.style.cssText+=a+":"+b+";";return this}else{return false}return this},bind:function(a,b){this.addEventListener(a,b,false)},unbind:function(a,b){this.removeEventListener(a,b,false)},removeEvents:function(){var i=0,len=$.events.length;while(i<len){this[$.events[i]]=null;i++}},delegate:function(d,f,g){this.addEventListener(f,function(e){var c=e.target;$.$$(d,this).each(function(a){if(a.isSameNode(c)){g.apply(this,arguments)}else{try{var b=c.ancestor(d);if(a.isSameNode(b)){e.stopPropagation();g.call(this,b)}}catch(err){}}})},false)},trigger:function(a){if(document.createEvent){var b=document.createEvent('Events');b.initEvent(a,true,false);this.dispatchEvent(b)}},anim:function(a){var b=null;var c="-webkit-transition: all "+(a.duration+" "||".5s ")+(a.easing+";")||"linear;";for(var d in a.values){if(d==="onEnd"){b=a.values[d];this.bind("webkitTransitionEnd",b())}else{c+=d+":"+a.values[d]+";"}}this.css(c)},xhr:function(b,c){var o=c?c:{};var d=null;var e=null;if(!!c){if(!!c.successCallback||!!c.success){d=c.successCallback||c.success}}var f=this,request=new XMLHttpRequest(),method=o.method||'get',async=o.async||false,params=o.data||null,i=0;request.queryString=params;request.open(method,b,async);if(o.headers){for(;i<o.headers.length;i++){request.setRequestHeader(o.headers[i].name,o.headers[i].value)}}request.handleResp=(d!==null)?d:function(){f.insert(this.responseText)};function hdl(){if(request.status===0||request.status==200&&request.readyState==4){$.responseText=request.responseText;request.handleResp()}else{if(!!c.errorCallback||!!c.error){var a=c.errorCallback||c.error;a()}}}if(async)request.onreadystatechange=hdl;request.send(params);if(!async)hdl();return this},xhrjson:function(b,d){if(d==="undefined"){return this}var c=d.successCallback;if(typeof c!='function'){c=function(x){return x}}var e=function(){var o=eval('('+this.responseText+')');for(var a in o){$(d[a]).fill(c(o[a]))}};d.successCallback=e;this.xhr(b,d);return this},data:function(a,b){if(!!document.documentElement.dataset){a=a.camelize();if(!b){if(/\{/.test(b)){return JSON.parse(this.dataset[a])}else{return this.dataset[a]}}else{if(typeof b==="object"){this.dataset[a]=JSON.stringify(b)}else{this.dataset[a]=b}}}else{if(!b){if(/\{/.test(b)){return JSON.parse(this.getAttribute("data-"+a))}else{return this.getAttribute("data-"+a)}}else{if(typeof b==="object"){this.setAttribute("data-"+a,JSON.stringify(b))}else{this.setAttribute("data-"+a,b)}}}return this},removeData:function(a){if(!!document.documentElement.dataset){a=a.camelize();this.dataset[a]=null}else{this.removeAttribute("data-"+a)}},UICheckForOverflow:function(){var a=this.css("overflow");if(!a||a==="visible"){this.style.overflow="hidden"}var b=this.clientWidth<this.scrollWidth||this.clientHeight<this.scrollHeight;this.css("overflow",a);return b}});$.extend(String.prototype,{capitalize:function(){var a=this;return a.charAt(0).toUpperCase()+a.substring(1).toLowerCase()},capitalizeAll:function(){var b=this.split(" ");var c=[];b.each(function(a){c.push(a.capitalize())});return c.join(" ")},camelize:function(){return this.replace(/\-(.)/g,function(m,l){return l.toUpperCase()})},deCamelize:function(){return this.replace(/([A-Z])/g,'-$1').toLowerCase()}});$.extend($,{delay:function(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(a,c)},b)},defer:function(a){return $.delay.apply($,[a,1].concat(Array.prototype.slice.call(arguments,1)))},enclose:function(b,c){return function(){var a=[b].concat(Array.prototype.slice.call(arguments));return c.apply(c,a)}},compose:function(){var b=Array.prototype.slice.call(arguments);return function(){var a=Array.prototype.slice.call(arguments);for(var i=b.length-1;i>=0;i--){a=[b[i].apply(this,a)]}return a[0]}},events:['onmousedown','onmouseup','onmouseover','onmouseout','onclick','onmousemove','ondblclick','onerror','onresize','onscroll','onkeydown','onkeyup','onkeypress','onchange','onsubmit','onload','ontouchstart','ontouchmove','ontouchend','ontouchcancel','ongesturestart','ongesturechange','ongestureend','onorientationchange'],loadEvent:function(F){var a=window.onload;if(typeof window.onload!=='function'){window.onload=F}else{window.onload=function(){a();F()}}},DOMReadyList:[],executeWhenDOMReady:function(){var a=$.DOMReadyList.length;var i=0;while(i<a){$.DOMReadyList[i]();i++}$.DOMReadyList=null;document.removeEventListener('DOMContentLoaded',$.executeWhenDOMReady,false)},ready:function(a){if($.DOMReadyList.length===0){document.addEventListener('DOMContentLoaded',$.executeWhenDOMReady,false)}$.DOMReadyList.push(a)},UIHideURLbar:function(){window.scrollTo(0,1)},importScript:function(a){var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("src",a);$("head").appendChild(b)},iphone:/iphone/img.test(navigator.userAgent),ipad:/ipad/img.test(navigator.userAgent),ipod:/ipod/img.test(navigator.userAgent),ios:/ip(hone|od|ad)/img.test(navigator.userAgent),android:/android/img.test(navigator.userAgent),webos:/webos/img.test(navigator.userAgent),blackberry:/blackberry/img.test(navigator.userAgent),touchEnabled:("createTouch"in document),online:navigator.onLine,standalone:navigator.standalone,ios4:navigator.userAgent.match(/OS 4/i),ios5:navigator.userAgent.match(/OS 5/i),safari5:navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1]<534,safari5_1:navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1]>=534,localItem:function(a,b){try{if(!b){try{b=localStorage.getItem(a);if(b[0]==="{"){b=JSON.parse(b)}return b}catch(e){}}if(typeof b==="object"){b=JSON.stringify(b)}localStorage.setItem(a,b)}catch(err){if(e==="QUOTA_EXCEEDED_ERR"){console.error('Quota exceeded for localStorage!')}}return this},deleteLocalItem:function(a){try{localStorage.removeItem(a)}catch(e){}},clearLocalItems:function(){localStorage.clear()},templates:{},template:function(c,d){if($.ajaxStatus===null||$.ajaxStatus===false){return d}if($.templates[c]){c=$.templates[c]}else{c=c}var e='var p=[],print=function(){p.push.apply(p,arguments);};with(obj||{}){p.push(\'';var f;var g;if(/\{\{/.test(c)||(/$\{/).test(c)){f=/\$\{([\s\S]+?)\}/g;g=/\{\{([\s\S]+?)\}\}/g}else if(/\[\[/.test(c)||(/$\[/).test(c)){f=/\$\[([\s\S]+?)\]/g;g=/\[\[([\s\S]+?)\]\]/g}else if(/<%=/.test(c)||(/<%/).test(c)){f=/<%=([\s\S]+?)%>/g;g=/<%([\s\S]+?)%>/g}e+=c.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(f,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(g||null,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g,' ')+"p.push('"}).replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/\t/g,'\\t')+"');} return p.join('');";var h=new Function('obj',e);return d?h(d):h},UIUpdateOrientationChange:function(){var a=$("body");if(window.innerWidth<window.innerHeight){a.removeClass("landscape");a.addClass("portrait");$.UIHideURLbar()}else{a.removeClass("portrait");a.addClass("landscape");$.UIHideURLbar()}document.addEventListener("orientationchange",function(){if(window.orientation===0||window.orientation===180){a.removeClass("landscape");a.addClass("portrait");$.UIHideURLbar()}else{a.removeClass("portrait");a.addClass("landscape");$.UIHideURLbar()}$.UIHideURLbar()},false)},UIListenForWindowResize:function(){var a=$("body");window.addEventListener("resize",function(){if(window.innerHeight>window.innerWidth){a.removeClass("landscape");a.addClass("portrait");$.UIHideURLbar()}else{a.removeClass("portrait");a.addClass("landscape");$.UIHideURLbar()}},false)},kvo:function(){this.registerObserver=function(a,b){if(this.observers===undefined){this.observers={}}if(this.observers[b]===undefined){this.observers[b]=[a]}else{this.observers[b].push(a)}};this.set=function(b,c){if(this.observers!==null&&this.observers[b]!==null){currentValue=this[b];this.observers[b].each(function(a){a.keyWillUpdate(this,b,currentValue,c)});this[b]=c}}},form2JSON:function(i,k){i=typeof i=='string'?$(i):i;k=k||'.';var l=getFormValues(i);var m={};var n={};function getFormValues(a){var b=[];var c=a.firstChild;while(c){if(c.nodeName.match(/INPUT|SELECT|TEXTAREA/i)){b.push({name:c.name,value:getFieldValue(c)})}else{var d=getFormValues(c);b=b.concat(d)}c=c.nextSibling}return b}function getFieldValue(a){if(a.nodeName==='INPUT'){if(a.type.toLowerCase()==='radio'||a.type.toLowerCase()==='checkbox'){if(a.checked){return a.value}}else{if(!a.type.toLowerCase().match(/button|reset|submit|image/i)){return a.value}}}else{if(a.nodeName==='TEXTAREA'){return a.value}else{if(a.nodeName==='SELECT'){return getSelectedOptionValue(a)}}}return''}function getSelectedOptionValue(b){var c=b.multiple;if(!c){return b.value}if(b.selectedIndex>-1){var d=[];$$("option",b).each(function(a){if(a.selected){d.push(a.value)}});return d}}l.each(function(a){var b=a.value;if(b!==''){var c=a.name;var d=c.split(k);var e=m;for(var j=0;j<d.length;j++){var f=d[j];var g;if(f.indexOf('[]')>-1&&j==d.length-1){g=f.substr(0,f.indexOf('['));if(!e[g])e[g]=[];e[g].push(b)}else{if(f.indexOf('[')>-1){g=f.substr(0,f.indexOf('['));var h=f.replace(/^[a-z]+\[|\]$/gi,'');if(!n[g]){n[g]={}}if(!e[g]){e[g]=[]}if(j==d.length-1){e[g].push(b)}else{if(!n[g][h]){e[g].push({});n[g][h]=e[g][e[g].length-1]}}e=n[g][h]}else{if(j<d.length-1){if(!e[f]){e[f]={}}e=e[f]}else{e[f]=b}}}}}});return m}});window.$chocolatechip=$;window.$$chocolatechip=$.$$;if(window.$===undefined){window.$chocolatechip=window.$=$;window.$$chocolatechip=window.$$=$.$$}})();$.ready(function(){$.UIUpdateOrientationChange();$.UIListenForWindowResize()});if(!Function.prototype.bind){Function.prototype.bind=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b||{},c.concat(Array.prototype.slice.call(arguments)))}}}