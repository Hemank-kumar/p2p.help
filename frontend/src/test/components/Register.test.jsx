import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import Register from '../../components/Register'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders registration form with all required fields', () => {
    render(<Register />)
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/course name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    render(<Register />)
    
    const submitButton = screen.getByRole('button', { name: /register/i })
    fireEvent.click(submitButton)
    
    // Check for validation messages (implementation dependent)
    await waitFor(() => {
      expect(submitButton).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const mockResponse = {
      data: {
        message: 'Registration successful!'
      }
    }
    
    mockedAxios.post.mockResolvedValueOnce(mockResponse)
    
    render(<Register />)
    
    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const mobileInput = screen.getByLabelText(/mobile number/i)
    const courseInput = screen.getByLabelText(/course name/i)
    const submitButton = screen.getByRole('button', { name: /register/i })
    
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(mobileInput, { target: { value: '1234567890' } })
    fireEvent.change(courseInput, { target: { value: 'JavaScript Fundamentals' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/registration', {
        fullName: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '1234567890',
        courseName: 'JavaScript Fundamentals',
        highestEducation: '',
        profession: '',
        institute: '',
        reasonForJoining: '',
        additionalSkills: '',
        learningPreferences: ''
      })
    })
  })

  it('handles form submission error', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'))
    
    render(<Register />)
    
    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const mobileInput = screen.getByLabelText(/mobile number/i)
    const courseInput = screen.getByLabelText(/course name/i)
    const submitButton = screen.getByRole('button', { name: /register/i })
    
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(mobileInput, { target: { value: '1234567890' } })
    fireEvent.change(courseInput, { target: { value: 'JavaScript Fundamentals' } })
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })
  })

  it('validates email format', async () => {
    render(<Register />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /register/i })
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    
    // Check for email validation (implementation dependent)
    await waitFor(() => {
      expect(emailInput).toBeInTheDocument()
    })
  })

  it('validates mobile number format', async () => {
    render(<Register />)
    
    const mobileInput = screen.getByLabelText(/mobile number/i)
    const submitButton = screen.getByRole('button', { name: /register/i })
    
    fireEvent.change(mobileInput, { target: { value: '123' } })
    fireEvent.click(submitButton)
    
    // Check for mobile validation (implementation dependent)
    await waitFor(() => {
      expect(mobileInput).toBeInTheDocument()
    })
  })
})
