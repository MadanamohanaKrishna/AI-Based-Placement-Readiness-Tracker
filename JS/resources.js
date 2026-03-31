// Roadmap Generation
console.log("resources.js loaded");
window.generateRoadmap = function generateRoadmap() {
    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.classList.remove('hidden');

    createRoadmap();

    if (loader) loader.classList.add('hidden');

    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById('step-5').classList.add('active');
    window.scrollTo(0, 0);

    
};
function startLearning() {
    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById('dashboard').classList.remove('hidden');

    // 🔥 THIS is the key
    initializeDashboard();

    window.scrollTo(0, 0);
}
function createRoadmap() {
    const { strengths, areasToImprove, weaknesses } = appState.userProfile;
    
    // Populate skill gap analysis
    populateSkillGapAnalysis(strengths, areasToImprove, weaknesses);

    populateRecommendations();
    
    // Generate timeline
    const skillsToLearn = [...new Set([...weaknesses, ...areasToImprove])];
    const roadmap = generateLearningPath(skillsToLearn, appState.timeline);
    appState.roadmap = roadmap;
    
    // Populate timeline view
    populateTimelineView(roadmap);
    
    // Populate YouTube resources
    populateYouTubeResources(skillsToLearn);

    populateSkillsProgress();
}

// Populate Skill Gap Analysis
function populateSkillGapAnalysis(strengths, areasToImprove, weaknesses) {
    // Strengths (Expert)
    const strengthsHtml = strengths.length > 0 
        ? strengths.map(skill => `<span class="skill-tag strength">${skill}</span>`).join('')
        : '<p class="empty-state">No strengths detected yet</p>';
    document.getElementById('strengthsList').innerHTML = strengthsHtml;
    
    // Areas to Improve (Intermediate)
    const areasHtml = areasToImprove.length > 0 
        ? areasToImprove.map(skill => `<span class="skill-tag weakness">${skill}</span>`).join('')
        : '<p class="empty-state">No areas to improve</p>';
    document.getElementById('weaknessList').innerHTML = areasHtml;
    
    // Weaknesses (Beginner/No Experience)
    const weaknessesHtml = weaknesses.length > 0 
        ? weaknesses.map(skill => `<span class="skill-tag missing">${skill}</span>`).join('')
        : '<p class="empty-state">No weaknesses detected</p>';
    document.getElementById('missingSkillsList').innerHTML = weaknessesHtml;
}

function populateRecommendations() {
    const container = document.getElementById('recommendationsList');
    
    if (!container) return; // safety

    const recs = appState.userProfile.recommendations || [];

    if (recs.length === 0) {
        container.innerHTML = '<p class="empty-state">No recommendations</p>';
        return;
    }

    container.innerHTML = recs.map(r => `
        <div class="recommendation-item">
            <i class="fas fa-lightbulb"></i>
            <span>${r.text}</span>
<a href="https://www.youtube.com/results?search_query=${encodeURIComponent(r.youtubeQuery)}" target="_blank">
  Watch
</a>
        </div>
    `).join('');
}

