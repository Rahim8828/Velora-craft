import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation Component', () => {
  const defaultProps = {
    cartItemCount: 0,
    wishlistItemCount: 0,
    isAuthenticated: false,
    onSearch: vi.fn(),
  };

  const renderNavigation = (props = {}) => {
    return render(
      <BrowserRouter>
        <Navigation {...defaultProps} {...props} />
      </BrowserRouter>
    );
  };

  it('renders logo', () => {
    renderNavigation();
    // Logo text appears in main header and mobile drawer
    const logos = screen.getAllByText('Velora Craft');
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it('displays cart item count when items exist', () => {
    renderNavigation({ cartItemCount: 3 });
    const badges = screen.getAllByText('3');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('displays wishlist item count when items exist', () => {
    renderNavigation({ wishlistItemCount: 5 });
    const badges = screen.getAllByText('5');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('renders search bar', () => {
    renderNavigation();
    const searchBars = screen.getAllByPlaceholderText(/Search for furniture/i);
    expect(searchBars.length).toBeGreaterThanOrEqual(1);
  });

  it('renders category navigation links on desktop', () => {
    renderNavigation();
    expect(screen.getAllByText('Sofas').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Beds').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Dining').length).toBeGreaterThanOrEqual(1);
  });
});
