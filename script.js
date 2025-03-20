// Main JavaScript for AI Literacy Course

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetId) {
                    section.classList.add('active-section');
                }
            });
            
            // Scroll to top of section
            window.scrollTo({
                top: document.querySelector(`#${targetId}`).offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Module card expansion
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const moduleCard = this.parentElement;
            
            // Toggle active class
            if (moduleCard.classList.contains('active')) {
                moduleCard.classList.remove('active');
            } else {
                // Close other open modules
                document.querySelectorAll('.module-card.active').forEach(card => {
                    card.classList.remove('active');
                });
                
                moduleCard.classList.add('active');
            }
        });
    });
    
    // Auto-expand first module
    document.querySelector('#module1').classList.add('active');
    
    // CTA buttons functionality
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
            
            // Show corresponding section
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetId) {
                    section.classList.add('active-section');
                }
            });
            
            // Scroll to section
            window.scrollTo({
                top: document.querySelector(`#${targetId}`).offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Progress circle animation
    function updateProgressCircles() {
        document.querySelectorAll('.progress-circle').forEach(circle => {
            const progress = parseInt(circle.getAttribute('data-progress'));
            circle.style.background = `conic-gradient(var(--accent-color) ${progress}%, var(--border-color) 0%)`;
        });
    }
    
    updateProgressCircles();
    
    // Simulate progress tracking (for demo purposes)
    let userProgress = {
        modules: {
            module1: 0,
            module2: 0,
            module3: 0,
            module4: 0,
            module5: 0,
            module6: 0
        },
        assessments: {
            knowledgeChecks: 0,
            reflectionActivities: 0,
            practicalExercises: 0,
            finalPortfolio: 0
        },
        overallProgress: 0
    };
    
    // Function to update UI based on progress
    function updateProgressUI() {
        // Update overall progress
        const totalModules = Object.keys(userProgress.modules).length;
        let completedModules = 0;
        
        for (const module in userProgress.modules) {
            if (userProgress.modules[module] === 100) {
                completedModules++;
            }
        }
        
        userProgress.overallProgress = Math.round((completedModules / totalModules) * 100);
        
        // Update progress bar and percentage
        document.querySelector('.progress').style.width = `${userProgress.overallProgress}%`;
        document.querySelector('#progress-percentage').textContent = `${userProgress.overallProgress}%`;
        
        // Update assessment progress circles
        document.querySelectorAll('.progress-circle').forEach((circle, index) => {
            let progress = 0;
            
            switch(index) {
                case 0:
                    progress = userProgress.assessments.knowledgeChecks;
                    break;
                case 1:
                    progress = userProgress.assessments.reflectionActivities;
                    break;
                case 2:
                    progress = userProgress.assessments.practicalExercises;
                    break;
                case 3:
                    progress = userProgress.assessments.finalPortfolio;
                    break;
            }
            
            circle.setAttribute('data-progress', progress);
            circle.querySelector('.progress-text').textContent = `${progress}%`;
        });
        
        updateProgressCircles();
        
        // Update module status
        for (const module in userProgress.modules) {
            const moduleCard = document.querySelector(`#${module}`);
            const progress = userProgress.modules[module];
            const statusElement = moduleCard.querySelector('.module-status');
            
            if (progress === 0) {
                if (module === 'module1') {
                    statusElement.textContent = 'Not Started';
                    statusElement.style.backgroundColor = 'var(--border-color)';
                } else {
                    statusElement.textContent = 'Locked';
                    statusElement.style.backgroundColor = 'var(--border-color)';
                }
            } else if (progress < 100) {
                statusElement.textContent = 'In Progress';
                statusElement.style.backgroundColor = 'var(--warning-color)';
            } else {
                statusElement.textContent = 'Completed';
                statusElement.style.backgroundColor = 'var(--success-color)';
                statusElement.style.color = 'white';
                
                // Unlock next module if available
                const moduleNumber = parseInt(module.replace('module', ''));
                const nextModule = `module${moduleNumber + 1}`;
                
                if (document.querySelector(`#${nextModule}`)) {
                    const nextModuleCard = document.querySelector(`#${nextModule}`);
                    const nextModuleStatus = nextModuleCard.querySelector('.module-status');
                    const nextModuleButton = nextModuleCard.querySelector('.module-button');
                    
                    nextModuleStatus.textContent = 'Not Started';
                    nextModuleStatus.style.backgroundColor = 'var(--border-color)';
                    
                    nextModuleButton.classList.remove('disabled');
                    nextModuleButton.textContent = 'Start Module';
                    nextModuleButton.href = `modules/${nextModule}.html`;
                }
            }
        }
        
        // Update badges
        const badges = document.querySelectorAll('.badge');
        
        for (let i = 0; i < 6; i++) {
            const moduleKey = `module${i + 1}`;
            if (userProgress.modules[moduleKey] === 100) {
                badges[i].classList.remove('locked');
            }
        }
        
        // Course complete badge
        if (userProgress.overallProgress === 100) {
            badges[6].classList.remove('locked');
        }
    }
    
    // Simulate starting Module 1 when clicking its button
    document.querySelector('#module1 .module-button').addEventListener('click', function(e) {
        e.preventDefault();
        
        // For demo purposes, simulate progress in Module 1
        userProgress.modules.module1 = 100;
        userProgress.assessments.knowledgeChecks = 25;
        userProgress.assessments.reflectionActivities = 15;
        userProgress.assessments.practicalExercises = 10;
        
        updateProgressUI();
        
        // Show a success message
        alert('For demonstration purposes, Module 1 has been marked as completed. In a real implementation, you would be directed to the module content.');
    });
    
    // Handle module button clicks for locked modules
    document.querySelectorAll('.module-button.disabled').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Please complete the previous module to unlock this content.');
        });
    });
    
    // Handle resource links
    document.querySelectorAll('.resource-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('In the full implementation, this would link to the detailed resource content.');
        });
    });
});
