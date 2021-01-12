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
Object.defineProperty(exports, "__esModule", { value: true });
const fbi_1 = require("fbi");
class CommandTypesCreate extends fbi_1.Command {
    constructor(factory) {
        super();
        this.factory = factory;
        this.id = 'ts-create';
        this.alias = 'tsc';
        this.description = 'create typing files for webpack5 module-faderation exposes modules';
        this.args = '';
        this.flags = [];
    }
    run(flags, unknown) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug(`Factory: (${this.factory.id})`, 'from command', `"${this.id}"`, 'flags:', flags, 'unknown:', unknown);
            this.logStart('Create typings...');
            try {
                yield this.create();
            }
            catch (err) {
                this.error('Failed to Create typings');
                this.error(err).exit();
            }
        });
    }
    create() {
        const ts = require('typescript');
        const fs = require('fs-extra');
        const path = require('path');
        const appDirectory = fs.realpathSync(process.cwd());
        const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
        const { typingsConfigs, federationConfigs } = require(resolveApp('federation.config'));
        const { exposes, name: federationName } = federationConfigs;
        const compileFiles = Object.values(exposes);
        const outFile = resolveApp(path.resolve(typingsConfigs.typingsOutputDir, `${federationName}.d.ts`));
        if (!fs.existsSync(outFile)) {
            fs.mkdirSync(resolveApp(typingsConfigs.typingsOutputDir));
            fs.createFileSync(outFile);
        }
        // write the typings file
        const program = ts.createProgram(compileFiles.map((item) => resolveApp(item)), {
            outFile,
            declaration: true,
            emitDeclarationOnly: true,
            skipLibCheck: true,
            jsx: 'react',
            esModuleInterop: true
        });
        program.emit();
        let typing = fs.readFileSync(outFile, { encoding: 'utf8', flag: 'r' });
        const moduleRegex = /declare module "(.*)"/g; // RegExp(/declare module "(.*)"/, 'g')
        const moduleNames = [];
        // @ts-ignore
        let execResults;
        while ((execResults = moduleRegex.exec(typing) !== null)) {
            // @ts-ignore
            moduleNames.push(execResults[1]);
        }
        moduleNames.forEach((moduleName) => {
            const regex = RegExp(`"${moduleName}`, 'g');
            typing = typing.replace(regex, `"${federationName}/${moduleName}`);
        });
        typing = Object.keys(exposes).reduce((pre, current) => {
            const item = exposes[current];
            const regStr = /\.\//g;
            const exposesModule = current.replace(regStr, '');
            const regStrB = /\.\/src\//g;
            const exposesSrc = item.replace(regStrB, '');
            return pre.replace(exposesSrc, `${federationName}/${exposesModule}`);
        }, typing);
        console.log('writing typing to file:', outFile);
        fs.writeFileSync(outFile, typing);
        console.log('\x1b[36m%s\x1b[0m', '==== Success! ====');
    }
}
exports.default = CommandTypesCreate;
