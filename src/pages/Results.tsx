import { useNavigate } from 'react-router-dom'

interface Pet {
  id: number
  name: string
  breed: string
  age: number
  size: string
  location: string
  description: string
}

const Results = () => {
  const navigate = useNavigate()

  const mockResults: Pet[] = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      age: 3,
      size: "Large",
      location: "San Francisco, CA",
      description: "Friendly and energetic dog, loves playing fetch and going on walks."
    },
    {
      id: 2,
      name: "Luna",
      breed: "Border Collie",
      age: 2,
      size: "Medium",
      location: "San Francisco, CA",
      description: "Intelligent and active, great with kids and other pets."
    },
    {
      id: 3,
      name: "Max",
      breed: "Labrador Mix",
      age: 4,
      size: "Large",
      location: "Oakland, CA",
      description: "Gentle giant who loves cuddles and outdoor adventures."
    },
    {
      id: 4,
      name: "Bella",
      breed: "Australian Shepherd",
      age: 1,
      size: "Medium",
      location: "Berkeley, CA",
      description: "Young and playful, looking for an active family to keep up with her energy."
    }
  ]

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Your Pet Matches</h1>
        <p>We found {mockResults.length} perfect matches for you!</p>
        <button onClick={() => navigate('/')} className="new-search-btn">
          Start New Search
        </button>
      </div>

      <div className="results-grid">
        {mockResults.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image-placeholder">
              📷 Photo
            </div>
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <p><strong>{pet.breed}</strong></p>
              <p>Age: {pet.age} years</p>
              <p>Size: {pet.size}</p>
              <p>Location: {pet.location}</p>
              <p className="pet-description">{pet.description}</p>
              <button className="contact-btn">Contact Shelter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Results