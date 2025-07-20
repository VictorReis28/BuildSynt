import React, { useState } from "react";
import { motion } from "framer-motion";
import IconComponent from "./IconComponent";
import LoadingSpinner from "./LoadingSpinner";
import { validateGitHubUrl } from "../utils/validation";
import { sanitizeInput, rateLimiter } from "../utils/security";
import { errorHandler, ErrorType } from "../utils/errorHandling";
import { focusManagement } from "../utils/accessibility";
import { api } from "../utils/api";

const RepositoryAnalyzer: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setAnalysisResult(null);

    if (!rateLimiter.isAllowed("repository-analysis", 3, 300000)) {
      const error = errorHandler.createError(
        ErrorType.VALIDATION,
        "Muitas tentativas de análise. Aguarde alguns minutos.",
        "RATE_LIMITED"
      );
      errorHandler.logError(error);
      setErrors([error.message]);
      return;
    }

    const sanitizedUrl = sanitizeInput.url(url.trim());
    const validation = validateGitHubUrl(sanitizedUrl);

    if (!validation.isValid) {
      setErrors(validation.errors);
      focusManagement.announceToScreenReader(
        "URL inválida. Verifique o formato."
      );
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await api.analysis.analyzeRepository(sanitizedUrl);
      setAnalysisResult(result);

      focusManagement.announceToScreenReader("Análise concluída com sucesso");
    } catch (error: any) {
      const appError = errorHandler.handleApiError(error);
      errorHandler.logError(appError);
      setErrors([appError.message]);

      focusManagement.announceToScreenReader(
        `Erro na análise: ${appError.message}`
      );
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
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Analisador de Repositórios
          </h2>
          <p className="text-slate-400 text-lg">
            Insira a URL de um repositório GitHub público para análise
            automática de erros Expo
          </p>
        </header>

        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="repo-url"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                URL do Repositório GitHub
              </label>
              <div className="relative">
                <IconComponent
                  name="github"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="url"
                  id="repo-url"
                  value={url}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="https://github.com/usuario/repositorio"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.length > 0
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-600 focus:ring-blue-500"
                  }`}
                  disabled={isAnalyzing}
                  aria-invalid={errors.length > 0}
                  aria-describedby={
                    errors.length > 0 ? "url-error" : "url-help"
                  }
                  autoComplete="url"
                />
              </div>

              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="url-error"
                  className="mt-2 text-red-400 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  {errors[0]}
                </motion.div>
              )}

              <div id="url-help" className="mt-2 text-slate-500 text-sm">
                Exemplo: https://github.com/expo/expo
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isAnalyzing || errors.length > 0}
              whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
              whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              className="mt-8 p-6 bg-slate-700 rounded-lg border border-slate-600"
              role="region"
              aria-label="Resultado da análise"
            >
              <div className="flex items-center gap-3 mb-4">
                <IconComponent
                  name="bar-chart"
                  size={24}
                  className="text-green-400"
                />
                <h3 className="text-xl font-bold text-white">
                  Análise Concluída
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">
                    Erros Encontrados
                  </h4>
                  <p className="text-2xl font-bold text-red-400">
                    {analysisResult.errorCount || 0}
                  </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Sugestões</h4>
                  <p className="text-2xl font-bold text-blue-400">
                    {analysisResult.suggestionCount || 0}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-6 p-4 bg-slate-700 rounded-lg">
            <div className="flex items-start gap-3">
              <IconComponent
                name="info"
                size={20}
                className="text-blue-400 mt-0.5 flex-shrink-0"
              />
              <div>
                <h4 className="text-white font-medium mb-1">Como funciona?</h4>
                <p className="text-slate-300 text-sm">
                  O sistema analisará automaticamente o código do repositório,
                  identificará padrões de erro específicos do Expo e gerará um
                  relatório detalhado com sugestões de correção.
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
