// Global State
window.appState = {
    currentStep: 0,
    selectedRole: null,
    selectedCompanies: [],
    assessmentData: null,
    timeline: null,
    roadmap: null,
    progress: 0,
    streak: 0,
    skillProgress: {},
    userProfile: {
        skills: {},
        strengths: [],
        weaknesses: [],
        areasToImprove: []
    }
};

// Job Roles Data
const jobRoles = [
    {
        id: 'frontend-dev',
        name: 'Frontend Developer',
        category: 'development',
        icon: 'fa-code',
        description: 'Build user interfaces and web applications',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular']
    },
    {
        id: 'backend-dev',
        name: 'Backend Developer',
        category: 'development',
        icon: 'fa-server',
        description: 'Develop server-side logic and databases',
        skills: ['Java', 'Python', 'Node.js', 'SQL', 'MongoDB', 'APIs']
    },
    {
        id: 'fullstack-dev',
        name: 'Full Stack Developer',
        category: 'development',
        icon: 'fa-layer-group',
        description: 'Handle both frontend and backend development',
        skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'MongoDB', 'DevOps']
    },
    {
        id: 'data-scientist',
        name: 'Data Scientist',
        category: 'data',
        icon: 'fa-chart-line',
        description: 'Analyze and interpret complex data',
        skills: ['Python', 'R', 'Machine Learning', 'Statistics', 'SQL', 'Tableau']
    },
    {
        id: 'data-analyst',
        name: 'Data Analyst',
        category: 'data',
        icon: 'fa-database',
        description: 'Transform data into insights',
        skills: ['SQL', 'Excel', 'Python', 'Tableau', 'Power BI', 'Statistics']
    },
    {
        id: 'ml-engineer',
        name: 'ML Engineer',
        category: 'data',
        icon: 'fa-brain',
        description: 'Build and deploy machine learning models',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'MLOps']
    },
    {
        id: 'ui-ux-designer',
        name: 'UI/UX Designer',
        category: 'design',
        icon: 'fa-palette',
        description: 'Design user experiences and interfaces',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    },
    {
        id: 'product-designer',
        name: 'Product Designer',
        category: 'design',
        icon: 'fa-pencil-ruler',
        description: 'Design end-to-end product experiences',
        skills: ['Design Thinking', 'Figma', 'User Research', 'Prototyping']
    },
    {
        id: 'devops-engineer',
        name: 'DevOps Engineer',
        category: 'other',
        icon: 'fa-cogs',
        description: 'Manage infrastructure and deployment',
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform']
    },
    {
        id: 'qa-engineer',
        name: 'QA Engineer',
        category: 'other',
        icon: 'fa-check-circle',
        description: 'Ensure software quality through testing',
        skills: ['Selenium', 'Testing', 'Automation', 'JIRA', 'API Testing']
    },
    {
        id: 'mobile-dev',
        name: 'Mobile Developer',
        category: 'development',
        icon: 'fa-mobile-alt',
        description: 'Build mobile applications',
        skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI/UX']
    },
    {
        id: 'cloud-architect',
        name: 'Cloud Architect',
        category: 'other',
        icon: 'fa-cloud',
        description: 'Design cloud infrastructure solutions',
        skills: ['AWS', 'Azure', 'GCP', 'Cloud Security', 'Architecture']
    }
];

