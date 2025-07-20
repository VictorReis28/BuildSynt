/**
 * Accessibility utilities following WCAG guidelines
 */

// Focus management
export const focusManagement = {
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },
  
  announceToScreenReader: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};

// Color contrast utilities
export const colorContrast = {
  // Calculate relative luminance
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },
  
  // Calculate contrast ratio
  getContrastRatio: (color1: string, color2: string): number => {
    // This is a simplified version - in production, use a proper color parsing library
    // TODO: Implement proper color parsing for hex, rgb, hsl values
    return 4.5; // Placeholder - should meet WCAG AA standards
  }
};

// Keyboard navigation helpers
export const keyboardNavigation = {
  handleArrowKeys: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        onIndexChange((currentIndex + 1) % items.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        onIndexChange(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        onIndexChange(0);
        break;
      case 'End':
        event.preventDefault();
        onIndexChange(items.length - 1);
        break;
    }
  }
};