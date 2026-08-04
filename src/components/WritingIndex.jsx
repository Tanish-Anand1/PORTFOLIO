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
    <main className="essay writing-page">
      <nav className="essay-nav" aria-label="Primary">
        <button type="button" className="essay-nav-btn" onClick={onBack}>
          ← tanish
        </button>
      </nav>

      <article className="essay-body">
        <h1>writing.</h1>

        <p>
          i write when a problem won't leave me alone — research notes, build logs, the occasional rant dressed up as an essay. sporadic. honest. drop your email below and i'll ping you when something new goes up.
        </p>

        <ul className="writing-list">
          {writingPosts.map((post) => (
            <li key={post.slug} className="writing-item">
              <span className="writing-year">{post.year}</span>
              <div className="writing-meta">
                <button
                  type="button"
                  className="writing-title"
                  onClick={() => onOpenPost(post.slug)}
                >
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
      </article>

      <footer className="essay-footer">
        <button type="button" onClick={onBack}>
          ← home
        </button>
        <span>v01 2026</span>
      </footer>
    </main>
  );
};

export default WritingIndex;
