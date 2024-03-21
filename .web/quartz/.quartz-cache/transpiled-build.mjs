var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});import sourceMapSupport from"source-map-support";import path12 from"path";import chalk from"chalk";import pretty from"pretty-time";var PerfTimer=class{static{__name(this,"PerfTimer")}evts;constructor(){this.evts={},this.addEvent("start")}addEvent(evtName){this.evts[evtName]=process.hrtime()}timeSince(evtName){return chalk.yellow(pretty(process.hrtime(this.evts[evtName??"start"])))}};import{rimraf}from"rimraf";import{isGitIgnored}from"globby";import chalk6 from"chalk";import esbuild from"esbuild";import remarkParse from"remark-parse";import remarkRehype from"remark-rehype";import{unified}from"unified";import{read}from"to-vfile";import{slug as slugAnchor}from"github-slugger";import rfdc from"rfdc";var clone=rfdc(),QUARTZ="quartz";function isRelativeURL(s){let validStart=/^\.{1,2}/.test(s),validEnding=!endsWith(s,"index");return validStart&&validEnding&&![".md",".html"].includes(_getFileExtension(s)??"")}__name(isRelativeURL,"isRelativeURL");function sluggify(s){return s.split("/").map(segment=>segment.replace(/\s/g,"-").replace(/&/g,"-and-").replace(/%/g,"-percent").replace(/\?/g,"").replace(/#/g,"")).join("/").replace(/\/$/,"")}__name(sluggify,"sluggify");function slugifyFilePath(fp,excludeExt){fp=stripSlashes(fp);let ext=_getFileExtension(fp),withoutFileExt=fp.replace(new RegExp(ext+"$"),"");(excludeExt||[".md",".html",void 0].includes(ext))&&(ext="");let slug=sluggify(withoutFileExt);return endsWith(slug,"_index")&&(slug=slug.replace(/_index$/,"index")),slug+ext}__name(slugifyFilePath,"slugifyFilePath");function simplifySlug(fp){let res=stripSlashes(trimSuffix(fp,"index"),!0);return res.length===0?"/":res}__name(simplifySlug,"simplifySlug");function transformInternalLink(link){let[fplike,anchor]=splitAnchor(decodeURI(link)),folderPath=isFolderPath(fplike),segments=fplike.split("/").filter(x=>x.length>0),prefix=segments.filter(isRelativeSegment).join("/"),fp=segments.filter(seg=>!isRelativeSegment(seg)&&seg!=="").join("/"),simpleSlug=simplifySlug(slugifyFilePath(fp)),joined=joinSegments(stripSlashes(prefix),stripSlashes(simpleSlug)),trail=folderPath?"/":"";return _addRelativeToStart(joined)+trail+anchor}__name(transformInternalLink,"transformInternalLink");var _rebaseHastElement=__name((el,attr,curBase,newBase)=>{if(el.properties?.[attr]){if(!isRelativeURL(String(el.properties[attr])))return;let rel=joinSegments(resolveRelative(curBase,newBase),"..",el.properties[attr]);el.properties[attr]=rel}},"_rebaseHastElement");function normalizeHastElement(rawEl,curBase,newBase){let el=clone(rawEl);return _rebaseHastElement(el,"src",curBase,newBase),_rebaseHastElement(el,"href",curBase,newBase),el.children&&(el.children=el.children.map(child=>normalizeHastElement(child,curBase,newBase))),el}__name(normalizeHastElement,"normalizeHastElement");function pathToRoot(slug){let rootPath=slug.split("/").filter(x=>x!=="").slice(0,-1).map(_=>"..").join("/");return rootPath.length===0&&(rootPath="."),rootPath}__name(pathToRoot,"pathToRoot");function resolveRelative(current,target){return joinSegments(pathToRoot(current),simplifySlug(target))}__name(resolveRelative,"resolveRelative");function splitAnchor(link){let[fp,anchor]=link.split("#",2);return anchor=anchor===void 0?"":"#"+slugAnchor(anchor),[fp,anchor]}__name(splitAnchor,"splitAnchor");function slugTag(tag){return tag.split("/").map(tagSegment=>sluggify(tagSegment)).join("/")}__name(slugTag,"slugTag");function joinSegments(...args){return args.filter(segment=>segment!=="").join("/").replace(/\/\/+/g,"/")}__name(joinSegments,"joinSegments");function getAllSegmentPrefixes(tags){let segments=tags.split("/"),results=[];for(let i=0;i<segments.length;i++)results.push(segments.slice(0,i+1).join("/"));return results}__name(getAllSegmentPrefixes,"getAllSegmentPrefixes");function transformLink(src,target,opts){let targetSlug=transformInternalLink(target);if(opts.strategy==="relative")return targetSlug;{let folderTail=isFolderPath(targetSlug)?"/":"",canonicalSlug=stripSlashes(targetSlug.slice(1)),[targetCanonical,targetAnchor]=splitAnchor(canonicalSlug);if(opts.strategy==="shortest"){let matchingFileNames=opts.allSlugs.filter(slug=>{let fileName=slug.split("/").at(-1);return targetCanonical===fileName});if(matchingFileNames.length===1){let targetSlug2=matchingFileNames[0];return resolveRelative(src,targetSlug2)+targetAnchor}}return joinSegments(pathToRoot(src),canonicalSlug)+folderTail}}__name(transformLink,"transformLink");function isFolderPath(fplike){return fplike.endsWith("/")||endsWith(fplike,"index")||endsWith(fplike,"index.md")||endsWith(fplike,"index.html")}__name(isFolderPath,"isFolderPath");function endsWith(s,suffix){return s===suffix||s.endsWith("/"+suffix)}__name(endsWith,"endsWith");function trimSuffix(s,suffix){return endsWith(s,suffix)&&(s=s.slice(0,-suffix.length)),s}__name(trimSuffix,"trimSuffix");function _getFileExtension(s){return s.match(/\.[A-Za-z0-9]+$/)?.[0]}__name(_getFileExtension,"_getFileExtension");function isRelativeSegment(s){return/^\.{0,2}$/.test(s)}__name(isRelativeSegment,"isRelativeSegment");function stripSlashes(s,onlyStripPrefix){return s.startsWith("/")&&(s=s.substring(1)),!onlyStripPrefix&&s.endsWith("/")&&(s=s.slice(0,-1)),s}__name(stripSlashes,"stripSlashes");function _addRelativeToStart(s){return s===""&&(s="."),s.startsWith(".")||(s=joinSegments(".",s)),s}__name(_addRelativeToStart,"_addRelativeToStart");import path from"path";import workerpool,{Promise as WorkerPromise}from"workerpool";import{Spinner}from"cli-spinner";var QuartzLogger=class{static{__name(this,"QuartzLogger")}verbose;spinner;constructor(verbose){this.verbose=verbose}start(text){this.verbose?console.log(text):(this.spinner=new Spinner(`%s ${text}`),this.spinner.setSpinnerString(18),this.spinner.start())}end(text){this.verbose||this.spinner.stop(!0),text&&console.log(text)}};import chalk2 from"chalk";import process2 from"process";import{isMainThread}from"workerpool";var rootFile=/.*at file:/;function trace(msg,err){let stack=err.stack??"",lines=[];lines.push(""),lines.push(`
`+chalk2.bgRed.black.bold(" ERROR ")+`

`+chalk2.red(` ${msg}`)+(err.message.length>0?`: ${err.message}`:""));let reachedEndOfLegibleTrace=!1;for(let line of stack.split(`
`).slice(1)){if(reachedEndOfLegibleTrace)break;line.includes("node_modules")||(lines.push(` ${line}`),rootFile.test(line)&&(reachedEndOfLegibleTrace=!0))}let traceMsg=lines.join(`
`);if(isMainThread)console.error(traceMsg),process2.exit(1);else throw new Error(traceMsg)}__name(trace,"trace");function createProcessor(ctx){let transformers=ctx.cfg.plugins.transformers;return unified().use(remarkParse).use(transformers.filter(p=>p.markdownPlugins).flatMap(plugin=>plugin.markdownPlugins(ctx))).use(remarkRehype,{allowDangerousHtml:!0}).use(transformers.filter(p=>p.htmlPlugins).flatMap(plugin=>plugin.htmlPlugins(ctx)))}__name(createProcessor,"createProcessor");function*chunks(arr,n){for(let i=0;i<arr.length;i+=n)yield arr.slice(i,i+n)}__name(chunks,"chunks");async function transpileWorkerScript(){return esbuild.build({entryPoints:["./quartz/worker.ts"],outfile:path.join(QUARTZ,"./.quartz-cache/transpiled-worker.mjs"),bundle:!0,keepNames:!0,platform:"node",format:"esm",packages:"external",sourcemap:!0,sourcesContent:!1,plugins:[{name:"css-and-scripts-as-text",setup(build){build.onLoad({filter:/\.scss$/},_=>({contents:"",loader:"text"})),build.onLoad({filter:/\.inline\.(ts|js)$/},_=>({contents:"",loader:"text"}))}}]})}__name(transpileWorkerScript,"transpileWorkerScript");function createFileParser(ctx,fps){let{argv,cfg}=ctx;return async processor=>{let res=[];for(let fp of fps)try{let perf=new PerfTimer,file=await read(fp);file.value=file.value.toString().trim();for(let plugin of cfg.plugins.transformers.filter(p=>p.textTransform))file.value=plugin.textTransform(ctx,file.value.toString());file.data.filePath=file.path,file.data.relativePath=path.posix.relative(argv.directory,file.path),file.data.slug=slugifyFilePath(file.data.relativePath);let ast=processor.parse(file),newAst=await processor.run(ast,file);res.push([newAst,file]),argv.verbose&&console.log(`[process] ${fp} -> ${file.data.slug} (${perf.timeSince()})`)}catch(err){trace(`
Failed to process \`${fp}\``,err)}return res}}__name(createFileParser,"createFileParser");var clamp=__name((num,min,max)=>Math.min(Math.max(Math.round(num),min),max),"clamp");async function parseMarkdown(ctx,fps){let{argv}=ctx,perf=new PerfTimer,log=new QuartzLogger(argv.verbose),CHUNK_SIZE=128,concurrency=ctx.argv.concurrency??clamp(fps.length/CHUNK_SIZE,1,4),res=[];if(log.start(`Parsing input files using ${concurrency} threads`),concurrency===1)try{let processor=createProcessor(ctx);res=await createFileParser(ctx,fps)(processor)}catch(error){throw log.end(),error}else{await transpileWorkerScript();let pool=workerpool.pool("./quartz/bootstrap-worker.mjs",{minWorkers:"max",maxWorkers:concurrency,workerType:"thread"}),childPromises=[];for(let chunk of chunks(fps,CHUNK_SIZE))childPromises.push(pool.exec("parseFiles",[argv,chunk,ctx.allSlugs]));res=(await WorkerPromise.all(childPromises).catch(err=>{let errString=err.toString().slice(6);console.error(errString),process.exit(1)})).flat(),await pool.terminate()}return log.end(`Parsed ${res.length} Markdown files in ${perf.timeSince()}`),res}__name(parseMarkdown,"parseMarkdown");function filterContent(ctx,content){let{cfg,argv}=ctx,perf=new PerfTimer,initialLength=content.length;for(let plugin of cfg.plugins.filters){let updatedContent=content.filter(item=>plugin.shouldPublish(ctx,item));if(argv.verbose){let diff=content.filter(x=>!updatedContent.includes(x));for(let file of diff)console.log(`[filter:${plugin.name}] ${file[1].data.slug}`)}content=updatedContent}return console.log(`Filtered out ${initialLength-content.length} files in ${perf.timeSince()}`),content}__name(filterContent,"filterContent");import matter from"gray-matter";import remarkFrontmatter from"remark-frontmatter";import yaml from"js-yaml";import toml from"toml";var en_US_default={propertyDefaults:{title:"Untitled",description:"No description provided"},components:{callout:{note:"Note",abstract:"Abstract",info:"Info",todo:"Todo",tip:"Tip",success:"Success",question:"Question",warning:"Warning",failure:"Failure",danger:"Danger",bug:"Bug",example:"Example",quote:"Quote"},backlinks:{title:"Backlinks",noBacklinksFound:"No backlinks found"},themeToggle:{lightMode:"Light mode",darkMode:"Dark mode"},explorer:{title:"Explorer"},footer:{createdWith:"Created with"},graph:{title:"Graph View"},recentNotes:{title:"Recent Notes",seeRemainingMore:({remaining})=>`See ${remaining} more \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transclude of ${targetSlug}`,linkToOriginal:"Link to original"},search:{title:"Search",searchBarPlaceholder:"Search for something"},tableOfContents:{title:"Table of Contents"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"Recent notes",lastFewNotes:({count})=>`Last ${count} notes`},error:{title:"Not Found",notFound:"Either this page is private or doesn't exist."},folderContent:{folder:"Folder",itemsUnderFolder:({count})=>count===1?"1 item under this folder.":`${count} items under this folder.`},tagContent:{tag:"Tag",tagIndex:"Tag Index",itemsUnderTag:({count})=>count===1?"1 item with this tag.":`${count} items with this tag.`,showingFirst:({count})=>`Showing first ${count} tags.`,totalTags:({count})=>`Found ${count} total tags.`}}};var fr_FR_default={propertyDefaults:{title:"Sans titre",description:"Aucune description fournie"},components:{callout:{note:"Note",abstract:"R\xE9sum\xE9",info:"Info",todo:"\xC0 faire",tip:"Conseil",success:"Succ\xE8s",question:"Question",warning:"Avertissement",failure:"\xC9chec",danger:"Danger",bug:"Bogue",example:"Exemple",quote:"Citation"},backlinks:{title:"Liens retour",noBacklinksFound:"Aucun lien retour trouv\xE9"},themeToggle:{lightMode:"Mode clair",darkMode:"Mode sombre"},explorer:{title:"Explorateur"},footer:{createdWith:"Cr\xE9\xE9 avec"},graph:{title:"Vue Graphique"},recentNotes:{title:"Notes R\xE9centes",seeRemainingMore:({remaining})=>`Voir ${remaining} de plus \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transclusion de ${targetSlug}`,linkToOriginal:"Lien vers l'original"},search:{title:"Recherche",searchBarPlaceholder:"Rechercher quelque chose"},tableOfContents:{title:"Table des Mati\xE8res"},contentMeta:{readingTime:({minutes})=>`${minutes} min de lecture`}},pages:{rss:{recentNotes:"Notes r\xE9centes",lastFewNotes:({count})=>`Les derni\xE8res ${count} notes`},error:{title:"Introuvable",notFound:"Cette page est soit priv\xE9e, soit elle n'existe pas."},folderContent:{folder:"Dossier",itemsUnderFolder:({count})=>count===1?"1 \xE9l\xE9ment sous ce dossier.":`${count} \xE9l\xE9ments sous ce dossier.`},tagContent:{tag:"\xC9tiquette",tagIndex:"Index des \xE9tiquettes",itemsUnderTag:({count})=>count===1?"1 \xE9l\xE9ment avec cette \xE9tiquette.":`${count} \xE9l\xE9ments avec cette \xE9tiquette.`,showingFirst:({count})=>`Affichage des premi\xE8res ${count} \xE9tiquettes.`,totalTags:({count})=>`Trouv\xE9 ${count} \xE9tiquettes au total.`}}};var it_IT_default={propertyDefaults:{title:"Senza titolo",description:"Nessuna descrizione"},components:{callout:{note:"Nota",abstract:"Astratto",info:"Info",todo:"Da fare",tip:"Consiglio",success:"Completato",question:"Domanda",warning:"Attenzione",failure:"Errore",danger:"Pericolo",bug:"Bug",example:"Esempio",quote:"Citazione"},backlinks:{title:"Link entranti",noBacklinksFound:"Nessun link entrante"},themeToggle:{lightMode:"Tema chiaro",darkMode:"Tema scuro"},explorer:{title:"Esplora"},footer:{createdWith:"Creato con"},graph:{title:"Vista grafico"},recentNotes:{title:"Note recenti",seeRemainingMore:({remaining})=>`Vedi ${remaining} altro \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transclusione di ${targetSlug}`,linkToOriginal:"Link all'originale"},search:{title:"Cerca",searchBarPlaceholder:"Cerca qualcosa"},tableOfContents:{title:"Tabella dei contenuti"},contentMeta:{readingTime:({minutes})=>`${minutes} minuti`}},pages:{rss:{recentNotes:"Note recenti",lastFewNotes:({count})=>`Ultime ${count} note`},error:{title:"Non trovato",notFound:"Questa pagina \xE8 privata o non esiste."},folderContent:{folder:"Cartella",itemsUnderFolder:({count})=>count===1?"1 oggetto in questa cartella.":`${count} oggetti in questa cartella.`},tagContent:{tag:"Etichetta",tagIndex:"Indice etichette",itemsUnderTag:({count})=>count===1?"1 oggetto con questa etichetta.":`${count} oggetti con questa etichetta.`,showingFirst:({count})=>`Prime ${count} etichette.`,totalTags:({count})=>`Trovate ${count} etichette totali.`}}};var ja_JP_default={propertyDefaults:{title:"\u7121\u984C",description:"\u8AAC\u660E\u306A\u3057"},components:{callout:{note:"\u30CE\u30FC\u30C8",abstract:"\u6284\u9332",info:"\u60C5\u5831",todo:"\u3084\u308B\u3079\u304D\u3053\u3068",tip:"\u30D2\u30F3\u30C8",success:"\u6210\u529F",question:"\u8CEA\u554F",warning:"\u8B66\u544A",failure:"\u5931\u6557",danger:"\u5371\u967A",bug:"\u30D0\u30B0",example:"\u4F8B",quote:"\u5F15\u7528"},backlinks:{title:"\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF",noBacklinksFound:"\u30D0\u30C3\u30AF\u30EA\u30F3\u30AF\u306F\u3042\u308A\u307E\u305B\u3093"},themeToggle:{lightMode:"\u30E9\u30A4\u30C8\u30E2\u30FC\u30C9",darkMode:"\u30C0\u30FC\u30AF\u30E2\u30FC\u30C9"},explorer:{title:"\u30A8\u30AF\u30B9\u30D7\u30ED\u30FC\u30E9\u30FC"},footer:{createdWith:"\u4F5C\u6210"},graph:{title:"\u30B0\u30E9\u30D5\u30D3\u30E5\u30FC"},recentNotes:{title:"\u6700\u8FD1\u306E\u8A18\u4E8B",seeRemainingMore:({remaining})=>`\u3055\u3089\u306B${remaining}\u4EF6 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`${targetSlug}\u306E\u307E\u3068\u3081`,linkToOriginal:"\u5143\u8A18\u4E8B\u3078\u306E\u30EA\u30F3\u30AF"},search:{title:"\u691C\u7D22",searchBarPlaceholder:"\u691C\u7D22\u30EF\u30FC\u30C9\u3092\u5165\u529B"},tableOfContents:{title:"\u76EE\u6B21"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"\u6700\u8FD1\u306E\u8A18\u4E8B",lastFewNotes:({count})=>`\u6700\u65B0\u306E${count}\u4EF6`},error:{title:"Not Found",notFound:"\u30DA\u30FC\u30B8\u304C\u5B58\u5728\u3057\u306A\u3044\u304B\u3001\u975E\u516C\u958B\u8A2D\u5B9A\u306B\u306A\u3063\u3066\u3044\u307E\u3059\u3002"},folderContent:{folder:"\u30D5\u30A9\u30EB\u30C0",itemsUnderFolder:({count})=>`${count}\u4EF6\u306E\u30DA\u30FC\u30B8`},tagContent:{tag:"\u30BF\u30B0",tagIndex:"\u30BF\u30B0\u4E00\u89A7",itemsUnderTag:({count})=>`${count}\u4EF6\u306E\u30DA\u30FC\u30B8`,showingFirst:({count})=>`\u306E\u3046\u3061\u6700\u521D\u306E${count}\u4EF6\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059`,totalTags:({count})=>`\u5168${count}\u500B\u306E\u30BF\u30B0\u3092\u8868\u793A\u4E2D`}}};var de_DE_default={propertyDefaults:{title:"Unbenannt",description:"Keine Beschreibung angegeben"},components:{callout:{note:"Hinweis",abstract:"Zusammenfassung",info:"Info",todo:"Zu erledigen",tip:"Tipp",success:"Erfolg",question:"Frage",warning:"Warnung",failure:"Misserfolg",danger:"Gefahr",bug:"Fehler",example:"Beispiel",quote:"Zitat"},backlinks:{title:"Backlinks",noBacklinksFound:"Keine Backlinks gefunden"},themeToggle:{lightMode:"Light Mode",darkMode:"Dark Mode"},explorer:{title:"Explorer"},footer:{createdWith:"Erstellt mit"},graph:{title:"Graphansicht"},recentNotes:{title:"Zuletzt bearbeitete Seiten",seeRemainingMore:({remaining})=>`${remaining} weitere ansehen \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transklusion von ${targetSlug}`,linkToOriginal:"Link zum Original"},search:{title:"Suche",searchBarPlaceholder:"Suche nach etwas"},tableOfContents:{title:"Inhaltsverzeichnis"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"Zuletzt bearbeitete Seiten",lastFewNotes:({count})=>`Letzte ${count} Seiten`},error:{title:"Nicht gefunden",notFound:"Diese Seite ist entweder nicht \xF6ffentlich oder existiert nicht."},folderContent:{folder:"Ordner",itemsUnderFolder:({count})=>count===1?"1 Datei in diesem Ordner.":`${count} Dateien in diesem Ordner.`},tagContent:{tag:"Tag",tagIndex:"Tag-\xDCbersicht",itemsUnderTag:({count})=>count===1?"1 Datei mit diesem Tag.":`${count} Dateien mit diesem Tag.`,showingFirst:({count})=>`Die ersten ${count} Tags werden angezeigt.`,totalTags:({count})=>`${count} Tags insgesamt.`}}};var nl_NL_default={propertyDefaults:{title:"Naamloos",description:"Geen beschrijving gegeven."},components:{callout:{note:"Notitie",abstract:"Samenvatting",info:"Info",todo:"Te doen",tip:"Tip",success:"Succes",question:"Vraag",warning:"Waarschuwing",failure:"Mislukking",danger:"Gevaar",bug:"Bug",example:"Voorbeeld",quote:"Citaat"},backlinks:{title:"Backlinks",noBacklinksFound:"Geen backlinks gevonden"},themeToggle:{lightMode:"Lichte modus",darkMode:"Donkere modus"},explorer:{title:"Verkenner"},footer:{createdWith:"Gemaakt met"},graph:{title:"Grafiekweergave"},recentNotes:{title:"Recente notities",seeRemainingMore:({remaining})=>`Zie ${remaining} meer \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Invoeging van ${targetSlug}`,linkToOriginal:"Link naar origineel"},search:{title:"Zoeken",searchBarPlaceholder:"Doorzoek de website"},tableOfContents:{title:"Inhoudsopgave"},contentMeta:{readingTime:({minutes})=>minutes===1?"1 minuut leestijd":`${minutes} minuten leestijd`}},pages:{rss:{recentNotes:"Recente notities",lastFewNotes:({count})=>`Laatste ${count} notities`},error:{title:"Niet gevonden",notFound:"Deze pagina is niet zichtbaar of bestaat niet."},folderContent:{folder:"Map",itemsUnderFolder:({count})=>count===1?"1 item in deze map.":`${count} items in deze map.`},tagContent:{tag:"Label",tagIndex:"Label-index",itemsUnderTag:({count})=>count===1?"1 item met dit label.":`${count} items met dit label.`,showingFirst:({count})=>count===1?"Eerste label tonen.":`Eerste ${count} labels tonen.`,totalTags:({count})=>`${count} labels gevonden.`}}};var ro_RO_default={propertyDefaults:{title:"F\u0103r\u0103 titlu",description:"Nici o descriere furnizat\u0103"},components:{callout:{note:"Not\u0103",abstract:"Rezumat",info:"Informa\u021Bie",todo:"De f\u0103cut",tip:"Sfat",success:"Succes",question:"\xCEntrebare",warning:"Avertisment",failure:"E\u0219ec",danger:"Pericol",bug:"Bug",example:"Exemplu",quote:"Citat"},backlinks:{title:"Leg\u0103turi \xEEnapoi",noBacklinksFound:"Nu s-au g\u0103sit leg\u0103turi \xEEnapoi"},themeToggle:{lightMode:"Modul luminos",darkMode:"Modul \xEEntunecat"},explorer:{title:"Explorator"},footer:{createdWith:"Creat cu"},graph:{title:"Graf"},recentNotes:{title:"Noti\u021Be recente",seeRemainingMore:({remaining})=>`Vezi \xEEnc\u0103 ${remaining} \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Extras din ${targetSlug}`,linkToOriginal:"Leg\u0103tur\u0103 c\u0103tre original"},search:{title:"C\u0103utare",searchBarPlaceholder:"Introduce\u021Bi termenul de c\u0103utare..."},tableOfContents:{title:"Cuprins"},contentMeta:{readingTime:({minutes})=>minutes==1?"lectur\u0103 de 1 minut":`lectur\u0103 de ${minutes} minute`}},pages:{rss:{recentNotes:"Noti\u021Be recente",lastFewNotes:({count})=>`Ultimele ${count} noti\u021Be`},error:{title:"Pagina nu a fost g\u0103sit\u0103",notFound:"Fie aceast\u0103 pagin\u0103 este privat\u0103, fie nu exist\u0103."},folderContent:{folder:"Dosar",itemsUnderFolder:({count})=>count===1?"1 articol \xEEn acest dosar.":`${count} elemente \xEEn acest dosar.`},tagContent:{tag:"Etichet\u0103",tagIndex:"Indexul etichetelor",itemsUnderTag:({count})=>count===1?"1 articol cu aceast\u0103 etichet\u0103.":`${count} articole cu aceast\u0103 etichet\u0103.`,showingFirst:({count})=>`Se afi\u0219eaz\u0103 primele ${count} etichete.`,totalTags:({count})=>`Au fost g\u0103site ${count} etichete \xEEn total.`}}};var es_ES_default={propertyDefaults:{title:"Sin t\xEDtulo",description:"Sin descripci\xF3n"},components:{callout:{note:"Nota",abstract:"Resumen",info:"Informaci\xF3n",todo:"Por hacer",tip:"Consejo",success:"\xC9xito",question:"Pregunta",warning:"Advertencia",failure:"Fallo",danger:"Peligro",bug:"Error",example:"Ejemplo",quote:"Cita"},backlinks:{title:"Enlaces de Retroceso",noBacklinksFound:"No se han encontrado enlaces traseros"},themeToggle:{lightMode:"Modo claro",darkMode:"Modo oscuro"},explorer:{title:"Explorador"},footer:{createdWith:"Creado con"},graph:{title:"Vista Gr\xE1fica"},recentNotes:{title:"Notas Recientes",seeRemainingMore:({remaining})=>`Vea ${remaining} m\xE1s \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Transcluido de ${targetSlug}`,linkToOriginal:"Enlace al original"},search:{title:"Buscar",searchBarPlaceholder:"Busca algo"},tableOfContents:{title:"Tabla de Contenidos"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"Notas recientes",lastFewNotes:({count})=>`\xDAltim\xE1s ${count} notas`},error:{title:"No se encontr\xF3.",notFound:"Esta p\xE1gina es privada o no existe."},folderContent:{folder:"Carpeta",itemsUnderFolder:({count})=>count===1?"1 art\xEDculo en esta carpeta.":`${count} art\xEDculos en esta carpeta.`},tagContent:{tag:"Etiqueta",tagIndex:"\xCDndice de Etiquetas",itemsUnderTag:({count})=>count===1?"1 art\xEDculo con esta etiqueta.":`${count} art\xEDculos con esta etiqueta.`,showingFirst:({count})=>`Mostrando las primeras ${count} etiquetas.`,totalTags:({count})=>`Se encontraron ${count} etiquetas en total.`}}};var ar_SA_default={propertyDefaults:{title:"\u063A\u064A\u0631 \u0645\u0639\u0646\u0648\u0646",description:"\u0644\u0645 \u064A\u062A\u0645 \u062A\u0642\u062F\u064A\u0645 \u0623\u064A \u0648\u0635\u0641"},components:{callout:{note:"\u0645\u0644\u0627\u062D\u0638\u0629",abstract:"\u0645\u0644\u062E\u0635",info:"\u0645\u0639\u0644\u0648\u0645\u0627\u062A",todo:"\u0644\u0644\u0642\u064A\u0627\u0645",tip:"\u0646\u0635\u064A\u062D\u0629",success:"\u0646\u062C\u0627\u062D",question:"\u0633\u0624\u0627\u0644",warning:"\u062A\u062D\u0630\u064A\u0631",failure:"\u0641\u0634\u0644",danger:"\u062E\u0637\u0631",bug:"\u062E\u0644\u0644",example:"\u0645\u062B\u0627\u0644",quote:"\u0627\u0642\u062A\u0628\u0627\u0633"},backlinks:{title:"\u0648\u0635\u0644\u0627\u062A \u0627\u0644\u0639\u0648\u062F\u0629",noBacklinksFound:"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0644\u0627\u062A \u0639\u0648\u062F\u0629"},themeToggle:{lightMode:"\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0646\u0647\u0627\u0631\u064A",darkMode:"\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0644\u064A\u0644\u064A"},explorer:{title:"\u0627\u0644\u0645\u0633\u062A\u0639\u0631\u0636"},footer:{createdWith:"\u0623\u064F\u0646\u0634\u0626 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645"},graph:{title:"\u0627\u0644\u062A\u0645\u062B\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A"},recentNotes:{title:"\u0622\u062E\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",seeRemainingMore:({remaining})=>`\u062A\u0635\u0641\u062D ${remaining} \u0623\u0643\u062B\u0631 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u0645\u0642\u062A\u0628\u0633 \u0645\u0646 ${targetSlug}`,linkToOriginal:"\u0648\u0635\u0644\u0629 \u0644\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u0629"},search:{title:"\u0628\u062D\u062B",searchBarPlaceholder:"\u0627\u0628\u062D\u062B \u0639\u0646 \u0634\u064A\u0621 \u0645\u0627"},tableOfContents:{title:"\u0641\u0647\u0631\u0633 \u0627\u0644\u0645\u062D\u062A\u0648\u064A\u0627\u062A"},contentMeta:{readingTime:({minutes})=>minutes==1?"\u062F\u0642\u064A\u0642\u0629 \u0623\u0648 \u0623\u0642\u0644 \u0644\u0644\u0642\u0631\u0627\u0621\u0629":minutes==2?"\u062F\u0642\u064A\u0642\u062A\u0627\u0646 \u0644\u0644\u0642\u0631\u0627\u0621\u0629":`${minutes} \u062F\u0642\u0627\u0626\u0642 \u0644\u0644\u0642\u0631\u0627\u0621\u0629`}},pages:{rss:{recentNotes:"\u0622\u062E\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",lastFewNotes:({count})=>`\u0622\u062E\u0631 ${count} \u0645\u0644\u0627\u062D\u0638\u0629`},error:{title:"\u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F",notFound:"\u0625\u0645\u0627 \u0623\u0646 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u062E\u0627\u0635\u0629 \u0623\u0648 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629."},folderContent:{folder:"\u0645\u062C\u0644\u062F",itemsUnderFolder:({count})=>count===1?"\u064A\u0648\u062C\u062F \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0641\u0642\u0637 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0644\u062F":`\u064A\u0648\u062C\u062F ${count} \u0639\u0646\u0627\u0635\u0631 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0645\u062C\u0644\u062F.`},tagContent:{tag:"\u0627\u0644\u0648\u0633\u0645",tagIndex:"\u0645\u0624\u0634\u0631 \u0627\u0644\u0648\u0633\u0645",itemsUnderTag:({count})=>count===1?"\u064A\u0648\u062C\u062F \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0641\u0642\u0637 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0648\u0633\u0645":`\u064A\u0648\u062C\u062F ${count} \u0639\u0646\u0627\u0635\u0631 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0648\u0633\u0645.`,showingFirst:({count})=>`\u0625\u0638\u0647\u0627\u0631 \u0623\u0648\u0644 ${count} \u0623\u0648\u0633\u0645\u0629.`,totalTags:({count})=>`\u064A\u0648\u062C\u062F ${count} \u0623\u0648\u0633\u0645\u0629.`}}};var uk_UA_default={propertyDefaults:{title:"\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0438",description:"\u041E\u043F\u0438\u0441 \u043D\u0435 \u043D\u0430\u0434\u0430\u043D\u043E"},components:{callout:{note:"\u041F\u0440\u0438\u043C\u0456\u0442\u043A\u0430",abstract:"\u0410\u0431\u0441\u0442\u0440\u0430\u043A\u0442",info:"\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F",todo:"\u0417\u0430\u0432\u0434\u0430\u043D\u043D\u044F",tip:"\u041F\u043E\u0440\u0430\u0434\u0430",success:"\u0423\u0441\u043F\u0456\u0445",question:"\u041F\u0438\u0442\u0430\u043D\u043D\u044F",warning:"\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u0436\u0435\u043D\u043D\u044F",failure:"\u041D\u0435\u0432\u0434\u0430\u0447\u0430",danger:"\u041D\u0435\u0431\u0435\u0437\u043F\u0435\u043A\u0430",bug:"\u0411\u0430\u0433",example:"\u041F\u0440\u0438\u043A\u043B\u0430\u0434",quote:"\u0426\u0438\u0442\u0430\u0442\u0430"},backlinks:{title:"\u0417\u0432\u043E\u0440\u043E\u0442\u043D\u0456 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F",noBacklinksFound:"\u0417\u0432\u043E\u0440\u043E\u0442\u043D\u0438\u0445 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u044C \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E"},themeToggle:{lightMode:"\u0421\u0432\u0456\u0442\u043B\u0438\u0439 \u0440\u0435\u0436\u0438\u043C",darkMode:"\u0422\u0435\u043C\u043D\u0438\u0439 \u0440\u0435\u0436\u0438\u043C"},explorer:{title:"\u041F\u0440\u043E\u0432\u0456\u0434\u043D\u0438\u043A"},footer:{createdWith:"\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E \u0437\u0430 \u0434\u043E\u043F\u043E\u043C\u043E\u0433\u043E\u044E"},graph:{title:"\u0412\u0438\u0433\u043B\u044F\u0434 \u0433\u0440\u0430\u0444\u0430"},recentNotes:{title:"\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438",seeRemainingMore:({remaining})=>`\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0449\u0435 ${remaining} \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u0412\u0438\u0434\u043E\u0431\u0443\u0442\u043E \u0437 ${targetSlug}`,linkToOriginal:"\u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u043D\u0430 \u043E\u0440\u0438\u0433\u0456\u043D\u0430\u043B"},search:{title:"\u041F\u043E\u0448\u0443\u043A",searchBarPlaceholder:"\u0428\u0443\u043A\u0430\u0442\u0438 \u0449\u043E\u0441\u044C"},tableOfContents:{title:"\u0417\u043C\u0456\u0441\u0442"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438",lastFewNotes:({count})=>`\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438: ${count}`},error:{title:"\u041D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E",notFound:"\u0426\u044F \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0430 \u0430\u0431\u043E \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0430, \u0430\u0431\u043E \u043D\u0435 \u0456\u0441\u043D\u0443\u0454."},folderContent:{folder:"\u041F\u0430\u043F\u043A\u0430",itemsUnderFolder:({count})=>count===1?"\u0423 \u0446\u0456\u0439 \u043F\u0430\u043F\u0446\u0456 1 \u0435\u043B\u0435\u043C\u0435\u043D\u0442.":`\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432 \u0443 \u0446\u0456\u0439 \u043F\u0430\u043F\u0446\u0456: ${count}.`},tagContent:{tag:"\u0422\u0435\u0433",tagIndex:"\u0406\u043D\u0434\u0435\u043A\u0441 \u0442\u0435\u0433\u0443",itemsUnderTag:({count})=>count===1?"1 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 \u0437 \u0446\u0438\u043C \u0442\u0435\u0433\u043E\u043C.":`\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432 \u0437 \u0446\u0438\u043C \u0442\u0435\u0433\u043E\u043C: ${count}.`,showingFirst:({count})=>`\u041F\u043E\u043A\u0430\u0437 \u043F\u0435\u0440\u0448\u0438\u0445 ${count} \u0442\u0435\u0433\u0456\u0432.`,totalTags:({count})=>`\u0412\u0441\u044C\u043E\u0433\u043E \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0442\u0435\u0433\u0456\u0432: ${count}.`}}};var ru_RU_default={propertyDefaults:{title:"\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",description:"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"},components:{callout:{note:"\u0417\u0430\u043C\u0435\u0442\u043A\u0430",abstract:"\u0420\u0435\u0437\u044E\u043C\u0435",info:"\u0418\u043D\u0444\u043E",todo:"\u0421\u0434\u0435\u043B\u0430\u0442\u044C",tip:"\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430",success:"\u0423\u0441\u043F\u0435\u0445",question:"\u0412\u043E\u043F\u0440\u043E\u0441",warning:"\u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435",failure:"\u041D\u0435\u0443\u0434\u0430\u0447\u0430",danger:"\u041E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C",bug:"\u0411\u0430\u0433",example:"\u041F\u0440\u0438\u043C\u0435\u0440",quote:"\u0426\u0438\u0442\u0430\u0442\u0430"},backlinks:{title:"\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438",noBacklinksFound:"\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442"},themeToggle:{lightMode:"\u0421\u0432\u0435\u0442\u043B\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",darkMode:"\u0422\u0451\u043C\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C"},explorer:{title:"\u041F\u0440\u043E\u0432\u043E\u0434\u043D\u0438\u043A"},footer:{createdWith:"\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E"},graph:{title:"\u0412\u0438\u0434 \u0433\u0440\u0430\u0444\u0430"},recentNotes:{title:"\u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",seeRemainingMore:({remaining})=>`\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0441\u0442\u0430\u0432\u0448${getForm(remaining,"\u0443\u044E\u0441\u044F","\u0438\u0435\u0441\u044F","\u0438\u0435\u0441\u044F")} ${remaining} \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u0438\u0437 ${targetSlug}`,linkToOriginal:"\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B"},search:{title:"\u041F\u043E\u0438\u0441\u043A",searchBarPlaceholder:"\u041D\u0430\u0439\u0442\u0438 \u0447\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C"},tableOfContents:{title:"\u041E\u0433\u043B\u0430\u0432\u043B\u0435\u043D\u0438\u0435"},contentMeta:{readingTime:({minutes})=>`\u0432\u0440\u0435\u043C\u044F \u0447\u0442\u0435\u043D\u0438\u044F ~${minutes} \u043C\u0438\u043D.`}},pages:{rss:{recentNotes:"\u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",lastFewNotes:({count})=>`\u041F\u043E\u0441\u043B\u0435\u0434\u043D${getForm(count,"\u044F\u044F","\u0438\u0435","\u0438\u0435")} ${count} \u0437\u0430\u043C\u0435\u0442${getForm(count,"\u043A\u0430","\u043A\u0438","\u043E\u043A")}`},error:{title:"\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",notFound:"\u042D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0430\u044F \u0438\u043B\u0438 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"},folderContent:{folder:"\u041F\u0430\u043F\u043A\u0430",itemsUnderFolder:({count})=>`\u0432 \u044D\u0442\u043E\u0439 \u043F\u0430\u043F\u043A\u0435 ${count} \u044D\u043B\u0435\u043C\u0435\u043D\u0442${getForm(count,"","\u0430","\u043E\u0432")}`},tagContent:{tag:"\u0422\u0435\u0433",tagIndex:"\u0418\u043D\u0434\u0435\u043A\u0441 \u0442\u0435\u0433\u043E\u0432",itemsUnderTag:({count})=>`\u0441 \u044D\u0442\u0438\u043C \u0442\u0435\u0433\u043E\u043C ${count} \u044D\u043B\u0435\u043C\u0435\u043D\u0442${getForm(count,"","\u0430","\u043E\u0432")}`,showingFirst:({count})=>`\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430${getForm(count,"\u0435\u0442\u0441\u044F","\u044E\u0442\u0441\u044F","\u044E\u0442\u0441\u044F")} ${count} \u0442\u0435\u0433${getForm(count,"","\u0430","\u043E\u0432")}`,totalTags:({count})=>`\u0412\u0441\u0435\u0433\u043E ${count} \u0442\u0435\u0433${getForm(count,"","\u0430","\u043E\u0432")}`}}};function getForm(number,form1,form2,form5){let remainder100=number%100,remainder10=remainder100%10;return remainder100>=10&&remainder100<=20?form5:remainder10>1&&remainder10<5?form2:remainder10==1?form1:form5}__name(getForm,"getForm");var ko_KR_default={propertyDefaults:{title:"\uC81C\uBAA9 \uC5C6\uC74C",description:"\uC124\uBA85 \uC5C6\uC74C"},components:{callout:{note:"\uB178\uD2B8",abstract:"\uAC1C\uC694",info:"\uC815\uBCF4",todo:"\uD560\uC77C",tip:"\uD301",success:"\uC131\uACF5",question:"\uC9C8\uBB38",warning:"\uC8FC\uC758",failure:"\uC2E4\uD328",danger:"\uC704\uD5D8",bug:"\uBC84\uADF8",example:"\uC608\uC2DC",quote:"\uC778\uC6A9"},backlinks:{title:"\uBC31\uB9C1\uD06C",noBacklinksFound:"\uBC31\uB9C1\uD06C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."},themeToggle:{lightMode:"\uB77C\uC774\uD2B8 \uBAA8\uB4DC",darkMode:"\uB2E4\uD06C \uBAA8\uB4DC"},explorer:{title:"\uD0D0\uC0C9\uAE30"},footer:{createdWith:"Created with"},graph:{title:"\uADF8\uB798\uD504 \uBDF0"},recentNotes:{title:"\uCD5C\uADFC \uAC8C\uC2DC\uAE00",seeRemainingMore:({remaining})=>`${remaining}\uAC74 \uB354\uBCF4\uAE30 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`${targetSlug}\uC758 \uD3EC\uD568`,linkToOriginal:"\uC6D0\uBCF8 \uB9C1\uD06C"},search:{title:"\uAC80\uC0C9",searchBarPlaceholder:"\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694"},tableOfContents:{title:"\uBAA9\uCC28"},contentMeta:{readingTime:({minutes})=>`${minutes} min read`}},pages:{rss:{recentNotes:"\uCD5C\uADFC \uAC8C\uC2DC\uAE00",lastFewNotes:({count})=>`\uCD5C\uADFC ${count} \uAC74`},error:{title:"Not Found",notFound:"\uD398\uC774\uC9C0\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uAC70\uB098 \uBE44\uACF5\uAC1C \uC124\uC815\uC774 \uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4."},folderContent:{folder:"\uD3F4\uB354",itemsUnderFolder:({count})=>`${count}\uAC74\uC758 \uD56D\uBAA9`},tagContent:{tag:"\uD0DC\uADF8",tagIndex:"\uD0DC\uADF8 \uBAA9\uB85D",itemsUnderTag:({count})=>`${count}\uAC74\uC758 \uD56D\uBAA9`,showingFirst:({count})=>`\uCC98\uC74C ${count}\uAC1C\uC758 \uD0DC\uADF8`,totalTags:({count})=>`\uCD1D ${count}\uAC1C\uC758 \uD0DC\uADF8\uB97C \uCC3E\uC558\uC2B5\uB2C8\uB2E4.`}}};var zh_CN_default={propertyDefaults:{title:"\u65E0\u9898",description:"\u65E0\u63CF\u8FF0"},components:{callout:{note:"\u7B14\u8BB0",abstract:"\u6458\u8981",info:"\u63D0\u793A",todo:"\u5F85\u529E",tip:"\u63D0\u793A",success:"\u6210\u529F",question:"\u95EE\u9898",warning:"\u8B66\u544A",failure:"\u5931\u8D25",danger:"\u5371\u9669",bug:"\u9519\u8BEF",example:"\u793A\u4F8B",quote:"\u5F15\u7528"},backlinks:{title:"\u53CD\u5411\u94FE\u63A5",noBacklinksFound:"\u65E0\u6CD5\u627E\u5230\u53CD\u5411\u94FE\u63A5"},themeToggle:{lightMode:"\u4EAE\u8272\u6A21\u5F0F",darkMode:"\u6697\u8272\u6A21\u5F0F"},explorer:{title:"\u63A2\u7D22"},footer:{createdWith:"Created with"},graph:{title:"\u5173\u7CFB\u56FE\u8C31"},recentNotes:{title:"\u6700\u8FD1\u7684\u7B14\u8BB0",seeRemainingMore:({remaining})=>`\u67E5\u770B\u66F4\u591A${remaining}\u7BC7\u7B14\u8BB0 \u2192`},transcludes:{transcludeOf:({targetSlug})=>`\u5305\u542B${targetSlug}`,linkToOriginal:"\u6307\u5411\u539F\u59CB\u7B14\u8BB0\u7684\u94FE\u63A5"},search:{title:"\u641C\u7D22",searchBarPlaceholder:"\u641C\u7D22\u4E9B\u4EC0\u4E48"},tableOfContents:{title:"\u76EE\u5F55"},contentMeta:{readingTime:({minutes})=>`${minutes}\u5206\u949F\u9605\u8BFB`}},pages:{rss:{recentNotes:"\u6700\u8FD1\u7684\u7B14\u8BB0",lastFewNotes:({count})=>`\u6700\u8FD1\u7684${count}\u6761\u7B14\u8BB0`},error:{title:"\u65E0\u6CD5\u627E\u5230",notFound:"\u79C1\u6709\u7B14\u8BB0\u6216\u7B14\u8BB0\u4E0D\u5B58\u5728\u3002"},folderContent:{folder:"\u6587\u4EF6\u5939",itemsUnderFolder:({count})=>`\u6B64\u6587\u4EF6\u5939\u4E0B\u6709${count}\u6761\u7B14\u8BB0\u3002`},tagContent:{tag:"\u6807\u7B7E",tagIndex:"\u6807\u7B7E\u7D22\u5F15",itemsUnderTag:({count})=>`\u6B64\u6807\u7B7E\u4E0B\u6709${count}\u6761\u7B14\u8BB0\u3002`,showingFirst:({count})=>`\u663E\u793A\u524D${count}\u4E2A\u6807\u7B7E\u3002`,totalTags:({count})=>`\u603B\u5171\u6709${count}\u4E2A\u6807\u7B7E\u3002`}}};var vi_VN_default={propertyDefaults:{title:"Kh\xF4ng c\xF3 ti\xEAu \u0111\u1EC1",description:"Kh\xF4ng c\xF3 m\xF4 t\u1EA3 \u0111\u01B0\u1EE3c cung c\u1EA5p"},components:{callout:{note:"Ghi Ch\xFA",abstract:"T\xF3m T\u1EAFt",info:"Th\xF4ng tin",todo:"C\u1EA7n L\xE0m",tip:"G\u1EE3i \xDD",success:"Th\xE0nh C\xF4ng",question:"Nghi V\u1EA5n",warning:"C\u1EA3nh B\xE1o",failure:"Th\u1EA5t B\u1EA1i",danger:"Nguy Hi\u1EC3m",bug:"L\u1ED7i",example:"V\xED D\u1EE5",quote:"Tr\xEDch D\u1EABn"},backlinks:{title:"Li\xEAn K\u1EBFt Ng\u01B0\u1EE3c",noBacklinksFound:"Kh\xF4ng c\xF3 li\xEAn k\u1EBFt ng\u01B0\u1EE3c \u0111\u01B0\u1EE3c t\xECm th\u1EA5y"},themeToggle:{lightMode:"S\xE1ng",darkMode:"T\u1ED1i"},explorer:{title:"Trong b\xE0i n\xE0y"},footer:{createdWith:"\u0110\u01B0\u1EE3c t\u1EA1o b\u1EDFi"},graph:{title:"Bi\u1EC3u \u0110\u1ED3"},recentNotes:{title:"B\xE0i vi\u1EBFt g\u1EA7n \u0111\xE2y",seeRemainingMore:({remaining})=>`Xem ${remaining} th\xEAm \u2192`},transcludes:{transcludeOf:({targetSlug})=>`Bao g\u1ED3m ${targetSlug}`,linkToOriginal:"Li\xEAn K\u1EBFt G\u1ED1c"},search:{title:"T\xECm Ki\u1EBFm",searchBarPlaceholder:"T\xECm ki\u1EBFm th\xF4ng tin"},tableOfContents:{title:"B\u1EA3ng N\u1ED9i Dung"},contentMeta:{readingTime:({minutes})=>`\u0111\u1ECDc ${minutes} ph\xFAt`}},pages:{rss:{recentNotes:"Nh\u1EEFng b\xE0i g\u1EA7n \u0111\xE2y",lastFewNotes:({count})=>`${count} B\xE0i g\u1EA7n \u0111\xE2y`},error:{title:"Kh\xF4ng T\xECm Th\u1EA5y",notFound:"Trang n\xE0y \u0111\u01B0\u1EE3c b\u1EA3o m\u1EADt ho\u1EB7c kh\xF4ng t\u1ED3n t\u1EA1i."},folderContent:{folder:"Th\u01B0 M\u1EE5c",itemsUnderFolder:({count})=>count===1?"1 m\u1EE5c trong th\u01B0 m\u1EE5c n\xE0y.":`${count} m\u1EE5c trong th\u01B0 m\u1EE5c n\xE0y.`},tagContent:{tag:"Th\u1EBB",tagIndex:"Th\u1EBB M\u1EE5c L\u1EE5c",itemsUnderTag:({count})=>count===1?"1 m\u1EE5c g\u1EAFn th\u1EBB n\xE0y.":`${count} m\u1EE5c g\u1EAFn th\u1EBB n\xE0y.`,showingFirst:({count})=>`Hi\u1EC3n th\u1ECB tr\u01B0\u1EDBc ${count} th\u1EBB.`,totalTags:({count})=>`T\xECm th\u1EA5y ${count} th\u1EBB t\u1ED5ng c\u1ED9ng.`}}};var TRANSLATIONS={"en-US":en_US_default,"fr-FR":fr_FR_default,"it-IT":it_IT_default,"ja-JP":ja_JP_default,"de-DE":de_DE_default,"nl-NL":nl_NL_default,"nl-BE":nl_NL_default,"ro-RO":ro_RO_default,"ro-MD":ro_RO_default,"es-ES":es_ES_default,"ar-SA":ar_SA_default,"ar-AE":ar_SA_default,"ar-QA":ar_SA_default,"ar-BH":ar_SA_default,"ar-KW":ar_SA_default,"ar-OM":ar_SA_default,"ar-YE":ar_SA_default,"ar-IR":ar_SA_default,"ar-SY":ar_SA_default,"ar-IQ":ar_SA_default,"ar-JO":ar_SA_default,"ar-PL":ar_SA_default,"ar-LB":ar_SA_default,"ar-EG":ar_SA_default,"ar-SD":ar_SA_default,"ar-LY":ar_SA_default,"ar-MA":ar_SA_default,"ar-TN":ar_SA_default,"ar-DZ":ar_SA_default,"ar-MR":ar_SA_default,"uk-UA":uk_UA_default,"ru-RU":ru_RU_default,"ko-KR":ko_KR_default,"zh-CN":zh_CN_default,"vi-VN":vi_VN_default},defaultTranslation="en-US",i18n=__name(locale=>TRANSLATIONS[locale??defaultTranslation],"i18n");var defaultOptions={delimiters:"---",language:"yaml"};function coalesceAliases(data,aliases){for(let alias of aliases)if(data[alias]!==void 0&&data[alias]!==null)return data[alias]}__name(coalesceAliases,"coalesceAliases");function coerceToArray(input){if(input!=null)return Array.isArray(input)||(input=input.toString().split(",").map(tag=>tag.trim())),input.filter(tag=>typeof tag=="string"||typeof tag=="number").map(tag=>tag.toString())}__name(coerceToArray,"coerceToArray");var FrontMatter=__name(userOpts=>{let opts={...defaultOptions,...userOpts};return{name:"FrontMatter",markdownPlugins({cfg}){return[[remarkFrontmatter,["yaml","toml"]],()=>(_,file)=>{let{data}=matter(Buffer.from(file.value),{...opts,engines:{yaml:s=>yaml.load(s,{schema:yaml.JSON_SCHEMA}),toml:s=>toml.parse(s)}});data.title!=null&&data.title.toString()!==""?data.title=data.title.toString():data.title=file.stem??i18n(cfg.configuration.locale).propertyDefaults.title;let tags=coerceToArray(coalesceAliases(data,["tags","tag"]));tags&&(data.tags=[...new Set(tags.map(tag=>slugTag(tag)))]);let aliases=coerceToArray(coalesceAliases(data,["aliases","alias"]));aliases&&(data.aliases=aliases);let cssclasses=coerceToArray(coalesceAliases(data,["cssclasses","cssclass"]));cssclasses&&(data.cssclasses=cssclasses),file.data.frontmatter=data}]}}},"FrontMatter");import remarkGfm from"remark-gfm";import smartypants from"remark-smartypants";import rehypeSlug from"rehype-slug";import rehypeAutolinkHeadings from"rehype-autolink-headings";var defaultOptions2={enableSmartyPants:!0,linkHeadings:!0},GitHubFlavoredMarkdown=__name(userOpts=>{let opts={...defaultOptions2,...userOpts};return{name:"GitHubFlavoredMarkdown",markdownPlugins(){return opts.enableSmartyPants?[remarkGfm,smartypants]:[remarkGfm]},htmlPlugins(){return opts.linkHeadings?[rehypeSlug,[rehypeAutolinkHeadings,{behavior:"append",properties:{role:"anchor",ariaHidden:!0,tabIndex:-1,"data-no-popover":!0},content:{type:"element",tagName:"svg",properties:{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},children:[{type:"element",tagName:"path",properties:{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"},children:[]},{type:"element",tagName:"path",properties:{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"},children:[]}]}}]]:[]}}},"GitHubFlavoredMarkdown");import rehypeCitation from"rehype-citation";import{visit}from"unist-util-visit";import fs from"fs";import path2 from"path";import{Repository}from"@napi-rs/simple-git";import chalk3 from"chalk";var defaultOptions3={priority:["frontmatter","git","filesystem"]};function coerceDate(fp,d){let dt=new Date(d),invalidDate=isNaN(dt.getTime())||dt.getTime()===0;return invalidDate&&d!==void 0&&console.log(chalk3.yellow(`
Warning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`)),invalidDate?new Date:dt}__name(coerceDate,"coerceDate");var CreatedModifiedDate=__name(userOpts=>{let opts={...defaultOptions3,...userOpts};return{name:"CreatedModifiedDate",markdownPlugins(){return[()=>{let repo;return async(_tree,file)=>{let created,modified,published,fp=file.data.filePath,fullFp=path2.isAbsolute(fp)?fp:path2.posix.join(file.cwd,fp);for(let source of opts.priority)if(source==="filesystem"){let st=await fs.promises.stat(fullFp);created||=st.birthtimeMs,modified||=st.mtimeMs}else if(source==="frontmatter"&&file.data.frontmatter)created||=file.data.frontmatter.date,modified||=file.data.frontmatter.lastmod,modified||=file.data.frontmatter.updated,modified||=file.data.frontmatter["last-modified"],published||=file.data.frontmatter.publishDate;else if(source==="git"){repo||(repo=Repository.discover(file.cwd));try{modified||=await repo.getFileLatestModifiedDateAsync(file.data.filePath)}catch{console.log(chalk3.yellow(`
Warning: ${file.data.filePath} isn't yet tracked by git, last modification date is not available for this file`))}}file.data.dates={created:coerceDate(fp,created),modified:coerceDate(fp,modified),published:coerceDate(fp,published)}}}]}}},"CreatedModifiedDate");import remarkMath from"remark-math";import rehypeKatex from"rehype-katex";import rehypeMathjax from"rehype-mathjax/svg";var Latex=__name(opts=>{let engine=opts?.renderEngine??"katex";return{name:"Latex",markdownPlugins(){return[remarkMath]},htmlPlugins(){return engine==="katex"?[[rehypeKatex,{output:"html"}]]:[rehypeMathjax]},externalResources(){return engine==="katex"?{css:["https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css"],js:[{src:"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/copy-tex.min.js",loadTime:"afterDOMReady",contentType:"external"}]}:{}}}},"Latex");import{toString}from"hast-util-to-string";var escapeHTML=__name(unsafe=>unsafe.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),"escapeHTML");var defaultOptions4={descriptionLength:150,replaceExternalLinks:!0},urlRegex=new RegExp(/(https?:\/\/)?(?<domain>([\da-z\.-]+)\.([a-z\.]{2,6})(:\d+)?)(?<path>[\/\w\.-]*)(\?[\/\w\.=&;-]*)?/,"g"),Description=__name(userOpts=>{let opts={...defaultOptions4,...userOpts};return{name:"Description",htmlPlugins(){return[()=>async(tree,file)=>{let frontMatterDescription=file.data.frontmatter?.description,text=escapeHTML(toString(tree));opts.replaceExternalLinks&&(frontMatterDescription=frontMatterDescription?.replace(urlRegex,"$<domain>$<path>"),text=text.replace(urlRegex,"$<domain>$<path>"));let sentences=(frontMatterDescription??text).replace(/\s+/g," ").split(/\.\s/),finalDesc=[],len=opts.descriptionLength,sentenceIdx=0,currentDescriptionLength=0;if(sentences[0]!==void 0&&sentences[0].length>=len){let firstSentence=sentences[0].split(" ");for(;currentDescriptionLength<len;){let sentence=firstSentence[sentenceIdx];if(!sentence)break;finalDesc.push(sentence),currentDescriptionLength+=sentence.length,sentenceIdx++}finalDesc.push("...")}else for(;currentDescriptionLength<len;){let sentence=sentences[sentenceIdx];if(!sentence)break;let currentSentence=sentence.endsWith(".")?sentence:sentence+".";finalDesc.push(currentSentence),currentDescriptionLength+=currentSentence.length,sentenceIdx++}file.data.description=finalDesc.join(" "),file.data.text=text}]}}},"Description");import path3 from"path";import{visit as visit2}from"unist-util-visit";import isAbsoluteUrl from"is-absolute-url";var defaultOptions5={markdownLinkResolution:"absolute",prettyLinks:!0,openLinksInNewTab:!1,lazyLoad:!1,externalLinkIcon:!0},CrawlLinks=__name(userOpts=>{let opts={...defaultOptions5,...userOpts};return{name:"LinkProcessing",htmlPlugins(ctx){return[()=>(tree,file)=>{let curSlug=simplifySlug(file.data.slug),outgoing=new Set,transformOptions={strategy:opts.markdownLinkResolution,allSlugs:ctx.allSlugs};visit2(tree,"element",(node,_index,_parent)=>{if(node.tagName==="a"&&node.properties&&typeof node.properties.href=="string"){let dest=node.properties.href,classes=node.properties.className??[],isExternal=isAbsoluteUrl(dest);classes.push(isExternal?"external":"internal"),isExternal&&opts.externalLinkIcon&&node.children.push({type:"element",tagName:"svg",properties:{class:"external-icon",viewBox:"0 0 512 512"},children:[{type:"element",tagName:"path",properties:{d:"M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z"},children:[]}]}),node.children.length===1&&node.children[0].type==="text"&&node.children[0].value!==dest&&classes.push("alias"),node.properties.className=classes,opts.openLinksInNewTab&&(node.properties.target="_blank");let isInternal=!(isAbsoluteUrl(dest)||dest.startsWith("#"));if(isInternal){dest=node.properties.href=transformLink(file.data.slug,dest,transformOptions);let canonicalDest=new URL(dest,"https://base.com/"+stripSlashes(curSlug,!0)).pathname,[destCanonical,_destAnchor]=splitAnchor(canonicalDest);destCanonical.endsWith("/")&&(destCanonical+="index");let full=decodeURIComponent(stripSlashes(destCanonical,!0)),simple=simplifySlug(full);outgoing.add(simple),node.properties["data-slug"]=full}opts.prettyLinks&&isInternal&&node.children.length===1&&node.children[0].type==="text"&&!node.children[0].value.startsWith("#")&&(node.children[0].value=path3.basename(node.children[0].value))}if(["img","video","audio","iframe"].includes(node.tagName)&&node.properties&&typeof node.properties.src=="string"&&(opts.lazyLoad&&(node.properties.loading="lazy"),!isAbsoluteUrl(node.properties.src))){let dest=node.properties.src;dest=node.properties.src=transformLink(file.data.slug,dest,transformOptions),node.properties.src=dest}}),file.data.links=[...outgoing]}]}}},"CrawlLinks");import{findAndReplace as mdastFindReplace}from"mdast-util-find-and-replace";import{slug as slugAnchor2}from"github-slugger";import rehypeRaw from"rehype-raw";import{SKIP,visit as visit3}from"unist-util-visit";import path4 from"path";var callout_inline_default=`function c(){let t=this.parentElement;t.classList.toggle("is-collapsed");let l=t.classList.contains("is-collapsed")?this.scrollHeight:t.scrollHeight;t.style.maxHeight=l+"px";let o=t,e=t.parentElement;for(;e;){if(!e.classList.contains("callout"))return;let n=e.classList.contains("is-collapsed")?e.scrollHeight:e.scrollHeight+o.scrollHeight;e.style.maxHeight=n+"px",o=e,e=e.parentElement}}function i(){let t=document.getElementsByClassName("callout is-collapsible");for(let s of t){let l=s.firstElementChild;if(l){l.addEventListener("click",c),window.addCleanup(()=>l.removeEventListener("click",c));let e=s.classList.contains("is-collapsed")?l.scrollHeight:s.scrollHeight;s.style.maxHeight=e+"px"}}}document.addEventListener("nav",i);window.addEventListener("resize",i);
`;var checkbox_inline_default='var h=Object.create;var f=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var x=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var v=(n,t,E,A)=>{if(t&&typeof t=="object"||typeof t=="function")for(let F of d(t))!y.call(n,F)&&F!==E&&f(n,F,{get:()=>t[F],enumerable:!(A=m(t,F))||A.enumerable});return n};var w=(n,t,E)=>(E=n!=null?h(S(n)):{},v(t||!n||!n.__esModule?f(E,"default",{value:n,enumerable:!0}):E,n));var c=x((T,B)=>{"use strict";B.exports=b;function a(n){return n instanceof Buffer?Buffer.from(n):new n.constructor(n.buffer.slice(),n.byteOffset,n.length)}function b(n){if(n=n||{},n.circles)return R(n);return n.proto?A:E;function t(F,r){for(var u=Object.keys(F),D=new Array(u.length),i=0;i<u.length;i++){var e=u[i],l=F[e];typeof l!="object"||l===null?D[e]=l:l instanceof Date?D[e]=new Date(l):ArrayBuffer.isView(l)?D[e]=a(l):D[e]=r(l)}return D}function E(F){if(typeof F!="object"||F===null)return F;if(F instanceof Date)return new Date(F);if(Array.isArray(F))return t(F,E);if(F instanceof Map)return new Map(t(Array.from(F),E));if(F instanceof Set)return new Set(t(Array.from(F),E));var r={};for(var u in F)if(Object.hasOwnProperty.call(F,u)!==!1){var D=F[u];typeof D!="object"||D===null?r[u]=D:D instanceof Date?r[u]=new Date(D):D instanceof Map?r[u]=new Map(t(Array.from(D),E)):D instanceof Set?r[u]=new Set(t(Array.from(D),E)):ArrayBuffer.isView(D)?r[u]=a(D):r[u]=E(D)}return r}function A(F){if(typeof F!="object"||F===null)return F;if(F instanceof Date)return new Date(F);if(Array.isArray(F))return t(F,A);if(F instanceof Map)return new Map(t(Array.from(F),A));if(F instanceof Set)return new Set(t(Array.from(F),A));var r={};for(var u in F){var D=F[u];typeof D!="object"||D===null?r[u]=D:D instanceof Date?r[u]=new Date(D):D instanceof Map?r[u]=new Map(t(Array.from(D),A)):D instanceof Set?r[u]=new Set(t(Array.from(D),A)):ArrayBuffer.isView(D)?r[u]=a(D):r[u]=A(D)}return r}}function R(n){var t=[],E=[];return n.proto?r:F;function A(u,D){for(var i=Object.keys(u),e=new Array(i.length),l=0;l<i.length;l++){var s=i[l],C=u[s];if(typeof C!="object"||C===null)e[s]=C;else if(C instanceof Date)e[s]=new Date(C);else if(ArrayBuffer.isView(C))e[s]=a(C);else{var o=t.indexOf(C);o!==-1?e[s]=E[o]:e[s]=D(C)}}return e}function F(u){if(typeof u!="object"||u===null)return u;if(u instanceof Date)return new Date(u);if(Array.isArray(u))return A(u,F);if(u instanceof Map)return new Map(A(Array.from(u),F));if(u instanceof Set)return new Set(A(Array.from(u),F));var D={};t.push(u),E.push(D);for(var i in u)if(Object.hasOwnProperty.call(u,i)!==!1){var e=u[i];if(typeof e!="object"||e===null)D[i]=e;else if(e instanceof Date)D[i]=new Date(e);else if(e instanceof Map)D[i]=new Map(A(Array.from(e),F));else if(e instanceof Set)D[i]=new Set(A(Array.from(e),F));else if(ArrayBuffer.isView(e))D[i]=a(e);else{var l=t.indexOf(e);l!==-1?D[i]=E[l]:D[i]=F(e)}}return t.pop(),E.pop(),D}function r(u){if(typeof u!="object"||u===null)return u;if(u instanceof Date)return new Date(u);if(Array.isArray(u))return A(u,r);if(u instanceof Map)return new Map(A(Array.from(u),r));if(u instanceof Set)return new Set(A(Array.from(u),r));var D={};t.push(u),E.push(D);for(var i in u){var e=u[i];if(typeof e!="object"||e===null)D[i]=e;else if(e instanceof Date)D[i]=new Date(e);else if(e instanceof Map)D[i]=new Map(A(Array.from(e),r));else if(e instanceof Set)D[i]=new Set(A(Array.from(e),r));else if(ArrayBuffer.isView(e))D[i]=a(e);else{var l=t.indexOf(e);l!==-1?D[i]=E[l]:D[i]=r(e)}}return t.pop(),E.pop(),D}}});var P=Object.hasOwnProperty;var g=w(c(),1),I=(0,g.default)();function p(n){return n.document.body.dataset.slug}var L=n=>`${p(window)}-checkbox-${n}`;document.addEventListener("nav",()=>{document.querySelectorAll("input.checkbox-toggle").forEach((t,E)=>{let A=L(E),F=r=>{let u=r.target?.checked?"true":"false";localStorage.setItem(A,u)};t.addEventListener("change",F),window.addCleanup(()=>t.removeEventListener("change",F)),localStorage.getItem(A)==="true"&&(t.checked=!0)})});\n';import{toHast}from"mdast-util-to-hast";import{toHtml}from"hast-util-to-html";function capitalize(s){return s.substring(0,1).toUpperCase()+s.substring(1)}__name(capitalize,"capitalize");function classNames(displayClass,...classes){return displayClass&&classes.push(displayClass),classes.join(" ")}__name(classNames,"classNames");var defaultOptions6={comments:!0,highlight:!0,wikilinks:!0,callouts:!0,mermaid:!0,parseTags:!0,parseArrows:!0,parseBlockReferences:!0,enableInHtmlEmbed:!1,enableYouTubeEmbed:!0,enableVideoEmbed:!0,enableCheckbox:!1},calloutMapping={note:"note",abstract:"abstract",summary:"abstract",tldr:"abstract",info:"info",todo:"todo",tip:"tip",hint:"tip",important:"tip",success:"success",check:"success",done:"success",question:"question",help:"question",faq:"question",warning:"warning",attention:"warning",caution:"warning",failure:"failure",missing:"failure",fail:"failure",danger:"danger",error:"danger",bug:"bug",example:"example",quote:"quote",cite:"quote"},arrowMapping={"->":"&rarr;","-->":"&rArr;","=>":"&rArr;","==>":"&rArr;","<-":"&larr;","<--":"&lArr;","<=":"&lArr;","<==":"&lArr;"};function canonicalizeCallout(calloutName){let normalizedCallout=calloutName.toLowerCase();return calloutMapping[normalizedCallout]??calloutName}__name(canonicalizeCallout,"canonicalizeCallout");var externalLinkRegex=/^https?:\/\//i,arrowRegex=new RegExp(/(-{1,2}>|={1,2}>|<-{1,2}|<={1,2})/,"g"),wikilinkRegex=new RegExp(/!?\[\[([^\[\]\|\#\\]+)?(#+[^\[\]\|\#\\]+)?(\\?\|[^\[\]\#]+)?\]\]/,"g"),tableRegex=new RegExp(/^\|([^\n])+\|\n(\|)( ?:?-{3,}:? ?\|)+\n(\|([^\n])+\|\n?)+/,"gm"),tableWikilinkRegex=new RegExp(/(!?\[\[[^\]]*?\]\])/,"g"),highlightRegex=new RegExp(/==([^=]+)==/,"g"),commentRegex=new RegExp(/%%[\s\S]*?%%/,"g"),calloutRegex=new RegExp(/^\[\!(\w+)\]([+-]?)/),calloutLineRegex=new RegExp(/^> *\[\!\w+\][+-]?.*$/,"gm"),tagRegex=new RegExp(/(?:^| )#((?:[-_\p{L}\p{Emoji}\p{M}\d])+(?:\/[-_\p{L}\p{Emoji}\p{M}\d]+)*)/,"gu"),blockReferenceRegex=new RegExp(/\^([-_A-Za-z0-9]+)$/,"g"),ytLinkRegex=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,ytPlaylistLinkRegex=/[?&]list=([^#?&]*)/,videoExtensionRegex=new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/),wikilinkImageEmbedRegex=new RegExp(/^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/),ObsidianFlavoredMarkdown=__name(userOpts=>{let opts={...defaultOptions6,...userOpts},mdastToHtml=__name(ast=>{let hast=toHast(ast,{allowDangerousHtml:!0});return toHtml(hast,{allowDangerousHtml:!0})},"mdastToHtml");return{name:"ObsidianFlavoredMarkdown",textTransform(_ctx,src){return opts.comments&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(commentRegex,"")),opts.callouts&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(calloutLineRegex,value=>value+`
> `)),opts.wikilinks&&(src instanceof Buffer&&(src=src.toString()),src=src.replace(tableRegex,value=>value.replace(tableWikilinkRegex,(value2,...capture)=>{let[raw]=capture,escaped=raw??"";return escaped=escaped.replace("#","\\#"),escaped=escaped.replace("|","\\|"),escaped})),src=src.replace(wikilinkRegex,(value,...capture)=>{let[rawFp,rawHeader,rawAlias]=capture,fp=rawFp??"",anchor=rawHeader?.trim().replace(/^#+/,""),blockRef=anchor?.startsWith("^")?"^":"",displayAnchor=anchor?`#${blockRef}${slugAnchor2(anchor)}`:"",displayAlias=rawAlias??rawHeader?.replace("#","|")??"",embedDisplay=value.startsWith("!")?"!":"";return rawFp?.match(externalLinkRegex)?`${embedDisplay}[${displayAlias.replace(/^\|/,"")}](${rawFp})`:`${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`})),src},markdownPlugins(_ctx){let plugins=[];return plugins.push(()=>(tree,file)=>{let replacements=[],base=pathToRoot(file.data.slug);opts.wikilinks&&replacements.push([wikilinkRegex,(value,...capture)=>{let[rawFp,rawHeader,rawAlias]=capture,fp=rawFp?.trim()??"",anchor=rawHeader?.trim()??"",alias=rawAlias?.slice(1).trim();if(value.startsWith("!")){let ext=path4.extname(fp).toLowerCase(),url2=slugifyFilePath(fp);if([".png",".jpg",".jpeg",".gif",".bmp",".svg",".webp"].includes(ext)){let match=wikilinkImageEmbedRegex.exec(alias??""),alt=match?.groups?.alt??"",width=match?.groups?.width??"auto",height=match?.groups?.height??"auto";return{type:"image",url:url2,data:{hProperties:{width,height,alt}}}}else{if([".mp4",".webm",".ogv",".mov",".mkv"].includes(ext))return{type:"html",value:`<video src="${url2}" controls></video>`};if([".mp3",".webm",".wav",".m4a",".ogg",".3gp",".flac"].includes(ext))return{type:"html",value:`<audio src="${url2}" controls></audio>`};if([".pdf"].includes(ext))return{type:"html",value:`<iframe src="${url2}"></iframe>`};{let block=anchor;return{type:"html",data:{hProperties:{transclude:!0}},value:`<blockquote class="transclude" data-url="${url2}" data-block="${block}"><a href="${url2+anchor}" class="transclude-inner">Transclude of ${url2}${block}</a></blockquote>`}}}}return{type:"link",url:fp+anchor,children:[{type:"text",value:alias??fp}]}}]),opts.highlight&&replacements.push([highlightRegex,(_value,...capture)=>{let[inner]=capture;return{type:"html",value:`<span class="text-highlight">${inner}</span>`}}]),opts.parseArrows&&replacements.push([arrowRegex,(value,..._capture)=>{let maybeArrow=arrowMapping[value];return maybeArrow===void 0?SKIP:{type:"html",value:`<span>${maybeArrow}</span>`}}]),opts.parseTags&&replacements.push([tagRegex,(_value,tag)=>{if(/^\d+$/.test(tag))return!1;if(tag=slugTag(tag),file.data.frontmatter){let noteTags=file.data.frontmatter.tags??[];file.data.frontmatter.tags=[...new Set([...noteTags,tag])]}return{type:"link",url:base+`/tags/${tag}`,data:{hProperties:{className:["tag-link"]}},children:[{type:"text",value:tag}]}}]),opts.enableInHtmlEmbed&&visit3(tree,"html",node=>{for(let[regex,replace]of replacements)typeof replace=="string"?node.value=node.value.replace(regex,replace):node.value=node.value.replace(regex,(substring,...args)=>{let replaceValue=replace(substring,...args);return typeof replaceValue=="string"?replaceValue:Array.isArray(replaceValue)?replaceValue.map(mdastToHtml).join(""):typeof replaceValue=="object"&&replaceValue!==null?mdastToHtml(replaceValue):substring})}),mdastFindReplace(tree,replacements)}),opts.enableVideoEmbed&&plugins.push(()=>(tree,_file)=>{visit3(tree,"image",(node,index,parent)=>{if(parent&&index!=null&&videoExtensionRegex.test(node.url)){let newNode={type:"html",value:`<video controls src="${node.url}"></video>`};return parent.children.splice(index,1,newNode),SKIP}})}),opts.callouts&&plugins.push(()=>(tree,_file)=>{visit3(tree,"blockquote",node=>{if(node.children.length===0)return;let firstChild=node.children[0];if(firstChild.type!=="paragraph"||firstChild.children[0]?.type!=="text")return;let text=firstChild.children[0].value,restOfTitle=firstChild.children.slice(1),[firstLine,...remainingLines]=text.split(`
`),remainingText=remainingLines.join(`
`),match=firstLine.match(calloutRegex);if(match&&match.input){let[calloutDirective,typeString,collapseChar]=match,calloutType=canonicalizeCallout(typeString.toLowerCase()),collapse=collapseChar==="+"||collapseChar==="-",defaultState=collapseChar==="-"?"collapsed":"expanded",titleContent=match.input.slice(calloutDirective.length).trim(),titleNode={type:"paragraph",children:[{type:"text",value:titleContent===""&&restOfTitle.length===0?capitalize(typeString):titleContent+" "},...restOfTitle]},blockquoteContent=[{type:"html",value:`<div
                  class="callout-title"
                >
                  <div class="callout-icon"></div>
                  <div class="callout-title-inner">${mdastToHtml(titleNode)}</div>
                  ${collapse?'<div class="fold-callout-icon"></div>':""}
                </div>`}];remainingText.length>0&&blockquoteContent.push({type:"paragraph",children:[{type:"text",value:remainingText}]}),node.children.splice(0,1,...blockquoteContent);let classNames2=["callout",calloutType];collapse&&classNames2.push("is-collapsible"),defaultState==="collapsed"&&classNames2.push("is-collapsed"),node.data={hProperties:{...node.data?.hProperties??{},className:classNames2.join(" "),"data-callout":calloutType,"data-callout-fold":collapse}}}})}),opts.mermaid&&plugins.push(()=>(tree,_file)=>{visit3(tree,"code",node=>{node.lang==="mermaid"&&(node.data={hProperties:{className:["mermaid"]}})})}),plugins},htmlPlugins(){let plugins=[rehypeRaw];return opts.parseBlockReferences&&plugins.push(()=>{let inlineTagTypes=new Set(["p","li"]),blockTagTypes=new Set(["blockquote"]);return(tree,file)=>{file.data.blocks={},visit3(tree,"element",(node,index,parent)=>{if(blockTagTypes.has(node.tagName)){let nextChild=parent?.children.at(index+2);if(nextChild&&nextChild.tagName==="p"){let text=nextChild.children.at(0);if(text&&text.value&&text.type==="text"){let matches=text.value.match(blockReferenceRegex);if(matches&&matches.length>=1){parent.children.splice(index+2,1);let block=matches[0].slice(1);Object.keys(file.data.blocks).includes(block)||(node.properties={...node.properties,id:block},file.data.blocks[block]=node)}}}}else if(inlineTagTypes.has(node.tagName)){let last=node.children.at(-1);if(last&&last.value&&typeof last.value=="string"){let matches=last.value.match(blockReferenceRegex);if(matches&&matches.length>=1){last.value=last.value.slice(0,-matches[0].length);let block=matches[0].slice(1);if(last.value===""){let idx=(index??1)-1;for(;idx>=0;){let element=parent?.children.at(idx);if(!element)break;if(element.type!=="element")idx-=1;else{Object.keys(file.data.blocks).includes(block)||(element.properties={...element.properties,id:block},file.data.blocks[block]=element);return}}}else Object.keys(file.data.blocks).includes(block)||(node.properties={...node.properties,id:block},file.data.blocks[block]=node)}}}}),file.data.htmlAst=tree}}),opts.enableYouTubeEmbed&&plugins.push(()=>tree=>{visit3(tree,"element",node=>{if(node.tagName==="img"&&typeof node.properties.src=="string"){let match=node.properties.src.match(ytLinkRegex),videoId=match&&match[2].length==11?match[2]:null,playlistId=node.properties.src.match(ytPlaylistLinkRegex)?.[1];videoId?(node.tagName="iframe",node.properties={class:"external-embed",allow:"fullscreen",frameborder:0,width:"600px",height:"350px",src:playlistId?`https://www.youtube.com/embed/${videoId}?list=${playlistId}`:`https://www.youtube.com/embed/${videoId}`}):playlistId&&(node.tagName="iframe",node.properties={class:"external-embed",allow:"fullscreen",frameborder:0,width:"600px",height:"350px",src:`https://www.youtube.com/embed/videoseries?list=${playlistId}`})}})}),opts.enableCheckbox&&plugins.push(()=>(tree,_file)=>{visit3(tree,"element",node=>{if(node.tagName==="input"&&node.properties.type==="checkbox"){let isChecked=node.properties?.checked??!1;node.properties={type:"checkbox",disabled:!1,checked:isChecked,class:"checkbox-toggle"}}})}),plugins},externalResources(){let js=[];return opts.enableCheckbox&&js.push({script:checkbox_inline_default,loadTime:"afterDOMReady",contentType:"inline"}),opts.callouts&&js.push({script:callout_inline_default,loadTime:"afterDOMReady",contentType:"inline"}),opts.mermaid&&js.push({script:`
          let mermaidImport = undefined
          document.addEventListener('nav', async () => {
            if (document.querySelector("code.mermaid")) {
              mermaidImport ||= await import('https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.7.0/mermaid.esm.min.mjs')
              const mermaid = mermaidImport.default
              const darkMode = document.documentElement.getAttribute('saved-theme') === 'dark'
              mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'loose',
                theme: darkMode ? 'dark' : 'default'
              })

              await mermaid.run({
                querySelector: '.mermaid'
              })
            }
          });
          `,loadTime:"afterDOMReady",moduleType:"module",contentType:"inline"}),{js}}}},"ObsidianFlavoredMarkdown");var relrefRegex=new RegExp(/\[([^\]]+)\]\(\{\{< relref "([^"]+)" >\}\}\)/,"g"),predefinedHeadingIdRegex=new RegExp(/(.*) {#(?:.*)}/,"g"),hugoShortcodeRegex=new RegExp(/{{(.*)}}/,"g"),figureTagRegex=new RegExp(/< ?figure src="(.*)" ?>/,"g"),inlineLatexRegex=new RegExp(/\\\\\((.+?)\\\\\)/,"g"),blockLatexRegex=new RegExp(/(?:\\begin{equation}|\\\\\(|\\\\\[)([\s\S]*?)(?:\\\\\]|\\\\\)|\\end{equation})/,"g"),quartzLatexRegex=new RegExp(/\$\$[\s\S]*?\$\$|\$.*?\$/,"g");import rehypePrettyCode from"rehype-pretty-code";var defaultOptions7={theme:{light:"github-light",dark:"github-dark"},keepBackground:!1},SyntaxHighlighting=__name(userOpts=>{let opts={...defaultOptions7,...userOpts};return{name:"SyntaxHighlighting",htmlPlugins(){return[[rehypePrettyCode,opts]]}}},"SyntaxHighlighting");import{visit as visit4}from"unist-util-visit";import{toString as toString2}from"mdast-util-to-string";import Slugger from"github-slugger";var defaultOptions8={maxDepth:3,minEntries:1,showByDefault:!0,collapseByDefault:!1},slugAnchor3=new Slugger,TableOfContents=__name(userOpts=>{let opts={...defaultOptions8,...userOpts};return{name:"TableOfContents",markdownPlugins(){return[()=>async(tree,file)=>{if(file.data.frontmatter?.enableToc??opts.showByDefault){slugAnchor3.reset();let toc=[],highestDepth=opts.maxDepth;visit4(tree,"heading",node=>{if(node.depth<=opts.maxDepth){let text=toString2(node);highestDepth=Math.min(highestDepth,node.depth),toc.push({depth:node.depth,text,slug:slugAnchor3.slug(text)})}}),toc.length>0&&toc.length>opts.minEntries&&(file.data.toc=toc.map(entry=>({...entry,depth:entry.depth-highestDepth})),file.data.collapseToc=opts.collapseByDefault)}}]}}},"TableOfContents");import remarkBreaks from"remark-breaks";var RemoveDrafts=__name(()=>({name:"RemoveDrafts",shouldPublish(_ctx,[_tree,vfile]){return!(vfile.data?.frontmatter?.draft??!1)}}),"RemoveDrafts");import path7 from"path";import{visit as visit6}from"unist-util-visit";import{jsx}from"preact/jsx-runtime";var Header=__name(({children})=>children.length>0?jsx("header",{children}):null,"Header");Header.css=`
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
  gap: 1.5rem;
}

