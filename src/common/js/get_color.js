// @flow

module.exports = function getcolor(program: string): string {
    'use strict';

    //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG"];
    if (program === "FML" || program === "CTF" || program === "SEV/FML") {
        return "green";
    }
    if (program === "CSBG" || program === "CDBG" || program === "CDBGED" || program === "CDBGPF" || program === "CHPG" || program === "MS" || program === "CVRF" || program === "NEU" || program === "MSOB" || program === "SBR" || program === "IHOI" || program === "IHOP") {
        return "blue";
    }
    if (program === "EIAF" || program === "GAME" || program === "REDI" || program === "MJ" || program === "GBMJ" || program === "POMH" || program === "CCPI"|| program === "DCFA") {
        return "red";
    }
    if (program === "VFP" || program === "SAR" || program === "FCB" || program === "SAR Tier 1" || program === "SAR Tier 2" || program === "SAR Tier 3" || program === "SAR EoY" || program === "FFB") {
        return "purple";
    }
    if (program === "DR") {
        return "grey";
    }
    return "black";

}