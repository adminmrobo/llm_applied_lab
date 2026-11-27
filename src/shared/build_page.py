"""응용편 페이지 조립: python3 shared/build_page.py A2"""
import json, sys, os, subprocess, importlib.util
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # src/
REPO=os.path.dirname(ROOT)
P=sys.argv[1]; PD=os.path.join(ROOT,P)
sys.path.insert(0,os.path.join(ROOT,'shared'))
spec=importlib.util.spec_from_file_location('kgdef',os.path.join(PD,'kg_def.py')); kd=importlib.util.module_from_spec(spec); spec.loader.exec_module(kd)
KG,LD,rel=kd.kg.build(kd.REGISTRY)
M=kd.META; R=kd.REFS
def js(o): return json.dumps(o,ensure_ascii=False).replace("</","<\\/")
PACK=os.environ.get('LAB_PACK','/home/claude/ahnboat_lab_explainer/packs/character/character_pack')
keys=open(os.path.join(PD,'sprites.txt')).read().split()
spr=subprocess.run(['python3',os.path.join(PACK,'build_character_pack.py'),'--pack',PACK,'--pick',','.join(keys),'--size','96'],capture_output=True,text=True,check=True).stdout
head=open(os.path.join(ROOT,'shared','head.html')).read()
css=open(os.path.join(ROOT,'shared','style.css')).read()
pcss=os.path.join(PD,'page.css'); css+=open(pcss).read() if os.path.exists(pcss) else ''
body=open(os.path.join(PD,'body.html')).read()
core=open(os.path.join(PD,'core.js')).read() if os.path.exists(os.path.join(PD,'core.js')) else ''
data=open(os.path.join(PD,'data.json')).read() if os.path.exists(os.path.join(PD,'data.json')) else '{}'
pjs=open(os.path.join(PD,'page.js')).read()
h=head
for k,v in M['html'].items(): h=h.replace('{{'+k+'}}',v)
h=h.replace('{{CSS}}',css)
scripts=('<script type="application/json" id="kg-raw">'+js(KG)+'</script>\n<script type="application/ld+json" id="kg-ld">'+js(LD)+'</script>\n'
 '<script type="application/json" id="refs-csl">'+js(R)+'</script>\n<script type="application/json" id="page-meta">'+js(M['meta'])+'</script>\n'
 '<script>\n'+spr+'\n'+core.replace('if(typeof module!==\'undefined\')module.exports','if(false)module.exports')+'\nvar DATA='+data.strip()+';\n'
 +open(os.path.join(ROOT,'shared','common_head.js')).read()+'\n'+pjs+'\n'+open(os.path.join(ROOT,'shared','common_tail.js')).read()+'\n</script>\n</body></html>\n')
out=h+body+scripts
fn=os.path.join(REPO,M['file'])
open(fn,'w').write(out)
os.makedirs(os.path.join(REPO,'kg'),exist_ok=True)
json.dump(KG,open(os.path.join(REPO,'kg','kg_'+P+'.json'),'w'),ensure_ascii=False,indent=1)
print(P,'nodes',len(KG['nodes']),'edges',len(KG['edges']),'relatedTo%',round(rel*100,1),'size',len(out.encode())//1024,'KB',fn)