header h1 {
  margin: 0;
  flex: auto;
}
`;var Header_default=__name(()=>Header,"default");var clipboard_inline_default=`var r='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>',l='<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';document.addEventListener("nav",()=>{let n=document.getElementsByTagName("pre");for(let t=0;t<n.length;t++){let o=n[t].getElementsByTagName("code")[0];if(o){let a=function(){navigator.clipboard.writeText(i).then(()=>{e.blur(),e.innerHTML=l,setTimeout(()=>{e.innerHTML=r,e.style.borderColor=""},2e3)},d=>console.error(d))};var c=a;let i=o.innerText.replace(/\\n\\n/g,\`
\`),e=document.createElement("button");e.className="clipboard-button",e.type="button",e.innerHTML=r,e.ariaLabel="Copy source",e.addEventListener("click",a),window.addCleanup(()=>e.removeEventListener("click",a)),n[t].prepend(e)}}});
`;var clipboard_default=`.clipboard-button {
  position: absolute;
  display: flex;
  float: right;
  right: 0;
  padding: 0.4rem;
  margin: 0.3rem;
  color: var(--gray);
  border-color: var(--dark);
  background-color: var(--light);
  border: 1px solid;
  border-radius: 5px;
  opacity: 0;
  transition: 0.2s;
}
.clipboard-button > svg {
  fill: var(--light);
  filter: contrast(0.3);
}
.clipboard-button:hover {
  cursor: pointer;
  border-color: var(--secondary);
}
.clipboard-button:focus {
  outline: 0;
}

pre:hover > .clipboard-button {
  opacity: 1;
  transition: 0.2s;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiY2xpcGJvYXJkLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBOztBQUdGO0VBQ0U7OztBQUtGO0VBQ0U7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi5jbGlwYm9hcmQtYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbG9hdDogcmlnaHQ7XG4gIHJpZ2h0OiAwO1xuICBwYWRkaW5nOiAwLjRyZW07XG4gIG1hcmdpbjogMC4zcmVtO1xuICBjb2xvcjogdmFyKC0tZ3JheSk7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZGFyayk7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcbiAgYm9yZGVyOiAxcHggc29saWQ7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogMC4ycztcblxuICAmID4gc3ZnIHtcbiAgICBmaWxsOiB2YXIoLS1saWdodCk7XG4gICAgZmlsdGVyOiBjb250cmFzdCgwLjMpO1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgfVxuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IDA7XG4gIH1cbn1cblxucHJlIHtcbiAgJjpob3ZlciA+IC5jbGlwYm9hcmQtYnV0dG9uIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zaXRpb246IDAuMnM7XG4gIH1cbn1cbiJdfQ== */`;import{jsx as jsx2}from"preact/jsx-runtime";var Body=__name(({children})=>jsx2("div",{id:"quartz-body",children}),"Body");Body.afterDOMLoaded=clipboard_inline_default;Body.css=clipboard_default;var Body_default=__name(()=>Body,"default");import{render}from"preact-render-to-string";import{randomUUID}from"crypto";import{jsx as jsx3}from"preact/jsx-runtime";function JSResourceToScriptElement(resource,preserve){let scriptType=resource.moduleType??"application/javascript",spaPreserve=preserve??resource.spaPreserve;if(resource.contentType==="external")return jsx3("script",{src:resource.src,type:scriptType,"spa-preserve":spaPreserve},resource.src);{let content=resource.script;return jsx3("script",{type:scriptType,"spa-preserve":spaPreserve,dangerouslySetInnerHTML:{__html:content}},randomUUID())}}__name(JSResourceToScriptElement,"JSResourceToScriptElement");import{visit as visit5}from"unist-util-visit";import{jsx as jsx4,jsxs}from"preact/jsx-runtime";var headerRegex=new RegExp(/h[1-6]/);function pageResources(baseDir,staticResources){let contentIndexScript=`const fetchData = fetch("${joinSegments(baseDir,"static/contentIndex.json")}").then(data => data.json())`;return{css:[joinSegments(baseDir,"index.css"),...staticResources.css],js:[{src:joinSegments(baseDir,"prescript.js"),loadTime:"beforeDOMReady",contentType:"external"},{loadTime:"beforeDOMReady",contentType:"inline",spaPreserve:!0,script:contentIndexScript},...staticResources.js,{src:joinSegments(baseDir,"postscript.js"),loadTime:"afterDOMReady",moduleType:"module",contentType:"external"}]}}__name(pageResources,"pageResources");function renderPage(cfg,slug,componentData,components,pageResources2){let root=clone(componentData.tree);visit5(root,"element",(node,_index,_parent)=>{if(node.tagName==="blockquote"&&(node.properties?.className??[]).includes("transclude")){let inner=node.children[0],transcludeTarget=inner.properties["data-slug"],page=componentData.allFiles.find(f=>f.slug===transcludeTarget);if(!page)return;let blockRef=node.properties.dataBlock;if(blockRef?.startsWith("#^")){blockRef=blockRef.slice(2);let blockNode=page.blocks?.[blockRef];blockNode&&(blockNode.tagName==="li"&&(blockNode={type:"element",tagName:"ul",properties:{},children:[blockNode]}),node.children=[normalizeHastElement(blockNode,slug,transcludeTarget),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal","transclude-src"]},children:[{type:"text",value:i18n(cfg.locale).components.transcludes.linkToOriginal}]}])}else if(blockRef?.startsWith("#")&&page.htmlAst){blockRef=blockRef.slice(1);let startIdx,startDepth,endIdx;for(let[i,el]of page.htmlAst.children.entries()){if(!(el.type==="element"&&el.tagName.match(headerRegex)))continue;let depth=Number(el.tagName.substring(1));if(startIdx===void 0||startDepth===void 0)el.properties?.id===blockRef&&(startIdx=i,startDepth=depth);else if(depth<=startDepth){endIdx=i;break}}if(startIdx===void 0)return;node.children=[...page.htmlAst.children.slice(startIdx,endIdx).map(child=>normalizeHastElement(child,slug,transcludeTarget)),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal","transclude-src"]},children:[{type:"text",value:i18n(cfg.locale).components.transcludes.linkToOriginal}]}]}else page.htmlAst&&(node.children=[{type:"element",tagName:"h1",properties:{},children:[{type:"text",value:page.frontmatter?.title??i18n(cfg.locale).components.transcludes.transcludeOf({targetSlug:page.slug})}]},...page.htmlAst.children.map(child=>normalizeHastElement(child,slug,transcludeTarget)),{type:"element",tagName:"a",properties:{href:inner.properties?.href,class:["internal","transclude-src"]},children:[{type:"text",value:i18n(cfg.locale).components.transcludes.linkToOriginal}]}])}}),componentData.tree=root;let{head:Head,header,beforeBody,pageBody:Content2,left,right,footer:Footer}=components,Header2=Header_default(),Body2=Body_default(),LeftComponent=jsx4("div",{class:"left sidebar",children:left.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))}),RightComponent=jsx4("div",{class:"right sidebar",children:right.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))}),lang=componentData.fileData.frontmatter?.lang??cfg.locale?.split("-")[0]??"en",doc=jsxs("html",{lang,children:[jsx4(Head,{...componentData}),jsx4("body",{"data-slug":slug,children:jsxs("div",{id:"quartz-root",class:"page",children:[jsxs(Body2,{...componentData,children:[LeftComponent,jsxs("div",{class:"center",children:[jsxs("div",{class:"page-header",children:[jsx4(Header2,{...componentData,children:header.map(HeaderComponent=>jsx4(HeaderComponent,{...componentData}))}),jsx4("div",{class:"popover-hint",children:beforeBody.map(BodyComponent=>jsx4(BodyComponent,{...componentData}))})]}),jsx4(Content2,{...componentData})]}),RightComponent]}),jsx4(Footer,{...componentData})]})}),pageResources2.js.filter(resource=>resource.loadTime==="afterDOMReady").map(res=>JSResourceToScriptElement(res))]});return`<!DOCTYPE html>
`+render(doc)}__name(renderPage,"renderPage");import{toJsxRuntime}from"hast-util-to-jsx-runtime";import{Fragment,jsx as jsx5,jsxs as jsxs2}from"preact/jsx-runtime";import{jsx as jsx6}from"preact/jsx-runtime";var customComponents={table:props=>jsx6("div",{class:"table-container",children:jsx6("table",{...props})})};function htmlToJsx(fp,tree){try{return toJsxRuntime(tree,{Fragment,jsx:jsx5,jsxs:jsxs2,elementAttributeNameCase:"html",components:customComponents})}catch(e){trace(`Failed to parse Markdown in \`${fp}\` into JSX`,e)}}__name(htmlToJsx,"htmlToJsx");import{jsx as jsx7}from"preact/jsx-runtime";var Content=__name(({fileData,tree})=>{let content=htmlToJsx(fileData.filePath,tree),classString=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" ");return jsx7("article",{class:classString,children:content})},"Content"),Content_default=__name(()=>Content,"default");var listPage_default=`ul.section-ul {
  list-style: none;
  margin-top: 2em;
  padding-left: 0;
}

li.section-li {
  margin-bottom: 1em;
}
li.section-li > .section {
  display: grid;
  grid-template-columns: 6em 3fr 1fr;
}
@media all and (max-width: 600px) {
  li.section-li > .section > .tags {
    display: none;
  }
}
li.section-li > .section > .desc > h3 > a {
  background-color: transparent;
}
li.section-li > .section > .meta {
  margin: 0;
  flex-basis: 6em;
  opacity: 0.6;
}

.popover .section {
  grid-template-columns: 6em 1fr !important;
}
.popover .section > .tags {
  display: none;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsibGlzdFBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTs7QUFFQTtFQUNFO0VBQ0E7O0FBRUE7RUFDRTtJQUNFOzs7QUFJSjtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFNTjtFQUNFOztBQUNBO0VBQ0UiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlIFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcblxudWwuc2VjdGlvbi11bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbi10b3A6IDJlbTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuXG5saS5zZWN0aW9uLWxpIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xuXG4gICYgPiAuc2VjdGlvbiB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDZlbSAzZnIgMWZyO1xuXG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJG1vYmlsZUJyZWFrcG9pbnQpIHtcbiAgICAgICYgPiAudGFncyB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJiA+IC5kZXNjID4gaDMgPiBhIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cblxuICAgICYgPiAubWV0YSB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBmbGV4LWJhc2lzOiA2ZW07XG4gICAgICBvcGFjaXR5OiAwLjY7XG4gICAgfVxuICB9XG59XG5cbi8vIG1vZGlmaWNhdGlvbnMgaW4gcG9wb3ZlciBjb250ZXh0XG4ucG9wb3ZlciAuc2VjdGlvbiB7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNmVtIDFmciAhaW1wb3J0YW50O1xuICAmID4gLnRhZ3Mge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbiJdfQ== */`;import{Fragment as Fragment2,jsx as jsx8}from"preact/jsx-runtime";function getDate(cfg,data){if(!cfg.defaultDateType)throw new Error("Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.");return data.dates?.[cfg.defaultDateType]}__name(getDate,"getDate");function formatDate(d,locale="en-US"){return d.toLocaleDateString(locale,{year:"numeric",month:"short",day:"2-digit"})}__name(formatDate,"formatDate");function Date2({date,locale}){return jsx8(Fragment2,{children:formatDate(date,locale)})}__name(Date2,"Date");import{jsx as jsx9,jsxs as jsxs3}from"preact/jsx-runtime";function byDateAndAlphabetical(cfg){return(f1,f2)=>{if(f1.dates&&f2.dates)return getDate(cfg,f2).getTime()-getDate(cfg,f1).getTime();if(f1.dates&&!f2.dates)return-1;if(!f1.dates&&f2.dates)return 1;let f1Title=f1.frontmatter?.title.toLowerCase()??"",f2Title=f2.frontmatter?.title.toLowerCase()??"";return f1Title.localeCompare(f2Title)}}__name(byDateAndAlphabetical,"byDateAndAlphabetical");var PageList=__name(({cfg,fileData,allFiles,limit})=>{let list=allFiles.sort(byDateAndAlphabetical(cfg));return limit&&(list=list.slice(0,limit)),jsx9("ul",{class:"section-ul",children:list.map(page=>{let title=page.frontmatter?.title,tags=page.frontmatter?.tags??[];return jsx9("li",{class:"section-li",children:jsxs3("div",{class:"section",children:[page.dates&&jsx9("p",{class:"meta",children:jsx9(Date2,{date:getDate(cfg,page),locale:cfg.locale})}),jsx9("div",{class:"desc",children:jsx9("h3",{children:jsx9("a",{href:resolveRelative(fileData.slug,page.slug),class:"internal",children:title})})}),jsx9("ul",{class:"tags",children:tags.map(tag=>jsx9("li",{children:jsx9("a",{class:"internal tag-link",href:resolveRelative(fileData.slug,`tags/${tag}`),children:tag})}))})]})})})})},"PageList");PageList.css=`
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`;import{Fragment as Fragment3,jsx as jsx10,jsxs as jsxs4}from"preact/jsx-runtime";var numPages=10,TagContent=__name(props=>{let{tree,fileData,allFiles,cfg}=props,slug=fileData.slug;if(!(slug?.startsWith("tags/")||slug==="tags"))throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`);let tag=simplifySlug(slug.slice(5)),allPagesWithTag=__name(tag2=>allFiles.filter(file=>(file.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes).includes(tag2)),"allPagesWithTag"),content=tree.children.length===0?fileData.description:htmlToJsx(fileData.filePath,tree),classes=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" ");if(tag==="/"){let tags=[...new Set(allFiles.flatMap(data=>data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes))].sort((a,b)=>a.localeCompare(b)),tagItemMap=new Map;for(let tag2 of tags)tagItemMap.set(tag2,allPagesWithTag(tag2));return jsxs4("div",{class:classes,children:[jsx10("article",{children:jsx10("p",{children:content})}),jsx10("p",{children:i18n(cfg.locale).pages.tagContent.totalTags({count:tags.length})}),jsx10("div",{children:tags.map(tag2=>{let pages=tagItemMap.get(tag2),listProps={...props,allFiles:pages},contentPage=allFiles.filter(file=>file.slug===`tags/${tag2}`).at(0),root=contentPage?.htmlAst,content2=!root||root?.children.length===0?contentPage?.description:htmlToJsx(contentPage.filePath,root);return jsxs4("div",{children:[jsx10("h2",{children:jsx10("a",{class:"internal tag-link",href:`../tags/${tag2}`,children:tag2})}),content2&&jsx10("p",{children:content2}),jsxs4("div",{class:"page-listing",children:[jsxs4("p",{children:[i18n(cfg.locale).pages.tagContent.itemsUnderTag({count:pages.length}),pages.length>numPages&&jsxs4(Fragment3,{children:[" ",jsx10("span",{children:i18n(cfg.locale).pages.tagContent.showingFirst({count:numPages})})]})]}),jsx10(PageList,{limit:numPages,...listProps})]})]})})})]})}else{let pages=allPagesWithTag(tag),listProps={...props,allFiles:pages};return jsxs4("div",{class:classes,children:[jsx10("article",{children:content}),jsxs4("div",{class:"page-listing",children:[jsx10("p",{children:i18n(cfg.locale).pages.tagContent.itemsUnderTag({count:pages.length})}),jsx10("div",{children:jsx10(PageList,{...listProps})})]})]})}},"TagContent");TagContent.css=listPage_default+PageList.css;var TagContent_default=__name(()=>TagContent,"default");import path5 from"path";import{jsx as jsx11,jsxs as jsxs5}from"preact/jsx-runtime";var defaultOptions9={showFolderCount:!0},FolderContent_default=__name(opts=>{let options2={...defaultOptions9,...opts},FolderContent=__name(props=>{let{tree,fileData,allFiles,cfg}=props,folderSlug=stripSlashes(simplifySlug(fileData.slug)),allPagesInFolder=allFiles.filter(file=>{let fileSlug=stripSlashes(simplifySlug(file.slug)),prefixed=fileSlug.startsWith(folderSlug)&&fileSlug!==folderSlug,folderParts=folderSlug.split(path5.posix.sep),isDirectChild=fileSlug.split(path5.posix.sep).length===folderParts.length+1;return prefixed&&isDirectChild}),classes=["popover-hint",...fileData.frontmatter?.cssclasses??[]].join(" "),listProps={...props,allFiles:allPagesInFolder},content=tree.children.length===0?fileData.description:htmlToJsx(fileData.filePath,tree);return jsxs5("div",{class:classes,children:[jsx11("article",{children:jsx11("p",{children:content})}),jsxs5("div",{class:"page-listing",children:[options2.showFolderCount&&jsx11("p",{children:i18n(cfg.locale).pages.folderContent.itemsUnderFolder({count:allPagesInFolder.length})}),jsx11("div",{children:jsx11(PageList,{...listProps})})]})]})},"FolderContent");return FolderContent.css=listPage_default+PageList.css,FolderContent},"default");import{jsx as jsx12,jsxs as jsxs6}from"preact/jsx-runtime";var NotFound=__name(({cfg})=>jsxs6("article",{class:"popover-hint",children:[jsx12("h1",{children:"404"}),jsx12("p",{children:i18n(cfg.locale).pages.error.notFound})]}),"NotFound"),__default=__name(()=>NotFound,"default");import{jsx as jsx13}from"preact/jsx-runtime";var ArticleTitle=__name(({fileData,displayClass})=>{let title=fileData.frontmatter?.title;return title?jsx13("h1",{class:classNames(displayClass,"article-title"),children:title}):null},"ArticleTitle");ArticleTitle.css=`
.article-title {
  margin: 2rem 0 0 0;
}
`;var ArticleTitle_default=__name(()=>ArticleTitle,"default");var darkmode_inline_default=`var h=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",o=localStorage.getItem("theme")??h;document.documentElement.setAttribute("saved-theme",o);var d=t=>{let n=new CustomEvent("themechange",{detail:{theme:t}});document.dispatchEvent(n)};document.addEventListener("nav",()=>{let t=a=>{let e=a.target?.checked?"dark":"light";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),d(e)},n=a=>{let e=a.matches?"dark":"light";document.documentElement.setAttribute("saved-theme",e),localStorage.setItem("theme",e),c.checked=a.matches,d(e)},c=document.querySelector("#darkmode-toggle");c.addEventListener("change",t),window.addCleanup(()=>c.removeEventListener("change",t)),o==="dark"&&(c.checked=!0);let m=window.matchMedia("(prefers-color-scheme: dark)");m.addEventListener("change",n),window.addCleanup(()=>m.removeEventListener("change",n))});
`;var darkmode_default=`.darkmode {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0 10px;
}
.darkmode > .toggle {
  display: none;
  box-sizing: border-box;
}
.darkmode svg {
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 20px;
  height: 20px;
  top: calc(50% - 10px);
  fill: var(--darkgray);
  transition: opacity 0.1s ease;
}

:root[saved-theme=dark] {
  color-scheme: dark;
}

:root[saved-theme=light] {
  color-scheme: light;
}

:root[saved-theme=dark] .toggle ~ label > #dayIcon {
  opacity: 0;
}
:root[saved-theme=dark] .toggle ~ label > #nightIcon {
  opacity: 1;
}

:root .toggle ~ label > #dayIcon {
  opacity: 1;
}
:root .toggle ~ label > #nightIcon {
  opacity: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiZGFya21vZGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7OztBQUlKO0VBQ0U7OztBQUdGO0VBQ0U7OztBQUlBO0VBQ0U7O0FBRUY7RUFDRTs7O0FBS0Y7RUFDRTs7QUFFRjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiLmRhcmttb2RlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBtYXJnaW46IDAgMTBweDtcblxuICAmID4gLnRvZ2dsZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB9XG5cbiAgJiBzdmcge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgdG9wOiBjYWxjKDUwJSAtIDEwcHgpO1xuICAgIGZpbGw6IHZhcigtLWRhcmtncmF5KTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMXMgZWFzZTtcbiAgfVxufVxuXG46cm9vdFtzYXZlZC10aGVtZT1cImRhcmtcIl0ge1xuICBjb2xvci1zY2hlbWU6IGRhcms7XG59XG5cbjpyb290W3NhdmVkLXRoZW1lPVwibGlnaHRcIl0ge1xuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xufVxuXG46cm9vdFtzYXZlZC10aGVtZT1cImRhcmtcIl0gLnRvZ2dsZSB+IGxhYmVsIHtcbiAgJiA+ICNkYXlJY29uIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gICYgPiAjbmlnaHRJY29uIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbjpyb290IC50b2dnbGUgfiBsYWJlbCB7XG4gICYgPiAjZGF5SWNvbiB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAmID4gI25pZ2h0SWNvbiB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxufVxuIl19 */`;import{jsx as jsx14,jsxs as jsxs7}from"preact/jsx-runtime";var Darkmode=__name(({displayClass,cfg})=>jsxs7("div",{class:classNames(displayClass,"darkmode"),children:[jsx14("input",{class:"toggle",id:"darkmode-toggle",type:"checkbox",tabIndex:-1}),jsx14("label",{id:"toggle-label-light",for:"darkmode-toggle",tabIndex:-1,children:jsxs7("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"dayIcon",x:"0px",y:"0px",viewBox:"0 0 35 35",style:"enable-background:new 0 0 35 35",xmlSpace:"preserve",children:[jsx14("title",{children:i18n(cfg.locale).components.themeToggle.darkMode}),jsx14("path",{d:"M6,17.5C6,16.672,5.328,16,4.5,16h-3C0.672,16,0,16.672,0,17.5    S0.672,19,1.5,19h3C5.328,19,6,18.328,6,17.5z M7.5,26c-0.414,0-0.789,0.168-1.061,0.439l-2,2C4.168,28.711,4,29.086,4,29.5    C4,30.328,4.671,31,5.5,31c0.414,0,0.789-0.168,1.06-0.44l2-2C8.832,28.289,9,27.914,9,27.5C9,26.672,8.329,26,7.5,26z M17.5,6    C18.329,6,19,5.328,19,4.5v-3C19,0.672,18.329,0,17.5,0S16,0.672,16,1.5v3C16,5.328,16.671,6,17.5,6z M27.5,9    c0.414,0,0.789-0.168,1.06-0.439l2-2C30.832,6.289,31,5.914,31,5.5C31,4.672,30.329,4,29.5,4c-0.414,0-0.789,0.168-1.061,0.44    l-2,2C26.168,6.711,26,7.086,26,7.5C26,8.328,26.671,9,27.5,9z M6.439,8.561C6.711,8.832,7.086,9,7.5,9C8.328,9,9,8.328,9,7.5    c0-0.414-0.168-0.789-0.439-1.061l-2-2C6.289,4.168,5.914,4,5.5,4C4.672,4,4,4.672,4,5.5c0,0.414,0.168,0.789,0.439,1.06    L6.439,8.561z M33.5,16h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3c0.828,0,1.5-0.672,1.5-1.5S34.328,16,33.5,16z     M28.561,26.439C28.289,26.168,27.914,26,27.5,26c-0.828,0-1.5,0.672-1.5,1.5c0,0.414,0.168,0.789,0.439,1.06l2,2    C28.711,30.832,29.086,31,29.5,31c0.828,0,1.5-0.672,1.5-1.5c0-0.414-0.168-0.789-0.439-1.061L28.561,26.439z M17.5,29    c-0.829,0-1.5,0.672-1.5,1.5v3c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3C19,29.672,18.329,29,17.5,29z M17.5,7    C11.71,7,7,11.71,7,17.5S11.71,28,17.5,28S28,23.29,28,17.5S23.29,7,17.5,7z M17.5,25c-4.136,0-7.5-3.364-7.5-7.5    c0-4.136,3.364-7.5,7.5-7.5c4.136,0,7.5,3.364,7.5,7.5C25,21.636,21.636,25,17.5,25z"})]})}),jsx14("label",{id:"toggle-label-dark",for:"darkmode-toggle",tabIndex:-1,children:jsxs7("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",id:"nightIcon",x:"0px",y:"0px",viewBox:"0 0 100 100",style:"enable-background:new 0 0 100 100",xmlSpace:"preserve",children:[jsx14("title",{children:i18n(cfg.locale).components.themeToggle.lightMode}),jsx14("path",{d:"M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z"})]})})]}),"Darkmode");Darkmode.beforeDOMLoaded=darkmode_inline_default;Darkmode.css=darkmode_default;var Darkmode_default=__name(()=>Darkmode,"default");var DEFAULT_SANS_SERIF='-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',DEFAULT_MONO="ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace";function googleFontHref(theme){let{code,header,body}=theme.typography;return`https://fonts.googleapis.com/css2?family=${code}&family=${header}:wght@400;700&family=${body}:ital,wght@0,400;0,600;1,400;1,600&display=swap`}__name(googleFontHref,"googleFontHref");function joinStyles(theme,...stylesheet){return`
${stylesheet.join(`

`)}

:root {
  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};

  --headerFont: "${theme.typography.header}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${theme.typography.body}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${theme.typography.code}", ${DEFAULT_MONO};
}

:root[saved-theme="dark"] {
  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
}
`}__name(joinStyles,"joinStyles");import{Fragment as Fragment4,jsx as jsx15,jsxs as jsxs8}from"preact/jsx-runtime";var Head_default=__name(()=>__name(({cfg,fileData,externalResources})=>{let title=fileData.frontmatter?.title??i18n(cfg.locale).propertyDefaults.title,description=fileData.description?.trim()??i18n(cfg.locale).propertyDefaults.description,{css,js}=externalResources,path13=new URL(`https://${cfg.baseUrl??"example.com"}`).pathname,baseDir=fileData.slug==="404"?path13:pathToRoot(fileData.slug),iconPath=joinSegments(baseDir,"static/icon.png"),ogImagePath=`https://${cfg.baseUrl}/static/og-image.png`;return jsxs8("head",{children:[jsx15("title",{children:title}),jsx15("meta",{charSet:"utf-8"}),cfg.theme.cdnCaching&&cfg.theme.fontOrigin==="googleFonts"&&jsxs8(Fragment4,{children:[jsx15("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),jsx15("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),jsx15("link",{rel:"stylesheet",href:googleFontHref(cfg.theme)})]}),jsx15("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),jsx15("meta",{property:"og:title",content:title}),jsx15("meta",{property:"og:description",content:description}),cfg.baseUrl&&jsx15("meta",{property:"og:image",content:ogImagePath}),jsx15("meta",{property:"og:width",content:"1200"}),jsx15("meta",{property:"og:height",content:"675"}),jsx15("link",{rel:"icon",href:iconPath}),jsx15("meta",{name:"description",content:description}),jsx15("meta",{name:"generator",content:"Quartz"}),css.map(href=>jsx15("link",{href,rel:"stylesheet",type:"text/css","spa-preserve":!0},href)),js.filter(resource=>resource.loadTime==="beforeDOMReady").map(res=>JSResourceToScriptElement(res,!0))]})},"Head"),"default");import{jsx as jsx16}from"preact/jsx-runtime";var PageTitle=__name(({fileData,cfg,displayClass})=>{let title=cfg?.pageTitle??i18n(cfg.locale).propertyDefaults.title,baseDir=pathToRoot(fileData.slug);return jsx16("h1",{class:classNames(displayClass,"page-title"),children:jsx16("a",{href:baseDir,children:title})})},"PageTitle");PageTitle.css=`
.page-title {
  margin: 0;
}
`;var PageTitle_default=__name(()=>PageTitle,"default");import readingTime from"reading-time";var contentMeta_default=`.content-meta {
  margin-top: 0;
  color: var(--gray);
}
.content-meta[show-comma=true] > span:not(:last-child) {
  margin-right: 8px;
}
.content-meta[show-comma=true] > span:not(:last-child)::after {
  content: ",";
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiY29udGVudE1ldGEuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFO0VBQ0E7O0FBR0U7RUFDRTs7QUFFQTtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQtbWV0YSB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIGNvbG9yOiB2YXIoLS1ncmF5KTtcblxuICAmW3Nob3ctY29tbWE9XCJ0cnVlXCJdIHtcbiAgICA+IHNwYW46bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDhweDtcblxuICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIixcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ== */`;import{jsx as jsx17}from"preact/jsx-runtime";var defaultOptions10={showReadingTime:!0,showComma:!0},ContentMeta_default=__name(opts=>{let options2={...defaultOptions10,...opts};function ContentMetadata({cfg,fileData,displayClass}){let text=fileData.text;if(text){let segments=[];if(fileData.dates&&segments.push(formatDate(getDate(cfg,fileData),cfg.locale)),options2.showReadingTime){let{minutes,words:_words}=readingTime(text),displayedTime=i18n(cfg.locale).components.contentMeta.readingTime({minutes:Math.ceil(minutes)});segments.push(displayedTime)}let segmentsElements=segments.map(segment=>jsx17("span",{children:segment}));return jsx17("p",{"show-comma":options2.showComma,class:classNames(displayClass,"content-meta"),children:segmentsElements})}else return null}return __name(ContentMetadata,"ContentMetadata"),ContentMetadata.css=contentMeta_default,ContentMetadata},"default");import{jsx as jsx18}from"preact/jsx-runtime";function Spacer({displayClass}){return jsx18("div",{class:classNames(displayClass,"spacer")})}__name(Spacer,"Spacer");var Spacer_default=__name(()=>Spacer,"default");var legacyToc_default=`details#toc summary {
  cursor: pointer;
}
details#toc summary::marker {
  color: var(--dark);
}
details#toc summary > * {
  padding-left: 0.25rem;
  display: inline-block;
  margin: 0;
}
details#toc ul {
  list-style: none;
  margin: 0.5rem 1.25rem;
  padding: 0;
}
details#toc .depth-1 {
  padding-left: calc(1rem * 1);
}
details#toc .depth-2 {
  padding-left: calc(1rem * 2);
}
details#toc .depth-3 {
  padding-left: calc(1rem * 3);
}
details#toc .depth-4 {
  padding-left: calc(1rem * 4);
}
details#toc .depth-5 {
  padding-left: calc(1rem * 5);
}
details#toc .depth-6 {
  padding-left: calc(1rem * 6);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsibGVnYWN5VG9jLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUlKO0VBQ0U7RUFDQTtFQUNBOztBQUlBO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiZGV0YWlscyN0b2Mge1xuICAmIHN1bW1hcnkge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICY6Om1hcmtlciB7XG4gICAgICBjb2xvcjogdmFyKC0tZGFyayk7XG4gICAgfVxuXG4gICAgJiA+ICoge1xuICAgICAgcGFkZGluZy1sZWZ0OiAwLjI1cmVtO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgfVxuXG4gICYgdWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgbWFyZ2luOiAwLjVyZW0gMS4yNXJlbTtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCA2IHtcbiAgICAmIC5kZXB0aC0jeyRpfSB7XG4gICAgICBwYWRkaW5nLWxlZnQ6IGNhbGMoMXJlbSAqICN7JGl9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ== */`;var toc_default=`button#toc {
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0;
  color: var(--dark);
  display: flex;
  align-items: center;
}
button#toc h3 {
  font-size: 1rem;
  display: inline-block;
  margin: 0;
}
button#toc .fold {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  opacity: 0.8;
}
button#toc.collapsed .fold {
  transform: rotateZ(-90deg);
}

