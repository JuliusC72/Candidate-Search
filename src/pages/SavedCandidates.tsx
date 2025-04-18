import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when component mounts
  useEffect(() => {
    const savedCandidatesData = localStorage.getItem('savedCandidates');
    if (savedCandidatesData) {
      setSavedCandidates(JSON.parse(savedCandidatesData));
    }
  }, []);

  if (savedCandidates.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Potential Candidates</h1>
        <p>No candidates have been saved yet. Go to the Search page to find candidates.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Potential Candidates</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {savedCandidates.map((candidate) => (
          <div 
            key={candidate.id} 
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '10px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img 
              src={candidate.avatar_url} 
              alt={`${candidate.login}'s avatar`}
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%',
                marginBottom: '15px' 
              }} 
            />
            <h3>{candidate.name || candidate.login}</h3>
            <p><strong>Username:</strong> {candidate.login}</p>
            {candidate.location && <p><strong>Location:</strong> {candidate.location}</p>}
            {candidate.email && <p><strong>Email:</strong> {candidate.email}</p>}
            {candidate.company && <p><strong>Company:</strong> {candidate.company}</p>}
            <p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                View GitHub Profile
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;