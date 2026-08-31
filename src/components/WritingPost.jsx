import { getPostBySlug } from '../content/writing';

const WritingPost = ({ slug, onBack, onWriting }) => {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="studio writing-page">
        <div className="studio-top">
          <button
            type="button"
            className="studio-mark"
            onClick={onWriting}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← writing
          </button>
        </div>
        <h1 className="studio-page-title">not found</h1>
        <p className="studio-prose">that post doesn't exist.</p>
      </main>
    );
  }

  return (
    <main className="studio writing-page">
      <div className="studio-top">
        <button
          type="button"
          className="studio-mark"
          onClick={onWriting}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← writing
        </button>
        <nav className="studio-nav" aria-label="Primary">
          <button type="button" onClick={onBack}>
            home
          </button>
        </nav>
      </div>

      <article className="writing-post">
        <h1 className="studio-page-title">{post.title}</h1>
        <p className="writing-post-date">
          <time dateTime={post.dateISO}>{post.dateLabel}</time>
        </p>
        <div className="studio-prose">
          {post.body.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        </div>

        {post.media ? (
          <section className="writing-media" aria-label="Robot archive">
            <h2 className="writing-media-title">the robot archive</h2>
            <div className="writing-media-grid">
              {post.media.images.map((image) => (
                <figure key={image.src} className="writing-media-figure">
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="writing-video-list">
              {post.media.videos.map((video) => (
                <figure key={video.src} className="writing-media-figure">
                  <video controls preload="metadata" playsInline poster={video.poster}>
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                  <figcaption>{video.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <footer className="studio-footer">
        <button type="button" onClick={onBack}>
          ← home
        </button>
        <button type="button" onClick={onWriting}>
          ← writing
        </button>
      </footer>
    </main>
  );
};

export default WritingPost;
