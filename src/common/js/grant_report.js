// @flow

var accounting = require("accounting");
var saveAs = require("../../lib/js/FileSaver.min.js").saveAs;

module.exports = function(d: Object, map: Object, cities: Array < Object > , daterange: Object) {


    var tbl_results: Array < Object > = [];
    var len = cities.length;
    for (let i = 0; i < len; i++) {
        if (cities[i].lgid === d.lgid) {
            tbl_results.push(cities[i]);
        }
    }

    var program_totals: Object = {
        fml: 0,
        sev_dist: 0,
        vfp: 0,
        ctf: 0,
        sar: 0,
        ffb: 0,
        dcfa: 0,
        eiaf: 0,
        mj: 0,
        game: 0,
        redi: 0,
        csbg: 0,
        cdbg: 0,
        chpg: 0,
        dr: 0,
        ms: 0,
        pomh: 0,
        ccpi: 0,
        cvrf: 0,
        msob: 0,
        neu: 0,
        sbr: 0,
        ihoi: 0,
        ihop: 0,
        psi: 0,
        loma: 0,
        lpc: 0,
        bbfs: 0,
        cens: 0,
        lecs: 0,
        mc: 0,
        mrp: 0,
        npi: 0,
        rnss: 0,
        scig: 0
    };

    //iterate over results array to get totals for each program
    tbl_results.forEach(d => {
        let program = d.program;
        let dollars = d.award;
        if (program === "FML") {
            program_totals.fml += dollars;
        }
        if (program === "SEV_FML") {
            program_totals.sev_dist += dollars;
        }
        if (program === "VFP") {
            program_totals.vfp += dollars;
        }
        if (program === "CTF") {
            program_totals.ctf += dollars;
        }
        if (program === "SAR" || program === "SAR Tier 1" || program === "SAR Tier 2" |program === "SAR Tier 3" || program === "SAR EoY" || program === "BSARFX") {
            program_totals.sar += dollars;
        }
        if (program === "FCB") {
            program_totals.ffb += dollars;
        }
        if (program === "DCFA") {
            program_totals.dcfa += dollars;
        }
        if (program === "EIAF") {
            program_totals.eiaf += dollars;
        }
        if (program === "MJ" || program === "GBMJ") {
            program_totals.mj += dollars;
        }
        if (program === "GAME") {
            program_totals.game += dollars;
        }
        if (program === "REDI") {
            program_totals.redi += dollars;
        }
        if (program === "CSBG") {
            program_totals.csbg += dollars;
        }
        if (program === "CHPG") {
            program_totals.chpg += dollars;
        }
        if (program === "CDBG" || program === "CDBGED" || program === "CDBGPF" || program === "CDBGPS") {
            program_totals.cdbg += dollars;
        }
        if (program === "DR" || program === "DRR") {
            program_totals.dr += dollars;
        }
        if (program === "MS") {
            program_totals.ms += dollars;
        }
        if (program === "POMH") {
            program_totals.pomh += dollars;
        }
        if (program === "CCPI") {
            program_totals.ccpi += dollars;
        }
        if (program === "CVRF") {
            program_totals.cvrf += dollars;
        }
        if (program === "MSOB") {
            program_totals.msob += dollars;
        }
        if (program === "NEU") {
            program_totals.neu += dollars;
        }
        if (program === "SBR") {
            program_totals.sbr += dollars;
        }
        if (program === "IHOI") {
            program_totals.ihoi += dollars;
        }
        if (program === "IHOP" || program === "HPLN") {
            program_totals.ihop += dollars;
        }
        if (program === "PSI") {
            program_totals.psi += dollars;
        }
        if (program === "LOMA") {
            program_totals.loma += dollars;
        }
        if (program === "LPC") {
            program_totals.lpc += dollars;
        }
        if (program === "BBFS") {
            program_totals.bbfs += dollars;
        }
        if (program === "CENS") {
            program_totals.cens += dollars;
        }
        if (program === "LECS") {
            program_totals.lecs += dollars;
        }
        if (program === "MCRF" || program === "MCRG") {
            program_totals.mc += dollars;
        }
        if (program === "MRP") {
            program_totals.mrp += dollars;
        }
        if (program === "NPI") {
            program_totals.npi += dollars;
        }
        if (program === "RNSS") {
            program_totals.rnss += dollars;
        }
        if (program === "SCIG") {
            program_totals.scig += dollars;
        }
    });

    function compare(a: Object, b: Object) {
        if (a.dateofaward < b.dateofaward) {
            return -1;
        } else if (a.dateofaward > b.dateofaward) {
            return 1;
        } else {
            return 0;
        }
    }

    tbl_results.sort(compare);


    var content_tbl: string = "";
    var award_ttl: number = 0;

    var j: number = tbl_results.length;

    for (var i = 0; i < j; i++) {
        award_ttl = award_ttl + tbl_results[i].award;
        content_tbl = content_tbl + "<tr><td>" + (tbl_results[i].projname).slice(0, 60) + "</td><td>" + tbl_results[i].program + "</td><td>" + (tbl_results[i].dateofaward).toString().slice(4, 15) + "</td><td align='right'>" + accounting.formatMoney(tbl_results[i].award) + "</td></tr>";
    }


    map.openModal({
        content: "<h2 style='margin-bottom: -10px; margin-left: -5px;'>Grant Report for: " + d.govname + "</h2><br /><i>From: " + (daterange.mindate).toString().slice(0, 15) + " to " + (daterange.maxdate).toString().slice(0, 15) + "</i><br /><br /><div style='overflow:auto;'><table id='resultstable'><tr><th align='left'>Description</th><th>Program</th><th>Date</th><th align='right'>Total Award</th></tr>" + content_tbl + "</table></div><br /><h4>Total:  " + accounting.formatMoney(award_ttl) + "</h4><br /><span style='color: grey;'>" +
            ((program_totals.sev_dist > 0) ? ("<b>SEV_FML</b>: <i> " + accounting.formatMoney(program_totals.sev_dist) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.vfp > 0) ? ("<b>VFP</b>: <i> " + accounting.formatMoney(program_totals.vfp) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ctf > 0) ? ("<b>CTF</b>: <i> " + accounting.formatMoney(program_totals.ctf) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.sar > 0) ? ("<b>SAR</b>: <i> " + accounting.formatMoney(program_totals.sar) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ffb > 0) ? ("<b>FCB</b>: <i> " + accounting.formatMoney(program_totals.ffb) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.dcfa > 0) ? ("<b>DCFA</b>: <i> " + accounting.formatMoney(program_totals.dcfa) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.eiaf > 0) ? ("<b>EIAF</b>: <i> " + accounting.formatMoney(program_totals.eiaf) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.game > 0) ? ("<b>GAME</b>: <i> " + accounting.formatMoney(program_totals.game) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.redi > 0) ? ("<b>REDI</b>: <i> " + accounting.formatMoney(program_totals.redi) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.mj > 0) ? ("<b>MJ</b>: <i> " + accounting.formatMoney(program_totals.mj) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.csbg > 0) ? ("<b>CSBG</b>: <i> " + accounting.formatMoney(program_totals.csbg) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.chpg > 0) ? ("<b>CHPG</b>: <i> " + accounting.formatMoney(program_totals.chpg) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.cdbg > 0) ? ("<b>CDBG</b>: <i> " + accounting.formatMoney(program_totals.cdbg) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.cvrf > 0) ? ("<b>CVRF</b>: <i> " + accounting.formatMoney(program_totals.cvrf) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.msob > 0) ? ("<b>MSOB</b>: <i> " + accounting.formatMoney(program_totals.msob) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.neu > 0) ? ("<b>NEU</b>: <i> " + accounting.formatMoney(program_totals.neu) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.sbr > 0) ? ("<b>SBR</b>: <i> " + accounting.formatMoney(program_totals.sbr) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.dr > 0) ? ("<b>DR</b>: <i> " + accounting.formatMoney(program_totals.dr) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ms > 0) ? ("<b>MS</b>: <i> " + accounting.formatMoney(program_totals.ms) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ccpi > 0) ? ("<b>CCPI</b>: <i> " + accounting.formatMoney(program_totals.ccpi) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.pomh > 0) ? ("<b>POMH</b>: <i> " + accounting.formatMoney(program_totals.pomh) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ihoi > 0) ? ("<b>IHOI</b>: <i> " + accounting.formatMoney(program_totals.ihoi) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ihop > 0) ? ("<b>IHOP</b>: <i> " + accounting.formatMoney(program_totals.ihop) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.psi > 0) ? ("<b>PSI</b>: <i> " + accounting.formatMoney(program_totals.psi) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.loma > 0) ? ("<b>LOMA</b>: <i> " + accounting.formatMoney(program_totals.loma) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.lpc > 0) ? ("<b>LPC</b>: <i> " + accounting.formatMoney(program_totals.lpc) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.bbfs > 0) ? ("<b>BBFS</b>: <i> " + accounting.formatMoney(program_totals.bbfs) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.cens > 0) ? ("<b>CENS</b>: <i> " + accounting.formatMoney(program_totals.cens) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.lecs > 0) ? ("<b>LECS</b>: <i> " + accounting.formatMoney(program_totals.lecs) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.mc > 0) ? ("<b>MC</b>: <i> " + accounting.formatMoney(program_totals.mc) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.mrp > 0) ? ("<b>MRP</b>: <i> " + accounting.formatMoney(program_totals.mrp) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.npi > 0) ? ("<b>NPI</b>: <i> " + accounting.formatMoney(program_totals.npi) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.rnss > 0) ? ("<b>RNSS</b>: <i> " + accounting.formatMoney(program_totals.rnss) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.scig > 0) ? ("<b>SCIG</b>: <i> " + accounting.formatMoney(program_totals.scig) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "")
            //"</span><br /><button style='margin-top: 20px;' id='dlcsv'>Download</button>"
    });


    var dlcsv = document.getElementById('dlcsv');

    dlcsv.onclick = function() {

        console.log("clicked");
        var csvstring: string = "";
        var i: number = 0;

        var oTable: any = document.getElementById('resultstable');
        var rowLength = oTable.rows.length;
        for (i = 0; i < rowLength; i++) {
            var oCells = oTable.rows.item(i).cells;
            var cellLength = oCells.length;
            for (var j = 0; j < cellLength; j++) {
                /* get your cell info here */
                if (j === 0 && i > 0) {
                    csvstring = csvstring + "\n";
                }
                csvstring = csvstring + '"' + oCells.item(j).innerHTML + '"';
                if (j < cellLength) {
                    csvstring = csvstring + ",";
                }
            }
        }

        var outputname: string = (d.govname).replace(/[^\w]/gi, '');

        var blob: Blob = new Blob([csvstring], {
            type: "text/csv;charset=utf-8"
        });
        saveAs(blob, "grant_report_" + outputname + ".csv");

    }


}