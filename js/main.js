// Dynamic Portfolio JavaScript
class DynamicPortfolio {
    constructor() {
        this.profileData = null;
        this.init();
    }

    async init() {
        try {
            // Show loading screen
            this.showLoading();
            
            // Initialize components
            this.initNavigation();
            this.initScrollEffects();
            this.initContactForm();
            
            // Load profile data
            await this.loadProfileData();
            
            // Update UI with loaded data
            this.updateUI();
            
            // Hide loading screen
            this.hideLoading();
            
            // Initialize animations
            this.initAnimations();
            
        } catch (error) {
            console.error('Error initializing portfolio:', error);
            this.hideLoading();
        }
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    async loadProfileData() {
        try {
            // Try to load from local data files first
            const profileSummary = await this.loadJSON('data/profile-summary.json');
            const githubData = await this.loadJSON('data/github.json');
            const linkedinData = await this.loadJSON('data/linkedin.json');
            const scholarData = await this.loadJSON('data/google-scholar.json');

            this.profileData = {
                summary: profileSummary,
                github: githubData,
                linkedin: linkedinData,
                scholar: scholarData
            };

            console.log('Profile data loaded:', this.profileData);
        } catch (error) {
            console.warn('Could not load profile data from files, using fallback:', error);
            this.profileData = this.getFallbackData();
        }
    }

    async loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.warn(`Could not load ${url}:`, error);
            return null;
        }
    }

    getFallbackData() {
        return {
            summary: {
                name: "Ramtin Zargari Marandi, PhD",
                title: "Data Scientist & Researcher",
                location: "Copenhagen, Denmark",
                bio: "Data scientist and researcher with expertise in AI and machine learning, specialized in healthcare applications.",
                stats: {
                    githubRepos: 25,
                    citations: 200,
                    hIndex: 8,
                    topRepos: [
                        {
                            name: "ExplaineR",
                            description: "An R package for explainable machine learning",
                            url: "https://github.com/ramtinz/ExplaineR",
                            stars: 45,
                            language: "R"
                        }
                    ],
                    recentPapers: [
                        {
                            title: "ExplaineR: an R package to explain machine learning models",
                            authors: ["R Zargari Marandi"],
                            publication: "Bioinformatics Advances",
                            year: 2024,
                            citations: 12
                        }
                    ]
                }
            }
        };
    }

    updateUI() {
        if (!this.profileData) return;

        const data = this.profileData.summary || this.profileData;
        const scholarData = this.profileData.scholar;

        // Update profile information
        this.updateElement('profile-name', data.name);
        this.updateElement('profile-title', data.title);
        this.updateElement('profile-location', `<i class="fas fa-map-marker-alt"></i> ${data.location}`);
        this.updateElement('profile-bio', data.bio);

        // Update stats
        if (data.stats) {
            this.updateElement('github-repos', data.stats.githubRepos);
            this.updateElement('scholar-citations', data.stats.citations);
            this.updateElement('scholar-hindex', data.stats.hIndex);
        }

        // Update projects
        this.updateProjects(data.stats?.topRepos || []);

        // Update publications
        const publications = data.stats?.recentPapers || scholarData?.publications || [];
        this.updatePublications(publications);

        // Update experience
        if (data.experience) {
            this.updateExperience(data.experience);
        }

        // Update awards and certifications
        if (data.awards) {
            this.updateAwards(data.awards);
        }

        // Update affiliations
        if (data.affiliations) {
            this.updateAffiliations(data.affiliations);
        }

        // Update volunteering
        this.updateVolunteering();

        // Update peer review information
        if (data.peerReview) {
            this.updatePeerReview(data.peerReview);
        }

        // Update contact information
        if (data.contacts) {
            this.updateContacts(data.contacts);
        }

        // Update last updated time
        const lastUpdated = data.lastUpdated || new Date().toISOString();
        this.updateElement('last-updated-time', this.formatDate(lastUpdated));

        // Update teaching and supervision
        if (data.teaching) {
            this.updateTeaching(data.teaching);
        }

        // Update presentations
        if (data.presentations) {
            this.updatePresentations(data.presentations);
        }

        // Update certifications
        if (data.certifications) {
            this.updateCertifications(data.certifications);
        }

        // Update media coverage
        if (data.mediaCoverage) {
            this.updateMediaCoverage(data.mediaCoverage);
        }
    }

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element && content !== undefined && content !== null && content !== '') {
            element.innerHTML = content;
        } else if (element) {
            // Hide the element if content is empty or undefined
            element.style.display = 'none';
        }
    }

    safeGet(obj, path, defaultValue = '') {
        return path.split('.').reduce((current, key) => {
            return (current && current[key] !== undefined) ? current[key] : defaultValue;
        }, obj);
    }

    updateProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid || !projects.length) return;

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card fade-in-up">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.name || 'Untitled Project'}</h3>
                        <div class="project-stats">
                            <span><i class="fas fa-star"></i> ${project.stars || 0}</span>
                            <span><i class="fas fa-code-branch"></i> ${project.forks || 0}</span>
                            ${project.language ? `<span><i class="fas fa-circle"></i> ${project.language}</span>` : ''}
                        </div>
                    </div>
                </div>
                <p class="project-description">${project.description || 'No description available'}</p>
                <div class="project-tech">
                    ${project.language ? `<span class="tech-tag">${project.language}</span>` : ''}
                </div>
                <div class="project-links">
                    <a href="${project.url}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    updatePublications(publications) {
        const publicationsList = document.getElementById('publications-list');
        if (!publicationsList || !publications.length) return;

        // Sort publications by year (most recent first)
        const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

        publicationsList.innerHTML = sortedPublications.map(pub => {
            const isLongTitle = pub.title.includes("Prognostic Agents from Gut Microbiome");
            const titleClass = isLongTitle ? "publication-title long-title" : "publication-title";
            
            return `
                <div class="publication-card fade-in-up">
                    <h3 class="${titleClass}">${pub.title}</h3>
                    <p class="publication-authors">${Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}</p>
                    <p class="publication-journal">${pub.venue}, ${pub.year}</p>
                    <div class="publication-meta">
                        ${pub.url ? `<a href="${pub.url}" target="_blank" class="publication-link"><i class="fas fa-external-link-alt"></i> View Paper</a>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    updateExperience(experience) {
        const experienceList = document.getElementById('experience-list');
        if (!experienceList || !experience.length) return;

        experienceList.innerHTML = experience.map(exp => `
            <div class="experience-item fade-in-up">
                <div class="experience-header">
                    <h4 class="experience-title">${exp.title}</h4>
                    <span class="experience-company">${exp.company}</span>
                    <span class="experience-duration">${exp.duration}</span>
                </div>
                <p class="experience-description">${exp.description}</p>
                <div class="experience-location">
                    <i class="fas fa-map-marker-alt"></i> ${exp.location}
                </div>
            </div>
        `).join('');
    }

    updateAwards(awards) {
        const awardsList = document.getElementById('awards-list');
        if (!awardsList || !awards.length) return;

        awardsList.innerHTML = awards.map(award => `
            <div class="award-item fade-in-up">
                <h4 class="award-title">${award.title}</h4>
                <p class="award-organization">${award.organization}</p>
                <span class="award-year">${award.year}</span>
            </div>
        `).join('');
    }

    updateAffiliations(affiliations) {
        const affiliationsList = document.getElementById('affiliations-list');
        if (!affiliationsList || !affiliations.length) return;

        affiliationsList.innerHTML = affiliations.map(aff => `
            <div class="affiliation-item fade-in-up">
                <h4 class="affiliation-title">${aff.title}</h4>
                <p class="affiliation-organization">${aff.organization}</p>
                <span class="affiliation-year">${aff.year}</span>
            </div>
        `).join('');
    }

    updateVolunteering() {
        const volunteeringData = [
            {
                organization: "DDSA - Danish Data Science Academy",
                role: "Mentor",
                period: "Jan 2024 - Present · 1 yr 7 mos",
                category: "Education",
                description: "Mentored data science professionals in AI and machine learning applications, focusing on practical insights for industry use"
            },
            {
                organization: "Pioneer Centre for AI (P1)",
                role: "Research Affiliate",
                period: "Jan 2024 - Present · 1 yr 7 mos",
                category: "Science and Technology",
                description: "Contributing to cutting-edge AI research initiatives and collaborative projects"
            },
            {
                organization: "Roche",
                role: "Guest Researcher",
                period: "Oct 2022 · 1 mo",
                category: "Science and Technology",
                description: "Attending research camp held annually by Roche to collaborate with other scientists to enhance methods for different clinical problems and diseases"
            },
            {
                organization: "Clarivate",
                role: "Reviewer",
                period: "Jan 2018 - Present · 7 yrs 7 mos",
                category: "Science and Technology",
                description: "Peer review of scientific papers"
            },
            {
                organization: "International Brain Research Organization (IBRO)",
                role: "Guest Lecturer",
                period: "Jan 2014 · 1 mo",
                category: "Science and Technology",
                description: "Teaching Electroencephalography (EEG) & Event Related Potential (ERP) to international guest students"
            },
            {
                organization: "Iran University of Science and Technology",
                role: "Workshop Coordinator",
                period: "Sep 2011 - Dec 2011 · 4 mos",
                category: "Education",
                description: "Coordinated educational workshops and training programs"
            },
            {
                organization: "Shahid Rajaee Teacher Training University",
                role: "Technical Team Member",
                period: "Sep 2006 - Sep 2007 · 1 yr 1 mo",
                category: "Science and Technology",
                description: "Contributed to technical projects and research initiatives"
            },
            {
                organization: "TechBBQ",
                role: "Coordinator",
                period: "Sep 2023 · 1 mo",
                category: "Science and Technology",
                description: "Coordinated activities and events for the tech community"
            }
        ];

        const volunteeringSection = document.getElementById('volunteering-section');
        if (!volunteeringSection) return;

        volunteeringSection.innerHTML = volunteeringData.map(item => `
            <div class="volunteer-item fade-in-up">
                <div class="volunteer-header">
                    <h4 class="volunteer-role">${item.role}</h4>
                    <span class="volunteer-organization">${item.organization}</span>
                    <span class="volunteer-period">${item.period}</span>
                </div>
                <div class="volunteer-category">
                    <span class="category-badge">${item.category}</span>
                </div>
                <p class="volunteer-description">${item.description}</p>
            </div>
        `).join('');
    }

    updatePeerReview(peerReview) {
        const peerReviewSection = document.getElementById('peer-review-container');
        if (!peerReviewSection) return;

        const peerReviewData = {
            categories: [
                {
                    name: "Multidisciplinary Journals",
                    journals: ["Scientific Reports", "PeerJ", "PLOS One"]
                },
                {
                    name: "Biomedical & Healthcare Journals",
                    journals: [
                        "Clinical and Translational Neuroscience", "Healthcare", "Diagnostics", "Brain Sciences",
                        "International Journal of Environmental Research and Public Health", "Frontiers in Neuroscience", "Health Science Reports"
                    ]
                },
                {
                    name: "Engineering & Technology Journals",
                    journals: [
                        "IEEE Transactions on Affective Computing", "International Journal of Industrial Ergonomics",
                        "Medical & Biological Engineering & Computing", "Sensors"
                    ]
                },
                {
                    name: "Cognitive Science & Psychology Journals",
                    journals: ["Applied Cognitive Psychology", "Frontiers in Psychology"]
                }
            ]
        };

        const peerReviewContent = `
            <div class="peer-review-intro">
                <h3>Scientific Peer-Review Experience</h3>
                <p>Active reviewer for multiple high-impact journals across diverse research domains</p>
            </div>
            <div class="peer-review-categories">
                ${peerReviewData.categories.map(category => `
                    <div class="peer-review-category">
                        <h4 class="category-title">${category.name}</h4>
                        <ul class="journal-list">
                            ${category.journals.map(journal => `<li class="journal-item">${journal}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;

        peerReviewSection.innerHTML = peerReviewContent;
    }

    updateContacts(contacts) {
        if (contacts.email) {
            this.updateElement('contact-email', contacts.email);
        }
        if (contacts.linkedin) {
            this.updateElement('contact-linkedin', contacts.linkedin);
        }
        if (contacts.github) {
            this.updateElement('contact-github', contacts.github);
        }
        if (contacts.scholar) {
            this.updateElement('contact-scholar', contacts.scholar);
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });
    }

    initScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Active navigation link highlighting
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            try {
                // Here you would normally send the data to your backend
                console.log('Form submission:', data);
                
                // Show success message
                this.showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error sending message:', error);
                this.showNotification('Error sending message. Please try again.', 'error');
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    initAnimations() {
        // Counter animation for stats
        const statsElements = document.querySelectorAll('.stat-content h3');
        const animateCounters = () => {
            statsElements.forEach(element => {
                const target = parseInt(element.textContent);
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    element.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    }
                }, 20);
            });
        };

        // Trigger counter animation when stats section is visible
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }

        // Typing animation for hero text
        this.initTypingAnimation();
    }

    initTypingAnimation() {
        const titleElement = document.querySelector('.hero-text h2');
        if (!titleElement) return;

        const titles = [
            'Data Scientist & Researcher',
            'AI/ML Expert',
            'Healthcare AI Specialist',
            'Explainable AI Researcher',
            'Biomedical Engineer'
        ];

        let currentTitleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const typeTitle = () => {
            const currentTitle = titles[currentTitleIndex];
            
            if (isDeleting) {
                titleElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                    setTimeout(typeTitle, typeSpeed);
                } else {
                    setTimeout(typeTitle, deleteSpeed);
                }
            } else {
                titleElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentTitle.length) {
                    isDeleting = true;
                    setTimeout(typeTitle, pauseTime);
                } else {
                    setTimeout(typeTitle, typeSpeed);
                }
            }
        };

        // Start typing animation after a delay
        setTimeout(typeTitle, 1000);
    }

    // Method to manually update profile data
    async updateProfileData() {
        try {
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedData = await response.json();
                this.profileData = updatedData;
                this.updateUI();
                this.showNotification('Profile data updated successfully!', 'success');
            } else {
                throw new Error('Failed to update profile data');
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
            this.showNotification('Error updating profile data', 'error');
        }
    }

    updateTeaching(teaching) {
        const teachingSection = document.getElementById('teaching-section');
        if (!teachingSection) return;

        const teachingContent = `
            <div class="teaching-content">
                ${teaching.mentoring && teaching.mentoring.length > 0 ? `
                    <div class="teaching-section">
                        <h3>Mentoring</h3>
                        <div class="teaching-list">
                            ${teaching.mentoring.map(item => `
                                <div class="teaching-item">
                                    <h4>${item.role}</h4>
                                    <div class="teaching-meta">
                                        <span class="teaching-institution">${item.organization}</span>
                                        <span class="teaching-duration">${item.duration}</span>
                                    </div>
                                    <div class="teaching-description">${item.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${teaching.supervision && teaching.supervision.length > 0 ? `
                    <div class="teaching-section">
                        <h3>Supervision</h3>
                        <div class="teaching-list">
                            ${teaching.supervision.map(item => `
                                <div class="teaching-item">
                                    <h4>${item.level}</h4>
                                    <div class="teaching-meta">
                                        <span class="teaching-institution">${item.institution}</span>
                                        <span class="teaching-duration">${item.duration}</span>
                                    </div>
                                    <div class="teaching-description">
                                        <strong>Title:</strong> ${item.title}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${teaching.courses && teaching.courses.length > 0 ? `
                    <div class="teaching-section">
                        <h3>Courses</h3>
                        <div class="teaching-list">
                            ${teaching.courses.map(item => `
                                <div class="teaching-item">
                                    <h4>${item.role}</h4>
                                    <div class="teaching-meta">
                                        <span class="teaching-institution">${item.institution}</span>
                                        <span class="teaching-duration">${item.duration}</span>
                                    </div>
                                    <div class="teaching-description">
                                        <strong>Course:</strong> ${item.title}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        teachingSection.innerHTML = teachingContent;
    }

    updatePresentations(presentations) {
        const presentationsSection = document.getElementById('presentations-section');
        if (!presentationsSection) return;

        const presentationsContent = `
            <div class="presentations-container">
                ${presentations.map(yearData => `
                    <div class="presentation-year">
                        <h3>${yearData.year}</h3>
                        <div class="presentation-events">
                            ${yearData.events.map(event => `
                                <div class="presentation-event">
                                    <div class="presentation-title">${event.title}</div>
                                    <div class="presentation-meta">
                                        <span class="presentation-event-name">${event.event}</span>
                                        <span class="presentation-location">${event.location}</span>
                                        ${event.type ? `<span class="presentation-type">${event.type}</span>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        presentationsSection.innerHTML = presentationsContent;
    }

    updateCertifications(certifications) {
        const certificationsSection = document.getElementById('certifications-section');
        if (!certificationsSection) return;

        const categoryNames = {
            'dataScience': 'Data Science & Statistics',
            'it': 'IT',
            'clinical': 'Health and Clinical Sciences',
            'biomedical': 'Biomedical Engineering (Postgraduate)',
            'general': 'General'
        };

        const certificationsContent = `
            <div class="certifications-container">
                ${Object.entries(certifications).map(([category, items]) => `
                    <div class="certification-category">
                        <h3>${categoryNames[category] || category}</h3>
                        <div class="certification-list">
                            ${items.map(item => `
                                <div class="certification-item">${item}</div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        certificationsSection.innerHTML = certificationsContent;
    }

    updateMediaCoverage(mediaCoverage) {
        const mediaSection = document.getElementById('media-section');
        if (!mediaSection || !mediaCoverage.length) return;

        mediaSection.innerHTML = mediaCoverage.map(item => `
            <div class="media-item fade-in-up">
                <div class="media-header">
                    <h3 class="media-title">${item.title}</h3>
                    <span class="media-outlet">${item.outlet}</span>
                </div>
                ${item.url ? `<a href="${item.url}" target="_blank" class="media-link"><i class="fas fa-external-link-alt"></i> View Article</a>` : ''}
            </div>
        `).join('');
    }
}

// Page Analytics Functionality
class PageAnalytics {
    constructor() {
        this.storageKey = 'page-analytics';
        this.init();
    }

    init() {
        this.updatePageViews();
        this.trackVisitor();
        this.displayAnalytics();
    }

    updatePageViews() {
        const data = this.getAnalyticsData();
        data.pageViews = (data.pageViews || 0) + 1;
        data.lastVisit = new Date().toISOString();
        this.saveAnalyticsData(data);
    }

    trackVisitor() {
        const data = this.getAnalyticsData();
        const sessionId = this.getSessionId();
        
        if (!data.sessions) data.sessions = new Set();
        if (!data.sessions.has(sessionId)) {
            data.sessions.add(sessionId);
            data.uniqueVisitors = (data.uniqueVisitors || 0) + 1;
        }

        // Get country from IP (using a free service)
        this.getCountryFromIP().then(country => {
            if (country) {
                if (!data.countries) data.countries = {};
                data.countries[country] = (data.countries[country] || 0) + 1;
                this.saveAnalyticsData(data);
                this.displayAnalytics();
            }
        });
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('session-id');
        if (!sessionId) {
            sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('session-id', sessionId);
        }
        return sessionId;
    }

    async getCountryFromIP() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return data.country_name || 'Unknown';
        } catch (error) {
            console.log('Could not fetch country data:', error);
            return 'Unknown';
        }
    }

    getAnalyticsData() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            const parsed = JSON.parse(data);
            // Convert sessions array back to Set
            if (parsed.sessions && Array.isArray(parsed.sessions)) {
                parsed.sessions = new Set(parsed.sessions);
            }
            return parsed;
        }
        return {};
    }

    saveAnalyticsData(data) {
        // Convert Set to array for storage
        const toSave = { ...data };
        if (toSave.sessions instanceof Set) {
            toSave.sessions = Array.from(toSave.sessions);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(toSave));
    }

    displayAnalytics() {
        const data = this.getAnalyticsData();
        
        // Update counters
        const pageViewsEl = document.getElementById('page-views');
        const uniqueVisitorsEl = document.getElementById('unique-visitors');
        const countriesCountEl = document.getElementById('countries-count');
        
        if (pageViewsEl) pageViewsEl.textContent = data.pageViews || 0;
        if (uniqueVisitorsEl) uniqueVisitorsEl.textContent = data.uniqueVisitors || 0;
        
        // Update countries
        const countries = data.countries || {};
        const countryCount = Object.keys(countries).length;
        if (countriesCountEl) countriesCountEl.textContent = countryCount;
        
        // Display country stats
        this.displayCountryStats(countries);
    }

    displayCountryStats(countries) {
        const container = document.getElementById('country-stats');
        if (!container) return;

        const sortedCountries = Object.entries(countries)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10); // Show top 10 countries

        if (sortedCountries.length === 0) {
            container.innerHTML = '<p style="text-align: center; opacity: 0.7;">No visitor data yet</p>';
            return;
        }

        container.innerHTML = sortedCountries.map(([country, count]) => `
            <div class="country-item">
                <span class="country-flag">${this.getCountryFlag(country)}</span>
                <span class="country-name">${country}</span>
                <span class="country-count">${count}</span>
            </div>
        `).join('');
    }

    getCountryFlag(countryName) {
        const flags = {
            'Denmark': '🇩🇰',
            'United States': '🇺🇸',
            'Germany': '🇩🇪',
            'France': '🇫🇷',
            'United Kingdom': '🇬🇧',
            'Canada': '🇨🇦',
            'Australia': '🇦🇺',
            'Netherlands': '🇳🇱',
            'Sweden': '🇸🇪',
            'Norway': '🇳🇴',
            'Finland': '🇫🇮',
            'Switzerland': '🇨🇭',
            'Austria': '🇦🇹',
            'Belgium': '🇧🇪',
            'Italy': '🇮🇹',
            'Spain': '🇪🇸',
            'Brazil': '🇧🇷',
            'India': '🇮🇳',
            'China': '🇨🇳',
            'Japan': '🇯🇵',
            'Unknown': '🌍'
        };
        return flags[countryName] || '🌍';
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicPortfolio();
    new PageAnalytics();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
