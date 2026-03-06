// Roadmap Generation
function generateRoadmap() {
    // Show loading overlay
    document.getElementById('loadingOverlay').classList.remove('hidden');
    
    // Simulate AI processing
    setTimeout(() => {
        createRoadmap();
        document.getElementById('loadingOverlay').classList.add('hidden');
        nextStep(5); // Go to roadmap section
    }, 3000);
}

function createRoadmap() {
    const roleData = jobRoles.find(r => r.id === appState.selectedRole);
    if (!roleData) return;
    
    // Get skill gap data
    const { strengths, weaknesses, missingSkills } = appState.userProfile;
    
    // Combine weaknesses and missing skills as skills to learn
    const skillsToLearn = [...weaknesses, ...missingSkills];
    
    // Generate roadmap based on timeline and hours per day
    const roadmap = generateLearningPath(skillsToLearn, appState.timeline, appState.hoursPerDay);
    
    appState.roadmap = roadmap;
    
    // Populate the roadmap UI
    populateSkillGapAnalysis(strengths, weaknesses, missingSkills);
    populateTimelineView(roadmap);
    populateTopicsView(roadmap);
    populateWeeklySchedule(roadmap);
    populateResources(roadmap);
}

// Generate Learning Path
function generateLearningPath(skillsToLearn, timeline, hoursPerDay) {
    // Convert timeline to weeks
    let totalWeeks;
    switch (timeline) {
        case '1-month': totalWeeks = 4; break;
        case '3-months': totalWeeks = 12; break;
        case '6-months': totalWeeks = 24; break;
        default: 
            // For custom timeline, calculate from target date
            const today = new Date();
            const targetDate = new Date(document.getElementById('targetDate').value);
            const diffTime = Math.abs(targetDate - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            totalWeeks = Math.floor(diffDays / 7);
            break;
    }
    
    // If no weeks, default to 12 weeks
    if (!totalWeeks || totalWeeks < 1) totalWeeks = 12;
    
    // Calculate total hours available
    const totalHours = totalWeeks * 7 * hoursPerDay;
    
    // Map skills to learning modules with estimated hours
    const learningModules = [];
    
    // Define skill difficulty and estimated hours
    const skillHours = {
        // Core web dev
        'HTML': 10,
        'CSS': 15,
        'JavaScript': 40,
        'React': 50,
        'Vue': 40,
        'Angular': 50,
        'Node.js': 40,
        'Express': 30,
        'Python': 35,
        'Django': 40,
        'Flask': 30,
        'SQL': 25,
        'MongoDB': 30,
        'REST APIs': 25,
        'GraphQL': 20,
        'Git': 15,
        'Docker': 25,
        'Kubernetes': 30,
        'AWS': 40,
        'Azure': 40,
        'GCP': 40,
        'CI/CD': 20,
        
        // Data science
        'Machine Learning': 60,
        'Statistics': 30,
        'Data Visualization': 25,
        'Tableau': 20,
        'Power BI': 20,
        'Pandas': 30,
        'NumPy': 20,
        'Scikit-learn': 30,
        'TensorFlow': 40,
        'PyTorch': 40,
        'Data Cleaning': 20,
        
        // Design
        'Figma': 25,
        'Adobe XD': 25,
        'Sketch': 25,
        'User Research': 20,
        'Prototyping': 20,
        'UI Design': 30,
        'UX Design': 30,
        
        // General
        'Algorithms': 40,
        'Data Structures': 35,
        'System Design': 30,
        'Problem Solving': 30,
        'Communication': 15,
        'Teamwork': 10,
        'Time Management': 10
    };
    
    // Create modules for each skill to learn
    skillsToLearn.forEach(skill => {
        const hours = skillHours[skill] || 20; // Default 20 hours
        learningModules.push({
            id: `module-${skill.replace(/\s+/g, '-').toLowerCase()}`,
            title: skill,
            description: `Master ${skill} fundamentals and advanced concepts`,
            hoursRequired: hours,
            difficulty: hours > 30 ? 'Advanced' : hours > 15 ? 'Intermediate' : 'Beginner',
            subtopics: generateSubtopicsForSkill(skill),
            resources: getResourcesForSkill(skill)
        });
    });
    
    // Sort modules by difficulty (beginner first)
    learningModules.sort((a, b) => {
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });
    
    // Distribute modules across weeks
    const roadmap = {
        totalWeeks,
        hoursPerDay,
        modules: learningModules,
        weeklyPlan: []
    };
    
    let currentWeek = 1;
    let remainingHours = totalHours;
    let moduleIndex = 0;
    
    while (currentWeek <= totalWeeks && moduleIndex < learningModules.length) {
        const weekModules = [];
        let weekHours = 0;
        
        while (
            moduleIndex < learningModules.length && 
            weekHours + learningModules[moduleIndex].hoursRequired <= remainingHours &&
            weekModules.length < 3 // Max 3 modules per week
        ) {
            const module = learningModules[moduleIndex];
            weekModules.push({
                ...module,
                week: currentWeek,
                startDay: (currentWeek - 1) * 7 + 1,
                endDay: (currentWeek - 1) * 7 + Math.ceil(module.hoursRequired / hoursPerDay)
            });
            
            weekHours += module.hoursRequired;
            remainingHours -= module.hoursRequired;
            moduleIndex++;
        }
        
        roadmap.weeklyPlan.push({
            week: currentWeek,
            modules: weekModules,
            totalHours: weekHours
        });
        
        currentWeek++;
    }
    
    return roadmap;
}

// Generate subtopics for a skill
function generateSubtopicsForSkill(skill) {
    const subtopicsMap = {
        'HTML': ['Semantic HTML', 'Forms', 'Accessibility', 'SEO basics'],
        'CSS': ['Layout (Flexbox, Grid)', 'Responsive Design', 'CSS Variables', 'Animations'],
        'JavaScript': ['ES6+ Features', 'DOM Manipulation', 'Asynchronous JS', 'Error Handling'],
        'React': ['Components & Props', 'State & Lifecycle', 'Hooks', 'Routing', 'State Management'],
        'Node.js': ['Node Fundamentals', 'Express Framework', 'Middleware', 'REST APIs'],
        'Python': ['Python Basics', 'Data Structures', 'File Handling', 'Libraries'],
        'SQL': ['Basic Queries', 'Joins', 'Indexes', 'Database Design'],
        'MongoDB': ['NoSQL Concepts', 'CRUD Operations', 'Mongoose', 'Aggregation'],
        'Git': ['Basic Commands', 'Branching', 'Merging', 'GitHub'],
        'Docker': ['Containers', 'Dockerfile', 'Images', 'Docker Compose'],
        'Algorithms': ['Sorting', 'Searching', 'Recursion', 'Complexity Analysis'],
        'Data Structures': ['Arrays', 'Linked Lists', 'Stacks & Queues', 'Trees', 'Hash Tables'],
        'System Design': ['Load Balancing', 'Caching', 'Database Sharding', 'Microservices'],
        'REST APIs': ['HTTP Methods', 'Status Codes', 'Authentication', 'Testing'],
        'Machine Learning': ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Scikit-learn'],
        'Figma': ['Interface Basics', 'Components', 'Auto Layout', 'Prototyping'],
        'User Research': ['User Interviews', 'Surveys', 'Personas', 'User Journeys']
    };
    
    return subtopicsMap[skill] || [`${skill} Fundamentals`, `${skill} Best Practices`];
}

// Populate Skill Gap Analysis
function populateSkillGapAnalysis(strengths, weaknesses, missingSkills) {
    // Strengths
    const strengthsHtml = strengths.length > 0 
        ? strengths.map(skill => `<span class="skill-tag strength">${skill}</span>`).join('')
        : '<p>No strengths detected</p>';
    document.getElementById('strengthsList').innerHTML = strengthsHtml;
    
    // Weaknesses
    const weaknessesHtml = weaknesses.length > 0 
        ? weaknesses.map(skill => `<span class="skill-tag weakness">${skill}</span>`).join('')
        : '<p>No weaknesses detected</p>';
    document.getElementById('weaknessList').innerHTML = weaknessesHtml;
    
    // Missing Skills
    const missingSkillsHtml = missingSkills.length > 0 
        ? missingSkills.map(skill => `<span class="skill-tag missing">${skill}</span>`).join('')
        : '<p>No missing skills</p>';
    document.getElementById('missingSkillsList').innerHTML = missingSkillsHtml;
}

// Populate Timeline View
function populateTimelineView(roadmap) {
    const timelineContainer = document.getElementById('roadmapTimeline');
    timelineContainer.innerHTML = '';
    
    roadmap.weeklyPlan.forEach(weekPlan => {
        weekPlan.modules.forEach(module => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">Week ${module.week}</div>
                    <div class="timeline-title">${module.title}</div>
                    <div class="timeline-description">
                        ${module.description}<br>
                        <strong>Estimated Time:</strong> ${module.hoursRequired} hours
                    </div>
                    <div class="subtopics">
                        ${module.subtopics.slice(0, 3).map(st => 
                            `<span class="subtopic-tag">${st}</span>`
                        ).join('')}
                        ${module.subtopics.length > 3 ? 
                            `<span class="subtopic-tag">+${module.subtopics.length - 3}</span>` : ''}
                    </div>
                </div>
                <div class="timeline-marker">
                    ${module.week}
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        });
    });
}