#toc-content {
  list-style: none;
  overflow: hidden;
  max-height: none;
  transition: max-height 0.5s ease;
  position: relative;
}
#toc-content.collapsed > .overflow::after {
  opacity: 0;
}
#toc-content ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
}
#toc-content ul > li > a {
  color: var(--dark);
  opacity: 0.35;
  transition: 0.5s ease opacity, 0.3s ease color;
}
#toc-content ul > li > a.in-view {
  opacity: 0.75;
}
#toc-content .depth-0 {
  padding-left: calc(1rem * 0);
}
#toc-content .depth-1 {
  padding-left: calc(1rem * 1);
}
#toc-content .depth-2 {
  padding-left: calc(1rem * 2);
}
#toc-content .depth-3 {
  padding-left: calc(1rem * 3);
}
#toc-content .depth-4 {
  padding-left: calc(1rem * 4);
}
#toc-content .depth-5 {
  padding-left: calc(1rem * 5);
}
#toc-content .depth-6 {
  padding-left: calc(1rem * 6);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsidG9jLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOztBQUNBO0VBQ0U7RUFDQTtFQUNBLFlBQ0U7O0FBRUY7RUFDRTs7QUFNSjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFOztBQURGO0VBQ0U7O0FBREY7RUFDRTs7QUFERjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uI3RvYyB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6IHZhcigtLWRhcmspO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICYgaDMge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgJiAuZm9sZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxuXG4gICYuY29sbGFwc2VkIC5mb2xkIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVooLTkwZGVnKTtcbiAgfVxufVxuXG4jdG9jLWNvbnRlbnQge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXgtaGVpZ2h0OiBub25lO1xuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuNXMgZWFzZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICYuY29sbGFwc2VkID4gLm92ZXJmbG93OjphZnRlciB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuXG4gICYgdWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgICYgPiBsaSA+IGEge1xuICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgICAgb3BhY2l0eTogMC4zNTtcbiAgICAgIHRyYW5zaXRpb246XG4gICAgICAgIDAuNXMgZWFzZSBvcGFjaXR5LFxuICAgICAgICAwLjNzIGVhc2UgY29sb3I7XG4gICAgICAmLmluLXZpZXcge1xuICAgICAgICBvcGFjaXR5OiAwLjc1O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBmb3IgJGkgZnJvbSAwIHRocm91Z2ggNiB7XG4gICAgJiAuZGVwdGgtI3skaX0ge1xuICAgICAgcGFkZGluZy1sZWZ0OiBjYWxjKDFyZW0gKiAjeyRpfSk7XG4gICAgfVxuICB9XG59XG4iXX0= */`;var toc_inline_default='var o=new IntersectionObserver(e=>{for(let t of e){let n=t.target.id,s=document.querySelector(`a[data-for="${n}"]`),i=t.rootBounds?.height;i&&s&&(t.boundingClientRect.y<i?s.classList.add("in-view"):s.classList.remove("in-view"))}});function c(){this.classList.toggle("collapsed");let e=this.nextElementSibling;e&&(e.classList.toggle("collapsed"),e.style.maxHeight=e.style.maxHeight==="0px"?e.scrollHeight+"px":"0px")}function l(){let e=document.getElementById("toc");if(e){let t=e.classList.contains("collapsed"),n=e.nextElementSibling;if(!n)return;n.style.maxHeight=t?"0px":n.scrollHeight+"px",e.addEventListener("click",c),window.addCleanup(()=>e.removeEventListener("click",c))}}window.addEventListener("resize",l);document.addEventListener("nav",()=>{l(),o.disconnect(),document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").forEach(t=>o.observe(t))});\n';import{jsx as jsx19,jsxs as jsxs9}from"preact/jsx-runtime";var defaultOptions11={layout:"modern"},TableOfContents2=__name(({fileData,displayClass,cfg})=>fileData.toc?jsxs9("div",{class:classNames(displayClass,"toc"),children:[jsxs9("button",{type:"button",id:"toc",class:fileData.collapseToc?"collapsed":"",children:[jsx19("h3",{children:i18n(cfg.locale).components.tableOfContents.title}),jsx19("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"fold",children:jsx19("polyline",{points:"6 9 12 15 18 9"})})]}),jsx19("div",{id:"toc-content",children:jsx19("ul",{class:"overflow",children:fileData.toc.map(tocEntry=>jsx19("li",{class:`depth-${tocEntry.depth}`,children:jsx19("a",{href:`#${tocEntry.slug}`,"data-for":tocEntry.slug,children:tocEntry.text})},tocEntry.slug))})})]}):null,"TableOfContents");TableOfContents2.css=toc_default;TableOfContents2.afterDOMLoaded=toc_inline_default;var LegacyTableOfContents=__name(({fileData,cfg})=>fileData.toc?jsxs9("details",{id:"toc",open:!fileData.collapseToc,children:[jsx19("summary",{children:jsx19("h3",{children:i18n(cfg.locale).components.tableOfContents.title})}),jsx19("ul",{children:fileData.toc.map(tocEntry=>jsx19("li",{class:`depth-${tocEntry.depth}`,children:jsx19("a",{href:`#${tocEntry.slug}`,"data-for":tocEntry.slug,children:tocEntry.text})},tocEntry.slug))})]}):null,"LegacyTableOfContents");LegacyTableOfContents.css=legacyToc_default;var TableOfContents_default=__name(opts=>(opts?.layout??defaultOptions11.layout)==="modern"?TableOfContents2:LegacyTableOfContents,"default");var explorer_default=`button#explorer {
  all: unset;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding: 0;
  color: var(--dark);
  display: flex;
  align-items: center;
}
button#explorer h1 {
  font-size: 1rem;
  display: inline-block;
  margin: 0;
}
button#explorer .fold {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  opacity: 0.8;
}
button#explorer.collapsed .fold {
  transform: rotateZ(-90deg);
}

