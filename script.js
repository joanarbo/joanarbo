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
        modalBody: document.querySelector('.modal-body'),
        modalDate: document.getElementById('modalDate'),
        modalTags: document.getElementById('modalTags'),
        projectsContainer: document.getElementById('projectsContainer'),
        testimonialsContainer: document.getElementById('testimonialsContainer'),
        experienceContainer: document.getElementById('experienceGrid'),
        principlesContainer: document.getElementById('principlesGrid'),
        playgroundGrid: document.getElementById('playgroundGrid'),
        servicesGrid: document.getElementById('servicesGrid'),
        stackGrid: document.getElementById('stackGrid'),
        relatedArticlesContainer: document.getElementById('relatedArticlesContainer'),
        caseStudiesGrid: document.getElementById('caseStudiesGrid'),
        featuredPostsGrid: document.getElementById('featuredPostsGrid'),
        featuredPosts: document.getElementById('featuredPosts')
    };

    let appData = {
        posts: [],
        ideas: [],
        caseStudies: [],
        services: [],
        tags: {}
    };

    const tagIcons = {
        'IA': 'ph-robot',
        'AI': 'ph-robot',
        'Design Systems': 'ph-paint-brush-broad',
        'Architecture': 'ph-stack',
        'Arquitectura': 'ph-stack',
        'Product': 'ph-cube',
        'Engineering': 'ph-code',
        'Career': 'ph-briefcase',
        'Carrera': 'ph-briefcase',
        'Strategy': 'ph-strategy',
        'Estrategia': 'ph-strategy',
        'UI/UX': 'ph-palette',
        'Tools': 'ph-wrench',
        'Life': 'ph-heart',
        'Automation': 'ph-gear',
        'Automatización': 'ph-gear',
        'System Builder': 'ph-blueprint',
        'Filosofía': 'ph-book-open',
        'Philosophy': 'ph-book-open',
        'IA Generativa': 'ph-magic-wand',
        'Generative AI': 'ph-magic-wand',
        'LLM': 'ph-chat-circle-text',
        'UX': 'ph-users',
        'Sistemas': 'ph-tree-structure',
        'Systems': 'ph-tree-structure',
        'Lógica': 'ph-function',
        'Logic': 'ph-function',
        'Agentes': 'ph-robot',
        'Agents': 'ph-robot',
        'AI Agents': 'ph-robot',
        'Ops': 'ph-cloud-check',
        'Flow': 'ph-wind',
        'Deep Work': 'ph-brain',
        'Management': 'ph-users-four',
        'ROI': 'ph-chart-line-up',
        'Headless': 'ph-ghost',
        'Voice UI': 'ph-microphone',
        'DX': 'ph-code-simple',
        'Invisible Design': 'ph-eye-slash',
        'Governance': 'ph-shield-check',
        'Scales': 'ph-ruler',
        'Scale': 'ph-ruler',
        'Education': 'ph-graduation-cap',
        'Prototyping': 'ph-test-tube',
        'Process': 'ph-arrows-clockwise',
        'Reality': 'ph-fingerprint',
        'Future Tech': 'ph-rocket-launch',
        'System Ops': 'ph-terminal-window',
        'Case Study': 'ph-newspaper-clipping',
        'Notion': 'ph-notepad',
        'Mindset': 'ph-lightning',
        'Writing': 'ph-pen-nib',
        'Productivity': 'ph-lightning',
        'Workflow': 'ph-arrows-left-right',
        'Atomic Design': 'ph-atom',
        'Storytelling': 'ph-chat-circle-dots',
        'Design Tokens': 'ph-circle-half-tilt',
        'Semántica': 'ph-text-aa',
        'APL': 'ph-television',
        'AI Strategy': 'ph-brain',
        'React': 'ph-atom',
        'Research Tooling': 'ph-microscope',
        'Design Ops': 'ph-gear-six',
        'Adopción': 'ph-hands-clapping',
        'NLP': 'ph-chat-teardrop-text'
    };

    function getIconForTag(tag) {
        const iconClass = tagIcons[tag] || 'ph-hash';
        return `<i class="ph-thin ${iconClass}"></i>`;
    }

    let activeTags = new Set();
    let currentSearch = '';
    let activeSeries = 'all';
    let currentLang = 'es';
    let visiblePostsCount = 6;
    const POSTS_PER_PAGE = 6;

    // Initialize moved to end of script

    // JSON-LD Schema Generator
    function generateSchema(data) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Joan Arbo",
            "url": "https://joanarbo.com",
            "sameAs": [
                "https://www.linkedin.com/in/joanarbo",
                "https://github.com/joanarbo"
            ],
            "jobTitle": "AI Design Architect",
            "worksFor": {
                "@type": "Organization",
                "name": "Amazon"
            },
            "description": "Senior System Builder. AI Design Architect at Amazon. Exploring the intersection of design systems, AI, and flow state."
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);

        // Article Schema for Posts
        if (data.posts && data.posts.length > 0) {
            const itemList = {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": data.posts.map((post, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `https://joanarbo.com/#post/${post.id}`,
                    "name": post.title
                }))
            };
            const listScript = document.createElement('script');
            listScript.type = 'application/ld+json';
            listScript.text = JSON.stringify(itemList);
            document.head.appendChild(listScript);
        }
    }

    async function init() {
        detectLanguage();
        await loadLanguageData(currentLang);
        setupEventListeners();
        setupIntersectionObserver();

        // Initial render is handled by loadLanguageData -> updateUI

        // RSS Link Handler
        const rssLink = document.querySelector('a[href="/feed.xml"]');
        if (rssLink) {
            rssLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('feed.xml', '_blank');
            });
        }
    }

    function detectLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            currentLang = savedLang;
        } else {
            const browserLang = navigator.language.split('-')[0];
            currentLang = (browserLang === 'en' || browserLang === 'es') ? browserLang : 'es';
        }
        updateLangToggleButton();
    }

    async function loadLanguageData(lang) {
        try {
            const response = await fetch(`data_${lang}.json`);
            appData = await response.json();
            localStorage.setItem('preferredLanguage', lang);
            updateUI();
        } catch (error) {
            console.error('Error loading language data:', error);
            if (!appData.posts || appData.posts.length === 0) {
                const fallbackResponse = await fetch('data.json');
                appData = await fallbackResponse.json();
                updateUI();
            }
        }
    }

    function updateUI() {
        updateStaticText();
        updateLangToggleButton();

        renderCaseStudies(appData.caseStudies);
        renderProjects(appData.projects);
        renderExperience(appData.experience);
        renderPrinciples(appData.principles);
        renderPlayground(appData.playground);
        renderServices(appData.services);
        renderTestimonials(appData.testimonials);


        if (appData.talks) renderTalks(appData.talks);
        if (appData.stack) renderStack(appData.stack);

        // Blog logic
        filterAndRenderContent();
        renderTags();

        // SEO: Generate Schema
        generateSchema(appData);
    }

    function updateStaticText() {
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations[currentLang], key);
            if (translation) {
                el.innerHTML = translation;
            }
        });

        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = getNestedTranslation(translations[currentLang], key);
            if (translation) {
                el.placeholder = translation;
            }
        });
    }

    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((p, c) => p && p[c], obj);
    }

    function updateLangToggleButton() {
        const langBtn = document.getElementById('langToggle');
        if (langBtn) {
            const textSpan = langBtn.querySelector('.lang-text');
            if (textSpan) {
                textSpan.textContent = currentLang === 'es' ? 'EN' : 'ES';
            }
        }
    }

    function toggleLanguage() {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        loadLanguageData(currentLang);
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
                ${getIconForTag(tag)}
                <span>${tag}</span>
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
                        <span>${post.readTime || `5 ${getNestedTranslation(translations[currentLang], 'labels.readTime')}`}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.description || post.content.substring(0, 240) + '...'}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${getIconForTag(tag)} ${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    }

    function renderIdea(idea, index) {
        const delay = index * 100;
        const type = idea.tags && idea.tags.length > 0 ? idea.tags[0] : getNestedTranslation(translations[currentLang], 'labels.concept');

        return `
            <div class="idea-row fade-in-up" style="animation-delay: ${delay}ms; opacity: 0; cursor: pointer;" onclick="openIdea('${idea.id}')">
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
    async function populateAndOpenModal(item) {
        const modal = elements.modal;
        const modalBody = elements.modalBody;
        const readingProgressBar = document.getElementById('readingProgress');

        // Reset Progress Bar
        if (readingProgressBar) readingProgressBar.style.width = '0%';

        if (!modal || !modalBody) return;

        // Show loading state
        modalBody.innerHTML = '<div class="loading-spinner"></div>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll position to top
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }

        try {
            elements.modalTitle.textContent = item.title;
            elements.modalDate.textContent = item.date ? formatDate(item.date) : '';

            // Render tags
            if (item.tags) {
                elements.modalTags.innerHTML = item.tags.map(tag =>
                    `<span class="tag">${getIconForTag(tag)} ${tag}</span>`
                ).join('');
            } else {
                elements.modalTags.innerHTML = '';
            }

            let content = item.content || item.description;

            // Render advanced structure
            modalBody.innerHTML = renderPostDetails(item, content);

            // Generate TOC
            generateTOC(modalBody);

            // Highlight syntax
            if (window.Prism) {
                window.Prism.highlightAllUnder(modalBody);
            }

            // Setup Scroll Listener for Progress Bar
            if (modalContent && readingProgressBar) {
                modalContent.onscroll = () => {
                    const scrollTop = modalContent.scrollTop;
                    const scrollHeight = modalContent.scrollHeight - modalContent.clientHeight;
                    const progress = (scrollTop / scrollHeight) * 100;
                    readingProgressBar.style.width = `${progress}%`;
                };
            }

            // Render Related Articles
            renderRelatedArticles(item);

            updateModalNavButtons();

            // Ensure footer is visible
            const modalFooter = document.querySelector('.modal-footer');
            if (modalFooter) modalFooter.style.display = 'flex';

        } catch (error) {
            console.error('Error opening item:', error);
            modalBody.innerHTML = `<p>${getNestedTranslation(translations[currentLang], 'sections.blog.noResults')}</p>`;
        }
    }

    function renderPostDetails(post, content) {
        // Use marked if available, otherwise simple text
        const htmlContent = typeof marked !== 'undefined' ? marked.parse(content) : content;

        return `
            <div class="post-detail-layout">
                <aside class="toc-sidebar">
                    <div class="toc-sticky">
                        <h4 data-i18n="labels.contents">${getNestedTranslation(translations[currentLang], 'labels.contents') || 'Contents'}</h4>
                        <nav id="toc-nav"></nav>
                    </div>
                </aside>
                <article class="post-content-full">
                    <div class="markdown-body">
                        ${htmlContent}
                    </div>
                </article>
            </div>
        `;
    }

    function generateTOC(container) {
        const tocNav = container.querySelector('#toc-nav');
        const contentArea = container.querySelector('.markdown-body');

        if (!tocNav || !contentArea) return;

        const headings = contentArea.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            tocNav.innerHTML = '<p class="toc-empty">No headings</p>';
            return;
        }

        const ul = document.createElement('ul');
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;

            const li = document.createElement('li');
            li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;

            // Smooth scroll inside modal
            a.onclick = (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            };

            li.appendChild(a);
            ul.appendChild(li);
        });

        tocNav.appendChild(ul);
    }
    function renderCaseStudies(caseStudies) {
        if (!elements.caseStudiesGrid || !caseStudies) return;

        elements.caseStudiesGrid.innerHTML = caseStudies.map((study, index) => {
            const delay = index * 150;
            return `
                <div class="case-study-card fade-in-up" style="animation-delay: ${delay}ms; opacity: 0;">
                    <img src="${study.image}" alt="${study.title}" class="case-study-image" loading="lazy">
                    <div class="case-study-content">
                        <div class="case-study-meta">
                            ${study.status ? `<span class="case-study-status ${study.status.toLowerCase().includes('active') ? 'status-active' : 'status-default'}">${study.status}</span>` : ''}
                            <span class="case-study-company">${study.company}</span>
                            <span class="case-study-year">${study.year}</span>
                            <span class="case-study-role">${study.role}</span>
                            ${study.timeline ? `<span class="case-study-timeline">${study.timeline}</span>` : ''}
                        </div>
                        <h3 class="case-study-title">${study.title}</h3>
                        <p class="case-study-challenge"><strong>${getNestedTranslation(translations[currentLang], 'labels.challenge')}:</strong> ${study.challenge}</p>
                        ${study.myRole ? `<p class="case-study-role-detail"><strong>${getNestedTranslation(translations[currentLang], 'labels.myRole')}:</strong> ${study.myRole}</p>` : ''}
                        ${study.team ? `<p class="case-study-team"><strong>${getNestedTranslation(translations[currentLang], 'labels.team')}:</strong> ${study.team}</p>` : ''}
                        <p class="case-study-solution"><strong>${getNestedTranslation(translations[currentLang], 'labels.solution')}:</strong> ${study.solution}</p>
                        ${study.businessImpact ? `<p class="case-study-impact"><strong>${getNestedTranslation(translations[currentLang], 'labels.businessImpact')}:</strong> ${study.businessImpact}</p>` : ''}
                        ${study.architecture ? `<p class="case-study-architecture"><strong>${getNestedTranslation(translations[currentLang], 'labels.architecture')}:</strong> ${study.architecture}</p>` : ''}
                        <div class="impact-metrics">
                            <div class="metric">
                                <div class="metric-value">${study.impact.adoption}</div>
                                <div class="metric-label">${study.impact.adoptionLabel}</div>
                            </div>
                            <div class="metric">
                                <div class="metric-value">${study.impact.efficiency}</div>
                                <div class="metric-label">${study.impact.efficiencyLabel}</div>
                            </div>
                            <div class="metric">
                                <div class="metric-value">${study.impact.consistency}</div>
                                <div class="metric-label">${study.impact.consistencyLabel}</div>
                            </div>
                        </div>
                        <div class="case-study-tech">
                            ${study.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Trigger fade-in animation
        setTimeout(() => {
            document.querySelectorAll('.case-study-card.fade-in-up').forEach(card => {
                card.style.opacity = '1';
            });
        }, 100);
    }

    function renderProjects(projects) {
        if (!elements.projectsContainer || !projects) return; // Changed to projectsContainer
        elements.projectsContainer.innerHTML = projects.map((project, index) => { // Changed to projectsContainer
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

    function renderPlayground(items) {
        if (!elements.playgroundGrid || !items) return;
        elements.playgroundGrid.innerHTML = items.map(item => {
            const hasLink = item.url && item.url.trim().length > 0 && item.url !== '#';
            const overlayStyle = hasLink ? '' : 'style="opacity: 1; background: rgba(0, 0, 0, 0.45);"';
            const visualStyle = hasLink
                ? `style="background-image: url('${item.image}')"`
                : `style="background-image: url('${item.image}'); filter: grayscale(20%);"`;

            const cardContent = `
                <div class="playground-visual" ${visualStyle}>
                    <div class="playground-overlay" ${overlayStyle}>
                        ${hasLink ? '<i class="ph-thin ph-arrow-up-right"></i>' : `<span style="color: #fff; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">${getNestedTranslation(translations[currentLang], 'labels.comingSoon')}</span>`}
                    </div>
                </div>
                <div class="playground-info">
                    <span class="playground-type">${item.type}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;

            if (!hasLink) {
                return `<div class="playground-card is-disabled">${cardContent}</div>`;
            }

            return `<a href="${item.url}" target="_blank" class="playground-card">${cardContent}</a>`;
        }).join('');
    }

    function renderTestimonials(testimonials, activeTags) {
        const newsletterGrid = document.querySelector('.newsletter-grid');
        if (!elements.testimonialsContainer || !testimonials || testimonials.length === 0) {
            if (elements.testimonialsContainer) {
                elements.testimonialsContainer.innerHTML = '';
            }
            if (newsletterGrid) {
                newsletterGrid.classList.add('newsletter-grid--single');
            }
            return;
        }

        if (newsletterGrid) {
            newsletterGrid.classList.remove('newsletter-grid--single');
        }

        let filtered = testimonials;

        // Contextual Filtering
        if (activeTags && activeTags.size > 0) {
            const contextMatches = testimonials.filter(t =>
                t.tags && t.tags.some(tag => activeTags.has(tag))
            );
            if (contextMatches.length > 0) {
                filtered = contextMatches;
            }
        }

        // Randomize and limit to 2
        const displayed = filtered.sort(() => 0.5 - Math.random()).slice(0, 2);

        elements.testimonialsContainer.innerHTML = `
            <h2 class="section-title">${getNestedTranslation(translations[currentLang], 'sections.newsletter.validation')}</h2>
            <div class="testimonials-list">
                ${displayed.map((t, index) => {
            const delay = index * 200;
            return `
                        <div class="testimonial-card fade-in-up" style="animation-delay: ${delay}ms; opacity: 0;">
                            <div class="testimonial-header">
                                <i class="ph-fill ph-quotes"></i>
                            </div>
                            <p class="testimonial-content">"${t.content}"</p>
                            <div class="testimonial-author">
                                <span class="author-name">${t.name}</span>
                                <span class="author-role">${t.role}${t.company ? ` · ${t.company}` : ''}</span>
                                ${t.linkedin ? `<a href="${t.linkedin}" target="_blank" rel="noopener" class="author-link">LinkedIn</a>` : ''}
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
                        ${getNestedTranslation(translations[currentLang], 'labels.viewTalk')} <i class="ph-thin ph-arrow-right"></i>
                    </a>
                </div>
        `;

            talksGrid.appendChild(article);
        });
    }

    function renderServices(services) {
        if (!elements.servicesGrid || !services) return;
        elements.servicesGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon-box">
                    <i class="ph-thin ${service.icon}"></i>
                </div>
                <div class="service-header">
                    <h3>${service.title}</h3>
                    <span class="service-price">${service.price}</span>
                </div>
                <p class="service-description">${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(f => `<li><i class="ph-bold ph-check"></i> ${f}</li>`).join('')}
                </ul>
                <a href="mailto:me@joanarbo.com?subject=Inquiry: ${encodeURIComponent(service.title)}" class="service-cta button outline">
                    ${service.cta} <i class="ph-thin ph-arrow-right"></i>
                </a>
            </div>
        `).join('');
    }

    function renderStack(stack) {
        if (!elements.stackGrid || !stack) return;

        const categories = {
            'software': getNestedTranslation(translations[currentLang], 'labels.software'),
            'analog': getNestedTranslation(translations[currentLang], 'labels.analog')
        };

        elements.stackGrid.innerHTML = Object.entries(categories).map(([key, label]) => {
            const items = stack[key];
            if (!items) return '';

            return `
                <div class="stack-category">
                    <h3 class="stack-category-title">${label}</h3>
                    <ul class="stack-list">
                        ${items.map(item => `
                            <li class="stack-item">
                                <span class="stack-name">${item.name}</span>
                                <span class="stack-desc">${item.desc}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }).join('');
    }

    function renderExperience(experience) {
        if (!elements.experienceContainer) return;
        const itemsHtml = experience.map((item, index) => {
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

        const linkText = typeof currentLang !== 'undefined' && currentLang === 'es' ? 'Ver CV Completo' : 'View Full CV';

        const cvLinkHtml = `
            <div class="experience-cv fade-in-up" style="animation-delay: ${experience.length * 100}ms; opacity: 0; margin-top: 1.5rem;">
                <a href="${appData.links.linkedin}" target="_blank" class="cv-link" style="display: inline-flex; align-items: center; gap: 0.5rem; color: inherit; text-decoration: none; font-size: 0.9rem; opacity: 0.7; transition: opacity 0.2s ease;">
                    ${linkText} <i class="ph ph-arrow-right"></i>
                </a>
            </div>
        `;

        elements.experienceContainer.innerHTML = itemsHtml + cvLinkHtml;
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



    // Logic Functions
    function filterAndRenderContent() {
        const shouldShowFeatured = activeTags.size === 0 && currentSearch === '' && activeSeries === 'all';
        const featuredPosts = appData.posts.filter(post => post.featured);
        const basePosts = shouldShowFeatured
            ? appData.posts.filter(post => !post.featured)
            : appData.posts;

        const filteredPosts = basePosts.filter(post => {
            // Fix tag filtering if activeTags is set (it seems I missed where activeTags was defined/used in previous view, assuming it exists or replacing with currentTag based on my previous memory, but looking at line 114 it uses activeTags.size. Let's stick to what was there or adapt.)
            // Actually, in the snippet I viewed (lines 80-140), line 114 is `const matchesTags = activeTags.size === 0 || post.tags.some(tag => activeTags.has(tag)); `. So activeTags is a Set.
            // I will implement using activeTags as seen in the file.

            const matchesTags = activeTags.size === 0 || post.tags.some(tag => activeTags.has(tag));
            const matchesSearch = post.title.toLowerCase().includes(currentSearch) ||
                (post.description && post.description.toLowerCase().includes(currentSearch));
            const matchesSeries = activeSeries === 'all' || post.series === activeSeries;
            return matchesTags && matchesSearch && matchesSeries;
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

        // Handle Empty State
        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (filteredPosts.length === 0 && filteredIdeas.length === 0) {
                noResults.style.display = 'flex';
                elements.postsGrid.style.display = 'none';
                elements.ideasGrid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                elements.postsGrid.style.display = 'grid';
                elements.ideasGrid.style.display = 'grid';
            }
        }

        // Featured posts
        if (elements.featuredPosts && elements.featuredPostsGrid) {
            if (shouldShowFeatured && featuredPosts.length > 0) {
                elements.featuredPosts.style.display = 'block';
                elements.featuredPostsGrid.innerHTML = featuredPosts.slice(0, 4)
                    .map((post, index) => renderPost(post, index))
                    .join('');
            } else {
                elements.featuredPosts.style.display = 'none';
                elements.featuredPostsGrid.innerHTML = '';
            }
        }

        // Handle Load More Button
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (loadMoreContainer) {
            if (totalPosts > visiblePostsCount && filteredPosts.length > 0) {
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
        // Update Contextual Testimonials
        if (appData.testimonials) {
            renderTestimonials(appData.testimonials, activeTags);
        }

        // Update Clear Button Visibility
        if (elements.clearFilters) {
            if (activeTags.size > 0 || currentSearch.length > 0) {
                elements.clearFilters.classList.remove('hidden');
            } else {
                elements.clearFilters.classList.add('hidden');
            }
        }
    }

    function toggleTag(tag) {
        const btn = document.querySelector(`.tag-btn[data-tag="${tag}"]`);

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
        const locale = currentLang === 'es' ? 'es-ES' : 'en-US';
        return new Date(dateString).toLocaleDateString(locale, options);
    }



    // Modal Functions
    let currentPostId = null;
    let currentModalContext = 'post'; // 'post' or 'idea'

    window.openPost = function (postId) {
        // IDs can be strings (slugs) or numbers, so we avoid parseInt
        // and use loose equality to find the post
        const post = appData.posts.find(p => p.id == postId);
        if (!post) return;

        currentModalContext = 'post';
        currentPostId = postId;

        populateAndOpenModal(post);
    };

    window.openIdea = function (ideaId) {
        const idea = appData.ideas.find(i => i.id === ideaId);
        if (!idea) return;

        currentModalContext = 'idea';
        currentPostId = ideaId;

        populateAndOpenModal(idea);
    };


    function updateModalNavButtons() {
        const isPost = currentModalContext === 'post';
        const collection = isPost ? appData.posts : appData.ideas;
        const currentIndex = collection.findIndex(p => p.id === currentPostId);

        const prevBtn = document.getElementById('prevPost');
        const nextBtn = document.getElementById('nextPost');

        // Previous Item
        if (currentIndex > 0) {
            prevBtn.disabled = false;
            prevBtn.onclick = () => {
                const prevId = collection[currentIndex - 1].id;
                isPost ? window.openPost(prevId) : window.openIdea(prevId);
            };
        } else {
            prevBtn.disabled = true;
            prevBtn.onclick = null;
        }

        // Next Item
        if (currentIndex < collection.length - 1) {
            nextBtn.disabled = false;
            nextBtn.onclick = () => {
                const nextId = collection[currentIndex + 1].id;
                isPost ? window.openPost(nextId) : window.openIdea(nextId);
            };
        } else {
            nextBtn.disabled = true;
            nextBtn.onclick = null;
        }
    }

    function closeModal() {
        elements.modal.classList.remove('active');
        document.body.style.overflow = '';
        currentPostId = null;
        // Reset footer visibility in case it was hidden by /now
        const modalFooter = document.querySelector('.modal-footer');
        if (modalFooter) modalFooter.style.display = 'flex';

        // Clear hash without scrolling
        if (window.location.hash) {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }

    // Event Listeners
    function setupEventListeners() {
        let searchTimeout;

        // Language Toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', toggleLanguage);
        }


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

        // Series Filter Buttons
        const seriesFilterBtns = document.querySelectorAll('.series-filter-btn');
        seriesFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                seriesFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update active series and filter
                activeSeries = btn.dataset.series;
                filterAndRenderContent();
            });
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

        // Back to Top Logic
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }



        // Header Scroll Effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }
        });

        // Global Clear Filters (for empty state)
        window.clearAllFilters = function () {
            activeTags.clear();
            currentSearch = '';
            elements.searchInput.value = '';
            document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
            filterAndRenderContent();
        };

        const clearFiltersEmpty = document.getElementById('clearFiltersEmpty');
        if (clearFiltersEmpty) {
            clearFiltersEmpty.addEventListener('click', clearAllFilters);
        }

        checkHash();
        window.addEventListener('hashchange', checkHash);
    }

    function checkHash() {
        const hash = window.location.hash;
        if (hash === '#now') {
            openNow();
        } else if (hash.startsWith('#post/')) {
            const id = hash.replace('#post/', '');
            openPost(id);
        } else if (hash.startsWith('#idea/')) {
            const id = hash.replace('#idea/', '');
            openIdea(id);
        } else {
            closeModal();
        }
    }

    function openNow() {
        if (!appData.now) return;
        const now = appData.now;

        elements.modalTitle.textContent = getNestedTranslation(translations[currentLang], 'sections.now.title');
        elements.modalDate.textContent = `${getNestedTranslation(translations[currentLang], 'labels.lastUpdated')}: ${now.lastUpdated}`;
        elements.modalTags.innerHTML = `<span class="tag"><i class="ph-thin ph-map-pin"></i> ${now.location}</span>`;

        // Hide nav buttons for Now page
        document.querySelector('.modal-footer').style.display = 'none';

        // Custom Layout for Now Page
        const nowContent = `
            <div class="now-page-content">
                <div class="now-status-section">
                    <h3>${getNestedTranslation(translations[currentLang], 'sections.now.statusTitle')}</h3>
                    <p class="now-status-highlight">${now.status}</p>
                </div>
                
                <div class="now-grid">
                    ${now.items.map(item => `
                        <div class="now-item">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="now-reading">
                    <h3>${getNestedTranslation(translations[currentLang], 'sections.now.readingTitle')}</h3>
                    <div class="book-card">
                        <i class="ph-thin ph-book"></i>
                        <div>
                            <strong>${now.reading.title}</strong>
                            <span>${getNestedTranslation(translations[currentLang], 'labels.by')} ${now.reading.author}</span>
                        </div>
                    </div>
                </div>

                <div class="now-footer-note">
                    <p>This is a <a href="https://nownownow.com/about" target="_blank">/now</a> page.</p>
                </div>
            </div>
        `;

        elements.modalBody.innerHTML = nowContent;
        elements.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll position to top
        const modalContent = elements.modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }

    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme');

        // Apply saved theme
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if (icon) icon.classList.replace('ph-moon', 'ph-sun');
        }

        // Toggle Event
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';

            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (icon) icon.classList.replace('ph-sun', 'ph-moon');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (icon) icon.classList.replace('ph-moon', 'ph-sun');
            }
        });
    }

    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Smooth scroll
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Scroll Spy implementation using Intersection Observer
     * Updates navigation highlighting as the user scrolls
     */
    function initScrollSpy() {
        const sectionIds = ['case-studies', 'teaching', 'services', 'blog', 'ideas', 'about', 'contact'];
        const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el);
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the top portion of the viewport
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    // Update active state (desktop)
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    }

    // Related Articles engine
    function renderRelatedArticles(currentItem) {
        if (!elements.relatedArticlesContainer) return;

        const allItems = [...appData.posts, ...appData.ideas];

        // Calculate relevance score based on tags and title similarity
        const related = allItems
            .filter(item => item.id !== currentItem.id && item.tags)
            .map(item => {
                let score = 0;

                // Score based on common tags (primary factor)
                const commonTags = item.tags.filter(tag => currentItem.tags?.includes(tag));
                score += commonTags.length * 10;

                // Bonus for title word similarity (secondary factor)
                if (currentItem.title && item.title) {
                    const currentWords = currentItem.title.toLowerCase().split(/\s+/);
                    const itemWords = item.title.toLowerCase().split(/\s+/);
                    const commonWords = currentWords.filter(word =>
                        word.length > 3 && itemWords.includes(word)
                    );
                    score += commonWords.length * 2;
                }

                // Small bonus for recency
                if (item.date) {
                    const daysSincePublished = (Date.now() - new Date(item.date)) / (1000 * 60 * 60 * 24);
                    score += Math.max(0, (365 - daysSincePublished) / 365);
                }

                return { ...item, score };
            })
            .sort((a, b) => b.score - a.score || new Date(b.date || 0) - new Date(a.date || 0))
            .slice(0, 3);

        // Fallback: if no related articles with score > 0, show most recent
        const finalRelated = related.filter(item => item.score > 0).length > 0
            ? related.filter(item => item.score > 0)
            : allItems
                .filter(item => item.id !== currentItem.id)
                .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                .slice(0, 3);

        if (finalRelated.length === 0) {
            elements.relatedArticlesContainer.innerHTML = '';
            elements.relatedArticlesContainer.style.display = 'none';
            return;
        }

        elements.relatedArticlesContainer.style.display = 'block';
        elements.relatedArticlesContainer.innerHTML = `
            <div class="related-header">
                <h3 class="related-title">${getNestedTranslation(translations[currentLang], 'sections.blog.related')}</h3>
            </div>
            <div class="related-grid">
                ${finalRelated.map(item => `
                    <div class="related-card" onclick="${item.date ? 'openPost' : 'openIdea'}('${item.id}')">
                        <div class="related-info">
                            <span class="related-date">${item.date ? formatDate(item.date) : getNestedTranslation(translations[currentLang], 'labels.concept')}</span>
                            <h4 class="related-card-title">${item.title}</h4>
                        </div>
                        <i class="ph-thin ph-arrow-right related-arrow"></i>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Newsletter feedback
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.onsubmit = async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value;
            const submitButton = newsletterForm.querySelector('button[type="submit"]');

            // Disable form during submission
            submitButton.disabled = true;
            submitButton.textContent = getNestedTranslation(translations[currentLang], 'labels.sending');

            // Remove any existing message
            const existingMessage = newsletterForm.querySelector('.newsletter-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Simulate API call (replace with actual API call later)
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // For now, always succeed. Replace with actual API call:
                // const response = await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
                // if (!response.ok) throw new Error('Subscription failed');

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-message newsletter-success';
                successMessage.innerHTML = `
                    <i class="ph-thin ph-check-circle"></i>
                    <span>${getNestedTranslation(translations[currentLang], 'labels.subscribeNotify')}</span>
                `;
                newsletterForm.insertBefore(successMessage, newsletterForm.firstChild);

                // Clear input
                emailInput.value = '';

                // Reset button after delay
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = getNestedTranslation(translations[currentLang], 'labels.subscribeButton');
                }, 2000);

            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'newsletter-message newsletter-error';
                errorMessage.innerHTML = `
                    <i class="ph-thin ph-warning-circle"></i>
                    <span>${getNestedTranslation(translations[currentLang], 'labels.subscribeError')}</span>
                `;
                newsletterForm.insertBefore(errorMessage, newsletterForm.firstChild);

                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = getNestedTranslation(translations[currentLang], 'labels.subscribeButton');
            }
        };
    }

    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
            observer.observe(el);
        });
    }

    // Start everything
    init();
});
