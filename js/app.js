      $(document).ready( function() {


        
var mindate=new Date("Thu Jan 01 2014 00:00:00 GMT-0700");
var maxdate=new Date("Thu Jan 01 2016 00:00:00 GMT-0700");
        
        var city_federal, county_federal, district_federal, city_state, county_state, district_state, city_formula, county_formula, district_formula, city_special, county_special, district_special;
        
        
        var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
			mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

	    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
		    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});
        
		var map = L.map('map', {
    center: [39, -105.5],
    zoom: 7,
    minZoom: 6,
    maxZoom: 12, 
			layers: [grayscale],
      zoomControl:false
		});

// create the control
var sliderctrl = L.control({position: 'bottomleft'});
sliderctrl.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'sl');
  div.width = 500;
    div.innerHTML = '<div id="slider"></div>'; 
    return div;
};
sliderctrl.addTo(map);

        //disable click propogation to map below
  var diva = L.DomUtil.get('slider');
  L.DomEvent.disableClickPropagation(diva);   

        var browserwidth = $(window).width();        
$('.sl').width((browserwidth-100)+"px");
  
$( window ).resize(function() {
          var browserwidth = $(window).width();        
$('.sl').width((browserwidth-100)+"px");
console.log('changed');
});
        
        
        
        
        
        
        
//Custom Layer Control
var command = L.control({position: 'topleft'});

command.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'command');
    div.innerHTML = '<form><h4>Programs</h4><input id="federal" type="checkbox" checked />&nbsp;&nbsp;Federal<br /><input id="state" type="checkbox" checked />&nbsp;&nbsp;State<br /><input id="formula" type="checkbox" checked />&nbsp;&nbsp;Formula<br /><input id="special" type="checkbox" checked />&nbsp;&nbsp;Special<h4>Geo</h4><input id="city" type="checkbox" checked />&nbsp;&nbsp;City<br /><input id="county" type="checkbox" checked />&nbsp;&nbsp;County<br /><input id="district" type="checkbox" checked />&nbsp;&nbsp;District</form>'; 
    return div;
};

command.addTo(map);
        
        
        
function click_federal() {
   console.log("click_federal");
}
function click_state() {
   console.log("click_federal");
}
function click_formula() {
   console.log("click_federal");
}
function click_special() {
   console.log("click_federal");
}

function click_city() {
   console.log("click_federal");
}
function click_county() {
   console.log("click_federal");
}
function click_district() {
   console.log("click_federal");
}
        
        document.getElementById("federal").addEventListener ("click", click_federal, false);
        document.getElementById("state").addEventListener ("click", click_state, false);
        document.getElementById("formula").addEventListener ("click", click_formula, false);
        document.getElementById("special").addEventListener ("click", click_special, false);
        document.getElementById("city").addEventListener ("click", click_city, false);
        document.getElementById("county").addEventListener ("click", click_county, false);
        document.getElementById("district").addEventListener ("click", click_district, false);
   
     
        
        

        //function that will reduce an array to unique values
    var arrayUnique = function(a) {
      return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
        }, []);
    };
      
        //list of all lgid's in main grants json file
        var lgidlist=[]; //array of strings
        var sumtotal=[]; //array of objects
        
        var i,j;  //iterators
        
        var b={}; //temp objects
        var gjson={};
        
        for(i=0;i<grants.length;i=i+1){
          if(grants[i].lgid){lgidlist.push(grants[i].lgid);}
        }
        
        //reduce to unique values only
        lgidlist = arrayUnique(lgidlist);
        
        //join to x, y, govname
        for(i=0;i<lgidlist.length;i=i+1){
          for(j=0;j<xy.length;j=j+1){
            if(lgidlist[i]==xy[j].LG_ID){
              var coordx=xy[j].X;
              var coordy=xy[j].Y;
              if(!coordx){coordx=0;coordy=0;}
              var geom={'type': 'Point', 'coordinates':[coordy, coordx]};
              
              


              
              var state={'eiaf': [], 'game': [], 'redi': [] };
              var federal={'cdbg': [], 'csbg': [] };
              var formula={'fmldd': [], 'fmlddsb106': [], 'ctf': [], 'sevedd': [] };
              var special={'ffb': [], 'sar': [], 'vfp': [] };
              
              var projects={'state': state, 'federal': federal, 'formula': formula, 'special': special};
              
              b={'lgid': lgidlist[i], 'lgtype': xy[j].LGTYPE_ID, 'govname': xy[j].NAME, 'x': xy[j].X, 'y': xy[j].Y, 'total': 0, 'projects': projects };              
              gjson={'type': 'Feature', 'geometry': geom, 'properties': b};
              if(coordx){sumtotal.push(gjson);}else{
                //console.log(xy[j].LG_ID);
              } //remove
            }
          }
        }
        
        //loop through all projects.  add to sumtotal.  add to projects{}
         for(i=0;i<grants.length;i=i+1){
           for(j=0;j<sumtotal.length;j=j+1){
             if(grants[i].lgid===sumtotal[j].properties.lgid){
               if(grants[i].totalawarded){
                 
                 sumtotal[j].properties.total=sumtotal[j].properties.total+Number(grants[i].totalawarded); //if totalawarded exists, add it to lgidsumaward
                 
                b={'projname': grants[i].projname, 'program': grants[i].programtype, 'dateofaward': grants[i].dateofaward, 'yearofaward': grants[i].yearofaward,  'award': grants[i].totalawarded};

                 
                 //mini sums for CDBG
                 if(grants[i].programtype==='CDBG'){
                   sumtotal[j].properties.projects.federal.cdbg.push(b);
                 }
                 
                 //mini sums for CSBG
                 if(grants[i].programtype==='CSBG'){
                   sumtotal[j].properties.projects.federal.csbg.push(b);
                 }
                 
                 //mini sums for CTF
                 if(grants[i].programtype==='CTF'){
                   sumtotal[j].properties.projects.formula.ctf.push(b);
                 }        
                 
                 //mini sums for EIAF
                 if(grants[i].programtype==='EIAF'){
                   sumtotal[j].properties.projects.state.eiaf.push(b);                     
                 }    
                  
                 //mini sums for FFB
                 if(grants[i].programtype==='FFB'){
                   sumtotal[j].properties.projects.special.ffb.push(b);
                 }                  
                 
                 //mini sums for FML - DD
                 if(grants[i].programtype==='FML - DD'){
                   sumtotal[j].properties.projects.formula.fmldd.push(b);
                 }
                 
                  //mini sums for FML - DD - SB106
                 if(grants[i].programtype==='FML - DD - SB106'){
                   sumtotal[j].properties.projects.formula.fmlddsb106.push(b);
                 }
                 
                 //mini sums for GAME
                 if(grants[i].programtype==='GAME'){
                   sumtotal[j].properties.projects.state.game.push(b);
                 }
                 
                 //mini sums for REDI
                 if(grants[i].programtype==='REDI'){
                   sumtotal[j].properties.projects.state.redi.push(b);
                 }
                 
                 //mini sums for SAR
                 if(grants[i].programtype==='SAR'){
                   sumtotal[j].properties.projects.special.sar.push(b);
                 }
                 
                 //mini sums for SEVEDD
                 if(grants[i].programtype==='Seve-DD'){
                   sumtotal[j].properties.projects.formula.sevedd.push(b);
                 }    
                 
                 //mini sums for VFP
                 if(grants[i].programtype==='VFP'){
                   sumtotal[j].properties.projects.special.vfp.push(b);
                 }
                 
               } 
               

             }
           }
                        
      }
        
