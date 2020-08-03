!function(r){function e(o){if(t[o])return t[o].exports;var n=t[o]={exports:{},id:o,loaded:!1};return r[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var t={};return e.m=r,e.c=t,e.p="dest",e(0)}([function(r,e,t){"use strict";importScripts("https://d3js.org/d3.v3.min.js"),Array.prototype.findIndex||(Array.prototype.findIndex=function(r){if(null===this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var e,t=Object(this),o=t.length>>>0,n=arguments[1],a=0;a<o;a++)if(e=t[a],r.call(n,e,a,t))return a;return-1});var o=t(1),n=t(2).sortNumeric,a=t(3),i=t(4);onmessage=function(r){console.log("Message received from main script");var e=[],t=[];d3.csv("https://storage.googleapis.com/co-publicdata/grants.csv",function(r){d3.csv("../data/keypts.csv",function(s){s.forEach(function(r){e.indexOf(r.govname)===-1&&(e.push(r.govname),t.push([parseFloat(r.longitude),parseFloat(r.latitude)]),e.push(r.lgid),t.push([parseFloat(r.longitude),parseFloat(r.latitude)])),"EIAF"===r.program&&r.projectnmbr>0&&e.indexOf("#"+r.projectnmbr)===-1&&(e.push("#"+r.projectnmbr),t.push([parseFloat(r.longitude),parseFloat(r.latitude)])),"EIAF"===r.program&&r.projectnmbr>0&&e.indexOf("#"+r.projectnmbr)===-1&&(e.push("#"+r.projectnmbr),t.push([parseFloat(r.longitude),parseFloat(r.latitude)]))});var u=r.map(function(r){return a(r,s)}),p=u.filter(function(r){return!!r}),l=i(p);l.forEach(function(r){return o(r)}),l=l.sort(n),console.log("Posting message back to main script"),postMessage([l,e,t]),close()})})}},function(r,e){"use strict";var t=[];r.exports=function(r){function e(r){var e=(r-o)/864e5;return e}var o=new Date(2e3,0,1);t.indexOf(r.lgid)===-1&&t.push(r.lgid);var n=t.indexOf(r.lgid),a=1e8*n,i=r.program;"DR"===i&&(a+=1e5),"FML"===i&&(a+=12e5),"CTF"===i&&(a+=11e5),"SEV_DIST"===i&&(a+=1e6),"CSBG"===i&&(a+=6e5),"CDBG"!==i&&"CDBGED"!==i&&"CDBGPF"!==i||(a+=5e5),"EIAF"===i&&(a+=2e5),"GAME"===i&&(a+=3e5),"REDI"===i&&(a+=4e5),"MJ"!==i&&"GBMJ"!==i||(a+=13e5),"VFP"===i&&(a+=8e5),"SAR"!==i&&"SAR Tier 1"!==i&&"SAR Tier 3"!==i&&"SAR Tier 2"!==i&&"SAR EoY"!==i||(a+=7e5),"FFB"===i&&(a+=9e5),"CVRF"===i&&(a+=14e5);var s=Math.random();return a=a+e(r.dateofaward)+s,r.id=a,r}},function(r,e){"use strict";r.exports.sortNumeric=function(r,e){return r.id<e.id?1:-1},r.exports.monthNumStr=function(r){return"JAN"===r?0:"FEB"===r?1:"MAR"===r?2:"APR"===r?3:"MAY"===r?4:"JUN"===r?5:"JUL"===r?6:"AUG"===r?7:"SEP"===r?8:"OCT"===r?9:"NOV"===r?10:"DEC"===r?11:(console.log(r),console.log("unexpected fall through on monthNumStr"),99)}},function(r,e,t){"use strict";var o=t(2).monthNumStr;r.exports=function(r,e){function t(e,t,o){if(o[t].lgid===r.lgid)return!0}"FML_SB106"===r.program&&(r.program="FML");var n=r.dateofaward.split("-"),a=new Date(Number("20"+n[2]),o(n[1]),Number(n[0]));"null"===r.projectnmbr&&(r.projectnmbr=""),"null"===r.projname&&(r.projname=r.program+" Distribution");var i=e.findIndex(t);if(i>-1){var s={};return s.award=parseFloat(r.award),s.dateofaward=a,s.govname=e[i].govname,s.latitude=parseFloat(e[i].latitude),s.longitude=parseFloat(e[i].longitude),s.lgid=r.lgid,s.lgtype=parseInt(e[i].lgtype,10),s.program=r.program,s.projectnmbr=r.projectnmbr,s.projname=r.projname,s}console.log("problem? no match for "+r.lgid),console.log("please add an entry in the keypts.csv file for "+r.lgid)}},function(r,e){"use strict";r.exports=function(r){var e=[],t=r.map(function(r){var t=r.lgid;e.hasOwnProperty(t)?e[t]++:e[t]=0;var o=r.latitude+.002*e[t],n=r.longitude;return r.latLng=[o,n],r});return t}}]);