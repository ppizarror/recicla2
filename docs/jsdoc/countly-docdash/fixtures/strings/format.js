"use strict";module.exports=function(b){var a=Array.prototype.slice.call(arguments,1);return b.replace(/{(\d+)}/g,function(c,d){return typeof a[d]!="undefined"?a[d]:c})};