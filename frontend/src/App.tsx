import { motion } from "framer-motion";
import React, { Suspense } from "react";

import ErrorFallback from "./components/ErrorBoundary";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";

// Lazy load componentes não críticos
const AboutSection = React.lazy(() => import("./components/AboutSection"));
const RepositoryAnalyzer = React.lazy(() => import("./components/RepositoryAnalyzer"));
const TechnologyCard = React.lazy(() => import("./components/TechnologyCard"));
const FeatureCard = React.lazy(() => import("./components/FeatureCard"));
const ContactSection = React.lazy(() => import("./components/ContactSection"));

import { technologies, features } from "./data/content";
import { useSidebar } from "./hooks/useSidebar";
import { createErrorBoundary } from "./utils/errorHandling";

// Create error boundary
const AppErrorBoundary = createErrorBoundary(ErrorFallback);

const App = () => {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-white">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-lg bg-blue-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Pular para o conteúdo principal
        </a>

        <Header onMenuClick={toggleSidebar} />
        <Sidebar isOpen={isOpen} onClose={closeSidebar} />

        <main id="main-content" className="relative" role="main">
          <HeroSection />

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
            <RepositoryAnalyzer />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3 }}
              id="technologies"
              className="px-4 py-20"
              aria-labelledby="technologies-heading"
            >
              <div className="mx-auto max-w-6xl">
                <header className="mb-12 text-center">
                  <h2 id="technologies-heading" className="mb-4 text-3xl font-bold text-white">
                    Tecnologias Utilizadas
                  </h2>
                  <p className="text-lg text-slate-400">
                    Stack moderna para desenvolvimento web e análise de código
                  </p>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
                  {technologies.map((tech, index) => (
                    <div key={tech.name} role="listitem">
                      <TechnologyCard technology={tech} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3 }}
              id="features"
              className="bg-slate-950 px-4 py-20"
              aria-labelledby="features-heading"
            >
              <div className="mx-auto max-w-6xl">
                <header className="mb-12 text-center">
                  <h2 id="features-heading" className="mb-4 text-3xl font-bold text-white">
                    Funcionalidades
                  </h2>
                  <p className="text-lg text-slate-400">
                    Recursos avançados para análise e gerenciamento de erros
                  </p>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
                  {features.map((feature, index) => (
                    <div key={feature.title} role="listitem">
                      <FeatureCard feature={feature} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
            <ContactSection />
          </Suspense>
        </main>
      </div>
    </AppErrorBoundary>
  );
};

export default App;
