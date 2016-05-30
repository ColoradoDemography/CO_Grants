/* eslint-disable */

importScripts('https://d3js.org/d3.v3.min.js');


var valueize = require("../valueize.js");
var sortNumeric = require("../util").sortNumeric;
var initial_grantdata_crunch = require("../initial_grantdata_crunch.js");
var stack_chips = require("../stack_chips");

onmessage = function(e) {
        console.log('Message received from main script');

        var searchstring = [];
        var coordinates = [];

        d3.csv("https://storage.googleapis.com/co-publicdata/grantpts.csv", function(data) {
            d3.csv("https://storage.googleapis.com/co-publicdata/keypts.csv", function(keys) {

                //seed search box            
                keys.forEach(d => {
                    //seed the search arrays
                    if (searchstring.indexOf(d.govname) === -1) {
                        searchstring.push(d.govname);
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                        searchstring.push(d.lgid);
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                    }
                    //search by EIAF project number - precede search with #
                    if (d.program === "EIAF" && d.projectnmbr > 0 && (searchstring.indexOf(("#" + d.projectnmbr)) === -1)) {
                        searchstring.push(("#" + d.projectnmbr));
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                    }
                    //search by EIAF project number - precede search with #
                    if (d.program === "EIAF" && d.projectnmbr > 0 && (searchstring.indexOf(("#" + d.projectnmbr)) === -1)) {
                        searchstring.push(("#" + d.projectnmbr));
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                    }
                });

                var data_translated: Array < Object > = data.map(d => {
                    return initial_grantdata_crunch(d, searchstring, coordinates, keys);
                });

                var cities = stack_chips(data_translated);
                cities.forEach(d => valueize(d));
                cities = cities.sort(sortNumeric);

                //create return array:  [cities,searchstring,coordinates];
                console.log('Posting message back to main script');
                postMessage([cities, searchstring, coordinates]);

                close(); //worker is finished

            }); //end d3.csv keyfile
        }); //end d3.csv data file
    } //end onmessage