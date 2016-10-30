(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';require('./lib/relative-sorter'),require('./lib/test'),console.log([1,2].map(a=>a+1));

},{"./lib/relative-sorter":2,"./lib/test":3}],2:[function(require,module,exports){
'use strict';module.exports=class{constructor(){this._items=Object.create(null)}add(b,c,d=[],e=[]){this._items[b]={id:b,data:c,after:d,before:e}}sort(){const b=this._items,c=Object.create(null),d=[];let e=0;for(const l in b)c[l]=0,e++;let f=!0;for(const g=e-1,h=[],j=l=>{if(l>g){const m=h[h.length-1];let n=-1;for(let o=h.length-2;0<=o;o--)if(h[o]===m){n=o;break}throw 0>n&&(n=0,h.unshift(m)),new Error(`Cyclic relative orders definition ['${h.slice(n).join('\' < \'')}']`)}return l};f;)for(const l in f=!1,c){const m=c[l];for(const n in b){const o=b[n],p=c[n];-1!==o.before.indexOf(l)&&p>=m&&(h.push(l),c[l]=j(p+1),f=!0),-1!==o.after.indexOf(l)&&p<=m&&(h.push(n),c[n]=j(m+1),f=!0)}}let k=0;for(const l in c)k=Math.max(k,c[l]);for(let l=0;l<=k;l++)for(const m in d[l]=[],c)c[m]===l&&d[l].push(b[m].data);return d}};

},{}],3:[function(require,module,exports){
'use strict';require('./relative-sorter'),module.exports=class{constructor(){}foo(){return'bar'}};

},{"./relative-sorter":2}]},{},[1]);
