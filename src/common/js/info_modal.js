// @flow

module.exports = function(map: Object) {
    'use strict';

    map.openModal({
        content: '<table class="abbrev">' +
            '<tr><td><span class="ttext">BBFS:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/broadband-planning-and-implementation" class="blue" target="_blank" >Broadband Federal Stimulus</a></span></td></tr>' +
            '<tr><td><span class="ttext">CCPI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/community-crime-prevention-initiative-ccpi" class="blue" target="_blank" >Community Crime Prevention Initiative</a></span></td></tr>' +
            '<tr><td><span class="ttext">CDBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/community-development-block-grant-cdbg" class="blue" target="_blank" >Community Development Block Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CENS:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov" class="blue" target="_blank" >Census Grant Outreach Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">CHPG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/community-development-and-planning" class="blue" target="_blank" >Colorado Heritage Planning Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CSBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/community-services-block-grant-csbg" class="blue" target="_blank" >Community Services Block Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CTF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/conservation-trust-fund-ctf" class="blue" target="_blank" >Conservation Trust Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">CVRF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/federal-stimulus-funds" class="blue" target="_blank" >Coronavirus Relief Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">DCFA:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/defense-counsel-first-appearance-grant-program" class="blue" target="_blank" >Defense Counsel on First Appearance</a></span></td></tr>' +
            
            '<tr><td><span class="ttext">EIAF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/energy-mineral-impact-assistance-fund-grant-eiaf" class="blue" target="_blank" >Energy and Mineral Impact Assistance Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">FCB:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/firefighter-cancer-and-cardiac-benefit-program" class="blue" target="_blank" >Firefighter Cardiac Benefit Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">GAME:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/local-government-limited-gaming-impact-grant" class="blue" target="_blank" >Local Government Limited Gaming Impact Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">GBMJ:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/gray-and-black-market-marijuana-enforcement-grant" class="blue" target="_blank" >Gray and Black Market Marijuana Enforcement</a></span></td></tr>' +
            '<tr><td><span class="ttext">IHOI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/incentives-grant-program" class="blue" target="_blank" >Housing Incentives Grant Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">IHOP:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/planning-grant-program" class="blue" target="_blank" >Housing Planning Grant Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">LECS:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/law-enforcement-community-services-grant-program" class="blue" target="_blank" >Law Enforcement Community Services Grant Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">LOMA:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/local-match-program-federal-infrastructure-investment-and-jobs-act" class="blue" target="_blank" >Local Match for Federal IIJA</a></span></td></tr>' +
            '<tr><td><span class="ttext">LPC:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/local-planning-capacity-grant-program" class="blue" target="_blank" >Local Planning Capacity Grant Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">MC:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/microgrids" class="blue" target="_blank" >Microgrids for Community Resilience Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">MJ:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/gray-and-black-market-marijuana-enforcement-grant" class="blue" target="_blank" >Marijuana Impact Grant Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">MRP:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://ona.colorado.gov/refugee-services" class="blue" target="_blank" >Migrant Refugee Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">MS:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/main-street" class="blue" target="_blank" >Main Street Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">NEU:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/american-rescue-plan-arp" class="blue" target="_blank" >American Rescue Plan</a></span></td></tr>' +
            '<tr><td><span class="ttext">NPI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/npi" class="blue" target="_blank" >Nonprofit Infrastructure Grant Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">POMH:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/peace-officer-behavioral-health-support-and-community-partnership-grant-program" class="blue" target="_blank" >Peace Officer Mental Health Support Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">PSI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov" class="blue" target="_blank" >Pools Special Initiative</a></span></td></tr>' +
            '<tr><td><span class="ttext">REDI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/rural-economic-development-initiative" class="blue" target="_blank" >Rural Economic Development Initiative</a></span></td></tr>' +
            '<tr><td><span class="ttext">RNSS:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/american-rescue-plan-arp" class="blue" target="_blank" >Renewable State Stimulus</a></span></td></tr>' +
            '<tr><td><span class="ttext">SAR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://cpw.state.co.us/backcountry-search-and-rescue-program" class="blue" target="_blank" >Colorado Search and Rescue Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">SBR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/small-business-relief-program" class="blue" target="_blank" >Small Business Relief Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">SCIG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/strong-communities" class="blue" target="_blank" >Strong Communities Grant</a></span></td></tr>' +
            '<tr><td><span class="ttext">SEV_FML:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Direct Distribution</a></span></td></tr>' +
            '<tr><td><span class="ttext">VFP:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://dlg.colorado.gov/volunteer-firefighter-pension-fund" class="blue" target="_blank" >Volunteer Firefighter Pension</a></span></td></tr>' +
            '</table><br />'
    });


}