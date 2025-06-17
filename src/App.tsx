import { Routes, Route } from 'react-router-dom'
import ChatBot from './pages/ChatBot'
import Loading from './pages/Loading'
import Results from './pages/Results'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}

export default App