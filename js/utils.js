/*
 jpxTest 2015-02-23 
*/
function getUrlParameter(a){"use strict";for(var b=window.location.search.substring(1),c=b.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if(e[0]==a)return e[1]}}function getParameterByName(a,b){b=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var c=new RegExp("[\\?&]"+b+"=([^&#]*)"),d=c.exec(a);return null===d?"":decodeURIComponent(d[1].replace(/\+/g," "))}function parseImageId(a){var b,c,d=a.indexOf(":"),e=a.indexOf("?"),f=a.substring(0,d);return-1===e?b=a.substring(d+1):(b=a.substring(d+1,e),c=getParameterByName(a,"quality")),{scheme:f,url:b,requestedQuality:Number(c)}}