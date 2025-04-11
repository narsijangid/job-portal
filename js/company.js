document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('jobPostForm');
    
    // Display posted jobs
    displayJobs(db.jobs, 'postedJobs');
    
    // Post new job
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newJob = {
            title: document.getElementById('jobTitle').value,
            description: document.getElementById('jobDescription').value,
            skills: document.getElementById('requiredSkills').value,
            role: document.getElementById('jobRole').value,
            postedAt: new Date().toISOString()
        };
        
        db.jobs.push(newJob);
        saveToLocalStorage();
        displayJobs(db.jobs, 'postedJobs');
        
        postForm.reset();
        alert('Job posted successfully!');
    });
    
    // Find matches using Gemini API
    document.getElementById('findMatches').addEventListener('click', async () => {
        if (db.jobs.length === 0 || db.employeeProfiles.length === 0) {
            alert('No jobs or employee profiles available for matching');
            return;
        }
        
        const matchResults = document.getElementById('matchResults');
        matchResults.innerHTML = '<p>Finding matches...</p>';
        
        try {
            // Simple matching (without actual Gemini API for this example)
            const employees = db.employeeProfiles.filter(p => p.publicProfile);
            const matches = [];
            
            employees.forEach(emp => {
                db.jobs.forEach(job => {
                    const empSkills = emp.skills.toLowerCase().split(',').map(s => s.trim());
                    const jobSkills = job.skills.toLowerCase().split(',').map(s => s.trim());
                    
                    const commonSkills = empSkills.filter(skill => 
                        jobSkills.some(js => js.includes(skill) || skill.includes(js))
                    );
                    
                    if (commonSkills.length > 0) {
                        matches.push({
                            employee: emp,
                            job: job,
                            matchingSkills: commonSkills
                        });
                    }
                });
            });
            
            // Display matches
            matchResults.innerHTML = '';
            
            if (matches.length === 0) {
                matchResults.innerHTML = '<p>No matches found</p>';
                return;
            }
            
            matches.forEach(match => {
                const matchCard = document.createElement('div');
                matchCard.className = 'match-card';
                matchCard.innerHTML = `
                    <h3>${match.employee.title} for ${match.job.title}</h3>
                    <p><strong>Matching Skills:</strong> ${match.matchingSkills.join(', ')}</p>
                    <p><strong>Current Role:</strong> ${match.employee.currentRole}</p>
                    <p><strong>Expected Salary:</strong> ${match.employee.expectedSalary}</p>
                `;
                matchResults.appendChild(matchCard);
            });
            
        } catch (error) {
            console.error('Error finding matches:', error);
            matchResults.innerHTML = '<p>Error finding matches. Please try again.</p>';
        }
    });
});