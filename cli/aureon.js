#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'node:path';
import { spawn } from 'node:child_process';

const args = process.argv.slice(2);

function copyTemplate(target, templateName = "base") {
    const template = path.join(path.dirname(process.argv[1]), "templates", templateName);
    if (!fs.existsSync(template)) {
        console.error("Template not found:", templateName);
        process.exit(1);
    }
    fs.copySync(template, target);
}

function createPage(name) {
    const pageName = name.charAt(0).toUpperCase() + name.slice(1);
    const pagePath = path.join(process.cwd(), 'app-client/src/pages', pageName);

    if (fs.existsSync(pagePath)) {
        console.error(`Page ${pageName} already exists!`);
        process.exit(1);
    }

    fs.mkdirpSync(pagePath);

    fs.writeFileSync(path.join(pagePath, `${pageName}.ts`),
        `export function init${pageName}() {
    const container = document.getElementById('app');
    container!.innerHTML = \`<h2>${pageName} Page</h2>\`;
}`
    );

    fs.writeFileSync(path.join(pagePath, `${pageName}.html`),
        `<div id="${name}-page"><h2>${pageName} Page</h2></div>`
    );

    fs.writeFileSync(path.join(pagePath, `${pageName}.scss`),
        `#${name}-page { padding:20px; color:#d4af37; background:#111; }`
    );

    console.log(`✔ Page ${pageName} created at ${pagePath}`);
}

const cmd = args[0];

if (cmd === 'serve') {
    console.log('🚀 Starting Aureon fullstack (FE + BE)');
    const be = spawn('npm',['run','dev'],{ cwd:path.join(process.cwd(),'app-server'), shell:true, stdio:'inherit' });
    const fe = spawn('npm',['run','dev'],{ cwd:path.join(process.cwd(),'app-client'), shell:true, stdio:'inherit' });
    const exitAll = () => { be.kill(); fe.kill(); process.exit(); };
    process.on('SIGINT', exitAll); process.on('SIGTERM', exitAll);

} else if (cmd === 'create' && args[1] === 'app' && args[2]) {
    const target = path.join(process.cwd(), args[2]);
    copyTemplate(target);
    console.log(`✔ Aureon project "${args[2]}" created!`);

} else if (cmd === 'generate' && args[1] === 'page' && args[2]) {
    createPage(args[2]);

} else {
    console.log('Aureon CLI commands:');
    console.log('  serve                Start backend + frontend (dev)');
    console.log('  create app <name>    Create new Aureon project');
    console.log('  generate page <name> Create new frontend page');
}
