/**
 * Comprehensive validation utilities
 * Client-side validation with security focus
 */

import { ValidationPatterns } from './security';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email é obrigatório');
  } else if (!ValidationPatterns.email.test(email)) {
    errors.push('Email deve ter um formato válido');
  } else if (email.length > 254) {
    errors.push('Email muito longo');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];

  if (!password) {
    errors.push('Senha é obrigatória');
  } else {
    if (password.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }
    if (password.length > 128) {
      errors.push('Senha muito longa');
    }
    if (!ValidationPatterns.password.test(password)) {
      errors.push(
        'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

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

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];

  if (!name) {
    errors.push('Nome é obrigatório');
  } else if (name.length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  } else if (name.length > 50) {
    errors.push('Nome muito longo');
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
    errors.push('Nome deve conter apenas letras e espaços');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
