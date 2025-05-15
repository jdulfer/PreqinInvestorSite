import './styles/App.css'
import InvestorList from './components/InvestorList.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommitmentList from "./components/CommitmentList.tsx";


function App() {
    return (
        <div className="App">
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <a href="/" style={{ textDecoration: 'none' }}>
                    <button>Home</button>
                </a>
            </div>
            <Router>
                <Routes>
                    <Route path="/" element={<InvestorList />} />
                    <Route path="/investors/:investorId/commitments" element={<CommitmentList />} />
                </Routes>
            </Router >
        </div >
    )
}

export default App
