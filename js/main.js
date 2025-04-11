// Shared functions and data
const db = {
    jobs: JSON.parse(localStorage.getItem('jobs')) || [],
    employeeProfiles: JSON.parse(localStorage.getItem('employeeProfiles')) || []
};

function saveToLocalStorage() {
    localStorage.setItem('jobs', JSON.stringify(db.jobs));
    localStorage.setItem('employeeProfiles', JSON.stringify(db.employeeProfiles));
}

function displayJobs(jobs, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (jobs.length === 0) {
        container.innerHTML = '<p>No jobs found</p>';
        return;
    }
    
    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.description.substring(0, 100)}...</p>
            <p><strong>Skills:</strong> ${job.skills}</p>
            <p><strong>Role:</strong> ${job.role}</p>
        `;
        container.appendChild(jobCard);
    });
}