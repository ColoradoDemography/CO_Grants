// @flow

module.exports = function(map: Object) {
    'use strict';

    map.openModal({
        content: '<table class="abbrev">' +
            '<tr><td><span class="ttext">CCPI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/community-crime-prevention-initiative-ccpi" class="blue" target="_blank" >Community Crime Prevention Initiative</a></span></td></tr>' +
            '<tr><td><span class="ttext">CDBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/community-development-block-grant-cdbg" class="blue" target="_blank" >Community Development Block Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CDBGED:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/community-development-block-grant-cdbg" class="blue" target="_blank" >Community Development Block Grants Economic Development</a></span></td></tr>' +
            '<tr><td><span class="ttext">CDBGPF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/community-development-block-grant-cdbg" class="blue" target="_blank" >Community Development Block Grants Public Facilities</a></span></td></tr>' +
            '<tr><td><span class="ttext">CFS:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/civil-asset-forfeiture-reporting" class="blue" target="_blank" >Civil Asset Forfeiture Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">CHPG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/community-development-planning" class="blue" target="_blank" >Colorado Heritage Planning Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CSBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/community-services-block-grant-csbg" class="blue" target="_blank" >Community Services Block Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CTF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/conservation-trust-fund-ctf" class="blue" target="_blank" >Conservation Trust Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">CVRF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/cvrf" class="blue" target="_blank" >Coronavirus Relief Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">DCFA:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/defense-counsel-first-appearance-grant-program" class="blue" target="_blank" >Defense Counsel on First Appearance</a></span></td></tr>' +
            '<tr><td><span class="ttext">DR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/disaster-recovery" class="blue" target="_blank" >Community Development Block Grant Disaster Recovery</a></span></td></tr>' +
            '<tr><td><span class="ttext">EIAF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/energy/mineral-impact-assistance-fund-grant-eiaf" class="blue" target="_blank" >Energy and Mineral Impact Assistance Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">FCB:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/firefighter-cardiac-benefit-program" class="blue" target="_blank" >Firefighter Cardiac Benefit Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">GAME:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/local-government-limited-gaming-impact-grant" class="blue" target="_blank" >Local Government Limited Gaming Impact Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">GBMJ:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/marijuana-enforcement-grant" class="blue" target="_blank" >Gray and Black Market Marijuana Enforcement</a></span></td></tr>' +
            '<tr><td><span class="ttext">MJ:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/marijuana-enforcement-grant" class="blue" target="_blank" >Marijuana Impact Grant Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">MS:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/colorado-main-street-program" class="blue" target="_blank" >Main Street Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">MSOB:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/open-for-business" class="blue" target="_blank" >Main Street: Open for Business</a></span></td></tr>' +
            '<tr><td><span class="ttext">NEU:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/covid-19-relief-for-local-governments/american-rescue-plan-arp" class="blue" target="_blank" >American Rescue Plan</a></span></td></tr>' +
            '<tr><td><span class="ttext">POMH:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/peace-officer-mental-health-grant" class="blue" target="_blank" >Peace Officer Mental Health Support Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">REDI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://choosecolorado.com/doing-business/incentives-financing/rural-businesses/" class="blue" target="_blank" >Rural Economic Development Initiative</a></span></td></tr>' +
            '<tr><td><span class="ttext">SAR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/search-and-rescue-fund" class="blue" target="_blank" >Colorado Search and Rescue Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">SEV/FML:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/funding-programs/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Direct Distribution</a></span></td></tr>' +
            '<tr><td><span class="ttext">VFP:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cdola.colorado.gov/volunteer-firefighter-pension-fund" class="blue" target="_blank" >Volunteer Firefighter Pension</a></span></td></tr>' +
            '</table><br />' +
            '<a id="bblink" href="https://demography.dola.colorado.gov/D3_BroadbandStatus/" target="_blank">Colorado Broadband Grant Map</a><br />'
    });


}