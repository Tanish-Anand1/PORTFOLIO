import { getPostBySlug } from '../content/writing';

const WritingPost = ({ slug, onBack, onWriting }) => {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="essay writing-page">
        <nav className="essay-nav">
          <button type="button" className="essay-nav-btn" onClick={onWriting}>
            ← writing
          </button>
        </nav>
        <article className="essay-body">
          <h1>not found.</h1>
          <p>that post doesn't exist.</p>
        </article>
      </main>
    );
  }

  return (
    <main className="essay writing-page">
      <nav className="essay-nav" aria-label="Primary">
        <button type="button" className="essay-nav-btn" onClick={onWriting}>
          ← writing
        </button>
      </nav>

      <article className="essay-body writing-post">
        <h1>{post.title.toLowerCase()}</h1>
        <p className="writing-post-date">
          <time dateTime={post.dateISO}>{post.dateLabel}</time>
        </p>

        {post.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </article>

      <footer className="essay-footer">
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
