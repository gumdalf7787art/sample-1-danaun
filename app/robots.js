import {siteUrl,isPublic} from './data/seo.js';
export default function robots(){return isPublic?{rules:{userAgent:'*',allow:'/'},sitemap:siteUrl+'/sitemap.xml'}:{rules:{userAgent:'*',disallow:'/'}};}
