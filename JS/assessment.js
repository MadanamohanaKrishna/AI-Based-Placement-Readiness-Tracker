// Quiz Implementation - Role Specific
let currentQuestion = 0;
let quizAnswers = [];
let quizQuestions = [];

// Generate role-specific questions
function generateRoleSpecificQuestions(roleId) {
    const questionTemplates = {
        // Frontend Development
        'frontend-dev': [
            { question: 'How comfortable are you with HTML and CSS?', skill: 'HTML/CSS' },
            { question: 'What is your proficiency level in JavaScript?', skill: 'JavaScript' },
            { question: 'Have you worked with React?', skill: 'React' },
            { question: 'How familiar are you with responsive design?', skill: 'Responsive Design' },
            { question: 'Experience with version control (Git)?', skill: 'Git' },
            { question: 'Knowledge of web accessibility standards?', skill: 'Accessibility' },
            { question: 'Familiarity with CSS preprocessors (SASS/LESS)?', skill: 'CSS Preprocessors' },
            { question: 'Understanding of browser DevTools?', skill: 'Browser DevTools' },
            { question: 'Experience with REST APIs?', skill: 'REST APIs' },
            { question: 'Knowledge of webpack/build tools?', skill: 'Build Tools' }
        ],
        
        // Backend Development
        'backend-dev': [
            { question: 'How comfortable are you with server-side programming?', skill: 'Server Programming' },
            { question: 'What is your proficiency in Node.js or Python?', skill: 'Node.js/Python' },
            { question: 'Experience with SQL databases?', skill: 'SQL' },
            { question: 'How familiar are you with NoSQL databases?', skill: 'MongoDB' },
            { question: 'Understanding of REST API design?', skill: 'REST APIs' },
            { question: 'Knowledge of authentication & authorization?', skill: 'Security' },
            { question: 'Experience with server deployment?', skill: 'Deployment' },
            { question: 'Familiarity with microservices architecture?', skill: 'Microservices' },
            { question: 'Understanding of caching strategies?', skill: 'Caching' },
            { question: 'Experience with message queues?', skill: 'Message Queues' }
        ],
     
        // Full Stack
        'fullstack-dev': [
            { question: 'How comfortable are you with frontend development?', skill: 'Frontend Development' },
            { question: 'What is your proficiency in backend development?', skill: 'Backend Development' },
            { question: 'Experience with JavaScript frameworks (React/Vue/Angular)?', skill: 'JavaScript Frameworks' },
            { question: 'How familiar are you with Node.js?', skill: 'Node.js' },
            { question: 'Understanding of databases (SQL & NoSQL)?', skill: 'Databases' },
            { question: 'Knowledge of REST APIs?', skill: 'REST APIs' },
            { question: 'Experience with Git version control?', skill: 'Git' },
            { question: 'Familiarity with deployment & hosting?', skill: 'Deployment' },
            { question: 'Understanding of state management?', skill: 'State Management' },
            { question: 'Experience with testing frameworks?', skill: 'Testing' }
        ],
        
        // Data Science
        'data-scientist': [
            { question: 'How comfortable are you with Python?', skill: 'Python' },
            { question: 'What is your proficiency in statistics?', skill: 'Statistics' },
            { question: 'Experience with machine learning algorithms?', skill: 'Machine Learning' },
            { question: 'How familiar are you with pandas & NumPy?', skill: 'Pandas/NumPy' },
            { question: 'Understanding of data visualization (Matplotlib/Seaborn)?', skill: 'Data Visualization' },
            { question: 'Knowledge of SQL for data querying?', skill: 'SQL' },
            { question: 'Experience with Jupyter Notebooks?', skill: 'Jupyter' },
            { question: 'Familiarity with scikit-learn?', skill: 'Scikit-learn' },
            { question: 'Understanding of feature engineering?', skill: 'Feature Engineering' },
            { question: 'Experience with model evaluation metrics?', skill: 'Model Evaluation' }
        ],
        
        // Data Analyst
        'data-analyst': [
            { question: 'How comfortable are you with SQL?', skill: 'SQL' },
            { question: 'What is your proficiency in Excel?', skill: 'Excel' },
            { question: 'Experience with data visualization tools (Tableau/Power BI)?', skill: 'Tableau/Power BI' },
            { question: 'How familiar are you with Python/R for data analysis?', skill: 'Python/R' },
            { question: 'Understanding of statistical analysis?', skill: 'Statistics' },
            { question: 'Knowledge of data cleaning techniques?', skill: 'Data Cleaning' },
            { question: 'Experience with dashboard creation?', skill: 'Dashboards' },
            { question: 'Familiarity with business intelligence concepts?', skill: 'Business Intelligence' },
            { question: 'Understanding of A/B testing?', skill: 'A/B Testing' },
            { question: 'Experience with reporting tools?', skill: 'Reporting' }
        ],
        
        // ML Engineer
        'ml-engineer': [
            { question: 'How comfortable are you with Python?', skill: 'Python' },
            { question: 'What is your proficiency in machine learning?', skill: 'Machine Learning' },
            { question: 'Experience with TensorFlow or PyTorch?', skill: 'TensorFlow/PyTorch' },
            { question: 'How familiar are you with model deployment?', skill: 'MLOps' },
            { question: 'Understanding of neural networks?', skill: 'Deep Learning' },
            { question: 'Knowledge of scikit-learn?', skill: 'Scikit-learn' },
            { question: 'Experience with data preprocessing?', skill: 'Data Preprocessing' },
            { question: 'Familiarity with cloud platforms (AWS/GCP/Azure)?', skill: 'Cloud Platforms' },
            { question: 'Understanding of model optimization?', skill: 'Model Optimization' },
            { question: 'Experience with Docker/Kubernetes?', skill: 'Docker/Kubernetes' }
        ],
        
        // UI/UX Designer
        'ui-ux-designer': [
            { question: 'How comfortable are you with Figma?', skill: 'Figma' },
            { question: 'What is your proficiency in user research?', skill: 'User Research' },
            { question: 'Experience with wireframing & prototyping?', skill: 'Prototyping' },
            { question: 'How familiar are you with design systems?', skill: 'Design Systems' },
            { question: 'Understanding of color theory & typography?', skill: 'Visual Design' },
            { question: 'Knowledge of usability testing?', skill: 'Usability Testing' },
            { question: 'Experience with Adobe Creative Suite?', skill: 'Adobe Suite' },
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
            { question: 'Experience with A/B testing?', skill: 'A/B Testing' },
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
            { question: 'Experience with configuration management?', skill: 'Configuration Management' }
        ],
        
        // QA Engineer
        'qa-engineer': [
            { question: 'How comfortable are you with manual testing?', skill: 'Manual Testing' },
            { question: 'What is your proficiency in automation testing?', skill: 'Test Automation' },
            { question: 'Experience with Selenium?', skill: 'Selenium' },
            { question: 'How familiar are you with API testing?', skill: 'API Testing' },
            { question: 'Understanding of test case design?', skill: 'Test Design' },
            { question: 'Knowledge of bug tracking tools (JIRA)?', skill: 'Bug Tracking' },
            { question: 'Experience with performance testing?', skill: 'Performance Testing' },
            { question: 'Familiarity with test frameworks?', skill: 'Test Frameworks' },
            { question: 'Understanding of CI/CD in testing?', skill: 'CI/CD' },
            { question: 'Experience with mobile testing?', skill: 'Mobile Testing' }
        ],
        
        // Mobile Developer
        'mobile-dev': [
            { question: 'How comfortable are you with React Native or Flutter?', skill: 'Mobile Frameworks' },
            { question: 'What is your proficiency in iOS/Android development?', skill: 'Native Development' },
            { question: 'Experience with mobile UI/UX design?', skill: 'Mobile UI/UX' },
            { question: 'How familiar are you with REST APIs?', skill: 'REST APIs' },
            { question: 'Understanding of mobile app lifecycle?', skill: 'App Lifecycle' },
            { question: 'Knowledge of state management in mobile apps?', skill: 'State Management' },
            { question: 'Experience with app store deployment?', skill: 'App Deployment' },
            { question: 'Familiarity with push notifications?', skill: 'Push Notifications' },
            { question: 'Understanding of mobile security?', skill: 'Mobile Security' },
            { question: 'Experience with offline storage?', skill: 'Data Storage' }
        ],
        
        // Cloud Architect
        'cloud-architect': [
            { question: 'How comfortable are you with AWS?', skill: 'AWS' },
            { question: 'What is your proficiency in Azure or GCP?', skill: 'Azure/GCP' },
            { question: 'Experience with cloud architecture design?', skill: 'Cloud Architecture' },
            { question: 'How familiar are you with cloud security?', skill: 'Cloud Security' },
            { question: 'Understanding of serverless computing?', skill: 'Serverless' },
            { question: 'Knowledge of load balancing & auto-scaling?', skill: 'Scalability' },
            { question: 'Experience with cloud migration?', skill: 'Cloud Migration' },
            { question: 'Familiarity with cost optimization?', skill: 'Cost Management' },
            { question: 'Understanding of cloud networking?', skill: 'Cloud Networking' },
            { question: 'Experience with disaster recovery?', skill: 'Disaster Recovery' }
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
    document.getElementById('nextQuestionBtn').innerHTML = 
        currentQuestion === quizQuestions.length - 1 
            ? 'Finish <i class="fas fa-check"></i>' 
            : 'Next <i class="fas fa-arrow-right"></i>';
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
    const skills = quizQuestions.map((q, index) => {
        const selectedOption = quizAnswers[index];
        const level = q.options[selectedOption];

        return {
            name: q.skill,
            level: level,
            selectedIndex: selectedOption
        };
    });

    // 🔥 CALL BACKEND
    fetch("http://localhost:3000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            role: appState.selectedRole,
            skills: skills
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("AI RESULT:", data);

        // ✅ Store result
        appState.userProfile.strengths = data.strengths || [];
        appState.userProfile.areasToImprove = data.areasToImprove || [];
        appState.userProfile.weaknesses = data.weaknesses || [];
        appState.userProfile.recommendations = data.recommendations || [];

        nextStep(4);
    })
    .catch(err => {
        console.error("API ERROR:", err);

        // fallback
        analyzeSkillGap(skills);
        nextStep(4);
    });
}

// CORRECTED Skill Gap Analysis
function analyzeSkillGap(skills) {
    // Reset arrays
    appState.userProfile.strengths = [];
    appState.userProfile.areasToImprove = [];
    appState.userProfile.weaknesses = [];
    
    skills.forEach(skill => {
        // selectedIndex: 0=Expert, 1=Intermediate, 2=Beginner, 3=No experience
        switch(skill.selectedIndex) {
            case 0: // Expert → Strengths
                appState.userProfile.strengths.push(skill.name);
                break;
            case 1: // Intermediate → Areas to Improve
                appState.userProfile.areasToImprove.push(skill.name);
                break;
            case 2: // Beginner → Weaknesses
            case 3: // No experience → Weaknesses
                appState.userProfile.weaknesses.push(skill.name);
                break;
        }
    });
    
    console.log('Skill Gap Analysis:');
    console.log('Strengths (Expert):', appState.userProfile.strengths);
    console.log('Areas to Improve (Intermediate):', appState.userProfile.areasToImprove);
    console.log('Weaknesses (Beginner/No Experience):', appState.userProfile.weaknesses);
}
