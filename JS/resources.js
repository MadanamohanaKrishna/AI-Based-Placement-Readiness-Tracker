// Roadmap Generation
function generateRoadmap() {
    // Show loading overlay
    const loader = document.getElementById('loadingOverlay');
    if(loader) loader.classList.remove('hidden');
    
    console.log("Generating roadmap...");
    console.log("Current State:", appState);

    // Simulate AI processing
    setTimeout(() => {
        try {
            createRoadmap();
            
            // Hide loader
            if(loader) loader.classList.add('hidden');
            
            // Switch to step 5
            document.querySelectorAll('.step-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('step-5').classList.add('active');
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error("Error generating roadmap:", error);
            alert("An error occurred while generating your roadmap. Please try again.\n\nError: " + error.message);
            if(loader) loader.classList.add('hidden');
        }
    }, 2500);
}

function createRoadmap() {
    const { strengths, areasToImprove, weaknesses } = appState.userProfile;
    
    // Populate skill gap analysis
    populateSkillGapAnalysis(strengths, areasToImprove, weaknesses);
    
    // Generate timeline
    const skillsToLearn = [...weaknesses, ...areasToImprove];
    const roadmap = generateLearningPath(skillsToLearn, appState.timeline);
    appState.roadmap = roadmap;
    
    // Populate timeline view
    populateTimelineView(roadmap);
    
    // Populate YouTube resources
    populateYouTubeResources(skillsToLearn);
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
    const skillsPerWeek = Math.ceil(modules.length / totalWeeks) || 1;
    
    for (let week = 0; week < totalWeeks && modules.length > 0; week++) {
        const weekSkills = modules.splice(0, skillsPerWeek);
        if (weekSkills.length > 0) {
            weeklyPlan.push({
                week: week + 1,
                skills: weekSkills
            });
        }
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
                <div class="timeline-skills">
                    ${allSubtopics.slice(0, 4).map(st => `<span class="timeline-skill-tag">${st}</span>`).join('')}
                </div>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
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