.folder-outer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-in-out;
}

.folder-outer.open {
  grid-template-rows: 1fr;
}

.folder-outer > ul {
  overflow: hidden;
}

#explorer-content {
  list-style: none;
  overflow: hidden;
  max-height: none;
  transition: max-height 0.35s ease;
  margin-top: 0.5rem;
}
#explorer-content.collapsed > .overflow::after {
  opacity: 0;
}
#explorer-content ul {
  list-style: none;
  margin: 0.08rem 0;
  padding: 0;
  transition: max-height 0.35s ease, transform 0.35s ease, opacity 0.2s ease;
}
#explorer-content ul li > a {
  color: var(--dark);
  opacity: 0.75;
  pointer-events: all;
}

svg {
  pointer-events: all;
}
svg > polyline {
  pointer-events: none;
}

.folder-container {
  flex-direction: row;
  display: flex;
  align-items: center;
  user-select: none;
}
.folder-container div > a {
  color: var(--secondary);
  font-family: var(--headerFont);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5rem;
  display: inline-block;
}
.folder-container div > a:hover {
  color: var(--tertiary);
}
.folder-container div > button {
  color: var(--dark);
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  align-items: center;
  font-family: var(--headerFont);
}
.folder-container div > button span {
  font-size: 0.95rem;
  display: inline-block;
  color: var(--secondary);
  font-weight: 600;
  margin: 0;
  line-height: 1.5rem;
  pointer-events: none;
}

.folder-icon {
  margin-right: 5px;
  color: var(--secondary);
  cursor: pointer;
  transition: transform 0.3s ease;
  backface-visibility: visible;
}

li:has(> .folder-outer:not(.open)) > .folder-container > svg {
  transform: rotate(-90deg);
}

.folder-icon:hover {
  color: var(--tertiary);
}

.no-background::after {
  background: none !important;
}

