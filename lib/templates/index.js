"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fbi_1 = require("fbi");
const ejs = tslib_1.__importStar(require("ejs"));
const utils_1 = require("fbi/lib/utils");
const react_1 = tslib_1.__importDefault(require("./react"));
const vue_1 = tslib_1.__importDefault(require("./vue"));
const vue3_1 = tslib_1.__importDefault(require("./vue3"));
class TemplateWeb extends fbi_1.Template {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'web';
        this.description = 'template for factory-web';
        this.path = 'templates/index';
        this.renderer = ejs.render;
        this.templates = [new vue_1.default(this.factory), new react_1.default(this.factory), new vue3_1.default(this.factory)];
        this.projectInfo = {};
    }
    async gathering(flags) {
        var _a, _b, _c, _d;
        const { language } = await this.prompt({
            type: 'select',
            name: 'language',
            message: `Which language do you want to use?`,
            hint: '(Use <arrow> to select, <return> to submit)',
            choices: [
                { name: 'vue', value: true },
                { name: 'react', value: true }
            ],
            result(name) {
                return name;
            }
        });
        this.projectInfo = await this.prompt([
            {
                type: 'Select',
                name: 'vueVersion',
                message: `Which version of vue do you want to choice?`,
                hint: '(Use <arrow> to select, <return> to submit)',
                skip({ state }) {
                    return language === 'react' ? true : false;
                },
                choices: [
                    { name: 'vue2', value: true },
                    { name: 'vue3', value: true }
                ],
                result(names) {
                    return this.map(names);
                }
            },
            {
                type: 'input',
                name: 'name',
                message: 'Input the project name',
                initial({ enquirer }) {
                    return 'project-demo';
                },
                validate(value) {
                    const name = utils_1.formatName(value);
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
        ]);
        this.projectInfo.nameCapitalized = utils_1.capitalizeEveryWord(this.projectInfo.name);
        const project = this.projectInfo;
        this.configStore.set("projectInfo", project);
        const temps = fbi_1.utils.flatten(this.factory.templates.map((f) => f.templates));
        const choiseId = language === 'react' ? 'react' : project.vueVersion.vue2 ? 'vue' : 'vue3';
        const choiseTemp = temps.filter((it) => it.id === choiseId)[0];
        if (choiseTemp) {
            // set init data
            const factoryInfo = this.store.get(choiseTemp.factory.id);
            const info = await choiseTemp.run({
                factory: {
                    id: factoryInfo.id,
                    path: ((_b = (_a = factoryInfo.version) === null || _a === void 0 ? void 0 : _a.latest) === null || _b === void 0 ? void 0 : _b.dir) || factoryInfo.path,
                    version: (_d = (_c = factoryInfo.version) === null || _c === void 0 ? void 0 : _c.latest) === null || _d === void 0 ? void 0 : _d.short,
                    template: choiseTemp.factory.id
                }
            }, flags);
            if (!info) {
                return;
            }
            // update store
            this.debug(`Save info into project store`);
            if (info.path) {
                this.projectStore.merge(info.path, {
                    features: info.features,
                    updatedAt: Date.now()
                });
            }
        }
    }
}
exports.default = TemplateWeb;
