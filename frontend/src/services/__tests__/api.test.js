/**
 * Tests du service API
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiService } from '../api'

describe('ApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    global.fetch = vi.fn()
    
    // Mock de window.location.href
    delete window.location
    window.location = { href: '' }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('isSessionExpired', () => {
    it('devrait retourner true si pas de loginTime', () => {
      expect(apiService.isSessionExpired()).toBe(true)
    })

    it('devrait retourner true si session expirée (plus de 2 jours)', () => {
      const expiredTime = Date.now() - (3 * 24 * 60 * 60 * 1000) // 3 jours
      localStorage.setItem('loginTime', expiredTime.toString())
      
      expect(apiService.isSessionExpired()).toBe(true)
    })

    it('devrait retourner false si session valide (moins de 2 jours)', () => {
      const validTime = Date.now() - (1 * 24 * 60 * 60 * 1000) // 1 jour
      localStorage.setItem('loginTime', validTime.toString())
      
      expect(apiService.isSessionExpired()).toBe(false)
    })
  })

  describe('request', () => {
    it('devrait lever une erreur si session expirée', async () => {
      const expiredTime = Date.now() - (3 * 24 * 60 * 60 * 1000)
      localStorage.setItem('loginTime', expiredTime.toString())
      
      await expect(apiService.request('/test/')).rejects.toThrow('Session expired')
      
      // Vérifier que les tokens sont supprimés
      expect(localStorage.getItem('access')).toBeNull()
      expect(localStorage.getItem('refresh')).toBeNull()
      expect(localStorage.getItem('loginTime')).toBeNull()
      expect(window.location.href).toBe('/')
    })

    it('devrait ajouter le token Authorization si disponible', async () => {
      localStorage.setItem('access', 'test-token')
      localStorage.setItem('loginTime', Date.now().toString())
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' })
      })
      
      await apiService.request('/test/')
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token'
          })
        })
      )
    })

    it('devrait gérer les réponses 204 No Content', async () => {
      localStorage.setItem('loginTime', Date.now().toString())
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      })
      
      const result = await apiService.request('/test/', { method: 'DELETE' })
      expect(result).toBeNull()
    })

    it('devrait tenter de refresh le token sur 401', async () => {
      localStorage.setItem('access', 'expired-token')
      localStorage.setItem('refresh', 'valid-refresh')
      localStorage.setItem('loginTime', Date.now().toString())
      
      // Premier appel échoue avec 401
      global.fetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401
        })
        // Refresh token réussit
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ access: 'new-token' })
        })
        // Retry réussit
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ data: 'success' })
        })
      
      const result = await apiService.request('/test/')
      
      expect(global.fetch).toHaveBeenCalledTimes(3)
      expect(localStorage.getItem('access')).toBe('new-token')
      expect(result).toEqual({ data: 'success' })
    })

    it('devrait rediriger vers login si refresh token échoue', async () => {
      localStorage.setItem('access', 'expired-token')
      localStorage.setItem('refresh', 'expired-refresh')
      localStorage.setItem('loginTime', Date.now().toString())
      
      // Premier appel échoue avec 401
      global.fetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401
        })
        // Refresh token échoue
        .mockResolvedValueOnce({
          ok: false,
          status: 401
        })
      
      await expect(apiService.request('/test/')).rejects.toThrow('Session expired')
      expect(window.location.href).toBe('/login')
    })
  })

  describe('refreshToken', () => {
    it('devrait retourner false si pas de refresh token', async () => {
      const result = await apiService.refreshToken()
      expect(result).toBe(false)
    })

    it('devrait rafraîchir le token avec succès', async () => {
      localStorage.setItem('refresh', 'valid-refresh')
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ access: 'new-access-token' })
      })
      
      const result = await apiService.refreshToken()
      
      expect(result).toBe(true)
      expect(localStorage.getItem('access')).toBe('new-access-token')
    })

    it('devrait nettoyer les tokens si refresh échoue', async () => {
      localStorage.setItem('access', 'old-token')
      localStorage.setItem('refresh', 'invalid-refresh')
      
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 401
      })
      
      const result = await apiService.refreshToken()
      
      expect(result).toBe(false)
      expect(localStorage.getItem('access')).toBeNull()
      expect(localStorage.getItem('refresh')).toBeNull()
    })
  })

  describe('API methods', () => {
    beforeEach(() => {
      localStorage.setItem('loginTime', Date.now().toString())
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: 'test' })
      })
    })

    it('devrait appeler GET /bottles/', async () => {
      await apiService.getBottles()
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/bottles/'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
    })

    it('devrait appeler POST /bottles/ pour créer une bouteille', async () => {
      const bottleData = { name: 'Test Wine', year: 2021 }
      
      await apiService.createBottle(bottleData)
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/bottles/'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(bottleData)
        })
      )
    })

    it('devrait gérer FormData pour les uploads d\'images', async () => {
      const formData = new FormData()
      formData.append('name', 'Wine with Image')
      
      await apiService.createBottle(formData)
      
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/bottles/'),
        expect.objectContaining({
          method: 'POST',
          body: formData,
          headers: expect.not.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
    })
  })
})