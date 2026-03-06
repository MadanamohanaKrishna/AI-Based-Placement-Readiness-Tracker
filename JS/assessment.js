// Assessment Methods
function selectAssessmentMethod(method) {
    appState.assessmentMethod = method;
    
    // Hide all sections
    document.querySelectorAll('.assessment-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Remove active class from all cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    event.target.closest('.option-card').classList.add('active');
    
    // Show relevant section
    if (method === 'resume') {
        document.getElementById('resumeSection').classList.remove('hidden');
    } else if (method === 'test') {
        document.getElementById('testSection').classList.remove('hidden');
        initializeQuiz();
    } else if (method === 'manual') {
        document.getElementById('manualSection').classList.remove('hidden');
        initializeManualSkills();
    }
}

// Resume Upload
function handleResumeUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Show loading
    document.getElementById('loadingOverlay').classList.remove('hidden');
    
    // Simulate resume analysis
    setTimeout(() => {
        analyzeResume(file);
        document.getElementById('loadingOverlay').classList.add('hidden');
        document.getElementById('uploadArea').classList.add('hidden');
        document.getElementById('resumeAnalysis').classList.remove('hidden');
        document.getElementById('assessmentNextBtn').disabled = false;
    }, 2000);
}

function analyzeResume(file) {
    const roleData = jobRoles.find(r => r.id === appState.selectedRole);
    if (!roleData) return;
    
    // Simulate extracting skills based on selected role
    const extractedSkills = roleData.skills.slice(0, 5).map(skill => ({
        name: skill,
        level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
    }));
    
    appState.assessmentData = { skills: extractedSkills };
    
    const skillsHtml = extractedSkills.map(skill => `
        <div class="skill-tag strength">
            ${skill.name} - ${skill.level}
        </div>
    `).join('');
    
    document.getElementById('extractedSkills').innerHTML = `
        <h4 style="margin: 1rem 0;">Detected Skills:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${skillsHtml}
        </div>
    `;
    
    analyzeSkillGap(extractedSkills);
}

// Quiz Implementation - NOW ROLE-SPECIFIC!
let currentQuestion = 0;
let quizAnswers = [];
let quizQuestions = [];

