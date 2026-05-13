// script.js - JavaScript for portfolio interactivity

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const form = document.getElementById('contact-form');
const projectsList = document.getElementById('projects-list');
const addProjectBtn = document.getElementById('add-project-btn');

// Modal Elements
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloses = document.querySelectorAll('.modal-close');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update toggle button text
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modal.classList.add('modal-show');
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.classList.remove('modal-show');
}

// Form Handling
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form submitted with data:', data);

    // Show success message
    alert('Thank you for your message! (Check console for form data)');

    // Reset form
    form.reset();
}

// Dynamic Project Addition
function addNewProject() {
    const projectNumber = projectsList.children.length + 1;
    const projectData = {
        title: `JavaScript Project ${projectNumber}`,
        description: `An interactive web application built with modern JavaScript frameworks and APIs.`,
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'React']
    };

    const projectElement = createProjectElement(projectData);
    projectsList.appendChild(projectElement);

    // Add animation class
    setTimeout(() => {
        projectElement.classList.add('project-enter');
    }, 10);
}

function createProjectElement(project) {
    const li = document.createElement('li');
    li.className = 'project-item';

    li.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <button class="project-btn" data-modal="project-modal-${Date.now()}">View Details</button>
    `;

    return li;
}

// Animation and Micro-interactions
function initAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add hover effects
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// Event Listeners
function initEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Add project button
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', addNewProject);
    }

    // Modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Modal close buttons
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Keyboard navigation for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initEventListeners();
    initAnimations();
});

// Export functions for potential use in other scripts
window.PortfolioApp = {
    toggleTheme,
    addNewProject,
    openModal,
    closeModal
};