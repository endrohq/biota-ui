"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HederaMessageTopics = exports.StorageJsonFileType = exports.Category = exports.VoteType = void 0;
var VoteType;
(function (VoteType) {
    VoteType[VoteType["FOR"] = 0] = "FOR";
    VoteType[VoteType["AGAINST"] = 1] = "AGAINST";
    VoteType[VoteType["ABSTAIN"] = 2] = "ABSTAIN";
})(VoteType || (exports.VoteType = VoteType = {}));
var Category;
(function (Category) {
    Category["MOBILITY"] = "mobility";
    Category["SPATIAL_PLANNING"] = "spatial-planning";
    Category["CONFLICT_OF_INTEREST"] = "conflict-of-interest";
    Category["DE_PAVING"] = "de-paving";
    Category["PROCEDURE"] = "procedure";
    Category["CONSTRUCTION_PHASE"] = "construction-phase";
    Category["IMPACT_ON_CLIMATE"] = "impact-on-climate";
    Category["SAFETY"] = "safety";
    Category["VISUAL_IMPACT"] = "visual-impact";
    Category["PRIVACY"] = "privacy";
    Category["NUISANCE"] = "nuisance";
    Category["MATERIAL_USAGE"] = "material-usage";
    Category["FOREST_COMPENSATION"] = "forest-compensation";
    Category["HEALTH"] = "health";
    Category["ENERGY_CONSUMPTION"] = "energy-consumption";
    Category["PLANNING_CONTEXT"] = "planning-context";
    Category["ENVIRONMENTAL_IMPACT_REPORT"] = "environmental-impact-report";
    Category["WATER"] = "water";
    Category["AIR_QUALITY"] = "air-quality";
    Category["ECOLOGY"] = "ecology";
    Category["NOISE_POLLUTION"] = "noise-pollution";
    Category["LIGHT_POLLUTION"] = "light-pollution";
    Category["ODOR_NUISANCE"] = "odor-nuisance";
})(Category || (exports.Category = Category = {}));
var StorageJsonFileType;
(function (StorageJsonFileType) {
    StorageJsonFileType["OBJECTION"] = "objection";
    StorageJsonFileType["METADATA"] = "metadata";
    StorageJsonFileType["PROPOSAL"] = "proposal";
})(StorageJsonFileType || (exports.StorageJsonFileType = StorageJsonFileType = {}));
var HederaMessageTopics;
(function (HederaMessageTopics) {
    HederaMessageTopics["PROPOSAL"] = "proposal";
})(HederaMessageTopics || (exports.HederaMessageTopics = HederaMessageTopics = {}));
