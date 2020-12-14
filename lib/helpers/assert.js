"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertFbiPaths = exports.assertFactoryTemplate = void 0;
const assert_1 = __importDefault(require("assert"));
const assertFactoryTemplate = (factory) => {
    const assertFailLog = `fbi factory.template field must one of "micro-main", "micro-react", "micro-vue", "react", "vue"`;
    const assertIsOk = factory &&
        factory.template &&
        ['micro-main', 'micro-react', 'micro-vue', 'react', 'vue'].includes(factory.template);
    assert_1.default(assertIsOk, assertFailLog);
};
exports.assertFactoryTemplate = assertFactoryTemplate;
const assertFbiPaths = (paths) => {
    const assertFailLog = ``;
    const assertIsOk = true;
    // Object.keys()
    // const assertIsOk = factory && factory.template &&
    // ['micro-main', 'micro-react', 'micro-vue', 'react', 'vue'].includes(factory.template)
    // console.log('factory', factory)
    assert_1.default(assertIsOk, assertFailLog);
};
exports.assertFbiPaths = assertFbiPaths;