// Companies Data
const companies = [
    // Product-based MNCs
    { id: 'google', name: 'Google', type: 'Product Based', category: 'mnc', color: '#4285F4' },
    { id: 'microsoft', name: 'Microsoft', type: 'Product Based', category: 'mnc', color: '#00A4EF' },
    { id: 'amazon', name: 'Amazon', type: 'Product Based', category: 'mnc', color: '#FF9900' },
    { id: 'apple', name: 'Apple', type: 'Product Based', category: 'mnc', color: '#000000' },
    { id: 'meta', name: 'Meta', type: 'Product Based', category: 'mnc', color: '#1877F2' },
    { id: 'netflix', name: 'Netflix', type: 'Product Based', category: 'mnc', color: '#E50914' },
    { id: 'adobe', name: 'Adobe', type: 'Product Based', category: 'mnc', color: '#FF0000' },
    { id: 'salesforce', name: 'Salesforce', type: 'Product Based', category: 'mnc', color: '#00A1E0' },
    { id: 'oracle', name: 'Oracle', type: 'Product Based', category: 'mnc', color: '#F80000' },
    { id: 'sap', name: 'SAP', type: 'Product Based', category: 'mnc', color: '#0FAAFF' },
    { id: 'ibm', name: 'IBM', type: 'Product Based', category: 'mnc', color: '#1F70C1' },
    { id: 'cisco', name: 'Cisco', type: 'Product Based', category: 'mnc', color: '#1BA0D7' },
    { id: 'intel', name: 'Intel', type: 'Product Based', category: 'mnc', color: '#0071C5' },
    { id: 'nvidia', name: 'NVIDIA', type: 'Product Based', category: 'mnc', color: '#76B900' },
    { id: 'qualcomm', name: 'Qualcomm', type: 'Product Based', category: 'mnc', color: '#3253DC' },
    
    // Indian Product Companies
    { id: 'flipkart', name: 'Flipkart', type: 'Product Based', category: 'product', color: '#2874F0' },
    { id: 'paytm', name: 'Paytm', type: 'Product Based', category: 'product', color: '#00BAF2' },
    { id: 'ola', name: 'Ola', type: 'Product Based', category: 'product', color: '#000000' },
    { id: 'swiggy', name: 'Swiggy', type: 'Product Based', category: 'product', color: '#FC8019' },
    { id: 'zomato', name: 'Zomato', type: 'Product Based', category: 'product', color: '#E23744' },
    { id: 'phonepe', name: 'PhonePe', type: 'Product Based', category: 'product', color: '#5F259F' },
    { id: 'cred', name: 'CRED', type: 'Product Based', category: 'product', color: '#000000' },
    { id: 'razorpay', name: 'Razorpay', type: 'Product Based', category: 'product', color: '#0C2451' },
    { id: 'freshworks', name: 'Freshworks', type: 'Product Based', category: 'product', color: '#00C9A7' },
    { id: 'zoho', name: 'Zoho', type: 'Product Based', category: 'product', color: '#F06D20' },
    
    // Startups
    { id: 'zerodha', name: 'Zerodha', type: 'Fintech', category: 'startup', color: '#387ED1' },
    { id: 'meesho', name: 'Meesho', type: 'E-commerce', category: 'startup', color: '#6C1E7D' },
    { id: 'byju', name: 'BYJU\'S', type: 'Edtech', category: 'startup', color: '#8E24AA' },
    { id: 'unacademy', name: 'Unacademy', type: 'Edtech', category: 'startup', color: '#08BD80' },
    { id: 'dunzo', name: 'Dunzo', type: 'Delivery', category: 'startup', color: '#F04136' },
    { id: 'urbanco', name: 'Urban Company', type: 'Services', category: 'startup', color: '#6B38FB' },
    { id: 'groww', name: 'Groww', type: 'Fintech', category: 'startup', color: '#00D09C' },
    { id: 'spinny', name: 'Spinny', type: 'Automotive', category: 'startup', color: '#FF6B6B' },
    { id: 'licious', name: 'Licious', type: 'Food Tech', category: 'startup', color: '#D61F26' },
    { id: 'sharechat', name: 'ShareChat', type: 'Social Media', category: 'startup', color: '#FE2C55' },
    
    // Service-based
    { id: 'tcs', name: 'TCS', type: 'Service Based', category: 'service', color: '#0066B3' },
    { id: 'infosys', name: 'Infosys', type: 'Service Based', category: 'service', color: '#007CC3' },
    { id: 'wipro', name: 'Wipro', type: 'Service Based', category: 'service', color: '#7B3F96' },
    { id: 'hcl', name: 'HCL', type: 'Service Based', category: 'service', color: '#0066CC' },
    { id: 'cognizant', name: 'Cognizant', type: 'Service Based', category: 'service', color: '#00BEFF' },
    { id: 'accenture', name: 'Accenture', type: 'Service Based', category: 'service', color: '#A100FF' },
    { id: 'capgemini', name: 'Capgemini', type: 'Service Based', category: 'service', color: '#0070AD' },
    { id: 'deloitte', name: 'Deloitte', type: 'Service Based', category: 'service', color: '#86BC25' },
    { id: 'pwc', name: 'PwC', type: 'Service Based', category: 'service', color: '#D93954' },
    { id: 'ey', name: 'EY', type: 'Service Based', category: 'service', color: '#FFE600' },
    { id: 'ltimindtree', name: 'LTIMindtree', type: 'Service Based', category: 'service', color: '#8B4513' },
    { id: 'techm', name: 'Tech Mahindra', type: 'Service Based', category: 'service', color: '#ED1C24' }
];

