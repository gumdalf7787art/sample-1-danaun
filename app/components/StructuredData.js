import {siteUrl, siteName} from '../data/seo';

const context = 'https://schema.org';
const clinicId = siteUrl + '/#clinic';
const websiteId = siteUrl + '/#website';

export function JsonLd({data}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;
}

export function ClinicData() {
  return <JsonLd data={{'@context':context, '@graph':[
    {
      '@type':'Organization', '@id':clinicId, name:siteName, url:siteUrl,
      logo:siteUrl+'/images/danaun-wordmark.svg',
    },
    {'@type':'WebSite', '@id':websiteId, url:siteUrl, name:siteName, inLanguage:'ko-KR', publisher:{'@id':clinicId}},
  ]}}/>;
}

export function PageData({path,name,article,breadcrumbParent,medicalDescription,medicalCondition,citation}) {
  const url = siteUrl + path;
  const breadcrumbId = url + '#breadcrumb';
  const trail = [
    ['홈', '/'],
    ...(breadcrumbParent ? [[breadcrumbParent.name,breadcrumbParent.path]] : []),
    [name,path],
  ];
  const byline = article?.author === siteName
    ? {'@id':clinicId}
    : {'@type':'Person',name:article?.author};
  const references = citation || article?.sources?.map(source=>source.url).filter(url=>/^https?:\/\//i.test(url));
  const page = {
    '@type': medicalDescription ? 'MedicalWebPage' : 'WebPage', '@id':url+'#page',
    url, name, inLanguage:'ko-KR', isPartOf:{'@id':websiteId}, publisher:{'@id':clinicId},
    breadcrumb:{'@id':breadcrumbId},
    ...(medicalDescription && {description:medicalDescription, reviewedBy:{'@id':clinicId}}),
    ...(medicalCondition && {about:{'@type':'MedicalCondition', name:medicalCondition}}),
    ...(citation && {citation}),
  };
  if (article) {
    page.mainEntity = {
      '@type':'BlogPosting', '@id':url+'#article',
      headline:article.title, description:article.summary, datePublished:article.publishedAt,
      dateModified:article.updatedAt || undefined, author:byline, publisher:{'@id':clinicId},
      mainEntityOfPage:{'@id':page['@id']}, inLanguage:'ko-KR',
      image:article.cover?.src ? new URL(article.cover.src, siteUrl).href : undefined,
      citation:references?.length ? references : undefined,
    };
    if (article.reviewedBy) {
      page.reviewedBy = article.reviewedBy === '다나은재활의학과의원 의료진'
        ? {'@id':clinicId}
        : {'@type':'Person',name:article.reviewedBy};
      page.lastReviewed = article.reviewedAt || undefined;
    }
  }
  return <JsonLd data={{'@context':context, '@graph':[
    {'@type':'BreadcrumbList', '@id':breadcrumbId, itemListElement:trail.map(([name,path],index)=>({
      '@type':'ListItem', position:index+1, name, item:siteUrl+path,
    }))},
    page,
  ]}}/>;
}
