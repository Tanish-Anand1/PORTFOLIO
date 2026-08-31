import { useState } from 'react';
import { writingPosts } from '../content/writing';

const WritingIndex = ({ onBack, onOpenPost }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <main className="studio writing-page">
      <div className="studio-top">
        <button type="button" className="studio-mark" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          ← tanish
        </button>
        <nav className="studio-nav" aria-label="Primary">
          <button type="button" className="studio-cta" onClick={onBack}>
            home
          </button>
        </nav>
      </div>

      <h1 className="studio-page-title">writing</h1>
      <p className="studio-prose" style={{ marginBottom: 8 }}>
        notes from whatever i was building or debugging that week. mostly video, diffusion models, origin stories, and things that broke at 3am. drop your email if you want a ping when something new goes up.
      </p>

      <ul className="writing-list">
        {writingPosts.map((post) => (
          <li key={post.slug} className="writing-item">
            <span className="writing-year">{post.year}</span>
            <div className="writing-meta">
              <button type="button" className="writing-title" onClick={() => onOpenPost(post.slug)}>
                {post.title}
              </button>
              <p className="writing-summary">{post.summary}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="writing-notify-label">get notified when i write something new:</p>

      {subscribed ? (
        <p className="writing-subscribed">you're on the list. i'll ping you.</p>
      ) : (
        <form className="writing-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            required
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="your email"
          />
          <button type="submit">notify me</button>
        </form>
      )}

      <footer className="studio-footer">
        <button type="button" onClick={onBack}>
          ← home
        </button>
        <span>tanish · 2026</span>
      </footer>
    </main>
  );
};

export default WritingIndex;