// Generate role-specific questions
function generateRoleSpecificQuestions(roleId) {
    const roleData = jobRoles.find(r => r.id === roleId);
    if (!roleData) return getDefaultQuestions();
    
    const questionTemplates = {
        // Frontend Development
        'frontend-dev': [
            { question: 'How comfortable are you with HTML and CSS?', skill: 'HTML/CSS' },
            { question: 'What is your proficiency level in JavaScript?', skill: 'JavaScript' },
            { question: 'Have you worked with React?', skill: 'React' },
            { question: 'How familiar are you with responsive design?', skill: 'CSS' },
            { question: 'Experience with version control (Git)?', skill: 'Git' },
            { question: 'Knowledge of web accessibility standards?', skill: 'Accessibility' },
            { question: 'Familiarity with CSS preprocessors (SASS/LESS)?', skill: 'CSS' },
            { question: 'Understanding of browser DevTools?', skill: 'Debugging' },
            { question: 'Experience with REST APIs?', skill: 'APIs' },
            { question: 'Knowledge of webpack/build tools?', skill: 'Build Tools' }
        ],
        
        // Backend Development
        'backend-dev': [
            { question: 'How comfortable are you with server-side programming?', skill: 'Backend Development' },
            { question: 'What is your proficiency in Node.js or Python?', skill: 'Node.js/Python' },
            { question: 'Experience with SQL databases?', skill: 'SQL' },
            { question: 'How familiar are you with NoSQL databases?', skill: 'MongoDB' },
            { question: 'Understanding of REST API design?', skill: 'REST APIs' },
            { question: 'Knowledge of authentication & authorization?', skill: 'Security' },
            { question: 'Experience with server deployment?', skill: 'DevOps' },
            { question: 'Familiarity with microservices architecture?', skill: 'Architecture' },
            { question: 'Understanding of caching strategies?', skill: 'Performance' },
            { question: 'Experience with message queues?', skill: 'Messaging' }
        ],
        
        // Full Stack
        'fullstack-dev': [
            { question: 'How comfortable are you with frontend development?', skill: 'Frontend' },
            { question: 'What is your proficiency in backend development?', skill: 'Backend' },
            { question: 'Experience with JavaScript frameworks (React/Vue/Angular)?', skill: 'JavaScript Frameworks' },
            { question: 'How familiar are you with Node.js?', skill: 'Node.js' },
            { question: 'Understanding of databases (SQL & NoSQL)?', skill: 'Databases' },
            { question: 'Knowledge of REST APIs?', skill: 'APIs' },
            { question: 'Experience with Git version control?', skill: 'Git' },
            { question: 'Familiarity with deployment & hosting?', skill: 'DevOps' },
            { question: 'Understanding of state management?', skill: 'State Management' },
            { question: 'Experience with testing frameworks?', skill: 'Testing' }
        ],
        
        // Data Science
        'data-scientist': [
            { question: 'How comfortable are you with Python?', skill: 'Python' },
            { question: 'What is your proficiency in statistics?', skill: 'Statistics' },
            { question: 'Experience with machine learning algorithms?', skill: 'Machine Learning' },
            { question: 'How familiar are you with pandas & NumPy?', skill: 'Data Analysis' },
            { question: 'Understanding of data visualization (Matplotlib/Seaborn)?', skill: 'Visualization' },
            { question: 'Knowledge of SQL for data querying?', skill: 'SQL' },
            { question: 'Experience with Jupyter Notebooks?', skill: 'Tools' },
            { question: 'Familiarity with scikit-learn?', skill: 'ML Libraries' },
            { question: 'Understanding of feature engineering?', skill: 'Feature Engineering' },
            { question: 'Experience with model evaluation metrics?', skill: 'Model Evaluation' }
        ],
        
        // Data Analyst
        'data-analyst': [
            { question: 'How comfortable are you with SQL?', skill: 'SQL' },
            { question: 'What is your proficiency in Excel?', skill: 'Excel' },
            { question: 'Experience with data visualization tools (Tableau/Power BI)?', skill: 'Visualization' },
            { question: 'How familiar are you with Python/R for data analysis?', skill: 'Python/R' },
            { question: 'Understanding of statistical analysis?', skill: 'Statistics' },
            { question: 'Knowledge of data cleaning techniques?', skill: 'Data Cleaning' },
            { question: 'Experience with dashboard creation?', skill: 'Dashboards' },
            { question: 'Familiarity with business intelligence concepts?', skill: 'BI' },
            { question: 'Understanding of A/B testing?', skill: 'Experimentation' },
            { question: 'Experience with reporting tools?', skill: 'Reporting' }
        ],
        
        // ML Engineer
        'ml-engineer': [
            { question: 'How comfortable are you with Python?', skill: 'Python' },
            { question: 'What is your proficiency in machine learning?', skill: 'Machine Learning' },
            { question: 'Experience with TensorFlow or PyTorch?', skill: 'Deep Learning Frameworks' },
            { question: 'How familiar are you with model deployment?', skill: 'MLOps' },
            { question: 'Understanding of neural networks?', skill: 'Deep Learning' },
            { question: 'Knowledge of scikit-learn?', skill: 'ML Libraries' },
            { question: 'Experience with data preprocessing?', skill: 'Data Processing' },
            { question: 'Familiarity with cloud platforms (AWS/GCP/Azure)?', skill: 'Cloud' },
            { question: 'Understanding of model optimization?', skill: 'Optimization' },
            { question: 'Experience with Docker/Kubernetes?', skill: 'Containerization' }
        ],
        
        // UI/UX Designer
        'ui-ux-designer': [
            { question: 'How comfortable are you with Figma?', skill: 'Figma' },
            { question: 'What is your proficiency in user research?', skill: 'User Research' },
            { question: 'Experience with wireframing & prototyping?', skill: 'Prototyping' },
            { question: 'How familiar are you with design systems?', skill: 'Design Systems' },
            { question: 'Understanding of color theory & typography?', skill: 'Visual Design' },
            { question: 'Knowledge of usability testing?', skill: 'Testing' },
            { question: 'Experience with Adobe Creative Suite?', skill: 'Design Tools' },
            { question: 'Familiarity with interaction design?', skill: 'Interaction Design' },
            { question: 'Understanding of accessibility guidelines?', skill: 'Accessibility' },
            { question: 'Experience with user personas & journeys?', skill: 'UX Strategy' }
        ],
        
        // Product Designer
        'product-designer': [
            { question: 'How comfortable are you with design thinking?', skill: 'Design Thinking' },
            { question: 'What is your proficiency in user research?', skill: 'User Research' },
            { question: 'Experience with Figma or Sketch?', skill: 'Design Tools' },
            { question: 'How familiar are you with prototyping?', skill: 'Prototyping' },
            { question: 'Understanding of product strategy?', skill: 'Product Strategy' },
            { question: 'Knowledge of agile methodologies?', skill: 'Agile' },
            { question: 'Experience with A/B testing?', skill: 'Testing' },
            { question: 'Familiarity with design systems?', skill: 'Design Systems' },
            { question: 'Understanding of metrics & analytics?', skill: 'Analytics' },
            { question: 'Experience with stakeholder management?', skill: 'Communication' }
        ],
        
        // DevOps Engineer
        'devops-engineer': [
            { question: 'How comfortable are you with Docker?', skill: 'Docker' },
            { question: 'What is your proficiency in Kubernetes?', skill: 'Kubernetes' },
            { question: 'Experience with CI/CD pipelines?', skill: 'CI/CD' },
            { question: 'How familiar are you with AWS/Azure/GCP?', skill: 'Cloud Platforms' },
            { question: 'Understanding of infrastructure as code?', skill: 'Terraform' },
            { question: 'Knowledge of Linux system administration?', skill: 'Linux' },
            { question: 'Experience with monitoring tools?', skill: 'Monitoring' },
            { question: 'Familiarity with scripting (Bash/Python)?', skill: 'Scripting' },
            { question: 'Understanding of networking concepts?', skill: 'Networking' },
            { question: 'Experience with configuration management?', skill: 'Configuration' }
        ],
        
        // QA Engineer
        'qa-engineer': [
            { question: 'How comfortable are you with manual testing?', skill: 'Manual Testing' },
            { question: 'What is your proficiency in automation testing?', skill: 'Automation' },
            { question: 'Experience with Selenium?', skill: 'Selenium' },
            { question: 'How familiar are you with API testing?', skill: 'API Testing' },
            { question: 'Understanding of test case design?', skill: 'Test Design' },
            { question: 'Knowledge of bug tracking tools (JIRA)?', skill: 'Bug Tracking' },
            { question: 'Experience with performance testing?', skill: 'Performance' },
            { question: 'Familiarity with test frameworks?', skill: 'Frameworks' },
            { question: 'Understanding of CI/CD in testing?', skill: 'CI/CD' },
            { question: 'Experience with mobile testing?', skill: 'Mobile Testing' }
        ],
        
        // Mobile Developer
        'mobile-dev': [
            { question: 'How comfortable are you with React Native or Flutter?', skill: 'Mobile Frameworks' },
            { question: 'What is your proficiency in iOS/Android development?', skill: 'Native Development' },
            { question: 'Experience with mobile UI/UX design?', skill: 'Mobile UI/UX' },
            { question: 'How familiar are you with REST APIs?', skill: 'APIs' },
            { question: 'Understanding of mobile app lifecycle?', skill: 'App Lifecycle' },
            { question: 'Knowledge of state management in mobile apps?', skill: 'State Management' },
            { question: 'Experience with app store deployment?', skill: 'Deployment' },
            { question: 'Familiarity with push notifications?', skill: 'Notifications' },
            { question: 'Understanding of mobile security?', skill: 'Security' },
            { question: 'Experience with offline storage?', skill: 'Data Storage' }
        ],
        
        // Cloud Architect
        'cloud-architect': [
            { question: 'How comfortable are you with AWS?', skill: 'AWS' },
            { question: 'What is your proficiency in Azure or GCP?', skill: 'Cloud Platforms' },
            { question: 'Experience with cloud architecture design?', skill: 'Architecture' },
            { question: 'How familiar are you with cloud security?', skill: 'Security' },
            { question: 'Understanding of serverless computing?', skill: 'Serverless' },
            { question: 'Knowledge of load balancing & auto-scaling?', skill: 'Scalability' },
            { question: 'Experience with cloud migration?', skill: 'Migration' },
            { question: 'Familiarity with cost optimization?', skill: 'Cost Management' },
            { question: 'Understanding of cloud networking?', skill: 'Networking' },
            { question: 'Experience with disaster recovery?', skill: 'DR' }
        ]
    };
    
    return questionTemplates[roleId] || getDefaultQuestions();
}

