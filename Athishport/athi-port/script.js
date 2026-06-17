/* ============================================================
   A DEVELOPER PORTFOLIO — script.js
   Features: typing effect, dark/light toggle, GitHub fetch,
             reveal animations, custom cursor, nav scroll,
             skill bar animations, form handling
   ============================================================ */

'use strict';

/* ── Typing Effect ─────────────────────────────────────────── */
const TYPING_STRINGS = [
  'full-stack web apps.',
  'AI-powered solutions.',
  'scalable APIs.',
  'beautiful UIs.',
  'intelligent chatbots.',
  'real-time dashboards.',
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typeOut');

function typeLoop() {
  if (!typingEl) return;
  const current = TYPING_STRINGS[typeIndex];

  if (isDeleting) {
    charIndex--;
    typingEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typingEl.textContent = current.substring(0, charIndex);
  }

  let delay = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % TYPING_STRINGS.length;
    delay = 350;
  }

  setTimeout(typeLoop, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeLoop, 800);
});

/* ── SKILLS DATA & GRID POPULATION ────────────────────────── */
const SKILLS_DATA = [
  // Programming Languages
  { name: 'C', icon: 'fas fa-code', level: 85, category: 'languages' },
  { name: 'Python', icon: 'fab fa-python', level: 92, category: 'languages' },
  { name: 'Java', icon: 'fab fa-java', level: 88, category: 'languages' },
  { name: 'Go', icon: 'fas fa-code', level: 78, category: 'languages' },
  { name: 'MySQL', icon: 'fas fa-database', level: 90, category: 'languages' },
  
  // Frontend
  { name: 'HTML5', icon: 'fab fa-html5', level: 95, category: 'frontend' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', level: 95, category: 'frontend' },
  { name: 'React', icon: 'fab fa-react', level: 90, category: 'frontend' },
  { name: 'JavaScript', icon: 'fab fa-js-square', level: 92, category: 'frontend' },
  { name: 'TypeScript', icon: 'fas fa-code', level: 88, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', icon: 'fab fa-node-js', level: 90, category: 'backend' },
  { name: 'Express.js', icon: 'fas fa-server', level: 88, category: 'backend' },
  { name: 'Python', icon: 'fab fa-python', level: 92, category: 'backend' },
  { name: 'MongoDB', icon: 'fas fa-database', level: 88, category: 'backend' },
  { name: 'REST APIs', icon: 'fas fa-plug', level: 92, category: 'backend' },
  
  // OOP Concepts
  { name: 'Encapsulation', icon: 'fas fa-lock', level: 95, category: 'oops' },
  { name: 'Inheritance', icon: 'fas fa-project-diagram', level: 90, category: 'oops' },
  { name: 'Polymorphism', icon: 'fas fa-code-branch', level: 88, category: 'oops' },
  { name: 'Abstraction', icon: 'fas fa-lightbulb', level: 92, category: 'oops' },
  { name: 'Design Patterns', icon: 'fas fa-cube', level: 85, category: 'oops' },
  { name: 'SOLID Principles', icon: 'fas fa-building', level: 88, category: 'oops' },
  
  // Data Structures & Algorithms
  { name: 'Arrays & Lists', icon: 'fas fa-list', level: 95, category: 'dsa' },
  { name: 'Trees & Graphs', icon: 'fas fa-sitemap', level: 90, category: 'dsa' },
  { name: 'Sorting Algos', icon: 'fas fa-arrow-up-a-z', level: 92, category: 'dsa' },
  { name: 'Dynamic Prog', icon: 'fas fa-chart-line', level: 88, category: 'dsa' },
  { name: 'Hash Tables', icon: 'fas fa-key', level: 92, category: 'dsa' },
  { name: 'Binary Search', icon: 'fas fa-binoculars', level: 93, category: 'dsa' },
  
  // AI / ML
  { name: 'Machine Learning', icon: 'fas fa-brain', level: 85, category: 'ai' },
  { name: 'NLP', icon: 'fas fa-language', level: 82, category: 'ai' },
  { name: 'Data Analysis', icon: 'fas fa-chart-bar', level: 85, category: 'ai' },
  { name: 'Pandas', icon: 'fas fa-table', level: 87, category: 'ai' },
  
  // DevOps
  { name: 'Docker', icon: 'fab fa-docker', level: 85, category: 'devops' },
  { name: 'Git & GitHub', icon: 'fab fa-github', level: 95, category: 'devops' },
  { name: 'Linux', icon: 'fab fa-linux', level: 80, category: 'devops' },
];

let currentSkillFilter = 'all';

// Initialize skill observer first
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.sk-fill');
      fills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        void fill.offsetWidth;
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 50);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

function renderSkills(filter = 'all') {
  const grid = document.getElementById('skillGrid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === filter);

  grid.innerHTML = '';

  filtered.forEach((skill, idx) => {
    const card = document.createElement('div');
    card.className = 'sk-card';
    card.style.animationDelay = `${idx * 40}ms`;
    
    card.innerHTML = `
      <div class="sk-ico">
        <i class="${skill.icon}"></i>
      </div>
      <div class="sk-name">${skill.name}</div>
      <div class="sk-bar">
        <div class="sk-fill" style="width: ${skill.level}%"></div>
      </div>
      <div class="sk-lvl">${skill.level}%</div>
    `;
    
    grid.appendChild(card);
    skillObserver.observe(card);
  });
}

// Initialize skills on page load
document.addEventListener('DOMContentLoaded', () => {
  renderSkills('all');
});

// Tab filtering
const skillTabs = document.getElementById('skillTabs');
if (skillTabs) {
  skillTabs.addEventListener('click', e => {
    if (e.target.classList.contains('stab')) {
      document.querySelectorAll('.stab').forEach(tab => tab.classList.remove('active'));
      e.target.classList.add('active');
      
      const category = e.target.getAttribute('data-cat');
      currentSkillFilter = category;
      renderSkills(category);
    }
  });
}

/* ── Dark / Light Theme Toggle ─────────────────────────────── */
const themeToggle = document.getElementById('themeBtn');
const themeIcon   = document.getElementById('themeIco');
const htmlEl      = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('ATheme', theme);
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-moon';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeIcon.className = 'fas fa-sun';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// Load saved preference
const savedTheme = localStorage.getItem('ATheme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── Navbar scroll behaviour ───────────────────────────────── */
const header  = document.getElementById('header');
const backTop = document.getElementById('btt');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  backTop.classList.toggle('show', y > 400);
  updateActiveNav();
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Active nav link on scroll ─────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nl');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

/* ── Mobile hamburger menu ─────────────────────────────────── */
const hamburger  = document.getElementById('burger');
const mobileMenu = document.getElementById('mobOverlay');
const mobLinks   = document.querySelectorAll('.mob-nl');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Smooth scroll for all anchor links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return; // Skip empty hash links
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Reveal on scroll (IntersectionObserver) ───────────────── */
const revealEls = document.querySelectorAll('.rv');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill bar animation ────────────────────────────────────── */
// Already handled in renderSkills() with skillObserver integration

/* ── GitHub Live Projects Fetch ────────────────────────────── */
// Change this to your real GitHub username to fetch live repos
const GITHUB_USERNAME = 'Adeveloper'; // ← Replace with real username

const ghStatusText = document.getElementById('ghStatusText');
const ghRepoName   = document.getElementById('ghRepoName');
const ghRepoDesc   = document.getElementById('ghRepoDesc');
const ghRepoTags   = document.getElementById('ghRepoTags');
const ghMeta       = document.getElementById('ghMeta');

async function fetchGitHubRepos() {
  const cacheKey  = 'AGhRepos';
  const cacheTime = 'AGhTime';
  const TTL       = 10 * 60 * 1000; // 10 minutes

  // Check cache
  const cached = localStorage.getItem(cacheKey);
  const cachedAt = parseInt(localStorage.getItem(cacheTime) || '0');
  if (cached) {
    try {
      if (Date.now() - cachedAt < TTL) {
        displayGitHubRepo(JSON.parse(cached));
        return;
      }
    } catch (e) {
      // Invalid cache, continue to fetch
    }
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos = await res.json();
    const filtered = repos.filter(r => !r.fork && r.description);
    const topRepo  = filtered[0] || repos[0];

    localStorage.setItem(cacheKey, JSON.stringify(topRepo));
    localStorage.setItem(cacheTime, Date.now().toString());

    displayGitHubRepo(topRepo);
  } catch (err) {
    console.warn('GitHub fetch failed:', err.message);
    showGitHubFallback();
  }
}

function displayGitHubRepo(repo) {
  if (!repo) { showGitHubFallback(); return; }

  ghStatusText.textContent = `@${repo.owner?.login || GITHUB_USERNAME} on GitHub`;

  if (ghRepoName) ghRepoName.textContent = repo.name || 'Latest Repo';
  if (ghRepoDesc) ghRepoDesc.textContent = repo.description || 'No description available.';

  if (ghRepoTags) {
    ghRepoTags.innerHTML = '';
    if (repo.language) {
      const tag = document.createElement('span');
      tag.textContent = repo.language;
      ghRepoTags.appendChild(tag);
    }
    const liveTag = document.createElement('span');
    liveTag.textContent = '⚡ GitHub Live';
    liveTag.style.color = 'var(--accent-2)';
    ghRepoTags.appendChild(liveTag);
  }

  if (ghMeta) {
    ghMeta.innerHTML = `
      <span><i class="fas fa-star"></i> ${repo.stargazers_count || 0}</span>
      <span><i class="fas fa-code-branch"></i> ${repo.forks_count || 0}</span>
      <span><i class="fas fa-clock"></i> ${timeAgo(repo.updated_at)}</span>
    `;
  }

  // Attach link
  const card = document.getElementById('ghLiveCard');
  if (card && repo.html_url) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => window.open(repo.html_url, '_blank'));
  }
}

function showGitHubFallback() {
  if (ghStatusText) ghStatusText.textContent = 'GitHub (demo mode)';
  if (ghRepoName) ghRepoName.textContent = 'AI Portfolio Builder';
  if (ghRepoDesc) ghRepoDesc.textContent = 'AI-powered tool to generate stunning portfolio sites dynamically from a simple configuration file.';
  if (ghRepoTags) ghRepoTags.innerHTML = '<span>TypeScript</span><span>⚡ GitHub Live</span>';
  if (ghMeta) ghMeta.innerHTML = `
    <span><i class="fas fa-star"></i> 84</span>
    <span><i class="fas fa-code-branch"></i> 12</span>
    <span><i class="fas fa-clock"></i> 2 days ago</span>
  `;
}

function timeAgo(dateString) {
  if (!dateString) return 'recently';
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours   = Math.floor(diff / 3600000);
  const days    = Math.floor(diff / 86400000);
  if (minutes < 60)  return `${minutes}m ago`;
  if (hours   < 24)  return `${hours}h ago`;
  if (days    < 30)  return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// Run GitHub fetch after DOM is ready
window.addEventListener('load', () => {
  setTimeout(fetchGitHubRepos, 500);
});

/* ── Custom Cursor ──────────────────────────────────────────── */
const cursorDot     = document.querySelector('.cur-dot');
const cursorOutline = document.querySelector('.cur-ring');

if (window.matchMedia('(hover: hover)').matches && cursorDot && cursorOutline) {
  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Smooth trailing outline
  function animateCursor() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    cursorOutline.style.left = outX + 'px';
    cursorOutline.style.top  = outY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Expand on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .project-card, .contact-info-item');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('expand'));
  });
}

