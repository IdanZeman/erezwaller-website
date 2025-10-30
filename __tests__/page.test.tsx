import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('HandymanLandingPage', () => {
  it('renders in RTL and Hebrew', () => {
    const { container } = render(<Home />)
    const mainDiv = container.querySelector('div[dir="rtl"][lang="he"]')
    expect(mainDiv).toBeInTheDocument()
    expect(mainDiv?.getAttribute('dir')).toBe('rtl')
    expect(mainDiv?.getAttribute('lang')).toBe('he')
  })

  it('shows primary CTAs in hero', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /קבל הצעת מחיר/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /צפה בפרויקטים/i })).toBeInTheDocument()
  })

  it('has phone and email contact links', () => {
    render(<Home />)
    expect(screen.getAllByRole('link').some(a => a.getAttribute('href')?.startsWith('tel:'))).toBe(true)
    expect(screen.getAllByRole('link').some(a => a.getAttribute('href')?.startsWith('mailto:'))).toBe(true)
  })
})