// Populate Topics View
function populateTopicsView(roadmap) {
    const topicsList = document.getElementById('topicsList');
    topicsList.innerHTML = '';
    
    roadmap.modules.forEach((module, index) => {
        const topicCard = document.createElement('div');
        topicCard.className = 'topic-card';
        topicCard.innerHTML = `
            <div class="topic-header">
                <div class="topic-title">${module.title}</div>
                <div class="topic-duration">${module.hoursRequired}h</div>
            </div>
            <div class="topic-subtopics">
                ${module.subtopics.map(st => 
                    `<span class="subtopic-tag">${st}</span>`
                ).join('')}
            </div>
            <div class="topic-progress">
                <div class="topic-progress-fill" style="width: 0%"></div>
            </div>
            <div class="topic-meta" style="margin-top: 1rem;">
                <span class="topic-difficulty badge badge-${getDifficultyColor(module.difficulty)}">
                    ${module.difficulty}
                </span>
                <span class="topic-week">Week ${module.week}</span>
            </div>
        `;
        topicsList.appendChild(topicCard);
    });
}

function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'Beginner': return 'green';
        case 'Intermediate': return 'orange';
        case 'Advanced': return 'red';
        default: return 'blue';
    }
}

// Populate Weekly Schedule
function populateWeeklySchedule(roadmap) {
    const weeklySchedule = document.getElementById('weeklySchedule');
    weeklySchedule.innerHTML = '';
    
    roadmap.weeklyPlan.forEach(weekPlan => {
        const daySchedule = document.createElement('div');
        daySchedule.className = 'day-schedule';
        daySchedule.innerHTML = `
            <div class="day-header">
                <div class="day-name">Week ${weekPlan.week}</div>
                <div class="day-total">${weekPlan.totalHours} hours</div>
            </div>
            <div class="day-tasks">
                ${weekPlan.modules.map(module => `
                    <div class="task-item">
                        <div class="task-time">${module.hoursRequired}h</div>
                        <div class="task-details">
                            <div class="task-title">${module.title}</div>
                            <div class="task-description">
                                ${module.subtopics.slice(0, 2).join(', ')}
                                ${module.subtopics.length > 2 ? ` +${module.subtopics.length - 2} more` : ''}
                            </div>
                        </div>
                        <div class="task-checkbox" onclick="markTaskComplete(this)"></div>
                    </div>
                `).join('')}
            </div>
        `;
        weeklySchedule.appendChild(daySchedule);
    });
}

