import {siteUrl, siteName} from '../data/seo';

const context = 'https://schema.org';
const clinicId = siteUrl + '/#clinic';
const websiteId = siteUrl + '/#website';

export function JsonLd({data}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;
}

export function ClinicData() {
  const weekdays = ['Monday','Tuesday','Thursday','Friday'];
  const hours = [
    [weekdays, '09:00', '13:00'],
    [weekdays, '14:00', '18:30'],
    [['Saturday'], '08:00', '13:00'],
  ];
  return <JsonLd data={{'@context':context, '@graph':[
    {
      '@type':'MedicalClinic', '@id':clinicId, name:siteName, url:siteUrl,
      telephone:'+82-31-263-2520', logo:siteUrl+'/images/reset-clinic-logo.png',
      medicalSpecialty:context+'/Musculoskeletal',
      hasMap:'https://maps.google.com/?cid=8211545949978838193',
      address:{'@type':'PostalAddress', streetAddress:'손곡로 95 송란아트프라자 2층',
        addressLocality:'용인시 수지구', addressRegion:'경기도', addressCountry:'KR'},
      openingHoursSpecification:hours.map(([dayOfWeek,opens,closes]) => ({
        '@type':'OpeningHoursSpecification', dayOfWeek:dayOfWeek.map(day=>context+'/'+day), opens, closes,
      })),
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
      page.reviewedBy = article.reviewedBy === '리셋재활의학과의원 의료진'
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