// Initialize App
function startJourney() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    initializeStep1();
}

function goHome() {
    document.getElementById('app').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.querySelector('.hero').style.display = 'flex';
    
    // Hide all step sections
    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Don't reset app state - preserve user's progress
    // resetApp();
}

function resetApp() {
    appState.currentStep = 0;
    appState.selectedRole = null;
    appState.selectedCompanies = [];
    appState.assessmentData = null;
    appState.timeline = null;
    appState.progress = 0;
    appState.streak = 0;
    appState.skillProgress = {};
}

// Step Navigation
function nextStep(step) {
    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`step-${step}`).classList.add('active');
    appState.currentStep = step;
    window.scrollTo(0, 0);
    
    // Initialize step-specific content
    if (step === 2) initializeStep2();
    if (step === 3) initializeStep3();
}

function prevStep(step) {
    nextStep(step);
}

// Step 1: Role Selection
function initializeStep1() {
    const roleGrid = document.getElementById('roleGrid');
    roleGrid.innerHTML = '';
    
    jobRoles.forEach(role => {
        const roleCard = document.createElement('div');
        roleCard.className = 'role-card';
        roleCard.dataset.category = role.category;
        roleCard.dataset.roleId = role.id;
        roleCard.innerHTML = `
            <i class="fas ${role.icon}"></i>
            <h3>${role.name}</h3>
            <p>${role.description}</p>
        `;
        roleCard.onclick = () => selectRole(role.id);
        roleGrid.appendChild(roleCard);
    });
}