#explorer-end {
  height: 4px;
  margin: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiZXhwbG9yZXIuc2NzcyIsIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQSxZQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFLTjtFQUNFOztBQUVBO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQSxhQ2xGYTtFRG1GYjtFQUNBOztBQUdGO0VBQ0U7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBLGFDM0dXO0VENEdYO0VBQ0E7RUFDQTs7O0FBS047RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUVFO0VBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlIFwiLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCIgYXMgKjtcblxuYnV0dG9uI2V4cGxvcmVyIHtcbiAgYWxsOiB1bnNldDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuICBjb2xvcjogdmFyKC0tZGFyayk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgJiBoMSB7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAmIC5mb2xkIHtcbiAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG4gICAgb3BhY2l0eTogMC44O1xuICB9XG5cbiAgJi5jb2xsYXBzZWQgLmZvbGQge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWigtOTBkZWcpO1xuICB9XG59XG5cbi5mb2xkZXItb3V0ZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IDBmcjtcbiAgdHJhbnNpdGlvbjogZ3JpZC10ZW1wbGF0ZS1yb3dzIDAuM3MgZWFzZS1pbi1vdXQ7XG59XG5cbi5mb2xkZXItb3V0ZXIub3BlbiB7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyO1xufVxuXG4uZm9sZGVyLW91dGVyID4gdWwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4jZXhwbG9yZXItY29udGVudCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1heC1oZWlnaHQ6IG5vbmU7XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zNXMgZWFzZTtcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xuXG4gICYuY29sbGFwc2VkID4gLm92ZXJmbG93OjphZnRlciB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuXG4gICYgdWwge1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgbWFyZ2luOiAwLjA4cmVtIDA7XG4gICAgcGFkZGluZzogMDtcbiAgICB0cmFuc2l0aW9uOlxuICAgICAgbWF4LWhlaWdodCAwLjM1cyBlYXNlLFxuICAgICAgdHJhbnNmb3JtIDAuMzVzIGVhc2UsXG4gICAgICBvcGFjaXR5IDAuMnMgZWFzZTtcbiAgICAmIGxpID4gYSB7XG4gICAgICBjb2xvcjogdmFyKC0tZGFyayk7XG4gICAgICBvcGFjaXR5OiAwLjc1O1xuICAgICAgcG9pbnRlci1ldmVudHM6IGFsbDtcbiAgICB9XG4gIH1cbn1cblxuc3ZnIHtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcblxuICAmID4gcG9seWxpbmUge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG59XG5cbi5mb2xkZXItY29udGFpbmVyIHtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgJiBkaXYgPiBhIHtcbiAgICBjb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgICBmb250LWZhbWlseTogdmFyKC0taGVhZGVyRm9udCk7XG4gICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiAkc2VtaUJvbGRXZWlnaHQ7XG4gICAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICAmIGRpdiA+IGE6aG92ZXIge1xuICAgIGNvbG9yOiB2YXIoLS10ZXJ0aWFyeSk7XG4gIH1cblxuICAmIGRpdiA+IGJ1dHRvbiB7XG4gICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgcGFkZGluZy1yaWdodDogMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWhlYWRlckZvbnQpO1xuXG4gICAgJiBzcGFuIHtcbiAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuICAgICAgZm9udC13ZWlnaHQ6ICRzZW1pQm9sZFdlaWdodDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjVyZW07XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLmZvbGRlci1pY29uIHtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIGNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbmxpOmhhcyg+IC5mb2xkZXItb3V0ZXI6bm90KC5vcGVuKSkgPiAuZm9sZGVyLWNvbnRhaW5lciA+IHN2ZyB7XG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG59XG5cbi5mb2xkZXItaWNvbjpob3ZlciB7XG4gIGNvbG9yOiB2YXIoLS10ZXJ0aWFyeSk7XG59XG5cbi5uby1iYWNrZ3JvdW5kOjphZnRlciB7XG4gIGJhY2tncm91bmQ6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuI2V4cGxvcmVyLWVuZCB7XG4gIC8vIG5lZWRzIGhlaWdodCBzbyBJbnRlcnNlY3Rpb25PYnNlcnZlciBnZXRzIHRyaWdnZXJlZFxuICBoZWlnaHQ6IDRweDtcbiAgLy8gcmVtb3ZlIGRlZmF1bHQgbWFyZ2luIGZyb20gbGlcbiAgbWFyZ2luOiAwO1xufVxuIiwiJHBhZ2VXaWR0aDogNzUwcHg7XG4kbW9iaWxlQnJlYWtwb2ludDogNjAwcHg7XG4kdGFibGV0QnJlYWtwb2ludDogMTAwMHB4O1xuJHNpZGVQYW5lbFdpZHRoOiAzODBweDtcbiR0b3BTcGFjaW5nOiA2cmVtO1xuJGZ1bGxQYWdlV2lkdGg6ICRwYWdlV2lkdGggKyAyICogJHNpZGVQYW5lbFdpZHRoO1xuJGJvbGRXZWlnaHQ6IDcwMDtcbiRzZW1pQm9sZFdlaWdodDogNjAwO1xuJG5vcm1hbFdlaWdodDogNDAwO1xuIl19 */`;var explorer_inline_default='var s,p=new IntersectionObserver(e=>{let t=document.getElementById("explorer-ul");if(t)for(let o of e)o.isIntersecting?t.classList.add("no-background"):t.classList.remove("no-background")});function m(){this.classList.toggle("collapsed");let e=this.nextElementSibling;e&&(e.classList.toggle("collapsed"),e.style.maxHeight=e.style.maxHeight==="0px"?e.scrollHeight+"px":"0px")}function i(e){e.stopPropagation();let t=e.target;if(!t)return;let o=t.nodeName==="svg",l=o?t.parentElement?.nextSibling:t.parentElement?.parentElement?.nextElementSibling,a=o?t.nextElementSibling:t.parentElement;if(!(l&&a))return;l.classList.toggle("open");let c=l.classList.contains("open");E(l,!c);let n=a.dataset.folderpath;f(s,n);let r=JSON.stringify(s);localStorage.setItem("fileTree",r)}function g(){let e=document.getElementById("explorer");if(!e)return;if(e.dataset.behavior==="collapse")for(let n of document.getElementsByClassName("folder-button"))n.addEventListener("click",i),window.addCleanup(()=>n.removeEventListener("click",i));e.addEventListener("click",m),window.addCleanup(()=>e.removeEventListener("click",m));for(let n of document.getElementsByClassName("folder-icon"))n.addEventListener("click",i),window.addCleanup(()=>n.removeEventListener("click",i));let t=localStorage.getItem("fileTree"),o=e?.dataset.savestate==="true",l=t&&o?JSON.parse(t):[],a=new Map(l.map(n=>[n.path,n.collapsed])),c=e.dataset.tree?JSON.parse(e.dataset.tree):[];s=[];for(let{path:n,collapsed:r}of c)s.push({path:n,collapsed:a.get(n)??r});s.map(n=>{let d=document.querySelector(`[data-folderpath=\'${n.path}\']`)?.parentElement?.nextElementSibling;d&&E(d,n.collapsed)})}window.addEventListener("resize",g);document.addEventListener("nav",()=>{g(),p.disconnect();let e=document.getElementById("explorer-end");e&&p.observe(e)});function E(e,t){return t?e.classList.remove("open"):e.classList.add("open")}function f(e,t){let o=e.find(l=>l.path===t);o&&(o.collapsed=!o.collapsed)}\n';import{Fragment as Fragment5,jsx as jsx20,jsxs as jsxs10}from"preact/jsx-runtime";function getPathSegment(fp,idx){if(fp)return fp.split("/").at(idx)}__name(getPathSegment,"getPathSegment");var FileNode=class _FileNode{static{__name(this,"FileNode")}children;name;displayName;file;depth;constructor(slugSegment,displayName,file,depth){this.children=[],this.name=slugSegment,this.displayName=displayName??file?.frontmatter?.title??slugSegment,this.file=file?clone(file):null,this.depth=depth??0}insert(fileData){if(fileData.path.length===0)return;let nextSegment=fileData.path[0];if(fileData.path.length===1){if(nextSegment===""){let title=fileData.file.frontmatter?.title;title&&title!=="index"&&(this.displayName=title)}else this.children.push(new _FileNode(nextSegment,void 0,fileData.file,this.depth+1));return}fileData.path=fileData.path.splice(1);let child=this.children.find(c=>c.name===nextSegment);if(child){child.insert(fileData);return}let newChild=new _FileNode(nextSegment,getPathSegment(fileData.file.relativePath,this.depth),void 0,this.depth+1);newChild.insert(fileData),this.children.push(newChild)}add(file){this.insert({file,path:simplifySlug(file.slug).split("/")})}filter(filterFn){this.children=this.children.filter(filterFn),this.children.forEach(child=>child.filter(filterFn))}map(mapFn){mapFn(this),this.children.forEach(child=>child.map(mapFn))}getFolderPaths(collapsed){let folderPaths=[],traverse=__name((node,currentPath)=>{if(!node.file){let folderPath=joinSegments(currentPath,node.name);folderPath!==""&&folderPaths.push({path:folderPath,collapsed}),node.children.forEach(child=>traverse(child,folderPath))}},"traverse");return traverse(this,""),folderPaths}sort(sortFn){this.children=this.children.sort(sortFn),this.children.forEach(e=>e.sort(sortFn))}};function ExplorerNode({node,opts,fullPath,fileData}){let folderBehavior=opts.folderClickBehavior,isDefaultOpen=opts.folderDefaultState==="open",folderPath="";return node.name!==""&&(folderPath=joinSegments(fullPath??"",node.name)),jsx20(Fragment5,{children:node.file?jsx20("li",{children:jsx20("a",{href:resolveRelative(fileData.slug,node.file.slug),"data-for":node.file.slug,children:node.displayName})},node.file.slug):jsxs10("li",{children:[node.name!==""&&jsxs10("div",{class:"folder-container",children:[jsx20("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"5 8 14 8",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"folder-icon",children:jsx20("polyline",{points:"6 9 12 15 18 9"})}),jsx20("div",{"data-folderpath":folderPath,children:folderBehavior==="link"?jsx20("a",{href:resolveRelative(fileData.slug,folderPath),"data-for":node.name,class:"folder-title",children:node.displayName}):jsx20("button",{class:"folder-button",children:jsx20("span",{class:"folder-title",children:node.displayName})})},node.name)]}),jsx20("div",{class:`folder-outer ${node.depth===0||isDefaultOpen?"open":""}`,children:jsx20("ul",{style:{paddingLeft:node.name!==""?"1.4rem":"0"},class:"content","data-folderul":folderPath,children:node.children.map((childNode,i)=>jsx20(ExplorerNode,{node:childNode,opts,fullPath:folderPath,fileData},i))})})]})})}__name(ExplorerNode,"ExplorerNode");import{jsx as jsx21,jsxs as jsxs11}from"preact/jsx-runtime";var defaultOptions12={folderClickBehavior:"collapse",folderDefaultState:"collapsed",useSavedState:!0,mapFn:node=>node,sortFn:(a,b)=>!a.file&&!b.file||a.file&&b.file?a.displayName.localeCompare(b.displayName,void 0,{numeric:!0,sensitivity:"base"}):a.file&&!b.file?1:-1,filterFn:node=>node.name!=="tags",order:["filter","map","sort"]},Explorer_default=__name(userOpts=>{let opts={...defaultOptions12,...userOpts},fileTree,jsonTree;function constructFileTree(allFiles){if(fileTree)return;if(fileTree=new FileNode(""),allFiles.forEach(file=>fileTree.add(file)),opts.order)for(let i=0;i<opts.order.length;i++){let functionName=opts.order[i];functionName==="map"?fileTree.map(opts.mapFn):functionName==="sort"?fileTree.sort(opts.sortFn):functionName==="filter"&&fileTree.filter(opts.filterFn)}let folders=fileTree.getFolderPaths(opts.folderDefaultState==="collapsed");jsonTree=JSON.stringify(folders)}__name(constructFileTree,"constructFileTree");let Explorer=__name(({cfg,allFiles,displayClass,fileData})=>(constructFileTree(allFiles),jsxs11("div",{class:classNames(displayClass,"explorer"),children:[jsxs11("button",{type:"button",id:"explorer","data-behavior":opts.folderClickBehavior,"data-collapsed":opts.folderDefaultState,"data-savestate":opts.useSavedState,"data-tree":jsonTree,children:[jsx21("h1",{children:opts.title??i18n(cfg.locale).components.explorer.title}),jsx21("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"5 8 14 8",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"fold",children:jsx21("polyline",{points:"6 9 12 15 18 9"})})]}),jsx21("div",{id:"explorer-content",children:jsxs11("ul",{class:"overflow",id:"explorer-ul",children:[jsx21(ExplorerNode,{node:fileTree,opts,fileData}),jsx21("li",{id:"explorer-end"})]})})]})),"Explorer");return Explorer.css=explorer_default,Explorer.afterDOMLoaded=explorer_inline_default,Explorer},"default");import{jsx as jsx22}from"preact/jsx-runtime";var TagList=__name(({fileData,displayClass})=>{let tags=fileData.frontmatter?.tags,baseDir=pathToRoot(fileData.slug);return tags&&tags.length>0?jsx22("ul",{class:classNames(displayClass,"tags"),children:tags.map(tag=>{let linkDest=baseDir+`/tags/${slugTag(tag)}`;return jsx22("li",{children:jsx22("a",{href:linkDest,class:"internal tag-link",children:tag})})})}):null},"TagList");TagList.css=`
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-self: end;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`;var TagList_default=__name(()=>TagList,"default");import{jsx as jsx23,jsxs as jsxs12}from"preact/jsx-runtime";var backlinks_default=`.backlinks {
  position: relative;
}
.backlinks > h3 {
  font-size: 1rem;
  margin: 0;
}
.backlinks > ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}
.backlinks > ul > li > a {
  background-color: transparent;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiYmFja2xpbmtzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTs7QUFFQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBR0U7RUFDRSIsInNvdXJjZXNDb250ZW50IjpbIi5iYWNrbGlua3Mge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJiA+IGgzIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgJiA+IHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgbWFyZ2luOiAwLjVyZW0gMDtcblxuICAgICYgPiBsaSB7XG4gICAgICAmID4gYSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19 */`;import{jsx as jsx24,jsxs as jsxs13}from"preact/jsx-runtime";var Backlinks=__name(({fileData,allFiles,displayClass,cfg})=>{let slug=simplifySlug(fileData.slug),backlinkFiles=allFiles.filter(file=>file.links?.includes(slug));return jsxs13("div",{class:classNames(displayClass,"backlinks"),children:[jsx24("h3",{children:i18n(cfg.locale).components.backlinks.title}),jsx24("ul",{class:"overflow",children:backlinkFiles.length>0?backlinkFiles.map(f=>jsx24("li",{children:jsx24("a",{href:resolveRelative(fileData.slug,f.slug),class:"internal",children:f.frontmatter?.title})})):jsx24("li",{children:i18n(cfg.locale).components.backlinks.noBacklinksFound})})]})},"Backlinks");Backlinks.css=backlinks_default;var Backlinks_default=__name(()=>Backlinks,"default");var search_default=`.search {
  min-width: fit-content;
  max-width: 14rem;
  flex-grow: 0.3;
}
.search > #search-icon {
  background-color: var(--lightgray);
  border-radius: 4px;
  height: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
}
.search > #search-icon > div {
  flex-grow: 1;
}
.search > #search-icon > p {
  display: inline;
  padding: 0 1rem;
}
.search > #search-icon svg {
  cursor: pointer;
  width: 18px;
  min-width: 18px;
  margin: 0 0.5rem;
}
.search > #search-icon svg .search-path {
  stroke: var(--darkgray);
  stroke-width: 2px;
  transition: stroke 0.5s ease;
}
.search > #search-container {
  position: fixed;
  contain: layout;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: none;
  backdrop-filter: blur(4px);
}
.search > #search-container.active {
  display: inline-block;
}
.search > #search-container > #search-space {
  width: 65%;
  margin-top: 12vh;
  margin-left: auto;
  margin-right: auto;
}
@media all and (max-width: 1510px) {
  .search > #search-container > #search-space {
    width: 90%;
  }
}
.search > #search-container > #search-space > * {
  width: 100%;
  border-radius: 7px;
  background: var(--light);
  box-shadow: 0 14px 50px rgba(27, 33, 48, 0.12), 0 10px 30px rgba(27, 33, 48, 0.16);
  margin-bottom: 2em;
}
.search > #search-container > #search-space > input {
  box-sizing: border-box;
  padding: 0.5em 1em;
  font-family: var(--bodyFont);
  color: var(--dark);
  font-size: 1.1em;
  border: 1px solid var(--lightgray);
}
.search > #search-container > #search-space > input:focus {
  outline: none;
}
.search > #search-container > #search-space > #search-layout {
  display: none;
  flex-direction: row;
  border: 1px solid var(--lightgray);
  flex: 0 0 100%;
  box-sizing: border-box;
}
.search > #search-container > #search-space > #search-layout.display-results {
  display: flex;
}
.search > #search-container > #search-space > #search-layout[data-preview] > #results-container {
  flex: 0 0 min(30%, 450px);
}
@media all and (min-width: 1000px) {
  .search > #search-container > #search-space > #search-layout[data-preview] .result-card > p.preview {
    display: none;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > div:first-child {
    border-right: 1px solid var(--lightgray);
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > div:last-child {
    border-top-left-radius: unset;
    border-bottom-left-radius: unset;
  }
}
.search > #search-container > #search-space > #search-layout > div {
  height: 63vh;
  border-radius: 5px;
}
@media all and (max-width: 1000px) {
  .search > #search-container > #search-space > #search-layout > #preview-container {
    display: none !important;
  }
  .search > #search-container > #search-space > #search-layout[data-preview] > #results-container {
    width: 100%;
    height: auto;
    flex: 0 0 100%;
  }
}
.search > #search-container > #search-space > #search-layout .highlight {
  background: color-mix(in srgb, var(--tertiary) 60%, rgba(255, 255, 255, 0));
  border-radius: 5px;
  scroll-margin-top: 2rem;
}
.search > #search-container > #search-space > #search-layout > #preview-container {
  display: block;
  overflow: hidden;
  font-family: inherit;
  color: var(--dark);
  line-height: 1.5em;
  font-weight: 400;
  overflow-y: auto;
  padding: 0 2rem;
}
.search > #search-container > #search-space > #search-layout > #preview-container .preview-inner {
  margin: 0 auto;
  width: min(750px, 100%);
}
.search > #search-container > #search-space > #search-layout > #preview-container a[role=anchor] {
  background-color: transparent;
}
.search > #search-container > #search-space > #search-layout > #results-container {
  overflow-y: auto;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card {
  overflow: hidden;
  padding: 1em;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid var(--lightgray);
  width: 100%;
  display: block;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  text-transform: none;
  text-align: left;
  outline: none;
  font-weight: inherit;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card:hover, .search > #search-container > #search-space > #search-layout > #results-container .result-card:focus, .search > #search-container > #search-space > #search-layout > #results-container .result-card.focus {
  background: var(--lightgray);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > h3 {
  margin: 0;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul.tags {
  margin-top: 0.45rem;
  margin-bottom: 0;
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul > li > p {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
  line-height: 1.4rem;
  font-weight: 700;
  color: var(--secondary);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > ul > li > p.match-tag {
  color: var(--tertiary);
}
.search > #search-container > #search-space > #search-layout > #results-container .result-card > p {
  margin-bottom: 0;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsic2VhcmNoLnNjc3MiLCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBOztBQUtOO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBTkY7SUFPSTs7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQSxZQUNFO0VBRUY7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFOztBQUdGO0VBRUk7SUFDRTs7RUFJQTtJQUNFO0lBQ0E7SUFDQTs7RUFHRjtJQUNFO0lBQ0E7OztBQU1SO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0lBQ0U7O0VBR0Y7SUFDRTtJQUNBO0lBQ0E7OztBQUlKO0VBQ0U7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLGFDakpLO0VEa0pMO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7O0FBSUo7RUFDRTs7QUFFQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBR0U7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsYUM3TUQ7RUQ4TUM7O0FBRUE7RUFDRTs7QUFJSjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSBcIi4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiIGFzICo7XG5cbi5zZWFyY2gge1xuICBtaW4td2lkdGg6IGZpdC1jb250ZW50O1xuICBtYXgtd2lkdGg6IDE0cmVtO1xuICBmbGV4LWdyb3c6IDAuMztcblxuICAmID4gI3NlYXJjaC1pY29uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodGdyYXkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBoZWlnaHQ6IDJyZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gICAgJiA+IGRpdiB7XG4gICAgICBmbGV4LWdyb3c6IDE7XG4gICAgfVxuXG4gICAgJiA+IHAge1xuICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgICAgcGFkZGluZzogMCAxcmVtO1xuICAgIH1cblxuICAgICYgc3ZnIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHdpZHRoOiAxOHB4O1xuICAgICAgbWluLXdpZHRoOiAxOHB4O1xuICAgICAgbWFyZ2luOiAwIDAuNXJlbTtcblxuICAgICAgLnNlYXJjaC1wYXRoIHtcbiAgICAgICAgc3Ryb2tlOiB2YXIoLS1kYXJrZ3JheSk7XG4gICAgICAgIHN0cm9rZS13aWR0aDogMnB4O1xuICAgICAgICB0cmFuc2l0aW9uOiBzdHJva2UgMC41cyBlYXNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYgPiAjc2VhcmNoLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGNvbnRhaW46IGxheW91dDtcbiAgICB6LWluZGV4OiA5OTk7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cig0cHgpO1xuXG4gICAgJi5hY3RpdmUge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cblxuICAgICYgPiAjc2VhcmNoLXNwYWNlIHtcbiAgICAgIHdpZHRoOiA2NSU7XG4gICAgICBtYXJnaW4tdG9wOiAxMnZoO1xuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG5cbiAgICAgIEBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRmdWxsUGFnZVdpZHRoKSB7XG4gICAgICAgIHdpZHRoOiA5MCU7XG4gICAgICB9XG5cbiAgICAgICYgPiAqIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tbGlnaHQpO1xuICAgICAgICBib3gtc2hhZG93OlxuICAgICAgICAgIDAgMTRweCA1MHB4IHJnYmEoMjcsIDMzLCA0OCwgMC4xMiksXG4gICAgICAgICAgMCAxMHB4IDMwcHggcmdiYSgyNywgMzMsIDQ4LCAwLjE2KTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMmVtO1xuICAgICAgfVxuXG4gICAgICAmID4gaW5wdXQge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBwYWRkaW5nOiAwLjVlbSAxZW07XG4gICAgICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1ib2R5Rm9udCk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICAgICAgZm9udC1zaXplOiAxLjFlbTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcblxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYgPiAjc2VhcmNoLWxheW91dCB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgICAgIGZsZXg6IDAgMCAxMDAlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgICAgICYuZGlzcGxheS1yZXN1bHRzIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgJltkYXRhLXByZXZpZXddID4gI3Jlc3VsdHMtY29udGFpbmVyIHtcbiAgICAgICAgICBmbGV4OiAwIDAgbWluKDMwJSwgNDUwcHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIGFsbCBhbmQgKG1pbi13aWR0aDogJHRhYmxldEJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAmW2RhdGEtcHJldmlld10ge1xuICAgICAgICAgICAgJiAucmVzdWx0LWNhcmQgPiBwLnByZXZpZXcge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmID4gZGl2IHtcbiAgICAgICAgICAgICAgJjpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogdW5zZXQ7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IHVuc2V0O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiB1bnNldDtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiB1bnNldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYgPiBkaXYge1xuICAgICAgICAgIGhlaWdodDogY2FsYyg3NXZoIC0gMTJ2aCk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJHRhYmxldEJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAmID4gI3ByZXZpZXctY29udGFpbmVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmW2RhdGEtcHJldmlld10gPiAjcmVzdWx0cy1jb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgICAgICBmbGV4OiAwIDAgMTAwJTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmIC5oaWdobGlnaHQge1xuICAgICAgICAgIGJhY2tncm91bmQ6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS10ZXJ0aWFyeSkgNjAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDApKTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgc2Nyb2xsLW1hcmdpbi10b3A6IDJyZW07XG4gICAgICAgIH1cblxuICAgICAgICAmID4gI3ByZXZpZXctY29udGFpbmVyIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6ICRub3JtYWxXZWlnaHQ7XG4gICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgICBwYWRkaW5nOiAwIDJyZW07XG5cbiAgICAgICAgICAmIC5wcmV2aWV3LWlubmVyIHtcbiAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgd2lkdGg6IG1pbigkcGFnZVdpZHRoLCAxMDAlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhW3JvbGU9XCJhbmNob3JcIl0ge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJiA+ICNyZXN1bHRzLWNvbnRhaW5lciB7XG4gICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcblxuICAgICAgICAgICYgLnJlc3VsdC1jYXJkIHtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnMgZWFzZTtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBjYXJkIHByb3BzXG4gICAgICAgICAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTAwJTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xuXG4gICAgICAgICAgICAmOmhvdmVyLFxuICAgICAgICAgICAgJjpmb2N1cyxcbiAgICAgICAgICAgICYuZm9jdXMge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1saWdodGdyYXkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmID4gaDMge1xuICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYgPiB1bC50YWdzIHtcbiAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMC40NXJlbTtcbiAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJiA+IHVsID4gbGkgPiBwIHtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaWdobGlnaHQpO1xuICAgICAgICAgICAgICBwYWRkaW5nOiAwLjJyZW0gMC40cmVtO1xuICAgICAgICAgICAgICBtYXJnaW46IDAgMC4xcmVtO1xuICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMS40cmVtO1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogJGJvbGRXZWlnaHQ7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuXG4gICAgICAgICAgICAgICYubWF0Y2gtdGFnIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogdmFyKC0tdGVydGlhcnkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYgPiBwIHtcbiAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIiRwYWdlV2lkdGg6IDc1MHB4O1xuJG1vYmlsZUJyZWFrcG9pbnQ6IDYwMHB4O1xuJHRhYmxldEJyZWFrcG9pbnQ6IDEwMDBweDtcbiRzaWRlUGFuZWxXaWR0aDogMzgwcHg7XG4kdG9wU3BhY2luZzogNnJlbTtcbiRmdWxsUGFnZVdpZHRoOiAkcGFnZVdpZHRoICsgMiAqICRzaWRlUGFuZWxXaWR0aDtcbiRib2xkV2VpZ2h0OiA3MDA7XG4kc2VtaUJvbGRXZWlnaHQ6IDYwMDtcbiRub3JtYWxXZWlnaHQ6IDQwMDtcbiJdfQ== */`;var search_inline_default='var Ke=Object.create;var ce=Object.defineProperty;var $e=Object.getOwnPropertyDescriptor;var Ge=Object.getOwnPropertyNames;var Je=Object.getPrototypeOf,Ve=Object.prototype.hasOwnProperty;var fe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ze=(e,t,u,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ge(t))!Ve.call(e,n)&&n!==u&&ce(e,n,{get:()=>t[n],enumerable:!(i=$e(t,n))||i.enumerable});return e};var Qe=(e,t,u)=>(u=e!=null?Ke(Je(e)):{},Ze(t||!e||!e.__esModule?ce(u,"default",{value:e,enumerable:!0}):u,e));var ae=fe(()=>{});var Oe=fe((Ut,Ie)=>{"use strict";Ie.exports=Et;function q(e){return e instanceof Buffer?Buffer.from(e):new e.constructor(e.buffer.slice(),e.byteOffset,e.length)}function Et(e){if(e=e||{},e.circles)return gt(e);return e.proto?i:u;function t(n,s){for(var l=Object.keys(n),r=new Array(l.length),D=0;D<l.length;D++){var o=l[D],F=n[o];typeof F!="object"||F===null?r[o]=F:F instanceof Date?r[o]=new Date(F):ArrayBuffer.isView(F)?r[o]=q(F):r[o]=s(F)}return r}function u(n){if(typeof n!="object"||n===null)return n;if(n instanceof Date)return new Date(n);if(Array.isArray(n))return t(n,u);if(n instanceof Map)return new Map(t(Array.from(n),u));if(n instanceof Set)return new Set(t(Array.from(n),u));var s={};for(var l in n)if(Object.hasOwnProperty.call(n,l)!==!1){var r=n[l];typeof r!="object"||r===null?s[l]=r:r instanceof Date?s[l]=new Date(r):r instanceof Map?s[l]=new Map(t(Array.from(r),u)):r instanceof Set?s[l]=new Set(t(Array.from(r),u)):ArrayBuffer.isView(r)?s[l]=q(r):s[l]=u(r)}return s}function i(n){if(typeof n!="object"||n===null)return n;if(n instanceof Date)return new Date(n);if(Array.isArray(n))return t(n,i);if(n instanceof Map)return new Map(t(Array.from(n),i));if(n instanceof Set)return new Set(t(Array.from(n),i));var s={};for(var l in n){var r=n[l];typeof r!="object"||r===null?s[l]=r:r instanceof Date?s[l]=new Date(r):r instanceof Map?s[l]=new Map(t(Array.from(r),i)):r instanceof Set?s[l]=new Set(t(Array.from(r),i)):ArrayBuffer.isView(r)?s[l]=q(r):s[l]=i(r)}return s}}function gt(e){var t=[],u=[];return e.proto?s:n;function i(l,r){for(var D=Object.keys(l),o=new Array(D.length),F=0;F<D.length;F++){var E=D[F],f=l[E];if(typeof f!="object"||f===null)o[E]=f;else if(f instanceof Date)o[E]=new Date(f);else if(ArrayBuffer.isView(f))o[E]=q(f);else{var a=t.indexOf(f);a!==-1?o[E]=u[a]:o[E]=r(f)}}return o}function n(l){if(typeof l!="object"||l===null)return l;if(l instanceof Date)return new Date(l);if(Array.isArray(l))return i(l,n);if(l instanceof Map)return new Map(i(Array.from(l),n));if(l instanceof Set)return new Set(i(Array.from(l),n));var r={};t.push(l),u.push(r);for(var D in l)if(Object.hasOwnProperty.call(l,D)!==!1){var o=l[D];if(typeof o!="object"||o===null)r[D]=o;else if(o instanceof Date)r[D]=new Date(o);else if(o instanceof Map)r[D]=new Map(i(Array.from(o),n));else if(o instanceof Set)r[D]=new Set(i(Array.from(o),n));else if(ArrayBuffer.isView(o))r[D]=q(o);else{var F=t.indexOf(o);F!==-1?r[D]=u[F]:r[D]=n(o)}}return t.pop(),u.pop(),r}function s(l){if(typeof l!="object"||l===null)return l;if(l instanceof Date)return new Date(l);if(Array.isArray(l))return i(l,s);if(l instanceof Map)return new Map(i(Array.from(l),s));if(l instanceof Set)return new Set(i(Array.from(l),s));var r={};t.push(l),u.push(r);for(var D in l){var o=l[D];if(typeof o!="object"||o===null)r[D]=o;else if(o instanceof Date)r[D]=new Date(o);else if(o instanceof Map)r[D]=new Map(i(Array.from(o),s));else if(o instanceof Set)r[D]=new Set(i(Array.from(o),s));else if(ArrayBuffer.isView(o))r[D]=q(o);else{var F=t.indexOf(o);F!==-1?r[D]=u[F]:r[D]=s(o)}}return t.pop(),u.pop(),r}}});var B;function b(e){return typeof e<"u"?e:!0}function he(e){let t=Array(e);for(let u=0;u<e;u++)t[u]=p();return t}function p(){return Object.create(null)}function Xe(e,t){return t.length-e.length}function v(e){return typeof e=="string"}function H(e){return typeof e=="object"}function De(e){return typeof e=="function"}function pe(e,t){var u=Ye;if(e&&(t&&(e=ee(e,t)),this.H&&(e=ee(e,this.H)),this.J&&1<e.length&&(e=ee(e,this.J)),u||u==="")){if(t=e.split(u),this.filter){e=this.filter,u=t.length;let i=[];for(let n=0,s=0;n<u;n++){let l=t[n];l&&!e[l]&&(i[s++]=l)}e=i}else e=t;return e}return e}var Ye=/[\\p{Z}\\p{S}\\p{P}\\p{C}]+/u,be=/[\\u0300-\\u036f]/g;function Ee(e,t){let u=Object.keys(e),i=u.length,n=[],s="",l=0;for(let r=0,D,o;r<i;r++)D=u[r],(o=e[D])?(n[l++]=y(t?"(?!\\\\b)"+D+"(\\\\b|_)":D),n[l++]=o):s+=(s?"|":"")+D;return s&&(n[l++]=y(t?"(?!\\\\b)("+s+")(\\\\b|_)":"("+s+")"),n[l]=""),n}function ee(e,t){for(let u=0,i=t.length;u<i&&(e=e.replace(t[u],t[u+1]),e);u+=2);return e}function y(e){return new RegExp(e,"g")}function me(e){let t="",u="";for(let i=0,n=e.length,s;i<n;i++)(s=e[i])!==u&&(t+=u=s);return t}var et={encode:Be,F:!1,G:""};function Be(e){return pe.call(this,(""+e).toLowerCase(),!1)}var ye={},U={};function we(e){K(e,"add"),K(e,"append"),K(e,"search"),K(e,"update"),K(e,"remove")}function K(e,t){e[t+"Async"]=function(){let u=this,i=arguments;var n=i[i.length-1];let s;return De(n)&&(s=n,delete i[i.length-1]),n=new Promise(function(l){setTimeout(function(){u.async=!0;let r=u[t].apply(u,i);u.async=!1,l(r)})}),s?(n.then(s),this):n}}function ve(e,t,u,i){let n=e.length,s=[],l,r,D=0;i&&(i=[]);for(let o=n-1;0<=o;o--){let F=e[o],E=F.length,f=p(),a=!l;for(let c=0;c<E;c++){let g=F[c],d=g.length;if(d)for(let M=0,x,w;M<d;M++)if(w=g[M],l){if(l[w]){if(!o){if(u)u--;else if(s[D++]=w,D===t)return s}(o||i)&&(f[w]=1),a=!0}if(i&&(x=(r[w]||0)+1,r[w]=x,x<n)){let k=i[x-2]||(i[x-2]=[]);k[k.length]=w}}else f[w]=1}if(i)l||(r=f);else if(!a)return[];l=f}if(i)for(let o=i.length-1,F,E;0<=o;o--){F=i[o],E=F.length;for(let f=0,a;f<E;f++)if(a=F[f],!l[a]){if(u)u--;else if(s[D++]=a,D===t)return s;l[a]=1}}return s}function tt(e,t){let u=p(),i=p(),n=[];for(let s=0;s<e.length;s++)u[e[s]]=1;for(let s=0,l;s<t.length;s++){l=t[s];for(let r=0,D;r<l.length;r++)D=l[r],u[D]&&!i[D]&&(i[D]=1,n[n.length]=D)}return n}function ue(e){this.l=e!==!0&&e,this.cache=p(),this.h=[]}function xe(e,t,u){H(e)&&(e=e.query);let i=this.cache.get(e);return i||(i=this.search(e,t,u),this.cache.set(e,i)),i}ue.prototype.set=function(e,t){if(!this.cache[e]){var u=this.h.length;for(u===this.l?delete this.cache[this.h[u-1]]:u++,--u;0<u;u--)this.h[u]=this.h[u-1];this.h[0]=e}this.cache[e]=t};ue.prototype.get=function(e){let t=this.cache[e];if(this.l&&t&&(e=this.h.indexOf(e))){let u=this.h[e-1];this.h[e-1]=this.h[e],this.h[e]=u}return t};var ut={memory:{charset:"latin:extra",D:3,B:4,m:!1},performance:{D:3,B:3,s:!1,context:{depth:2,D:1}},match:{charset:"latin:extra",G:"reverse"},score:{charset:"latin:advanced",D:20,B:3,context:{depth:3,D:9}},default:{}};function Se(e,t,u,i,n,s,l,r){setTimeout(function(){let D=e(u?u+"."+i:i,JSON.stringify(l));D&&D.then?D.then(function(){t.export(e,t,u,n,s+1,r)}):t.export(e,t,u,n,s+1,r)})}function P(e,t){if(!(this instanceof P))return new P(e);var u;if(e){v(e)?e=ut[e]:(u=e.preset)&&(e=Object.assign({},u[u],e)),u=e.charset;var i=e.lang;v(u)&&(u.indexOf(":")===-1&&(u+=":default"),u=U[u]),v(i)&&(i=ye[i])}else e={};let n,s,l=e.context||{};if(this.encode=e.encode||u&&u.encode||Be,this.register=t||p(),this.D=n=e.resolution||9,this.G=t=u&&u.G||e.tokenize||"strict",this.depth=t==="strict"&&l.depth,this.l=b(l.bidirectional),this.s=s=b(e.optimize),this.m=b(e.fastupdate),this.B=e.minlength||1,this.C=e.boost,this.map=s?he(n):p(),this.A=n=l.resolution||1,this.h=s?he(n):p(),this.F=u&&u.F||e.rtl,this.H=(t=e.matcher||i&&i.H)&&Ee(t,!1),this.J=(t=e.stemmer||i&&i.J)&&Ee(t,!0),u=t=e.filter||i&&i.filter){u=t,i=p();for(let r=0,D=u.length;r<D;r++)i[u[r]]=1;u=i}this.filter=u,this.cache=(t=e.cache)&&new ue(t)}B=P.prototype;B.append=function(e,t){return this.add(e,t,!0)};B.add=function(e,t,u,i){if(t&&(e||e===0)){if(!i&&!u&&this.register[e])return this.update(e,t);if(t=this.encode(t),i=t.length){let o=p(),F=p(),E=this.depth,f=this.D;for(let a=0;a<i;a++){let c=t[this.F?i-1-a:a];var n=c.length;if(c&&n>=this.B&&(E||!F[c])){var s=X(f,i,a),l="";switch(this.G){case"full":if(2<n){for(s=0;s<n;s++)for(var r=n;r>s;r--)if(r-s>=this.B){var D=X(f,i,a,n,s);l=c.substring(s,r),$(this,F,l,D,e,u)}break}case"reverse":if(1<n){for(r=n-1;0<r;r--)l=c[r]+l,l.length>=this.B&&$(this,F,l,X(f,i,a,n,r),e,u);l=""}case"forward":if(1<n){for(r=0;r<n;r++)l+=c[r],l.length>=this.B&&$(this,F,l,s,e,u);break}default:if(this.C&&(s=Math.min(s/this.C(t,c,a)|0,f-1)),$(this,F,c,s,e,u),E&&1<i&&a<i-1){for(n=p(),l=this.A,s=c,r=Math.min(E+1,i-a),n[s]=1,D=1;D<r;D++)if((c=t[this.F?i-1-a-D:a+D])&&c.length>=this.B&&!n[c]){n[c]=1;let g=this.l&&c>s;$(this,o,g?s:c,X(l+(i/2>l?0:1),i,a,r-1,D-1),e,u,g?c:s)}}}}}this.m||(this.register[e]=1)}}return this};function X(e,t,u,i,n){return u&&1<e?t+(i||0)<=e?u+(n||0):(e-1)/(t+(i||0))*(u+(n||0))+1|0:0}function $(e,t,u,i,n,s,l){let r=l?e.h:e.map;(!t[u]||l&&!t[u][l])&&(e.s&&(r=r[i]),l?(t=t[u]||(t[u]=p()),t[l]=1,r=r[l]||(r[l]=p())):t[u]=1,r=r[u]||(r[u]=[]),e.s||(r=r[i]||(r[i]=[])),s&&r.includes(n)||(r[r.length]=n,e.m&&(e=e.register[n]||(e.register[n]=[]),e[e.length]=r)))}B.search=function(e,t,u){u||(!t&&H(e)?(u=e,e=u.query):H(t)&&(u=t));let i=[],n,s,l=0;if(u){e=u.query||e,t=u.limit,l=u.offset||0;var r=u.context;s=u.suggest}if(e&&(e=this.encode(""+e),n=e.length,1<n)){u=p();var D=[];for(let F=0,E=0,f;F<n;F++)if((f=e[F])&&f.length>=this.B&&!u[f])if(this.s||s||this.map[f])D[E++]=f,u[f]=1;else return i;e=D,n=e.length}if(!n)return i;t||(t=100),r=this.depth&&1<n&&r!==!1,u=0;let o;r?(o=e[0],u=1):1<n&&e.sort(Xe);for(let F,E;u<n;u++){if(E=e[u],r?(F=ge(this,i,s,t,l,n===2,E,o),s&&F===!1&&i.length||(o=E)):F=ge(this,i,s,t,l,n===1,E),F)return F;if(s&&u===n-1){if(D=i.length,!D){if(r){r=0,u=-1;continue}return i}if(D===1)return Le(i[0],t,l)}}return ve(i,t,l,s)};function ge(e,t,u,i,n,s,l,r){let D=[],o=r?e.h:e.map;if(e.s||(o=Ae(o,l,r,e.l)),o){let F=0,E=Math.min(o.length,r?e.A:e.D);for(let f=0,a=0,c,g;f<E&&!((c=o[f])&&(e.s&&(c=Ae(c,l,r,e.l)),n&&c&&s&&(g=c.length,g<=n?(n-=g,c=null):(c=c.slice(n),n=0)),c&&(D[F++]=c,s&&(a+=c.length,a>=i))));f++);if(F){if(s)return Le(D,i,0);t[t.length]=D;return}}return!u&&D}function Le(e,t,u){return e=e.length===1?e[0]:[].concat.apply([],e),u||e.length>t?e.slice(u,u+t):e}function Ae(e,t,u,i){return u?(i=i&&t>u,e=(e=e[i?t:u])&&e[i?u:t]):e=e[t],e}B.contain=function(e){return!!this.register[e]};B.update=function(e,t){return this.remove(e).add(e,t)};B.remove=function(e,t){let u=this.register[e];if(u){if(this.m)for(let i=0,n;i<u.length;i++)n=u[i],n.splice(n.indexOf(e),1);else te(this.map,e,this.D,this.s),this.depth&&te(this.h,e,this.A,this.s);if(t||delete this.register[e],this.cache){t=this.cache;for(let i=0,n,s;i<t.h.length;i++)s=t.h[i],n=t.cache[s],n.includes(e)&&(t.h.splice(i--,1),delete t.cache[s])}}return this};function te(e,t,u,i,n){let s=0;if(e.constructor===Array)if(n)t=e.indexOf(t),t!==-1?1<e.length&&(e.splice(t,1),s++):s++;else{n=Math.min(e.length,u);for(let l=0,r;l<n;l++)(r=e[l])&&(s=te(r,t,u,i,n),i||s||delete e[l])}else for(let l in e)(s=te(e[l],t,u,i,n))||delete e[l];return s}B.searchCache=xe;B.export=function(e,t,u,i,n,s){let l=!0;typeof s>"u"&&(l=new Promise(o=>{s=o}));let r,D;switch(n||(n=0)){case 0:if(r="reg",this.m){D=p();for(let o in this.register)D[o]=1}else D=this.register;break;case 1:r="cfg",D={doc:0,opt:this.s?1:0};break;case 2:r="map",D=this.map;break;case 3:r="ctx",D=this.h;break;default:typeof u>"u"&&s&&s();return}return Se(e,t||this,u,r,i,n,D,s),l};B.import=function(e,t){if(t)switch(v(t)&&(t=JSON.parse(t)),e){case"cfg":this.s=!!t.opt;break;case"reg":this.m=!1,this.register=t;break;case"map":this.map=t;break;case"ctx":this.h=t}};we(P.prototype);function nt(e){e=e.data;var t=self._index;let u=e.args;var i=e.task;switch(i){case"init":i=e.options||{},e=e.factory,t=i.encode,i.cache=!1,t&&t.indexOf("function")===0&&(i.encode=Function("return "+t)()),e?(Function("return "+e)()(self),self._index=new self.FlexSearch.Index(i),delete self.FlexSearch):self._index=new P(i);break;default:e=e.id,t=t[i].apply(t,u),postMessage(i==="search"?{id:e,msg:t}:{id:e})}}var Ce=0;function W(e){if(!(this instanceof W))return new W(e);var t;e?De(t=e.encode)&&(e.encode=t.toString()):e={},(t=(self||window)._factory)&&(t=t.toString());let u=typeof window>"u"&&self.exports,i=this;this.o=it(t,u,e.worker),this.h=p(),this.o&&(u?this.o.on("message",function(n){i.h[n.id](n.msg),delete i.h[n.id]}):this.o.onmessage=function(n){n=n.data,i.h[n.id](n.msg),delete i.h[n.id]},this.o.postMessage({task:"init",factory:t,options:e}))}J("add");J("append");J("search");J("update");J("remove");function J(e){W.prototype[e]=W.prototype[e+"Async"]=function(){let t=this,u=[].slice.call(arguments);var i=u[u.length-1];let n;return De(i)&&(n=i,u.splice(u.length-1,1)),i=new Promise(function(s){setTimeout(function(){t.h[++Ce]=s,t.o.postMessage({task:e,id:Ce,args:u})})}),n?(i.then(n),this):i}}function it(e,t,u){let i;try{i=t?new(ae()).Worker(__dirname+"/node/node.js"):e?new Worker(URL.createObjectURL(new Blob(["onmessage="+nt.toString()],{type:"text/javascript"}))):new Worker(v(u)?u:"worker/worker.js",{type:"module"})}catch{}return i}function G(e){if(!(this instanceof G))return new G(e);var t=e.document||e.doc||e,u;this.K=[],this.h=[],this.A=[],this.register=p(),this.key=(u=t.key||t.id)&&Y(u,this.A)||"id",this.m=b(e.fastupdate),this.C=(u=t.store)&&u!==!0&&[],this.store=u&&p(),this.I=(u=t.tag)&&Y(u,this.A),this.l=u&&p(),this.cache=(u=e.cache)&&new ue(u),e.cache=!1,this.o=e.worker,this.async=!1,u=p();let i=t.index||t.field||t;v(i)&&(i=[i]);for(let n=0,s,l;n<i.length;n++)s=i[n],v(s)||(l=s,s=s.field),l=H(l)?Object.assign({},e,l):e,this.o&&(u[s]=new W(l),u[s].o||(this.o=!1)),this.o||(u[s]=new P(l,this.register)),this.K[n]=Y(s,this.A),this.h[n]=s;if(this.C)for(e=t.store,v(e)&&(e=[e]),t=0;t<e.length;t++)this.C[t]=Y(e[t],this.A);this.index=u}function Y(e,t){let u=e.split(":"),i=0;for(let n=0;n<u.length;n++)e=u[n],0<=e.indexOf("[]")&&(e=e.substring(0,e.length-2))&&(t[i]=!0),e&&(u[i++]=e);return i<u.length&&(u.length=i),1<i?u:u[0]}function re(e,t){if(v(t))e=e[t];else for(let u=0;e&&u<t.length;u++)e=e[t[u]];return e}function se(e,t,u,i,n){if(e=e[n],i===u.length-1)t[n]=e;else if(e)if(e.constructor===Array)for(t=t[n]=Array(e.length),n=0;n<e.length;n++)se(e,t,u,i,n);else t=t[n]||(t[n]=p()),n=u[++i],se(e,t,u,i,n)}function le(e,t,u,i,n,s,l,r){if(e=e[l])if(i===t.length-1){if(e.constructor===Array){if(u[i]){for(t=0;t<e.length;t++)n.add(s,e[t],!0,!0);return}e=e.join(" ")}n.add(s,e,r,!0)}else if(e.constructor===Array)for(l=0;l<e.length;l++)le(e,t,u,i,n,s,l,r);else l=t[++i],le(e,t,u,i,n,s,l,r)}B=G.prototype;B.add=function(e,t,u){if(H(e)&&(t=e,e=re(t,this.key)),t&&(e||e===0)){if(!u&&this.register[e])return this.update(e,t);for(let i=0,n,s;i<this.h.length;i++)s=this.h[i],n=this.K[i],v(n)&&(n=[n]),le(t,n,this.A,0,this.index[s],e,n[0],u);if(this.I){let i=re(t,this.I),n=p();v(i)&&(i=[i]);for(let s=0,l,r;s<i.length;s++)if(l=i[s],!n[l]&&(n[l]=1,r=this.l[l]||(this.l[l]=[]),!u||!r.includes(e))&&(r[r.length]=e,this.m)){let D=this.register[e]||(this.register[e]=[]);D[D.length]=r}}if(this.store&&(!u||!this.store[e])){let i;if(this.C){i=p();for(let n=0,s;n<this.C.length;n++)s=this.C[n],v(s)?i[s]=t[s]:se(t,i,s,0,s[0])}this.store[e]=i||t}}return this};B.append=function(e,t){return this.add(e,t,!0)};B.update=function(e,t){return this.remove(e).add(e,t)};B.remove=function(e){if(H(e)&&(e=re(e,this.key)),this.register[e]){for(var t=0;t<this.h.length&&(this.index[this.h[t]].remove(e,!this.o),!this.m);t++);if(this.I&&!this.m)for(let u in this.l){t=this.l[u];let i=t.indexOf(e);i!==-1&&(1<t.length?t.splice(i,1):delete this.l[u])}this.store&&delete this.store[e],delete this.register[e]}return this};B.search=function(e,t,u,i){u||(!t&&H(e)?(u=e,e=""):H(t)&&(u=t,t=0));let n=[],s=[],l,r,D,o,F,E,f=0;if(u)if(u.constructor===Array)D=u,u=null;else{if(e=u.query||e,D=(l=u.pluck)||u.index||u.field,o=u.tag,r=this.store&&u.enrich,F=u.bool==="and",t=u.limit||t||100,E=u.offset||0,o&&(v(o)&&(o=[o]),!e)){for(let c=0,g;c<o.length;c++)(g=rt.call(this,o[c],t,E,r))&&(n[n.length]=g,f++);return f?n:[]}v(D)&&(D=[D])}D||(D=this.h),F=F&&(1<D.length||o&&1<o.length);let a=!i&&(this.o||this.async)&&[];for(let c=0,g,d,M;c<D.length;c++){let x;if(d=D[c],v(d)||(x=d,d=x.field,e=x.query||e,t=x.limit||t,r=x.enrich||r),a)a[c]=this.index[d].searchAsync(e,t,x||u);else{if(i?g=i[c]:g=this.index[d].search(e,t,x||u),M=g&&g.length,o&&M){let w=[],k=0;F&&(w[0]=[g]);for(let _=0,Q,z;_<o.length;_++)Q=o[_],(M=(z=this.l[Q])&&z.length)&&(k++,w[w.length]=F?[z]:z);k&&(g=F?ve(w,t||100,E||0):tt(g,w),M=g.length)}if(M)s[f]=d,n[f++]=g;else if(F)return[]}}if(a){let c=this;return new Promise(function(g){Promise.all(a).then(function(d){g(c.search(e,t,u,d))})})}if(!f)return[];if(l&&(!r||!this.store))return n[0];for(let c=0,g;c<s.length;c++){if(g=n[c],g.length&&r&&(g=Me.call(this,g)),l)return g;n[c]={field:s[c],result:g}}return n};function rt(e,t,u,i){let n=this.l[e],s=n&&n.length-u;if(s&&0<s)return(s>t||u)&&(n=n.slice(u,u+t)),i&&(n=Me.call(this,n)),{tag:e,result:n}}function Me(e){let t=Array(e.length);for(let u=0,i;u<e.length;u++)i=e[u],t[u]={id:i,doc:this.store[i]};return t}B.contain=function(e){return!!this.register[e]};B.get=function(e){return this.store[e]};B.set=function(e,t){return this.store[e]=t,this};B.searchCache=xe;B.export=function(e,t,u,i,n,s){let l;if(typeof s>"u"&&(l=new Promise(r=>{s=r})),n||(n=0),i||(i=0),i<this.h.length){let r=this.h[i],D=this.index[r];t=this,setTimeout(function(){D.export(e,t,n?r:"",i,n++,s)||(i++,n=1,t.export(e,t,r,i,n,s))})}else{let r,D;switch(n){case 1:r="tag",D=this.l,u=null;break;case 2:r="store",D=this.store,u=null;break;default:s();return}Se(e,this,u,r,i,n,D,s)}return l};B.import=function(e,t){if(t)switch(v(t)&&(t=JSON.parse(t)),e){case"tag":this.l=t;break;case"reg":this.m=!1,this.register=t;for(let i=0,n;i<this.h.length;i++)n=this.index[this.h[i]],n.register=t,n.m=!1;break;case"store":this.store=t;break;default:e=e.split(".");let u=e[0];e=e[1],u&&e&&this.index[u].import(e,t)}};we(G.prototype);var st={encode:Te,F:!1,G:""},lt=[y("[\\xE0\\xE1\\xE2\\xE3\\xE4\\xE5]"),"a",y("[\\xE8\\xE9\\xEA\\xEB]"),"e",y("[\\xEC\\xED\\xEE\\xEF]"),"i",y("[\\xF2\\xF3\\xF4\\xF5\\xF6\\u0151]"),"o",y("[\\xF9\\xFA\\xFB\\xFC\\u0171]"),"u",y("[\\xFD\\u0177\\xFF]"),"y",y("\\xF1"),"n",y("[\\xE7c]"),"k",y("\\xDF"),"s",y(" & ")," and "];function Te(e){var t=e=""+e;return t.normalize&&(t=t.normalize("NFD").replace(be,"")),pe.call(this,t.toLowerCase(),!e.normalize&&lt)}var Dt={encode:Re,F:!1,G:"strict"},ot=/[^a-z0-9]+/,de={b:"p",v:"f",w:"f",z:"s",x:"s",\\u00DF:"s",d:"t",n:"m",c:"k",g:"k",j:"k",q:"k",i:"e",y:"e",u:"o"};function Re(e){e=Te.call(this,e).join(" ");let t=[];if(e){let u=e.split(ot),i=u.length;for(let n=0,s,l=0;n<i;n++)if((e=u[n])&&(!this.filter||!this.filter[e])){s=e[0];let r=de[s]||s,D=r;for(let o=1;o<e.length;o++){s=e[o];let F=de[s]||s;F&&F!==D&&(r+=F,D=F)}t[l++]=r}}return t}var Ft={encode:ke,F:!1,G:""},ct=[y("ae"),"a",y("oe"),"o",y("sh"),"s",y("th"),"t",y("ph"),"f",y("pf"),"f",y("(?![aeo])h(?![aeo])"),"",y("(?!^[aeo])h(?!^[aeo])"),""];function ke(e,t){return e&&(e=Re.call(this,e).join(" "),2<e.length&&(e=ee(e,ct)),t||(1<e.length&&(e=me(e)),e&&(e=e.split(" ")))),e||[]}var ft={encode:ht,F:!1,G:""},at=y("(?!\\\\b)[aeo]");function ht(e){return e&&(e=ke.call(this,e,!0),1<e.length&&(e=e.replace(at,"")),1<e.length&&(e=me(e)),e&&(e=e.split(" "))),e||[]}U["latin:default"]=et;U["latin:simple"]=st;U["latin:balance"]=Dt;U["latin:advanced"]=Ft;U["latin:extra"]=ft;var He={Index:P,Document:G,Worker:W,registerCharset:function(e,t){U[e]=t},registerLanguage:function(e,t){ye[e]=t}};function je(e,t){if(!e)return;function u(n){n.target===this&&(n.preventDefault(),t())}function i(n){n.key.startsWith("Esc")&&(n.preventDefault(),t())}e?.addEventListener("click",u),window.addCleanup(()=>e?.removeEventListener("click",u)),document.addEventListener("keydown",i),window.addCleanup(()=>document.removeEventListener("keydown",i))}function V(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var Ot=Object.hasOwnProperty;var Ue=Qe(Oe(),1),Wt=(0,Ue.default)();function At(e){let t=Bt(mt(e,"index"),!0);return t.length===0?"/":t}var Pe=(e,t,u)=>{let i=new URL(e.getAttribute(t),u);e.setAttribute(t,i.pathname+i.hash)};function ze(e,t){e.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(u=>Pe(u,"href",t)),e.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(u=>Pe(u,"src",t))}function Ct(e){let t=e.split("/").filter(u=>u!=="").slice(0,-1).map(u=>"..").join("/");return t.length===0&&(t="."),t}function Ne(e,t){return dt(Ct(e),At(t))}function dt(...e){return e.filter(t=>t!=="").join("/").replace(/\\/\\/+/g,"/")}function pt(e,t){return e===t||e.endsWith("/"+t)}function mt(e,t){return pt(e,t)&&(e=e.slice(0,-t.length)),e}function Bt(e,t){return e.startsWith("/")&&(e=e.substring(1)),!t&&e.endsWith("/")&&(e=e.slice(0,-1)),e}var j="basic",L="",yt=e=>e.toLowerCase().split(/([^a-z]|[^\\x00-\\x7F])/),Z=new He.Document({charset:"latin:extra",encode:yt,document:{id:"id",tag:"tags",index:[{field:"title",tokenize:"forward"},{field:"content",tokenize:"forward"},{field:"tags",tokenize:"forward"}]}}),wt=new DOMParser,oe=new Map,ne=30,ie=8,vt=5,qe=e=>{let t=e.split(/\\s+/).filter(i=>i.trim()!==""),u=t.length;if(u>1)for(let i=1;i<u;i++)t.push(t.slice(0,i+1).join(" "));return t.sort((i,n)=>n.length-i.length)};function We(e,t,u){let i=qe(e),n=t.split(/\\s+/).filter(D=>D!==""),s=0,l=n.length-1;if(u){let D=f=>i.some(a=>f.toLowerCase().startsWith(a.toLowerCase())),o=n.map(D),F=0,E=0;for(let f=0;f<Math.max(n.length-ne,0);f++){let c=o.slice(f,f+ne).reduce((g,d)=>g+(d?1:0),0);c>=F&&(F=c,E=f)}s=Math.max(E-ne,0),l=Math.min(s+2*ne,n.length-1),n=n.slice(s,l)}let r=n.map(D=>{for(let o of i)if(D.toLowerCase().includes(o.toLowerCase())){let F=new RegExp(o.toLowerCase(),"gi");return D.replace(F,\'<span class="highlight">$&</span>\')}return D}).join(" ");return`${s===0?"":"..."}${r}${l===n.length-1?"":"..."}`}function xt(e,t){let u=new DOMParser,i=qe(e),n=u.parseFromString(t.innerHTML,"text/html"),s=r=>{let D=document.createElement("span");return D.className="highlight",D.textContent=r,D},l=(r,D)=>{if(r.nodeType===Node.TEXT_NODE){let o=r.nodeValue??"",F=new RegExp(D.toLowerCase(),"gi"),E=o.match(F);if(!E||E.length===0)return;let f=document.createElement("span"),a=0;for(let c of E){let g=o.indexOf(c,a);f.appendChild(document.createTextNode(o.slice(a,g))),f.appendChild(s(c)),a=g+c.length}f.appendChild(document.createTextNode(o.slice(a))),r.parentNode?.replaceChild(f,r)}else if(r.nodeType===Node.ELEMENT_NODE){if(r.classList.contains("highlight"))return;Array.from(r.childNodes).forEach(o=>l(o,D))}};for(let r of i)l(n.body,r);return n.body}document.addEventListener("nav",async e=>{let t=e.detail.url,u=await fetchData,i=document.getElementById("search-container"),n=i?.closest(".sidebar"),s=document.getElementById("search-icon"),l=document.getElementById("search-bar"),r=document.getElementById("search-layout"),D=Object.keys(u),o=h=>{r?.querySelector(`#${h.id}`)===null&&r?.appendChild(h)},F=r?.dataset?.preview==="true",E,f,a=document.createElement("div");a.id="results-container",o(a),F&&(E=document.createElement("div"),E.id="preview-container",o(E));function c(){i?.classList.remove("active"),l&&(l.value=""),n&&(n.style.zIndex="unset"),a&&V(a),E&&V(E),r&&r.classList.remove("display-results"),j="basic"}function g(h){j=h,n&&(n.style.zIndex="1"),i?.classList.add("active"),l?.focus()}let d=null;async function M(h){if(h.key==="k"&&(h.ctrlKey||h.metaKey)&&!h.shiftKey){h.preventDefault(),i?.classList.contains("active")?c():g("basic");return}else if(h.shiftKey&&(h.ctrlKey||h.metaKey)&&h.key.toLowerCase()==="k"){h.preventDefault(),i?.classList.contains("active")?c():g("tags"),l&&(l.value="#");return}if(d&&d.classList.remove("focus"),!!i?.classList.contains("active")){if(h.key==="Enter")if(a?.contains(document.activeElement)){let A=document.activeElement;if(A.classList.contains("no-match"))return;await N(A),A.click()}else{let A=document.getElementsByClassName("result-card")[0];if(!A||A?.classList.contains("no-match"))return;await N(A),A.click()}else if(h.key==="ArrowUp"||h.shiftKey&&h.key==="Tab"){if(h.preventDefault(),a?.contains(document.activeElement)){let A=d||document.activeElement,C=A?.previousElementSibling;A?.classList.remove("focus"),C?.focus(),C&&(d=C),await N(C)}}else if((h.key==="ArrowDown"||h.key==="Tab")&&(h.preventDefault(),document.activeElement===l||d!==null)){let A=d||document.getElementsByClassName("result-card")[0],C=A?.nextElementSibling;A?.classList.remove("focus"),C?.focus(),C&&(d=C),await N(C)}}}let x=(h,A)=>{let C=D[A];return{id:A,slug:C,title:j==="tags"?u[C].title:We(h,u[C].title??""),content:We(h,u[C].content??"",!0),tags:w(h.substring(1),u[C].tags)}};function w(h,A){return!A||j!=="tags"?[]:A.map(C=>C.toLowerCase().includes(h.toLowerCase())?`<li><p class="match-tag">#${C}</p></li>`:`<li><p>#${C}</p></li>`).slice(0,vt)}function k(h){return new URL(Ne(t,h),location.toString())}let _=({slug:h,title:A,content:C,tags:R})=>{let T=R.length>0?`<ul class="tags">${R.join("")}</ul>`:"",m=document.createElement("a");m.classList.add("result-card"),m.id=h,m.href=k(h).toString(),m.innerHTML=`<h3>${A}</h3>${T}${F&&window.innerWidth>600?"":`<p>${C}</p>`}`,m.addEventListener("click",S=>{S.altKey||S.ctrlKey||S.metaKey||S.shiftKey||c()});let I=S=>{S.altKey||S.ctrlKey||S.metaKey||S.shiftKey||c()};async function O(S){if(!S.target)return;let _e=S.target;await N(_e)}return m.addEventListener("mouseenter",O),window.addCleanup(()=>m.removeEventListener("mouseenter",O)),m.addEventListener("click",I),window.addCleanup(()=>m.removeEventListener("click",I)),m};async function Q(h){if(a)if(V(a),h.length===0?a.innerHTML=`<a class="result-card no-match">\n          <h3>No results.</h3>\n          <p>Try another search term?</p>\n      </a>`:a.append(...h.map(_)),h.length===0&&E)V(E);else{let A=a.firstElementChild;A.classList.add("focus"),d=A,await N(A)}}async function z(h){if(oe.has(h))return oe.get(h);let A=k(h).toString(),C=await fetch(A).then(R=>R.text()).then(R=>{if(R===void 0)throw new Error(`Could not fetch ${A}`);let T=wt.parseFromString(R??"","text/html");return ze(T,A),[...T.getElementsByClassName("popover-hint")]});return oe.set(h,C),C}async function N(h){if(!r||!F||!h||!E)return;let A=h.id,C=await z(A).then(T=>T.flatMap(m=>[...xt(L,m).children]));f=document.createElement("div"),f.classList.add("preview-inner"),f.append(...C),E.replaceChildren(f),[...E.querySelectorAll(".highlight")].sort((T,m)=>m.innerHTML.length-T.innerHTML.length)[0]?.scrollIntoView({block:"start"})}async function Fe(h){if(!r||!Z)return;L=h.target.value,r.classList.toggle("display-results",L!==""),j=L.startsWith("#")?"tags":"basic";let A;if(j==="tags"){L=L.substring(1).trim();let m=L.indexOf(" ");if(m!=-1){let I=L.substring(0,m),O=L.substring(m+1).trim();A=await Z.searchAsync({query:O,limit:Math.max(ie,1e4),index:["title","content"],tag:I});for(let S of A)S.result=S.result.slice(0,ie);j="basic",L=O}else A=await Z.searchAsync({query:L,limit:ie,index:["tags"]})}else j==="basic"&&(A=await Z.searchAsync({query:L,limit:ie,index:["title","content"]}));let C=m=>{let I=A.filter(O=>O.field===m);return I.length===0?[]:[...I[0].result]},T=[...new Set([...C("title"),...C("content"),...C("tags")])].map(m=>x(L,m));await Q(T)}document.addEventListener("keydown",M),window.addCleanup(()=>document.removeEventListener("keydown",M)),s?.addEventListener("click",()=>g("basic")),window.addCleanup(()=>s?.removeEventListener("click",()=>g("basic"))),l?.addEventListener("input",Fe),window.addCleanup(()=>l?.removeEventListener("input",Fe)),je(i,c),await St(u)});async function St(e){let t=0,u=[];for(let[i,n]of Object.entries(e))u.push(Z.addAsync(t++,{id:t,slug:i,title:n.title,content:n.content,tags:n.tags}));return await Promise.all(u)}\n';import{jsx as jsx25,jsxs as jsxs14}from"preact/jsx-runtime";var defaultOptions13={enablePreview:!0},Search_default=__name(userOpts=>{let Search=__name(({displayClass,cfg})=>{let opts={...defaultOptions13,...userOpts},searchPlaceholder=i18n(cfg.locale).components.search.searchBarPlaceholder;return jsxs14("div",{class:classNames(displayClass,"search"),children:[jsxs14("div",{id:"search-icon",children:[jsx25("p",{children:i18n(cfg.locale).components.search.title}),jsx25("div",{}),jsxs14("svg",{tabIndex:0,"aria-labelledby":"title desc",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19.9 19.7",children:[jsx25("title",{id:"title",children:"Search"}),jsx25("desc",{id:"desc",children:"Search"}),jsxs14("g",{class:"search-path",fill:"none",children:[jsx25("path",{"stroke-linecap":"square",d:"M18.5 18.3l-5.4-5.4"}),jsx25("circle",{cx:"8",cy:"8",r:"7"})]})]})]}),jsx25("div",{id:"search-container",children:jsxs14("div",{id:"search-space",children:[jsx25("input",{autocomplete:"off",id:"search-bar",name:"search",type:"text","aria-label":searchPlaceholder,placeholder:searchPlaceholder}),jsx25("div",{id:"search-layout","data-preview":opts.enablePreview})]})})]})},"Search");return Search.afterDOMLoaded=search_inline_default,Search.css=search_default,Search},"default");var footer_default=`footer {
  text-align: left;
  margin-bottom: 4rem;
  opacity: 0.7;
}
footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: -1rem;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiZm9vdGVyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbImZvb3RlciB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIG1hcmdpbi1ib3R0b206IDRyZW07XG4gIG9wYWNpdHk6IDAuNztcblxuICAmIHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBnYXA6IDFyZW07XG4gICAgbWFyZ2luLXRvcDogLTFyZW07XG4gIH1cbn1cbiJdfQ== */`;import{jsx as jsx26,jsxs as jsxs15}from"preact/jsx-runtime";var Footer_default=__name(opts=>{let Footer=__name(({displayClass,cfg})=>{let year=new Date().getFullYear(),links=opts?.links??[];return jsxs15("footer",{class:`${displayClass??""}`,children:[jsx26("hr",{}),jsxs15("p",{children:["Notes by Felix \xA9 ",year]}),jsx26("ul",{children:Object.entries(links).map(([text,link])=>jsx26("li",{children:jsx26("a",{href:link,children:text})}))})]})},"Footer");return Footer.css=footer_default,Footer},"default");import{Fragment as Fragment6,jsx as jsx27}from"preact/jsx-runtime";var DesktopOnly_default=__name(component=>{if(component){let Component=component,DesktopOnly=__name(props=>jsx27(Component,{displayClass:"desktop-only",...props}),"DesktopOnly");return DesktopOnly.displayName=component.displayName,DesktopOnly.afterDOMLoaded=component?.afterDOMLoaded,DesktopOnly.beforeDOMLoaded=component?.beforeDOMLoaded,DesktopOnly.css=component?.css,DesktopOnly}else return()=>jsx27(Fragment6,{})},"default");import{Fragment as Fragment7,jsx as jsx28}from"preact/jsx-runtime";var MobileOnly_default=__name(component=>{if(component){let Component=component,MobileOnly=__name(props=>jsx28(Component,{displayClass:"mobile-only",...props}),"MobileOnly");return MobileOnly.displayName=component.displayName,MobileOnly.afterDOMLoaded=component?.afterDOMLoaded,MobileOnly.beforeDOMLoaded=component?.beforeDOMLoaded,MobileOnly.css=component?.css,MobileOnly}else return()=>jsx28(Fragment7,{})},"default");import{jsx as jsx29,jsxs as jsxs16}from"preact/jsx-runtime";var breadcrumbs_default=`.breadcrumb-container {
  margin: 0;
  margin-top: 0.75rem;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.breadcrumb-element {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.breadcrumb-element p {
  margin: 0;
  margin-left: 0.5rem;
  padding: 0;
  line-height: normal;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsiYnJlYWRjcnVtYnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7QUFHRjtFQU9FO0VBQ0E7RUFDQTtFQUNBOztBQVRBO0VBQ0U7RUFDQTtFQUNBO0VBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIuYnJlYWRjcnVtYi1jb250YWluZXIge1xuICBtYXJnaW46IDA7XG4gIG1hcmdpbi10b3A6IDAuNzVyZW07XG4gIHBhZGRpbmc6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAwLjVyZW07XG59XG5cbi5icmVhZGNydW1iLWVsZW1lbnQge1xuICBwIHtcbiAgICBtYXJnaW46IDA7XG4gICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIH1cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4iXX0= */`;import{Fragment as Fragment8,jsx as jsx30,jsxs as jsxs17}from"preact/jsx-runtime";var defaultOptions14={spacerSymbol:"\u276F",rootName:"Home",resolveFrontmatterTitle:!0,hideOnRoot:!0,showCurrentPage:!0};function formatCrumb(displayName,baseSlug,currentSlug){return{displayName:displayName.replaceAll("-"," "),path:resolveRelative(baseSlug,currentSlug)}}__name(formatCrumb,"formatCrumb");var Breadcrumbs_default=__name(opts=>{let options2={...defaultOptions14,...opts},folderIndex,Breadcrumbs=__name(({fileData,allFiles,displayClass})=>{if(options2.hideOnRoot&&fileData.slug==="index")return jsx30(Fragment8,{});let crumbs=[formatCrumb(options2.rootName,fileData.slug,"/")];if(!folderIndex&&options2.resolveFrontmatterTitle){folderIndex=new Map;for(let file of allFiles){let folderParts=file.slug?.split("/");folderParts?.at(-1)==="index"&&folderIndex.set(folderParts.slice(0,-1).join("/"),file)}}let slugParts=fileData.slug?.split("/");if(slugParts){let isTagPath=slugParts[0]==="tags",currentPath="";for(let i=0;i<slugParts.length-1;i++){let curPathSegment=slugParts[i],currentFile=folderIndex?.get(slugParts.slice(0,i+1).join("/"));if(currentFile){let title=currentFile.frontmatter.title;title!=="index"&&(curPathSegment=title)}currentPath=joinSegments(currentPath,slugParts[i]);let includeTrailingSlash=!isTagPath||i<1,crumb=formatCrumb(curPathSegment,fileData.slug,currentPath+(includeTrailingSlash?"/":""));crumbs.push(crumb)}options2.showCurrentPage&&slugParts.at(-1)!=="index"&&crumbs.push({displayName:fileData.frontmatter.title,path:""})}return jsx30("nav",{class:classNames(displayClass,"breadcrumb-container"),"aria-label":"breadcrumbs",children:crumbs.map((crumb,index)=>jsxs17("div",{class:"breadcrumb-element",children:[jsx30("a",{href:crumb.path,children:crumb.displayName}),index!==crumbs.length-1&&jsx30("p",{children:` ${options2.spacerSymbol} `})]}))})},"Breadcrumbs");return Breadcrumbs.css=breadcrumbs_default,Breadcrumbs},"default");var sharedPageComponents={head:Head_default(),header:[],footer:Footer_default()},defaultContentPageLayout={beforeBody:[Breadcrumbs_default(),ArticleTitle_default(),ContentMeta_default(),TagList_default()],left:[PageTitle_default(),MobileOnly_default(Spacer_default()),Search_default(),Darkmode_default(),DesktopOnly_default(Explorer_default())],right:[DesktopOnly_default(TableOfContents_default()),Backlinks_default()]},defaultListPageLayout={beforeBody:[Breadcrumbs_default(),ArticleTitle_default(),ContentMeta_default()],left:[PageTitle_default(),MobileOnly_default(Spacer_default()),Search_default(),Darkmode_default(),DesktopOnly_default(Explorer_default())],right:[]};import chalk4 from"chalk";import path6 from"path";import fs2 from"fs";var write=__name(async({ctx,slug,ext,content})=>{let pathToPage=joinSegments(ctx.argv.output,slug+ext),dir=path6.dirname(pathToPage);return await fs2.promises.mkdir(dir,{recursive:!0}),await fs2.promises.writeFile(pathToPage,content),pathToPage},"write");var DepGraph=class{static{__name(this,"DepGraph")}_graph=new Map;constructor(){this._graph=new Map}export(){return{nodes:this.nodes,edges:this.edges}}toString(){return JSON.stringify(this.export(),null,2)}get nodes(){return Array.from(this._graph.keys())}get edges(){let edges=[];return this.forEachEdge(edge=>edges.push(edge)),edges}hasNode(node){return this._graph.has(node)}addNode(node){this._graph.has(node)||this._graph.set(node,{incoming:new Set,outgoing:new Set})}removeNode(node){if(this._graph.has(node)){for(let target of this._graph.get(node).outgoing)this.removeEdge(node,target);for(let source of this._graph.get(node).incoming)this.removeEdge(source,node);this._graph.delete(node)}}forEachNode(callback){for(let node of this._graph.keys())callback(node)}hasEdge(from,to){return!!this._graph.get(from)?.outgoing.has(to)}addEdge(from,to){this.addNode(from),this.addNode(to),this._graph.get(from).outgoing.add(to),this._graph.get(to).incoming.add(from)}removeEdge(from,to){this._graph.has(from)&&this._graph.has(to)&&(this._graph.get(from).outgoing.delete(to),this._graph.get(to).incoming.delete(from))}outDegree(node){return this.hasNode(node)?this._graph.get(node).outgoing.size:-1}inDegree(node){return this.hasNode(node)?this._graph.get(node).incoming.size:-1}forEachOutNeighbor(node,callback){this._graph.get(node)?.outgoing.forEach(callback)}forEachInNeighbor(node,callback){this._graph.get(node)?.incoming.forEach(callback)}forEachEdge(callback){for(let[source,{outgoing}]of this._graph.entries())for(let target of outgoing)callback([source,target])}mergeGraph(other){other.forEachEdge(([source,target])=>{this.addNode(source),this.addNode(target),this.addEdge(source,target)})}updateIncomingEdgesForNode(other,node){this.addNode(node),other.forEachInNeighbor(node,neighbor=>{this.addEdge(neighbor,node)}),this.forEachEdge(([source,target])=>{target===node&&!other.hasEdge(source,target)&&this.removeEdge(source,target)})}removeOrphanNodes(){let orphanNodes=new Set;return this.forEachNode(node=>{this.inDegree(node)===0&&this.outDegree(node)===0&&orphanNodes.add(node)}),orphanNodes.forEach(node=>{this.removeNode(node)}),orphanNodes}getLeafNodes(node){let stack=[node],visited=new Set,leafNodes=new Set;for(;stack.length>0;){let node2=stack.pop();visited.has(node2)||(visited.add(node2),this.outDegree(node2)===0&&leafNodes.add(node2),this.forEachOutNeighbor(node2,neighbor=>{visited.has(neighbor)||stack.push(neighbor)}))}return leafNodes}getLeafNodeAncestors(node){let leafNodes=this.getLeafNodes(node),visited=new Set,upstreamNodes=new Set;return leafNodes.forEach(leafNode=>{let stack=[leafNode];for(;stack.length>0;){let node2=stack.pop();visited.has(node2)||(visited.add(node2),this.outDegree(node2)!==0&&upstreamNodes.add(node2),this.forEachInNeighbor(node2,parentNode=>{visited.has(parentNode)||stack.push(parentNode)}))}}),upstreamNodes}};var parseDependencies=__name((argv,hast,file)=>{let dependencies=[];return visit6(hast,"element",elem=>{let ref=null;if(["script","img","audio","video","source","iframe"].includes(elem.tagName)&&elem?.properties?.src?ref=elem.properties.src.toString():["a","link"].includes(elem.tagName)&&elem?.properties?.href&&(ref=elem.properties.href.toString()),ref===null||!isRelativeURL(ref))return;let fp=path7.join(file.data.filePath,path7.relative(argv.directory,ref)).replace(/\\/g,"/");fp.split("/").pop()?.includes(".")||(fp+=".md"),dependencies.push(fp)}),dependencies},"parseDependencies"),ContentPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultContentPageLayout,pageBody:Content_default(),...userOpts},{head:Head,header,beforeBody,pageBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"ContentPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...left,...right,Footer]},async getDependencyGraph(ctx,content,_resources){let graph=new DepGraph;for(let[tree,file]of content){let sourcePath=file.data.filePath,slug=file.data.slug;graph.addEdge(sourcePath,joinSegments(ctx.argv.output,slug+".html")),parseDependencies(ctx.argv,tree,file).forEach(dep=>{graph.addEdge(dep,sourcePath)})}return graph},async emit(ctx,content,resources){let cfg=ctx.cfg.configuration,fps=[],allFiles=content.map(c=>c[1].data),containsIndex=!1;for(let[tree,file]of content){let slug=file.data.slug;slug==="index"&&(containsIndex=!0);let externalResources=pageResources(pathToRoot(slug),resources),componentData={ctx,fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(cfg,slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug,ext:".html"});fps.push(fp)}return!containsIndex&&!ctx.argv.fastRebuild&&console.log(chalk4.yellow(`
Warning: you seem to be missing an \`index.md\` home page file at the root of your \`${ctx.argv.directory}\` folder. This may cause errors when deploying.`)),fps}}},"ContentPage");import{VFile}from"vfile";function defaultProcessedContent(vfileData){let root={type:"root",children:[]},vfile=new VFile("");return vfile.data=vfileData,[root,vfile]}__name(defaultProcessedContent,"defaultProcessedContent");var TagPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultListPageLayout,pageBody:TagContent_default(),...userOpts},{head:Head,header,beforeBody,pageBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"TagPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...left,...right,Footer]},async getDependencyGraph(ctx,content,_resources){let graph=new DepGraph;for(let[_tree,file]of content){let sourcePath=file.data.filePath,tags=(file.data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes);tags.length>0&&tags.push("index");for(let tag of tags)graph.addEdge(sourcePath,joinSegments(ctx.argv.output,"tags",tag+".html"))}return graph},async emit(ctx,content,resources){let fps=[],allFiles=content.map(c=>c[1].data),cfg=ctx.cfg.configuration,tags=new Set(allFiles.flatMap(data=>data.frontmatter?.tags??[]).flatMap(getAllSegmentPrefixes));tags.add("index");let tagDescriptions=Object.fromEntries([...tags].map(tag=>{let title=tag==="index"?i18n(cfg.locale).pages.tagContent.tagIndex:`${i18n(cfg.locale).pages.tagContent.tag}: ${tag}`;return[tag,defaultProcessedContent({slug:joinSegments("tags",tag),frontmatter:{title,tags:[]}})]}));for(let[tree,file]of content){let slug=file.data.slug;if(slug.startsWith("tags/")){let tag=slug.slice(5);tags.has(tag)&&(tagDescriptions[tag]=[tree,file])}}for(let tag of tags){let slug=joinSegments("tags",tag),externalResources=pageResources(pathToRoot(slug),resources),[tree,file]=tagDescriptions[tag],componentData={ctx,fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(cfg,slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug:file.data.slug,ext:".html"});fps.push(fp)}return fps}}},"TagPage");import path8 from"path";var FolderPage=__name(userOpts=>{let opts={...sharedPageComponents,...defaultListPageLayout,pageBody:FolderContent_default(),...userOpts},{head:Head,header,beforeBody,pageBody,left,right,footer:Footer}=opts,Header2=Header_default(),Body2=Body_default();return{name:"FolderPage",getQuartzComponents(){return[Head,Header2,Body2,...header,...beforeBody,pageBody,...left,...right,Footer]},async getDependencyGraph(_ctx,content,_resources){let graph=new DepGraph;return content.map(([_tree,vfile])=>{let slug=vfile.data.slug,folderName=path8.dirname(slug??"");slug&&folderName!=="."&&folderName!=="tags"&&graph.addEdge(vfile.data.filePath,joinSegments(folderName,"index.html"))}),graph},async emit(ctx,content,resources){let fps=[],allFiles=content.map(c=>c[1].data),cfg=ctx.cfg.configuration,folders=new Set(allFiles.flatMap(data=>{let slug=data.slug,folderName=path8.dirname(slug??"");return slug&&folderName!=="."&&folderName!=="tags"?[folderName]:[]})),folderDescriptions=Object.fromEntries([...folders].map(folder=>[folder,defaultProcessedContent({slug:joinSegments(folder,"index"),frontmatter:{title:`${i18n(cfg.locale).pages.folderContent.folder}: ${folder}`,tags:[]}})]));for(let[tree,file]of content){let slug=stripSlashes(simplifySlug(file.data.slug));folders.has(slug)&&(folderDescriptions[slug]=[tree,file])}for(let folder of folders){let slug=joinSegments(folder,"index"),externalResources=pageResources(pathToRoot(slug),resources),[tree,file]=folderDescriptions[folder],componentData={ctx,fileData:file.data,externalResources,cfg,children:[],tree,allFiles},content2=renderPage(cfg,slug,componentData,opts,externalResources),fp=await write({ctx,content:content2,slug,ext:".html"});fps.push(fp)}return fps}}},"FolderPage");import{toHtml as toHtml2}from"hast-util-to-html";import path9 from"path";var AliasRedirects=__name(()=>({name:"AliasRedirects",getQuartzComponents(){return[]},async getDependencyGraph(ctx,content,_resources){let graph=new DepGraph,{argv}=ctx;for(let[_tree,file]of content){let dir=path9.posix.relative(argv.directory,path9.dirname(file.data.filePath)),slugs=(file.data.frontmatter?.aliases??[]).map(alias=>path9.posix.join(dir,alias)),permalink=file.data.frontmatter?.permalink;typeof permalink=="string"&&slugs.push(permalink);for(let slug of slugs)slug.endsWith("/")&&(slug=joinSegments(slug,"index")),graph.addEdge(file.data.filePath,joinSegments(argv.output,slug+".html"))}return graph},async emit(ctx,content,_resources){let{argv}=ctx,fps=[];for(let[_tree,file]of content){let ogSlug=simplifySlug(file.data.slug),dir=path9.posix.relative(argv.directory,path9.dirname(file.data.filePath)),slugs=(file.data.frontmatter?.aliases??[]).map(alias=>path9.posix.join(dir,alias)),permalink=file.data.frontmatter?.permalink;typeof permalink=="string"&&slugs.push(permalink);for(let slug of slugs){slug.endsWith("/")&&(slug=joinSegments(slug,"index"));let redirUrl=resolveRelative(slug,file.data.slug),fp=await write({ctx,content:`
            <!DOCTYPE html>
            <html lang="en-us">
            <head>
            <title>${ogSlug}</title>
            <link rel="canonical" href="${redirUrl}">
            <meta name="robots" content="noindex">
            <meta charset="utf-8">
            <meta http-equiv="refresh" content="0; url=${redirUrl}">
            </head>
            </html>
            `,slug,ext:".html"});fps.push(fp)}}return fps}}),"AliasRedirects");import path11 from"path";import fs3 from"fs";import path10 from"path";import{globby}from"globby";function toPosixPath(fp){return fp.split(path10.sep).join("/")}__name(toPosixPath,"toPosixPath");async function glob(pattern,cwd,ignorePatterns){return(await globby(pattern,{cwd,ignore:ignorePatterns,gitignore:!0})).map(toPosixPath)}__name(glob,"glob");var filesToCopy=__name(async(argv,cfg)=>await glob("**",argv.directory,["**/*.md",...cfg.configuration.ignorePatterns]),"filesToCopy"),Assets=__name(()=>({name:"Assets",getQuartzComponents(){return[]},async getDependencyGraph(ctx,_content,_resources){let{argv,cfg}=ctx,graph=new DepGraph,fps=await filesToCopy(argv,cfg);for(let fp of fps){let ext=path11.extname(fp),src=joinSegments(argv.directory,fp),name=slugifyFilePath(fp,!0)+ext,dest=joinSegments(argv.output,name);graph.addEdge(src,dest)}return graph},async emit({argv,cfg},_content,_resources){let assetsPath=argv.output,fps=await filesToCopy(argv,cfg),res=[];for(let fp of fps){let ext=path11.extname(fp),src=joinSegments(argv.directory,fp),name=slugifyFilePath(fp,!0)+ext,dest=joinSegments(assetsPath,name),dir=path11.dirname(dest);await fs3.promises.mkdir(dir,{recursive:!0}),await fs3.promises.copyFile(src,dest),res.push(dest)}return res}}),"Assets");import fs4 from"fs";var Static=__name(()=>({name:"Static",getQuartzComponents(){return[]},async getDependencyGraph({argv,cfg},_content,_resources){let graph=new DepGraph,staticPath=joinSegments(QUARTZ,"static"),fps=await glob("**",staticPath,cfg.configuration.ignorePatterns);for(let fp of fps)graph.addEdge(joinSegments("static",fp),joinSegments(argv.output,"static",fp));return graph},async emit({argv,cfg},_content,_resources){let staticPath=joinSegments(QUARTZ,"static"),fps=await glob("**",staticPath,cfg.configuration.ignorePatterns);return await fs4.promises.cp(staticPath,joinSegments(argv.output,"static"),{recursive:!0,dereference:!0}),fps.map(fp=>joinSegments(argv.output,"static",fp))}}),"Static");var spa_inline_default='var O=Object.create;var b=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var _=(u,e)=>()=>(e||u((e={exports:{}}).exports,e),e.exports);var H=(u,e,D,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let F of W(e))!V.call(u,F)&&F!==D&&b(u,F,{get:()=>e[F],enumerable:!(r=$(e,F))||r.enumerable});return u};var q=(u,e,D)=>(D=u!=null?O(I(u)):{},H(e||!u||!u.__esModule?b(D,"default",{value:u,enumerable:!0}):D,u));var T=_((Eu,L)=>{"use strict";L.exports=J;function f(u){return u instanceof Buffer?Buffer.from(u):new u.constructor(u.buffer.slice(),u.byteOffset,u.length)}function J(u){if(u=u||{},u.circles)return X(u);return u.proto?r:D;function e(F,i){for(var t=Object.keys(F),n=new Array(t.length),a=0;a<t.length;a++){var l=t[a],o=F[l];typeof o!="object"||o===null?n[l]=o:o instanceof Date?n[l]=new Date(o):ArrayBuffer.isView(o)?n[l]=f(o):n[l]=i(o)}return n}function D(F){if(typeof F!="object"||F===null)return F;if(F instanceof Date)return new Date(F);if(Array.isArray(F))return e(F,D);if(F instanceof Map)return new Map(e(Array.from(F),D));if(F instanceof Set)return new Set(e(Array.from(F),D));var i={};for(var t in F)if(Object.hasOwnProperty.call(F,t)!==!1){var n=F[t];typeof n!="object"||n===null?i[t]=n:n instanceof Date?i[t]=new Date(n):n instanceof Map?i[t]=new Map(e(Array.from(n),D)):n instanceof Set?i[t]=new Set(e(Array.from(n),D)):ArrayBuffer.isView(n)?i[t]=f(n):i[t]=D(n)}return i}function r(F){if(typeof F!="object"||F===null)return F;if(F instanceof Date)return new Date(F);if(Array.isArray(F))return e(F,r);if(F instanceof Map)return new Map(e(Array.from(F),r));if(F instanceof Set)return new Set(e(Array.from(F),r));var i={};for(var t in F){var n=F[t];typeof n!="object"||n===null?i[t]=n:n instanceof Date?i[t]=new Date(n):n instanceof Map?i[t]=new Map(e(Array.from(n),r)):n instanceof Set?i[t]=new Set(e(Array.from(n),r)):ArrayBuffer.isView(n)?i[t]=f(n):i[t]=r(n)}return i}}function X(u){var e=[],D=[];return u.proto?i:F;function r(t,n){for(var a=Object.keys(t),l=new Array(a.length),o=0;o<a.length;o++){var A=a[o],s=t[A];if(typeof s!="object"||s===null)l[A]=s;else if(s instanceof Date)l[A]=new Date(s);else if(ArrayBuffer.isView(s))l[A]=f(s);else{var S=e.indexOf(s);S!==-1?l[A]=D[S]:l[A]=n(s)}}return l}function F(t){if(typeof t!="object"||t===null)return t;if(t instanceof Date)return new Date(t);if(Array.isArray(t))return r(t,F);if(t instanceof Map)return new Map(r(Array.from(t),F));if(t instanceof Set)return new Set(r(Array.from(t),F));var n={};e.push(t),D.push(n);for(var a in t)if(Object.hasOwnProperty.call(t,a)!==!1){var l=t[a];if(typeof l!="object"||l===null)n[a]=l;else if(l instanceof Date)n[a]=new Date(l);else if(l instanceof Map)n[a]=new Map(r(Array.from(l),F));else if(l instanceof Set)n[a]=new Set(r(Array.from(l),F));else if(ArrayBuffer.isView(l))n[a]=f(l);else{var o=e.indexOf(l);o!==-1?n[a]=D[o]:n[a]=F(l)}}return e.pop(),D.pop(),n}function i(t){if(typeof t!="object"||t===null)return t;if(t instanceof Date)return new Date(t);if(Array.isArray(t))return r(t,i);if(t instanceof Map)return new Map(r(Array.from(t),i));if(t instanceof Set)return new Set(r(Array.from(t),i));var n={};e.push(t),D.push(n);for(var a in t){var l=t[a];if(typeof l!="object"||l===null)n[a]=l;else if(l instanceof Date)n[a]=new Date(l);else if(l instanceof Map)n[a]=new Map(r(Array.from(l),i));else if(l instanceof Set)n[a]=new Set(r(Array.from(l),i));else if(ArrayBuffer.isView(l))n[a]=f(l);else{var o=e.indexOf(l);o!==-1?n[a]=D[o]:n[a]=i(l)}}return e.pop(),D.pop(),n}}});var g=u=>(e,D)=>e[`node${u}`]===D[`node${u}`],z=g("Name"),K=g("Type"),Z=g("Value");function x(u,e){if(u.attributes.length===0&&e.attributes.length===0)return[];let D=[],r=new Map,F=new Map;for(let i of u.attributes)r.set(i.name,i.value);for(let i of e.attributes){let t=r.get(i.name);i.value===t?r.delete(i.name):(typeof t<"u"&&r.delete(i.name),F.set(i.name,i.value))}for(let i of r.keys())D.push({type:5,name:i});for(let[i,t]of F.entries())D.push({type:4,name:i,value:t});return D}function d(u,e=!0){let D=`${u.localName}`;for(let{name:r,value:F}of u.attributes)e&&r.startsWith("data-")||(D+=`[${r}=${F}]`);return D+=u.innerHTML,D}function p(u){switch(u.tagName){case"BASE":case"TITLE":return u.localName;case"META":{if(u.hasAttribute("name"))return`meta[name="${u.getAttribute("name")}"]`;if(u.hasAttribute("property"))return`meta[name="${u.getAttribute("property")}"]`;break}case"LINK":{if(u.hasAttribute("rel")&&u.hasAttribute("href"))return`link[rel="${u.getAttribute("rel")}"][href="${u.getAttribute("href")}"]`;if(u.hasAttribute("href"))return`link[href="${u.getAttribute("href")}"]`;break}}return d(u)}function Q(u){let[e,D=""]=u.split("?");return`${e}?t=${Date.now()}&${D.replace(/t=\\d+/g,"")}`}function E(u){if(u.nodeType===1&&u.hasAttribute("data-persist"))return u;if(u.nodeType===1&&u.localName==="script"){let e=document.createElement("script");for(let{name:D,value:r}of u.attributes)D==="src"&&(r=Q(r)),e.setAttribute(D,r);return e.innerHTML=u.innerHTML,e}return u.cloneNode(!0)}function Y(u,e){if(u.children.length===0&&e.children.length===0)return[];let D=[],r=new Map,F=new Map,i=new Map;for(let t of u.children)r.set(p(t),t);for(let t of e.children){let n=p(t),a=r.get(n);a?d(t,!1)!==d(a,!1)&&F.set(n,E(t)):i.set(n,E(t)),r.delete(n)}for(let t of u.childNodes){if(t.nodeType===1){let n=p(t);if(r.has(n)){D.push({type:1});continue}else if(F.has(n)){let a=F.get(n);D.push({type:3,attributes:x(t,a),children:R(t,a)});continue}}D.push(void 0)}for(let t of i.values())D.push({type:0,node:E(t)});return D}function R(u,e){let D=[],r=Math.max(u.childNodes.length,e.childNodes.length);for(let F=0;F<r;F++){let i=u.childNodes.item(F),t=e.childNodes.item(F);D[F]=c(i,t)}return D}function c(u,e){if(!u)return{type:0,node:E(e)};if(!e)return{type:1};if(K(u,e)){if(u.nodeType===3){let D=u.nodeValue,r=e.nodeValue;if(D.trim().length===0&&r.trim().length===0)return}if(u.nodeType===1){if(z(u,e)){let D=u.tagName==="HEAD"?Y:R;return{type:3,attributes:x(u,e),children:D(u,e)}}return{type:2,node:E(e)}}else return u.nodeType===9?c(u.documentElement,e.documentElement):Z(u,e)?void 0:{type:2,value:e.nodeValue}}return{type:2,node:E(e)}}function G(u,e){if(e.length!==0)for(let{type:D,name:r,value:F}of e)D===5?u.removeAttribute(r):D===4&&u.setAttribute(r,F)}async function h(u,e,D){if(!e)return;let r;switch(u.nodeType===9?(u=u.documentElement,r=u):D?r=D:r=u,e.type){case 0:{let{node:F}=e;u.appendChild(F);return}case 1:{if(!r)return;u.removeChild(r);return}case 2:{if(!r)return;let{node:F,value:i}=e;if(typeof i=="string"){r.nodeValue=i;return}r.replaceWith(F);return}case 3:{if(!r)return;let{attributes:F,children:i}=e;G(r,F);let t=Array.from(r.childNodes);await Promise.all(i.map((n,a)=>h(r,n,t[a])));return}}}function m(u,e){let D=c(u,e);return h(u,D)}var su=Object.hasOwnProperty;var U=q(T(),1),cu=(0,U.default)();function y(u){return u.document.body.dataset.slug}var M=(u,e,D)=>{let r=new URL(u.getAttribute(e),D);u.setAttribute(e,r.pathname+r.hash)};function j(u,e){u.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(D=>M(D,"href",e)),u.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(D=>M(D,"src",e))}var k=1,C=document.createElement("route-announcer"),uu=u=>u?.nodeType===k,eu=u=>{try{let e=new URL(u);if(window.location.origin===e.origin)return!0}catch{}return!1},tu=u=>{let e=u.origin===window.location.origin,D=u.pathname===window.location.pathname;return e&&D},N=({target:u})=>{if(!uu(u)||u.attributes.getNamedItem("target")?.value==="_blank")return;let e=u.closest("a");if(!e||"routerIgnore"in e.dataset)return;let{href:D}=e;if(eu(D))return{url:new URL(D),scroll:"routerNoscroll"in e.dataset?!1:void 0}};function P(u){let e=new CustomEvent("nav",{detail:{url:u}});document.dispatchEvent(e)}var v=new Set;window.addCleanup=u=>v.add(u);var w;async function B(u,e=!1){w=w||new DOMParser;let D=await fetch(`${u}`).then(n=>{if(n.headers.get("content-type")?.startsWith("text/html"))return n.text();window.location.assign(u)}).catch(()=>{window.location.assign(u)});if(!D)return;v.forEach(n=>n()),v.clear();let r=w.parseFromString(D,"text/html");j(r,u);let F=r.querySelector("title")?.textContent;if(F)document.title=F;else{let n=document.querySelector("h1");F=n?.innerText??n?.textContent??u.pathname}C.textContent!==F&&(C.textContent=F),C.dataset.persist="",r.body.appendChild(C),m(document.body,r.body),e||(u.hash?document.getElementById(decodeURIComponent(u.hash.substring(1)))?.scrollIntoView():window.scrollTo({top:0})),document.head.querySelectorAll(":not([spa-preserve])").forEach(n=>n.remove()),r.head.querySelectorAll(":not([spa-preserve])").forEach(n=>document.head.appendChild(n)),e||history.pushState({},"",u),P(y(window)),delete C.dataset.persist}window.spaNavigate=B;function Du(){return typeof window<"u"&&(window.addEventListener("click",async u=>{let{url:e}=N(u)??{};if(!(!e||u.ctrlKey||u.metaKey)){if(u.preventDefault(),tu(e)&&e.hash){document.getElementById(decodeURIComponent(e.hash.substring(1)))?.scrollIntoView(),history.pushState({},"",e);return}try{B(e,!1)}catch{window.location.assign(e)}}}),window.addEventListener("popstate",u=>{let{url:e}=N(u)??{};if(!(window.location.hash&&window.location.pathname===e?.pathname))try{B(new URL(window.location.toString()),!0)}catch{window.location.reload()}})),new class{go(e){let D=new URL(e,window.location.toString());return B(D,!1)}back(){return window.history.back()}forward(){return window.history.forward()}}}Du();P(y(window));if(!customElements.get("route-announcer")){let u={"aria-live":"assertive","aria-atomic":"true",style:"position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"};customElements.define("route-announcer",class extends HTMLElement{constructor(){super()}connectedCallback(){for(let[D,r]of Object.entries(u))this.setAttribute(D,r)}})}\n';var popover_inline_default='var qt=Object.create;var Ft=Object.defineProperty;var Kt=Object.getOwnPropertyDescriptor;var Zt=Object.getOwnPropertyNames;var Qt=Object.getPrototypeOf,Gt=Object.prototype.hasOwnProperty;var Jt=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var te=(t,e,n,u)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Zt(e))!Gt.call(t,i)&&i!==n&&Ft(t,i,{get:()=>e[i],enumerable:!(u=Kt(e,i))||u.enumerable});return t};var ee=(t,e,n)=>(n=t!=null?qt(Qt(t)):{},te(e||!t||!t.__esModule?Ft(n,"default",{value:t,enumerable:!0}):n,t));var zt=Jt((qe,_t)=>{"use strict";_t.exports=Be;function X(t){return t instanceof Buffer?Buffer.from(t):new t.constructor(t.buffer.slice(),t.byteOffset,t.length)}function Be(t){if(t=t||{},t.circles)return xe(t);return t.proto?u:n;function e(i,r){for(var o=Object.keys(i),s=new Array(o.length),c=0;c<o.length;c++){var l=o[c],D=i[l];typeof D!="object"||D===null?s[l]=D:D instanceof Date?s[l]=new Date(D):ArrayBuffer.isView(D)?s[l]=X(D):s[l]=r(D)}return s}function n(i){if(typeof i!="object"||i===null)return i;if(i instanceof Date)return new Date(i);if(Array.isArray(i))return e(i,n);if(i instanceof Map)return new Map(e(Array.from(i),n));if(i instanceof Set)return new Set(e(Array.from(i),n));var r={};for(var o in i)if(Object.hasOwnProperty.call(i,o)!==!1){var s=i[o];typeof s!="object"||s===null?r[o]=s:s instanceof Date?r[o]=new Date(s):s instanceof Map?r[o]=new Map(e(Array.from(s),n)):s instanceof Set?r[o]=new Set(e(Array.from(s),n)):ArrayBuffer.isView(s)?r[o]=X(s):r[o]=n(s)}return r}function u(i){if(typeof i!="object"||i===null)return i;if(i instanceof Date)return new Date(i);if(Array.isArray(i))return e(i,u);if(i instanceof Map)return new Map(e(Array.from(i),u));if(i instanceof Set)return new Set(e(Array.from(i),u));var r={};for(var o in i){var s=i[o];typeof s!="object"||s===null?r[o]=s:s instanceof Date?r[o]=new Date(s):s instanceof Map?r[o]=new Map(e(Array.from(s),u)):s instanceof Set?r[o]=new Set(e(Array.from(s),u)):ArrayBuffer.isView(s)?r[o]=X(s):r[o]=u(s)}return r}}function xe(t){var e=[],n=[];return t.proto?r:i;function u(o,s){for(var c=Object.keys(o),l=new Array(c.length),D=0;D<c.length;D++){var a=c[D],F=o[a];if(typeof F!="object"||F===null)l[a]=F;else if(F instanceof Date)l[a]=new Date(F);else if(ArrayBuffer.isView(F))l[a]=X(F);else{var f=e.indexOf(F);f!==-1?l[a]=n[f]:l[a]=s(F)}}return l}function i(o){if(typeof o!="object"||o===null)return o;if(o instanceof Date)return new Date(o);if(Array.isArray(o))return u(o,i);if(o instanceof Map)return new Map(u(Array.from(o),i));if(o instanceof Set)return new Set(u(Array.from(o),i));var s={};e.push(o),n.push(s);for(var c in o)if(Object.hasOwnProperty.call(o,c)!==!1){var l=o[c];if(typeof l!="object"||l===null)s[c]=l;else if(l instanceof Date)s[c]=new Date(l);else if(l instanceof Map)s[c]=new Map(u(Array.from(l),i));else if(l instanceof Set)s[c]=new Set(u(Array.from(l),i));else if(ArrayBuffer.isView(l))s[c]=X(l);else{var D=e.indexOf(l);D!==-1?s[c]=n[D]:s[c]=i(l)}}return e.pop(),n.pop(),s}function r(o){if(typeof o!="object"||o===null)return o;if(o instanceof Date)return new Date(o);if(Array.isArray(o))return u(o,r);if(o instanceof Map)return new Map(u(Array.from(o),r));if(o instanceof Set)return new Set(u(Array.from(o),r));var s={};e.push(o),n.push(s);for(var c in o){var l=o[c];if(typeof l!="object"||l===null)s[c]=l;else if(l instanceof Date)s[c]=new Date(l);else if(l instanceof Map)s[c]=new Map(u(Array.from(l),r));else if(l instanceof Set)s[c]=new Set(u(Array.from(l),r));else if(ArrayBuffer.isView(l))s[c]=X(l);else{var D=e.indexOf(l);D!==-1?s[c]=n[D]:s[c]=r(l)}}return e.pop(),n.pop(),s}}});var j=Math.min,y=Math.max,K=Math.round;var L=t=>({x:t,y:t}),ue={left:"right",right:"left",bottom:"top",top:"bottom"},ne={start:"end",end:"start"};function lt(t,e,n){return y(t,j(e,n))}function Z(t,e){return typeof t=="function"?t(e):t}function T(t){return t.split("-")[0]}function nt(t){return t.split("-")[1]}function ct(t){return t==="x"?"y":"x"}function Dt(t){return t==="y"?"height":"width"}function Q(t){return["top","bottom"].includes(T(t))?"y":"x"}function at(t){return ct(Q(t))}function mt(t,e,n){n===void 0&&(n=!1);let u=nt(t),i=at(t),r=Dt(i),o=i==="x"?u===(n?"end":"start")?"right":"left":u==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(o=q(o)),[o,q(o)]}function dt(t){let e=q(t);return[ut(t),e,ut(e)]}function ut(t){return t.replace(/start|end/g,e=>ne[e])}function ie(t,e,n){let u=["left","right"],i=["right","left"],r=["top","bottom"],o=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:u:e?u:i;case"left":case"right":return e?r:o;default:return[]}}function At(t,e,n,u){let i=nt(t),r=ie(T(t),n==="start",u);return i&&(r=r.map(o=>o+"-"+i),e&&(r=r.concat(r.map(ut)))),r}function q(t){return t.replace(/left|right|bottom|top/g,e=>ue[e])}function oe(t){return{top:0,right:0,bottom:0,left:0,...t}}function ft(t){return typeof t!="number"?oe(t):{top:t,right:t,bottom:t,left:t}}function P(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function gt(t,e,n){let{reference:u,floating:i}=t,r=Q(e),o=at(e),s=Dt(o),c=T(e),l=r==="y",D=u.x+u.width/2-i.width/2,a=u.y+u.height/2-i.height/2,F=u[s]/2-i[s]/2,f;switch(c){case"top":f={x:D,y:u.y-i.height};break;case"bottom":f={x:D,y:u.y+u.height};break;case"right":f={x:u.x+u.width,y:a};break;case"left":f={x:u.x-i.width,y:a};break;default:f={x:u.x,y:u.y}}switch(nt(e)){case"start":f[o]-=F*(n&&l?-1:1);break;case"end":f[o]+=F*(n&&l?-1:1);break}return f}var pt=async(t,e,n)=>{let{placement:u="bottom",strategy:i="absolute",middleware:r=[],platform:o}=n,s=r.filter(Boolean),c=await(o.isRTL==null?void 0:o.isRTL(e)),l=await o.getElementRects({reference:t,floating:e,strategy:i}),{x:D,y:a}=gt(l,u,c),F=u,f={},m=0;for(let A=0;A<s.length;A++){let{name:d,fn:p}=s[A],{x:g,y:E,data:h,reset:C}=await p({x:D,y:a,initialPlacement:u,placement:F,strategy:i,middlewareData:f,rects:l,platform:o,elements:{reference:t,floating:e}});D=g??D,a=E??a,f={...f,[d]:{...f[d],...h}},C&&m<=50&&(m++,typeof C=="object"&&(C.placement&&(F=C.placement),C.rects&&(l=C.rects===!0?await o.getElementRects({reference:t,floating:e,strategy:i}):C.rects),{x:D,y:a}=gt(l,F,c)),A=-1)}return{x:D,y:a,placement:F,strategy:i,middlewareData:f}};async function Et(t,e){var n;e===void 0&&(e={});let{x:u,y:i,platform:r,rects:o,elements:s,strategy:c}=t,{boundary:l="clippingAncestors",rootBoundary:D="viewport",elementContext:a="floating",altBoundary:F=!1,padding:f=0}=Z(e,t),m=ft(f),d=s[F?a==="floating"?"reference":"floating":a],p=P(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(d)))==null||n?d:d.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(s.floating)),boundary:l,rootBoundary:D,strategy:c})),g=a==="floating"?{...o.floating,x:u,y:i}:o.reference,E=await(r.getOffsetParent==null?void 0:r.getOffsetParent(s.floating)),h=await(r.isElement==null?void 0:r.isElement(E))?await(r.getScale==null?void 0:r.getScale(E))||{x:1,y:1}:{x:1,y:1},C=P(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:g,offsetParent:E,strategy:c}):g);return{top:(p.top-C.top+m.top)/h.y,bottom:(C.bottom-p.bottom+m.bottom)/h.y,left:(p.left-C.left+m.left)/h.x,right:(C.right-p.right+m.right)/h.x}}var Ct=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,u;let{placement:i,middlewareData:r,rects:o,initialPlacement:s,platform:c,elements:l}=e,{mainAxis:D=!0,crossAxis:a=!0,fallbackPlacements:F,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:A=!0,...d}=Z(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};let p=T(i),g=T(s)===s,E=await(c.isRTL==null?void 0:c.isRTL(l.floating)),h=F||(g||!A?[q(s)]:dt(s));!F&&m!=="none"&&h.push(...At(s,A,m,E));let C=[s,...h],N=await Et(e,d),U=[],$=((u=r.flip)==null?void 0:u.overflows)||[];if(D&&U.push(N[p]),a){let b=mt(i,o,E);U.push(N[b[0]],N[b[1]])}if($=[...$,{placement:i,overflows:U}],!U.every(b=>b<=0)){var et,x;let b=(((et=r.flip)==null?void 0:et.index)||0)+1,I=C[b];if(I)return{data:{index:b,overflows:$},reset:{placement:I}};let H=(x=$.filter(S=>S.overflows[0]<=0).sort((S,O)=>S.overflows[1]-O.overflows[1])[0])==null?void 0:x.placement;if(!H)switch(f){case"bestFit":{var z;let S=(z=$.map(O=>[O.placement,O.overflows.filter(V=>V>0).reduce((V,st)=>V+st,0)]).sort((O,V)=>O[1]-V[1])[0])==null?void 0:z[0];S&&(H=S);break}case"initialPlacement":H=s;break}if(i!==H)return{reset:{placement:H}}}return{}}}};function ht(t){let e=j(...t.map(r=>r.left)),n=j(...t.map(r=>r.top)),u=y(...t.map(r=>r.right)),i=y(...t.map(r=>r.bottom));return{x:e,y:n,width:u-e,height:i-n}}function re(t){let e=t.slice().sort((i,r)=>i.y-r.y),n=[],u=null;for(let i=0;i<e.length;i++){let r=e[i];!u||r.y-u.y>u.height/2?n.push([r]):n[n.length-1].push(r),u=r}return n.map(i=>P(ht(i)))}var Bt=function(t){return t===void 0&&(t={}),{name:"inline",options:t,async fn(e){let{placement:n,elements:u,rects:i,platform:r,strategy:o}=e,{padding:s=2,x:c,y:l}=Z(t,e),D=Array.from(await(r.getClientRects==null?void 0:r.getClientRects(u.reference))||[]),a=re(D),F=P(ht(D)),f=ft(s);function m(){if(a.length===2&&a[0].left>a[1].right&&c!=null&&l!=null)return a.find(d=>c>d.left-f.left&&c<d.right+f.right&&l>d.top-f.top&&l<d.bottom+f.bottom)||F;if(a.length>=2){if(Q(n)==="y"){let x=a[0],z=a[a.length-1],b=T(n)==="top",I=x.top,H=z.bottom,S=b?x.left:z.left,O=b?x.right:z.right,V=O-S,st=H-I;return{top:I,bottom:H,left:S,right:O,width:V,height:st,x:S,y:I}}let d=T(n)==="left",p=y(...a.map(x=>x.right)),g=j(...a.map(x=>x.left)),E=a.filter(x=>d?x.left===g:x.right===p),h=E[0].top,C=E[E.length-1].bottom,N=g,U=p,$=U-N,et=C-h;return{top:h,bottom:C,left:N,right:U,width:$,height:et,x:N,y:h}}return F}let A=await r.getElementRects({reference:{getBoundingClientRect:m},floating:u.floating,strategy:o});return i.reference.x!==A.reference.x||i.reference.y!==A.reference.y||i.reference.width!==A.reference.width||i.reference.height!==A.reference.height?{reset:{rects:A}}:{}}}};var xt=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:n,y:u,placement:i}=e,{mainAxis:r=!0,crossAxis:o=!1,limiter:s={fn:d=>{let{x:p,y:g}=d;return{x:p,y:g}}},...c}=Z(t,e),l={x:n,y:u},D=await Et(e,c),a=Q(T(i)),F=ct(a),f=l[F],m=l[a];if(r){let d=F==="y"?"top":"left",p=F==="y"?"bottom":"right",g=f+D[d],E=f-D[p];f=lt(g,f,E)}if(o){let d=a==="y"?"top":"left",p=a==="y"?"bottom":"right",g=m+D[d],E=m-D[p];m=lt(g,m,E)}let A=s.fn({...e,[F]:f,[a]:m});return{...A,data:{x:A.x-n,y:A.y-u}}}}};function M(t){return yt(t)?(t.nodeName||"").toLowerCase():"#document"}function B(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function W(t){var e;return(e=(yt(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function yt(t){return t instanceof Node||t instanceof B(t).Node}function R(t){return t instanceof Element||t instanceof B(t).Element}function v(t){return t instanceof HTMLElement||t instanceof B(t).HTMLElement}function wt(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof B(t).ShadowRoot}function k(t){let{overflow:e,overflowX:n,overflowY:u,display:i}=w(t);return/auto|scroll|overlay|hidden|clip/.test(e+u+n)&&!["inline","contents"].includes(i)}function vt(t){return["table","td","th"].includes(M(t))}function ot(t){let e=rt(),n=w(t);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(u=>(n.willChange||"").includes(u))||["paint","layout","strict","content"].some(u=>(n.contain||"").includes(u))}function bt(t){let e=_(t);for(;v(e)&&!G(e);){if(ot(e))return e;e=_(e)}return null}function rt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function G(t){return["html","body","#document"].includes(M(t))}function w(t){return B(t).getComputedStyle(t)}function J(t){return R(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function _(t){if(M(t)==="html")return t;let e=t.assignedSlot||t.parentNode||wt(t)&&t.host||W(t);return wt(e)?e.host:e}function St(t){let e=_(t);return G(e)?t.ownerDocument?t.ownerDocument.body:t.body:v(e)&&k(e)?e:St(e)}function it(t,e,n){var u;e===void 0&&(e=[]),n===void 0&&(n=!0);let i=St(t),r=i===((u=t.ownerDocument)==null?void 0:u.body),o=B(i);return r?e.concat(o,o.visualViewport||[],k(i)?i:[],o.frameElement&&n?it(o.frameElement):[]):e.concat(i,it(i,[],n))}function Lt(t){let e=w(t),n=parseFloat(e.width)||0,u=parseFloat(e.height)||0,i=v(t),r=i?t.offsetWidth:n,o=i?t.offsetHeight:u,s=K(n)!==r||K(u)!==o;return s&&(n=r,u=o),{width:n,height:u,$:s}}function Tt(t){return R(t)?t:t.contextElement}function Y(t){let e=Tt(t);if(!v(e))return L(1);let n=e.getBoundingClientRect(),{width:u,height:i,$:r}=Lt(e),o=(r?K(n.width):n.width)/u,s=(r?K(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var se=L(0);function Pt(t){let e=B(t);return!rt()||!e.visualViewport?se:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function le(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==B(t)?!1:e}function tt(t,e,n,u){e===void 0&&(e=!1),n===void 0&&(n=!1);let i=t.getBoundingClientRect(),r=Tt(t),o=L(1);e&&(u?R(u)&&(o=Y(u)):o=Y(t));let s=le(r,n,u)?Pt(r):L(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,D=i.width/o.x,a=i.height/o.y;if(r){let F=B(r),f=u&&R(u)?B(u):u,m=F,A=m.frameElement;for(;A&&u&&f!==m;){let d=Y(A),p=A.getBoundingClientRect(),g=w(A),E=p.left+(A.clientLeft+parseFloat(g.paddingLeft))*d.x,h=p.top+(A.clientTop+parseFloat(g.paddingTop))*d.y;c*=d.x,l*=d.y,D*=d.x,a*=d.y,c+=E,l+=h,m=B(A),A=m.frameElement}}return P({width:D,height:a,x:c,y:l})}var ce=[":popover-open",":modal"];function Mt(t){return ce.some(e=>{try{return t.matches(e)}catch{return!1}})}function De(t){let{elements:e,rect:n,offsetParent:u,strategy:i}=t,r=i==="fixed",o=W(u),s=e?Mt(e.floating):!1;if(u===o||s&&r)return n;let c={scrollLeft:0,scrollTop:0},l=L(1),D=L(0),a=v(u);if((a||!a&&!r)&&((M(u)!=="body"||k(o))&&(c=J(u)),v(u))){let F=tt(u);l=Y(u),D.x=F.x+u.clientLeft,D.y=F.y+u.clientTop}return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+D.x,y:n.y*l.y-c.scrollTop*l.y+D.y}}function ae(t){return Array.from(t.getClientRects())}function Wt(t){return tt(W(t)).left+J(t).scrollLeft}function fe(t){let e=W(t),n=J(t),u=t.ownerDocument.body,i=y(e.scrollWidth,e.clientWidth,u.scrollWidth,u.clientWidth),r=y(e.scrollHeight,e.clientHeight,u.scrollHeight,u.clientHeight),o=-n.scrollLeft+Wt(t),s=-n.scrollTop;return w(u).direction==="rtl"&&(o+=y(e.clientWidth,u.clientWidth)-i),{width:i,height:r,x:o,y:s}}function Fe(t,e){let n=B(t),u=W(t),i=n.visualViewport,r=u.clientWidth,o=u.clientHeight,s=0,c=0;if(i){r=i.width,o=i.height;let l=rt();(!l||l&&e==="fixed")&&(s=i.offsetLeft,c=i.offsetTop)}return{width:r,height:o,x:s,y:c}}function me(t,e){let n=tt(t,!0,e==="fixed"),u=n.top+t.clientTop,i=n.left+t.clientLeft,r=v(t)?Y(t):L(1),o=t.clientWidth*r.x,s=t.clientHeight*r.y,c=i*r.x,l=u*r.y;return{width:o,height:s,x:c,y:l}}function Rt(t,e,n){let u;if(e==="viewport")u=Fe(t,n);else if(e==="document")u=fe(W(t));else if(R(e))u=me(e,n);else{let i=Pt(t);u={...e,x:e.x-i.x,y:e.y-i.y}}return P(u)}function Ht(t,e){let n=_(t);return n===e||!R(n)||G(n)?!1:w(n).position==="fixed"||Ht(n,e)}function de(t,e){let n=e.get(t);if(n)return n;let u=it(t,[],!1).filter(s=>R(s)&&M(s)!=="body"),i=null,r=w(t).position==="fixed",o=r?_(t):t;for(;R(o)&&!G(o);){let s=w(o),c=ot(o);!c&&s.position==="fixed"&&(i=null),(r?!c&&!i:!c&&s.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||k(o)&&!c&&Ht(t,o))?u=u.filter(D=>D!==o):i=s,o=_(o)}return e.set(t,u),u}function Ae(t){let{element:e,boundary:n,rootBoundary:u,strategy:i}=t,o=[...n==="clippingAncestors"?de(e,this._c):[].concat(n),u],s=o[0],c=o.reduce((l,D)=>{let a=Rt(e,D,i);return l.top=y(a.top,l.top),l.right=j(a.right,l.right),l.bottom=j(a.bottom,l.bottom),l.left=y(a.left,l.left),l},Rt(e,s,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function ge(t){let{width:e,height:n}=Lt(t);return{width:e,height:n}}function pe(t,e,n){let u=v(e),i=W(e),r=n==="fixed",o=tt(t,!0,r,e),s={scrollLeft:0,scrollTop:0},c=L(0);if(u||!u&&!r)if((M(e)!=="body"||k(i))&&(s=J(e)),u){let a=tt(e,!0,r,e);c.x=a.x+e.clientLeft,c.y=a.y+e.clientTop}else i&&(c.x=Wt(i));let l=o.left+s.scrollLeft-c.x,D=o.top+s.scrollTop-c.y;return{x:l,y:D,width:o.width,height:o.height}}function Ot(t,e){return!v(t)||w(t).position==="fixed"?null:e?e(t):t.offsetParent}function jt(t,e){let n=B(t);if(!v(t)||Mt(t))return n;let u=Ot(t,e);for(;u&&vt(u)&&w(u).position==="static";)u=Ot(u,e);return u&&(M(u)==="html"||M(u)==="body"&&w(u).position==="static"&&!ot(u))?n:u||bt(t)||n}var Ee=async function(t){let e=this.getOffsetParent||jt,n=this.getDimensions;return{reference:pe(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,...await n(t.floating)}}};function Ce(t){return w(t).direction==="rtl"}var he={convertOffsetParentRelativeRectToViewportRelativeRect:De,getDocumentElement:W,getClippingRect:Ae,getOffsetParent:jt,getElementRects:Ee,getClientRects:ae,getDimensions:ge,getScale:Y,isElement:R,isRTL:Ce};var Nt=xt,Ut=Ct;var $t=Bt;var Vt=(t,e,n)=>{let u=new Map,i={platform:he,...n},r={...i.platform,_c:u};return pt(t,e,{...i,platform:r})};var Ye=Object.hasOwnProperty;var kt=ee(zt(),1),Qe=(0,kt.default)();var It=(t,e,n)=>{let u=new URL(t.getAttribute(e),n);t.setAttribute(e,u.pathname+u.hash)};function Yt(t,e){t.querySelectorAll(\'[href^="./"], [href^="../"]\').forEach(n=>It(n,"href",e)),t.querySelectorAll(\'[src^="./"], [src^="../"]\').forEach(n=>It(n,"src",e))}var we=new DOMParser;async function Xt({clientX:t,clientY:e}){let n=this;if(n.dataset.noPopover==="true")return;async function u(m){let{x:A,y:d}=await Vt(n,m,{middleware:[$t({x:t,y:e}),Nt(),Ut()]});Object.assign(m.style,{left:`${A}px`,top:`${d}px`})}let i=()=>[...n.children].some(m=>m.classList.contains("popover"));if(i())return u(n.lastChild);let r=new URL(document.location.href);r.hash="",r.search="";let o=new URL(n.href),s=o.hash;o.hash="",o.search="";let c=await fetch(`${o}`).catch(m=>{console.error(m)});if(i()||!c)return;let[l]=c.headers.get("Content-Type").split(";"),[D,a]=l.split("/"),F=document.createElement("div");F.classList.add("popover");let f=document.createElement("div");switch(f.classList.add("popover-inner"),F.appendChild(f),f.dataset.contentType=l??void 0,D){case"image":let m=document.createElement("img");m.src=o.toString(),m.alt=o.pathname,f.appendChild(m);break;case"application":switch(a){case"pdf":let g=document.createElement("iframe");g.src=o.toString(),f.appendChild(g);break;default:break}break;default:let A=await c.text(),d=we.parseFromString(A,"text/html");Yt(d,o);let p=[...d.getElementsByClassName("popover-hint")];if(p.length===0)return;p.forEach(g=>f.appendChild(g))}if(u(F),n.appendChild(F),s!==""){let m=f.querySelector(s);m&&f.scroll({top:m.offsetTop-12,behavior:"instant"})}}document.addEventListener("nav",()=>{let t=[...document.getElementsByClassName("internal")];for(let e of t)e.addEventListener("mouseenter",Xt),window.addCleanup(()=>e.removeEventListener("mouseenter",Xt))});\n';var custom_default=`code[data-theme*=" "] {
  color: var(--shiki-light);
  background-color: var(--shiki-light-bg);
}

code[data-theme*=" "] span {
  color: var(--shiki-light);
}

[saved-theme=dark] code[data-theme*=" "] {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
}

[saved-theme=dark] code[data-theme*=" "] span {
  color: var(--shiki-dark);
}

.callout {
  border: 1px solid var(--border);
  background-color: var(--bg);
  border-radius: 5px;
  padding: 0 1rem;
  overflow-y: hidden;
  transition: max-height 0.3s ease;
  box-sizing: border-box;
  --callout-icon-note: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg>');
  --callout-icon-abstract: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>');
  --callout-icon-info: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>');
  --callout-icon-todo: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>');
  --callout-icon-tip: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> ');
  --callout-icon-success: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ');
  --callout-icon-question: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> ');
  --callout-icon-warning: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>');
  --callout-icon-failure: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> ');
  --callout-icon-danger: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> ');
  --callout-icon-bug: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1 2"></path><path d="m14 4-1 2"></path></svg>');
  --callout-icon-example: url('data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> ');
  --callout-icon-quote: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>');
  --callout-icon-fold: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolyline points="6 9 12 15 18 9"%3E%3C/polyline%3E%3C/svg%3E');
}
.callout > *:nth-child(2) {
  margin-top: 0;
}
.callout[data-callout] {
  --color: #448aff;
  --border: #448aff44;
  --bg: #448aff10;
  --callout-icon: var(--callout-icon-note);
}
.callout[data-callout=abstract] {
  --color: #00b0ff;
  --border: #00b0ff44;
  --bg: #00b0ff10;
  --callout-icon: var(--callout-icon-abstract);
}
.callout[data-callout=info], .callout[data-callout=todo] {
  --color: #00b8d4;
  --border: #00b8d444;
  --bg: #00b8d410;
  --callout-icon: var(--callout-icon-info);
}
.callout[data-callout=todo] {
  --callout-icon: var(--callout-icon-todo);
}
.callout[data-callout=tip] {
  --color: #00bfa5;
  --border: #00bfa544;
  --bg: #00bfa510;
  --callout-icon: var(--callout-icon-tip);
}
.callout[data-callout=success] {
  --color: #09ad7a;
  --border: #09ad7144;
  --bg: #09ad7110;
  --callout-icon: var(--callout-icon-success);
}
.callout[data-callout=question] {
  --color: #dba642;
  --border: #dba64244;
  --bg: #dba64210;
  --callout-icon: var(--callout-icon-question);
}
.callout[data-callout=warning] {
  --color: #db8942;
  --border: #db894244;
  --bg: #db894210;
  --callout-icon: var(--callout-icon-warning);
}
.callout[data-callout=failure], .callout[data-callout=danger], .callout[data-callout=bug] {
  --color: #db4242;
  --border: #db424244;
  --bg: #db424210;
  --callout-icon: var(--callout-icon-failure);
}
.callout[data-callout=bug] {
  --callout-icon: var(--callout-icon-bug);
}
.callout[data-callout=danger] {
  --callout-icon: var(--callout-icon-danger);
}
.callout[data-callout=example] {
  --color: #7a43b5;
  --border: #7a43b544;
  --bg: #7a43b510;
  --callout-icon: var(--callout-icon-example);
}
.callout[data-callout=quote] {
  --color: var(--secondary);
  --border: var(--lightgray);
  --callout-icon: var(--callout-icon-quote);
}
.callout.is-collapsed > .callout-title > .fold-callout-icon {
  transform: rotateZ(-90deg);
}

.callout-title {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  padding: 1rem 0;
  color: var(--color);
  --icon-size: 18px;
}
.callout-title .fold-callout-icon {
  transition: transform 0.15s ease;
  opacity: 0.8;
  cursor: pointer;
  --callout-icon: var(--callout-icon-fold);
}
.callout-title > .callout-title-inner > p {
  color: var(--color);
  margin: 0;
}
.callout-title .callout-icon, .callout-title .fold-callout-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  flex: 0 0 var(--icon-size);
  background-size: var(--icon-size) var(--icon-size);
  background-position: center;
  background-color: var(--color);
  mask-image: var(--callout-icon);
  mask-size: var(--icon-size) var(--icon-size);
  mask-position: center;
  mask-repeat: no-repeat;
  padding: 0.2rem 0;
}
.callout-title .callout-title-inner {
  font-weight: 600;
}

html {
  scroll-behavior: smooth;
  text-size-adjust: none;
  overflow-x: hidden;
  width: 100vw;
}

body,
section {
  margin: 0;
  max-width: 100%;
  box-sizing: border-box;
  background-color: var(--light);
  font-family: var(--bodyFont);
  color: var(--darkgray);
}

.text-highlight {
  background-color: rgba(255, 242, 54, 0.5333333333);
  padding: 0 0.1rem;
  border-radius: 5px;
}

::selection {
  background: color-mix(in srgb, var(--tertiary) 60%, rgba(255, 255, 255, 0));
  color: var(--darkgray);
}

p,
ul,
text,
a,
tr,
td,
li,
ol,
ul,
.katex,
.math {
  color: var(--darkgray);
  fill: var(--darkgray);
  overflow-wrap: anywhere;
  hyphens: auto;
}

.math.math-display {
  text-align: center;
}

strong {
  font-weight: 600;
}

a {
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
  color: var(--secondary);
}
a:hover {
  color: var(--tertiary) !important;
}
a.internal {
  text-decoration: none;
  background-color: var(--highlight);
  padding: 0 0.1rem;
  border-radius: 5px;
  line-height: 1.4rem;
}
a.internal:has(> img) {
  background-color: none;
  border-radius: 0;
  padding: 0;
}
a.internal.tag-link::before {
  content: "#";
}
a.external .external-icon {
  height: 1ex;
  margin: 0 0.15em;
}
a.external .external-icon > path {
  fill: var(--dark);
}

.desktop-only {
  display: initial;
}
@media all and (max-width: 1510px) {
  .desktop-only {
    display: none;
  }
}

.mobile-only {
  display: none;
}
@media all and (max-width: 1510px) {
  .mobile-only {
    display: initial;
  }
}

@media all and (max-width: 1510px) {
  .page {
    margin: 0 auto;
    padding: 0 1rem;
    max-width: 750px;
  }
}
.page article > h1 {
  font-size: 2rem;
}
.page article li:has(> input[type=checkbox]) {
  list-style-type: none;
  padding-left: 0;
}
.page article li:has(> input[type=checkbox]:checked) {
  text-decoration: line-through;
  text-decoration-color: var(--gray);
  color: var(--gray);
}
.page article li > * {
  margin-top: 0;
  margin-bottom: 0;
}
.page article p > strong {
  color: var(--dark);
}
.page > #quartz-body {
  width: 100%;
  display: flex;
}
@media all and (max-width: 1510px) {
  .page > #quartz-body {
    flex-direction: column;
  }
}
.page > #quartz-body .sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  top: 0;
  width: 380px;
  margin-top: 6rem;
  box-sizing: border-box;
  padding: 0 4rem;
  position: fixed;
}
@media all and (max-width: 1510px) {
  .page > #quartz-body .sidebar {
    position: initial;
    flex-direction: row;
    padding: 0;
    width: initial;
    margin-top: 2rem;
  }
}
.page > #quartz-body .sidebar.left {
  left: calc((100vw - 750px) / 2 - 380px);
}
@media all and (max-width: 1510px) {
  .page > #quartz-body .sidebar.left {
    gap: 0;
    align-items: center;
  }
}
.page > #quartz-body .sidebar.right {
  right: calc((100vw - 750px) / 2 - 380px);
  flex-wrap: wrap;
}
@media all and (max-width: 1510px) {
  .page > #quartz-body .sidebar.right > * {
    flex: 1;
    min-width: 140px;
  }
}
.page .page-header {
  width: 750px;
  margin: 6rem auto 0 auto;
}
@media all and (max-width: 1510px) {
  .page .page-header {
    width: initial;
    margin-top: 2rem;
  }
}
.page .center, .page footer {
  margin-left: auto;
  margin-right: auto;
  width: 750px;
}
@media all and (max-width: 1510px) {
  .page .center, .page footer {
    width: initial;
    margin-left: 0;
    margin-right: 0;
  }
}

