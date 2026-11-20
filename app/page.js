import HomeMedia from './components/HomeMedia';
import {getClinicMedia} from '../lib/clinic-media.mjs';
import HomePage from './components/HomePage';
import {pageMeta} from './data/seo';

const searchMetadata = pageMeta(
  '/',
  '리셋재활의학과의원 | 용인 수지 동천 · 정밀 진단과 재활',
  '용인 수지구 동천역 리셋재활의학과의원. 이고은 재활의학과 전문의의 통증 평가, 근골격계 초음파, 재생치료와 운동재활 안내 및 진료시간·예약을 확인하세요.',
);
const shareCopy = {
  title: '리셋재활의학과의원 | RESET REGEN | 재생치료 PRP 재활',
  description: '용인 수지구 동천역 정형외과 재활의학과 이고은 재활의학과 전문의 진료 정확한 원인분석과 체계적인 치료',
};

export const metadata = {
  ...searchMetadata,
  openGraph: {...searchMetadata.openGraph, ...shareCopy},
  twitter: {...searchMetadata.twitter, ...shareCopy},
};
export const dynamic = 'force-static';

export default async function Home() {
  const media = await getClinicMedia();
  return <>
    <link rel="preload" as="image" href="/images/hero-regen-depth-mobile.webp" media="(max-width: 640px)" fetchPriority="high"/>
    <link rel="preload" as="image" href="/images/hero-regen-depth.webp" media="not all and (max-width: 640px)" fetchPriority="high"/>
    <HomePage media={<HomeMedia initialMedia={media}/>}/>
  </>;
}
