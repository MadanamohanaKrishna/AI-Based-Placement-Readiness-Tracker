
// Resource Database
const resourceDatabase = [
    // HTML & CSS
    {
        id: 'html-css-basics',
        title: 'HTML & CSS Full Course for Beginners',
        type: 'Video Course',
        typeIcon: 'fa-play-circle',
        description: 'Comprehensive beginner-friendly course covering HTML5 and CSS3 fundamentals with modern layout techniques.',
        duration: '4h 30m',
        rating: 4.8,
        url: 'https://example.com/html-css-course',
        skills: ['HTML', 'CSS']
    },
    {
        id: 'flexbox-guide',
        title: 'CSS Flexbox Complete Guide',
        type: 'Tutorial',
        typeIcon: 'fa-book',
        description: 'Master CSS Flexbox with interactive examples and real-world layouts.',
        duration: '1h 15m',
        rating: 4.7,
        url: 'https://example.com/flexbox-guide',
        skills: ['CSS']
    },
    
    // JavaScript
    {
        id: 'javascript-beginner',
        title: 'JavaScript for Absolute Beginners',
        type: 'Video Course',
        typeIcon: 'fa-play-circle',
        description: 'Learn JavaScript from scratch with hands-on projects and exercises.',
        duration: '6h 45m',
        rating: 4.9,
        url: 'https://example.com/js-beginner',
        skills: ['JavaScript']
    },
    {
        id: 'es6-features',
        title: 'Modern JavaScript (ES6+) Essentials',
        type: 'Article',
        typeIcon: 'fa-file-alt',
        description: 'Deep dive into ES6+ features including arrow functions, destructuring, promises, async/await.',
        duration: '45m',
        rating: 4.6,
        url: 'https://example.com/es6-features',
        skills: ['JavaScript']
    },
    
    // React
    {
        id: 'react-beginner',
        title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
        type: 'Video Course',
        typeIcon: 'fa-play-circle',
        description: 'Learn React from the ground up with modern practices and project-based learning.',
        duration: '20h',
        rating: 4.7,
        url: 'https://example.com/react-guide',
        skills: ['React']
    },
    {
        id: 'react-hooks',
        title: 'Understanding React Hooks',
        type: 'Tutorial',
        typeIcon: 'fa-laptop-code',
        description: 'Master React Hooks with practical examples and best practices.',
        duration: '2h',
        rating: 4.8,
        url: 'https://example.com/react-hooks',
        skills: ['React']
    },
    
    // Node.js
    {
        id: 'nodejs-basics',
        title: 'Node.js Fundamentals',
        type: 'Video Course',
        typeIcon: 'fa-play-circle',
        description: 'Learn Node.js from scratch and build server-side applications.',
        duration: '5h',
        rating: 4.6,
        url: 'https://example.com/nodejs-basics',
        skills: ['Node.js']
    },
    
    // Python
    {
        id: 'python-beginner',
        title: 'Python for Everybody',
        type: 'Video Course',
        typeIcon: 'fa-play-circle',
        description: 'Complete Python course for beginners with data science applications.',
        duration: '15h',
        rating: 4.8,
        url: 'https://example.com/python-course',
        skills: ['Python']
    },
    
    // Data Structures & Algorithms
    {
        id: 'dsa-course',
        title: 'Master the Coding Interview: Data Structures + Algorithms',
        type: 'Video Course',
        typeIcon: 'fa-play-circle',
        description: 'Comprehensive DSA course with coding challenges and interview preparation.',
        duration: '18h',
        rating: 4.9,
        url: 'https://example.com/dsa-course',
        skills: ['Algorithms', 'Data Structures']
    },
    
    // System Design
    {
        id: 'system-design',
        title: 'Grokking the System Design Interview',
        type: 'Course',
        typeIcon: 'fa-graduation-cap',
        description: 'Learn system design concepts with real-world examples and interview questions.',
        duration: '10h',
        rating: 4.7,
        url: 'https://example.com/system-design',
        skills: ['System Design']
    },
    
    // Git
    {
        id: 'git-crash-course',
        title: 'Git & GitHub Crash Course',
        type: 'Video',
        typeIcon: 'fa-play-circle',
        description: 'Learn Git essentials for version control and collaboration.',
        duration: '1h 30m',
        rating: 4.8,
        url: 'https://example.com/git-course',
        skills: ['Git']
    },
    
    // Docker
    {
        id: 'docker-basics',
        title: 'Docker for Beginners',
        type: 'Tutorial',
        typeIcon: 'fa-box',
        description: 'Learn Docker fundamentals and containerization concepts.',
        duration: '2h',
        rating: 4.6,
        url: 'https://example.com/docker-basics',
        skills: ['Docker']
    },
    
    // Machine Learning
    {
        id: 'ml-beginner',
        title: 'Machine Learning A-Z™: Hands-On Python & R in Data Science',
        type: 'Course',
        typeIcon: 'fa-brain',
        description: 'Comprehensive machine learning course with practical projects.',
        duration: '15h',
        rating: 4.6,
        url: 'https://example.com/ml-course',
        skills: ['Machine Learning', 'Python']
    },
    
    // UI/UX Design
    {
        id: 'figma-course',
        title: 'Figma UI/UX Design Essential Training',
        type: 'Video Course',
        typeIcon: 'fa-palette',
        description: 'Learn UI/UX design principles and create beautiful interfaces with Figma.',
        duration: '8h',
        rating: 4.7,
        url: 'https://example.com/figma-course',
        skills: ['Figma', 'UI Design', 'UX Design']
    }
];

// Get resources for a specific skill
function getResourcesForSkill(skill) {
    // Filter resources that match the skill
    const resources = resourceDatabase.filter(resource => 
        resource.skills.includes(skill)
    );
    
    // If no exact match, try to find related resources
    if (resources.length === 0) {
        // Simple related skill mapping
        const relatedSkills = {
            'HTML': ['HTML', 'CSS', 'JavaScript'],
            'CSS': ['CSS', 'HTML'],
            'JavaScript': ['JavaScript', 'React', 'Node.js'],
            'React': ['React', 'JavaScript'],
            'Node.js': ['Node.js', 'JavaScript'],
            'Python': ['Python', 'Machine Learning'],
            'SQL': ['SQL', 'Databases'],
            'MongoDB': ['MongoDB', 'Databases']
        };
        
        const related = relatedSkills[skill] || [skill];
        return resourceDatabase.filter(resource => 
            resource.skills.some(s => related.includes(s))
        );
    }
    
    return resources;
}

// Filter resources by type
function filterResourcesByType(type) {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    const filteredResources = resourceDatabase.filter(resource => 
        resource.type.toLowerCase() === type.toLowerCase()
    );
    
    filteredResources.forEach(resource => {
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

// Search resources
function searchResources(query) {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    const lowerQuery = query.toLowerCase();
    const filteredResources = resourceDatabase.filter(resource => 
        resource.title.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        resource.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
    
    if (filteredResources.length === 0) {
        resourcesList.innerHTML = '<p>No resources found matching your search.</p>';
        return;
    }
    
    filteredResources.forEach(resource => {
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