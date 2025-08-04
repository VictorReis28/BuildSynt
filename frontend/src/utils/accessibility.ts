/**
 * Utilitários para acessibilidade
 */

export const focusManagement = {
  /**
   * Anuncia uma mensagem para leitores de tela
   * @param message - Mensagem a ser anunciada
   */
  announceToScreenReader(message: string): void {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.setAttribute("class", "sr-only");
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove após um pequeno delay
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  /**
   * Move o foco para um elemento específico
   * @param selector - Seletor CSS do elemento
   */
  focusElement(selector: string): void {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  },

  /**
   * Move o foco para o primeiro elemento focalizável dentro de um container
   * @param container - Elemento container
   */
  focusFirstFocusableElement(container: HTMLElement): void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0] as HTMLElement;
    if (firstElement) {
      firstElement.focus();
    }
  },
};
