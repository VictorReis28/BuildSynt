import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useSidebar } from "../hooks/useSidebar";
import { usePerformanceMonitor } from "../hooks/usePerformanceMonitor";
import { createErrorBoundary } from "../utils/errorHandling";
import ErrorFallback from "../components/ErrorBoundary";
import LoadingSpinner from "../components/LoadingSpinner";

// Componentes críticos carregados diretamente (above the fold)
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";

// Lazy load apenas componentes não críticos (below the fold)
const AboutSection = React.lazy(() => import("../components/AboutSection"));
const RepositoryAnalyzer = React.lazy(
  () => import("../components/RepositoryAnalyzer")
);
const TechnologyCard = React.lazy(() => import("../components/TechnologyCard"));
const FeatureCard = React.lazy(() => import("../components/FeatureCard"));
const ContactSection = React.lazy(() => import("../components/ContactSection"));
const UserSettings = React.lazy(() => import("../components/UserSettings"));

import { technologies, features } from "../data/content";

// Create error boundary
const AppErrorBoundary = createErrorBoundary(ErrorFallback);

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" className="mx-auto mb-4" />
      <p className="text-slate-400">Carregando...</p>
    </div>
  </div>
);

function App() {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const [showSettings, setShowSettings] = useState(false);

  // Monitor performance metrics in development
  usePerformanceMonitor();

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <AppErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <UserSettings onClose={handleCloseSettings} />
        </Suspense>
      </AppErrorBoundary>
    );
  }

  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Pular para o conteúdo principal
        </a>

        <Header
          onMenuClick={toggleSidebar}
          onOpenSettings={handleOpenSettings}
        />
        <Sidebar isOpen={isOpen} onClose={closeSidebar} />

        <main id="main-content" className="relative" role="main">
          <HeroSection />

          <Suspense
            fallback={<div className="h-64 bg-slate-900 animate-pulse" />}
          >
            <RepositoryAnalyzer />
          </Suspense>

          <Suspense
            fallback={<div className="h-64 bg-slate-900 animate-pulse" />}
          >
            <AboutSection />
          </Suspense>

          <Suspense
            fallback={<div className="h-64 bg-slate-900 animate-pulse" />}
          >
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3 }}
              id="technologies"
              className="py-20 px-4"
              aria-labelledby="technologies-heading"
            >
              <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                  <h2
                    id="technologies-heading"
                    className="text-3xl font-bold text-white mb-4"
                  >
                    Tecnologias Utilizadas
                  </h2>
                  <p className="text-slate-400 text-lg">
                    Stack moderna para desenvolvimento web e análise de código
                  </p>
                </header>

                <div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  role="list"
                >
                  {technologies.map((tech, index) => (
                    <div key={tech.name} role="listitem">
                      <TechnologyCard technology={tech} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </Suspense>

          <Suspense
            fallback={<div className="h-64 bg-slate-900 animate-pulse" />}
          >
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3 }}
              id="features"
              className="py-20 px-4 bg-slate-950"
              aria-labelledby="features-heading"
            >
              <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                  <h2
                    id="features-heading"
                    className="text-3xl font-bold text-white mb-4"
                  >
                    Funcionalidades
                  </h2>
                  <p className="text-slate-400 text-lg">
                    Recursos avançados para análise e gerenciamento de erros
                  </p>
                </header>

                <div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  role="list"
                >
                  {features.map((feature, index) => (
                    <div key={feature.title} role="listitem">
                      <FeatureCard feature={feature} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </Suspense>

          <Suspense
            fallback={<div className="h-64 bg-slate-900 animate-pulse" />}
          >
            <ContactSection />
          </Suspense>
        </main>
      </div>
    </AppErrorBoundary>
  );
}

export default App;
