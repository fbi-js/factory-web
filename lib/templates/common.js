"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameAndDescriptionConfig = void 0;
const fbi_1 = require("fbi");
function getNameAndDescriptionConfig(defaultName) {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'Input the project name',
            initial({ enquirer }) {
                return defaultName;
            },
            validate(value) {
                const name = fbi_1.utils.formatName(value);
                return (name && true) || 'please input a valid project name';
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Input project description',
            initial({ state }) {
                return `${state.answers.name} description`;
            }
        }
    ];
}
exports.getNameAndDescriptionConfig = getNameAndDescriptionConfig;
