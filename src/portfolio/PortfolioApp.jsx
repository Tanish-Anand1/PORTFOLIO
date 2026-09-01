import { useState } from "react";
import OrbitSimulation from "./OrbitSimulation.jsx";
import { site, highlights, projects, posts, workNotes, routeMeta } from "./content.js";
import { Brand, CompanyText } from "./Brand.jsx";

function Arrow({ external = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {external ? "↗" : "→"}
    </span>
  );
}
function External({ href, children, className = "" }) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      <CompanyText>{children}</CompanyText>
      <Arrow external />
    </a>
  );
}

function Shell({ path, children }) {
  const nav = [
    ["/", "Home"],
    ["/projects", "Projects"],
    ["/research", "Research"],
    ["/writing", "Writing"],
  ];
  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(path)) }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Tanish Anand, home">
          ta<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          {nav.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={
                (href === "/" ? path === "/" : path.startsWith(href))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href={`mailto:${site.email}`}>
          Say hello <Arrow external />
        </a>
      </header>
      <main id="main" tabIndex="-1">
        {children}
      </main>
      <footer className="site-footer">
        <a href="/">Tanish Anand</a>
        <div>
          <a href={site.github} target="_blank" rel="noreferrer">
            <Brand name="github">GitHub</Brand> <Arrow external />
          </a>
          <a href={site.twitter} target="_blank" rel="noreferrer">
            <Brand name="x">X</Brand> <Arrow external />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            <Brand name="linkedin">LinkedIn</Brand> <Arrow external />
          </a>
          <a href={site.booking} target="_blank" rel="noreferrer">
            <Brand name="cal">Book a call</Brand> <Arrow external />
          </a>
          <a href={`mailto:${site.email}`}>
            Email <Arrow external />
          </a>
        </div>
      </footer>
    </div>
  );
}

function schemaFor(path) {
  const meta = routeMeta(path);
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Tanish Anand", item: site.url },
  ];
  if (path !== "/") crumbs.push({ "@type": "ListItem", position: 2, name: meta.title.split(" | ")[0], item: `${site.url}${path}` });
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    description: meta.description,
    url: `${site.url}${path === "/" ? "/" : path}`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: crumbs },
  };
  if (path === "/vivacity") {
    schema.mainEntity = {
      "@type": "TechArticle",
      headline: "Vivacity: simulation infrastructure for AI agents",
      description: meta.description,
      author: { "@type": "Person", name: site.name, url: site.url },
      about: ["simulation runtime", "persistent world state", "branching execution", "verification"],
    };
  }
  const post = posts.find((item) => path === `/writing/${item.slug}`);
  if (post) {
    schema["@type"] = "BlogPosting";
    schema.headline = post.title;
    schema.datePublished = post.dateISO;
    schema.author = { "@type": "Person", name: site.name, url: site.url };
  }
  const project = projects.find((item) => path === `/projects/${item.slug}`);
  if (project) {
    schema["@type"] = "CreativeWork";
    schema.headline = project.title;
    schema.author = { "@type": "Person", name: site.name, url: site.url };
  }
  return schema;
}