.footnotes {
  margin-top: 2rem;
  border-top: 1px solid var(--lightgray);
}

input[type=checkbox] {
  transform: translateY(2px);
  color: var(--secondary);
  border: 1px solid var(--lightgray);
  border-radius: 3px;
  background-color: var(--light);
  position: relative;
  margin-inline-end: 0.2rem;
  margin-inline-start: -1.4rem;
  appearance: none;
  width: 16px;
  height: 16px;
}
input[type=checkbox]:checked {
  border-color: var(--secondary);
  background-color: var(--secondary);
}
input[type=checkbox]:checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  display: block;
  border: solid var(--light);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

blockquote {
  margin: 1rem 0;
  border-left: 3px solid var(--secondary);
  padding-left: 1rem;
  transition: border-color 0.2s ease;
}

h1,
h2,
h3,
h4,
h5,
h6,
thead {
  font-family: var(--headerFont);
  color: var(--dark);
  font-weight: revert;
  margin-bottom: 0;
}
article > h1 > a[role=anchor],
article > h2 > a[role=anchor],
article > h3 > a[role=anchor],
article > h4 > a[role=anchor],
article > h5 > a[role=anchor],
article > h6 > a[role=anchor],
article > thead > a[role=anchor] {
  color: var(--dark);
  background-color: transparent;
}

