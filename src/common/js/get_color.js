// @flow

module.exports = function getcolor(program: string): string {
    'use strict';

    //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG"];
    if (program === "FCB" || program === "CTF" || program === "SEV_FML" || program === "VFP") {
        return "green";
    }
    if (program === "CCPI" || program === "CSBG" || program === "MRP" || program === "DCFA"  || program === "GBMJ" || program === "LECS" || program === "MJ" || program === "POMH" || program === "SAR" || program === "PSI" || program === "CENS" || program === "BSARFX") {
        return "blue";
    }
    if (program === "BBFS" || program === "CVRF" || program === "LOMA" || program === "NEU" || program === "RNSS" || program === "SBR" || program === "NPI") {
        return "red";
    }
    if (program === "ADUG" || program === "CHPG" || program === "IHOI" || program === "IHOP" || program === "HPLN" || program === "LPC" || program === "SCIG"  || program === "TOCI") {
        return "purple";
    }
    if (program === "CDBGCV" || program === "CDBGED" || program === "CDBGPF" || program === "CDBGPS" || program === "EIAF" || program === "GAME" || program === "MCRF" || program === "MCRG" || program === "MS" || program === "MSOB" || program === "REDI") {
        return "dark yellow";
    }
    if (program === "DR" || program === "DRR") {
        return "orange";
    }
    return "grey";

}