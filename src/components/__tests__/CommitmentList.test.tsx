import { describe, it, vi, expect } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CommitmentList from '../CommitmentList'
import { fetchCommitmentsByInvestorId } from '../../api/investorAPI'

vi.mock('../../api/investorAPI')

const mockCommitments = [
  {
    id: 1,
    amount: 500000,
    currency: 'USD',
    assetClass: 'Private Equity'
  },
  {
    id: 2,
    amount: 750000,
    currency: 'EUR',
    assetClass: 'Venture Capital'
  },
  {
    id: 3,
    amount: 1000000,
    currency: 'USD',
    assetClass: 'Private Equity'
  }
]

const renderWithRouter = (investorId: string) => {
  return render(
    <MemoryRouter initialEntries={[`/investor/${investorId}/commitments`]}>
      <Routes>
        <Route path="/investor/:investorId/commitments" element={<CommitmentList />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('CommitmentList', () => {
  it('displays loading state initially', () => {
    renderWithRouter('1')
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays commitments after successful fetch', async () => {
    vi.mocked(fetchCommitmentsByInvestorId).mockResolvedValue(mockCommitments)

    renderWithRouter('1')

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(screen.getByText('500.0K')).toBeInTheDocument()
    expect(screen.getByText('750.0K')).toBeInTheDocument()
    expect(screen.getByText('1.0M')).toBeInTheDocument()
  })

  it('filters commitments by asset class', async () => {
    vi.mocked(fetchCommitmentsByInvestorId).mockResolvedValue(mockCommitments)

    renderWithRouter('1')

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Private Equity' }))

    expect(screen.getByText('500.0K')).toBeInTheDocument()
    expect(screen.getByText('1.0M')).toBeInTheDocument()
    expect(screen.queryByText('750.0K')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByText('750.0K')).toBeInTheDocument()
  })

  it('displays error message when fetch fails', async () => {
    vi.mocked(fetchCommitmentsByInvestorId).mockRejectedValue(new Error('API Error'))

    renderWithRouter('1')

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch commitments')).toBeInTheDocument()
    })
  })
})
