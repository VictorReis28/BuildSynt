import React from 'react';

/**
 * Comprehensive error handling utilities
 */

export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: any;
  timestamp: number;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: AppError[] = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }

    return ErrorHandler.instance;
  }

  logError(error: AppError): void {
    this.errorLog.push(error);

    // TODO: Backend Integration - Send error to logging service
    console.error('Application Error:', error);

    // Keep only last 100 errors in memory
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100);
    }
  }

  createError(
    type: ErrorType,
    message: string,
    code?: string,
    details?: any
  ): AppError {
    return {
      type,
      message,
      code,
      details,
      timestamp: Date.now(),
    };
  }

  handleApiError(error: any): AppError {
    if (error.status) {
      switch (error.status) {
        case 401:
          return this.createError(
            ErrorType.AUTHENTICATION,
            'Sessão expirada. Faça login novamente.',
            'UNAUTHORIZED'
          );
        case 403:
          return this.createError(
            ErrorType.AUTHORIZATION,
            'Você não tem permissão para esta ação.',
            'FORBIDDEN'
          );
        case 404:
          return this.createError(
            ErrorType.SERVER,
            'Recurso não encontrado.',
            'NOT_FOUND'
          );
        case 429:
          return this.createError(
            ErrorType.NETWORK,
            'Muitas tentativas. Tente novamente em alguns minutos.',
            'RATE_LIMITED'
          );
        case 500:
          return this.createError(
            ErrorType.SERVER,
            'Erro interno do servidor. Tente novamente mais tarde.',
            'INTERNAL_ERROR'
          );
        default:
          return this.createError(
            ErrorType.SERVER,
            'Erro no servidor. Tente novamente.',
            'SERVER_ERROR'
          );
      }
    }

    return this.createError(
      ErrorType.NETWORK,
      'Erro de conexão. Verifique sua internet.',
      'NETWORK_ERROR'
    );
  }

  getErrorLog(): AppError[] {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }
}

export const errorHandler = ErrorHandler.getInstance();

// React error boundary helper
export const createErrorBoundary = (
  fallbackComponent: React.ComponentType<any>
) => {
  return class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      errorHandler.logError(
        errorHandler.createError(
          ErrorType.UNKNOWN,
          error.message,
          'REACT_ERROR',
          { error, errorInfo }
        )
      );
    }

    render() {
      if (this.state.hasError) {
        return React.createElement(fallbackComponent, {
          error: this.state.error,
        });
      }

      return this.props.children;
    }
  };
};