function getDefaultQuestions() {
    return [
        { question: 'How would you rate your problem-solving skills?', skill: 'Problem Solving' },
        { question: 'What is your proficiency in programming?', skill: 'Programming' },
        { question: 'Experience with data structures and algorithms?', skill: 'DSA' },
        { question: 'How familiar are you with version control?', skill: 'Git' },
        { question: 'Understanding of software development lifecycle?', skill: 'SDLC' },
        { question: 'Knowledge of debugging techniques?', skill: 'Debugging' },
        { question: 'Experience with documentation?', skill: 'Documentation' },
        { question: 'Familiarity with agile methodologies?', skill: 'Agile' },
        { question: 'Understanding of code review practices?', skill: 'Code Review' },
        { question: 'Experience with team collaboration?', skill: 'Teamwork' }
    ];
}

function initializeQuiz() {
    currentQuestion = 0;
    quizAnswers = [];
    
    // Generate role-specific questions
    const roleQuestions = generateRoleSpecificQuestions(appState.selectedRole);
    
    quizQuestions = roleQuestions.map(q => ({
        question: q.question,
        options: ['Expert', 'Intermediate', 'Beginner', 'No experience'],
        skill: q.skill
    }));
    
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsHtml = question.options.map((option, index) => `
        <div class="answer-option" onclick="selectAnswer(${index})">
            ${option}
        </div>
    `).join('');
    
    document.getElementById('answerOptions').innerHTML = optionsHtml;
    
    // Restore previous answer if exists
    if (quizAnswers[currentQuestion] !== undefined) {
        document.querySelectorAll('.answer-option')[quizAnswers[currentQuestion]].classList.add('selected');
    }
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
    
    // Update button states
    document.getElementById('prevQuestionBtn').disabled = currentQuestion === 0;
    document.getElementById('nextQuestionBtn').textContent = 
        currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next';
}