// Generate Learning Path
function generateLearningPath(skillsToLearn, timeline) {
    let totalWeeks;
    switch (timeline) {
        case '1-month': totalWeeks = 4; break;
        case '3-months': totalWeeks = 12; break;
        case '6-months': totalWeeks = 24; break;
        default: totalWeeks = 12;
    }
    
    // Skill hours estimation
    const skillHours = {
        'HTML/CSS': 15, 'JavaScript': 40, 'React': 50, 'Vue': 40, 'Angular': 50,
        'Node.js': 40, 'Python': 35, 'Java': 45, 'SQL': 25, 'MongoDB': 30,
        'REST APIs': 25, 'Git': 15, 'Docker': 25, 'Kubernetes': 30,
        'AWS': 40, 'Azure': 40, 'GCP': 40, 'Machine Learning': 60,
        'Deep Learning': 50, 'TensorFlow': 40, 'PyTorch': 40, 'Statistics': 30,
        'Figma': 25, 'Adobe XD': 25, 'User Research': 20, 'Prototyping': 20,
        'CI/CD': 20, 'Linux': 25, 'Testing': 30, 'Selenium': 25
    };
    
    // Create modules
    const modules = skillsToLearn.map(skill => ({
        title: skill,
        hours: skillHours[skill] || 20,
        subtopics: generateSubtopics(skill)
    }));
    
    // Distribute across weeks
    const weeklyPlan = [];
    const revisionTypes = [
                    {
                        title: "Revision & Practice",
                        hours: 10,
                        subtopics: ["Revise concepts", "Practice problems"]
                    },
                    {
                        title: "Mini Project",
                        hours: 20,
                        subtopics: ["Build small project", "Apply learned skills"]
                    },
                    {
                        title: "Mock Interviews",
                        hours: 10,
                        subtopics: ["DSA practice", "System design basics"]
                    }
                ];
    for (let week = 0; week < totalWeeks; week++) {
        const weekSkills = [];

        // Distribute skills across weeks evenly
        for (let i = week; i < modules.length; i += totalWeeks) {
            weekSkills.push(modules[i]);
        }

        // If no skills, add smart filler
        if (weekSkills.length === 0) {
            const type = revisionTypes[week % revisionTypes.length];

            weekSkills.push({
                title: type.title,
                hours: type.hours,
                subtopics: type.subtopics
            });
        }

        weeklyPlan.push({
            week: week + 1,
            skills: weekSkills
        });
    }
    
    return { totalWeeks, weeklyPlan };
}

function generateSubtopics(skill) {
    const subtopicsMap = {
        'HTML/CSS': ['Semantic HTML', 'Flexbox & Grid', 'Responsive Design', 'CSS Animations'],
        'JavaScript': ['ES6+ Features', 'DOM Manipulation', 'Async/Await', 'Error Handling'],
        'React': ['Components & Props', 'State & Hooks', 'Context API', 'React Router'],
        'Node.js': ['Express.js', 'REST APIs', 'Authentication', 'Database Integration'],
        'Python': ['Syntax & Basics', 'Data Structures', 'OOP', 'Libraries'],
        'SQL': ['Basic Queries', 'Joins', 'Indexes', 'Optimization'],
        'MongoDB': ['CRUD Operations', 'Aggregation', 'Mongoose', 'Indexing'],
        'Git': ['Branching', 'Merging', 'Pull Requests', 'Collaboration'],
        'Docker': ['Containers', 'Dockerfile', 'Docker Compose', 'Networking'],
        'Machine Learning': ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
        'Deep Learning': ['Neural Networks', 'CNNs', 'RNNs', 'Transfer Learning'],
        'Figma': ['Interface Basics', 'Components', 'Auto Layout', 'Prototyping'],
        'AWS': ['EC2', 'S3', 'Lambda', 'RDS'],
        'REST APIs': ['HTTP Methods', 'Status Codes', 'Authentication', 'Best Practices']
    };
    
    return subtopicsMap[skill] || [`${skill} Fundamentals`, `${skill} Best Practices`, `${skill} Projects`];
}

// Populate Timeline View
function populateTimelineView(roadmap) {
    const timelineContainer = document.getElementById('roadmapTimeline');
    timelineContainer.innerHTML = '';
    
    if (roadmap.weeklyPlan.length === 0) {
        timelineContainer.innerHTML = '<p class="empty-state"><i class="fas fa-check-circle"></i><br>No skills to learn. You\'re ready!</p>';
        return;
    }
    
    roadmap.weeklyPlan.forEach(week => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const skillNames = week.skills.map(s => s.title).join(', ');
        const totalHours = week.skills.reduce((sum, s) => sum + s.hours, 0);
        const allSubtopics = week.skills.flatMap(s => s.subtopics);
        
        timelineItem.innerHTML = `
            <div class="timeline-marker">${week.week}</div>
            <div class="timeline-content">
                <div class="timeline-date">Week ${week.week}</div>
                <div class="timeline-title">${skillNames}</div>
                <div class="timeline-description">
                    Focus on mastering these skills. Estimated time: ${totalHours} hours
                </div>

                <div class="progress-bar-small">
                    <div class="progress-fill-small"></div>
                </div>
                <div class="timeline-skills">
                    ${allSubtopics.slice(0, 4).map((st, i) => `
                        <label class="task-item">
                            <input type="checkbox" disabled>
                            ${st}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
        // Restore checkbox state if exists
        const savedState = JSON.parse(localStorage.getItem("appState"));
        if (savedState?.checkboxStates) {
            const checkboxes = timelineItem.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((cb, i) => {
                const key = `week-${week.week}-task-${i}`;
                cb.checked = savedState.checkboxStates[key] || false;
            });
        }
    });
}

