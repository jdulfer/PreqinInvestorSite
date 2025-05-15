import './styles/App.css'
import InvestorList from './components/InvestorList.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommitmentList from "./components/CommitmentList.tsx";


function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<InvestorList />} />
                    <Route path="/investors/:investorId/commitments" element={<CommitmentList />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
