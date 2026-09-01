import { useEffect } from 'react';

/**
 * SEOMetadata — Injects dynamic structured data and meta tags into the DOM
 * at runtime. This supplements the static JSON-LD in index.html with
 * Schema.org microdata that Googlebot (which executes JS) can extract.
 * 
 * Also injects additional <meta> tags for discoverability by AI crawlers,
 * Bing, Yandex, and social platforms.
 */
const SEOMetadata = () => {
  useEffect(() => {
    // ─── Dynamic meta tags injected at runtime ───
    const metaTags = [
      // Bing / Microsoft
      { name: 'msvalidate.01', content: '' }, // Add Bing verification code if available
      { name: 'msnbot', content: 'index, follow' },
      // Yandex
      { name: 'yandex-verification', content: '' },
      // AI/LLM-specific
      { name: 'ai-content-declaration', content: 'This is the personal portfolio of Tanish Anand. All content is original.' },
      { name: 'identity', content: 'Tanish Anand' },
      // Dublin Core metadata (used by academic and enterprise crawlers)
      { name: 'DC.title', content: 'Tanish Anand - Founder, Developer, Researcher' },
      { name: 'DC.creator', content: 'Tanish Anand' },
      { name: 'DC.subject', content: 'AI, Machine Learning, Cybersecurity, Web Development, NLP, OSINT, Edge Computing' },
      { name: 'DC.description', content: 'Personal portfolio of Tanish Anand - co-founder and CTO of Vivacity, creator of Project Rudra, Research Fellow at IIT Kanpur, Y Combinator Startup School alum.' },
      { name: 'DC.type', content: 'PersonalSite' },
      { name: 'DC.format', content: 'text/html' },
      { name: 'DC.language', content: 'en' },
      // Geo metadata (helps local search)
      { name: 'geo.region', content: 'IN' },
      { name: 'geo.country', content: 'India' },
      // ICBM (latitude/longitude for geo-aware crawlers)
      { name: 'ICBM', content: '28.6139, 77.2090' }, // Delhi/NCR region
      // Revisit and cache hints
      { name: 'revisit-after', content: '7 days' },
      { name: 'coverage', content: 'Worldwide' },
      { name: 'distribution', content: 'Global' },
      { name: 'target', content: 'all' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'MobileOptimized', content: '320' },
      // Apple specific
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'Tanish Anand' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      // Application name
      { name: 'application-name', content: 'Tanish Anand Portfolio' },
    ];

    const injected = [];

    metaTags.forEach(({ name, content }) => {
      if (!content) return; // Skip empty verification codes
      // Don't duplicate if already exists
      if (document.querySelector(`meta[name="${name}"]`)) return;
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
      injected.push(meta);
    });

    // ─── Additional JSON-LD: FAQ structured data for Google ───
    // This helps your name show up with expandable FAQ snippets in search
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Tanish Anand?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tanish Anand is a developer, founder, and researcher building at the intersection of AI, hardware, and the web. He is the co-founder and CTO of Vivacity, creator of Project Rudra (GPU-accelerated OSINT command grid), and a Research Fellow at IIT Kanpur under Prof. Adithya Vadapalli. He was named India's Top Young Founder of the Year 2026 at Uniform2Unicorn."
          }
        },
        {
          "@type": "Question",
          "name": "What is Tanish Anand's GitHub?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tanish Anand's GitHub profile is https://github.com/Tanish-Anand1 where he publishes open-source projects including Project Rudra, CareLink, EduCore, ComplianceGuard, and more."
          }
        },
        {
          "@type": "Question",
          "name": "What is Tanish Anand's LinkedIn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tanish Anand's LinkedIn profile is https://www.linkedin.com/in/tanish-anand24/ where he shares research updates, project announcements, and professional connections."
          }
        },
        {
          "@type": "Question",
          "name": "What is Tanish Anand's X (Twitter)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tanish Anand's X (formerly Twitter) handle is @sullaxive. His profile is at https://x.com/sullaxive."
          }
        },
        {
          "@type": "Question",
          "name": "What is Vivacity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vivacity is an API-first video infrastructure platform for LLMs, co-founded by Tanish Anand (CTO). It turns prompts, documents, and AI answers into mathematically exact, narrated explainer videos in near-real-time."
          }
        },
        {
          "@type": "Question",
          "name": "What is Project Rudra?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project Rudra is a GPU-accelerated global OSINT command grid built by Tanish Anand. It integrates real-time flight tracking, marine channels, active CCTV networks, seismic activity, and live global broadcasts in a 60fps WebGL interface. Live at https://osirisai.live."
          }
        },
        {
          "@type": "Question",
          "name": "What research does Tanish Anand do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tanish Anand is a Research Fellow at IIT Kanpur under Prof. Adithya Vadapalli (CSE Dept.), researching discrete text diffusion architectures (SEDD, LLaDA) and benchmarking them against auto-regressive LLMs on Hindi NLP pipelines."
          }
        },
        {
          "@type": "Question",
          "name": "What awards has Tanish Anand won?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tanish Anand won India's Top Young Founder of the Year 2026 (#1 of 3,500+) at Uniform2Unicorn, was selected for Y Combinator Startup School, ranked in the top 20 builders at VIBECON (out of 20,000+), won 15+ hackathons across North India, and earned security bug bounty awards for responsible vulnerability disclosures."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);
    injected.push(faqScript);

    // ─── Additional JSON-LD: ProfilePage (Google's newer schema) ───
    const profileSchema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "dateCreated": "2025-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntity": {
        "@type": "Person",
        "name": "Tanish Anand",
        "alternateName": ["sullaxive", "Tanish-Anand1"],
        "identifier": [
          { "@type": "PropertyValue", "propertyID": "GitHub", "value": "Tanish-Anand1" },
          { "@type": "PropertyValue", "propertyID": "LinkedIn", "value": "tanish-anand24" },
          { "@type": "PropertyValue", "propertyID": "X", "value": "sullaxive" }
        ],
        "url": "https://tanish.gg",
        "sameAs": [
          "https://github.com/Tanish-Anand1",
          "https://www.linkedin.com/in/tanish-anand24/",
          "https://x.com/sullaxive",
          "https://twitter.com/sullaxive"
        ],
        "interactionStatistic": [
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/WriteAction",
            "userInteractionCount": "7",
            "name": "Software Projects Published"
          }
        ]
      }
    };

    const profileScript = document.createElement('script');
    profileScript.type = 'application/ld+json';
    profileScript.textContent = JSON.stringify(profileSchema);
    document.head.appendChild(profileScript);
    injected.push(profileScript);

    // ─── Additional JSON-LD: Blog/Article schemas ───
    const articlesSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Tanish Anand's Research Blog",
      "url": "https://tanish.gg/#blog",
      "author": { "@type": "Person", "name": "Tanish Anand", "url": "https://tanish.gg" },
      "blogPost": [
        {
          "@type": "BlogPosting",
          "headline": "Text Diffusion vs Auto-Regressive LLMs for Hindi NLP",
          "datePublished": "2025-10-01",
          "author": { "@type": "Person", "name": "Tanish Anand" },
          "description": "Research insights on Discrete Text Diffusion benchmarks (SEDD, LLaDA) from the CSE research group at IIT Kanpur.",
          "keywords": ["NLP", "Text Diffusion", "SEDD", "LLaDA", "Hindi", "IIT Kanpur"]
        },
        {
          "@type": "BlogPosting",
          "headline": "How I Reverse Engineered Live Camera Streams for Project Rudra",
          "datePublished": "2025-08-01",
          "author": { "@type": "Person", "name": "Tanish Anand" },
          "description": "Sub-100ms video decoding loops and low-latency multiplexing pipelines into a WebGL-based radar sphere for OSINT monitoring.",
          "keywords": ["OSINT", "WebGL", "RTSP", "Project Rudra", "Video Streaming"]
        }
      ]
    };

    const articlesScript = document.createElement('script');
    articlesScript.type = 'application/ld+json';
    articlesScript.textContent = JSON.stringify(articlesSchema);
    document.head.appendChild(articlesScript);
    injected.push(articlesScript);

    // ─── Additional JSON-LD: EducationalOccupationalCredential ───
    const credentialsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Credentials & Affiliations of Tanish Anand",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "EducationalOccupationalCredential",
            "name": "Research Fellow",
            "credentialCategory": "Research Fellowship",
            "recognizedBy": {
              "@type": "EducationalOrganization",
              "name": "IIT Kanpur",
              "url": "https://www.iitk.ac.in/"
            },
            "description": "Research Fellow under Prof. Adithya Vadapalli, CSE Department, IIT Kanpur. Working on discrete text diffusion and Hindi NLP."
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "EducationalOccupationalCredential",
            "name": "Y Combinator Startup School",
            "credentialCategory": "Startup Program",
            "recognizedBy": {
              "@type": "Organization",
              "name": "Y Combinator",
              "url": "https://www.ycombinator.com"
            }
          }
        }
      ]
    };

    const credScript = document.createElement('script');
    credScript.type = 'application/ld+json';
    credScript.textContent = JSON.stringify(credentialsSchema);
    document.head.appendChild(credScript);
    injected.push(credScript);

    // Cleanup on unmount
    return () => {
      injected.forEach(el => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, []);

  // This component renders nothing visible — it only injects metadata
  return null;
};

export default SEOMetadata;
