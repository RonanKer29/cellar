/**
 * Tests du contexte d'authentification
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from '../AuthContext'

// Mock du service API
vi.mock('../../services/api', () => ({
  apiService: {
    baseURL: 'http://localhost:8000/api',
    getUserProfile: vi.fn(),
  },
}))

// Mock de useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Composant de test pour utiliser le hook
const TestComponent = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <div data-testid="user">{user ? user.username : 'no-user'}</div>
      <button onClick={() => login('testuser', 'testpass')} data-testid="login-btn">
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  )
}

const renderWithProvider = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('devrait initialiser avec des valeurs par défaut', async () => {
    renderWithProvider(<TestComponent />)
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })
    
    expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated')
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
  })

  it('devrait détecter une session expirée', async () => {
    // Simuler une session expirée (plus de 2 jours)
    const expiredTime = Date.now() - (3 * 24 * 60 * 60 * 1000)
    localStorage.setItem('access', 'fake-token')
    localStorage.setItem('loginTime', expiredTime.toString())
    
    renderWithProvider(<TestComponent />)
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })
    
    // La session expirée devrait déclencher une déconnexion
    expect(localStorage.getItem('access')).toBeNull()
    expect(localStorage.getItem('loginTime')).toBeNull()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('devrait gérer une connexion réussie', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({
        access: 'new-access-token',
        refresh: 'new-refresh-token'
      })
    }
    global.fetch.mockResolvedValueOnce(mockResponse)

    // Mock du profil utilisateur
    const { apiService } = await import('../../services/api')
    apiService.getUserProfile.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    })

    renderWithProvider(<TestComponent />)
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })

    // Simuler une connexion
    await act(async () => {
      screen.getByTestId('login-btn').click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated')
      expect(screen.getByTestId('user')).toHaveTextContent('testuser')
    })

    // Vérifier que les tokens sont stockés
    expect(localStorage.getItem('access')).toBe('new-access-token')
    expect(localStorage.getItem('refresh')).toBe('new-refresh-token')
    expect(localStorage.getItem('loginTime')).toBeTruthy()
  })

  it('devrait gérer une connexion échouée', async () => {
    const mockResponse = {
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid credentials' })
    }
    global.fetch.mockResolvedValueOnce(mockResponse)

    renderWithProvider(<TestComponent />)
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })

    // Simuler une connexion échouée
    await act(async () => {
      screen.getByTestId('login-btn').click()
    })

    // L'utilisateur ne devrait pas être authentifié
    expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated')
    expect(localStorage.getItem('access')).toBeNull()
  })

  it('devrait gérer la déconnexion', async () => {
    // Simuler un utilisateur connecté
    localStorage.setItem('access', 'test-token')
    localStorage.setItem('refresh', 'test-refresh')
    localStorage.setItem('loginTime', Date.now().toString())

    renderWithProvider(<TestComponent />)
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })

    // Simuler une déconnexion
    await act(async () => {
      screen.getByTestId('logout-btn').click()
    })

    expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated')
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
    expect(localStorage.getItem('access')).toBeNull()
    expect(localStorage.getItem('refresh')).toBeNull()
    expect(localStorage.getItem('loginTime')).toBeNull()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('devrait lancer une erreur si utilisé en dehors du provider', () => {
    // Capturer l'erreur de console
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')
    
    consoleSpy.mockRestore()
  })
})