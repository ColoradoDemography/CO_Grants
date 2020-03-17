// @flow

module.exports = function() {

    'use strict';

    var basemaps: Object = {};

    basemaps.mbAttr = "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> | © <a href='https://www.openstreetmap.org/copyright'><span class='ifmobile'>OSM</span><span                                 class='notmobile'>OpenStreetMap</span> Contributors</a> | <a href='#' id='devcred'>Credits</a><span id='ifmobile' class='ifmobile' ></span>",
        basemaps.mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg';


    basemaps.emerald = L.tileLayer(basemaps.mbUrl, {
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/outdoors-v11',
        attribution: basemaps.mbAttr
    });


    basemaps.classic = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.streets-basic',
        attribution: basemaps.mbAttr
    });

    basemaps.light = L.tileLayer(basemaps.mbUrl, {
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: 'mapbox/light-v10',
        attribution: basemaps.mbAttr
    });
    
        
    return basemaps;

}