//convert number to money format        
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
        
 //sum all values in an object
 function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}       
        
  var redMarker = L.ExtraMarkers.icon({
    icon: 'fa-usd',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa'
  });
        
  var blueMarker = L.ExtraMarkers.icon({
    icon: 'fa-usd',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
  });
        
  var greenMarker = L.ExtraMarkers.icon({
    icon: 'fa-usd',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
  });
        
  var purpleMarker = L.ExtraMarkers.icon({
    icon: 'fa-usd',
    markerColor: 'purple',
    shape: 'circle',
    prefix: 'fa'
  });

        
function refreshdata(){        
//geojsonLayer
 city_federal = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var cdbgexist=(feature.properties.projects.federal.cdbg).length;
      var csbgexist=(feature.properties.projects.federal.csbg).length;
      if((cdbgexist+csbgexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(cdbgexist>0){
        for(i=0;i<cdbgexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.federal.cdbg[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(csbgexist>0){
        for(i=0;i<csbgexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.federal.csbg[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(countprojinrange===0){return false;}
      
      //filter by geography
      if(feature.properties.lgtype==2 || feature.properties.lgtype==3 || feature.properties.lgtype==4 || feature.properties.lgtype==5 ){return true;}else{return false;}

    },
//     style: function(feature) {
//         return {color: 'green'};
//     },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: blueMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      var csbg_temptotal=0;
      var cdbg_temptotal=0;
      var csbg_class='';
      var cdbg_class='';
      var csbg_title='';
      var cdbg_title='';
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.federal.csbg).length>0){
        for(var k=0;k<(feature.properties.projects.federal.csbg.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.federal.csbg[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){csbg_class = 'btn';}
          }
        }
      if((feature.properties.projects.federal.cdbg).length>0){
        for(var k=0;k<(feature.properties.projects.federal.cdbg.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.federal.cdbg[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){cdbg_class = 'btn';}
          }
        }
      
      
      //sum csbg for date range
      for(i=0;i<(feature.properties.projects.federal.csbg).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.federal.csbg[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.federal.csbg[i].award) || 0;
          csbg_temptotal=csbg_temptotal+Number(temp_award);
        }
      }
      //sum cdbg for date range
      for(i=0;i<(feature.properties.projects.federal.cdbg).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.federal.cdbg[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.federal.cdbg[i].award || 0;
          cdbg_temptotal=cdbg_temptotal+Number(temp_award);          
        }
      }

      var csbg_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.federal.csbg).length;j=j+1){
          var datepj=new Date(feature.properties.projects.federal.csbg[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.federal.csbg[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.federal.csbg[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(csbg_class == ''){ return ""; }else{ return '<a href="#" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var cdbg_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.federal.cdbg).length;j=j+1){
          var datepj=new Date(feature.properties.projects.federal.cdbg[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.federal.cdbg[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.federal.cdbg[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(cdbg_class == ''){ return ""; }else{ return '<a href="#" class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Federal Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          csbg_text + cdbg_text;

      
        layer.bindPopup(popuphtml);
    }
});
        
 county_federal = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var cdbgexist=(feature.properties.projects.federal.cdbg).length;
      var csbgexist=(feature.properties.projects.federal.csbg).length;
      if((cdbgexist+csbgexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(cdbgexist>0){
        for(i=0;i<cdbgexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.federal.cdbg[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(csbgexist>0){
        for(i=0;i<csbgexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.federal.csbg[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(countprojinrange===0){return false;}
      
      //filter by geography
      if(feature.properties.lgtype==1 || feature.properties.lgtype==61 || feature.properties.lgtype==70  ){return true;}else{return false;}

    },
//     style: function(feature) {
//         return {color: 'green'};
//     },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: blueMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      var csbg_temptotal=0;
      var cdbg_temptotal=0;
      var csbg_class='';
      var cdbg_class='';
      var csbg_title='';
      var cdbg_title='';
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.federal.csbg).length>0){
        for(var k=0;k<(feature.properties.projects.federal.csbg.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.federal.csbg[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){csbg_class = 'btn';}
          }
        }
      if((feature.properties.projects.federal.cdbg).length>0){
        for(var k=0;k<(feature.properties.projects.federal.cdbg.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.federal.cdbg[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){cdbg_class = 'btn';}
          }
        }
      

      //sum csbg for date range
      for(i=0;i<(feature.properties.projects.federal.csbg).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.federal.csbg[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.federal.csbg[i].award) || 0;
          csbg_temptotal=csbg_temptotal+Number(temp_award);
        }
      }
      //sum cdbg for date range
      for(i=0;i<(feature.properties.projects.federal.cdbg).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.federal.cdbg[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.federal.cdbg[i].award || 0;
          cdbg_temptotal=cdbg_temptotal+Number(temp_award);          
        }
      }

      var csbg_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.federal.csbg).length;j=j+1){
          var datepj=new Date(feature.properties.projects.federal.csbg[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.federal.csbg[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.federal.csbg[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(csbg_class == ''){ return ""; }else{ return '<a href="#" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var cdbg_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.federal.cdbg).length;j=j+1){
          var datepj=new Date(feature.properties.projects.federal.cdbg[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.federal.cdbg[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.federal.cdbg[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(cdbg_class == ''){ return ""; }else{ return '<a href="#" class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Federal Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          csbg_text + cdbg_text;

      
        layer.bindPopup(popuphtml);
    }
});     
        
        
 district_federal = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var cdbgexist=(feature.properties.projects.federal.cdbg).length;
      var csbgexist=(feature.properties.projects.federal.csbg).length;
      if((cdbgexist+csbgexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(cdbgexist>0){
        for(i=0;i<cdbgexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.federal.cdbg[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(csbgexist>0){
        for(i=0;i<csbgexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.federal.csbg[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(countprojinrange===0){return false;}
      
      //filter by geography
      if(feature.properties.lgtype!==1 && feature.properties.lgtype!==61 && feature.properties.lgtype!==70 && feature.properties.lgtype!==2 && feature.properties.lgtype!==3 && feature.properties.lgtype!==4 && feature.properties.lgtype!==5){return true;}else{return false;}

    },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: blueMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      var csbg_temptotal=0;
      var cdbg_temptotal=0;
      var csbg_class='';
      var cdbg_class='';
      var csbg_title='';
      var cdbg_title='';
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.federal.csbg).length>0){
        for(var k=0;k<(feature.properties.projects.federal.csbg.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.federal.csbg[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){csbg_class = 'btn';}
          }
        }
      if((feature.properties.projects.federal.cdbg).length>0){
        for(var k=0;k<(feature.properties.projects.federal.cdbg.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.federal.cdbg[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){cdbg_class = 'btn';}
          }
        }
      
    console.log(feature);
      //sum csbg for date range
      for(i=0;i<(feature.properties.projects.federal.csbg).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.federal.csbg[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.federal.csbg[i].award) || 0;
          csbg_temptotal=csbg_temptotal+Number(temp_award);
        }
      }
      //sum cdbg for date range
      for(i=0;i<(feature.properties.projects.federal.cdbg).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.federal.cdbg[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.federal.cdbg[i].award || 0;
          cdbg_temptotal=cdbg_temptotal+Number(temp_award);          
        }
      }

      var csbg_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.federal.csbg).length;j=j+1){
          var datepj=new Date(feature.properties.projects.federal.csbg[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.federal.csbg[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.federal.csbg[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(csbg_class == ''){ return ""; }else{ return '<a href="#" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var cdbg_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.federal.cdbg).length;j=j+1){
          var datepj=new Date(feature.properties.projects.federal.cdbg[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.federal.cdbg[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.federal.cdbg[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(cdbg_class == ''){ return ""; }else{ return '<a href="#" class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Federal Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          csbg_text + cdbg_text;

      
        layer.bindPopup(popuphtml);
    }
});            
      
        
        
//geojsonLayer
 city_state = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var eiafexist=(feature.properties.projects.state.eiaf).length;
      var gameexist=(feature.properties.projects.state.game).length;
      var rediexist=(feature.properties.projects.state.redi).length;      
      if((eiafexist+gameexist+rediexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(eiafexist>0){
        for(i=0;i<eiafexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.eiaf[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(gameexist>0){
        for(i=0;i<gameexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.game[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(rediexist>0){
        for(i=0;i<rediexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.redi[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(countprojinrange===0){return false;}
      
      //filter by geography
      if(feature.properties.lgtype==2 || feature.properties.lgtype==3 || feature.properties.lgtype==4 || feature.properties.lgtype==5 ){return true;}else{return false;}

    },
//     style: function(feature) {
//         return {color: 'green'};
//     },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: redMarker});
    },
    onEachFeature: function (feature, layer) {      
      var dateofproj;
      
      var eiaf_temptotal=0;
      var game_temptotal=0;
      var redi_temptotal=0;
                                              
      var eiaf_class='';
      var game_class='';
      var redi_class='';
                                              
      var eiaf_title='';
      var game_title='';
      var redi_title='';
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.state.eiaf).length>0){
        for(var k=0;k<(feature.properties.projects.state.eiaf.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.eiaf[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){eiaf_class = 'btn';}
          }
        }
      if((feature.properties.projects.state.game).length>0){
        for(var k=0;k<(feature.properties.projects.state.game.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.game[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){game_class = 'btn';}
          }
        }
      if((feature.properties.projects.state.redi).length>0){
        for(var k=0;k<(feature.properties.projects.state.redi.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.redi[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){redi_class = 'btn';}
          }        
        }

      
      //sum eiaf for date range
      for(i=0;i<(feature.properties.projects.state.eiaf).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.eiaf[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.state.eiaf[i].award) || 0;
          eiaf_temptotal=eiaf_temptotal+Number(temp_award);
        }
      }
      //sum game for date range
      for(i=0;i<(feature.properties.projects.state.game).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.game[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.state.game[i].award || 0;
          game_temptotal=game_temptotal+Number(temp_award);          
        }
      }
      //sum redi for date range
      for(i=0;i<(feature.properties.projects.state.redi).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.redi[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.state.redi[i].award || 0;
          redi_temptotal=redi_temptotal+Number(temp_award);          
        }
      }
                                              
                                              
      var eiaf_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.eiaf).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.eiaf[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.eiaf[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.eiaf[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(eiaf_class == ''){ return ""; }else{ return '<a href="#" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var game_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.game).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.game[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.game[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.game[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(game_class == ''){ return ""; }else{ return '<a href="#" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var redi_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.redi).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.redi[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.redi[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.redi[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(redi_class == ''){ return ""; }else{ return '<a href="#" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>State Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          eiaf_text + game_text + redi_text;

      
        layer.bindPopup(popuphtml);
    }
});
        
 county_state = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var eiafexist=(feature.properties.projects.state.eiaf).length;
      var gameexist=(feature.properties.projects.state.game).length;
      var rediexist=(feature.properties.projects.state.redi).length;      
      if((eiafexist+gameexist+rediexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(eiafexist>0){
        for(i=0;i<eiafexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.eiaf[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(gameexist>0){
        for(i=0;i<gameexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.game[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(rediexist>0){
        for(i=0;i<rediexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.redi[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(countprojinrange===0){return false;}
            
      if(feature.properties.lgtype==1 || feature.properties.lgtype==61 || feature.properties.lgtype==70  ){return true;}else{return false;}

    },
//     style: function(feature) {
//         return {color: 'green'};
//     },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: redMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      
      var eiaf_temptotal=0;
      var game_temptotal=0;
      var redi_temptotal=0;
                                              
      var eiaf_class='';
      var game_class='';
      var redi_class='';
                                              
      var eiaf_title='';
      var game_title='';
      var redi_title='';
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.state.eiaf).length>0){
        for(var k=0;k<(feature.properties.projects.state.eiaf.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.eiaf[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){eiaf_class = 'btn';}
          }
        }
      if((feature.properties.projects.state.game).length>0){
        for(var k=0;k<(feature.properties.projects.state.game.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.game[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){game_class = 'btn';}
          }
        }
      if((feature.properties.projects.state.redi).length>0){
        for(var k=0;k<(feature.properties.projects.state.redi.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.redi[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){redi_class = 'btn';}
          }        
        }
                                              
      //sum eiaf for date range
      for(i=0;i<(feature.properties.projects.state.eiaf).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.eiaf[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.state.eiaf[i].award) || 0;
          eiaf_temptotal=eiaf_temptotal+Number(temp_award);
        }
      }
      //sum game for date range
      for(i=0;i<(feature.properties.projects.state.game).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.game[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.state.game[i].award || 0;
          game_temptotal=game_temptotal+Number(temp_award);          
        }
      }
      //sum redi for date range
      for(i=0;i<(feature.properties.projects.state.redi).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.redi[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.state.redi[i].award || 0;
          redi_temptotal=redi_temptotal+Number(temp_award);          
        }
      }
                                              
                                              
      var eiaf_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.eiaf).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.eiaf[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.eiaf[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.eiaf[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(eiaf_class == ''){ return ""; }else{ return '<a href="#" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var game_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.game).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.game[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.game[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.game[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(game_class == ''){ return ""; }else{ return '<a href="#" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var redi_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.redi).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.redi[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.redi[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.redi[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(redi_class == ''){ return ""; }else{ return '<a href="#" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>State Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          eiaf_text + game_text + redi_text;

      
        layer.bindPopup(popuphtml);
    }
});     
        
        
 district_state = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var eiafexist=(feature.properties.projects.state.eiaf).length;
      var gameexist=(feature.properties.projects.state.game).length;
      var rediexist=(feature.properties.projects.state.redi).length;      
      if((eiafexist+gameexist+rediexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(eiafexist>0){
        for(i=0;i<eiafexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.eiaf[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(gameexist>0){
        for(i=0;i<gameexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.game[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(rediexist>0){
        for(i=0;i<rediexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.state.redi[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(countprojinrange===0){return false;}
            
      if(feature.properties.lgtype!==1 && feature.properties.lgtype!==61 && feature.properties.lgtype!==70 && feature.properties.lgtype!==2 && feature.properties.lgtype!==3 && feature.properties.lgtype!==4 && feature.properties.lgtype!==5){return true;}else{return false;}

    },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: redMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      
      var eiaf_temptotal=0;
      var game_temptotal=0;
      var redi_temptotal=0;
                                              
      var eiaf_class='';
      var game_class='';
      var redi_class='';
                                              
      var eiaf_title='';
      var game_title='';
      var redi_title='';
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.state.eiaf).length>0){
        for(var k=0;k<(feature.properties.projects.state.eiaf.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.eiaf[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){eiaf_class = 'btn';}
          }
        }
      if((feature.properties.projects.state.game).length>0){
        for(var k=0;k<(feature.properties.projects.state.game.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.game[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){game_class = 'btn';}
          }
        }
      if((feature.properties.projects.state.redi).length>0){
        for(var k=0;k<(feature.properties.projects.state.redi.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.state.redi[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){redi_class = 'btn';}
          }        
        }
                                              
      //sum eiaf for date range
      for(i=0;i<(feature.properties.projects.state.eiaf).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.eiaf[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.state.eiaf[i].award) || 0;
          eiaf_temptotal=eiaf_temptotal+Number(temp_award);
        }
      }
      //sum game for date range
      for(i=0;i<(feature.properties.projects.state.game).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.game[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.state.game[i].award || 0;
          game_temptotal=game_temptotal+Number(temp_award);          
        }
      }
      //sum redi for date range
      for(i=0;i<(feature.properties.projects.state.redi).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.state.redi[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.state.redi[i].award || 0;
          redi_temptotal=redi_temptotal+Number(temp_award);          
        }
      }
                                              
                                              
      var eiaf_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.eiaf).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.eiaf[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.eiaf[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.eiaf[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(eiaf_class == ''){ return ""; }else{ return '<a href="#" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var game_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.game).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.game[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.game[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.game[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(game_class == ''){ return ""; }else{ return '<a href="#" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var redi_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.state.redi).length;j=j+1){
          var datepj=new Date(feature.properties.projects.state.redi[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.state.redi[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.state.redi[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(redi_class == ''){ return ""; }else{ return '<a href="#" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>State Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          eiaf_text + game_text + redi_text;

      
        layer.bindPopup(popuphtml);
    }
});            
              
//geojsonLayer
 city_formula = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var ctfexist=(feature.properties.projects.formula.ctf).length;
      var fmlddexist=(feature.properties.projects.formula.fmldd).length;
      var fmlddsb106exist=(feature.properties.projects.formula.fmlddsb106).length;      
      var sevedd=(feature.properties.projects.formula.sevedd).length;            
      if((ctfexist+fmlddexist+fmlddsb106exist+sevedd)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(ctfexist>0){
        for(i=0;i<ctfexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.formula.ctf[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(fmlddexist>0){
        for(i=0;i<fmlddexist;i=i+1){
          var yearofaward = feature.properties.projects.formula.fmldd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(fmlddsb106exist>0){
        for(i=0;i<fmlddsb106exist;i=i+1){
          var fmlddsb106date = new Date(2014,3,1);
          if(fmlddsb106date>mindate && fmlddsb106date<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(sevedd>0){
        for(i=0;i<sevedd;i=i+1){
          var yearofaward = feature.properties.projects.formula.sevedd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }            
      if(countprojinrange===0){return false;}
            
      if(feature.properties.lgtype==2 || feature.properties.lgtype==3 || feature.properties.lgtype==4 || feature.properties.lgtype==5 ){return true;}else{return false;}

    },
//     style: function(feature) {
//         return {color: 'green'};
//     },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: greenMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      
      var ctf_temptotal=0;
      var fmldd_temptotal=0;
      var fmlddsb106_temptotal=0;
      var sevedd_temptotal=0;      
                                              
      var ctf_class='';
      var fmldd_class='';
      var fmlddsb106_class='';
      var sevedd_class='';      
                                              
      var ctf_title='';
      var fmldd_title='';
      var fmlddsb106_title='';
      var sevedd_title='';      
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.formula.ctf).length>0){
        for(var k=0;k<(feature.properties.projects.formula.ctf.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.formula.ctf[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){ctf_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.fmldd).length>0){
        for(var k=0;k<(feature.properties.projects.formula.fmldd.length);k=k+1){
          var yearofaward = feature.properties.projects.formula.fmldd[k].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){fmldd_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.fmlddsb106).length>0){
        for(var k=0;k<(feature.properties.projects.formula.fmlddsb106.length);k=k+1){
          var fmlddsb106date = new Date(2014,3,1);
          if(fmlddsb106date>mindate && fmlddsb106date<maxdate){fmlddsb106_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.sevedd).length>0){
        for(var k=0;k<(feature.properties.projects.formula.sevedd.length);k=k+1){
          var yearofaward = feature.properties.projects.formula.sevedd[k].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){sevedd_class = 'btn';}
          }
        }

      //sum ctf for date range
      for(i=0;i<(feature.properties.projects.formula.ctf).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.formula.ctf[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.formula.ctf[i].award) || 0;
          ctf_temptotal=ctf_temptotal+Number(temp_award);
        }
      }
      //sum fmldd for date range
      for(i=0;i<(feature.properties.projects.formula.fmldd).length;i=i+1){
        
          var yearofaward = feature.properties.projects.formula.fmldd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);} 
        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.fmldd[i].award || 0;
          fmldd_temptotal=fmldd_temptotal+Number(temp_award);          
        }
      }
      //sum fmlddsb106 for date range
      for(i=0;i<(feature.properties.projects.formula.fmlddsb106).length;i=i+1){
        
          var dateofproj = new Date(2014,3,1);  
        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.fmlddsb106[i].award || 0;
          fmlddsb106_temptotal=fmlddsb106_temptotal+Number(temp_award);          
        }
      }
      //sum sevedd for date range
      for(i=0;i<(feature.properties.projects.formula.sevedd).length;i=i+1){
          var yearofaward = feature.properties.projects.formula.sevedd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          

        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.sevedd[i].award || 0;
          sevedd_temptotal=sevedd_temptotal+Number(temp_award);          
        }
      }                                              
                                              
      var ctf_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.ctf).length;j=j+1){
          var datepj=new Date(feature.properties.projects.formula.ctf[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.ctf[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.ctf[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(ctf_class == ''){ return ""; }else{ return '<a href="#" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var fmldd_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.fmldd).length;j=j+1){
          
          var yearofaward = feature.properties.projects.formula.fmldd[j].yearofaward;
          var datepj;
          if(yearofaward=="2009"){datepj=new Date(2009,7,31);}
          if(yearofaward=="2010"){datepj=new Date(2010,7,31);}
          if(yearofaward=="2011"){datepj=new Date(2011,7,31);}
          if(yearofaward=="2012"){datepj=new Date(2012,7,31);}
          if(yearofaward=="2013"){datepj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){datepj=new Date(2014,7,31);}
          if(yearofaward=="2015"){datepj=new Date(2015,7,31);}     
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.fmldd[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.fmldd[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(fmldd_class == ''){ return ""; }else{ return '<a href="#" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var fmlddsb106_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.fmlddsb106).length;j=j+1){
          
          var datepj = new Date(2014,3,1);
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.fmlddsb106[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.fmlddsb106[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(fmlddsb106_class == ''){ return ""; }else{ return '<a href="#" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var sevedd_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.sevedd).length;j=j+1){
          
          var yearofaward = feature.properties.projects.formula.sevedd[j].yearofaward;
          var datepj;
          if(yearofaward=="FY2009"){datepj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){datepj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){datepj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){datepj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){datepj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){datepj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){datepj=new Date(2015,7,31);}          
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.sevedd[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.sevedd[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(sevedd_class == ''){ return ""; }else{ return '<a href="#" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />'; }
      }();          
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Formula Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          ctf_text + fmldd_text + fmlddsb106_text + sevedd_text;

      
        layer.bindPopup(popuphtml);
    }
});
        
 county_formula = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var ctfexist=(feature.properties.projects.formula.ctf).length;
      var fmlddexist=(feature.properties.projects.formula.fmldd).length;
      var fmlddsb106exist=(feature.properties.projects.formula.fmlddsb106).length;      
      var sevedd=(feature.properties.projects.formula.sevedd).length;            
      if((ctfexist+fmlddexist+fmlddsb106exist+sevedd)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(ctfexist>0){
        for(i=0;i<ctfexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.formula.ctf[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(fmlddexist>0){
        for(i=0;i<fmlddexist;i=i+1){
          var yearofaward = feature.properties.projects.formula.fmldd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(fmlddsb106exist>0){
        for(i=0;i<fmlddsb106exist;i=i+1){
          var fmlddsb106date = new Date(2014,3,1);
          if(fmlddsb106date>mindate && fmlddsb106date<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(sevedd>0){
        for(i=0;i<sevedd;i=i+1){
          var yearofaward = feature.properties.projects.formula.sevedd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }            
      if(countprojinrange===0){return false;}
            
      if(feature.properties.lgtype==1 || feature.properties.lgtype==61 || feature.properties.lgtype==70  ){return true;}else{return false;}

    },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: greenMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      
      var ctf_temptotal=0;
      var fmldd_temptotal=0;
      var fmlddsb106_temptotal=0;
      var sevedd_temptotal=0;      
                                              
      var ctf_class='';
      var fmldd_class='';
      var fmlddsb106_class='';
      var sevedd_class='';      
                                              
      var ctf_title='';
      var fmldd_title='';
      var fmlddsb106_title='';
      var sevedd_title='';      
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.formula.ctf).length>0){
        for(var k=0;k<(feature.properties.projects.formula.ctf.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.formula.ctf[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){ctf_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.fmldd).length>0){
        for(var k=0;k<(feature.properties.projects.formula.fmldd.length);k=k+1){
          var yearofaward = feature.properties.projects.formula.fmldd[k].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){fmldd_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.fmlddsb106).length>0){
        for(var k=0;k<(feature.properties.projects.formula.fmlddsb106.length);k=k+1){
          var fmlddsb106date = new Date(2014,3,1);
          if(fmlddsb106date>mindate && fmlddsb106date<maxdate){fmlddsb106_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.sevedd).length>0){
        for(var k=0;k<(feature.properties.projects.formula.sevedd.length);k=k+1){
          var yearofaward = feature.properties.projects.formula.sevedd[k].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){sevedd_class = 'btn';}
          }
        }

      //sum ctf for date range
      for(i=0;i<(feature.properties.projects.formula.ctf).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.formula.ctf[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.formula.ctf[i].award) || 0;
          ctf_temptotal=ctf_temptotal+Number(temp_award);
        }
      }
      //sum fmldd for date range
      for(i=0;i<(feature.properties.projects.formula.fmldd).length;i=i+1){
        
          var yearofaward = feature.properties.projects.formula.fmldd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);} 
        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.fmldd[i].award || 0;
          fmldd_temptotal=fmldd_temptotal+Number(temp_award);          
        }
      }
      //sum fmlddsb106 for date range
      for(i=0;i<(feature.properties.projects.formula.fmlddsb106).length;i=i+1){
        
          var dateofproj = new Date(2014,3,1);  
        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.fmlddsb106[i].award || 0;
          fmlddsb106_temptotal=fmlddsb106_temptotal+Number(temp_award);          
        }
      }
      //sum sevedd for date range
      for(i=0;i<(feature.properties.projects.formula.sevedd).length;i=i+1){
          var yearofaward = feature.properties.projects.formula.sevedd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          

        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.sevedd[i].award || 0;
          sevedd_temptotal=sevedd_temptotal+Number(temp_award);          
        }
      }                                              
                                              
      var ctf_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.ctf).length;j=j+1){
          var datepj=new Date(feature.properties.projects.formula.ctf[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.ctf[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.ctf[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(ctf_class == ''){ return ""; }else{ return '<a href="#" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var fmldd_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.fmldd).length;j=j+1){
          
          var yearofaward = feature.properties.projects.formula.fmldd[j].yearofaward;
          var datepj;
          if(yearofaward=="2009"){datepj=new Date(2009,7,31);}
          if(yearofaward=="2010"){datepj=new Date(2010,7,31);}
          if(yearofaward=="2011"){datepj=new Date(2011,7,31);}
          if(yearofaward=="2012"){datepj=new Date(2012,7,31);}
          if(yearofaward=="2013"){datepj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){datepj=new Date(2014,7,31);}
          if(yearofaward=="2015"){datepj=new Date(2015,7,31);}     
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.fmldd[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.fmldd[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(fmldd_class == ''){ return ""; }else{ return '<a href="#" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var fmlddsb106_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.fmlddsb106).length;j=j+1){
          
          var datepj = new Date(2014,3,1);
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.fmlddsb106[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.fmlddsb106[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(fmlddsb106_class == ''){ return ""; }else{ return '<a href="#" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var sevedd_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.sevedd).length;j=j+1){
          
          var yearofaward = feature.properties.projects.formula.sevedd[j].yearofaward;
          var datepj;
          if(yearofaward=="FY2009"){datepj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){datepj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){datepj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){datepj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){datepj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){datepj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){datepj=new Date(2015,7,31);}          
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.sevedd[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.sevedd[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(sevedd_class == ''){ return ""; }else{ return '<a href="#" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />'; }
      }();          
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Formula Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          ctf_text + fmldd_text + fmlddsb106_text + sevedd_text;

      
        layer.bindPopup(popuphtml);
    }
});     
        
        
 district_formula = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
       
      //filter out if no projects
      var ctfexist=(feature.properties.projects.formula.ctf).length;
      var fmlddexist=(feature.properties.projects.formula.fmldd).length;
      var fmlddsb106exist=(feature.properties.projects.formula.fmlddsb106).length;      
      var sevedd=(feature.properties.projects.formula.sevedd).length;            
      if((ctfexist+fmlddexist+fmlddsb106exist+sevedd)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(ctfexist>0){
        for(i=0;i<ctfexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.formula.ctf[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(fmlddexist>0){
        for(i=0;i<fmlddexist;i=i+1){
          var yearofaward = feature.properties.projects.formula.fmldd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(fmlddsb106exist>0){
        for(i=0;i<fmlddsb106exist;i=i+1){
          var fmlddsb106date = new Date(2014,3,1);
          if(fmlddsb106date>mindate && fmlddsb106date<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(sevedd>0){
        for(i=0;i<sevedd;i=i+1){
          var yearofaward = feature.properties.projects.formula.sevedd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }            
      if(countprojinrange===0){return false;}
          
      if(feature.properties.lgtype!==1 && feature.properties.lgtype!==61 && feature.properties.lgtype!==70 && feature.properties.lgtype!==2 && feature.properties.lgtype!==3 && feature.properties.lgtype!==4 && feature.properties.lgtype!==5){return true;}else{return false;}
  
    },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: greenMarker});
    },
    onEachFeature: function (feature, layer) {
      var dateofproj;
      
      var ctf_temptotal=0;
      var fmldd_temptotal=0;
      var fmlddsb106_temptotal=0;
      var sevedd_temptotal=0;      
                                              
      var ctf_class='';
      var fmldd_class='';
      var fmlddsb106_class='';
      var sevedd_class='';      
                                              
      var ctf_title='';
      var fmldd_title='';
      var fmlddsb106_title='';
      var sevedd_title='';      
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.formula.ctf).length>0){
        for(var k=0;k<(feature.properties.projects.formula.ctf.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.formula.ctf[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){ctf_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.fmldd).length>0){
        for(var k=0;k<(feature.properties.projects.formula.fmldd.length);k=k+1){
          var yearofaward = feature.properties.projects.formula.fmldd[k].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){fmldd_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.fmlddsb106).length>0){
        for(var k=0;k<(feature.properties.projects.formula.fmlddsb106.length);k=k+1){
          var fmlddsb106date = new Date(2014,3,1);
          if(fmlddsb106date>mindate && fmlddsb106date<maxdate){fmlddsb106_class = 'btn';}
          }
        }
      if((feature.properties.projects.formula.sevedd).length>0){
        for(var k=0;k<(feature.properties.projects.formula.sevedd.length);k=k+1){
          var yearofaward = feature.properties.projects.formula.sevedd[k].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          
          if(dateofproj>mindate && dateofproj<maxdate){sevedd_class = 'btn';}
          }
        }

      //sum ctf for date range
      for(i=0;i<(feature.properties.projects.formula.ctf).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.formula.ctf[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.formula.ctf[i].award) || 0;
          ctf_temptotal=ctf_temptotal+Number(temp_award);
        }
      }
      //sum fmldd for date range
      for(i=0;i<(feature.properties.projects.formula.fmldd).length;i=i+1){
        
          var yearofaward = feature.properties.projects.formula.fmldd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="2015"){dateofproj=new Date(2015,7,31);} 
        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.fmldd[i].award || 0;
          fmldd_temptotal=fmldd_temptotal+Number(temp_award);          
        }
      }
      //sum fmlddsb106 for date range
      for(i=0;i<(feature.properties.projects.formula.fmlddsb106).length;i=i+1){
        
          var dateofproj = new Date(2014,3,1);  
        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.fmlddsb106[i].award || 0;
          fmlddsb106_temptotal=fmlddsb106_temptotal+Number(temp_award);          
        }
      }
      //sum sevedd for date range
      for(i=0;i<(feature.properties.projects.formula.sevedd).length;i=i+1){
          var yearofaward = feature.properties.projects.formula.sevedd[i].yearofaward;
          var dateofproj;
          if(yearofaward=="FY2009"){dateofproj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){dateofproj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){dateofproj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){dateofproj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){dateofproj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){dateofproj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){dateofproj=new Date(2015,7,31);}          

        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.formula.sevedd[i].award || 0;
          sevedd_temptotal=sevedd_temptotal+Number(temp_award);          
        }
      }                                              
                                              
      var ctf_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.ctf).length;j=j+1){
          var datepj=new Date(feature.properties.projects.formula.ctf[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.ctf[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.ctf[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(ctf_class == ''){ return ""; }else{ return '<a href="#" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var fmldd_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.fmldd).length;j=j+1){
          
          var yearofaward = feature.properties.projects.formula.fmldd[j].yearofaward;
          var datepj;
          if(yearofaward=="2009"){datepj=new Date(2009,7,31);}
          if(yearofaward=="2010"){datepj=new Date(2010,7,31);}
          if(yearofaward=="2011"){datepj=new Date(2011,7,31);}
          if(yearofaward=="2012"){datepj=new Date(2012,7,31);}
          if(yearofaward=="2013"){datepj=new Date(2013,7,31);}  
          if(yearofaward=="2014"){datepj=new Date(2014,7,31);}
          if(yearofaward=="2015"){datepj=new Date(2015,7,31);}     
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.fmldd[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.fmldd[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(fmldd_class == ''){ return ""; }else{ return '<a href="#" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var fmlddsb106_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.fmlddsb106).length;j=j+1){
          
          var datepj = new Date(2014,3,1);
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.fmlddsb106[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.fmlddsb106[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(fmlddsb106_class == ''){ return ""; }else{ return '<a href="#" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var sevedd_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.formula.sevedd).length;j=j+1){
          
          var yearofaward = feature.properties.projects.formula.sevedd[j].yearofaward;
          var datepj;
          if(yearofaward=="FY2009"){datepj=new Date(2009,7,31);}
          if(yearofaward=="FY2010"){datepj=new Date(2010,7,31);}
          if(yearofaward=="FY2011"){datepj=new Date(2011,7,31);}
          if(yearofaward=="FY2012"){datepj=new Date(2012,7,31);}
          if(yearofaward=="FY2013"){datepj=new Date(2013,7,31);}  
          if(yearofaward=="FY2014"){datepj=new Date(2014,7,31);}
          if(yearofaward=="FY2015"){datepj=new Date(2015,7,31);}          
          
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.formula.sevedd[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.formula.sevedd[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(sevedd_class == ''){ return ""; }else{ return '<a href="#" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />'; }
      }();          
      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Formula Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          ctf_text + fmldd_text + fmlddsb106_text + sevedd_text;

      
        layer.bindPopup(popuphtml);
    }
});            

//geojsonLayer
 city_special = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var ffbexist=(feature.properties.projects.special.ffb).length;
      var sarexist=(feature.properties.projects.special.sar).length;
      var vfpexist=(feature.properties.projects.special.vfp).length;      
      if((ffbexist+sarexist+vfpexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(ffbexist>0){
        for(i=0;i<ffbexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.ffb[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(sarexist>0){
        for(i=0;i<sarexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.sar[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(vfpexist>0){
        for(i=0;i<vfpexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.vfp[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(countprojinrange===0){return false;}
                  
      if(feature.properties.lgtype==2 || feature.properties.lgtype==3 || feature.properties.lgtype==4 || feature.properties.lgtype==5 ){return true;}else{return false;}

    },
//     style: function(feature) {
//         return {color: 'green'};
//     },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: purpleMarker});
    },
    onEachFeature: function (feature, layer) {
     var dateofproj;
      
      var ffb_temptotal=0;
      var sar_temptotal=0;
      var vfp_temptotal=0;
                                              
      var ffb_class='';
      var sar_class='';
      var vfp_class='';
                                              
      var ffb_title='';
      var sar_title='';
      var vfp_title='';
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.special.ffb).length>0){
        for(var k=0;k<(feature.properties.projects.special.ffb.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.ffb[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){ffb_class = 'btn';}
          }
        }
      if((feature.properties.projects.special.sar).length>0){
        for(var k=0;k<(feature.properties.projects.special.sar.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.sar[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){sar_class = 'btn';}
          }
        }
      if((feature.properties.projects.special.vfp).length>0){
        for(var k=0;k<(feature.properties.projects.special.vfp.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.vfp[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){vfp_class = 'btn';}
          }
        }
   
      
      //sum ffb for date range
      for(i=0;i<(feature.properties.projects.special.ffb).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.ffb[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.special.ffb[i].award) || 0;
          ffb_temptotal=ffb_temptotal+Number(temp_award);
        }
      }
      //sum sar for date range
      for(i=0;i<(feature.properties.projects.special.sar).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.sar[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.special.sar[i].award || 0;
          sar_temptotal=sar_temptotal+Number(temp_award);          
        }
      }
      //sum vfp for date range
      for(i=0;i<(feature.properties.projects.special.vfp).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.vfp[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.special.vfp[i].award || 0;
          vfp_temptotal=vfp_temptotal+Number(temp_award);          
        }
      }
                                      
                                              
      var ffb_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.ffb).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.ffb[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.ffb[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.ffb[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(ffb_class == ''){ return ""; }else{ return '<a href="#" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var sar_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.sar).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.sar[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.sar[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.sar[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(sar_class == ''){ return ""; }else{ return '<a href="#" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var vfp_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.vfp).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.vfp[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.vfp[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.vfp[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(vfp_class == ''){ return ""; }else{ return '<a href="#" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />'; }
      }();      

      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Special Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          ffb_text + sar_text + vfp_text;

      
        layer.bindPopup(popuphtml);
    }
});
        
 county_special = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var ffbexist=(feature.properties.projects.special.ffb).length;
      var sarexist=(feature.properties.projects.special.sar).length;
      var vfpexist=(feature.properties.projects.special.vfp).length;      
      if((ffbexist+sarexist+vfpexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(ffbexist>0){
        for(i=0;i<ffbexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.ffb[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(sarexist>0){
        for(i=0;i<sarexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.sar[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(vfpexist>0){
        for(i=0;i<vfpexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.vfp[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(countprojinrange===0){return false;}
                 
      if(feature.properties.lgtype==1 || feature.properties.lgtype==61 || feature.properties.lgtype==70  ){return true;}else{return false;}

    },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: purpleMarker});
    },
    onEachFeature: function (feature, layer) {
     var dateofproj;
      
      var ffb_temptotal=0;
      var sar_temptotal=0;
      var vfp_temptotal=0;
                                              
      var ffb_class='';
      var sar_class='';
      var vfp_class='';
                                              
      var ffb_title='';
      var sar_title='';
      var vfp_title='';
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.special.ffb).length>0){
        for(var k=0;k<(feature.properties.projects.special.ffb.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.ffb[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){ffb_class = 'btn';}
          }
        }
      if((feature.properties.projects.special.sar).length>0){
        for(var k=0;k<(feature.properties.projects.special.sar.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.sar[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){sar_class = 'btn';}
          }
        }
      if((feature.properties.projects.special.vfp).length>0){
        for(var k=0;k<(feature.properties.projects.special.vfp.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.vfp[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){vfp_class = 'btn';}
          }
        }
      
      //sum ffb for date range
      for(i=0;i<(feature.properties.projects.special.ffb).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.ffb[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.special.ffb[i].award) || 0;
          ffb_temptotal=ffb_temptotal+Number(temp_award);
        }
      }
      //sum sar for date range
      for(i=0;i<(feature.properties.projects.special.sar).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.sar[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.special.sar[i].award || 0;
          sar_temptotal=sar_temptotal+Number(temp_award);          
        }
      }
      //sum vfp for date range
      for(i=0;i<(feature.properties.projects.special.vfp).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.vfp[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.special.vfp[i].award || 0;
          vfp_temptotal=vfp_temptotal+Number(temp_award);          
        }
      }
                                      
                                              
      var ffb_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.ffb).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.ffb[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.ffb[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.ffb[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(ffb_class == ''){ return ""; }else{ return '<a href="#" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var sar_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.sar).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.sar[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.sar[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.sar[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(sar_class == ''){ return ""; }else{ return '<a href="#" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var vfp_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.vfp).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.vfp[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.vfp[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.vfp[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(vfp_class == ''){ return ""; }else{ return '<a href="#" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />'; }
      }();      

      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Special Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          ffb_text + sar_text + vfp_text;

      
        layer.bindPopup(popuphtml);
    }
});     
        
        
 district_special = L.geoJson(sumtotal, {
    filter: function(feature, layer) {
      
      //filter out if no projects
      var ffbexist=(feature.properties.projects.special.ffb).length;
      var sarexist=(feature.properties.projects.special.sar).length;
      var vfpexist=(feature.properties.projects.special.vfp).length;      
      if((ffbexist+sarexist+vfpexist)==0){return false;}
      
      //filter out if no projects in date range
      var countprojinrange=0;
      if(ffbexist>0){
        for(i=0;i<ffbexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.ffb[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(sarexist>0){
        for(i=0;i<sarexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.sar[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }
      if(vfpexist>0){
        for(i=0;i<vfpexist;i=i+1){
          var dateofproj = new Date(feature.properties.projects.special.vfp[i].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){countprojinrange=countprojinrange+1;}
            }
      }      
      if(countprojinrange===0){return false;}
                 
      if(feature.properties.lgtype!==1 && feature.properties.lgtype!==61 && feature.properties.lgtype!==70 && feature.properties.lgtype!==2 && feature.properties.lgtype!==3 && feature.properties.lgtype!==4 && feature.properties.lgtype!==5){return true;}else{return false;}

    },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, {icon: purpleMarker});
    },
    onEachFeature: function (feature, layer) {
     var dateofproj;
      
      var ffb_temptotal=0;
      var sar_temptotal=0;
      var vfp_temptotal=0;
                                              
      var ffb_class='';
      var sar_class='';
      var vfp_class='';
                                              
      var ffb_title='';
      var sar_title='';
      var vfp_title='';
                                              
      var temp_award;
      
      //if program has projects, add class and title attributes to html
      if((feature.properties.projects.special.ffb).length>0){
        for(var k=0;k<(feature.properties.projects.special.ffb.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.ffb[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){ffb_class = 'btn';}
          }
        }
      if((feature.properties.projects.special.sar).length>0){
        for(var k=0;k<(feature.properties.projects.special.sar.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.sar[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){sar_class = 'btn';}
          }
        }
      if((feature.properties.projects.special.vfp).length>0){
        for(var k=0;k<(feature.properties.projects.special.vfp.length);k=k+1){
          dateofproj = new Date(feature.properties.projects.special.vfp[k].dateofaward);
          if(dateofproj>mindate && dateofproj<maxdate){vfp_class = 'btn';}
          }
        }
      
      //sum ffb for date range
      for(i=0;i<(feature.properties.projects.special.ffb).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.ffb[i].dateofaward);
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=Number(feature.properties.projects.special.ffb[i].award) || 0;
          ffb_temptotal=ffb_temptotal+Number(temp_award);
        }
      }
      //sum sar for date range
      for(i=0;i<(feature.properties.projects.special.sar).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.sar[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.special.sar[i].award || 0;
          sar_temptotal=sar_temptotal+Number(temp_award);          
        }
      }
      //sum vfp for date range
      for(i=0;i<(feature.properties.projects.special.vfp).length;i=i+1){
        dateofproj=new Date(feature.properties.projects.special.vfp[i].dateofaward);        
        if(dateofproj>mindate && dateofproj<maxdate){
          temp_award=feature.properties.projects.special.vfp[i].award || 0;
          vfp_temptotal=vfp_temptotal+Number(temp_award);          
        }
      }
                                      
                                              
      var ffb_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.ffb).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.ffb[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.ffb[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.ffb[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(ffb_class == ''){ return ""; }else{ return '<a href="#" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />'; }
      }();      
      
      var sar_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.sar).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.sar[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.sar[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.sar[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(sar_class == ''){ return ""; }else{ return '<a href="#" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />'; }
      }();
      
      var vfp_text = function(){
        var temptable="<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
        for(j=0;j<(feature.properties.projects.special.vfp).length;j=j+1){
          var datepj=new Date(feature.properties.projects.special.vfp[j].dateofaward); 
          if(datepj>mindate && datepj<maxdate){
          temptable = temptable+"<tr><td>"+feature.properties.projects.special.vfp[j].projname+"</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$"+(feature.properties.projects.special.vfp[j].award).formatMoney(0)+"</td></tr>"; 
          }
        }
        temptable = temptable + "</table>";
        if(vfp_class == ''){ return ""; }else{ return '<a href="#" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />'; }
      }();      

      
      var popuphtml= "<h3>" + feature.properties.govname + "</h3>" + 
          "<i>Special Awards<br />" +
          $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" + 
          ffb_text + sar_text + vfp_text;

      
        layer.bindPopup(popuphtml);
    }
});            

};
        
        
        
        refreshdata();
        
        
        
        
   
        
        var markers = new L.MarkerClusterGroup();
        
        markers.addLayer(city_federal);    
        markers.addLayer(county_federal); 
        markers.addLayer(district_federal);         
        markers.addLayer(city_state);    
        markers.addLayer(county_state); 
        markers.addLayer(district_state);   
        markers.addLayer(city_formula);    
        markers.addLayer(county_formula); 
        markers.addLayer(district_formula);   
        markers.addLayer(city_special);    
        markers.addLayer(county_special); 
        markers.addLayer(district_special);   
        
        map.addLayer(markers);




     $("#slider").dateRangeSlider({
  bounds:{
    min: new Date("Thu Jan 01 2010 00:00:00 GMT-0700"),
    max: maxdate
  },
       defaultValues:{
    min: mindate,
    max: maxdate
  }
     
     });
        
$("#slider").bind("valuesChanged", function(e, data){
  mindate = data.values.min;
  maxdate = data.values.max;
  
    markers.clearLayers();
   
  refreshdata();
   
        markers.addLayer(city_federal);    
        markers.addLayer(county_federal); 
        markers.addLayer(district_federal);         
        markers.addLayer(city_state);    
        markers.addLayer(county_state); 
        markers.addLayer(district_state);   
        markers.addLayer(city_formula);    
        markers.addLayer(county_formula); 
        markers.addLayer(district_formula);   
        markers.addLayer(city_special);    
        markers.addLayer(county_special); 
        markers.addLayer(district_special);   
   
  map.addLayer(markers); 
  
});
        
      });