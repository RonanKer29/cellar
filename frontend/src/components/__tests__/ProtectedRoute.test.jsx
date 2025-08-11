/**
 * Tests du composant ProtectedRoute
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

// Mock du contexte d'authentification
const mockUseAuth = vi.fn()
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth()
}))

// Mock du composant Navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to }) => {
      mockNavigate(to)
      return <div data-testid="navigate">Redirecting to {to}</div>
    }
  }
})

const TestComponent = () => <div data-testid="protected-content">Protected Content</div>

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('ProtectedRoute', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('devrait afficher le loading quand isLoading est true', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true
    })

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    )

    expect(screen.getByText('Chargement...')).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('devrait rediriger vers / si non authentifié', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false
    })

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/')
    expect(screen.getByTestId('navigate')).toHaveTextContent('Redirecting to /')
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('devrait afficher le contenu protégé si authentifié', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false
    })

    renderWithRouter(
      <ProtectedRoute>
        <TestComponent />
      </ProtectedRoute>
    )

    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    expect(screen.queryByText('Chargement...')).not.toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('devrait rediriger vers une route personnalisée', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false
    })

    renderWithRouter(
      <ProtectedRoute redirectTo="/login">
        <TestComponent />
      </ProtectedRoute>
    )

    expect(mockNavigate).toHaveBeenCalledWith('/login')
    expect(screen.getByTestId('navigate')).toHaveTextContent('Redirecting to /login')
  })
})