function selectRole(roleId) {
    appState.selectedRole = roleId;
    document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-role-id="${roleId}"]`).classList.add('selected');
    document.getElementById('roleNextBtn').disabled = false;
}

function filterRoles() {
    const searchTerm = document.getElementById('roleSearch').value.toLowerCase();
    document.querySelectorAll('.role-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.role-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Step 2: Company Selection
function initializeStep2() {
    const companyGrid = document.getElementById('companyGrid');
    companyGrid.innerHTML = '';
    
    companies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.className = 'company-card';
        companyCard.dataset.companyId = company.id;
        companyCard.dataset.category = company.category;
        companyCard.innerHTML = `
            <div class="company-logo" style="background: ${company.color}">
                ${company.name.charAt(0)}
            </div>
            <h4>${company.name}</h4>
            <span class="company-type">${company.type}</span>
        `;
        companyCard.onclick = () => toggleCompany(company.id);
        companyGrid.appendChild(companyCard);
    });
}

function toggleCompany(companyId) {
    const card = document.querySelector(`[data-company-id="${companyId}"]`);
    const index = appState.selectedCompanies.indexOf(companyId);
    
    if (index > -1) {
        appState.selectedCompanies.splice(index, 1);
        card.classList.remove('selected');
    } else {
        appState.selectedCompanies.push(companyId);
        card.classList.add('selected');
    }
    
    document.getElementById('selectedCount').textContent = appState.selectedCompanies.length;
    document.getElementById('companyNextBtn').disabled = appState.selectedCompanies.length < 3;
}

function filterCompanies() {
    const searchTerm = document.getElementById('companySearch').value.toLowerCase();
    document.querySelectorAll('.company-card').forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCompanyByType(category) {
    document.querySelectorAll('.company-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Step 3: Initialize Quiz automatically
function initializeStep3() {
    initializeQuiz();
}

// Step 4: Timeline Selection
function selectTimeline(timeline) {
    appState.timeline = timeline;
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.timeline-card').classList.add('selected');
    
    document.getElementById('timelineNextBtn').disabled = false;
}

// Save and Continue
function saveRoadmap() {
    const roadmapData = {
        ...appState,
        savedDate: new Date().toISOString()
    };
    localStorage.setItem('placementRoadmap', JSON.stringify(roadmapData));
    showToast('Roadmap saved successfully! 💾', 'success');
}

function startLearning() {
    // Hide roadmap section
    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show dashboard
    document.getElementById('dashboard').classList.remove('hidden');
    initializeDashboard();
    
    window.scrollTo(0, 0);
}

function backToRoadmap() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('step-5').classList.add('active');
    window.scrollTo(0, 0);
}

// Dashboard Functions (UPDATED with Skill Progress Counters)
function initializeDashboard() {
    // Initialize progress at 0%
    appState.progress = parseInt(localStorage.getItem('userProgress')) || 0;
    appState.streak = parseInt(localStorage.getItem('userStreak')) || 0;
    
    // Initialize skill progress from localStorage or set to 0
    if (!appState.skillProgress || Object.keys(appState.skillProgress).length === 0) {
        appState.skillProgress = {};
        const allSkills = [
            ...appState.userProfile.weaknesses,
            ...appState.userProfile.areasToImprove
        ];
        allSkills.forEach(skill => {
            const saved = localStorage.getItem(`skill_${skill}`);
            appState.skillProgress[skill] = saved ? parseInt(saved) : 0;
        });
    }
    
    updateProgressDisplay();
    updateStreakDisplay();
    
    // Set current focus
    const skillsToLearn = [...appState.userProfile.weaknesses, ...appState.userProfile.areasToImprove];
    document.getElementById('currentFocus').innerHTML = skillsToLearn.length > 0 ? `
        <div class="focus-item">
            <h4><i class="fas fa-bullseye"></i> ${skillsToLearn[0]}</h4>
            <p>Focus on mastering this skill first</p>
        </div>
        ${skillsToLearn[1] ? `
        <div class="focus-item">
            <h4><i class="fas fa-layer-group"></i> ${skillsToLearn[1]}</h4>
            <p>Next in your learning queue</p>
        </div>
        ` : ''}
    ` : '<div class="empty-state"><i class="fas fa-check-circle"></i><p>No skills to focus on. Great job!</p></div>';
    
    // Set time remaining with watch icon
    let daysRemaining = 90;
    switch (appState.timeline) {
        case '1-month': daysRemaining = 30; break;
        case '3-months': daysRemaining = 90; break;
        case '6-months': daysRemaining = 180; break;
    }
    
    document.getElementById('timeRemaining').innerHTML = `
        <i class="fas fa-clock"></i>
        <span class="days-count">${daysRemaining}</span>
        <span class="label">days until placement season</span>
    `;
    
    // Populate skills progress with counters
    populateSkillsProgress();
}

function updateProgressDisplay() {
    document.getElementById('overallProgress').textContent = appState.progress;
    
    // Update progress circle
    const circle = document.getElementById('progressCircle');
    if (circle) {
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (appState.progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}

function updateStreakDisplay() {
    document.getElementById('streakDays').textContent = appState.streak;
}

function adjustProgress(amount) {
    appState.progress = Math.max(0, Math.min(100, appState.progress + amount));
    updateProgressDisplay();
    
    // Save to localStorage
    localStorage.setItem('userProgress', appState.progress);
    
    // Show feedback
    if (amount > 0) {
        showToast('Progress increased! 🎉', 'success');
    } else if (amount < 0) {
        showToast('Progress decreased', 'info');
    }
}

function adjustStreak(amount) {
    appState.streak = Math.max(0, appState.streak + amount);
    updateStreakDisplay();
    
    // Save to localStorage
    localStorage.setItem('userStreak', appState.streak);
    
    // Show feedback
    if (amount > 0) {
        showToast('Streak updated! 🔥', 'success');
    } else if (amount < 0) {
        showToast('Streak decreased', 'info');
    }
}

function populateSkillsProgress() {
    const skillsProgressList = document.getElementById('skillsProgressList');
    const allSkills = [
        ...appState.userProfile.weaknesses,
        ...appState.userProfile.areasToImprove
    ];
    
    if (allSkills.length === 0) {
        skillsProgressList.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><p>No skills to track. You\'re all set!</p></div>';
        return;
    }
    
    skillsProgressList.innerHTML = allSkills.map(skill => {
        const progress = appState.skillProgress[skill] || 0;
        return `
            <div class="skill-progress-item" data-skill="${skill}">
                <div class="skill-progress-header">
                    <span class="skill-progress-name"><i class="fas fa-code"></i> ${skill}</span>
                    <span class="skill-progress-percent">${progress}%</span>
                </div>
                <div class="skill-progress-bar">
                    <div class="skill-progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="skill-progress-controls">
                    <button class="skill-control-btn minus" onclick="adjustSkillProgress('${skill}', -10)" title="Decrease by 10%">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>Adjust Progress</span>
                    <button class="skill-control-btn plus" onclick="adjustSkillProgress('${skill}', 10)" title="Increase by 10%">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// NEW FUNCTION: Adjust individual skill progress
