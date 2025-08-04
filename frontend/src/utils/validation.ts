/**
 * Comprehensive validation utilities
 * Client-side validation with security focus
 */

import { ValidationPatterns } from './security';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateGitHubUrl = (url: string): ValidationResult => {
  const errors: string[] = [];

  if (!url) {
    errors.push('URL do repositório é obrigatória');
  } else if (!ValidationPatterns.githubUrl.test(url)) {
    errors.push(
      'URL deve ser um repositório GitHub válido (https://github.com/usuario/repositorio)'
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
