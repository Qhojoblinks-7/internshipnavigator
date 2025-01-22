require('dotenv').config();
const supabase = require('./src/supabase');

// Fetch all internships
async function fetchInternships() {
    const { data, error } = await supabase.from('Internships').select(`
        internship_id,
        title,
        description,
        required_skills,
        duration,
        application_deadline,
        Companies (company_name, location)
    `);
    if (error) {
        console.error('Error fetching internships:', error.message);
        return;
    }
    console.log('Internships:', data);
}

// Fetch applications for a specific applicant
async function fetchApplications(applicantEmail) {
    const { data, error } = await supabase
        .from('Applicants')
        .select(`
            applicant_id,
            Applications (
                application_id,
                internship_id,
                status,
                application_date,
                Internships (
                    title,
                    Companies (company_name)
                )
            )
        `)
        .eq('email', applicantEmail);
    if (error) {
        console.error('Error fetching applications:', error.message);
        return;
    }
    console.log('Applications:', data);
}

// Submit a new application
async function submitApplication(applicantId, internshipId) {
    const { error } = await supabase.from('Applications').insert([
        { applicant_id: applicantId, internship_id: internshipId }
    ]);
    if (error) {
        console.error('Error submitting application:', error.message);
        return;
    }
    console.log('Application submitted successfully');
}

// Example Usage
fetchInternships();
fetchApplications('john.doe@example.com');
submitApplication(1, 2);
