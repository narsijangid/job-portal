document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm');
    
    // Load profile if exists
    const profile = db.employeeProfiles[0]; // Simple - only supports one profile
    if (profile) {
        document.getElementById('title').value = profile.title || '';
        document.getElementById('currentRole').value = profile.currentRole || '';
        document.getElementById('currentSalary').value = profile.currentSalary || '';
        document.getElementById('expectedSalary').value = profile.expectedSalary || '';
        document.getElementById('skills').value = profile.skills || '';
        document.getElementById('publicProfile').checked = profile.publicProfile || false;
    }
    
    // Save profile
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const profile = {
            title: document.getElementById('title').value,
            currentRole: document.getElementById('currentRole').value,
            currentSalary: document.getElementById('currentSalary').value,
            expectedSalary: document.getElementById('expectedSalary').value,
            skills: document.getElementById('skills').value,
            publicProfile: document.getElementById('publicProfile').checked
        };
        
        db.employeeProfiles = [profile]; // Replace any existing profile
        saveToLocalStorage();
        
        alert('Profile saved successfully!');
    });
});