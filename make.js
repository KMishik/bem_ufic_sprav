const fs = require('fs'),
      bemxjst = require('bem-xjst'),
      bemhtml = bemxjst.bemhtml,
      bemtree = bemxjst.bemtree;

let pageTree = require('./sprav.bemjson');
let userJSON = require('./data/spravochnik.json');
let bemtreeCtx = Object.assign({}, pageTree, userJSON);

let compileBEMTREETemplate = bemtree.compile();
let compileBEMHTMLTemplate = bemhtml.compile();

compileBEMTREETemplate.compile(fs.readFileSync('blocks/sprav/sprav.bemtree.js','utf8'));
compileBEMTREETemplate.compile(fs.readFileSync('blocks/contacts/contacts.bemtree.js','utf8'));
compileBEMTREETemplate.compile(fs.readFileSync('blocks/preface/preface.bemtree.js','utf8'));

compileBEMHTMLTemplate.compile(fs.readFileSync('blocks/sprav/sprav.bemhtml.js','utf8'));
compileBEMHTMLTemplate.compile(fs.readFileSync('blocks/contacts/contacts.bemhtml.js','utf8'));


let pageJSON = compileBEMTREETemplate.apply(bemtreeCtx);

let pageHTML = compileBEMHTMLTemplate.apply(pageJSON);

fs.writeFileSync('sprav.out.bemjson.js', JSON.stringify(pageJSON,null,2));
fs.writeFileSync('sprav.out.html', pageHTML);