h1[id] > a[href^="#"],
h2[id] > a[href^="#"],
h3[id] > a[href^="#"],
h4[id] > a[href^="#"],
h5[id] > a[href^="#"],
h6[id] > a[href^="#"] {
  margin: 0 0.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  transform: translateY(-0.1rem);
  font-family: var(--codeFont);
  user-select: none;
}
h1[id]:hover > a,
h2[id]:hover > a,
h3[id]:hover > a,
h4[id]:hover > a,
h5[id]:hover > a,
h6[id]:hover > a {
  opacity: 1;
}

h1 {
  font-size: 1.75rem;
  margin-top: 2.25rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.4rem;
  margin-top: 1.9rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.12rem;
  margin-top: 1.62rem;
  margin-bottom: 1rem;
}

h4,
h5,
h6 {
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

figure[data-rehype-pretty-code-figure] {
  margin: 0;
  position: relative;
  line-height: 1.6rem;
  position: relative;
}
figure[data-rehype-pretty-code-figure] > [data-rehype-pretty-code-title] {
  font-family: var(--codeFont);
  font-size: 0.9rem;
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--lightgray);
  width: max-content;
  border-radius: 5px;
  margin-bottom: -0.5rem;
  color: var(--darkgray);
}
figure[data-rehype-pretty-code-figure] > pre {
  padding: 0;
}

pre {
  font-family: var(--codeFont);
  padding: 0 0.5rem;
  border-radius: 5px;
  overflow-x: auto;
  border: 1px solid var(--lightgray);
  position: relative;
}
pre:has(> code.mermaid) {
  border: none;
}
pre > code {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  counter-reset: line;
  counter-increment: line 0;
  display: grid;
  padding: 0.5rem 0;
  overflow-x: scroll;
}
pre > code [data-highlighted-chars] {
  background-color: var(--highlight);
  border-radius: 5px;
}
pre > code > [data-line] {
  padding: 0 0.25rem;
  box-sizing: border-box;
  border-left: 3px solid transparent;
}
pre > code > [data-line][data-highlighted-line] {
  background-color: var(--highlight);
  border-left: 3px solid var(--secondary);
}
pre > code > [data-line]::before {
  content: counter(line);
  counter-increment: line;
  width: 1rem;
  margin-right: 1rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.6);
}
pre > code[data-line-numbers-max-digits="2"] > [data-line]::before {
  width: 2rem;
}
pre > code[data-line-numbers-max-digits="3"] > [data-line]::before {
  width: 3rem;
}

code {
  font-size: 0.9em;
  color: var(--dark);
  font-family: var(--codeFont);
  border-radius: 5px;
  padding: 0.1rem 0.2rem;
  background: var(--lightgray);
}

tbody,
li,
p {
  line-height: 1.6rem;
}

.table-container {
  overflow-x: auto;
}
.table-container > table {
  margin: 1rem;
  padding: 1.5rem;
  border-collapse: collapse;
}
.table-container > table th,
.table-container > table td {
  min-width: 75px;
}
.table-container > table > * {
  line-height: 2rem;
}

th {
  text-align: left;
  padding: 0.4rem 0.7rem;
  border-bottom: 2px solid var(--gray);
}

td {
  padding: 0.2rem 0.7rem;
}

tr {
  border-bottom: 1px solid var(--lightgray);
}
tr:last-child {
  border-bottom: none;
}

img {
  max-width: 100%;
  border-radius: 5px;
  margin: 1rem 0;
}

p > img + em {
  display: block;
  transform: translateY(-1rem);
}

hr {
  width: 100%;
  margin: 2rem auto;
  height: 1px;
  border: none;
  background-color: var(--lightgray);
}

audio,
video {
  width: 100%;
  border-radius: 5px;
}

.spacer {
  flex: 1 1 auto;
}

ul.overflow,
ol.overflow {
  max-height: 400;
  overflow-y: auto;
  content: "";
  clear: both;
}
ul.overflow > li:last-of-type,
ol.overflow > li:last-of-type {
  margin-bottom: 30px;
}
ul.overflow:after,
ol.overflow:after {
  pointer-events: none;
  content: "";
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 1;
  transition: opacity 0.3s ease;
  background: linear-gradient(transparent 0px, var(--light));
}