function Home() {
  return (
    <>
      <section className="intro">
        <h1>
          Tanish Anand<span className="name-period">.</span>
        </h1>
        <p style={{ fontStyle: "italic", color: "var(--muted)", margin: "-0.5rem 0 1.5rem 0" }}>
          Against the whole world.
        </p>
        <p className="intro-lead">
          <CompanyText>
            I’m 16. Founder & CTO of{" "}
            <a href="/vivacity">
              <Brand name="vivacity">Vivacity</Brand>
            </a>
            , building simulation infrastructure for AI agents.
          </CompanyText>
        </p>
        <p className="intro-secondary">
          <CompanyText>
            Research Fellow at{" "}
            <a href="/research">
              <Brand name="iitk">IIT Kanpur</Brand>
            </a>
            . I work on AI systems, robotics, and the software underneath them.
          </CompanyText>
        </p>
      </section>
      <section
        className="highlights"
        aria-label="Selected work and recognition"
      >
        {highlights.map((item) => (
          <a className="highlight" key={item.name} href={item.href}>
            <Brand name={item.logo}>{item.name}</Brand>
            <span className="highlight-detail">{item.detail}</span>
            <Arrow external />
          </a>
        ))}
        <a className="quiet-link background-link" href="/work">
          Work & background <Arrow />
        </a>
      </section>
      <section className="home-vivacity">
        <div className="section-title">
          <h2>
            <a href="/vivacity">
              <Brand name="vivacity">Vivacity</Brand>
            </a>
          </h2>
          <span className="mono">Building now</span>
        </div>
        <p className="section-description">
          <CompanyText>
            A runtime where agents can act on a world, branch its future, and
            check the outcome.
          </CompanyText>
        </p>
        <OrbitSimulation compact />
        <a className="text-link" href="/vivacity">
          Inside the runtime <Arrow />
        </a>
      </section>
      <section className="home-projects">
        <div className="section-title">
          <h2>Selected projects</h2>
          <a className="quiet-link" href="/projects">
            All projects <Arrow />
          </a>
        </div>
        <div className="selected-grid">
          {["robowars", "osiris"].map((slug) => {
            const p = projects.find((item) => item.slug === slug);
            return (
              <a
                className="selected-project"
                key={slug}
                href={`/projects/${slug}`}
              >
                <div className="project-image">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    width="720"
                    height="450"
                  />
                </div>
                <div className="project-title">
                  <h3>{p.title}</h3>
                  <Arrow />
                </div>
                <p>
                  <CompanyText>{p.summary}</CompanyText>
                </p>
              </a>
            );
          })}
        </div>
      </section>
      <section className="home-writing">
        <div className="section-title">
          <h2>Writing</h2>
          <a className="quiet-link" href="/writing">
            All notes <Arrow />
          </a>
        </div>
        {posts
          .filter((p) =>
            ["text-diffusion-hindi", "osiris-camera-ingest"].includes(p.slug),
          )
          .map((post) => (
            <a
              className="note-row"
              href={`/writing/${post.slug}`}
              key={post.slug}
            >
              <span>{post.title}</span>
              <span className="mono">
                {post.year}
                <Arrow />
              </span>
            </a>
          ))}
      </section>
      <p className="closing-note">
        <CompanyText>
          If you’re working on simulation, embodied intelligence, or something
          difficult in between,{" "}
          <a href={`mailto:${site.email}`}>I’d like to hear about it.</a>
        </CompanyText>
      </p>
      <div className="contact-links">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <External href={site.booking}>
          <Brand name="cal">Book a call</Brand>
        </External>
        <External href={site.twitter}>
          <Brand name="x">X</Brand>
        </External>
        <External href={site.linkedin}>
          <Brand name="linkedin">LinkedIn</Brand>
        </External>
      </div>
    </>
  );
}

function PageHeader({ back = "/", backLabel = "Home", title, children, meta }) {
  return (
    <header className="page-heading">
      <a className="back-link" href={back}>
        ← {backLabel}
      </a>
      <h1>{title}</h1>
      {meta && (
        <p className="page-meta mono">
          <CompanyText>{meta}</CompanyText>
        </p>
      )}
      {children && <div className="page-lead">{children}</div>}
    </header>
  );
}

