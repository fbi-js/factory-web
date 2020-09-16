"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fbi_1 = require("fbi");
const ejs = tslib_1.__importStar(require("ejs"));
const utils_1 = require("fbi/lib/utils");
const vue_1 = tslib_1.__importDefault(require("./vue"));
const vue3_1 = tslib_1.__importDefault(require("./vue3"));
const react_1 = tslib_1.__importDefault(require("./react"));
const const_1 = require("../const");
class TemplateWeb extends fbi_1.Template {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'web';
        this.description = 'template for factory-web';
        this.path = 'templates/index';
        this.renderer = ejs.render;
        this.templates = [
            new vue_1.default(this.factory),
            new vue3_1.default(this.factory),
            new react_1.default(this.factory)
        ];
        this.projectInfo = {};
    }
    async gathering(flags) {
        var _a, _b, _c, _d, _e, _f;
        const defaultName = (this.data.project && this.data.project.name) || 'project-demo';
        const nameAndDescriptionConfig = [
            {
                type: 'input',
                name: 'name',
                message: 'Input the project name',
                initial({ enquirer }) {
                    return defaultName;
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
        ];
        this.projectInfo = await this.prompt([
            {
                type: 'select',
                name: 'language',
                message: `Which language do you want to use?`,
                hint: '(Use <arrow> to select, <return> to submit)',
                choices: [
                    { name: const_1.VUE_STR, value: true },
                    { name: const_1.REACT_STR, value: true }
                ]
            },
            {
                type: 'select',
                name: 'templateId',
                message: `Which version of vue do you want to choice?`,
                hint: '(Use <arrow> to select, <return> to submit)',
                skip(state) {
                    const { answers } = this.state;
                    return answers.language === const_1.REACT_STR;
                },
                choices: [
                    { name: const_1.VUE2_TEMPLATE_ID, value: true },
                    { name: const_1.VUE3_TEMPLATE_ID, value: true }
                ]
            },
            {
                type: 'select',
                name: 'features',
                message: `Which feature of react do you want to choice?`,
                hint: '(Use <arrow> to select, <return> to submit)',
                skip() {
                    const { answers } = this.state;
                    return answers.language === const_1.VUE_STR;
                },
                choices: [
                    { name: const_1.REACT_GRAPHQL_FEATURE_ID, value: true },
                    { name: const_1.REACT_OPENAPI_FEATURE_ID, value: true }
                ],
                result(name) {
                    return {
                        [name]: true
                    };
                }
            },
            ...nameAndDescriptionConfig
        ]);
        this.projectInfo.nameCapitalized = utils_1.capitalizeEveryWord(this.projectInfo.name);
        if (this.projectInfo.language === const_1.REACT_STR) {
            this.projectInfo = {
                ...this.projectInfo,
                templateId: const_1.REACT_TEMPLATE_ID
            };
        }
        try {
            this.configStore.set('projectInfo', this.projectInfo);
        }
        catch {
            // 若写入项目信息数据失败，终止后续流程
            return;
        }
        const temps = fbi_1.utils.flatten(this.factory.templates.map((f) => f.templates));
        const templateId = this.projectInfo.templateId;
        const selectedTemplate = temps.find((it) => it.id === templateId);
        if (selectedTemplate) {
            // set init data
            // TODO: factoryInfo的version有问题
            const factoryInfo = this.store.get(selectedTemplate.factory.id);
            const info = await selectedTemplate.run({
                factory: {
                    id: factoryInfo.id,
                    path: ((_b = (_a = factoryInfo.version) === null || _a === void 0 ? void 0 : _a.latest) === null || _b === void 0 ? void 0 : _b.dir) || factoryInfo.path,
                    version: (_d = (_c = factoryInfo.version) === null || _c === void 0 ? void 0 : _c.latest) === null || _d === void 0 ? void 0 : _d.short,
                    template: selectedTemplate.id
                }
            }, flags);
            if (!info) {
                return;
            }
            // 清除暂存的项目数据
            this.configStore.del('projectInfo');
            // update store
            this.debug(`Save info into project store`);
            if (info.path) {
                this.projectStore.merge(info.path, {
                    name: info.name,
                    path: info.path,
                    factory: factoryInfo.id,
                    version: (_f = (_e = factoryInfo.version) === null || _e === void 0 ? void 0 : _e.latest) === null || _f === void 0 ? void 0 : _f.short,
                    template: selectedTemplate.templateId,
                    features: info.features,
                    createdAt: Date.now()
                });
            }
        }
    }
}
exports.default = TemplateWeb;
