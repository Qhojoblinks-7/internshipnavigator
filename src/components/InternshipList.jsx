import React, { useState, useEffect } from 'react';
import supabase from '/src/supabase';
const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data, error } = await supabase
          .from('Internships')
          .select(`
            internship_id,
            title,
            description,
            required_skills,
            duration,
            application_deadline,
            Companies!fk_company_id (
              company_name,
              location
            )
          `);

        if (error) {
          console.error('Error fetching internships:', error.message);
        } else {
          setInternships(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) return <div>Loading internships...</div>;

  return (
    <div>
      <h1>Available Internships</h1>
      <ul>
        {internships.map((internship) => (
          <li key={internship.internship_id}>
            <h3>{internship.title}</h3>
            <p>{internship.description}</p>
            <p><strong>Required Skills:</strong> {internship.required_skills}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Application Deadline:</strong> {internship.application_deadline}</p>
            <p><strong>Company:</strong> {internship.Companies?.company_name || 'N/A'}</p>
            <p><strong>Location:</strong> {internship.Companies?.location || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternshipList;
