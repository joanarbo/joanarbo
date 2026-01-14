document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        postsGrid: document.getElementById('postsGrid'),
        ideasGrid: document.getElementById('ideasGrid'),
        tagsContainer: document.getElementById('tagsContainer'),
        searchInput: document.getElementById('searchInput'),
        clearFilters: document.getElementById('clearFilters'),
        postsCountHero: document.getElementById('postsCountHero'),
        ideasCountHero: document.getElementById('ideasCountHero'),
        modal: document.getElementById('postModal'),
        modalOverlay: document.getElementById('modalOverlay'),
        modalClose: document.getElementById('modalClose'),
        modalTitle: document.getElementById('modalTitle'),
        modalBody: document.getElementById('modalBody'),
        modalDate: document.getElementById('modalDate'),
        modalTags: document.getElementById('modalTags'),
        projectsContainer: document.getElementById('projectsContainer'),
        testimonialsContainer: document.getElementById('testimonialsContainer'),
        experienceContainer: document.getElementById('experienceGrid'),
        principlesContainer: document.getElementById('principlesGrid')
    };

    let appData = {
        posts: [],
        ideas: [],
        tags: {}
    };

    let activeTags = new Set();
    let currentSearch = '';

    // Initialize
    init();

    async function init() {
        setupEventListeners();

        try {
            const response = await fetch('data.json');
            appData = await response.json();

            renderTags();
            filterAndRenderContent();
            if (appData.talks) renderTalks(appData.talks);
            if (appData.projects) renderProjects(appData.projects);
            if (appData.testimonials) renderTestimonials(appData.testimonials);
            if (appData.experience) renderExperience(appData.experience);
            if (appData.principles) renderPrinciples(appData.principles);
            updateStats();
        } catch (error) {
            console.error('Error loading data:', error);
            elements.postsGrid.innerHTML = '<p class="error">Error loading content. Please try again.</p>';
        }
    }

    // Rendering Functions
    function renderTags() {
        // Extract all tags from posts
        const allTags = new Set();
        appData.posts.forEach(post => {
            post.tags.forEach(tag => allTags.add(tag));
        });

        elements.tagsContainer.innerHTML = Array.from(allTags).sort().map(tag => `
            <button class="tag-btn" data-tag="${tag}">
                ${tag}
            </button>
        `).join('');

        // Tag event listeners
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', () => toggleTag(btn.dataset.tag));
        });
    }

    function renderPost(post, index) {
        // Use post image or fallback to placeholder pattern
        const imageHtml = post.image
            ? `<img src="${post.image}" alt="${post.title}" loading="lazy">`
            : `<div class="placeholder-pattern"></div>`;

        // Add delay based on index
        const delay = index * 100; // Increased delay for better visibility

        return `
            <article class="post-card fade-in-up" style="animation-delay: ${delay}ms" onclick="openPost('${post.id}')">
                <div class="post-cover">
                    ${imageHtml}
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span>${formatDate(post.date)}</span>
                        <span>${post.readTime || '5 min de lectura'}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.description || post.content.substring(0, 240) + '...'}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    }

    function renderIdea(idea, index) {
        const delay = index * 100;
        const type = idea.tags && idea.tags.length > 0 ? idea.tags[0] : 'Concept';

        return `
            <div class="idea-row fade-in-up" style="animation-delay: ${delay}ms; opacity: 0;">
                <div class="idea-main">
                    <div class="idea-status ${idea.status === 'En desarrollo' || idea.status === 'active' ? 'active' : 'concept'}"></div>
                    <h3 class="idea-title">${idea.title}</h3>
                </div>
                <div class="idea-meta">
                    <span class="idea-desc">${idea.description}</span>
                    <span class="idea-type">${type}</span>
                </div>
                <div class="idea-arrow">
                    <i class="ph-thin ph-arrow-right"></i>
                </div>
            </div>
        `;
    }

    function renderProjects(projects) {
        if (!elements.projectsContainer) return;
        elements.projectsContainer.innerHTML = projects.map((project, index) => {
            const delay = index * 150;
            return `
                <div class="project-item fade-in-up" style="animation-delay: ${delay}ms; opacity: 0;">
                    <div class="project-content">
                        <div class="project-header">
                            <span class="project-company">${project.company}</span>
                            <span class="project-impact">${project.impact}</span>
                        </div>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-desc">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-visual">
                        <div class="architecture-diagram">
                            <pre class="mermaid">
                                ${project.architecture}
                            </pre>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Initialize Mermaid diagrams
        if (window.mermaid) {
            setTimeout(() => {
                mermaid.contentLoaded();
            }, 100);
        }
    }

    function renderTestimonials(testimonials) {
        if (!elements.testimonialsContainer) return;
        elements.testimonialsContainer.innerHTML = `
            <h2 class="section-title">Validación Final</h2>
            <div class="testimonials-list">
                ${testimonials.map((t, index) => {
            const delay = index * 200;
            return `
                        <div class="testimonial-card fade-in-up" style="animation-delay: ${delay}ms; opacity: 0;">
                            <div class="testimonial-header">
                                <i class="ph-fill ph-quotes"></i>
                            </div>
                            <p class="testimonial-content">"${t.content}"</p>
                            <div class="testimonial-author">
                                <span class="author-name">${t.name}</span>
                                <span class="author-role">${t.role}</span>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }

    function renderTalks(talks) {
        const talksGrid = document.getElementById('talksGrid');
        if (!talksGrid) return;

        talksGrid.innerHTML = '';

        if (!talks || talks.length === 0) return;

        talks.forEach((talk, index) => {
            const article = document.createElement('article');
            article.className = 'talk-card fade-in-up';
            article.style.animationDelay = `${index * 100}ms`;

            article.innerHTML = `
                <div class="talk-thumbnail">
                    <div class="play-overlay">
                        <i class="ph-fill ph-play"></i>
                    </div>
                    <img src="${talk.image}" alt="${talk.title}" onerror="this.src='https://placehold.co/600x400/1e1e1e/FFF?text=Talk';">
                </div>
                <div class="talk-content">
                    <div class="talk-meta">
                        <span class="talk-event"><i class="ph-thin ph-microphone-stage"></i> ${talk.event}</span>
                        <span class="talk-date">${talk.date}</span>
                    </div>
                    <h3 class="talk-title">${talk.title}</h3>
                    <a href="${talk.videoUrl}" target="_blank" class="talk-link">
                        Ver charla <i class="ph-thin ph-arrow-right"></i>
                    </a>
                </div>
        `;

            talksGrid.appendChild(article);
        });
    }

    function renderExperience(experience) {
        if (!elements.experienceContainer) return;
        elements.experienceContainer.innerHTML = experience.map((item, index) => {
            const delay = index * 100;
            return `
                <div class="experience-item fade-in-up" style="animation-delay: ${delay}ms; opacity: 0;">
                    <div class="exp-meta">
                        <span class="exp-period">${item.period}</span>
                        <span class="exp-company">${item.company}</span>
                    </div>
                    <h3 class="exp-role">${item.role}</h3>
                    <p class="exp-description">${item.description}</p>
                </div>
            `;
        }).join('');
    }

    function renderPrinciples(principles) {
        if (!elements.principlesContainer) return;
        elements.principlesContainer.innerHTML = principles.map((principle, index) => {
            const delay = index * 100;
            return `
                <div class="principle-card fade-in-up" style="animation-delay: ${delay}ms; opacity: 0;">
                    <div class="principle-number">0${index + 1}</div>
                    <h3 class="principle-title">${principle.title}</h3>
                    <p class="principle-content">${principle.content}</p>
                </div>
            `;
        }).join('');
    }

    // State
    const POSTS_PER_PAGE = 6;
    let visiblePostsCount = POSTS_PER_PAGE;

    // Logic Functions
    function filterAndRenderContent() {
        const filteredPosts = appData.posts.filter(post => {
            // Fix tag filtering if activeTags is set (it seems I missed where activeTags was defined/used in previous view, assuming it exists or replacing with currentTag based on my previous memory, but looking at line 114 it uses activeTags.size. Let's stick to what was there or adapt.)
            // Actually, in the snippet I viewed (lines 80-140), line 114 is `const matchesTags = activeTags.size === 0 || post.tags.some(tag => activeTags.has(tag)); `. So activeTags is a Set.
            // I will implement using activeTags as seen in the file.

            const matchesTags = activeTags.size === 0 || post.tags.some(tag => activeTags.has(tag));
            const matchesSearch = post.title.toLowerCase().includes(currentSearch) ||
                (post.description && post.description.toLowerCase().includes(currentSearch));
            return matchesTags && matchesSearch;
        });

        // Handle Pagination
        const totalPosts = filteredPosts.length;
        const showingPosts = filteredPosts.slice(0, visiblePostsCount);

        const filteredIdeas = appData.ideas.filter(idea =>
            idea.title.toLowerCase().includes(currentSearch) ||
            idea.description.toLowerCase().includes(currentSearch)
        );

        elements.postsGrid.innerHTML = showingPosts.map((post, index) => renderPost(post, index)).join('');
        elements.ideasGrid.innerHTML = filteredIdeas.map((idea, index) => renderIdea(idea, index)).join('');

        // Handle Load More Button
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (loadMoreContainer) {
            if (totalPosts > visiblePostsCount) {
                loadMoreContainer.style.display = 'flex';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }

        // Trigger reflow/animations
        requestAnimationFrame(() => {
            document.querySelectorAll('.post-card, .idea-card').forEach(el => {
                el.classList.add('visible');
            });
        });
    }

    function toggleTag(tag) {
        const btn = document.querySelector(`.tag - btn[data - tag="${tag}"]`);

        if (activeTags.has(tag)) {
            activeTags.delete(tag);
            btn.classList.remove('active');
        } else {
            activeTags.add(tag);
            btn.classList.add('active');
        }

        filterAndRenderContent();
    }

    function updateStats() {
        if (elements.postsCountHero) animateValue(elements.postsCountHero, 0, appData.posts.length, 1000);
        if (elements.ideasCountHero) animateValue(elements.ideasCountHero, 0, appData.ideas.length, 1000);

        // Animate the Efficiency stat separately if it exists
        const efficiencyStat = document.querySelector('.stat-value:nth-child(1)'); // Check selector
        // Actually looking at HTML, the efficiency stat is hardcoded 70%. Let's genericize.
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const text = stat.innerText;
            if (text.includes('%')) {
                const value = parseInt(text);
                animateValue(stat, 0, value, 1500, '%');
            }
        });
    }

    function animateValue(obj, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quart
            const easeProgress = 1 - Math.pow(1 - progress, 4);

            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }



    // Modal Functions
    let currentPostId = null;

    window.openPost = function (postId) {
        // Ensure postId is a number if IDs are numbers in JSON
        postId = parseInt(postId);
        const post = appData.posts.find(p => p.id === postId);
        if (!post) return;

        currentPostId = postId;

        elements.modalTitle.textContent = post.title;
        elements.modalDate.textContent = formatDate(post.date);

        // Render tags
        elements.modalTags.innerHTML = post.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join('');

        elements.modalBody.innerHTML = marked.parse(post.content);

        elements.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        updateModalNavButtons();
    };

    function updateModalNavButtons() {
        const currentIndex = appData.posts.findIndex(p => p.id === currentPostId);
        const prevBtn = document.getElementById('prevPost');
        const nextBtn = document.getElementById('nextPost');

        // Logic: Posts are usually ordered by ID or Date. 
        // Assuming appData.posts matches the grid order.

        // Previous Post (newer ID or previous index in array)
        if (currentIndex > 0) {
            prevBtn.disabled = false;
            prevBtn.onclick = () => window.openPost(appData.posts[currentIndex - 1].id);
        } else {
            prevBtn.disabled = true;
            prevBtn.onclick = null;
        }

        // Next Post
        if (currentIndex < appData.posts.length - 1) {
            nextBtn.disabled = false;
            nextBtn.onclick = () => window.openPost(appData.posts[currentIndex + 1].id);
        } else {
            nextBtn.disabled = true;
            nextBtn.onclick = null;
        }
    }

    function closeModal() {
        elements.modal.classList.remove('active');
        document.body.style.overflow = '';
        currentPostId = null;
    }

    // Event Listeners
    function setupEventListeners() {
        let searchTimeout;
        elements.searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();

            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterAndRenderContent();
            }, 300);
        });

        elements.clearFilters.addEventListener('click', () => {
            activeTags.clear();
            currentSearch = '';
            elements.searchInput.value = '';
            document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
            filterAndRenderContent();
        });

        // Load More Button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                visiblePostsCount += POSTS_PER_PAGE;
                filterAndRenderContent();
            });
        }

        elements.modalClose.addEventListener('click', closeModal);
        elements.modalOverlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Navigation Links
        // Desktop Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });

        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenuBtn.innerHTML = '<i class="ph-thin ph-x"></i>';
                } else {
                    mobileMenuBtn.innerHTML = '<i class="ph-thin ph-list"></i>';
                }
            });

            // Mobile Links
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Extract id from href="#about" -> "about"
                    const targetId = link.getAttribute('href').substring(1);
                    scrollToSection(targetId);
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="ph-thin ph-list"></i>';
                });
            });
        }
    }

    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Update active state (desktop)
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
            if (activeLink) activeLink.classList.add('active');

            // Smooth scroll
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