function adjustSkillProgress(skill, amount) {
    if (!appState.skillProgress) {
        appState.skillProgress = {};
    }
    
    // Get current progress or default to 0
    const currentProgress = appState.skillProgress[skill] || 0;
    
    // Calculate new progress (0-100)
    const newProgress = Math.max(0, Math.min(100, currentProgress + amount));
    
    // Update state
    appState.skillProgress[skill] = newProgress;
    
    // Save to localStorage
    localStorage.setItem(`skill_${skill}`, newProgress);
    
    // Update UI
    const skillItem = document.querySelector(`[data-skill="${skill}"]`);
    if (skillItem) {
        const percentSpan = skillItem.querySelector('.skill-progress-percent');
        const progressFill = skillItem.querySelector('.skill-progress-fill');
        
        percentSpan.textContent = `${newProgress}%`;
        progressFill.style.width = `${newProgress}%`;
        
        // Add animation
        progressFill.classList.add('animate');
        setTimeout(() => progressFill.classList.remove('animate'), 500);
    }
    
    // Show feedback
    if (amount > 0) {
        showToast(`${skill} progress increased! 📈`, 'success');
    } else if (amount < 0) {
        showToast(`${skill} progress decreased`, 'info');
    }
    
    // Update overall progress (average of all skills)
    updateOverallProgress();
}

// NEW FUNCTION: Calculate overall progress from individual skills
function updateOverallProgress() {
    const skills = Object.keys(appState.skillProgress);
    if (skills.length === 0) return;
    
    const total = skills.reduce((sum, skill) => sum + (appState.skillProgress[skill] || 0), 0);
    const average = Math.round(total / skills.length);
    
    appState.progress = average;
    updateProgressDisplay();
    localStorage.setItem('userProgress', appState.progress);
}

// NEW FUNCTION: Simple toast notifications
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style toast
    const bgColor = type === 'success' ? '#10b981' : type === 'info' ? '#6366f1' : '#f59e0b';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations to CSS
const toastStyles = `
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}
`;

// Inject toast styles
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = toastStyles;
    document.head.appendChild(style);
}

// Load saved progress on page load
window.addEventListener('DOMContentLoaded', () => {
    // Load saved roadmap if exists
    const saved = localStorage.getItem('placementRoadmap');
    if (saved) {
        const savedData = JSON.parse(saved);
        console.log('Saved roadmap found:', savedData);
    }
});
