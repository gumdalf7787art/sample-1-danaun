import HomeHealthColumns from './HomeHealthColumns';
import YouTubeShowcase from './YouTubeShowcase';

export default function ClinicMedia({youtubeFeed, latestColumns, showArchiveLink = true}) {
  return (
    <>
      <YouTubeShowcase feed={youtubeFeed} showArchiveLink={showArchiveLink}/>
      <div className="home-media-divider" aria-hidden="true"/>
      <HomeHealthColumns posts={latestColumns}/>
    </>
  );
}