/* ── Contact Form ───────────────────────────────────────────── */
const contactForm = document.getElementById('cForm');
const submitBtn   = document.getElementById('cfBtn');
const formSuccess = document.getElementById('cfOk');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Simple validation highlight
    let valid = true;
    contactForm.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
        setTimeout(() => field.style.borderColor = '', 2000);
      }
    });
    if (!valid) return;

    // Email validation
    const emailField = contactForm.querySelector('[type="email"]');
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = '#ef4444';
      setTimeout(() => emailField.style.borderColor = '', 2000);
      return;
    }

    // Simulate send (replace with real endpoint if needed)
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending…';
    submitBtn.querySelector('i').className = 'fas fa-circle-notch fa-spin';

    await new Promise(resolve => setTimeout(resolve, 1500));

    submitBtn.style.display = 'none';
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove('show');
      submitBtn.style.display = '';
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      submitBtn.querySelector('i').className = 'fas fa-paper-plane';
    }, 5000);
  });
}

/* ── Counter animation for hero stats ──────────────────────── */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step  = Math.ceil(target / 40);

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    el.textContent = current + suffix;
  }, 40);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      document.querySelectorAll('.hcn-n').forEach(el => {
        const target = parseInt(el.getAttribute('data-t')) || 0;

        // Optional suffix (like +, yrs, etc.)
        const suffix = el.getAttribute('data-s') || '';

        animateCounter(el, target, suffix);
      });

      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hc-nums');
if (heroStats) statsObserver.observe(heroStats);

/* ── Utility: smooth scroll to section (used by older code) ── */
window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