.transclude ul {
  padding-left: 1rem;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9zdHlsZXMiLCJzb3VyY2VzIjpbInN5bnRheC5zY3NzIiwiY2FsbG91dHMuc2NzcyIsInZhcmlhYmxlcy5zY3NzIiwiYmFzZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7RUFDQTs7O0FBR0Y7RUFDRTs7O0FBR0Y7RUFDRTtFQUNBOzs7QUFHRjtFQUNFOzs7QUNaRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBTUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFqQkE7RUFDRTs7QUFrQkY7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBRUU7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBR0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTs7QUFHRjtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBR0Y7RUFDRTs7O0FBSUo7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUE7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFFRTtFQUNBO0VBQ0E7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdGO0VBQ0UsYUN4SmE7OztBQ0hqQjtFQUNFO0VBQ0E7RUFDQTtFQUNBOzs7QUFHRjtBQUFBO0VBRUU7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7RUFDRTtFQUNBOzs7QUFHRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0VBV0U7RUFDQTtFQUNBO0VBQ0E7OztBQUlBO0VBQ0U7OztBQUlKO0VBQ0UsYURqRGU7OztBQ29EakI7RUFDRSxhRHJEZTtFQ3NEZjtFQUNBO0VBQ0E7O0FBRUE7RUFDRTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBR0E7RUFDRTs7QUFLTjtFQUNFO0VBQ0E7O0FBRUE7RUFDRTs7O0FBS047RUFDRTs7QUFDQTtFQUZGO0lBR0k7Ozs7QUFJSjtFQUNFOztBQUNBO0VBRkY7SUFHSTs7OztBQUtGO0VBREY7SUFFSTtJQUNBO0lBQ0EsV0RwSFE7OztBQ3dIUjtFQUNFOztBQUdGO0VBQ0U7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7QUFHRjtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTs7QUFJSjtFQUNFO0VBQ0E7O0FBQ0E7RUFIRjtJQUlJOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxPRDNKVztFQzRKWCxZRDNKTztFQzRKUDtFQUNBO0VBQ0E7O0FBQ0E7RUFYRjtJQVlJO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7OztBQUlKO0VBQ0U7O0FBQ0E7RUFGRjtJQUdJO0lBQ0E7OztBQUlKO0VBQ0U7RUFDQTs7QUFFRTtFQURGO0lBRUk7SUFDQTs7O0FBTVI7RUFDRSxPRGpNUTtFQ2tNUjs7QUFDQTtFQUhGO0lBSUk7SUFDQTs7O0FBSUo7RUFFRTtFQUNBO0VBQ0EsT0Q3TVE7O0FDOE1SO0VBTEY7SUFNSTtJQUNBO0lBQ0E7Ozs7QUFLTjtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBS047RUFDRTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFPRTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQUNFO0VBQ0E7OztBQVVGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFDRTs7O0FBS0o7RUFDRTtFQUNBO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0VBR0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHRjtFQUNFOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNFO0VBQ0E7O0FBR0Y7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7RUFDRTtFQUNBOztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBSUo7RUFDRTs7QUFHRjtFQUNFOzs7QUFLTjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtBQUFBO0VBR0U7OztBQUdGO0VBQ0U7O0FBRUE7RUFDRTtFQUNBO0VBQ0E7O0FBRUE7QUFBQTtFQUVFOztBQUdGO0VBQ0U7OztBQUtOO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFOzs7QUFHRjtFQUNFOztBQUNBO0VBQ0U7OztBQUlKO0VBQ0U7RUFDQTtFQUNBOzs7QUFHRjtFQUNFO0VBQ0E7OztBQUdGO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7O0FBR0Y7QUFBQTtFQUVFO0VBQ0E7OztBQUdGO0VBQ0U7OztBQUdGO0FBQUE7RUFFRTtFQUNBO0VBR0E7RUFDQTs7QUFFQTtBQUFBO0VBQ0U7O0FBR0Y7QUFBQTtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOzs7QUFLRjtFQUNFIiwic291cmNlc0NvbnRlbnQiOlsiY29kZVtkYXRhLXRoZW1lKj1cIiBcIl0ge1xuICBjb2xvcjogdmFyKC0tc2hpa2ktbGlnaHQpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlraS1saWdodC1iZyk7XG59XG5cbmNvZGVbZGF0YS10aGVtZSo9XCIgXCJdIHNwYW4ge1xuICBjb2xvcjogdmFyKC0tc2hpa2ktbGlnaHQpO1xufVxuXG5bc2F2ZWQtdGhlbWU9XCJkYXJrXCJdIGNvZGVbZGF0YS10aGVtZSo9XCIgXCJdIHtcbiAgY29sb3I6IHZhcigtLXNoaWtpLWRhcmspO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlraS1kYXJrLWJnKTtcbn1cblxuW3NhdmVkLXRoZW1lPVwiZGFya1wiXSBjb2RlW2RhdGEtdGhlbWUqPVwiIFwiXSBzcGFuIHtcbiAgY29sb3I6IHZhcigtLXNoaWtpLWRhcmspO1xufVxuIiwiQHVzZSBcIi4vdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuQHVzZSBcInNhc3M6Y29sb3JcIjtcblxuLmNhbGxvdXQge1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZyk7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMCAxcmVtO1xuICBvdmVyZmxvdy15OiBoaWRkZW47XG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zcyBlYXNlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICYgPiAqOm50aC1jaGlsZCgyKSB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgfVxuXG4gIC0tY2FsbG91dC1pY29uLW5vdGU6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxsaW5lIHgxPVwiMThcIiB5MT1cIjJcIiB4Mj1cIjIyXCIgeTI9XCI2XCI+PC9saW5lPjxwYXRoIGQ9XCJNNy41IDIwLjUgMTkgOWwtNC00TDMuNSAxNi41IDIgMjJ6XCI+PC9wYXRoPjwvc3ZnPicpO1xuICAtLWNhbGxvdXQtaWNvbi1hYnN0cmFjdDogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHJlY3QgeD1cIjhcIiB5PVwiMlwiIHdpZHRoPVwiOFwiIGhlaWdodD1cIjRcIiByeD1cIjFcIiByeT1cIjFcIj48L3JlY3Q+PHBhdGggZD1cIk0xNiA0aDJhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJoMlwiPjwvcGF0aD48cGF0aCBkPVwiTTEyIDExaDRcIj48L3BhdGg+PHBhdGggZD1cIk0xMiAxNmg0XCI+PC9wYXRoPjxwYXRoIGQ9XCJNOCAxMWguMDFcIj48L3BhdGg+PHBhdGggZD1cIk04IDE2aC4wMVwiPjwvcGF0aD48L3N2Zz4nKTtcbiAgLS1jYWxsb3V0LWljb24taW5mbzogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiPjwvY2lyY2xlPjxsaW5lIHgxPVwiMTJcIiB5MT1cIjE2XCIgeDI9XCIxMlwiIHkyPVwiMTJcIj48L2xpbmU+PGxpbmUgeDE9XCIxMlwiIHkxPVwiOFwiIHgyPVwiMTIuMDFcIiB5Mj1cIjhcIj48L2xpbmU+PC9zdmc+Jyk7XG4gIC0tY2FsbG91dC1pY29uLXRvZG86IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNMTIgMjJjNS41MjMgMCAxMC00LjQ3NyAxMC0xMFMxNy41MjMgMiAxMiAyIDIgNi40NzcgMiAxMnM0LjQ3NyAxMCAxMCAxMHpcIj48L3BhdGg+PHBhdGggZD1cIm05IDEyIDIgMiA0LTRcIj48L3BhdGg+PC9zdmc+Jyk7XG4gIC0tY2FsbG91dC1pY29uLXRpcDogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTguNSAxNC41QTIuNSAyLjUgMCAwIDAgMTEgMTJjMC0xLjM4LS41LTItMS0zLTEuMDcyLTIuMTQzLS4yMjQtNC4wNTQgMi02IC41IDIuNSAyIDQuOSA0IDYuNSAyIDEuNiAzIDMuNSAzIDUuNWE3IDcgMCAxIDEtMTQgMGMwLTEuMTUzLjQzMy0yLjI5NCAxLTNhMi41IDIuNSAwIDAgMCAyLjUgMi41elwiPjwvcGF0aD48L3N2Zz4gJyk7XG4gIC0tY2FsbG91dC1pY29uLXN1Y2Nlc3M6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHBvbHlsaW5lIHBvaW50cz1cIjIwIDYgOSAxNyA0IDEyXCI+PC9wb2x5bGluZT48L3N2Zz4gJyk7XG4gIC0tY2FsbG91dC1pY29uLXF1ZXN0aW9uOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCw8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiPjxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIj48L2NpcmNsZT48cGF0aCBkPVwiTTkuMDkgOWEzIDMgMCAwIDEgNS44MyAxYzAgMi0zIDMtMyAzXCI+PC9wYXRoPjxsaW5lIHgxPVwiMTJcIiB5MT1cIjE3XCIgeDI9XCIxMi4wMVwiIHkyPVwiMTdcIj48L2xpbmU+PC9zdmc+ICcpO1xuICAtLWNhbGxvdXQtaWNvbi13YXJuaW5nOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCwgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwibTIxLjczIDE4LTgtMTRhMiAyIDAgMCAwLTMuNDggMGwtOCAxNEEyIDIgMCAwIDAgNCAyMWgxNmEyIDIgMCAwIDAgMS43My0zWlwiPjwvcGF0aD48bGluZSB4MT1cIjEyXCIgeTE9XCI5XCIgeDI9XCIxMlwiIHkyPVwiMTNcIj48L2xpbmU+PGxpbmUgeDE9XCIxMlwiIHkxPVwiMTdcIiB4Mj1cIjEyLjAxXCIgeTI9XCIxN1wiPjwvbGluZT48L3N2Zz4nKTtcbiAgLS1jYWxsb3V0LWljb24tZmFpbHVyZTogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48bGluZSB4MT1cIjE4XCIgeTE9XCI2XCIgeDI9XCI2XCIgeTI9XCIxOFwiPjwvbGluZT48bGluZSB4MT1cIjZcIiB5MT1cIjZcIiB4Mj1cIjE4XCIgeTI9XCIxOFwiPjwvbGluZT48L3N2Zz4gJyk7XG4gIC0tY2FsbG91dC1pY29uLWRhbmdlcjogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cG9seWdvbiBwb2ludHM9XCIxMyAyIDMgMTQgMTIgMTQgMTEgMjIgMjEgMTAgMTIgMTAgMTMgMlwiPjwvcG9seWdvbj48L3N2Zz4gJyk7XG4gIC0tY2FsbG91dC1pY29uLWJ1ZzogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7IHV0ZjgsIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PHJlY3Qgd2lkdGg9XCI4XCIgaGVpZ2h0PVwiMTRcIiB4PVwiOFwiIHk9XCI2XCIgcng9XCI0XCI+PC9yZWN0PjxwYXRoIGQ9XCJtMTkgNy0zIDJcIj48L3BhdGg+PHBhdGggZD1cIm01IDcgMyAyXCI+PC9wYXRoPjxwYXRoIGQ9XCJtMTkgMTktMy0yXCI+PC9wYXRoPjxwYXRoIGQ9XCJtNSAxOSAzLTJcIj48L3BhdGg+PHBhdGggZD1cIk0yMCAxM2gtNFwiPjwvcGF0aD48cGF0aCBkPVwiTTQgMTNoNFwiPjwvcGF0aD48cGF0aCBkPVwibTEwIDQgMSAyXCI+PC9wYXRoPjxwYXRoIGQ9XCJtMTQgNC0xIDJcIj48L3BhdGg+PC9zdmc+Jyk7XG4gIC0tY2FsbG91dC1pY29uLWV4YW1wbGU6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sOyB1dGY4LDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGxpbmUgeDE9XCI4XCIgeTE9XCI2XCIgeDI9XCIyMVwiIHkyPVwiNlwiPjwvbGluZT48bGluZSB4MT1cIjhcIiB5MT1cIjEyXCIgeDI9XCIyMVwiIHkyPVwiMTJcIj48L2xpbmU+PGxpbmUgeDE9XCI4XCIgeTE9XCIxOFwiIHgyPVwiMjFcIiB5Mj1cIjE4XCI+PC9saW5lPjxsaW5lIHgxPVwiM1wiIHkxPVwiNlwiIHgyPVwiMy4wMVwiIHkyPVwiNlwiPjwvbGluZT48bGluZSB4MT1cIjNcIiB5MT1cIjEyXCIgeDI9XCIzLjAxXCIgeTI9XCIxMlwiPjwvbGluZT48bGluZSB4MT1cIjNcIiB5MT1cIjE4XCIgeDI9XCIzLjAxXCIgeTI9XCIxOFwiPjwvbGluZT48L3N2Zz4gJyk7XG4gIC0tY2FsbG91dC1pY29uLXF1b3RlOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDsgdXRmOCwgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTMgMjFjMyAwIDctMSA3LThWNWMwLTEuMjUtLjc1Ni0yLjAxNy0yLTJINGMtMS4yNSAwLTIgLjc1LTIgMS45NzJWMTFjMCAxLjI1Ljc1IDIgMiAyIDEgMCAxIDAgMSAxdjFjMCAxLTEgMi0yIDJzLTEgLjAwOC0xIDEuMDMxVjIwYzAgMSAwIDEgMSAxelwiPjwvcGF0aD48cGF0aCBkPVwiTTE1IDIxYzMgMCA3LTEgNy04VjVjMC0xLjI1LS43NTctMi4wMTctMi0yaC00Yy0xLjI1IDAtMiAuNzUtMiAxLjk3MlYxMWMwIDEuMjUuNzUgMiAyIDJoLjc1YzAgMi4yNS4yNSA0LTIuNzUgNHYzYzAgMSAwIDEgMSAxelwiPjwvcGF0aD48L3N2Zz4nKTtcbiAgLS1jYWxsb3V0LWljb24tZm9sZDogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIlM0UlM0Nwb2x5bGluZSBwb2ludHM9XCI2IDkgMTIgMTUgMTggOVwiJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRScpO1xuXG4gICZbZGF0YS1jYWxsb3V0XSB7XG4gICAgLS1jb2xvcjogIzQ0OGFmZjtcbiAgICAtLWJvcmRlcjogIzQ0OGFmZjQ0O1xuICAgIC0tYmc6ICM0NDhhZmYxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLW5vdGUpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJhYnN0cmFjdFwiXSB7XG4gICAgLS1jb2xvcjogIzAwYjBmZjtcbiAgICAtLWJvcmRlcjogIzAwYjBmZjQ0O1xuICAgIC0tYmc6ICMwMGIwZmYxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLWFic3RyYWN0KTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwiaW5mb1wiXSxcbiAgJltkYXRhLWNhbGxvdXQ9XCJ0b2RvXCJdIHtcbiAgICAtLWNvbG9yOiAjMDBiOGQ0O1xuICAgIC0tYm9yZGVyOiAjMDBiOGQ0NDQ7XG4gICAgLS1iZzogIzAwYjhkNDEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24taW5mbyk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cInRvZG9cIl0ge1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tdG9kbyk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cInRpcFwiXSB7XG4gICAgLS1jb2xvcjogIzAwYmZhNTtcbiAgICAtLWJvcmRlcjogIzAwYmZhNTQ0O1xuICAgIC0tYmc6ICMwMGJmYTUxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLXRpcCk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cInN1Y2Nlc3NcIl0ge1xuICAgIC0tY29sb3I6ICMwOWFkN2E7XG4gICAgLS1ib3JkZXI6ICMwOWFkNzE0NDtcbiAgICAtLWJnOiAjMDlhZDcxMTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1zdWNjZXNzKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwicXVlc3Rpb25cIl0ge1xuICAgIC0tY29sb3I6ICNkYmE2NDI7XG4gICAgLS1ib3JkZXI6ICNkYmE2NDI0NDtcbiAgICAtLWJnOiAjZGJhNjQyMTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1xdWVzdGlvbik7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cIndhcm5pbmdcIl0ge1xuICAgIC0tY29sb3I6ICNkYjg5NDI7XG4gICAgLS1ib3JkZXI6ICNkYjg5NDI0NDtcbiAgICAtLWJnOiAjZGI4OTQyMTA7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi13YXJuaW5nKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwiZmFpbHVyZVwiXSxcbiAgJltkYXRhLWNhbGxvdXQ9XCJkYW5nZXJcIl0sXG4gICZbZGF0YS1jYWxsb3V0PVwiYnVnXCJdIHtcbiAgICAtLWNvbG9yOiAjZGI0MjQyO1xuICAgIC0tYm9yZGVyOiAjZGI0MjQyNDQ7XG4gICAgLS1iZzogI2RiNDI0MjEwO1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tZmFpbHVyZSk7XG4gIH1cblxuICAmW2RhdGEtY2FsbG91dD1cImJ1Z1wiXSB7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1idWcpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJkYW5nZXJcIl0ge1xuICAgIC0tY2FsbG91dC1pY29uOiB2YXIoLS1jYWxsb3V0LWljb24tZGFuZ2VyKTtcbiAgfVxuXG4gICZbZGF0YS1jYWxsb3V0PVwiZXhhbXBsZVwiXSB7XG4gICAgLS1jb2xvcjogIzdhNDNiNTtcbiAgICAtLWJvcmRlcjogIzdhNDNiNTQ0O1xuICAgIC0tYmc6ICM3YTQzYjUxMDtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLWV4YW1wbGUpO1xuICB9XG5cbiAgJltkYXRhLWNhbGxvdXQ9XCJxdW90ZVwiXSB7XG4gICAgLS1jb2xvcjogdmFyKC0tc2Vjb25kYXJ5KTtcbiAgICAtLWJvcmRlcjogdmFyKC0tbGlnaHRncmF5KTtcbiAgICAtLWNhbGxvdXQtaWNvbjogdmFyKC0tY2FsbG91dC1pY29uLXF1b3RlKTtcbiAgfVxuXG4gICYuaXMtY29sbGFwc2VkID4gLmNhbGxvdXQtdGl0bGUgPiAuZm9sZC1jYWxsb3V0LWljb24ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWigtOTBkZWcpO1xuICB9XG59XG5cbi5jYWxsb3V0LXRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogNXB4O1xuICBwYWRkaW5nOiAxcmVtIDA7XG4gIGNvbG9yOiB2YXIoLS1jb2xvcik7XG5cbiAgLS1pY29uLXNpemU6IDE4cHg7XG5cbiAgJiAuZm9sZC1jYWxsb3V0LWljb24ge1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cyBlYXNlO1xuICAgIG9wYWNpdHk6IDAuODtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLS1jYWxsb3V0LWljb246IHZhcigtLWNhbGxvdXQtaWNvbi1mb2xkKTtcbiAgfVxuXG4gICYgPiAuY2FsbG91dC10aXRsZS1pbm5lciA+IHAge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvcik7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgLmNhbGxvdXQtaWNvbixcbiAgJiAuZm9sZC1jYWxsb3V0LWljb24ge1xuICAgIHdpZHRoOiB2YXIoLS1pY29uLXNpemUpO1xuICAgIGhlaWdodDogdmFyKC0taWNvbi1zaXplKTtcbiAgICBmbGV4OiAwIDAgdmFyKC0taWNvbi1zaXplKTtcblxuICAgIC8vIGljb24gc3VwcG9ydFxuICAgIGJhY2tncm91bmQtc2l6ZTogdmFyKC0taWNvbi1zaXplKSB2YXIoLS1pY29uLXNpemUpO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvcik7XG4gICAgbWFzay1pbWFnZTogdmFyKC0tY2FsbG91dC1pY29uKTtcbiAgICBtYXNrLXNpemU6IHZhcigtLWljb24tc2l6ZSkgdmFyKC0taWNvbi1zaXplKTtcbiAgICBtYXNrLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgbWFzay1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBwYWRkaW5nOiAwLjJyZW0gMDtcbiAgfVxuXG4gIC5jYWxsb3V0LXRpdGxlLWlubmVyIHtcbiAgICBmb250LXdlaWdodDogJHNlbWlCb2xkV2VpZ2h0O1xuICB9XG59XG4iLCIkcGFnZVdpZHRoOiA3NTBweDtcbiRtb2JpbGVCcmVha3BvaW50OiA2MDBweDtcbiR0YWJsZXRCcmVha3BvaW50OiAxMDAwcHg7XG4kc2lkZVBhbmVsV2lkdGg6IDM4MHB4O1xuJHRvcFNwYWNpbmc6IDZyZW07XG4kZnVsbFBhZ2VXaWR0aDogJHBhZ2VXaWR0aCArIDIgKiAkc2lkZVBhbmVsV2lkdGg7XG4kYm9sZFdlaWdodDogNzAwO1xuJHNlbWlCb2xkV2VpZ2h0OiA2MDA7XG4kbm9ybWFsV2VpZ2h0OiA0MDA7XG4iLCJAdXNlIFwiLi92YXJpYWJsZXMuc2Nzc1wiIGFzICo7XG5AdXNlIFwiLi9zeW50YXguc2Nzc1wiO1xuQHVzZSBcIi4vY2FsbG91dHMuc2Nzc1wiO1xuXG5odG1sIHtcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XG4gIHRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgd2lkdGg6IDEwMHZ3O1xufVxuXG5ib2R5LFxuc2VjdGlvbiB7XG4gIG1hcmdpbjogMDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodCk7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1ib2R5Rm9udCk7XG4gIGNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XG59XG5cbi50ZXh0LWhpZ2hsaWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmYyMzY4ODtcbiAgcGFkZGluZzogMCAwLjFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuOjpzZWxlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiBjb2xvci1taXgoaW4gc3JnYiwgdmFyKC0tdGVydGlhcnkpIDYwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKSk7XG4gIGNvbG9yOiB2YXIoLS1kYXJrZ3JheSk7XG59XG5cbnAsXG51bCxcbnRleHQsXG5hLFxudHIsXG50ZCxcbmxpLFxub2wsXG51bCxcbi5rYXRleCxcbi5tYXRoIHtcbiAgY29sb3I6IHZhcigtLWRhcmtncmF5KTtcbiAgZmlsbDogdmFyKC0tZGFya2dyYXkpO1xuICBvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTtcbiAgaHlwaGVuczogYXV0bztcbn1cblxuLm1hdGgge1xuICAmLm1hdGgtZGlzcGxheSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG59XG5cbnN0cm9uZyB7XG4gIGZvbnQtd2VpZ2h0OiAkc2VtaUJvbGRXZWlnaHQ7XG59XG5cbmEge1xuICBmb250LXdlaWdodDogJHNlbWlCb2xkV2VpZ2h0O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZTtcbiAgY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRlcnRpYXJ5KSAhaW1wb3J0YW50O1xuICB9XG5cbiAgJi5pbnRlcm5hbCB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpZ2hsaWdodCk7XG4gICAgcGFkZGluZzogMCAwLjFyZW07XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjRyZW07XG5cbiAgICAmOmhhcyg+IGltZykge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbiAgICAmLnRhZy1saW5rIHtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IFwiI1wiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYuZXh0ZXJuYWwgLmV4dGVybmFsLWljb24ge1xuICAgIGhlaWdodDogMWV4O1xuICAgIG1hcmdpbjogMCAwLjE1ZW07XG5cbiAgICA+IHBhdGgge1xuICAgICAgZmlsbDogdmFyKC0tZGFyayk7XG4gICAgfVxuICB9XG59XG5cbi5kZXNrdG9wLW9ubHkge1xuICBkaXNwbGF5OiBpbml0aWFsO1xuICBAbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiAkZnVsbFBhZ2VXaWR0aCkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuLm1vYmlsZS1vbmx5IHtcbiAgZGlzcGxheTogbm9uZTtcbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICBkaXNwbGF5OiBpbml0aWFsO1xuICB9XG59XG5cbi5wYWdlIHtcbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgbWF4LXdpZHRoOiAkcGFnZVdpZHRoO1xuICB9XG5cbiAgJiBhcnRpY2xlIHtcbiAgICAmID4gaDEge1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgIH1cblxuICAgICYgbGk6aGFzKD4gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdKSB7XG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgfVxuXG4gICAgJiBsaTpoYXMoPiBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCkge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XG4gICAgICB0ZXh0LWRlY29yYXRpb24tY29sb3I6IHZhcigtLWdyYXkpO1xuICAgICAgY29sb3I6IHZhcigtLWdyYXkpO1xuICAgIH1cblxuICAgICYgbGkgPiAqIHtcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgIHAgPiBzdHJvbmcge1xuICAgICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgIH1cbiAgfVxuXG4gICYgPiAjcXVhcnR6LWJvZHkge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuXG4gICAgJiAuc2lkZWJhciB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBnYXA6IDJyZW07XG4gICAgICB0b3A6IDA7XG4gICAgICB3aWR0aDogJHNpZGVQYW5lbFdpZHRoO1xuICAgICAgbWFyZ2luLXRvcDogJHRvcFNwYWNpbmc7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgcGFkZGluZzogMCA0cmVtO1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgICAgcG9zaXRpb246IGluaXRpYWw7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgICBtYXJnaW4tdG9wOiAycmVtO1xuICAgICAgfVxuICAgIH1cblxuICAgICYgLnNpZGViYXIubGVmdCB7XG4gICAgICBsZWZ0OiBjYWxjKGNhbGMoMTAwdncgLSAkcGFnZVdpZHRoKSAvIDIgLSAkc2lkZVBhbmVsV2lkdGgpO1xuICAgICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgICAgZ2FwOiAwO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgIH1cblxuICAgICYgLnNpZGViYXIucmlnaHQge1xuICAgICAgcmlnaHQ6IGNhbGMoY2FsYygxMDB2dyAtICRwYWdlV2lkdGgpIC8gMiAtICRzaWRlUGFuZWxXaWR0aCk7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAmID4gKiB7XG4gICAgICAgIEBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6ICRmdWxsUGFnZVdpZHRoKSB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBtaW4td2lkdGg6IDE0MHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJiAucGFnZS1oZWFkZXIge1xuICAgIHdpZHRoOiAkcGFnZVdpZHRoO1xuICAgIG1hcmdpbjogJHRvcFNwYWNpbmcgYXV0byAwIGF1dG87XG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICB9XG4gIH1cblxuICAmIC5jZW50ZXIsXG4gICYgZm9vdGVyIHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgd2lkdGg6ICRwYWdlV2lkdGg7XG4gICAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJGZ1bGxQYWdlV2lkdGgpIHtcbiAgICAgIHdpZHRoOiBpbml0aWFsO1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgfVxuICB9XG59XG5cbi5mb290bm90ZXMge1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tbGlnaHRncmF5KTtcbn1cblxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDJweCk7XG4gIGNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4taW5saW5lLWVuZDogMC4ycmVtO1xuICBtYXJnaW4taW5saW5lLXN0YXJ0OiAtMS40cmVtO1xuICBhcHBlYXJhbmNlOiBub25lO1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuXG4gICY6Y2hlY2tlZCB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1zZWNvbmRhcnkpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlY29uZGFyeSk7XG5cbiAgICAmOjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogNHB4O1xuICAgICAgdG9wOiAxcHg7XG4gICAgICB3aWR0aDogNHB4O1xuICAgICAgaGVpZ2h0OiA4cHg7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGJvcmRlcjogc29saWQgdmFyKC0tbGlnaHQpO1xuICAgICAgYm9yZGVyLXdpZHRoOiAwIDJweCAycHggMDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICB9XG4gIH1cbn1cblxuYmxvY2txdW90ZSB7XG4gIG1hcmdpbjogMXJlbSAwO1xuICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLXNlY29uZGFyeSk7XG4gIHBhZGRpbmctbGVmdDogMXJlbTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMgZWFzZTtcbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2LFxudGhlYWQge1xuICBmb250LWZhbWlseTogdmFyKC0taGVhZGVyRm9udCk7XG4gIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgZm9udC13ZWlnaHQ6IHJldmVydDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcblxuICBhcnRpY2xlID4gJiA+IGFbcm9sZT1cImFuY2hvclwiXSB7XG4gICAgY29sb3I6IHZhcigtLWRhcmspO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG59XG5cbmgxLFxuaDIsXG5oMyxcbmg0LFxuaDUsXG5oNiB7XG4gICZbaWRdID4gYVtocmVmXj1cIiNcIl0ge1xuICAgIG1hcmdpbjogMCAwLjVyZW07XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTAuMXJlbSk7XG4gICAgZm9udC1mYW1pbHk6IHZhcigtLWNvZGVGb250KTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgfVxuXG4gICZbaWRdOmhvdmVyID4gYSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG4vLyB0eXBvZ3JhcGh5IGltcHJvdmVtZW50c1xuaDEge1xuICBmb250LXNpemU6IDEuNzVyZW07XG4gIG1hcmdpbi10b3A6IDIuMjVyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbmgyIHtcbiAgZm9udC1zaXplOiAxLjRyZW07XG4gIG1hcmdpbi10b3A6IDEuOXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuaDMge1xuICBmb250LXNpemU6IDEuMTJyZW07XG4gIG1hcmdpbi10b3A6IDEuNjJyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbmg0LFxuaDUsXG5oNiB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG5maWd1cmVbZGF0YS1yZWh5cGUtcHJldHR5LWNvZGUtZmlndXJlXSB7XG4gIG1hcmdpbjogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsaW5lLWhlaWdodDogMS42cmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJiA+IFtkYXRhLXJlaHlwZS1wcmV0dHktY29kZS10aXRsZV0ge1xuICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1jb2RlRm9udCk7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgcGFkZGluZzogMC4xcmVtIDAuNXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICAgIHdpZHRoOiBtYXgtY29udGVudDtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogLTAuNXJlbTtcbiAgICBjb2xvcjogdmFyKC0tZGFya2dyYXkpO1xuICB9XG5cbiAgJiA+IHByZSB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxufVxuXG5wcmUge1xuICBmb250LWZhbWlseTogdmFyKC0tY29kZUZvbnQpO1xuICBwYWRkaW5nOiAwIDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjpoYXMoPiBjb2RlLm1lcm1haWQpIHtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cblxuICAmID4gY29kZSB7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICBjb3VudGVyLXJlc2V0OiBsaW5lO1xuICAgIGNvdW50ZXItaW5jcmVtZW50OiBsaW5lIDA7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMDtcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XG5cbiAgICAmIFtkYXRhLWhpZ2hsaWdodGVkLWNoYXJzXSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaWdobGlnaHQpO1xuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIH1cblxuICAgICYgPiBbZGF0YS1saW5lXSB7XG4gICAgICBwYWRkaW5nOiAwIDAuMjVyZW07XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcblxuICAgICAgJltkYXRhLWhpZ2hsaWdodGVkLWxpbmVdIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGlnaGxpZ2h0KTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCB2YXIoLS1zZWNvbmRhcnkpO1xuICAgICAgfVxuXG4gICAgICAmOjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiBjb3VudGVyKGxpbmUpO1xuICAgICAgICBjb3VudGVyLWluY3JlbWVudDogbGluZTtcbiAgICAgICAgd2lkdGg6IDFyZW07XG4gICAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgY29sb3I6IHJnYmEoMTE1LCAxMzgsIDE0OCwgMC42KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmW2RhdGEtbGluZS1udW1iZXJzLW1heC1kaWdpdHM9XCIyXCJdID4gW2RhdGEtbGluZV06OmJlZm9yZSB7XG4gICAgICB3aWR0aDogMnJlbTtcbiAgICB9XG5cbiAgICAmW2RhdGEtbGluZS1udW1iZXJzLW1heC1kaWdpdHM9XCIzXCJdID4gW2RhdGEtbGluZV06OmJlZm9yZSB7XG4gICAgICB3aWR0aDogM3JlbTtcbiAgICB9XG4gIH1cbn1cblxuY29kZSB7XG4gIGZvbnQtc2l6ZTogMC45ZW07XG4gIGNvbG9yOiB2YXIoLS1kYXJrKTtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWNvZGVGb250KTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAwLjFyZW0gMC4ycmVtO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1saWdodGdyYXkpO1xufVxuXG50Ym9keSxcbmxpLFxucCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjZyZW07XG59XG5cbi50YWJsZS1jb250YWluZXIge1xuICBvdmVyZmxvdy14OiBhdXRvO1xuXG4gICYgPiB0YWJsZSB7XG4gICAgbWFyZ2luOiAxcmVtO1xuICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuXG4gICAgdGgsXG4gICAgdGQge1xuICAgICAgbWluLXdpZHRoOiA3NXB4O1xuICAgIH1cblxuICAgICYgPiAqIHtcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xuICAgIH1cbiAgfVxufVxuXG50aCB7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmc6IDAuNHJlbSAwLjdyZW07XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB2YXIoLS1ncmF5KTtcbn1cblxudGQge1xuICBwYWRkaW5nOiAwLjJyZW0gMC43cmVtO1xufVxuXG50ciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1saWdodGdyYXkpO1xuICAmOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIH1cbn1cblxuaW1nIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIG1hcmdpbjogMXJlbSAwO1xufVxuXG5wID4gaW1nICsgZW0ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcmVtKTtcbn1cblxuaHIge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAycmVtIGF1dG87XG4gIGhlaWdodDogMXB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0Z3JheSk7XG59XG5cbmF1ZGlvLFxudmlkZW8ge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4uc3BhY2VyIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbnVsLm92ZXJmbG93LFxub2wub3ZlcmZsb3cge1xuICBtYXgtaGVpZ2h0OiA0MDA7XG4gIG92ZXJmbG93LXk6IGF1dG87XG5cbiAgLy8gY2xlYXJmaXhcbiAgY29udGVudDogXCJcIjtcbiAgY2xlYXI6IGJvdGg7XG5cbiAgJiA+IGxpOmxhc3Qtb2YtdHlwZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgfVxuXG4gICY6YWZ0ZXIge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCAwcHgsIHZhcigtLWxpZ2h0KSk7XG4gIH1cbn1cblxuLnRyYW5zY2x1ZGUge1xuICB1bCB7XG4gICAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICB9XG59XG4iXX0= */`;var popover_default=`@keyframes dropin {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  1% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
.popover {
  z-index: 999;
  position: absolute;
  overflow: visible;
  padding: 1rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.popover > .popover-inner {
  position: relative;
  width: 30rem;
  max-height: 20rem;
  padding: 0 1rem 1rem 1rem;
  font-weight: initial;
  font-style: initial;
  line-height: normal;
  font-size: initial;
  font-family: var(--bodyFont);
  border: 1px solid var(--lightgray);
  background-color: var(--light);
  border-radius: 5px;
  box-shadow: 6px 6px 36px 0 rgba(0, 0, 0, 0.25);
  overflow: auto;
  white-space: normal;
}
.popover > .popover-inner[data-content-type][data-content-type*=pdf], .popover > .popover-inner[data-content-type][data-content-type*=image] {
  padding: 0;
  max-height: 100%;
}
.popover > .popover-inner[data-content-type][data-content-type*=image] img {
  margin: 0;
  border-radius: 0;
  display: block;
}
.popover > .popover-inner[data-content-type][data-content-type*=pdf] iframe {
  width: 100%;
}
.popover h1 {
  font-size: 1.5rem;
}
@media all and (max-width: 600px) {
  .popover {
    display: none !important;
  }
}

a:hover .popover,
.popover:hover {
  animation: dropin 0.3s ease;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL2hvbWUvZmVsaXgvRG9jdW1lbnRzL3llYXIxMi8ud2ViL3F1YXJ0ei9jb21wb25lbnRzL3N0eWxlcyIsInNvdXJjZXMiOlsicG9wb3Zlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0U7SUFDRTtJQUNBOztFQUVGO0lBQ0U7O0VBRUY7SUFDRTtJQUNBOzs7QUFJSjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBOENBO0VBQ0E7RUFDQSxZQUNFOztBQS9DRjtFQUNFO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFJQTtFQUVFO0VBQ0E7O0FBSUE7RUFDRTtFQUNBO0VBQ0E7O0FBS0Y7RUFDRTs7QUFLTjtFQUNFOztBQVNGO0VBeERGO0lBeURJOzs7O0FBSUo7QUFBQTtFQUVFO0VBQ0E7RUFDQSIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgXCIuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO1xuXG5Aa2V5ZnJhbWVzIGRyb3BpbiB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxuICAxJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbn1cblxuLnBvcG92ZXIge1xuICB6LWluZGV4OiA5OTk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHBhZGRpbmc6IDFyZW07XG5cbiAgJiA+IC5wb3BvdmVyLWlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDMwcmVtO1xuICAgIG1heC1oZWlnaHQ6IDIwcmVtO1xuICAgIHBhZGRpbmc6IDAgMXJlbSAxcmVtIDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IGluaXRpYWw7XG4gICAgZm9udC1zdHlsZTogaW5pdGlhbDtcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgIGZvbnQtc2l6ZTogaW5pdGlhbDtcbiAgICBmb250LWZhbWlseTogdmFyKC0tYm9keUZvbnQpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxpZ2h0Z3JheSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBib3gtc2hhZG93OiA2cHggNnB4IDM2cHggMCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIH1cblxuICAmID4gLnBvcG92ZXItaW5uZXJbZGF0YS1jb250ZW50LXR5cGVdIHtcbiAgICAmW2RhdGEtY29udGVudC10eXBlKj1cInBkZlwiXSxcbiAgICAmW2RhdGEtY29udGVudC10eXBlKj1cImltYWdlXCJdIHtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgIH1cblxuICAgICZbZGF0YS1jb250ZW50LXR5cGUqPVwiaW1hZ2VcIl0ge1xuICAgICAgaW1nIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmW2RhdGEtY29udGVudC10eXBlKj1cInBkZlwiXSB7XG4gICAgICBpZnJhbWUge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gIH1cblxuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246XG4gICAgb3BhY2l0eSAwLjNzIGVhc2UsXG4gICAgdmlzaWJpbGl0eSAwLjNzIGVhc2U7XG5cbiAgQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogJG1vYmlsZUJyZWFrcG9pbnQpIHtcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuYTpob3ZlciAucG9wb3Zlcixcbi5wb3BvdmVyOmhvdmVyIHtcbiAgYW5pbWF0aW9uOiBkcm9waW4gMC4zcyBlYXNlO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xufVxuIl19 */`;import{Features,transform}from"lightningcss";import{transform as transpile}from"esbuild";function getComponentResources(ctx){let allComponents=new Set;for(let emitter of ctx.cfg.plugins.emitters){let components=emitter.getQuartzComponents(ctx);for(let component of components)allComponents.add(component)}let componentResources={css:new Set,beforeDOMLoaded:new Set,afterDOMLoaded:new Set};for(let component of allComponents){let{css,beforeDOMLoaded,afterDOMLoaded}=component;css&&componentResources.css.add(css),beforeDOMLoaded&&componentResources.beforeDOMLoaded.add(beforeDOMLoaded),afterDOMLoaded&&componentResources.afterDOMLoaded.add(afterDOMLoaded)}return{css:[...componentResources.css],beforeDOMLoaded:[...componentResources.beforeDOMLoaded],afterDOMLoaded:[...componentResources.afterDOMLoaded]}}__name(getComponentResources,"getComponentResources");async function joinScripts(scripts){let script=scripts.map(script2=>`(function () {${script2}})();`).join(`
`);return(await transpile(script,{minify:!0})).code}__name(joinScripts,"joinScripts");function addGlobalPageResources(ctx,componentResources){let cfg=ctx.cfg.configuration;if(cfg.enablePopovers&&(componentResources.afterDOMLoaded.push(popover_inline_default),componentResources.css.push(popover_default)),cfg.analytics?.provider==="google"){let tagId=cfg.analytics.tagId;componentResources.afterDOMLoaded.push(`
      const gtagScript = document.createElement("script")
      gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=${tagId}"
      gtagScript.async = true
      document.head.appendChild(gtagScript)

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "${tagId}", { send_page_view: false });

      document.addEventListener("nav", () => {
        gtag("event", "page_view", {
          page_title: document.title,
          page_location: location.href,
        });
      });`)}else if(cfg.analytics?.provider==="plausible"){let plausibleHost=cfg.analytics.host??"https://plausible.io";componentResources.afterDOMLoaded.push(`
      const plausibleScript = document.createElement("script")
      plausibleScript.src = "${plausibleHost}/js/script.manual.js"
      plausibleScript.setAttribute("data-domain", location.hostname)
      plausibleScript.defer = true
      document.head.appendChild(plausibleScript)

      window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }

      document.addEventListener("nav", () => {
        plausible("pageview")
      })
    `)}else cfg.analytics?.provider==="umami"?componentResources.afterDOMLoaded.push(`
      const umamiScript = document.createElement("script")
      umamiScript.src = "${cfg.analytics.host??"https://analytics.umami.is"}/script.js"
      umamiScript.setAttribute("data-website-id", "${cfg.analytics.websiteId}")
      umamiScript.async = true

      document.head.appendChild(umamiScript)
    `):cfg.analytics?.provider==="goatcounter"&&componentResources.afterDOMLoaded.push(`
      const goatcounterScript = document.createElement("script")
      goatcounterScript.src = "${cfg.analytics.scriptSrc??"https://gc.zgo.at/count.js"}"
      goatcounterScript.async = true
      goatcounterScript.setAttribute("data-goatcounter",
        "https://${cfg.analytics.websiteId}.${cfg.analytics.host??"goatcounter.com"}/count")
      document.head.appendChild(goatcounterScript)
    `);cfg.enableSPA?componentResources.afterDOMLoaded.push(spa_inline_default):componentResources.afterDOMLoaded.push(`
      window.spaNavigate = (url, _) => window.location.assign(url)
      window.addCleanup = () => {}
      const event = new CustomEvent("nav", { detail: { url: document.body.dataset.slug } })
      document.dispatchEvent(event)
    `)}__name(addGlobalPageResources,"addGlobalPageResources");var ComponentResources=__name(()=>({name:"ComponentResources",getQuartzComponents(){return[]},async getDependencyGraph(_ctx,_content,_resources){return new DepGraph},async emit(ctx,_content,_resources){let promises=[],cfg=ctx.cfg.configuration,componentResources=getComponentResources(ctx),googleFontsStyleSheet="";if(cfg.theme.fontOrigin!=="local"){if(cfg.theme.fontOrigin==="googleFonts"&&!cfg.theme.cdnCaching){let match,fontSourceRegex=/url\((https:\/\/fonts.gstatic.com\/s\/[^)]+\.(woff2|ttf))\)/g;for(googleFontsStyleSheet=await(await fetch(googleFontHref(ctx.cfg.configuration.theme))).text();(match=fontSourceRegex.exec(googleFontsStyleSheet))!==null;){let url=match[1],[filename,ext]=url.split("/").pop().split(".");googleFontsStyleSheet=googleFontsStyleSheet.replace(url,`https://${cfg.baseUrl}/static/fonts/${filename}.ttf`),promises.push(fetch(url).then(res=>{if(!res.ok)throw new Error("Failed to fetch font");return res.arrayBuffer()}).then(buf=>write({ctx,slug:joinSegments("static","fonts",filename),ext:`.${ext}`,content:Buffer.from(buf)})))}}}addGlobalPageResources(ctx,componentResources);let stylesheet=joinStyles(ctx.cfg.configuration.theme,googleFontsStyleSheet,...componentResources.css,custom_default),[prescript,postscript]=await Promise.all([joinScripts(componentResources.beforeDOMLoaded),joinScripts(componentResources.afterDOMLoaded)]);return promises.push(write({ctx,slug:"index",ext:".css",content:transform({filename:"index.css",code:Buffer.from(stylesheet),minify:!0,targets:{safari:984576,ios_saf:984576,edge:7536640,firefox:6684672,chrome:7143424},include:Features.MediaQueries}).code.toString()}),write({ctx,slug:"prescript",ext:".js",content:prescript}),write({ctx,slug:"postscript",ext:".js",content:postscript})),await Promise.all(promises)}}),"ComponentResources");var NotFoundPage=__name(()=>{let opts={...sharedPageComponents,pageBody:__default(),beforeBody:[],left:[],right:[]},{head:Head,pageBody,footer:Footer}=opts,Body2=Body_default();return{name:"404Page",getQuartzComponents(){return[Head,Body2,pageBody,Footer]},async getDependencyGraph(_ctx,_content,_resources){return new DepGraph},async emit(ctx,_content,resources){let cfg=ctx.cfg.configuration,slug="404",path13=new URL(`https://${cfg.baseUrl??"example.com"}`).pathname,externalResources=pageResources(path13,resources),notFound=i18n(cfg.locale).pages.error.title,[tree,vfile]=defaultProcessedContent({slug,text:notFound,description:notFound,frontmatter:{title:notFound,tags:[]}}),componentData={ctx,fileData:vfile.data,externalResources,cfg,children:[],tree,allFiles:[]};return[await write({ctx,content:renderPage(cfg,slug,componentData,opts,externalResources),slug,ext:".html"})]}}},"NotFoundPage");import chalk5 from"chalk";function getStaticResourcesFromPlugins(ctx){let staticResources={css:[],js:[]};for(let transformer of ctx.cfg.plugins.transformers){let res=transformer.externalResources?transformer.externalResources(ctx):{};res?.js&&staticResources.js.push(...res.js),res?.css&&staticResources.css.push(...res.css)}if(ctx.argv.serve){let wsUrl=ctx.argv.remoteDevHost?`wss://${ctx.argv.remoteDevHost}:${ctx.argv.wsPort}`:`ws://localhost:${ctx.argv.wsPort}`;staticResources.js.push({loadTime:"afterDOMReady",contentType:"inline",script:`
            const socket = new WebSocket('${wsUrl}')
            // reload(true) ensures resources like images and scripts are fetched again in firefox
            socket.addEventListener('message', () => document.location.reload(true))
          `})}return staticResources}__name(getStaticResourcesFromPlugins,"getStaticResourcesFromPlugins");async function emitContent(ctx,content){let{argv,cfg}=ctx,perf=new PerfTimer,log=new QuartzLogger(ctx.argv.verbose);log.start("Emitting output files");let emittedFiles=0,staticResources=getStaticResourcesFromPlugins(ctx);for(let emitter of cfg.plugins.emitters)try{let emitted=await emitter.emit(ctx,content,staticResources);if(emittedFiles+=emitted.length,ctx.argv.verbose)for(let file of emitted)console.log(`[emit:${emitter.name}] ${file}`)}catch(err){trace(`Failed to emit from plugin \`${emitter.name}\``,err)}log.end(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince()}`)}__name(emitContent,"emitContent");var config={configuration:{pageTitle:"Felix's Notes",enableSPA:!0,enablePopovers:!0,analytics:{provider:"plausible"},locale:"en-US",ignorePatterns:["private","templates",".obsidian",".quartz"],defaultDateType:"created",theme:{fontOrigin:"googleFonts",cdnCaching:!0,typography:{header:"Schibsted Grotesk",body:"Source Sans Pro",code:"IBM Plex Mono"},colors:{lightMode:{light:"#faf8f8",lightgray:"#e5e5e5",gray:"#b8b8b8",darkgray:"#4e4e4e",dark:"#2b2b2b",secondary:"#284b63",tertiary:"#84a59d",highlight:"rgba(143, 159, 169, 0.15)"},darkMode:{light:"#161618",lightgray:"#393639",gray:"#646464",darkgray:"#d4d4d4",dark:"#ebebec",secondary:"#7b97aa",tertiary:"#84a59d",highlight:"rgba(143, 159, 169, 0.15)"}}}},plugins:{transformers:[FrontMatter(),CreatedModifiedDate({priority:["frontmatter","filesystem"]}),Latex({renderEngine:"katex"}),SyntaxHighlighting({theme:{light:"github-light",dark:"github-dark"},keepBackground:!1}),ObsidianFlavoredMarkdown({enableInHtmlEmbed:!1}),GitHubFlavoredMarkdown(),TableOfContents(),CrawlLinks({markdownLinkResolution:"shortest"}),Description()],filters:[RemoveDrafts()],emitters:[AliasRedirects(),ComponentResources(),ContentPage(),FolderPage(),TagPage(),Assets(),Static(),NotFoundPage()]}},quartz_config_default=config;import chokidar from"chokidar";import fs5 from"fs";import{fileURLToPath}from"url";var options={retrieveSourceMap(source){if(source.includes(".quartz-cache")){let realSource=fileURLToPath(source.split("?",2)[0]+".map");return{map:fs5.readFileSync(realSource,"utf8")}}else return null}};sourceMapSupport.install(options);async function buildQuartz(argv,mut,clientRefresh){let ctx={argv,cfg:quartz_config_default,allSlugs:[]},perf=new PerfTimer,output=argv.output,pluginCount=Object.values(quartz_config_default.plugins).flat().length,pluginNames=__name(key=>quartz_config_default.plugins[key].map(plugin=>plugin.name),"pluginNames");argv.verbose&&(console.log(`Loaded ${pluginCount} plugins`),console.log(`  Transformers: ${pluginNames("transformers").join(", ")}`),console.log(`  Filters: ${pluginNames("filters").join(", ")}`),console.log(`  Emitters: ${pluginNames("emitters").join(", ")}`));let release=await mut.acquire();perf.addEvent("clean"),await rimraf(path12.join(output,"*"),{glob:!0}),console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince("clean")}`),perf.addEvent("glob");let allFiles=await glob("**/*.*",argv.directory,quartz_config_default.configuration.ignorePatterns),fps=allFiles.filter(fp=>fp.endsWith(".md")).sort();console.log(`Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince("glob")}`);let filePaths=fps.map(fp=>joinSegments(argv.directory,fp));ctx.allSlugs=allFiles.map(fp=>slugifyFilePath(fp));let parsedFiles=await parseMarkdown(ctx,filePaths),filteredContent=filterContent(ctx,parsedFiles),dependencies={};if(argv.fastRebuild){let staticResources=getStaticResourcesFromPlugins(ctx);for(let emitter of quartz_config_default.plugins.emitters)dependencies[emitter.name]=await emitter.getDependencyGraph?.(ctx,filteredContent,staticResources)??null}if(await emitContent(ctx,filteredContent),console.log(chalk6.green(`Done processing ${fps.length} files in ${perf.timeSince()}`)),release(),argv.serve)return startServing(ctx,mut,parsedFiles,clientRefresh,dependencies)}__name(buildQuartz,"buildQuartz");async function startServing(ctx,mut,initialContent,clientRefresh,dependencies){let{argv}=ctx,contentMap=new Map;for(let content of initialContent){let[_tree,vfile]=content;contentMap.set(vfile.data.filePath,content)}let buildData={ctx,mut,dependencies,contentMap,ignored:await isGitIgnored(),initialSlugs:ctx.allSlugs,toRebuild:new Set,toRemove:new Set,trackedAssets:new Set,lastBuildMs:0},watcher=chokidar.watch(".",{persistent:!0,cwd:argv.directory,ignoreInitial:!0}),buildFromEntry=argv.fastRebuild?partialRebuildFromEntrypoint:rebuildFromEntrypoint;return watcher.on("add",fp=>buildFromEntry(fp,"add",clientRefresh,buildData)).on("change",fp=>buildFromEntry(fp,"change",clientRefresh,buildData)).on("unlink",fp=>buildFromEntry(fp,"delete",clientRefresh,buildData)),async()=>{await watcher.close()}}__name(startServing,"startServing");async function partialRebuildFromEntrypoint(filepath,action,clientRefresh,buildData){let{ctx,ignored,dependencies,contentMap,mut,toRemove}=buildData,{argv,cfg}=ctx;if(ignored(filepath))return;let buildStart=new Date().getTime();buildData.lastBuildMs=buildStart;let release=await mut.acquire();if(buildData.lastBuildMs>buildStart){release();return}let perf=new PerfTimer;console.log(chalk6.yellow("Detected change, rebuilding..."));let fp=joinSegments(argv.directory,toPosixPath(filepath)),staticResources=getStaticResourcesFromPlugins(ctx),processedFiles=[];switch(action){case"add":processedFiles=await parseMarkdown(ctx,[fp]),processedFiles.forEach(([tree,vfile])=>contentMap.set(vfile.data.filePath,[tree,vfile]));for(let emitter of cfg.plugins.emitters){let emitterGraph=await emitter.getDependencyGraph?.(ctx,processedFiles,staticResources)??null;if(emitterGraph){let existingGraph=dependencies[emitter.name];existingGraph!==null?existingGraph.mergeGraph(emitterGraph):dependencies[emitter.name]=emitterGraph}}break;case"change":if(processedFiles=await parseMarkdown(ctx,[fp]),processedFiles.forEach(([tree,vfile])=>contentMap.set(vfile.data.filePath,[tree,vfile])),path12.extname(fp)===".md")for(let emitter of cfg.plugins.emitters){let emitterGraph=await emitter.getDependencyGraph?.(ctx,processedFiles,staticResources)??null;emitterGraph?.hasNode(fp)&&dependencies[emitter.name]?.updateIncomingEdgesForNode(emitterGraph,fp)}break;case"delete":toRemove.add(fp);break}argv.verbose&&console.log(`Updated dependency graphs in ${perf.timeSince()}`),perf.addEvent("rebuild");let emittedFiles=0;for(let emitter of cfg.plugins.emitters){let depGraph=dependencies[emitter.name];if(depGraph===null){argv.verbose&&console.log(`Emitter ${emitter.name} doesn't define a dependency graph. Calling it with all files...`);let files=[...contentMap.values()].filter(([_node,vfile])=>!toRemove.has(vfile.data.filePath)),emittedFps=await emitter.emit(ctx,files,staticResources);if(ctx.argv.verbose)for(let file of emittedFps)console.log(`[emit:${emitter.name}] ${file}`);emittedFiles+=emittedFps.length;continue}if(depGraph.hasNode(fp)){let upstreamContent=[...depGraph.getLeafNodeAncestors(fp)].filter(file=>contentMap.has(file)).filter(file=>!toRemove.has(file)).map(file=>contentMap.get(file)),emittedFps=await emitter.emit(ctx,upstreamContent,staticResources);if(ctx.argv.verbose)for(let file of emittedFps)console.log(`[emit:${emitter.name}] ${file}`);emittedFiles+=emittedFps.length}}console.log(`Emitted ${emittedFiles} files to \`${argv.output}\` in ${perf.timeSince("rebuild")}`);let destinationsToDelete=new Set;for(let file of toRemove)contentMap.delete(file),Object.values(dependencies).forEach(depGraph=>{depGraph?.removeNode(file),depGraph?.removeOrphanNodes()?.forEach(node=>{node.startsWith(argv.output)&&destinationsToDelete.add(node)})});await rimraf([...destinationsToDelete]),console.log(chalk6.green(`Done rebuilding in ${perf.timeSince()}`)),toRemove.clear(),release(),clientRefresh()}__name(partialRebuildFromEntrypoint,"partialRebuildFromEntrypoint");async function rebuildFromEntrypoint(fp,action,clientRefresh,buildData){let{ctx,ignored,mut,initialSlugs,contentMap,toRebuild,toRemove,trackedAssets}=buildData,{argv}=ctx;if(ignored(fp))return;fp=toPosixPath(fp);let filePath=joinSegments(argv.directory,fp);if(path12.extname(fp)!==".md"){action==="add"||action==="change"?trackedAssets.add(filePath):action==="delete"&&trackedAssets.delete(filePath),clientRefresh();return}action==="add"||action==="change"?toRebuild.add(filePath):action==="delete"&&toRemove.add(filePath);let buildStart=new Date().getTime();buildData.lastBuildMs=buildStart;let release=await mut.acquire();if(buildData.lastBuildMs>buildStart){release();return}let perf=new PerfTimer;console.log(chalk6.yellow("Detected change, rebuilding..."));try{let filesToRebuild=[...toRebuild].filter(fp2=>!toRemove.has(fp2)),trackedSlugs=[...new Set([...contentMap.keys(),...toRebuild,...trackedAssets])].filter(fp2=>!toRemove.has(fp2)).map(fp2=>slugifyFilePath(path12.posix.relative(argv.directory,fp2)));ctx.allSlugs=[...new Set([...initialSlugs,...trackedSlugs])];let parsedContent=await parseMarkdown(ctx,filesToRebuild);for(let content of parsedContent){let[_tree,vfile]=content;contentMap.set(vfile.data.filePath,content)}for(let fp2 of toRemove)contentMap.delete(fp2);let parsedFiles=[...contentMap.values()],filteredContent=filterContent(ctx,parsedFiles);await rimraf(path12.join(argv.output,".*"),{glob:!0}),await emitContent(ctx,filteredContent),console.log(chalk6.green(`Done rebuilding in ${perf.timeSince()}`))}catch(err){console.log(chalk6.yellow("Rebuild failed. Waiting on a change to fix the error...")),argv.verbose&&console.log(chalk6.red(err))}release(),clientRefresh(),toRebuild.clear(),toRemove.clear()}__name(rebuildFromEntrypoint,"rebuildFromEntrypoint");var build_default=__name(async(argv,mut,clientRefresh)=>{try{return await buildQuartz(argv,mut,clientRefresh)}catch(err){trace(`
Exiting Quartz due to a fatal error`,err)}},"default");export{build_default as default};
//# sourceMappingURL=transpiled-build.mjs.map
