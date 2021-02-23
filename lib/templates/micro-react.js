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
const react_1 = __importDefault(require("./react"));
class TemplateMicroReact extends react_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'micro-react';
        this.path = path_1.join(__dirname, '../../templates/react-basic');
        this.description = 'template for Micro-fontends react application';
        this.templates = [];
        this.features = [];
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
exports.default = TemplateMicroReact;