function Vivacity() {
  return (
    <>
      <PageHeader
        title={<Brand name="vivacity">Vivacity</Brand>}
        meta="Co-founder & CTO / 2026 to present"
      >
        <p>
          <CompanyText>
            Simulation infrastructure for agents that need to reason about what
            happens next.
          </CompanyText>
        </p>
      </PageHeader>
      <div className="page-links">
        <External href="https://www.tryvivacity.com/">Visit Vivacity</External>
        <a href="#playground">
          Try the model <Arrow />
        </a>
      </div>
      <article className="article-body">
        <section>
          <h2>A world an agent can act on</h2>
          <p>
            <CompanyText>
              I’m building Vivacity with Aditya Bhatia and Pavitra Kushwaha.
              We’re working on the execution layer between an agent and the
              environments it needs to reason about.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              The runtime gives an agent a persistent world: inspect its state,
              apply an action, simulate forward, fork alternatives, verify
              constraints, and commit a branch. Different domains can use
              different simulators behind that interface.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              My focus is research and simulation infrastructure. The technical
              surface spans reasoning stacks, discrete diffusion, and the
              representation of state through an execution.
            </CompanyText>
          </p>
        </section>
        <section className="runtime-contract">
          <h2>The execution loop</h2>
          <p>
            <CompanyText>
              A branch starts from a parent state. Actions produce a trajectory;
              checks determine which outcomes can be committed.
            </CompanyText>
          </p>
          <div className="contract-chain" aria-label="Runtime flow">
            <span>World state</span>
            <b aria-hidden="true">→</b>
            <span>Action</span>
            <b aria-hidden="true">→</b>
            <span>Branches</span>
            <b aria-hidden="true">→</b>
            <span>Verify</span>
            <b aria-hidden="true">→</b>
            <span>Commit</span>
          </div>
          <pre>
            <code>{`world = create(spec)
state = world.observe()

branch = world.fork()
branch.act(action)
trace = branch.simulate(horizon)
report = branch.verify(constraints)

if report.passed:
    world.commit(branch)`}</code>
          </pre>
          <p className="caption">
            <CompanyText>
              Conceptual interface based on Vivacity’s public runtime contract.
            </CompanyText>
          </p>
        </section>
      </article>
      <section id="playground" className="playground-section">
        <p className="experiment-kicker mono">
          Vivacity / Research experiments / 001
        </p>
        <h2>Orbital dynamics workbench.</h2>
        <p className="section-description">
          <CompanyText>
            Apply an impulse, inspect the trajectory, and compare
            counterfactuals. Verify the physics before promoting a branch.
          </CompanyText>
        </p>
        <OrbitSimulation />
        <details className="model-details">
          <summary>Model, units & constraints</summary>
          <div>
            <p>
              <CompanyText>
                This local example integrates Newtonian two-body motion with
                velocity Verlet. The gravitational parameter μ and central-body
                radius R are both 1. The initial orbital radius is 1.8 R, with
                circular speed √(μ/r).
              </CompanyText>
            </p>
            <p>
              <CompanyText>
                Each branch is simulated for up to 20 dimensionless time units
                at Δt = 0.0125. Integration stops if the body intersects the
                central surface. The model excludes drag, perturbations, and
                multi-body interactions.
              </CompanyText>
            </p>
            <p>
              <CompanyText>
                Verification checks negative specific energy, analytic periapsis
                above 1 R, and maximum absolute energy drift below 0.001. Commit
                promotes the simulated endpoint. Rollback restores the previous
                parent. Reset restores the initial circular orbit.
              </CompanyText>
            </p>
          </div>
        </details>
      </section>
      <article className="article-body">
        <section>
          <h2>State, observations, and rendering</h2>
          <p>
            <CompanyText>
              A world state needs enough information to continue execution. In
              the orbital example, that is position and velocity under a fixed
              gravitational model. An observation reads some view of that state;
              the diagram is one such view.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              Keeping these concerns separate lets an agent inspect quantities
              directly. A planning loop can compare energy or clearance without
              rendering a frame. Rendering becomes useful when a person or a
              vision model needs to see the result.
            </CompanyText>
          </p>
        </section>
        <section>
          <h2>Routing an execution</h2>
          <p>
            <CompanyText>
              Vivacity’s public architecture puts a router behind the runtime
              contract. Its backend families include exact physics, scientific
              solvers, robotics simulators, learned world models, game engines,
              and private domain backends.
            </CompanyText>
          </p>
          <div className="backend-list">
            <div>
              <h3>Physics & scientific solvers</h3>
              <p>
                <CompanyText>
                  Domains with explicit laws, numerical methods, and quantities
                  that can be checked.
                </CompanyText>
              </p>
            </div>
            <div>
              <h3>Robotics & interactive environments</h3>
              <p>
                <CompanyText>
                  Contact, kinematics, sensors, geometry, and actions inside an
                  environment.
                </CompanyText>
              </p>
            </div>
            <div>
              <h3>Learned world models</h3>
              <p>
                <CompanyText>
                  Predicted observations and transitions, with model uncertainty
                  carried into the decision.
                </CompanyText>
              </p>
            </div>
          </div>
          <p>
            <CompanyText>
              The design question is which execution semantics a branch needs:
              what state the backend accepts, what an action means, and what
              guarantees accompany its output.
            </CompanyText>
          </p>
        </section>
        <section>
          <h2>Verification belongs in the loop</h2>
          <p>
            <CompanyText>
              Checks depend on the domain. The orbit above uses energy and
              periapsis. Other environments need their own constraints, units,
              tolerances, and failure conditions.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              A fork keeps the original world available while an alternative is
              evaluated. A failed branch can be discarded or revised. A passing
              branch can become the new state. This makes the consequence of
              each decision inspectable.
            </CompanyText>
          </p>
        </section>
        <section>
          <h2>Working on the runtime</h2>
          <p>
            <CompanyText>
              Vivacity is taking design-partner conversations with teams
              building agents, robotics, scientific tools, and autonomy. The
              useful starting point is a real environment, the actions an agent
              should take, and the checks that make those actions acceptable.
            </CompanyText>
          </p>
          <External
            href="https://www.tryvivacity.com/demo"
            className="text-link"
          >
            Talk to the team
          </External>
        </section>
        <aside className="sources">
          <h2>Technical context</h2>
          <p>
            <CompanyText>
              Product description and interface:{" "}
              <External href="https://www.tryvivacity.com/">Vivacity</External>.
              The embedded model is an independent browser implementation of the
              branching workflow. Backend categories describe the public
              architecture, without asserting that each named provider is
              integrated.
            </CompanyText>
          </p>
        </aside>
      </article>
    </>
  );
}

