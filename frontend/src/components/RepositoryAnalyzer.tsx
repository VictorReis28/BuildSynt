import { motion } from "framer-motion";
import React, { useState } from "react";

import { focusManagement } from "../utils/accessibility";
import { api } from "../utils/api";
import { errorHandler, ErrorType } from "../utils/errorHandling";
import { sanitizeInput, rateLimiter } from "../utils/security";
import { validateGitHubUrl } from "../utils/validation";

import IconComponent from "./IconComponent";
import LoadingSpinner from "./LoadingSpinner";

const RepositoryAnalyzer: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<{
    repositoryInfo?: {
      name: string;
      description: string;
      language: string;
      stars: number;
      forks: number;
    };
    issues?: Array<{
      type: string;
      severity: string;
      message: string;
      file: string;
      line: number;
    }>;
    suggestions?: string[];
    errorCount?: number;
    suggestionCount?: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setAnalysisResult(null);

    if (!rateLimiter.isAllowed("repository-analysis", 3, 300000)) {
      const error = errorHandler.createError(
        ErrorType.VALIDATION,
        "Muitas tentativas de análise. Aguarde alguns minutos.",
        "RATE_LIMITED",
      );

      errorHandler.logError(error);
      setErrors([error.message]);

      return;
    }

    const sanitizedUrl = sanitizeInput.url(url.trim());
    const validation = validateGitHubUrl(sanitizedUrl);

    if (!validation.isValid) {
      setErrors(validation.errors);
      focusManagement.announceToScreenReader("URL inválida. Verifique o formato.");

      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await api.analysis.analyzeRepository(sanitizedUrl);

      setAnalysisResult(result);

      focusManagement.announceToScreenReader("Análise concluída com sucesso");
    } catch (error: unknown) {
      const appError = errorHandler.handleApiError(error);

      errorHandler.logError(appError);
      setErrors([appError.message]);

      focusManagement.announceToScreenReader(`Erro na análise: ${appError.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInputChange = (value: string) => {
    setUrl(value);
    setErrors([]);

    if (value.trim()) {
      const validation = validateGitHubUrl(value.trim());

      if (!validation.isValid) {
        setErrors(validation.errors);
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="analyzer"
      className="px-4 py-8"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Analisador de Repositórios</h2>
          <p className="text-lg text-slate-400">
            Insira a URL de um repositório GitHub público para análise automática de erros Expo
          </p>
        </header>

        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-slate-700 bg-slate-800 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="repo-url" className="mb-2 block text-sm font-medium text-slate-300">
                URL do Repositório GitHub
              </label>
              <div className="relative">
                <IconComponent
                  name="github"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="url"
                  id="repo-url"
                  value={url}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="https://github.com/usuario/repositorio"
                  className={`w-full rounded-lg border bg-slate-700 py-3 pl-12 pr-4 text-white placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                    errors.length > 0
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:ring-blue-500"
                  }`}
                  disabled={isAnalyzing}
                  aria-invalid={errors.length > 0}
                  aria-describedby={errors.length > 0 ? "url-error" : "url-help"}
                  autoComplete="url"
                />
              </div>

              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="url-error"
                  className="mt-2 text-sm text-red-400"
                  role="alert"
                  aria-live="polite"
                >
                  {errors[0]}
                </motion.div>
              )}

              <div id="url-help" className="mt-2 text-sm text-slate-500">
                Exemplo: https://github.com/expo/expo
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isAnalyzing || errors.length > 0}
              whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
              whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-describedby="analyze-button-help"
            >
              {isAnalyzing ? (
                <>
                  <LoadingSpinner size="sm" />
                  Analisando...
                </>
              ) : (
                <>
                  <IconComponent name="search" size={20} />
                  Analisar Repositório
                </>
              )}
            </motion.button>

            <div id="analyze-button-help" className="sr-only">
              {isAnalyzing
                ? "Análise em andamento"
                : "Clique para iniciar a análise do repositório"}
            </div>
          </form>

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 rounded-lg border border-slate-600 bg-slate-700 p-6"
              role="region"
              aria-label="Resultado da análise"
            >
              <div className="mb-4 flex items-center gap-3">
                <IconComponent name="bar-chart" size={24} className="text-green-400" />
                <h3 className="text-xl font-bold text-white">Análise Concluída</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-slate-800 p-4">
                  <h4 className="mb-2 font-medium text-white">Erros Encontrados</h4>
                  <p className="text-2xl font-bold text-red-400">
                    {analysisResult.errorCount || 0}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-800 p-4">
                  <h4 className="mb-2 font-medium text-white">Sugestões</h4>
                  <p className="text-2xl font-bold text-blue-400">
                    {analysisResult.suggestionCount || 0}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-6 rounded-lg bg-slate-700 p-4">
            <div className="flex items-start gap-3">
              <IconComponent name="info" size={20} className="mt-0.5 flex-shrink-0 text-blue-400" />
              <div>
                <h4 className="mb-1 font-medium text-white">Como funciona?</h4>
                <p className="text-sm text-slate-300">
                  O sistema analisará automaticamente o código do repositório, identificará padrões
                  de erro específicos do Expo e gerará um relatório detalhado com sugestões de
                  correção.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RepositoryAnalyzer;
