/*
 jpxTest 2015-02-19 
*/
"use strict";function info(a){PDFJS.verbosity>=PDFJS.VERBOSITY_LEVELS.infos&&console.log("Info: "+a)}function warn(a){PDFJS.verbosity>=PDFJS.VERBOSITY_LEVELS.warnings&&console.log("Warning: "+a)}function error(a){if(arguments.length>1){var b=["Error:"];b.push.apply(b,arguments),console.log.apply(console,b),a=[].join.call(arguments," ")}else console.log("Error: "+a);throw console.log(backtrace()),UnsupportedManager.notify(UNSUPPORTED_FEATURES.unknown),new Error(a)}function backtrace(){try{throw new Error}catch(a){return a.stack?a.stack.split("\n").slice(2).join("\n"):""}}function assert(a,b){a||error(b)}function combineUrl(a,b){if(!b)return a;if(/^[a-z][a-z0-9+\-.]*:/i.test(b))return b;var c;if("/"===b.charAt(0))return c=a.indexOf("://"),"/"===b.charAt(1)?++c:c=a.indexOf("/",c+3),a.substring(0,c)+b;var d=a.length;c=a.lastIndexOf("#"),d=c>=0?c:d,c=a.lastIndexOf("?",d),d=c>=0?c:d;var e=a.lastIndexOf("/",d);return a.substring(0,e+1)+b}function isValidUrl(a,b){if(!a)return!1;var c=/^[a-z][a-z0-9+\-.]*(?=:)/i.exec(a);if(!c)return b;switch(c=c[0].toLowerCase()){case"http":case"https":case"ftp":case"mailto":return!0;default:return!1}}function shadow(a,b,c){return Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!1}),c}function bytesToString(a){var b=a.length,c=8192;if(c>b)return String.fromCharCode.apply(null,a);for(var d=[],e=0;b>e;e+=c){var f=Math.min(e+c,b),g=a.subarray(e,f);d.push(String.fromCharCode.apply(null,g))}return d.join("")}function stringToBytes(a){for(var b=a.length,c=new Uint8Array(b),d=0;b>d;++d)c[d]=255&a.charCodeAt(d);return c}function string32(a){return String.fromCharCode(a>>24&255,a>>16&255,a>>8&255,255&a)}function log2(a){for(var b=1,c=0;a>b;)b<<=1,c++;return c}function readInt8(a,b){return a[b]<<24>>24}function readUint16(a,b){return a[b]<<8|a[b+1]}function readUint32(a,b){return(a[b]<<24|a[b+1]<<16|a[b+2]<<8|a[b+3])>>>0}function isLittleEndian(){var a=new Uint8Array(2);a[0]=1;var b=new Uint16Array(a.buffer);return 1===b[0]}function hasCanvasTypedArrays(){var a=document.createElement("canvas");a.width=a.height=1;var b=a.getContext("2d"),c=b.createImageData(1,1);return"undefined"!=typeof c.data.buffer}function stringToPDFString(a){var b,c=a.length,d=[];if("þ"===a[0]&&"ÿ"===a[1])for(b=2;c>b;b+=2)d.push(String.fromCharCode(a.charCodeAt(b)<<8|a.charCodeAt(b+1)));else for(b=0;c>b;++b){var e=PDFStringTranslateTable[a.charCodeAt(b)];d.push(e?String.fromCharCode(e):a.charAt(b))}return d.join("")}function stringToUTF8String(a){return decodeURIComponent(escape(a))}function isEmptyObj(a){for(var b in a)return!1;return!0}function isBool(a){return"boolean"==typeof a}function isInt(a){return"number"==typeof a&&(0|a)===a}function isNum(a){return"number"==typeof a}function isString(a){return"string"==typeof a}function isNull(a){return null===a}function isName(a){return a instanceof Name}function isCmd(a,b){return a instanceof Cmd&&(void 0===b||a.cmd===b)}function isDict(a,b){if(!(a instanceof Dict))return!1;if(!b)return!0;var c=a.get("Type");return isName(c)&&c.name===b}function isArray(a){return a instanceof Array}function isStream(a){return"object"==typeof a&&null!==a&&void 0!==a.getBytes}function isArrayBuffer(a){return"object"==typeof a&&null!==a&&void 0!==a.byteLength}function isRef(a){return a instanceof Ref}function createPromiseCapability(){var a={};return a.promise=new Promise(function(b,c){a.resolve=b,a.reject=c}),a}function MessageHandler(a,b){this.name=a,this.comObj=b,this.callbackIndex=1,this.postMessageTransfers=!0;var c=this.callbacksCapabilities={},d=this.actionHandler={};d.console_log=[function(a){console.log.apply(console,a)}],d.console_error=[function(a){console.error.apply(console,a)}],d._unsupported_feature=[function(a){UnsupportedManager.notify(a)}],b.onmessage=function(a){var e=a.data;if(e.isReply){var f=e.callbackId;if(e.callbackId in c){var g=c[f];delete c[f],"error"in e?g.reject(e.error):g.resolve(e.data)}else error("Cannot resolve callback "+f)}else if(e.action in d){var h=d[e.action];e.callbackId?Promise.resolve().then(function(){return h[0].call(h[1],e.data)}).then(function(a){b.postMessage({isReply:!0,callbackId:e.callbackId,data:a})},function(a){b.postMessage({isReply:!0,callbackId:e.callbackId,error:a})}):h[0].call(h[1],e.data)}else error("Unknown action from worker: "+e.action)}}function loadJpegStream(a,b,c){var d=new Image;d.onload=function(){c.resolve(a,d)},d.onerror=function(){c.resolve(a,null),warn("Error during JPEG image loading")},d.src=b}var globalScope="undefined"==typeof window?this:window,isWorker="undefined"==typeof window,FONT_IDENTITY_MATRIX=[.001,0,0,.001,0,0],TextRenderingMode={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4},ImageKind={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3},AnnotationType={WIDGET:1,TEXT:2,LINK:3},StreamType={UNKNOWN:0,FLATE:1,LZW:2,DCT:3,JPX:4,JBIG:5,A85:6,AHX:7,CCF:8,RL:9},FontType={UNKNOWN:0,TYPE1:1,TYPE1C:2,CIDFONTTYPE0:3,CIDFONTTYPE0C:4,TRUETYPE:5,CIDFONTTYPE2:6,TYPE3:7,OPENTYPE:8,TYPE0:9,MMTYPE1:10};globalScope.PDFJS||(globalScope.PDFJS={}),globalScope.PDFJS.pdfBug=!1,PDFJS.VERBOSITY_LEVELS={errors:0,warnings:1,infos:5};var OPS=PDFJS.OPS={dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91},UNSUPPORTED_FEATURES=PDFJS.UNSUPPORTED_FEATURES={unknown:"unknown",forms:"forms",javaScript:"javaScript",smask:"smask",shadingPattern:"shadingPattern",font:"font"},UnsupportedManager=PDFJS.UnsupportedManager=function(){var a=[];return{listen:function(b){a.push(b)},notify:function(b){warn('Unsupported feature "'+b+'"');for(var c=0,d=a.length;d>c;c++)a[c](b)}}}();PDFJS.isValidUrl=isValidUrl;var PasswordResponses=PDFJS.PasswordResponses={NEED_PASSWORD:1,INCORRECT_PASSWORD:2},PasswordException=function(){function a(a,b){this.name="PasswordException",this.message=a,this.code=b}return a.prototype=new Error,a.constructor=a,a}(),UnknownErrorException=function(){function a(a,b){this.name="UnknownErrorException",this.message=a,this.details=b}return a.prototype=new Error,a.constructor=a,a}(),InvalidPDFException=function(){function a(a){this.name="InvalidPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}(),MissingPDFException=function(){function a(a){this.name="MissingPDFException",this.message=a}return a.prototype=new Error,a.constructor=a,a}(),NotImplementedException=function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="NotImplementedException",a.constructor=a,a}(),MissingDataException=function(){function a(a,b){this.begin=a,this.end=b,this.message="Missing data ["+a+", "+b+")"}return a.prototype=new Error,a.prototype.name="MissingDataException",a.constructor=a,a}(),XRefParseException=function(){function a(a){this.message=a}return a.prototype=new Error,a.prototype.name="XRefParseException",a.constructor=a,a}();Object.defineProperty(PDFJS,"isLittleEndian",{configurable:!0,get:function(){return shadow(PDFJS,"isLittleEndian",isLittleEndian())}}),Object.defineProperty(PDFJS,"hasCanvasTypedArrays",{configurable:!0,get:function(){return shadow(PDFJS,"hasCanvasTypedArrays",hasCanvasTypedArrays())}});var Uint32ArrayView=function(){function a(a,b){this.buffer=a,this.byteLength=a.length,this.length=void 0===b?this.byteLength>>2:b,c(this.length)}function b(a){return{get:function(){var b=this.buffer,c=a<<2;return(b[c]|b[c+1]<<8|b[c+2]<<16|b[c+3]<<24)>>>0},set:function(b){var c=this.buffer,d=a<<2;c[d]=255&b,c[d+1]=b>>8&255,c[d+2]=b>>16&255,c[d+3]=b>>>24&255}}}function c(c){for(;c>d;)Object.defineProperty(a.prototype,d,b(d)),d++}a.prototype=Object.create(null);var d=0;return a}(),IDENTITY_MATRIX=[1,0,0,1,0,0],Util=PDFJS.Util=function(){function a(){}var b=["rgb(",0,",",0,",",0,")"];return a.makeCssRgb=function(a){return b[1]=a[0],b[3]=a[1],b[5]=a[2],b.join("")},a.transform=function(a,b){return[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]]},a.applyTransform=function(a,b){var c=a[0]*b[0]+a[1]*b[2]+b[4],d=a[0]*b[1]+a[1]*b[3]+b[5];return[c,d]},a.applyInverseTransform=function(a,b){var c=b[0]*b[3]-b[1]*b[2],d=(a[0]*b[3]-a[1]*b[2]+b[2]*b[5]-b[4]*b[3])/c,e=(-a[0]*b[1]+a[1]*b[0]+b[4]*b[1]-b[5]*b[0])/c;return[d,e]},a.getAxialAlignedBoundingBox=function(b,c){var d=a.applyTransform(b,c),e=a.applyTransform(b.slice(2,4),c),f=a.applyTransform([b[0],b[3]],c),g=a.applyTransform([b[2],b[1]],c);return[Math.min(d[0],e[0],f[0],g[0]),Math.min(d[1],e[1],f[1],g[1]),Math.max(d[0],e[0],f[0],g[0]),Math.max(d[1],e[1],f[1],g[1])]},a.inverseTransform=function(a){var b=a[0]*a[3]-a[1]*a[2];return[a[3]/b,-a[1]/b,-a[2]/b,a[0]/b,(a[2]*a[5]-a[4]*a[3])/b,(a[4]*a[1]-a[5]*a[0])/b]},a.apply3dTransform=function(a,b){return[a[0]*b[0]+a[1]*b[1]+a[2]*b[2],a[3]*b[0]+a[4]*b[1]+a[5]*b[2],a[6]*b[0]+a[7]*b[1]+a[8]*b[2]]},a.singularValueDecompose2dScale=function(a){var b=[a[0],a[2],a[1],a[3]],c=a[0]*b[0]+a[1]*b[2],d=a[0]*b[1]+a[1]*b[3],e=a[2]*b[0]+a[3]*b[2],f=a[2]*b[1]+a[3]*b[3],g=(c+f)/2,h=Math.sqrt((c+f)*(c+f)-4*(c*f-e*d))/2,i=g+h||1,j=g-h||1;return[Math.sqrt(i),Math.sqrt(j)]},a.normalizeRect=function(a){var b=a.slice(0);return a[0]>a[2]&&(b[0]=a[2],b[2]=a[0]),a[1]>a[3]&&(b[1]=a[3],b[3]=a[1]),b},a.intersect=function(b,c){function d(a,b){return a-b}var e=[b[0],b[2],c[0],c[2]].sort(d),f=[b[1],b[3],c[1],c[3]].sort(d),g=[];return b=a.normalizeRect(b),c=a.normalizeRect(c),e[0]===b[0]&&e[1]===c[0]||e[0]===c[0]&&e[1]===b[0]?(g[0]=e[1],g[2]=e[2],f[0]===b[1]&&f[1]===c[1]||f[0]===c[1]&&f[1]===b[1]?(g[1]=f[1],g[3]=f[2],g):!1):!1},a.sign=function(a){return 0>a?-1:1},a.appendToArray=function(a,b){Array.prototype.push.apply(a,b)},a.prependToArray=function(a,b){Array.prototype.unshift.apply(a,b)},a.extendObj=function(a,b){for(var c in b)a[c]=b[c]},a.getInheritableProperty=function(a,b){for(;a&&!a.has(b);)a=a.get("Parent");return a?a.get(b):null},a.inherit=function(a,b,c){a.prototype=Object.create(b.prototype),a.prototype.constructor=a;for(var d in c)a.prototype[d]=c[d]},a.loadScript=function(a,b){var c=document.createElement("script"),d=!1;c.setAttribute("src",a),b&&(c.onload=function(){d||b(),d=!0}),document.getElementsByTagName("head")[0].appendChild(c)},a}(),PageViewport=PDFJS.PageViewport=function(){function a(a,b,c,d,e,f){this.viewBox=a,this.scale=b,this.rotation=c,this.offsetX=d,this.offsetY=e;var g,h,i,j,k=(a[2]+a[0])/2,l=(a[3]+a[1])/2;switch(c%=360,c=0>c?c+360:c){case 180:g=-1,h=0,i=0,j=1;break;case 90:g=0,h=1,i=1,j=0;break;case 270:g=0,h=-1,i=-1,j=0;break;default:g=1,h=0,i=0,j=-1}f&&(i=-i,j=-j);var m,n,o,p;0===g?(m=Math.abs(l-a[1])*b+d,n=Math.abs(k-a[0])*b+e,o=Math.abs(a[3]-a[1])*b,p=Math.abs(a[2]-a[0])*b):(m=Math.abs(k-a[0])*b+d,n=Math.abs(l-a[1])*b+e,o=Math.abs(a[2]-a[0])*b,p=Math.abs(a[3]-a[1])*b),this.transform=[g*b,h*b,i*b,j*b,m-g*b*k-i*b*l,n-h*b*k-j*b*l],this.width=o,this.height=p,this.fontScale=b}return a.prototype={clone:function(b){b=b||{};var c="scale"in b?b.scale:this.scale,d="rotation"in b?b.rotation:this.rotation;return new a(this.viewBox.slice(),c,d,this.offsetX,this.offsetY,b.dontFlip)},convertToViewportPoint:function(a,b){return Util.applyTransform([a,b],this.transform)},convertToViewportRectangle:function(a){var b=Util.applyTransform([a[0],a[1]],this.transform),c=Util.applyTransform([a[2],a[3]],this.transform);return[b[0],b[1],c[0],c[1]]},convertToPdfPoint:function(a,b){return Util.applyInverseTransform([a,b],this.transform)}},a}(),PDFStringTranslateTable=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364];PDFJS.createPromiseCapability=createPromiseCapability,function(){function a(a){this._status=b,this._handlers=[];try{a.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(c){this._reject(c)}}if(globalScope.Promise)return"function"!=typeof globalScope.Promise.all&&(globalScope.Promise.all=function(a){var b,c,d=0,e=[],f=new globalScope.Promise(function(a,d){b=a,c=d});return a.forEach(function(a,f){d++,a.then(function(a){e[f]=a,d--,0===d&&b(e)},c)}),0===d&&b(e),f}),"function"!=typeof globalScope.Promise.resolve&&(globalScope.Promise.resolve=function(a){return new globalScope.Promise(function(b){b(a)})}),"function"!=typeof globalScope.Promise.reject&&(globalScope.Promise.reject=function(a){return new globalScope.Promise(function(b,c){c(a)})}),void("function"!=typeof globalScope.Promise.prototype.catch&&(globalScope.Promise.prototype.catch=function(a){return globalScope.Promise.prototype.then(void 0,a)}));var b=0,c=1,d=2,e=500,f={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(a){a._status!==b&&(this.handlers=this.handlers.concat(a._handlers),a._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},runHandlers:function(){for(var a=1,b=Date.now()+a;this.handlers.length>0;){var e=this.handlers.shift(),f=e.thisPromise._status,g=e.thisPromise._value;try{f===c?"function"==typeof e.onResolve&&(g=e.onResolve(g)):"function"==typeof e.onReject&&(g=e.onReject(g),f=c,e.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(e.thisPromise))}catch(h){f=d,g=h}if(e.nextPromise._updateStatus(f,g),Date.now()>=b)break}return this.handlers.length>0?void setTimeout(this.runHandlers.bind(this),0):void(this.running=!1)},addUnhandledRejection:function(a){this.unhandledRejections.push({promise:a,time:Date.now()}),this.scheduleRejectionCheck()},removeUnhandeledRejection:function(a){a._unhandledRejection=!1;for(var b=0;b<this.unhandledRejections.length;b++)this.unhandledRejections[b].promise===a&&(this.unhandledRejections.splice(b),b--)},scheduleRejectionCheck:function(){this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){this.pendingRejectionCheck=!1;for(var a=Date.now(),b=0;b<this.unhandledRejections.length;b++)if(a-this.unhandledRejections[b].time>e){var c=this.unhandledRejections[b].promise._value,d="Unhandled rejection: "+c;c.stack&&(d+="\n"+c.stack),warn(d),this.unhandledRejections.splice(b),b--}this.unhandledRejections.length&&this.scheduleRejectionCheck()}.bind(this),e))}};a.all=function(b){function c(a){g._status!==d&&(i=[],f(a))}var e,f,g=new a(function(a,b){e=a,f=b}),h=b.length,i=[];if(0===h)return e(i),g;for(var j=0,k=b.length;k>j;++j){var l=b[j],m=function(a){return function(b){g._status!==d&&(i[a]=b,h--,0===h&&e(i))}}(j);a.isPromise(l)?l.then(m,c):m(l)}return g},a.isPromise=function(a){return a&&"function"==typeof a.then},a.resolve=function(b){return new a(function(a){a(b)})},a.reject=function(b){return new a(function(a,c){c(b)})},a.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(b,e){if(this._status!==c&&this._status!==d){if(b===c&&a.isPromise(e))return void e.then(this._updateStatus.bind(this,c),this._updateStatus.bind(this,d));this._status=b,this._value=e,b===d&&0===this._handlers.length&&(this._unhandledRejection=!0,f.addUnhandledRejection(this)),f.scheduleHandlers(this)}},_resolve:function(a){this._updateStatus(c,a)},_reject:function(a){this._updateStatus(d,a)},then:function(b,c){var d=new a(function(a,b){this.resolve=a,this.reject=b});return this._handlers.push({thisPromise:this,onResolve:b,onReject:c,nextPromise:d}),f.scheduleHandlers(this),d},"catch":function(a){return this.then(void 0,a)}},globalScope.Promise=a}();var StatTimer=function(){function a(a,b,c){for(;a.length<c;)a+=b;return a}function b(){this.started={},this.times=[],this.enabled=!0}return b.prototype={time:function(a){this.enabled&&(a in this.started&&warn("Timer is already running for "+a),this.started[a]=Date.now())},timeEnd:function(a){this.enabled&&(a in this.started||warn("Timer has not been started for "+a),this.times.push({name:a,start:this.started[a],end:Date.now()}),delete this.started[a])},toString:function(){var b,c,d=this.times,e="",f=0;for(b=0,c=d.length;c>b;++b){var g=d[b].name;g.length>f&&(f=g.length)}for(b=0,c=d.length;c>b;++b){var h=d[b],i=h.end-h.start;e+=a(h.name," ",f)+" "+i+"ms\n"}return e}},b}();PDFJS.createBlob=function(a,b){if("undefined"!=typeof Blob)return new Blob([a],{type:b});var c=new MozBlobBuilder;return c.append(a),c.getBlob(b)},PDFJS.createObjectURL=function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return function(b,c){if(!PDFJS.disableCreateObjectURL&&"undefined"!=typeof URL&&URL.createObjectURL){var d=PDFJS.createBlob(b,c);return URL.createObjectURL(d)}for(var e="data:"+c+";base64,",f=0,g=b.length;g>f;f+=3){var h=255&b[f],i=255&b[f+1],j=255&b[f+2],k=h>>2,l=(3&h)<<4|i>>4,m=g>f+1?(15&i)<<2|j>>6:64,n=g>f+2?63&j:64;e+=a[k]+a[l]+a[m]+a[n]}return e}}(),MessageHandler.prototype={on:function(a,b,c){var d=this.actionHandler;d[a]&&error('There is already an actionName called "'+a+'"'),d[a]=[b,c]},send:function(a,b,c){var d={action:a,data:b};this.postMessage(d,c)},sendWithPromise:function(a,b,c){var d=this.callbackIndex++,e={action:a,data:b,callbackId:d},f=createPromiseCapability();this.callbacksCapabilities[d]=f;try{this.postMessage(e,c)}catch(g){f.reject(g)}return f.promise},postMessage:function(a,b){b&&this.postMessageTransfers?this.comObj.postMessage(a,b):this.comObj.postMessage(a)}};