function ProjectIndex() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visible = projects.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      `${p.title} ${p.summary} ${p.tech.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeader title="Projects">
        <p>
          <CompanyText>
            Software, machines, and a few things that meet in the middle.
          </CompanyText>
        </p>
      </PageHeader>
      <a className="vivacity-index-link" href="/vivacity">
        <Brand name="vivacity">Vivacity</Brand>
        <span>Simulation runtime for AI agents</span>
        <Arrow />
      </a>
      <div className="project-tools">
        <div className="filter-list" role="group" aria-label="Filter projects">
          {["All", "AI", "Systems", "Hardware", "Community"].map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search-label">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            placeholder="Find a project…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="result-count mono" role="status">
        <CompanyText>
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </CompanyText>
      </p>
      <div className="project-index">
        {visible.map((p) => (
          <a
            href={`/projects/${p.slug}`}
            className="index-project"
            key={p.slug}
          >
            <span className="index-year mono">{p.year}</span>
            <div>
              <h2>{p.title}</h2>
              <p>
                <CompanyText>{p.summary}</CompanyText>
              </p>
              <span className="tech-line">
                <CompanyText>{p.tech.join(" / ")}</CompanyText>
              </span>
            </div>
            <Arrow />
          </a>
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <h2>No matching projects</h2>
          <p>
            <CompanyText>
              Try a project name, a tool, or another category.
            </CompanyText>
          </p>
          <button
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <aside className="earlier-projects">
        <h2>Earlier experiments</h2>
        <p>
          <CompanyText>
            ORCA, D2AR, ORBIS 2045, LumenSeed, and ClusterOrch-Gym.
          </CompanyText>
        </p>
        <External href={site.github}>More on GitHub</External>
      </aside>
    </>
  );
}

function ProjectPage({ project: p }) {
  return (
    <>
      <PageHeader
        back="/projects"
        backLabel="Projects"
        title={p.title}
        meta={`${p.role} / ${p.year}`}
      >
        <p>
          <CompanyText>{p.subtitle}</CompanyText>
        </p>
      </PageHeader>
      <div className="project-facts">
        <span>{p.status}</span>
        <span>
          <CompanyText>{p.tech.join(" / ")}</CompanyText>
        </span>
      </div>
      {p.image && (
        <figure className="case-image">
          <img
            src={p.image}
            alt={p.alt}
            width="1080"
            height={p.slug === "osiris" ? "608" : "810"}
          />
          <figcaption>
            {p.slug === "osiris"
              ? "OSIRIS interface capture from the project archive."
              : "A combat robot from the build archive."}
          </figcaption>
        </figure>
      )}
      <article className="article-body">
        {p.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            {s.body.map((paragraph, i) => (
              <p key={i}>
                <CompanyText>{paragraph}</CompanyText>
              </p>
            ))}
          </section>
        ))}
        {p.gallery && (
          <div className="project-gallery">
            {p.gallery.map((src, i) => (
              <figure key={src}>
                <img
                  src={src}
                  alt={
                    [
                      "Early combat-robot concept",
                      "Robot assembly on a workshop floor",
                      "Robots in a competition arena",
                      "Robotics team beside the arena",
                    ][i]
                  }
                  width="720"
                  height="540"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        )}
        {p.link && (
          <External href={p.link} className="text-link">
            Open {p.title}
          </External>
        )}
        {p.relatedPost && (
          <a className="text-link" href={`/writing/${p.relatedPost}`}>
            Read the engineering note <Arrow />
          </a>
        )}
        <div className="article-end">
          <a href="/projects">← All projects</a>
        </div>
      </article>
    </>
  );
}

function Research() {
  return (
    <>
      <PageHeader title="Research">
        <p>
          <CompanyText>
            Language models, private computation, and environments that agents
            can reason through.
          </CompanyText>
        </p>
      </PageHeader>
      <div className="research-affiliation">
        <Brand name="iitk">IIT Kanpur</Brand>
        <span>Research Fellow</span>
      </div>
      <article className="article-body">
        <section>
          <h2>Discrete diffusion for language</h2>
          <p>
            <CompanyText>
              My work explores discrete text diffusion and Hindi NLP, including
              comparisons of SEDD and LLaDA-style models with autoregressive
              language models.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              The questions start with representation: how Devanagari is
              tokenized, how corruption changes a sequence, and how denoising
              behavior shifts across languages. Comparing model families also
              means accounting for sampling steps, tokenization, and inference
              cost.
            </CompanyText>
          </p>
          <a className="text-link" href="/writing/text-diffusion-hindi">
            Read my Hindi diffusion note <Arrow />
          </a>
        </section>
        <section>
          <h2>MPC & cryptography</h2>
          <p>
            <CompanyText>
              I’m a Research Fellow at IIT Kanpur, working on MPC and
              cryptography under Prof. Adithya Vadapalli.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              Secure multi-party computation studies how parties can compute a
              joint function while controlling what is revealed about their
              inputs. The interesting boundaries sit in the protocol, the threat
              model, and the cost of communication.
            </CompanyText>
          </p>
          <External href="https://www.iitk.ac.in/">IIT Kanpur</External>
        </section>
        <section>
          <h2>Simulation infrastructure</h2>
          <p>
            <CompanyText>
              At Vivacity, I work on the runtime connecting agents to executable
              environments. State, branching, and domain-specific verification
              are central to that work.
            </CompanyText>
          </p>
          <a className="text-link" href="/vivacity">
            Inside Vivacity <Arrow />
          </a>
        </section>
        <section className="reading-list">
          <h2>Papers behind the work</h2>
          <p>
            <CompanyText>
              Background reading for the model families above.
            </CompanyText>
          </p>
          <a
            href="https://arxiv.org/abs/2310.16834"
            target="_blank"
            rel="noreferrer"
          >
            <strong>
              Discrete Diffusion Modeling by Estimating the Ratios of the Data
              Distribution
            </strong>
            <span>Aaron Lou, Chenlin Meng, Stefano Ermon / ICML 2024</span>
            <p>
              <CompanyText>
                Introduces score entropy for learning discrete diffusion models.
              </CompanyText>
            </p>
          </a>
          <a
            href="https://arxiv.org/abs/2502.09992"
            target="_blank"
            rel="noreferrer"
          >
            <strong>Large Language Diffusion Models</strong>
            <span>Shen Nie et al. / 2025</span>
            <p>
              <CompanyText>
                LLaDA models language through a masking process and learned
                token prediction.
              </CompanyText>
            </p>
          </a>
        </section>
      </article>
    </>
  );
}

function Work() {
  return (
    <>
      <PageHeader title="Work & background">
        <p>
          <CompanyText>
            AI research, open-source systems, and hardware.
          </CompanyText>
        </p>
      </PageHeader>
      <article className="article-body work-body">
        <section className="work-opening">
          <h2>the work has one thread</h2>
          <p>
            most of this started where a clean idea runs into something that
            refuses to behave. in robowars, that was an 8 kg machine meeting an
            arena wall at IIT Bombay. in research at IIT Kanpur, it was Hindi
            getting broken apart by tokenizers trained for English. in OSIRIS,
            it was live video feeds, timestamp drift, and browser garbage
            collection deciding whether a map could stay smooth.
          </p>
          <p>
            the settings changed, but the work kept pulling in the same
            direction. robotics with Google DeepMind. Grok open-source work
            with xAI. bare-metal firmware for an Anduril project that I cannot
            write much about. an Inflection grant. then back to the less
            photogenic part: workers, buffers, sensors, power budgets, and
            things that need to keep working after the demo ends.
          </p>
          <p>
            Vivacity is where those threads meet. I am building it as a system
            where agents can act on a world, branch what happens next, and
            check the result. still early. still being built. but it is the
            closest thing here to the work I want to keep doing.
          </p>
        </section>
        <section id="deepmind">
          <h2>
            <Brand name="deepmind">Google DeepMind</Brand>
          </h2>
          <p className="work-role">
            <CompanyText>Robotics</CompanyText>
          </p>
          <p>
            <CompanyText>Worked with Google DeepMind on robotics.</CompanyText>
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a className="text-link" href="/work/deepmind">
              read more <Arrow />
            </a>
            <External href="https://deepmind.google/">site</External>
          </div>
        </section>
        <section id="xai">
          <h2>
            <Brand name="xai">xAI</Brand>
          </h2>
          <p className="work-role">
            <CompanyText>Grok / open source</CompanyText>
          </p>
          <p>
            <CompanyText>Worked with xAI on Grok open source.</CompanyText>
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a className="text-link" href="/work/xai">
              read more <Arrow />
            </a>
            <External href="https://github.com/xai-org">site</External>
          </div>
        </section>
        <section id="anduril">
          <h2>
            <Brand name="anduril">Anduril</Brand>
          </h2>
          <p className="work-role">
            <CompanyText>Bare-metal firmware</CompanyText>
          </p>
          <p>
            <CompanyText>
              Built firmware for an Anduril project. The project details are
              redacted.
            </CompanyText>
          </p>
          <div className="redacted-line" aria-label="Project details redacted" style={{ marginBottom: "16px" }}>
            <span aria-hidden="true">████████ ████████ █████</span>
            <code>REDACTED</code>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a className="text-link" href="/work/anduril">
              read more <Arrow />
            </a>
          </div>
        </section>
        <section id="inflection">
          <h2>
            <Brand name="inflection">Inflection</Brand>
          </h2>
          <p className="work-role">
            <CompanyText>Grant recipient</CompanyText>
          </p>
          <p>
            <CompanyText>Received an Inflection grant.</CompanyText>
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "16px" }}>
            <a className="text-link" href="/work/inflection">
              read more <Arrow />
            </a>
          </div>
        </section>
        <section>
          <h2>
            <Brand name="iitb">IIT Bombay</Brand>
          </h2>
          <p className="work-role">
            <CompanyText>International Robowars / 2025</CompanyText>
          </p>
          <p>
            <CompanyText>Winner of the 8 kg category.</CompanyText>
          </p>
          <a className="text-link" href="/projects/robowars">
            See the robots <Arrow />
          </a>
        </section>
        <section>
          <h2>Currently</h2>
          <p>
            <CompanyText>
              Founder & CTO at <a href="/vivacity">Vivacity</a>. Research Fellow
              at <a href="/research">IIT Kanpur</a>. Co-founder of{" "}
              <a href="/projects/byteforge">ByteForge</a>.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              I’ve also worked on video infrastructure at Prolearn in Bangalore.
            </CompanyText>
          </p>
        </section>
        <section>
          <h2>A little further back</h2>
          <p>
            <CompanyText>
              I started with a Scratch game during lockdown. My brother
              introduced me to Python, then web development gave way to
              robotics, and robotics led me into AI.
            </CompanyText>
          </p>
          <p>
            <CompanyText>
              I’m 16. Outside work, I play tennis and spend too much time taking
              software apart to understand how it works.
            </CompanyText>
          </p>
          <a className="text-link" href="/writing/the-first-thing-i-built">
            The first thing I built <Arrow />
          </a>
        </section>
      </article>
    </>
  );
}

function Writing() {
  return (
    <>
      <PageHeader title="Writing">
        <p>
          <CompanyText>
            Research notes, engineering problems, and the occasional detour.
          </CompanyText>
        </p>
      </PageHeader>
      <div className="writing-index">
        {posts.map((post) => (
          <a href={`/writing/${post.slug}`} key={post.slug}>
            <time className="mono" dateTime={post.dateISO}>
              {post.dateLabel}
            </time>
            <h2>
              {post.title}
              <Arrow />
            </h2>
            <p>
              <CompanyText>{post.summary}</CompanyText>
            </p>
          </a>
        ))}
      </div>
    </>
  );
}

function Post({ post }) {
  return (
    <>
      <PageHeader
        back="/writing"
        backLabel="Writing"
        title={post.title}
        meta={post.dateLabel}
      />
      <article className="article-body post-body">
        {post.body.map((paragraph, i) => (
          <p key={i}>
            <CompanyText>{paragraph}</CompanyText>
          </p>
        ))}
        {post.media?.images && (
          <div className="project-gallery">
            {post.media.images.map((item) => (
              <figure key={item.src}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width="720"
                  height="540"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        )}
        <div className="article-end">
          <a href="/writing">← All writing</a>
        </div>
      </article>
    </>
  );
}

function WorkNote({ note }) {
  return (
    <>
      <PageHeader
        back="/work"
        backLabel="Work"
        title={<span style={{ textTransform: "lowercase", fontFamily: "var(--font-serif)", fontWeight: "normal" }}>{note.title}</span>}
        meta={`${note.date} · ${note.role}`}
      >
        <p style={{ fontStyle: "italic", opacity: 0.8 }}>
          <CompanyText>{note.subtitle}</CompanyText>
        </p>
        <p className="mono" style={{ fontSize: "0.85rem", opacity: 0.6, marginTop: "2rem" }}>
          {note.views} · <a href={`mailto:${site.email}`} style={{ textDecoration: "underline", color: "inherit" }}>leave a note →</a>
        </p>
      </PageHeader>
      <article className="article-body">
        {note.body.map((paragraph, i) => (
          <p key={i}>
            <CompanyText>{paragraph}</CompanyText>
          </p>
        ))}
        <div className="article-end">
          <a href="/work">← Back to work</a>
        </div>
      </article>
    </>
  );
}


export default function PortfolioApp({
  path = typeof window === "undefined"
    ? "/"
    : window.location.pathname.replace(/\/$/, "") || "/",
}) {
  const project = projects.find((p) => path === `/projects/${p.slug}`);
  const post = posts.find((p) => path === `/writing/${p.slug}`);
  const workNote = workNotes.find((n) => path === `/work/${n.slug}`);
  const pages = {
    "/": <Home />,
    "/vivacity": <Vivacity />,
    "/projects": <ProjectIndex />,
    "/research": <Research />,
    "/work": <Work />,
    "/writing": <Writing />,
  };
  const page = project ? (
    <ProjectPage project={project} />
  ) : post ? (
    <Post post={post} />
  ) : workNote ? (
    <WorkNote note={workNote} />
  ) : (
    pages[path] || (
      <>
        <PageHeader title="Page not found">
          <p>
            <CompanyText>This address has moved or doesn’t exist.</CompanyText>
          </p>
        </PageHeader>
        <a className="text-link" href="/">
          Return home <Arrow />
        </a>
      </>
    )
  );
  return <Shell path={path}>{page}</Shell>;
}
