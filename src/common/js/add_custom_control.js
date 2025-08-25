// @flow

module.exports = function(map: Object, refreshdata: Function) {
    'use strict';

    var command: Object = L.control({
        position: 'topleft'
    });

    command.onAdd = function() {
        
        var div = L.DomUtil.create('div', 'command bord');
        div.innerHTML = '</br><div id="tabs-1"><h4 style="margion-top: 10px margin-bottom: 10px font-size: 15px;">&nbsp;Programs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="prgbtn" tabindex="2" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" role="button" aria-disabled="false" style="margin-top: -10px; margin-left: 20px;" title="Program Information" ><span class="ui-button-icon-primary ui-icon ui-icon-help"></span><span class="ui-button-text">Program Information</span></span></h4>' +
            '<ul><li>'+
                
            //Stimulus Programs
            '<button type="button" class="collapsible"><span style="color:rgb(206,3,3)">Stimulus Programs</span></button>'+
            //'<button type="button" class="collapsible"><input id="option1" type="checkbox" checked>Stimulus Programs</button>'+
            '<div class="collapse"><ul><br />'+
            '<li><input class="stimulus leg" id="neu" type="checkbox" checked /><span style="color:rgb(206,3,3)" title="American Rescue Plan: NEU"> American Rescue Plan: NEU</span></li><br />' +
            '<li><input class="stimulus leg" id="bbfs" type="checkbox" checked /><span style="color:rgb(206,3,3)" title="Broadband Federal Stimulus"> Broadband Federal Stimulus</span></li><br />' +
            '<li><input class="stimulus leg" id="cvrf" type="checkbox" checked /><span style="color:rgb(206,3,3)" title="Coronavirus Relief Fund"> Coronavirus Relief Fund</span></li><br />' +
            '<li><input class="stimulus leg" id="loma" type="checkbox" checked /><span style="color:rgb(206,3,3)" title="Local Match for Federal IIJA"> Local Match for Federal IIJA</span></li><br />' +
            '<li><input class="stimulus leg" id="npi" type="checkbox" checked /><span style="color:rgb(206,3,3)" title="Nonprofit Infrastructure Grant Program"> Nonprofit Infrastructure Grants</span></li><br />' +
            '<li><input class="stimulus leg" id="rnss" type="checkbox" checked /><span style="color:rgb(206,3,3)" title="Renewable State Stimulus"> Renewable State Stimulus</span></li><br />' + 
            '<li><input class="stimulus leg" id="sbr" type="checkbox" checked /><span style="color:rgb(206,3,3)" title="Small Business Relief Program"> Small Business Relief</span></li><br />' +
            '</ul></div><br />'+

            //Community Services
            '<button type="button" class="collapsible"><span style="color:rgb(0,0,255)">Community Services</span></button>'+
            //'<input id="option2" type="checkbox" checked>Community Services'+
            '<div class="collapse"><ul><br />'+
            '<li><input class="leg community" id="cens" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Census Grant Outreach"> Census Grant Outreach</span></li><br />' +
             '<li><input class="leg community" id="sar" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Colorado Search and Rescue Program"> Colorado Search and Rescue</span></li><br />' +
            '<li><input class="leg community" id="ccpi" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Community Crime Prevention Initiative"> Community Crime Prevention Initiative</span></li><br />' +
            '<li><input class="leg community" id="csbg" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Community Services Block Grants"> Community Services Block Grants</span></li><br />' +
            '<li><input class="leg community" id="dcfa" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Defense Counsel on First Appearance"> Defense Counsel on First Appearance</span></li><br />' +
            '<li><input class="leg community" id="lecs" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Law Enforcement Community Services Grant Program"> Law Enforcement Community Services</span></li><br />' +
           '<li><input class="leg community" id="mj" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Marijuana Impact Grant Programs"> Marijuana Impact Grants</span></li><br />' +
           '<li><input class="leg community" id="mrp" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Migrant Response Program"> Migrant Response Program</span></li><br />' + 
            '<li><input class="leg community" id="pomh" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Peace Officer Mental Health Support Program"> Peace Officer Mental Health Support</span></li><br />' +
            '<li><input class="leg community" id="psi" type="checkbox" checked /><span style="color:rgb(0,0,255)" title="Pools Special Initiative"> Pools Special Initiative</span></li><br />' +
            '</ul></div><br />'+

            //Formulaic Programs 
            '<button type="button" class="collapsible"><span style="color:rgb(0,126,0)">Formulaic Programs</span></button>'+
            //'<input id="option3" type="checkbox" checked>Formulaic Programs'+
            '<div class="collapse"><ul><br />'+
            '<li><input class="leg formulaic" id="ctf" type="checkbox" /><span style="color:rgb(0,126,0)" title="Conservation Trust Fund"> Conservation Trust Fund</span></li><br />' +
            '<li><input class="leg formulaic" id="sevedd" type="checkbox" /><span style="color:rgb(0,126,0)" title="Direct Distribution"> Direct Distribution</span></li><br />' +
            '<li><input class="leg formulaic" id="ffb" type="checkbox" checked /><span style="color:rgb(0,126,0)" title="Firefighter Cardiac Benefit Program"> Firefighter Cardiac Benefit</span></li><br />' +
            '<li><input class="leg formulaic" id="vfp" type="checkbox" checked /><span style="color:rgb(0,126,0)" title="Volunteer Firefighter Pension"> Volunteer Firefighter Pension</span></li><br />' +           
            '</ul></div><br />'+

            //Housing/Planning
            '<button type="button" class="collapsible"><span style="color:rgb(126,0,126)">Housing/Planning</span></button>'+
            //'<input id="option4" type="checkbox" checked>Housing/Planning'+
            '<div class="collapse"><ul><br />'+
            //'<input class="leg housing" id="adug" type="checkbox" checked /><span style="color:rgb(126,0,126)" title="Accessory Dwelling Units">Accessory Dwelling Units</span><br />' +
            '<li><input class="leg housing" id="chpg" type="checkbox" checked /><span style="color:rgb(126,0,126)" title="Colorado Heritage Planning Grants"> Colorado Heritage Planning Grants</span></li><br />' +
            '<li><input class="leg housing" id="ihoi" type="checkbox" checked /><span style="color:rgb(126,0,126)" title="Housing Incentive Grant Program"> Housing Incentive Grants</span></li><br />' +
            '<li><input class="leg housing" id="ihop" type="checkbox" checked /><span style="color:rgb(126,0,126)" title="Housing Planning Grant Program"> Housing Planning Grants</span></li><br />' +
            '<li><input class="leg housing" id="scig" type="checkbox" checked /><span style="color:rgb(126,0,126)" title="Strong Communities Initiative"> Strong Communities Initiative</span></li><br />' +            
            '<li><input class="leg housing" id="lpc" type="checkbox" checked /><span style="color:rgb(126,0,126)" title="Local Planning Capacity"> Local Planning Capacity</span></li><br />' +
            //'<input class="leg housing" id="lpc" type="checkbox" checked /><span style="color:rgb(126,0,126)" title="Transit Oriented Communities Infrastucture Grant Program</span>Transit Oriented Communities Infrastucture<br />' +
            '</ul></div><br />'+

            //Disaster and Recovery Programs
            '<button type="button" class="collapsible"><span style="color:rgb(211,72,26)">Disaster and Recovery Programs</span></button>'+
            //'<input id="option5" type="checkbox" checked>Disaster and Recovery Programs'+
            '<div class="collapse"><ul><br />'+
            '<li><input class="leg disaster" id="dr" type="checkbox" checked /><span style="color:rgb(211,72,26)" title="Community Development Block Grant -Disaster Recovery"> CDBG - Disaster Recovery</span></li><br />' +
            '<li><input class="leg disaster" id="drr" type="checkbox" checked /><span style="color:rgb(211,72,26)" title="Disaster Resilience Rebuilding Program"> Disaster Resilience Rebuilding</span></li><br />' +
            '</ul></div><br />'+

            //Economic Development
            '<button type="button" class="collapsible"><span style="color:rgb(0,0,0)">Economic Development</span></button>'+
            //'<input id="option6" type="checkbox" checked>Economic Development'+
            '<div class="collapse"><ul><br />'+
            '<li><input class="leg economic" id="cdbg" type="checkbox" checked /><span style="color:rgb(0,0,0)" title="Community Development Block Grants - Public Facilities & Services"> CDBG - Public Facilities & Services</span></li><br />' +
            '<li><input class="leg economic" id="cdbg" type="checkbox" checked /><span style="color:rgb(0,0,0)" title="Community Development Block Grants - Economic Development"> CDBG - Economic Development</span></li><br />' +
            '<li><input class="leg economic" id="eiaf" type="checkbox" checked /><span style="color:rgb(0,0,0)" title="Energy and Mineral Impact Assistance Fund"> Energy and Mineral Impact Assistance Fund</span></li><br />' +
            '<li><input class="leg economic" id="game" type="checkbox" checked /><span style="color:rgb(0,0,0)" title="Local Government Limited Gaming Impact Program"> Local Government Limited Gaming Impact</span></li><br />' +
            '<li><input class="leg economic" id="ms" type="checkbox" checked /><span style="color:rgb(0,0,0)" title="Main Street Program"> Main Street Program</span></li><br />' +
            '<li><input class="leg economic" id="mc" type="checkbox" checked /><span style="color:rgb(0,0,0)" title="Microgrids for Community Resilience"> Microgrids for Community Resilience</span></li><br />' +
            '<li><input class="leg economic" id="redi" type="checkbox" checked /><span style="color:rgb(0,0,0)" title="Rural Economic Development Initiative"> Rural Economic Development Initiative</span></li><br />' +
            '</ul></div><br />'+

            '</ul></li>'+
                       
            
            '<hr>' + '<input class="leg" id="city" type="checkbox" checked />City<br />' +
            '<input class="leg" id="county" type="checkbox" checked />County<br />' +
            '<input class="leg" id="district" type="checkbox" checked />District<br />' +
            '<input class="leg" id="other" type="checkbox" checked />Other<br />' +
            '<a href="https://storage.googleapis.com/co-publicdata/grants.csv">Download All Grants Data</a><br />' +
            '<a href="https://dlg.colorado.gov/funding-opportunities">More Information</a><br />' +
            '</div>';
        return div;
    };
    command.addTo(map);


    $(".command").tabs();


    $("#prgbtn").on('click', function() {
        require("./info_modal.js")(map);
    });

    /* $("#prgbtn").on("keydown", e => {
        if (e.key == "Enter") {
            require("./info_modal.js")(map);
        }
    }); */

    //Custom Layer Control
    
        $(document).ready(function() {
        $('input[type="checkbox"]').on('keypress', function(event) {
            if (event.which === 13) {
            this.checked = !this.checked;
            }
        });
    });
   
    var coll = document.getElementsByClassName("collapsible");
    var x;

    for (x = 0; x < coll.length; x++) {
    coll[x].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }

    

    //javascript to open checkboxes by category
    /* var checkboxes1 = document.querySelectorAll('input.stimulus'),
        checkall1 = document.getElementById('option1');
    var checkboxes2 = document.querySelectorAll('input.community'),
        checkall2 = document.getElementById('option2');
    var checkboxes3 = document.querySelectorAll('input.formulaic'),
        checkall3 = document.getElementById('option3');
    var checkboxes4 = document.querySelectorAll('input.housing'),
        checkall4 = document.getElementById('option4');
    var checkboxes5 = document.querySelectorAll('input.disaster'),
        checkall5 = document.getElementById('option5');
    var checkboxes6 = document.querySelectorAll('input.economic'),
        checkall6 = document.getElementById('option6');

    for(var i=0; i<checkboxes1.length; i++) {
    checkboxes1[i].onclick = function() {
        var checkedCount1 = document.querySelectorAll('input.stimulus:checked').length;

        checkall1.checked = checkedCount1 > 0;
        checkall1.indeterminate = checkedCount1 > 0 && checkedCount1 < checkboxes1.length;
    }
    }
    for(var j=0; j<checkboxes2.length; j++) {
    checkboxes2[j].onclick = function() {
        var checkedCount2 = document.querySelectorAll('input.community:checked').length;

        checkall2.checked = checkedCount2 > 0;
        checkall2.indeterminate = checkedCount2 > 0 && checkedCount2 < checkboxes2.length;
    }
    }
    for(var k=0; k<checkboxes3.length; k++) {
    checkboxes3[k].onclick = function() {
        var checkedCount3 = document.querySelectorAll('input.formulaic:checked').length;

        checkall3.checked = checkedCount3 > 0;
        checkall3.indeterminate = checkedCount3 > 0 && checkedCount3 < checkboxes3.length;
    }
    }
    for(var l=0; l<checkboxes4.length; l++) {
    checkboxes4[l].onclick = function() {
        var checkedCount4 = document.querySelectorAll('input.housing:checked').length;

        checkall4.checked = checkedCount4 > 0;
        checkall4.indeterminate = checkedCount4 > 0 && checkedCount4 < checkboxes4.length;
    }
    }
    for(var m=0; m<checkboxes5.length; m++) {
    checkboxes5[m].onclick = function() {
        var checkedCount5 = document.querySelectorAll('input.disaster:checked').length;

        checkall5.checked = checkedCount5 > 0;
        checkall5.indeterminate = checkedCount5 > 0 && checkedCount5 < checkboxes5.length;
    }
    }
    for(var n=0; n<checkboxes6.length; n++) {
    checkboxes6[n].onclick = function() {
        var checkedCount6 = document.querySelectorAll('input.economic:checked').length;

        checkall6.checked = checkedCount6 > 0;
        checkall6.indeterminate = checkedCount6 > 0 && checkedCount6 < checkboxes6.length;
    }
    }

    checkall1.onclick = function() {
    for(var i=0; i<checkboxes1.length; i++) {
        checkboxes1[i].checked = this.checked;
    }
    }
    checkall2.onclick = function() {
    for(var j=0; j<checkboxes2.length; j++) {
        checkboxes2[j].checked = this.checked;
    }
    }
    checkall3.onclick = function() {
    for(var k=0; k<checkboxes3.length; k++) {
        checkboxes3[k].checked = this.checked;
    }
    }
    checkall4.onclick = function() {
    for(var l=0; l<checkboxes4.length; l++) {
        checkboxes4[l].checked = this.checked;
    }
    }
    checkall5.onclick = function() {
    for(var m=0; m<checkboxes5.length; i++) {
        checkboxes5[m].checked = this.checked;
    }
    }
    checkall6.onclick = function() {
    for(var n=0; n<checkboxes6.length; n++) {
        checkboxes6[n].checked = this.checked;
    }
    } */
    
    document.getElementById("cdbg").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("chpg").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("csbg").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("dcfa").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("eiaf").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("game").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("redi").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("mj").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ctf").addEventListener("click", function() {
        refreshdata();
    }, false);
    
    document.getElementById("sevedd").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ffb").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("sar").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("vfp").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("cvrf").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("neu").addEventListener("click", function() {
        refreshdata();
    }, false);
    
    document.getElementById("sbr").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ccpi").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("pomh").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ms").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ihoi").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ihop").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("psi").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("loma").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("lpc").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("bbfs").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("cens").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("lecs").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("mc").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("mrp").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("npi").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("rnss").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("scig").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("adug").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("dr").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("drr").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("toci").addEventListener("click", function() {
        refreshdata();
    }, false);
    
    document.getElementById("city").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("county").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("district").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("other").addEventListener("click", function() {
        refreshdata();
    }, false);

    var a: Object = document.getElementsByClassName('leaflet-control-container')[0];
    a.addEventListener('dblclick', function(event) {

        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }

    });
    a.addEventListener('mousemove', function(event) {

        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }

    });

}