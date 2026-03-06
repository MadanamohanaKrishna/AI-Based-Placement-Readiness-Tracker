// Global State
const appState = {
    currentStep: 0,
    selectedRole: null,
    selectedCompanies: [],
    assessmentMethod: null,
    assessmentData: null,
    timeline: null,
    hoursPerDay: 4,
    roadmap: null,
    userProfile: {
        skills: {},
        strengths: [],
        weaknesses: [],
        missingSkills: []
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
    
    // Indian Product Companies
    { id: 'flipkart', name: 'Flipkart', type: 'Product Based', category: 'product', color: '#2874F0' },
    { id: 'paytm', name: 'Paytm', type: 'Product Based', category: 'product', color: '#00BAF2' },
    { id: 'ola', name: 'Ola', type: 'Product Based', category: 'product', color: '#000000' },
    { id: 'swiggy', name: 'Swiggy', type: 'Product Based', category: 'product', color: '#FC8019' },
    { id: 'zomato', name: 'Zomato', type: 'Product Based', category: 'product', color: '#E23744' },
    { id: 'phonepe', name: 'PhonePe', type: 'Product Based', category: 'product', color: '#5F259F' },
    { id: 'cred', name: 'CRED', type: 'Product Based', category: 'product', color: '#000000' },
    { id: 'razorpay', name: 'Razorpay', type: 'Product Based', category: 'product', color: '#0C2451' },
    
    // Startups
    { id: 'zerodha', name: 'Zerodha', type: 'Fintech', category: 'startup', color: '#387ED1' },
    { id: 'meesho', name: 'Meesho', type: 'E-commerce', category: 'startup', color: '#6C1E7D' },
    { id: 'byju', name: 'BYJU\'S', type: 'Edtech', category: 'startup', color: '#8E24AA' },
    { id: 'unacademy', name: 'Unacademy', type: 'Edtech', category: 'startup', color: '#08BD80' },
    { id: 'dunzo', name: 'Dunzo', type: 'Delivery', category: 'startup', color: '#F04136' },
    { id: 'urbanco', name: 'Urban Company', type: 'Services', category: 'startup', color: '#6B38FB' },
    
    // Service-based
    { id: 'tcs', name: 'TCS', type: 'Service Based', category: 'service', color: '#0066B3' },
    { id: 'infosys', name: 'Infosys', type: 'Service Based', category: 'service', color: '#007CC3' },
    { id: 'wipro', name: 'Wipro', type: 'Service Based', category: 'service', color: '#7B3F96' },
    { id: 'hcl', name: 'HCL', type: 'Service Based', category: 'service', color: '#0066CC' },
    { id: 'cognizant', name: 'Cognizant', type: 'Service Based', category: 'service', color: '#00BEFF' },
    { id: 'accenture', name: 'Accenture', type: 'Service Based', category: 'service', color: '#A100FF' },
    { id: 'capgemini', name: 'Capgemini', type: 'Service Based', category: 'service', color: '#0070AD' },
    { id: 'deloitte', name: 'Deloitte', type: 'Service Based', category: 'service', color: '#86BC25' }
];

// Initialize App
function startJourney() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    initializeStep1();
}

function goHome() {
    document.getElementById('app').classList.add('hidden');
    document.querySelector('.hero').style.display = 'flex';
    resetApp();
}

function resetApp() {
    appState.currentStep = 0;
    appState.selectedRole = null;
    appState.selectedCompanies = [];
    appState.assessmentMethod = null;
    appState.assessmentData = null;
    appState.timeline = null;
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
    if (step === 4) initializeStep4();
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

function filterCompanies(category) {
    if (!category) {
        const searchTerm = document.getElementById('companySearch').value.toLowerCase();
        document.querySelectorAll('.company-card').forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        return;
    }
    
    document.querySelectorAll('.company-card').forEach(card => {
        if (card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Step 3: Skills Assessment (continued in assessment.js)
function initializeStep3() {
    // Assessment initialization is handled in assessment.js
}

// Step 4: Timeline Selection
function initializeStep4() {
    // Timeline is already set up in HTML
}

function selectTimeline(timeline) {
    appState.timeline = timeline;
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.timeline-card').classList.add('selected');
    
    if (timeline === 'custom') {
        document.getElementById('customTimeline').classList.remove('hidden');
    } else {
        document.getElementById('customTimeline').classList.add('hidden');
    }
    
    document.getElementById('timelineNextBtn').disabled = false;
}

function calculateCustomTimeline() {
    const targetDate = new Date(document.getElementById('targetDate').value);
    const today = new Date();
    const diffTime = Math.abs(targetDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    
    document.getElementById('customTimelineInfo').innerHTML = `
        <p style="margin-top: 1rem; color: var(--primary-color); font-weight: 500;">
            ${diffDays} days (${weeks} weeks) until your target date
        </p>
    `;
}

function updateHours(value) {
    appState.hoursPerDay = parseInt(value);
    document.getElementById('hoursValue').textContent = value;
}

// Save and Continue
function saveRoadmap() {
    const roadmapData = {
        ...appState,
        savedDate: new Date().toISOString()
    };
    localStorage.setItem('placementRoadmap', JSON.stringify(roadmapData));
    alert('Roadmap saved successfully! You can access it anytime from your dashboard.');
}

function startLearning() {
    alert('Starting your learning journey! This feature will track your progress and send you reminders.');
    // Navigate to dashboard
    document.querySelectorAll('.step-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('dashboard').classList.remove('hidden');
    initializeDashboard();
}

function initializeDashboard() {
    // Dashboard initialization
    document.getElementById('currentFocus').innerHTML = `
        <p>Currently learning: <strong>JavaScript Fundamentals</strong></p>
    `;
    
    document.getElementById('timeRemaining').innerHTML = `
        <p><strong>85 days</strong> until placement season</p>
    `;
    
    // Set progress circle
    const progress = 15;
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    document.getElementById('overallProgress').textContent = progress;
}