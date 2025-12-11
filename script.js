
document.addEventListener('DOMContentLoaded', function() {
    // Application State
    const appState = {
        theme: localStorage.getItem('theme') || 'light',
        visitCount: parseInt(localStorage.getItem('visitCount')) || 0,
        currentVisitStart: Date.now(),
        projectsViewed: new Set(),
        githubData: null,
        projects: [
            {
                id: 1,
                title: "Data Structure Course Project",
                description: "This course focuses on organizing and managing data efficiently using structures such as arrays, linked lists, stacks, queues, trees, and graphs. It builds problem-solving and analytical thinking skills by teaching how to design and implement algorithms for storing, retrieving, and processing data effectively.",
                image: "assets/DataStructures.jpeg",
                technologies: ["Problem-solving", "Algorithm design", "Java"],
                category: "academic",
                complexity: "intermediate",
                date: "2024-01-15",
                links: {
                    demo: "#",
                    github: "#"
                }
            },
            {
                id: 2,
                title: "Data Science Course Project",
                description: "This project introduced the fundamentals of collecting, cleaning, and analyzing data to extract meaningful insights. It emphasized applying basic statistical methods and visualization techniques to understand patterns and support decision-making.",
                image: "assets/DataSience.jpeg",
                technologies: ["Python", "Data cleaning", "Statistical analysis", "Problem-solving"],
                category: "academic",
                complexity: "beginner",
                date: "2024-03-20",
                links: {
                    demo: "#",
                    github: "#"
                }
            },
            {
                id: 3,
                title: "Software Engineering Course Project",
                description: "This project focused on applying software development principles to design and implement a functional application. It covered the full development cycle, including requirement analysis, system design, coding, testing, and documentation, with an emphasis on teamwork and practical problem-solving.",
                image: "assets/software.jpeg",
                technologies: ["Requirement gathering", "Software design", "Programming and debugging", "Testing and quality assurance"],
                category: "academic",
                complexity: "advanced",
                date: "2024-05-10",
                links: {
                    demo: "#",
                    github: "#"
                }
            },
            {
                id: 4,
                title: "Personal Portfolio Website",
                description: "A responsive portfolio website showcasing my projects and skills. Built with HTML, CSS, and JavaScript with dark/light mode toggle and smooth animations.",
                image: "assets/portfolioPic.png",
                technologies: ["HTML", "CSS", "JavaScript", "UI Design"],
                category: "web",
                complexity: "intermediate",
                date: "2024-06-01",
                links: {
                    demo: "#",
                    github: "#"
                }
            }
        ],
        currentFilters: {
            category: 'all',
            complexity: 'all',
            technology: 'all'
        },
        sortBy: 'default'
    };

    // Initialize the application
    function init() {
        initializeTheme();
        initializeNavigation();
        initializeVisitorTracking();
        initializeProjectSystem();
        initializeGitHubIntegration();
        initializeContactForm();
        initializeScrollAnimations();
        initializePerformanceOptimizations();

        // Update analytics display
        updateAnalyticsDisplay();

        // Start visit timer
        startVisitTimer();
    }

    // Theme Management
    function initializeTheme() {
        const themeToggle = document.getElementById('themeToggle');

        // Apply saved theme
        if (appState.theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            appState.theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';

            if (appState.theme === 'dark') {
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }

            localStorage.setItem('theme', appState.theme);
        });
    }

    // Navigation Management
    function initializeNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';

                // Track project views
                if (this.getAttribute('href') === '#projects') {
                    trackProjectView('projects_section');
                }
            });
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active section highlighting
        function highlightActiveSection() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');

            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const headerHeight = document.querySelector('header').offsetHeight;

                if (window.scrollY >= (sectionTop - headerHeight - 50)) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection();
    }

    // Visitor Tracking and Analytics
    function initializeVisitorTracking() {
        // Increment visit count
        appState.visitCount++;
        localStorage.setItem('visitCount', appState.visitCount.toString());

        // Update visitor counter in header
        const visitCountElement = document.getElementById('visitCount');
        if (visitCountElement) {
            visitCountElement.textContent = appState.visitCount;
        }
    }

    function startVisitTimer() {
        setInterval(() => {
            const currentTime = Date.now();
            const visitDuration = Math.floor((currentTime - appState.currentVisitStart) / 1000);

            const visitTimeElement = document.getElementById('currentVisitTime');
            if (visitTimeElement) {
                const minutes = Math.floor(visitDuration / 60);
                const seconds = visitDuration % 60;
                visitTimeElement.textContent = `${minutes}m ${seconds}s`;
            }
        }, 1000);
    }

    function trackProjectView(projectId) {
        if (!appState.projectsViewed.has(projectId)) {
            appState.projectsViewed.add(projectId);
            updateAnalyticsDisplay();
        }
    }

    function updateAnalyticsDisplay() {
        const totalVisitsElement = document.getElementById('totalVisits');
        const projectsViewedElement = document.getElementById('projectsViewed');

        if (totalVisitsElement) {
            totalVisitsElement.textContent = appState.visitCount;
        }

        if (projectsViewedElement) {
            projectsViewedElement.textContent = appState.projectsViewed.size;
        }
    }

    // Project System with Filtering and Sorting
    function initializeProjectSystem() {
        renderProjectFilters();
        renderProjects();

        // Set up sort functionality
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                appState.sortBy = this.value;
                renderProjects();
            });
        }
    }

    function renderProjectFilters() {
        const filtersContainer = document.getElementById('projectFilters');
        if (!filtersContainer) return;

        // Get all unique categories, complexities, and technologies
        const categories = new Set(['all']);
        const complexities = new Set(['all']);
        const technologies = new Set(['all']);

        appState.projects.forEach(project => {
            categories.add(project.category);
            complexities.add(project.complexity);
            project.technologies.forEach(tech => technologies.add(tech.toLowerCase()));
        });

        // Create filter buttons for categories
        const categoryFilters = document.createElement('div');
        categoryFilters.className = 'filter-group';
        categoryFilters.innerHTML = '<h4>Category:</h4>';

        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = `filter-btn ${category === 'all' ? 'active' : ''}`;
            button.textContent = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
            button.setAttribute('data-filter-type', 'category');
            button.setAttribute('data-filter-value', category);
            categoryFilters.appendChild(button);
        });

        // Create filter buttons for complexities
        const complexityFilters = document.createElement('div');
        complexityFilters.className = 'filter-group';
        complexityFilters.innerHTML = '<h4>Complexity:</h4>';

        complexities.forEach(complexity => {
            const button = document.createElement('button');
            button.className = `filter-btn ${complexity === 'all' ? 'active' : ''}`;
            button.textContent = complexity === 'all' ? 'All' : complexity.charAt(0).toUpperCase() + complexity.slice(1);
            button.setAttribute('data-filter-type', 'complexity');
            button.setAttribute('data-filter-value', complexity);
            complexityFilters.appendChild(button);
        });

        // Create filter buttons for technologies
        const technologyFilters = document.createElement('div');
        technologyFilters.className = 'filter-group';
        technologyFilters.innerHTML = '<h4>Technology:</h4>';

        Array.from(technologies).slice(0, 8).forEach(tech => { // Limit to 8 technologies for UI
            const button = document.createElement('button');
            button.className = `filter-btn ${tech === 'all' ? 'active' : ''}`;
            button.textContent = tech === 'all' ? 'All' : tech.charAt(0).toUpperCase() + tech.slice(1);
            button.setAttribute('data-filter-type', 'technology');
            button.setAttribute('data-filter-value', tech);
            technologyFilters.appendChild(button);
        });

        // Add all filter groups to container
        filtersContainer.appendChild(categoryFilters);
        filtersContainer.appendChild(complexityFilters);
        filtersContainer.appendChild(technologyFilters);

        // Add event listeners to filter buttons
        filtersContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                const filterType = e.target.getAttribute('data-filter-type');
                const filterValue = e.target.getAttribute('data-filter-value');

                // Update active state
                document.querySelectorAll(`[data-filter-type="${filterType}"]`).forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');

                // Update filters
                appState.currentFilters[filterType] = filterValue;

                // Re-render projects
                renderProjects();
            }
        });
    }

    function renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        // Filter projects
        let filteredProjects = appState.projects.filter(project => {
            if (appState.currentFilters.category !== 'all' && project.category !== appState.currentFilters.category) {
                return false;
            }

            if (appState.currentFilters.complexity !== 'all' && project.complexity !== appState.currentFilters.complexity) {
                return false;
            }

            if (appState.currentFilters.technology !== 'all') {
                const techExists = project.technologies.some(tech =>
                    tech.toLowerCase() === appState.currentFilters.technology
                );
                if (!techExists) return false;
            }

            return true;
        });

        // Sort projects
        filteredProjects = sortProjects(filteredProjects, appState.sortBy);

        // Clear grid
        projectsGrid.innerHTML = '';

        // Render projects
        filteredProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);

            // Add intersection observer for animation
            observeElement(projectCard);
        });

        // If no projects match filters
        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">No projects match the selected filters.</p>';
        }
    }

    function sortProjects(projects, sortBy) {
        switch(sortBy) {
            case 'name':
                return [...projects].sort((a, b) => a.title.localeCompare(b.title));
            case 'date':
                return [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'complexity':
                const complexityOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
                return [...projects].sort((a, b) => complexityOrder[a.complexity] - complexityOrder[b.complexity]);
            default:
                return projects;
        }
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.setAttribute('data-project-id', project.id);

        card.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <div class="project-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-complexity">${project.complexity}</span>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.links.demo}" class="btn-link">Live Demo</a>
                    <a href="${project.links.github}" class="btn-link">GitHub</a>
                </div>
            </div>
        `;

        // Add click event to track project views
        card.addEventListener('click', () => {
            trackProjectView(project.id);
        });

        return card;
    }

    // GitHub API Integration
    function initializeGitHubIntegration() {
        fetchGitHubData();
    }

    async function fetchGitHubData() {
        const username = 'maryamzakmbk'; // Your GitHub username
        const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();
            appState.githubData = repos;
            renderGitHubRepos(repos);

            // Hide loading indicator
            const loadingElement = document.getElementById('githubLoading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }

        } catch (error) {
            console.error('Error fetching GitHub data:', error);

            // Show error message
            const loadingElement = document.getElementById('githubLoading');
            const errorElement = document.getElementById('githubError');

            if (loadingElement) {
                loadingElement.style.display = 'none';
            }

            if (errorElement) {
                errorElement.style.display = 'block';
            }
        }
    }

    function renderGitHubRepos(repos) {
        const reposGrid = document.getElementById('reposGrid');
        const statsElement = document.getElementById('githubStats');

        if (!reposGrid || !statsElement) return;

        // Clear existing content
        reposGrid.innerHTML = '';

        // Calculate stats
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
        const latestUpdate = repos.length > 0 ? new Date(repos[0].updated_at).toLocaleDateString() : 'N/A';

        // Render stats
        statsElement.innerHTML = `
            <div class="stat-item">
                <span class="stat-value">${repos.length}</span>
                <span class="stat-label">Repositories</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${totalStars}</span>
                <span class="stat-label">Stars</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${totalForks}</span>
                <span class="stat-label">Forks</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${latestUpdate}</span>
                <span class="stat-label">Last Update</span>
            </div>
        `;

        // Render repositories
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card fade-in';

            repoCard.innerHTML = `
                <div class="repo-header">
                    <h3 class="repo-name">${repo.name}</h3>
                    <div class="repo-stats">
                        <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
                        <span class="repo-stat">🍴 ${repo.forks_count}</span>
                    </div>
                </div>
                <p class="repo-description">${repo.description || 'No description available'}</p>
                ${repo.topics && repo.topics.length > 0 ? `
                    <div class="repo-topics">
                        ${repo.topics.slice(0, 3).map(topic => `<span class="repo-topic">${topic}</span>`).join('')}
                    </div>
                ` : ''}
                <a href="${repo.html_url}" target="_blank" class="repo-link">
                    View on GitHub →
                </a>
            `;

            reposGrid.appendChild(repoCard);
            observeElement(repoCard);
        });
    }

    // Enhanced Contact Form
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const formGroups = document.querySelectorAll('.form-group');

        // Add real-time validation
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            if (!input) return;

            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            group.appendChild(errorSpan);

            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                // Clear error when user starts typing
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    errorSpan.textContent = '';
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea, select');

            // Validate all fields
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show success message
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');

                // Simulate form submission
                simulateFormSubmission(contactForm);

                // Reset form
                contactForm.reset();
            } else {
                showFormMessage('Please fix the errors above.', 'error');
            }
        });

        function validateField(field) {
            const value = field.value.trim();
            const errorSpan = field.parentNode.querySelector('.error-message');
            let isValid = true;
            let errorMessage = '';

            // Required field validation
            if (field.hasAttribute('required') && value === '') {
                isValid = false;
                errorMessage = 'This field is required';
            }

            // Email validation
            if (field.type === 'email' && value !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }

            // Message length validation
            if (field.name === 'message' && value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }

            // Update field state
            if (!isValid) {
                field.classList.add('error');
                errorSpan.textContent = errorMessage;
            } else {
                field.classList.remove('error');
                errorSpan.textContent = '';
            }

            return isValid;
        }

        function simulateFormSubmission(form) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // In a real application, you would send this data to a server
            console.log('Form submission simulated:', data);

            // Track form submission in analytics
            trackProjectView('contact_form_submission');
        }

        function showFormMessage(message, type) {
            // Remove existing messages
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Create new message
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message ${type}`;
            messageDiv.textContent = message;

            // Add animation
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';

            contactForm.insertBefore(messageDiv, contactForm.firstChild);

            // Animate in
            setTimeout(() => {
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 10);

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.style.opacity = '0';
                    messageDiv.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        if (messageDiv.parentNode) {
                            messageDiv.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }
    }

    // Scroll Animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-tag, .project-card, .about-text p, .profile-img, .repo-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    function observeElement(element) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    }

    // Performance Optimizations
    function initializePerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            scrollTimeout = setTimeout(function() {
                // Scroll handling code
            }, 100);
        });
    }

    // Dynamic Greeting Based on Time of Day
    function updateGreeting() {
        const greetingElement = document.getElementById('greeting');
        const hour = new Date().getHours();
        let greeting = 'Hello';

        if (hour < 12) greeting = 'Good Morning';
        else if (hour < 18) greeting = 'Good Afternoon';
        else greeting = 'Good Evening';

        if (greetingElement) {
            greetingElement.textContent = `${greeting}, I'm Maryam Al Mobarak`;
        }
    }

    updateGreeting();

    // Fix for skills animation
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        setTimeout(() => {
            skillsGrid.classList.add('animate-in');
        }, 100);
    }

    // Initialize the application
    init();
});