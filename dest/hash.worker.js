!function(r){function t(o){if(e[o])return e[o].exports;var n=e[o]={exports:{},id:o,loaded:!1};return r[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var e={};return t.m=r,t.c=e,t.p="dest",t(0)}([function(r,t,e){"use strict";importScripts("https://d3js.org/d3.v3.min.js"),Array.prototype.findIndex||(Array.prototype.findIndex=function(r){if(null===this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var t,e=Object(this),o=e.length>>>0,n=arguments[1],a=0;a<o;a++)if(t=e[a],r.call(n,t,a,e))return a;return-1});var o=e(1),n=e(2).sortNumeric,a=e(3),i=e(4);onmessage=function(r){console.log("Message received from main script");var t=[],e=[];d3.csv("https://storage.googleapis.com/co-publicdata/grants.csv",function(r){d3.csv("../data/keypts.csv",function(u){u.forEach(function(r){t.indexOf(r.govname)===-1&&(t.push(r.govname),e.push([parseFloat(r.longitude),parseFloat(r.latitude)]),t.push(r.lgid),e.push([parseFloat(r.longitude),parseFloat(r.latitude)])),"EIAF"===r.program&&r.projectnmbr>0&&t.indexOf("#"+r.projectnmbr)===-1&&(t.push("#"+r.projectnmbr),e.push([parseFloat(r.longitude),parseFloat(r.latitude)])),"EIAF"===r.program&&r.projectnmbr>0&&t.indexOf("#"+r.projectnmbr)===-1&&(t.push("#"+r.projectnmbr),e.push([parseFloat(r.longitude),parseFloat(r.latitude)]))});var s=r.map(function(r){return a(r,u)}),p=s.filter(function(r){return!!r}),l=i(p);l.forEach(function(r){return o(r)}),l=l.sort(n),console.log("Posting message back to main script"),postMessage([l,t,e]),close()})})}},function(r,t){"use strict";var e=[];r.exports=function(r){function t(r){var t=(r-o)/864e5;return t}var o=new Date(2e3,0,1);e.indexOf(r.lgid)===-1&&e.push(r.lgid);var n=e.indexOf(r.lgid),a=1e8*n,i=r.program;"DR"===i&&(a+=1e5),"FML"===i&&(a+=12e5),"CTF"===i&&(a+=11e5),"SEV_DIST"===i&&(a+=1e6),"CSBG"===i&&(a+=6e5),"CDBG"===i&&(a+=5e5),"EIAF"===i&&(a+=2e5),"GAME"===i&&(a+=3e5),"REDI"===i&&(a+=4e5),"MJ"===i&&(a+=13e5),"VFP"===i&&(a+=8e5),"SAR"===i&&(a+=7e5),"FFB"===i&&(a+=9e5);var u=Math.random();return a=a+t(r.dateofaward)+u,r.id=a,r}},function(r,t){"use strict";r.exports.sortNumeric=function(r,t){return r.id<t.id?1:-1},r.exports.monthNumStr=function(r){return"JAN"===r?0:"FEB"===r?1:"MAR"===r?2:"APR"===r?3:"MAY"===r?4:"JUN"===r?5:"JUL"===r?6:"AUG"===r?7:"SEP"===r?8:"OCT"===r?9:"NOV"===r?10:"DEC"===r?11:(console.log("unexpected fall through on monthNumStr"),99)}},function(r,t,e){"use strict";var o=e(2).monthNumStr;r.exports=function(r,t){function e(t,e,o){if(o[e].lgid===r.lgid)return!0}"FML_SB106"===r.program&&(r.program="FML");var n=r.dateofaward.split("-"),a=new Date(Number("20"+n[2]),o(n[1]),Number(n[0]));"null"===r.projectnmbr&&(r.projectnmbr=""),"null"===r.projname&&(r.projname=r.program+" Distribution");var i=t.findIndex(e);if(i>-1){var u={};return u.award=parseFloat(r.award),u.dateofaward=a,u.govname=t[i].govname,u.latitude=parseFloat(t[i].latitude),u.longitude=parseFloat(t[i].longitude),u.lgid=r.lgid,u.lgtype=parseInt(t[i].lgtype,10),u.program=r.program,u.projectnmbr=r.projectnmbr,u.projname=r.projname,u}console.log("problem? no match for "+r.lgid),console.log("please add an entry in the keypts.csv file for "+r.lgid)}},function(r,t){"use strict";r.exports=function(r){var t=[],e=r.map(function(r){var e=r.lgid;t.hasOwnProperty(e)?t[e]++:t[e]=0;var o=r.latitude+.002*t[e],n=r.longitude;return r.latLng=[o,n],r});return e}}]);