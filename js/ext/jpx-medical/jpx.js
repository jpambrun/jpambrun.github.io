/*
 jpxTest 2015-02-20 
*/
"use strict";var JpxImage=function(){function a(){this.failOnCorruptedImage=!0}function b(a,b){a.x0=Math.ceil(b.XOsiz/a.XRsiz),a.x1=Math.ceil(b.Xsiz/a.XRsiz),a.y0=Math.ceil(b.YOsiz/a.YRsiz),a.y1=Math.ceil(b.Ysiz/a.YRsiz),a.width=a.x1-a.x0,a.height=a.y1-a.y0}function c(a,b){for(var c,d=a.SIZ,e=[],f=Math.ceil((d.Xsiz-d.XTOsiz)/d.XTsiz),g=Math.ceil((d.Ysiz-d.YTOsiz)/d.YTsiz),h=0;g>h;h++)for(var i=0;f>i;i++)c={},c.tx0=Math.max(d.XTOsiz+i*d.XTsiz,d.XOsiz),c.ty0=Math.max(d.YTOsiz+h*d.YTsiz,d.YOsiz),c.tx1=Math.min(d.XTOsiz+(i+1)*d.XTsiz,d.Xsiz),c.ty1=Math.min(d.YTOsiz+(h+1)*d.YTsiz,d.Ysiz),c.width=c.tx1-c.tx0,c.height=c.ty1-c.ty0,c.components=[],e.push(c);a.tiles=e;for(var j=d.Csiz,k=0,l=j;l>k;k++)for(var m=b[k],n=0,o=e.length;o>n;n++){var p={};c=e[n],p.tcx0=Math.ceil(c.tx0/m.XRsiz),p.tcy0=Math.ceil(c.ty0/m.YRsiz),p.tcx1=Math.ceil(c.tx1/m.XRsiz),p.tcy1=Math.ceil(c.ty1/m.YRsiz),p.width=p.tcx1-p.tcx0,p.height=p.tcy1-p.tcy0,c.components[k]=p}}function d(a,b,c){var d=b.codingStyleParameters,e={};return d.entropyCoderWithCustomPrecincts?(e.PPx=d.precinctsSizes[c].PPx,e.PPy=d.precinctsSizes[c].PPy):(e.PPx=15,e.PPy=15),e.xcb_=c>0?Math.min(d.xcb,e.PPx-1):Math.min(d.xcb,e.PPx),e.ycb_=c>0?Math.min(d.ycb,e.PPy-1):Math.min(d.ycb,e.PPy),e}function e(a,b,c){var d=1<<c.PPx,e=1<<c.PPy,f=0===b.resLevel,g=1<<c.PPx+(f?0:-1),h=1<<c.PPy+(f?0:-1),i=b.trx1>b.trx0?Math.ceil(b.trx1/d)-Math.floor(b.trx0/d):0,j=b.try1>b.try0?Math.ceil(b.try1/e)-Math.floor(b.try0/e):0,k=i*j;b.precinctParameters={precinctWidth:d,precinctHeight:e,numprecinctswide:i,numprecinctshigh:j,numprecincts:k,precinctWidthInSubband:g,precinctHeightInSubband:h}}function f(a,b,c){var d,e,f,g,h=c.xcb_,i=c.ycb_,j=1<<h,k=1<<i,l=b.tbx0>>h,m=b.tby0>>i,n=b.tbx1+j-1>>h,o=b.tby1+k-1>>i,p=b.resolution.precinctParameters,q=[],r=[];for(e=m;o>e;e++)for(d=l;n>d;d++){f={cbx:d,cby:e,tbx0:j*d,tby0:k*e,tbx1:j*(d+1),tby1:k*(e+1)},f.tbx0_=Math.max(b.tbx0,f.tbx0),f.tby0_=Math.max(b.tby0,f.tby0),f.tbx1_=Math.min(b.tbx1,f.tbx1),f.tby1_=Math.min(b.tby1,f.tby1);var s=Math.floor((f.tbx0_-b.tbx0)/p.precinctWidthInSubband),t=Math.floor((f.tby0_-b.tby0)/p.precinctHeightInSubband);if(g=s+t*p.numprecinctswide,f.precinctNumber=g,f.subbandType=b.type,f.Lblock=3,!(f.tbx1_<=f.tbx0_||f.tby1_<=f.tby0_)){q.push(f);var u=r[g];void 0!==u?(d<u.cbxMin?u.cbxMin=d:d>u.cbxMax&&(u.cbxMax=d),e<u.cbyMin?u.cbxMin=e:e>u.cbyMax&&(u.cbyMax=e)):r[g]=u={cbxMin:d,cbyMin:e,cbxMax:d,cbyMax:e},f.precinct=u}}b.codeblockParameters={codeblockWidth:h,codeblockHeight:i,numcodeblockwide:n-l+1,numcodeblockhigh:o-m+1},b.codeblocks=q,b.precincts=r}function g(a,b,c){for(var d=[],e=a.subbands,f=0,g=e.length;g>f;f++)for(var h=e[f],i=h.codeblocks,j=0,k=i.length;k>j;j++){var l=i[j];l.precinctNumber===b&&d.push(l)}return{layerNumber:c,codeblocks:d}}function h(a){for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,h=0,i=0;f>i;i++)h=Math.max(h,d.components[i].codingStyleParameters.decompositionLevelsCount);var j=0,k=0,l=0,m=0;this.nextPacket=function(){for(;e>j;j++){for(;h>=k;k++){for(;f>l;l++){var a=d.components[l];if(!(k>a.codingStyleParameters.decompositionLevelsCount)){for(var b=a.resolutions[k],c=b.precinctParameters.numprecincts;c>m;){var i=g(b,m,j);return m++,i}m=0}}l=0}k=0}}}function i(a){for(var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,h=0,i=0;f>i;i++)h=Math.max(h,d.components[i].codingStyleParameters.decompositionLevelsCount);var j=0,k=0,l=0,m=0;this.nextPacket=function(){for(;h>=j;j++){for(;e>k;k++){for(;f>l;l++){var a=d.components[l];if(!(j>a.codingStyleParameters.decompositionLevelsCount)){for(var b=a.resolutions[j],c=b.precinctParameters.numprecincts;c>m;){var i=g(b,m,k);return m++,i}m=0}}l=0}k=0}}}function j(a){var b,c,d,e,f=a.SIZ,h=a.currentTile.index,i=a.tiles[h],j=i.codingStyleDefaultParameters.layersCount,k=f.Csiz,l=0;for(d=0;k>d;d++){var m=i.components[d];l=Math.max(l,m.codingStyleParameters.decompositionLevelsCount)}var n=new Int32Array(l+1);for(c=0;l>=c;++c){var o=0;for(d=0;k>d;++d){var p=i.components[d].resolutions;c<p.length&&(o=Math.max(o,p[c].precinctParameters.numprecincts))}n[c]=o}b=0,c=0,d=0,e=0,this.nextPacket=function(){for(;l>=c;c++){for(;e<n[c];e++){for(;k>d;d++){var a=i.components[d];if(!(c>a.codingStyleParameters.decompositionLevelsCount)){var f=a.resolutions[c],h=f.precinctParameters.numprecincts;if(!(e>=h)){for(;j>b;){var m=g(f,e,b);return b++,m}b=0}}}d=0}e=0}}}function k(a){var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,h=n(d),i=h,j=0,k=0,l=0,o=0,p=0;this.nextPacket=function(){for(;p<i.maxNumHigh;p++){for(;o<i.maxNumWide;o++){for(;f>l;l++){for(var a=d.components[l],b=a.codingStyleParameters.decompositionLevelsCount;b>=k;k++){var c=a.resolutions[k],n=h.components[l].resolutions[k],q=m(o,p,n,i,c);if(null!==q){for(;e>j;){var r=g(c,q,j);return j++,r}j=0}}k=0}l=0}o=0}}}function l(a){var b=a.SIZ,c=a.currentTile.index,d=a.tiles[c],e=d.codingStyleDefaultParameters.layersCount,f=b.Csiz,h=n(d),i=0,j=0,k=0,l=0,o=0;this.nextPacket=function(){for(;f>k;++k){for(var a=d.components[k],b=h.components[k],c=a.codingStyleParameters.decompositionLevelsCount;o<b.maxNumHigh;o++){for(;l<b.maxNumWide;l++){for(;c>=j;j++){var n=a.resolutions[j],p=b.resolutions[j],q=m(l,o,p,b,n);if(null!==q){for(;e>i;){var r=g(n,q,i);return i++,r}i=0}}j=0}l=0}o=0}}}function m(a,b,c,d,e){var f=a*d.minWidth,g=b*d.minHeight;if(f%c.width!==0||g%c.height!==0)return null;var h=g/c.width*e.precinctParameters.numprecinctswide;return f/c.height+h}function n(a){for(var b=a.components.length,c=Number.MAX_VALUE,d=Number.MAX_VALUE,e=0,f=0,g=new Array(b),h=0;b>h;h++){for(var i=a.components[h],j=i.codingStyleParameters.decompositionLevelsCount,k=new Array(j+1),l=Number.MAX_VALUE,m=Number.MAX_VALUE,n=0,o=0,p=1,q=j;q>=0;--q){var r=i.resolutions[q],s=p*r.precinctParameters.precinctWidth,t=p*r.precinctParameters.precinctHeight;l=Math.min(l,s),m=Math.min(m,t),n=Math.max(n,r.precinctParameters.numprecinctswide),o=Math.max(o,r.precinctParameters.numprecinctshigh),k[q]={width:s,height:t},p<<=1}c=Math.min(c,l),d=Math.min(d,m),e=Math.max(e,n),f=Math.max(f,o),g[h]={resolutions:k,minWidth:l,minHeight:m,maxNumWide:n,maxNumHigh:o}}return{components:g,minWidth:c,minHeight:d,maxNumWide:e,maxNumHigh:f}}function o(a){for(var b=a.SIZ,c=a.currentTile.index,g=a.tiles[c],m=b.Csiz,n=0;m>n;n++){for(var o=g.components[n],p=o.codingStyleParameters.decompositionLevelsCount,q=[],r=[],s=0;p>=s;s++){var t=d(a,o,s),u={},v=1<<p-s;u.trx0=Math.ceil(o.tcx0/v),u.try0=Math.ceil(o.tcy0/v),u.trx1=Math.ceil(o.tcx1/v),u.try1=Math.ceil(o.tcy1/v),u.resLevel=s,e(a,u,t),q.push(u);var w;if(0===s)w={},w.type="LL",w.tbx0=Math.ceil(o.tcx0/v),w.tby0=Math.ceil(o.tcy0/v),w.tbx1=Math.ceil(o.tcx1/v),w.tby1=Math.ceil(o.tcy1/v),w.resolution=u,f(a,w,t),r.push(w),u.subbands=[w];else{var x=1<<p-s+1,y=[];w={},w.type="HL",w.tbx0=Math.ceil(o.tcx0/x-.5),w.tby0=Math.ceil(o.tcy0/x),w.tbx1=Math.ceil(o.tcx1/x-.5),w.tby1=Math.ceil(o.tcy1/x),w.resolution=u,f(a,w,t),r.push(w),y.push(w),w={},w.type="LH",w.tbx0=Math.ceil(o.tcx0/x),w.tby0=Math.ceil(o.tcy0/x-.5),w.tbx1=Math.ceil(o.tcx1/x),w.tby1=Math.ceil(o.tcy1/x-.5),w.resolution=u,f(a,w,t),r.push(w),y.push(w),w={},w.type="HH",w.tbx0=Math.ceil(o.tcx0/x-.5),w.tby0=Math.ceil(o.tcy0/x-.5),w.tbx1=Math.ceil(o.tcx1/x-.5),w.tby1=Math.ceil(o.tcy1/x-.5),w.resolution=u,f(a,w,t),r.push(w),y.push(w),u.subbands=y}}o.resolutions=q,o.subbands=r}var z=g.codingStyleDefaultParameters.progressionOrder;switch(z){case 0:g.packetsIterator=new h(a);break;case 1:g.packetsIterator=new i(a);break;case 2:g.packetsIterator=new j(a);break;case 3:g.packetsIterator=new k(a);break;case 4:g.packetsIterator=new l(a);break;default:throw new Error("JPX Error: Unsupported progression order "+z)}}function p(a,b,c,d){function e(a){for(;a>l;){var d=b[c+k];k++,m?(j=j<<7|d,l+=7,m=!1):(j=j<<8|d,l+=8),255===d&&(m=!0)}return l-=a,j>>>l&(1<<a)-1}function f(a){return 255===b[c+k-1]&&b[c+k]===a?(g(1),!0):255===b[c+k]&&b[c+k+1]===a?(g(2),!0):!1}function g(a){k+=a}function h(){l=0,m&&(k++,m=!1)}function i(){if(0===e(1))return 1;if(0===e(1))return 2;var a=e(2);return 3>a?a+3:(a=e(5),31>a?a+6:(a=e(7),a+37))}for(var j,k=0,l=0,m=!1,n=a.currentTile.index,o=a.tiles[n],p=a.COD.sopMarkerUsed,q=a.COD.ephMarkerUsed,r=o.packetsIterator;d>k;){h(),p&&f(145)&&g(4);var s=r.nextPacket();if(void 0===s)return;if(e(1)){for(var t,u=s.layerNumber,x=[],y=0,z=s.codeblocks.length;z>y;y++){t=s.codeblocks[y];var A,B=t.precinct,C=t.cbx-B.cbxMin,D=t.cby-B.cbyMin,E=!1,F=!1;if(void 0!==t.included)E=!!e(1);else{B=t.precinct;var G,H;if(void 0!==B.inclusionTree)G=B.inclusionTree;else{var I=B.cbxMax-B.cbxMin+1,J=B.cbyMax-B.cbyMin+1;G=new w(I,J,u),H=new v(I,J),B.inclusionTree=G,B.zeroBitPlanesTree=H;for(var K=0;u>K;K++)if(0!==e(1))throw new Error("JPX Error: Invalid tag tree")}if(G.reset(C,D,u))for(;;){if(!e(1)){G.incrementValue(u);break}if(A=!G.nextLevel()){t.included=!0,E=F=!0;break}}}if(E){if(F){for(H=B.zeroBitPlanesTree,H.reset(C,D);;)if(e(1)){if(A=!H.nextLevel())break}else H.incrementValue();t.zeroBitPlanes=H.value}for(var L=i();e(1);)t.Lblock++;var M=log2(L),N=(1<<M>L?M-1:M)+t.Lblock,O=e(N);x.push({codeblock:t,codingpasses:L,dataLength:O})}}for(h(),q&&f(146);x.length>0;){var P=x.shift();t=P.codeblock,void 0===t.data&&(t.data=[]),t.data.push({data:b,start:c+k,end:c+k+P.dataLength,codingpasses:P.codingpasses}),k+=P.dataLength}}}return k}function q(a,b,c,d,e,f,g,h){for(var i=d.tbx0,j=d.tby0,k=d.tbx1-d.tbx0,l=d.codeblocks,m="H"===d.type.charAt(0)?1:0,n="H"===d.type.charAt(1)?b:0,o=0,p=l.length;p>o;++o){var q=l[o],r=q.tbx1_-q.tbx0_,s=q.tby1_-q.tby0_;if(0!==r&&0!==s&&void 0!==q.data){var t,u;t=new x(r,s,q.subbandType,q.zeroBitPlanes,f),u=2;var v,w,y,z=q.data,A=0,B=0;for(v=0,w=z.length;w>v;v++)y=z[v],A+=y.end-y.start,B+=y.codingpasses;var C=new Int16Array(A),D=0;for(v=0,w=z.length;w>v;v++){y=z[v];var E=y.data.subarray(y.start,y.end);C.set(E,D),D+=E.length}var F=new ArithmeticDecoder(C,0,A);for(t.setDecoder(F),v=0;B>v;v++){switch(u){case 0:t.runSignificancePropogationPass();break;case 1:t.runMagnitudeRefinementPass();break;case 2:t.runCleanupPass(),h&&t.checkSegmentationSymbol()}u=(u+1)%3}var G,H,I,J=q.tbx0_-i+(q.tby0_-j)*k,K=t.coefficentsSign,L=t.coefficentsMagnitude,M=t.bitsDecoded,N=g?0:.5;D=0;var O="LL"!==d.type;for(v=0;s>v;v++){var P=J/k|0,Q=2*P*(b-k)+m+n;for(G=0;r>G;G++){if(H=L[D],0!==H){H=(H+N)*e,0!==K[D]&&(H=-H),I=M[D];var R=O?Q+(J<<1):J;a[R]=g&&I>=f?H:H*(1<<f-I)}J++,D++}J+=k-r}}}}function r(a,b,c){for(var d=b.components[c],e=d.codingStyleParameters,f=d.quantizationParameters,g=e.decompositionLevelsCount,h=f.SPqcds,i=f.scalarExpounded,j=f.guardBits,k=e.segmentationSymbolUsed,l=a.components[c].precision,m=e.reversibleTransformation,n=m?new A:new z,o=[],p=0,r=0;g>=r;r++){for(var s=d.resolutions[r],t=s.trx1-s.trx0,v=s.try1-s.try0,w=new Float32Array(t*v),x=0,y=s.subbands.length;y>x;x++){var B,C;i?(B=h[p].mu,C=h[p].epsilon,p++):(B=h[0].mu,C=h[0].epsilon+(r>0?1-r:0));var D=s.subbands[x],E=u[D.type],F=m?1:Math.pow(2,l+E-C)*(1+B/2048),G=j+C-1;q(w,t,v,D,F,G,m,k)}o.push({width:t,height:v,items:w})}var H=n.calculate(o,d.tcx0,d.tcy0);return{left:d.tcx0,top:d.tcy0,width:H.width,height:H.height,items:H.items}}function s(a){for(var b=a.SIZ,c=a.components,d=b.Csiz,e=[],f=0,g=a.tiles.length;g>f;f++){var h,i=a.tiles[f],j=[];for(h=0;d>h;h++)j[h]=r(a,i,h);var k,l,m,n,o,p,q,s,t,u,v,w,x,y,z,A=j[0],B=new Int16Array(A.items.length*d),C={left:A.left,top:A.top,width:A.width,height:A.height,items:B},D=0;if(i.codingStyleDefaultParameters.multipleComponentTransform){var E=4===d,F=j[0].items,G=j[1].items,H=j[2].items,I=E?j[3].items:null;k=c[0].precision-8,l=(128<<k)+.5,m=255*(1<<k),o=.5*m,n=-o;var J=i.components[0],K=d-3;if(q=F.length,J.codingStyleParameters.reversibleTransformation)for(p=0;q>p;p++,D+=K)s=F[p]+l,t=G[p],u=H[p],w=s-(u+t>>2),v=w+u,x=w+t,B[D++]=0>=v?0:v>=m?255:v>>k,B[D++]=0>=w?0:w>=m?255:w>>k,B[D++]=0>=x?0:x>=m?255:x>>k;else for(p=0;q>p;p++,D+=K)s=F[p]+l,t=G[p],u=H[p],v=s+1.402*u,w=s-.34413*t-.71414*u,x=s+1.772*t,B[D++]=0>=v?0:v>=m?255:v>>k,B[D++]=0>=w?0:w>=m?255:w>>k,B[D++]=0>=x?0:x>=m?255:x>>k;if(E)for(p=0,D=3;q>p;p++,D+=4)y=I[p],B[D]=n>=y?0:y>=o?255:y+l>>k}else for(h=0;d>h;h++)if(8===c[h].precision){var L=j[h].items;for(k=c[h].precision-8,l=(128<<k)+.5,m=127.5*(1<<k),n=-m,D=h,p=0,q=L.length;q>p;p++)z=L[p],B[D]=n>=z?0:z>=m?255:z+l>>k,D+=d}else{var M=c[h].isSigned,L=j[h].items;for(M?(k=0,l=0):(k=c[h].precision-8,l=(128<<k)+.5),D=h,p=0,q=L.length;q>p;p++)z=L[p],B[D]=z+l,D+=d}e.push(C)}return e}function t(a,b){for(var c=a.SIZ,d=c.Csiz,e=a.tiles[b],f=0;d>f;f++){var g=e.components[f],h=void 0!==a.currentTile.QCC[f]?a.currentTile.QCC[f]:a.currentTile.QCD;g.quantizationParameters=h;var i=void 0!==a.currentTile.COC[f]?a.currentTile.COC[f]:a.currentTile.COD;g.codingStyleParameters=i}e.codingStyleDefaultParameters=a.currentTile.COD}var u={LL:0,LH:1,HL:1,HH:2};a.prototype={parse:function(a){var b=readUint16(a,0);if(65359===b)return void this.parseCodestream(a,0,a.length);for(var c=0,d=a.length;d>c;){var e=8,f=readUint32(a,c),g=readUint32(a,c+4);if(c+=e,1===f&&(f=4294967296*readUint32(a,c)+readUint32(a,c+4),c+=8,e+=8),0===f&&(f=d-c+e),e>f)throw new Error("JPX Error: Invalid box field size");var h=f-e,i=!0;switch(g){case 1785737832:i=!1;break;case 1668246642:{var j=a[c];a[c+1],a[c+2]}if(1===j){var k=readUint32(a,c+3);switch(k){case 16:case 17:case 18:break;default:warn("Unknown colorspace "+k)}}else 2===j&&info("ICC profile not supported");break;case 1785737827:this.parseCodestream(a,c,c+h);break;case 1783636e3:218793738!==readUint32(a,c)&&warn("Invalid JP2 signature");break;case 1783634458:case 1718909296:case 1920099697:case 1919251232:case 1768449138:break;default:var l=String.fromCharCode(g>>24&255,g>>16&255,g>>8&255,255&g);warn("Unsupported header type "+g+" ("+l+")")}i&&(c+=h)}},parseImageProperties:function(a){for(var b=a.getByte();b>=0;){var c=b;b=a.getByte();var d=c<<8|b;if(65361===d){a.skip(4);var e=a.getInt32()>>>0,f=a.getInt32()>>>0,g=a.getInt32()>>>0,h=a.getInt32()>>>0;a.skip(16);var i=a.getUint16();return this.width=e-g,this.height=f-h,this.componentsCount=i,void(this.bitsPerComponent=8)}}throw new Error("JPX Error: No size marker found in JPX stream")},parseCodestream:function(a,d,e){var f={};try{for(var g=!1,h=d;e>h+1;){var i=readUint16(a,h);h+=2;var j,k,l,m,n,q,r=0;switch(i){case 65359:f.mainHeader=!0;break;case 65497:break;case 65361:r=readUint16(a,h);var u={};u.Xsiz=readUint32(a,h+4),u.Ysiz=readUint32(a,h+8),u.XOsiz=readUint32(a,h+12),u.YOsiz=readUint32(a,h+16),u.XTsiz=readUint32(a,h+20),u.YTsiz=readUint32(a,h+24),u.XTOsiz=readUint32(a,h+28),u.YTOsiz=readUint32(a,h+32);var v=readUint16(a,h+36);u.Csiz=v;var w=[];j=h+38;for(var x=0;v>x;x++){var y={precision:(127&a[j])+1,isSigned:!!(128&a[j]),XRsiz:a[j+1],YRsiz:a[j+1]};b(y,u),w.push(y)}f.SIZ=u,f.components=w,c(f,w),f.QCC=[],f.COC=[];break;case 65372:r=readUint16(a,h);var z={};switch(j=h+2,k=a[j++],31&k){case 0:m=8,n=!0;break;case 1:m=16,n=!1;break;case 2:m=16,n=!0;break;default:throw new Error("JPX Error: Invalid SQcd value "+k)}for(z.noQuantization=8===m,z.scalarExpounded=n,z.guardBits=k>>5,l=[];r+h>j;){var A={};8===m?(A.epsilon=a[j++]>>3,A.mu=0):(A.epsilon=a[j]>>3,A.mu=(7&a[j])<<8|a[j+1],j+=2),l.push(A)}z.SPqcds=l,f.mainHeader?f.QCD=z:(f.currentTile.QCD=z,f.currentTile.QCC=[]);break;case 65373:r=readUint16(a,h);var B={};j=h+2;var C;switch(f.SIZ.Csiz<257?C=a[j++]:(C=readUint16(a,j),j+=2),k=a[j++],31&k){case 0:m=8,n=!0;break;case 1:m=16,n=!1;break;case 2:m=16,n=!0;break;default:throw new Error("JPX Error: Invalid SQcd value "+k)}for(B.noQuantization=8===m,B.scalarExpounded=n,B.guardBits=k>>5,l=[];r+h>j;)A={},8===m?(A.epsilon=a[j++]>>3,A.mu=0):(A.epsilon=a[j]>>3,A.mu=(7&a[j])<<8|a[j+1],j+=2),l.push(A);B.SPqcds=l,f.mainHeader?f.QCC[C]=B:f.currentTile.QCC[C]=B;break;case 65362:r=readUint16(a,h);var D={};j=h+2;var E=a[j++];D.entropyCoderWithCustomPrecincts=!!(1&E),D.sopMarkerUsed=!!(2&E),D.ephMarkerUsed=!!(4&E),D.progressionOrder=a[j++],D.layersCount=readUint16(a,j),j+=2,D.multipleComponentTransform=a[j++],D.decompositionLevelsCount=a[j++],D.xcb=(15&a[j++])+2,D.ycb=(15&a[j++])+2;var F=a[j++];if(D.selectiveArithmeticCodingBypass=!!(1&F),D.resetContextProbabilities=!!(2&F),D.terminationOnEachCodingPass=!!(4&F),D.verticalyStripe=!!(8&F),D.predictableTermination=!!(16&F),D.segmentationSymbolUsed=!!(32&F),D.reversibleTransformation=a[j++],D.entropyCoderWithCustomPrecincts){for(var G=[];r+h>j;){var H=a[j++];G.push({PPx:15&H,PPy:H>>4})}D.precinctsSizes=G}var I=[];if(D.selectiveArithmeticCodingBypass&&I.push("selectiveArithmeticCodingBypass"),D.resetContextProbabilities&&I.push("resetContextProbabilities"),D.terminationOnEachCodingPass&&I.push("terminationOnEachCodingPass"),D.verticalyStripe&&I.push("verticalyStripe"),D.predictableTermination&&I.push("predictableTermination"),I.length>0)throw g=!0,new Error("JPX Error: Unsupported COD options ("+I.join(", ")+")");f.mainHeader?f.COD=D:(f.currentTile.COD=D,f.currentTile.COC=[]);break;case 65424:r=readUint16(a,h),q={},q.index=readUint16(a,h+2),q.length=readUint32(a,h+4),q.dataEnd=q.length+h-2,q.partIndex=a[h+8],q.partsCount=a[h+9],f.mainHeader=!1,0===q.partIndex&&(q.COD=f.COD,q.COC=f.COC.slice(0),q.QCD=f.QCD,q.QCC=f.QCC.slice(0)),f.currentTile=q;break;case 65427:q=f.currentTile,0===q.partIndex&&(t(f,q.index),o(f)),r=q.dataEnd-h,p(f,a,h,r);break;case 65365:case 65367:case 65368:case 65380:case 65363:r=readUint16(a,h);break;default:throw new Error("JPX Error: Unknown codestream code: "+i.toString(16))}h+=r}}catch(J){if(g||this.failOnCorruptedImage)throw J;warn("Trying to recover from "+J.message)}this.tiles=s(f),this.width=f.SIZ.Xsiz-f.SIZ.XOsiz,this.height=f.SIZ.Ysiz-f.SIZ.YOsiz,this.componentsCount=f.SIZ.Csiz}};var v=function(){function a(a,b){var c=log2(Math.max(a,b))+1;this.levels=[];for(var d=0;c>d;d++){var e={width:a,height:b,items:[]};this.levels.push(e),a=Math.ceil(a/2),b=Math.ceil(b/2)}}return a.prototype={reset:function(a,b){for(var c,d=0,e=0;d<this.levels.length;){c=this.levels[d];var f=a+b*c.width;if(void 0!==c.items[f]){e=c.items[f];break}c.index=f,a>>=1,b>>=1,d++}d--,c=this.levels[d],c.items[c.index]=e,this.currentLevel=d,delete this.value},incrementValue:function(){var a=this.levels[this.currentLevel];a.items[a.index]++},nextLevel:function(){var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];return a--,0>a?(this.value=c,!1):(this.currentLevel=a,b=this.levels[a],b.items[b.index]=c,!0)}},a}(),w=function(){function a(a,b,c){var d=log2(Math.max(a,b))+1;this.levels=[];for(var e=0;d>e;e++){for(var f=new Int16Array(a*b),g=0,h=f.length;h>g;g++)f[g]=c;var i={width:a,height:b,items:f};this.levels.push(i),a=Math.ceil(a/2),b=Math.ceil(b/2)}}return a.prototype={reset:function(a,b,c){for(var d=0;d<this.levels.length;){var e=this.levels[d],f=a+b*e.width;e.index=f;var g=e.items[f];if(255===g)break;if(g>c)return this.currentLevel=d,this.propagateValues(),!1;a>>=1,b>>=1,d++}return this.currentLevel=d-1,!0},incrementValue:function(a){var b=this.levels[this.currentLevel];b.items[b.index]=a+1,this.propagateValues()},propagateValues:function(){for(var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];--a>=0;)b=this.levels[a],b.items[b.index]=c},nextLevel:function(){var a=this.currentLevel,b=this.levels[a],c=b.items[b.index];return b.items[b.index]=255,a--,0>a?!1:(this.currentLevel=a,b=this.levels[a],b.items[b.index]=c,!0)}},a}(),x=function(){function a(a,b,c,g,h){this.width=a,this.height=b,this.contextLabelTable="HH"===c?f:"HL"===c?e:d;var i=a*b;this.neighborsSignificance=new Uint8Array(i),this.coefficentsSign=new Uint8Array(i),this.coefficentsMagnitude=h>14?new Uint32Array(i):h>6?new Uint16Array(i):new Uint8Array(i),this.processingFlags=new Uint8Array(i);var j=new Uint8Array(i);if(0!==g)for(var k=0;i>k;k++)j[k]=g;this.bitsDecoded=j,this.reset()}var b=17,c=18,d=new Uint8Array([0,5,8,0,3,7,8,0,4,7,8,0,0,0,0,0,1,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8]),e=new Uint8Array([0,3,4,0,5,7,7,0,8,8,8,0,0,0,0,0,1,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8]),f=new Uint8Array([0,1,2,0,1,2,2,0,2,2,2,0,0,0,0,0,3,4,5,0,4,5,5,0,5,5,5,0,0,0,0,0,6,7,7,0,7,7,7,0,7,7,7,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8]);return a.prototype={setDecoder:function(a){this.decoder=a},reset:function(){this.contexts=new Int8Array(19),this.contexts[0]=8,this.contexts[b]=92,this.contexts[c]=6},setNeighborsSignificance:function(a,b,c){var d,e=this.neighborsSignificance,f=this.width,g=this.height,h=b>0,i=f>b+1;a>0&&(d=c-f,h&&(e[d-1]+=16),i&&(e[d+1]+=16),e[d]+=4),g>a+1&&(d=c+f,h&&(e[d-1]+=16),i&&(e[d+1]+=16),e[d]+=4),h&&(e[c-1]+=1),i&&(e[c+1]+=1),e[c]|=128},runSignificancePropogationPass:function(){for(var a=this.decoder,b=this.width,c=this.height,d=this.coefficentsMagnitude,e=this.coefficentsSign,f=this.neighborsSignificance,g=this.processingFlags,h=this.contexts,i=this.contextLabelTable,j=this.bitsDecoded,k=-2,l=1,m=2,n=0;c>n;n+=4)for(var o=0;b>o;o++)for(var p=n*b+o,q=0;4>q;q++,p+=b){var r=n+q;if(r>=c)break;if(g[p]&=k,!d[p]&&f[p]){var s=i[f[p]],t=a.readBit(h,s);if(t){var u=this.decodeSignBit(r,o,p);e[p]=u,d[p]=1,this.setNeighborsSignificance(r,o,p),g[p]|=m}j[p]++,g[p]|=l}}},decodeSignBit:function(a,b,c){var d,e,f,g,h,i,j=this.width,k=this.height,l=this.coefficentsMagnitude,m=this.coefficentsSign;g=b>0&&0!==l[c-1],j>b+1&&0!==l[c+1]?(f=m[c+1],g?(e=m[c-1],d=1-f-e):d=1-f-f):g?(e=m[c-1],d=1-e-e):d=0;var n=3*d;return g=a>0&&0!==l[c-j],k>a+1&&0!==l[c+j]?(f=m[c+j],g?(e=m[c-j],d=1-f-e+n):d=1-f-f+n):g?(e=m[c-j],d=1-e-e+n):d=n,d>=0?(h=9+d,i=this.decoder.readBit(this.contexts,h)):(h=9-d,i=1^this.decoder.readBit(this.contexts,h)),i},runMagnitudeRefinementPass:function(){for(var a,b=this.decoder,c=this.width,d=this.height,e=this.coefficentsMagnitude,f=this.neighborsSignificance,g=this.contexts,h=this.bitsDecoded,i=this.processingFlags,j=1,k=2,l=c*d,m=4*c,n=0;l>n;n=a){a=Math.min(l,n+m);for(var o=0;c>o;o++)for(var p=n+o;a>p;p+=c)if(e[p]&&0===(i[p]&j)){var q=16;if(0!==(i[p]&k)){i[p]^=k;var r=127&f[p];q=0===r?15:14}var s=b.readBit(g,q);e[p]=e[p]<<1|s,h[p]++,i[p]|=j}}},runCleanupPass:function(){for(var a,d=this.decoder,e=this.width,f=this.height,g=this.neighborsSignificance,h=this.coefficentsMagnitude,i=this.coefficentsSign,j=this.contexts,k=this.contextLabelTable,l=this.bitsDecoded,m=this.processingFlags,n=1,o=2,p=e,q=2*e,r=3*e,s=0;f>s;s=a){a=Math.min(s+4,f);for(var t=s*e,u=f>s+3,v=0;e>v;v++){var w,x=t+v,y=u&&0===m[x]&&0===m[x+p]&&0===m[x+q]&&0===m[x+r]&&0===g[x]&&0===g[x+p]&&0===g[x+q]&&0===g[x+r],z=0,A=x,B=s;if(y){var C=d.readBit(j,c);if(!C){l[x]++,l[x+p]++,l[x+q]++,l[x+r]++;continue}z=d.readBit(j,b)<<1|d.readBit(j,b),0!==z&&(B=s+z,A+=z*e),w=this.decodeSignBit(B,v,A),i[A]=w,h[A]=1,this.setNeighborsSignificance(B,v,A),m[A]|=o,A=x;for(var D=s;B>=D;D++,A+=e)l[A]++;z++}for(B=s+z;a>B;B++,A+=e)if(!h[A]&&0===(m[A]&n)){var E=k[g[A]],F=d.readBit(j,E);1===F&&(w=this.decodeSignBit(B,v,A),i[A]=w,h[A]=1,this.setNeighborsSignificance(B,v,A),m[A]|=o),l[A]++}}}},checkSegmentationSymbol:function(){var a=this.decoder,c=this.contexts,d=a.readBit(c,b)<<3|a.readBit(c,b)<<2|a.readBit(c,b)<<1|a.readBit(c,b);if(10!==d)throw new Error("JPX Error: Invalid segmentation symbol")}},a}(),y=function(){function a(){}return a.prototype.calculate=function(a,b,c){for(var d=a[0],e=1,f=a.length;f>e;e++)d=this.iterate(d,a[e],b,c);return d},a.prototype.extend=function(a,b,c){var d=b-1,e=b+1,f=b+c-2,g=b+c;a[d--]=a[e++],a[g++]=a[f--],a[d--]=a[e++],a[g++]=a[f--],a[d--]=a[e++],a[g++]=a[f--],a[d]=a[e],a[g]=a[f]},a.prototype.iterate=function(a,b,c,d){var e,f,g,h,i,j,k=a.width,l=a.height,m=a.items,n=b.width,o=b.height,p=b.items;for(g=0,e=0;l>e;e++)for(h=2*e*n,f=0;k>f;f++,g++,h+=2)p[h]=m[g];m=a.items=null;var q=4,r=new Float32Array(n+2*q);if(1===n){if(0!==(1&c))for(j=0,g=0;o>j;j++,g+=n)p[g]*=.5}else for(j=0,g=0;o>j;j++,g+=n)r.set(p.subarray(g,g+n),q),this.extend(r,q,n),this.filter(r,q,n),p.set(r.subarray(q,q+n),g);var s=16,t=[];for(e=0;s>e;e++)t.push(new Float32Array(o+2*q));var u,v=0;if(a=q+o,1===o){if(0!==(1&d))for(i=0;n>i;i++)p[i]*=.5}else for(i=0;n>i;i++){if(0===v){for(s=Math.min(n-i,s),g=i,h=q;a>h;g+=n,h++)for(u=0;s>u;u++)t[u][h]=p[g+u];v=s}v--;var w=t[v];if(this.extend(w,q,o),this.filter(w,q,o),0===v)for(g=i-s+1,h=q;a>h;g+=n,h++)for(u=0;s>u;u++)p[g+u]=t[u][h]}return{width:n,height:o,items:p}},a}(),z=function(){function a(){y.call(this)}return a.prototype=Object.create(y.prototype),a.prototype.filter=function(a,b,c){var d=c>>1;b=0|b;var e,f,g,h,i=-1.586134342059924,j=-.052980118572961,k=.882911075530934,l=.443506852043971,m=1.230174104914001,n=1/m;for(e=b-3,f=d+4;f--;e+=2)a[e]*=n;for(e=b-2,g=l*a[e-1],f=d+3;f--&&(h=l*a[e+1],a[e]=m*a[e]-g-h,f--);e+=2)e+=2,g=l*a[e+1],a[e]=m*a[e]-g-h;for(e=b-1,g=k*a[e-1],f=d+2;f--&&(h=k*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=k*a[e+1],a[e]-=g+h;for(e=b,g=j*a[e-1],f=d+1;f--&&(h=j*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=j*a[e+1],a[e]-=g+h;if(0!==d)for(e=b+1,g=i*a[e-1],f=d;f--&&(h=i*a[e+1],a[e]-=g+h,f--);e+=2)e+=2,g=i*a[e+1],a[e]-=g+h},a}(),A=function(){function a(){y.call(this)}return a.prototype=Object.create(y.prototype),a.prototype.filter=function(a,b,c){var d=c>>1;b=0|b;var e,f;for(e=b,f=d+1;f--;e+=2)a[e]-=a[e-1]+a[e+1]+2>>2;for(e=b+1,f=d;f--;e+=2)a[e]+=a[e-1]+a[e+1]>>1},a}();return a}();