"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const vue_1 = __importDefault(require("./vue"));
class TemplateMicroVue extends vue_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'micro-vue';
        this.path = path_1.join(__dirname, '../../templates/vue');
        this.description = 'template for Micro-fontends vue application';
        this.templates = [];
    }
    gathering(flags) {
        const _super = Object.create(null, {
            gathering: { get: () => super.gathering }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.gathering.call(this, flags);
            this.data.project = Object.assign(Object.assign({}, this.data.project), { isMicro: true });
        });
    }
}
exports.default = TemplateMicroVue;
