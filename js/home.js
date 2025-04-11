document.addEventListener('DOMContentLoaded', () => {
    // Display sample jobs on home page
    if (db.jobs.length === 0) {
        // Add some sample jobs if none exist
        db.jobs = [
            {
                title: 'Frontend Developer',
                description: 'We are looking for a skilled frontend developer with React experience.',
                skills: 'JavaScript, React, HTML, CSS',
                role: 'Full-time'
            },
            {
                title: 'Backend Engineer',
                description: 'Join our team to build scalable backend services.',
                skills: 'Node.js, Python, SQL',
                role: 'Remote'
            }
        ];
        saveToLocalStorage();
    }
    
    displayJobs(db.jobs, 'jobResults');
    
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', () => {
        const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
        const locationTerm = document.getElementById('locationSearch').value.toLowerCase();
        
        const filteredJobs = db.jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.skills.toLowerCase().includes(searchTerm)
        );
        
        displayJobs(filteredJobs, 'jobResults');
    });
});