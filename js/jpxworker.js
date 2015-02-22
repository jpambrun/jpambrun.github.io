/*
 jpxTest 2014-11-14 
*/
"use strict";importScripts("jpx.js","util.js","arithmetic_decoder.js"),self.onmessage=function(a){var b=new Uint8Array(a.data),c=(new Uint8Array(a.data),new JpxImage),d=Date.now();c.parse(b);var e=Date.now(),f=e-d,g=Math.round(b.length/1024),h=c.width,i=c.height,j=(c.componentsCount,c.tiles.length,c.tiles[0]),k=j.items;self.postMessage({pixelData:k.buffer,width:h,height:i,fileSize:g,decodeTime:f},[k.buffer])};