// Populate YouTube Resources based on skills
function populateYouTubeResources(skills) {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    // Get resources for each skill
    const allResources = [];
    skills.forEach(skill => {
        const skillResources = getYouTubeResourcesForSkill(skill);
        allResources.push(...skillResources);
    });
    
    // Remove duplicates and limit to 9
    const uniqueResources = allResources.filter((resource, index, self) =>
        index === self.findIndex(r => r.id === resource.id)
    ).slice(0, 9);
    
    if (uniqueResources.length === 0) {
        resourcesList.innerHTML = '<p class="empty-state"><i class="fab fa-youtube"></i><br>No resources found for your skills.</p>';
        return;
    }
    
    uniqueResources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.onclick = () => window.open(resource.url, '_blank');
        resourceCard.innerHTML = `
            <div class="resource-header">
                <div class="resource-type">
                    <i class="fab fa-youtube"></i> YouTube
                </div>
                <div class="resource-rating">
                    ${'★'.repeat(resource.rating)}${'☆'.repeat(5 - resource.rating)}
                </div>
            </div>
            <div class="resource-title">${resource.title}</div>
            <div class="resource-description">${resource.description}</div>
            <div class="resource-meta">
                <span><i class="fas fa-clock"></i> ${resource.duration}</span>
                <a href="${resource.url}" target="_blank" class="resource-link" onclick="event.stopPropagation()">
                    Watch Now <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        resourcesList.appendChild(resourceCard);
    });
}



function adjustProgress(delta) {
    const current = appState.overallProgress || 0;
    updateOverallProgressManual(current + delta);
}

function updateCurrentFocus() {
    const focusEl = document.getElementById('currentFocus');
    if (!focusEl) return;

    const skills = [
        ...(appState.userProfile.weaknesses || []),
        ...(appState.userProfile.areasToImprove || [])
    ];

    focusEl.innerHTML = `
        <div><strong>${skills[0] || "Start Learning"}</strong></div>
        <div style="opacity:0.6">${skills[1] || ""}</div>
    `;
}

function updateTimeRemaining() {
    const map = {
        '1-month': 30,
        '3-months': 90,
        '6-months': 180
    };

    const days = map[appState.timeline] || 90;

    const el = document.getElementById('timeRemaining');
    if (el) {
        el.innerHTML = `<strong>${days}</strong> days remaining`;
    }
}

function populateSkillsProgress() {
    const container = document.getElementById('skillsProgressList');
    if (!container) return;

    const skills = [
        ...(appState.userProfile.weaknesses || []),
        ...(appState.userProfile.areasToImprove || [])
    ];

    container.innerHTML = skills.map(skill => `
        <div class="skill-progress-item">
            <span>${skill}</span>
            <span id="skill-${skill}">0%</span>
            <button onclick="adjustSkill('${skill}', 10)">+</button>
            <button onclick="adjustSkill('${skill}', -10)">-</button>
        </div>
    `).join('');
}

function adjustSkill(skill, delta) {
    if (!appState.skillProgress) {
        appState.skillProgress = {};
    }

    let current = appState.skillProgress[skill] || 0;
    current = Math.max(0, Math.min(100, current + delta));

    appState.skillProgress[skill] = current;

    const el = document.getElementById(`skill-${skill}`);
    if (el) el.textContent = current + "%";
}



