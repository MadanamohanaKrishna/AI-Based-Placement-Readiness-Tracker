// YouTube Resource Database
const youtubeResources = {
    // Web Development
    'HTML/CSS': [
        {
            id: 'html-css-1',
            title: 'HTML & CSS Full Course - Beginner to Pro',
            description: 'Complete HTML5 and CSS3 course for beginners. Learn web development from scratch.',
            duration: '6h 30m',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=mU6anWqZJcc'
        },
        {
            id: 'html-css-2',
            title: 'CSS Flexbox & Grid - Complete Guide',
            description: 'Master modern CSS layouts with Flexbox and CSS Grid.',
            duration: '2h 15m',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=JJSoEo8JSnc'
        }
    ],
    
    'JavaScript': [
        {
            id: 'js-1',
            title: 'JavaScript Full Course for Beginners',
            description: 'Learn JavaScript from scratch. Covers ES6+ features, DOM, async programming.',
            duration: '8h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
        },
        {
            id: 'js-2',
            title: 'JavaScript ES6+ Features',
            description: 'Modern JavaScript features: arrow functions, destructuring, promises, async/await.',
            duration: '1h 30m',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc'
        }
    ],
    
    'React': [
        {
            id: 'react-1',
            title: 'React JS Full Course for Beginners',
            description: 'Complete React tutorial covering components, hooks, context, and routing.',
            duration: '12h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
        },
        {
            id: 'react-2',
            title: 'React Hooks Tutorial',
            description: 'Master React Hooks: useState, useEffect, useContext, useReducer, custom hooks.',
            duration: '2h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=O6P86uwfdR0'
        }
    ],
    
    'Node.js': [
        {
            id: 'node-1',
            title: 'Node.js Full Course for Beginners',
            description: 'Learn Node.js from scratch. Build REST APIs with Express.js.',
            duration: '7h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
        },
        {
            id: 'node-2',
            title: 'Node.js & Express.js Crash Course',
            description: 'Build a complete REST API with Node.js and Express.',
            duration: '2h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=L72fhGm1tfE'
        }
    ],
    
    // Databases
    'SQL': [
        {
            id: 'sql-1',
            title: 'SQL Tutorial - Full Database Course',
            description: 'Learn SQL from basics to advanced. Covers queries, joins, indexes.',
            duration: '4h 20m',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
        }
    ],
    
    'MongoDB': [
        {
            id: 'mongo-1',
            title: 'MongoDB Crash Course',
            description: 'Learn MongoDB NoSQL database. CRUD operations, aggregation, indexing.',
            duration: '1h 30m',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=-56x56UppqQ'
        }
    ],
    
    // Python & Data Science
    'Python': [
        {
            id: 'python-1',
            title: 'Python Full Course for Beginners',
            description: 'Complete Python tutorial. Learn programming fundamentals.',
            duration: '6h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
        },
        {
            id: 'python-2',
            title: 'Python for Data Science',
            description: 'Python for data analysis with NumPy, Pandas, and Matplotlib.',
            duration: '4h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI'
        }
    ],
    
    'Machine Learning': [
        {
            id: 'ml-1',
            title: 'Machine Learning Course for Beginners',
            description: 'Learn ML algorithms: regression, classification, clustering.',
            duration: '10h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=i_LwzRVP7bg'
        },
        {
            id: 'ml-2',
            title: 'Machine Learning with Python',
            description: 'Practical ML with scikit-learn. Build real projects.',
            duration: '6h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=7eh4d6sabA0'
        }
    ],
    
    'Deep Learning': [
        {
            id: 'dl-1',
            title: 'Deep Learning Full Course',
            description: 'Neural networks, CNNs, RNNs, and more with TensorFlow.',
            duration: '7h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=VyWAvY2CF9c'
        }
    ],
    
    'TensorFlow/PyTorch': [
        {
            id: 'tf-1',
            title: 'TensorFlow 2.0 Complete Course',
            description: 'Learn TensorFlow from scratch. Build neural networks.',
            duration: '7h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk'
        },
        {
            id: 'pytorch-1',
            title: 'PyTorch for Deep Learning',
            description: 'Complete PyTorch tutorial for deep learning.',
            duration: '5h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=GIsg-ZUy0MY'
        }
    ],
    
    // DevOps
    'Docker': [
        {
            id: 'docker-1',
            title: 'Docker Tutorial for Beginners',
            description: 'Learn Docker containerization from scratch.',
            duration: '3h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
        }
    ],
    
    'Kubernetes': [
        {
            id: 'k8s-1',
            title: 'Kubernetes Course - Full Beginners Tutorial',
            description: 'Learn Kubernetes orchestration step by step.',
            duration: '4h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=X48VuDVv0do'
        }
    ],
    
    'Git': [
        {
            id: 'git-1',
            title: 'Git & GitHub Crash Course',
            description: 'Learn version control with Git and GitHub.',
            duration: '1h 30m',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
        }
    ],
    
    'CI/CD': [
        {
            id: 'cicd-1',
            title: 'CI/CD Pipeline Tutorial',
            description: 'Build CI/CD pipelines with Jenkins, GitHub Actions.',
            duration: '2h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=7PWdzOKLWGo'
        }
    ],
    
    'AWS': [
        {
            id: 'aws-1',
            title: 'AWS Certified Cloud Practitioner',
            description: 'Complete AWS fundamentals course.',
            duration: '4h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=SOTamWNgDKc'
        }
    ],
    
    // Design
    'Figma': [
        {
            id: 'figma-1',
            title: 'Figma Tutorial for Beginners',
            description: 'Learn Figma UI design from scratch.',
            duration: '3h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8'
        }
    ],
    
    'User Research': [
        {
            id: 'ux-1',
            title: 'UX Design Fundamentals',
            description: 'Learn user research and UX design principles.',
            duration: '2h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=uL2ZB7XXIgg'
        }
    ],
    
    // Testing
    'Selenium': [
        {
            id: 'selenium-1',
            title: 'Selenium Full Course',
            description: 'Learn Selenium automation testing.',
            duration: '9h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=j7VZsCCnptM'
        }
    ],
    
    // Default/Generic
    'default': [
        {
            id: 'programming-1',
            title: 'Computer Science Full Course',
            description: 'Complete computer science fundamentals.',
            duration: '8h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=8mAITcNt710'
        },
        {
            id: 'dsa-1',
            title: 'Data Structures & Algorithms',
            description: 'Complete DSA course for coding interviews.',
            duration: '6h',
            rating: 5,
            url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM'
        }
    ]
};

// Get YouTube resources for a specific skill
function getYouTubeResourcesForSkill(skill) {
    // Try exact match first
    if (youtubeResources[skill]) {
        return youtubeResources[skill];
    }
    
    // Try partial match
    for (const key in youtubeResources) {
        if (skill.toLowerCase().includes(key.toLowerCase()) || 
            key.toLowerCase().includes(skill.toLowerCase())) {
            return youtubeResources[key];
        }
    }
    
    // Return default resources
    return youtubeResources['default'];
}
