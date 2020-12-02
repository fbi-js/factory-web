"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class TemplateVue extends base_1.default {
    constructor(factory) {
        super(factory);
        this.factory = factory;
        this.id = 'vue';
        this.path = 'templates/vue';
        this.description = 'template for Vue.js application';
        this.templates = [];
    }
    async gathering(flags) {
        await super.gathering(flags);
        const extraData = await this.prompt([
            {
                type: 'MultiSelect',
                name: 'features',
                message: `Choose features for your project:`,
                hint: '(Use <space> to select, <return> to submit)',
                choices: [{ name: 'typescript', value: true }],
                result(names) {
                    return this.map(names);
                }
            }
        ]);
        this.data.project = Object.assign(Object.assign({}, this.data.project), extraData);
        const { factory, project } = this.data;
        this.spinner = this.createSpinner(`Creating project...`).start(`Creating ${this.style.bold.green(project.name)} via ${factory.id} from ${factory.template}...`);
    }
    async writing() {
        var _a, _b;
        const isTs = (_b = (_a = this.data.project) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.typescript;
        await super.writing();
        this.files.copy = (this.files.copy || []).concat([
            'public/*',
            isTs ? 'tsconfig.json' : '',
            {
                from: isTs ? 'src-ts/*' : 'src/*',
                to: `src`
            }
        ].filter(Boolean));
        this.files.render = (this.files.render || []).concat({
            from: isTs ? 'src-ts/main.ts' : 'src/main.js',
            to: `src/main.${isTs ? 'ts' : 'js'}`
        });
    }
}
exports.default = TemplateVue;
