import json,urllib.request,urllib.parse,concurrent.futures
from html.parser import HTMLParser
from pathlib import Path
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set();self.h1=0;self.title='';self.in_title=False;self.meta={};self.imgs=[];self.canonical=[];self.jsonld=[];self.in_json=False;self.jsontext=""
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if t=='script' and a.get('type')=='application/ld+json':self.in_json=True;self.jsontext=''
  if t=='a' and a.get('href'):self.links.append(a['href'])
  if t=='h1':self.h1+=1
  if t=='title':self.in_title=True
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='img':self.imgs.append(a)
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
  if t=='script' and self.in_json:self.jsonld.append(json.loads(self.jsontext));self.in_json=False
 def handle_data(self,d):
  if self.in_title:self.title+=d
  if self.in_json:self.jsontext+=d
base='http://127.0.0.1:3100';seen={};todo={'/'}
def get(path):
 try:
  r=urllib.request.urlopen(base+path,timeout=30);p=Page();p.feed(r.read().decode());return path,(r.status,p)
 except Exception as e:return path,(str(e),None)
while todo:
 batch=todo-set(seen);todo=set()
 if not batch:break
 for path,result in concurrent.futures.ThreadPoolExecutor(max_workers=4).map(get,batch):
  seen[path]=result
  if result[1]:
   for href in result[1].links:
    u=urllib.parse.urlsplit(urllib.parse.urljoin(base+path,href))
    if u.netloc=='127.0.0.1:3100':
     route=u.path or '/'
     if route not in seen and not route.startswith(('/api/','/admin/')):todo.add(route)
issues=[]
for path,(status,p) in seen.items():
 if not p:issues.append([path,status]);continue
 if p.h1!=1:issues.append([path,'h1 count',p.h1])
 if '/preview/' not in path and not path.startswith(('/account','/login','/signup','/admin')) and len(p.canonical)!=1:issues.append([path,'canonical count',len(p.canonical)])
 if not p.jsonld:issues.append([path,'missing structured data'])
 if '/preview/' not in path and not path.startswith(('/account','/login','/signup','/admin')) and not p.meta.get('og:title'):issues.append([path,'missing OpenGraph'])
 if not p.meta.get('description'):issues.append([path,'missing description'])
 for h in p.links:
  u=urllib.parse.urlsplit(urllib.parse.urljoin(base+path,h));target=seen.get(u.path or '/')
  if u.netloc=='127.0.0.1:3100' and u.fragment and target and target[1] and urllib.parse.unquote(u.fragment) not in target[1].ids:issues.append([path,'broken anchor',h])
 for img in p.imgs:
  if 'alt' not in img:issues.append([path,'missing alt',img.get('src')])
report={'count':len(seen),'issues':issues,'pages':[{'path':p,'status':s,'title':v.title if v else '', 'canonical':v.canonical if v else [],'robots':v.meta.get('robots') if v else None} for p,(s,v) in sorted(seen.items())]}
Path('audit-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({'count':len(seen),'issues':issues},ensure_ascii=True))