function selectAnswer(optionIndex) {
    quizAnswers[currentQuestion] = optionIndex;
    document.querySelectorAll('.answer-option').forEach((option, index) => {
        option.classList.remove('selected');
        if (index === optionIndex) {
            option.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (quizAnswers[currentQuestion] === undefined) {
        alert('Please select an answer');
        return;
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function finishQuiz() {
    // Process quiz results
    const skills = quizQuestions.map((q, index) => ({
        name: q.skill,
        level: q.options[quizAnswers[index]],
        score: 3 - quizAnswers[index] // 3=Expert, 0=No experience
    }));
    
    appState.assessmentData = { skills };
    analyzeSkillGap(skills);
    
    document.getElementById('testSection').classList.add('hidden');
    document.getElementById('assessmentNextBtn').disabled = false;
    
    alert('Assessment completed! Click Next to continue.');
}

// Manual Skills Selection
function initializeManualSkills() {
    const roleData = jobRoles.find(r => r.id === appState.selectedRole);
    if (!roleData) return;
    
    const skillCategories = {
        'Core Skills': roleData.skills,
        'Soft Skills': ['Communication', 'Problem Solving', 'Teamwork', 'Time Management'],
        'Tools': ['Git', 'VS Code', 'JIRA', 'Slack']
    };
    
    const categoriesHtml = Object.entries(skillCategories).map(([category, skills]) => `
        <div class="skill-category">
            <h4><i class="fas fa-check-circle"></i> ${category}</h4>
            <div class="skill-items">
                ${skills.map(skill => `
                    <div class="skill-item">
                        <span class="skill-name">${skill}</span>
                        <div class="skill-level">
                            <button class="level-btn" data-skill="${skill}" data-level="0" onclick="setSkillLevel('${skill}', 0)">None</button>
                            <button class="level-btn" data-skill="${skill}" data-level="1" onclick="setSkillLevel('${skill}', 1)">Basic</button>
                            <button class="level-btn" data-skill="${skill}" data-level="2" onclick="setSkillLevel('${skill}', 2)">Inter</button>
                            <button class="level-btn" data-skill="${skill}" data-level="3" onclick="setSkillLevel('${skill}', 3)">Expert</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    document.getElementById('skillCategories').innerHTML = categoriesHtml;
}

function setSkillLevel(skill, level) {
    // Update button states
    document.querySelectorAll(`[data-skill="${skill}"]`).forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Store skill level
    if (!appState.assessmentData) {
        appState.assessmentData = { skills: [] };
    }
    
    const skillIndex = appState.assessmentData.skills.findIndex(s => s.name === skill);
    const levelNames = ['None', 'Basic', 'Intermediate', 'Expert'];
    
    if (skillIndex > -1) {
        appState.assessmentData.skills[skillIndex] = { name: skill, level: levelNames[level], score: level };
    } else {
        appState.assessmentData.skills.push({ name: skill, level: levelNames[level], score: level });
    }
    
    // Check if all skills are rated
    const totalSkills = document.querySelectorAll('.skill-item').length;
    const ratedSkills = appState.assessmentData.skills.length;
    
    if (ratedSkills >= totalSkills * 0.7) { // At least 70% skills rated
        document.getElementById('assessmentNextBtn').disabled = false;
    }
}

// Skill Gap Analysis
function analyzeSkillGap(skills) {
    const roleData = jobRoles.find(r => r.id === appState.selectedRole);
    if (!roleData) return;
    
    const requiredSkills = roleData.skills;
    const userSkillNames = skills.map(s => s.name);
    
    appState.userProfile.strengths = skills.filter(s => s.score >= 2).map(s => s.name);
    appState.userProfile.weaknesses = skills.filter(s => s.score === 1).map(s => s.name);
    appState.userProfile.missingSkills = requiredSkills.filter(rs => !userSkillNames.includes(rs));
}