function markTaskComplete(checkbox) {
    checkbox.classList.toggle('completed');
    checkbox.innerHTML = checkbox.classList.contains('completed') ? 
        '<i class="fas fa-check"></i>' : '';
    
    // Update progress
    updateOverallProgress();
}

// Populate Resources
function populateResources(roadmap) {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    // Get all resources from all modules
    const allResources = [];
    roadmap.modules.forEach(module => {
        module.resources.forEach(resource => {
            if (!allResources.some(r => r.id === resource.id)) {
                allResources.push(resource);
            }
        });
    });
    
    // Display resources
    allResources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <div class="resource-header">
                <div class="resource-type">
                    <i class="fas ${resource.typeIcon}"></i> ${resource.type}
                </div>
                <div class="resource-rating">
                    ${'★'.repeat(resource.rating)}${'☆'.repeat(5 - resource.rating)}
                </div>
            </div>
            <div class="resource-title">${resource.title}</div>
            <div class="resource-description">${resource.description}</div>
            <div class="resource-meta">
                <span>${resource.duration}</span>
                <a href="${resource.url}" target="_blank" class="resource-link">Open Resource</a>
            </div>
        `;
        resourcesList.appendChild(resourceCard);
    });
}

// Switch between roadmap views
function switchView(view) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show selected view
    document.querySelectorAll('.roadmap-view').forEach(viewEl => {
        viewEl.classList.add('hidden');
    });
    document.getElementById(`${view}View`).classList.remove('hidden');
}

// Update overall progress
function updateOverallProgress() {
    const totalTasks = document.querySelectorAll('.task-checkbox').length;
    const completedTasks = document.querySelectorAll('.task-checkbox.completed').length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    document.getElementById('overallProgress').textContent = progress;
    
    // Update progress circle
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}