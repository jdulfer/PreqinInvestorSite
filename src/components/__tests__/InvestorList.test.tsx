import { describe, it, vi, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import InvestorList from '../InvestorList'
import { fetchInvestors } from '../../api/investorAPI'

vi.mock('../../api/investorAPI')

const mockInvestors = [
  {
    id: 1,
    name: 'Test Investor 1',
    investoryType: 'Private Equity',
    dateAdded: '2025-05-18',
    lastUpdated: '2025-05-18',
    commitmentTotal: 1000000
  },
  {
    id: 2,
    name: 'Test Investor 2',
    investoryType: 'Venture Capital',
    dateAdded: '2025-05-17',
    lastUpdated: '2025-05-18',
    commitmentTotal: 2000000
  }
]

describe('InvestorList', () => {
  it('displays loading state initially', () => {
    render(<InvestorList />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays investors after successful fetch', async () => {
    vi.mocked(fetchInvestors).mockResolvedValue(mockInvestors)

    render(<InvestorList />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Test Investor 1')).toBeInTheDocument()
    expect(screen.getByText('Test Investor 2')).toBeInTheDocument()
    expect(screen.getByText('Private Equity')).toBeInTheDocument()
    expect(screen.getByText('Venture Capital')).toBeInTheDocument()
  })

  it('displays error message when fetch fails', async () => {
    vi.mocked(fetchInvestors).mockRejectedValue(new Error('API Error'))

    render(<InvestorList />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch investors')).toBeInTheDocument()
    })
  })
})
