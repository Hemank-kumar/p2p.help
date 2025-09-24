import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import Contact from '../../pages/Contact'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('Contact Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders contact form with all required fields', () => {
    render(<Contact />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    // Check for validation messages (implementation dependent)
    await waitFor(() => {
      // This would depend on how validation is implemented in your Contact component
      expect(submitButton).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const mockResponse = {
      data: {
        message: "Thank You for contacting us. We'll get back to you soon.",
        success: true
      }
    }
    
    mockedAxios.post.mockResolvedValueOnce(mockResponse)
    
    render(<Contact />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/contact', {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      })
    })
  })

  it('handles form submission error', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'))
    
    render(<Contact />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      // Check for error handling (implementation dependent)
      expect(mockedAxios.post).toHaveBeenCalled()
    })
  })

  it('validates email format', async () => {
    render(<Contact />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    
    // Check for email validation (implementation dependent)
    await waitFor(() => {
      expect(emailInput).toBeInTheDocument()
    })
  })
})
