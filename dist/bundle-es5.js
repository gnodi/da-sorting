!function r(e,n,t){function i(a,u){if(!n[a]){if(!e[a]){var f="function"==typeof require&&require;if(!u&&f)return f(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(r){var n=e[a][1][r];return i(n?n:r)},l,l.exports,r,e,n,t)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<t.length;a++)i(t[a]);return i}({1:[function(r,e,n){"use strict";r("./lib/relative-sorter"),r("./lib/test"),console.log([1,2].map(function(r){return r+1}))},{"./lib/relative-sorter":2,"./lib/test":3}],2:[function(r,e,n){"use strict";function t(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function r(r,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}}return function(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}}();e.exports=function(){function r(){t(this,r),this._items=Object.create(null)}return i(r,[{key:"add",value:function(r,e){var n=arguments.length<=2||void 0===arguments[2]?[]:arguments[2],t=arguments.length<=3||void 0===arguments[3]?[]:arguments[3];this._items[r]={id:r,data:e,after:n,before:t}}},{key:"sort",value:function(){var r=this._items,e=Object.create(null),n=[],t=0;for(var i in r)e[i]=0,t++;for(var o=!0,a=t-1,u=[],f=function(r){if(r>a){for(var e=u[u.length-1],n=-1,t=u.length-2;t>=0;t--)if(u[t]===e){n=t;break}throw n<0&&(n=0,u.unshift(e)),new Error("Cyclic relative orders definition ['"+u.slice(n).join("' < '")+"']")}return r};o;){o=!1;for(var c in e){var l=e[c];for(var s in r){var v=r[s],h=e[s];v.before.indexOf(c)!==-1&&h>=l&&(u.push(c),e[c]=f(h+1),o=!0),v.after.indexOf(c)!==-1&&h<=l&&(u.push(s),e[s]=f(l+1),o=!0)}}}var b=0;for(var p in e)b=Math.max(b,e[p]);for(var d=0;d<=b;d++){n[d]=[];for(var y in e)e[y]===d&&n[d].push(r[y].data)}return n}}]),r}()},{}],3:[function(r,e,n){"use strict";function t(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function r(r,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}}return function(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}}();r("./relative-sorter"),e.exports=function(){function r(){t(this,r)}return i(r,[{key:"foo",value:function(){return"bar"}}]),r}()},{"./relative-sorter":2}]},{},[1]);