import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  // Load a candidate when the component mounts
  useEffect(() => {
    fetchCandidate();
  }, []);

  // Function to fetch a new candidate
  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const candidates = await searchGithub();
      
      if (!candidates || candidates.length === 0) {
        setNoMoreCandidates(true);
        setCandidate(null);
        setLoading(false);
        return;
      }

      // Get the first candidate from the list
      const randomIndex = Math.floor(Math.random() * candidates.length);
      const candidateData = candidates[randomIndex];
      
      // Get detailed user info
      const detailedUser = await searchGithubUser(candidateData.login);
      
      setCandidate({
        ...candidateData,
        ...detailedUser
      });
    } catch (error) {
      console.error('Error fetching candidate:', error);
      setNoMoreCandidates(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to save a candidate and load the next one
  const saveCandidate = () => {
    if (candidate) {
      // Get existing saved candidates from localStorage
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      
      // Check if candidate is already saved
      const isAlreadySaved = savedCandidates.some((saved: Candidate) => saved.id === candidate.id);
      
      if (!isAlreadySaved) {
        // Add the current candidate to the array
        savedCandidates.push(candidate);
        
        // Save the updated array back to localStorage
        localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      }
      
      // Load the next candidate
      fetchCandidate();
    }
  };

  // Function to skip the current candidate
  const skipCandidate = () => {
    fetchCandidate();
  };

  if (loading) {
    return <h2>Loading candidate...</h2>;
  }

  if (noMoreCandidates) {
    return <h2>No more candidates available at this time. Please try again later.</h2>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Candidate Search</h1>
      
      {candidate && (
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <img 
            src={candidate.avatar_url} 
            alt={`${candidate.login}'s avatar`}
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%',
              marginBottom: '15px' 
            }} 
          />
          <h2>{candidate.name || candidate.login}</h2>
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
      )}
      
      <div>
        <button 
          onClick={saveCandidate} 
          style={{ 
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white' 
          }}
        >
          <FaPlus style={{ marginRight: '5px' }} /> Save Candidate
        </button>
        <button 
          onClick={skipCandidate}
          style={{
            backgroundColor: '#f44336',
            color: 'white' 
          }}
        >
          <FaMinus style={{ marginRight: '5px' }} /> Skip Candidate
        </button>
      </div>
    </div>
  );
};

export default CandidateSearch;