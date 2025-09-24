import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

// Mock the components to avoid complex dependencies
vi.mock('../pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>
}))

vi.mock('../pages/Learn', () => ({
  default: () => <div data-testid="learn-page">Learn Page</div>
}))

vi.mock('../pages/Teach', () => ({
  default: () => <div data-testid="teach-page">Teach Page</div>
}))

vi.mock('../pages/Contact', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>
}))

vi.mock('../pages/AdminLogin', () => ({
  default: () => <div data-testid="admin-login-page">Admin Login Page</div>
}))

vi.mock('../pages/AdminCourses', () => ({
  default: () => <div data-testid="admin-courses-page">Admin Courses Page</div>
}))

vi.mock('../pages/PageNotFound', () => ({
  default: () => <div data-testid="page-not-found">Page Not Found</div>
}))

vi.mock('../components/Register', () => ({
  default: () => <div data-testid="register-component">Register Component</div>
}))

vi.mock('../components/ProtectedRoute', () => ({
  default: ({ children }) => <div data-testid="protected-route">{children}</div>
}))

vi.mock('../components/Layout', () => ({
  default: ({ children }) => <div data-testid="layout">{children}</div>
}))

const renderWithRouter = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('App Component', () => {
  it('renders home page on root route', () => {
    renderWithRouter(<App />, { route: '/' })
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders learn page on /learn route', () => {
    renderWithRouter(<App />, { route: '/learn' })
    expect(screen.getByTestId('learn-page')).toBeInTheDocument()
  })

  it('renders teach page on /teach route', () => {
    renderWithRouter(<App />, { route: '/teach' })
    expect(screen.getByTestId('teach-page')).toBeInTheDocument()
  })

  it('renders contact page on /contact route', () => {
    renderWithRouter(<App />, { route: '/contact' })
    expect(screen.getByTestId('contact-page')).toBeInTheDocument()
  })

  it('renders admin login page on /admin/login route', () => {
    renderWithRouter(<App />, { route: '/admin/login' })
    expect(screen.getByTestId('admin-login-page')).toBeInTheDocument()
  })

  it('renders admin dashboard on /admin/dashboard route', () => {
    renderWithRouter(<App />, { route: '/admin/dashboard' })
    expect(screen.getByTestId('admin-courses-page')).toBeInTheDocument()
    expect(screen.getByTestId('protected-route')).toBeInTheDocument()
  })

  it('renders register component on /learn/register route', () => {
    renderWithRouter(<App />, { route: '/learn/register' })
    expect(screen.getByTestId('register-component')).toBeInTheDocument()
  })

  it('renders 404 page for unknown routes', () => {
    renderWithRouter(<App />, { route: '/unknown-route' })
    expect(screen.getByTestId('page-not-found')).toBeInTheDocument()
  })

  it('renders layout component for all routes', () => {
    renderWithRouter(<App />, { route: '/' })
    expect(screen.getByTestId('layout')).toBeInTheDocument()
  })
})
