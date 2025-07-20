import React, { useState } from "react";
import { motion } from "framer-motion";
import IconComponent from "./IconComponent";
import LoadingSpinner from "./LoadingSpinner";
import { validateEmail, validateName } from "../utils/validation";
import { sanitizeInput } from "../utils/security";

interface UserSettingsProps {
  onClose?: () => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Profile settings state
  const [profileData, setProfileData] = useState({
    displayName: "João Silva",
    username: "joao.silva",
    email: "joao.silva@buildsynt.dev",
    bio: "Desenvolvedor especializado em análise de código e qualidade de software.",
    location: "São Paulo, Brasil",
    socialLinks: {
      github: "https://github.com/joaosilva",
      linkedin: "https://linkedin.com/in/joaosilva",
      twitter: "",
    },
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    notifications: {
      newMessages: true,
      updates: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showOnlineStatus: true,
      whoCanContact: "everyone",
    },
    theme: {
      mode: "dark",
      colorScheme: "blue",
    },
    accessibility: {
      fontSize: "medium",
      highContrast: false,
      screenReader: false,
    },
  });

  // Security state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    passwordRequirements: {
      minLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
    },
  });

  const tabs = [
    { id: "profile", label: "Perfil", icon: "user" },
    { id: "preferences", label: "Preferências", icon: "settings" },
    { id: "security", label: "Segurança", icon: "shield" },
    { id: "privacy", label: "Dados & Privacidade", icon: "lock" },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Backend Integration - Save user settings
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: sanitizeInput.text(value),
    }));
    setHasChanges(true);
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: sanitizeInput.url(value),
      },
    }));
    setHasChanges(true);
  };

  const handlePreferenceChange = (
    category: string,
    field: string,
    value: any
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const renderProfileSettings = () => (
    <div className="space-y-8">
      {/* Profile Picture */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Foto do Perfil
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-600"
            />
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <IconComponent name="camera" size={14} className="text-white" />
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              Alterar Foto
            </button>
            <button className="px-4 py-2 border border-slate-600 hover:border-red-500 text-slate-300 hover:text-red-400 rounded-lg transition-colors">
              Remover
            </button>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Informações Básicas
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nome de Exibição
            </label>
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) =>
                handleProfileChange("displayName", e.target.value)
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nome de Usuário
            </label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => handleProfileChange("username", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Localização (Opcional)
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => handleProfileChange("location", e.target.value)}
              placeholder="Cidade, País"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Bio (máx. 150 caracteres)
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleProfileChange("bio", e.target.value)}
            maxLength={150}
            rows={3}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="text-right text-sm text-slate-400 mt-1">
            {profileData.bio.length}/150
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Redes Sociais</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              GitHub
            </label>
            <input
              type="url"
              value={profileData.socialLinks.github}
              onChange={(e) => handleSocialLinkChange("github", e.target.value)}
              placeholder="https://github.com/seuusuario"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={profileData.socialLinks.linkedin}
              onChange={(e) =>
                handleSocialLinkChange("linkedin", e.target.value)
              }
              placeholder="https://linkedin.com/in/seuusuario"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Twitter (Opcional)
            </label>
            <input
              type="url"
              value={profileData.socialLinks.twitter}
              onChange={(e) =>
                handleSocialLinkChange("twitter", e.target.value)
              }
              placeholder="https://twitter.com/seuusuario"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Alterar Senha</h3>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          Alterar Senha
        </button>
        <p className="text-sm text-slate-400 mt-2">
          Você receberá um email com instruções para alterar sua senha
        </p>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-8">
      {/* Language & Region */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Idioma e Região
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Idioma
            </label>
            <select
              value={preferences.language}
              onChange={(e) =>
                handlePreferenceChange("", "language", e.target.value)
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Fuso Horário
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) =>
                handlePreferenceChange("", "timezone", e.target.value)
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
              <option value="America/New_York">New York (GMT-5)</option>
              <option value="Europe/London">London (GMT+0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Notificações por Email
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "newMessages",
              label: "Novas mensagens",
              description: "Receber notificações de novas mensagens",
            },
            {
              key: "updates",
              label: "Atualizações e anúncios",
              description: "Novidades sobre o produto e funcionalidades",
            },
            {
              key: "marketing",
              label: "Comunicações de marketing",
              description: "Ofertas especiais e conteúdo promocional",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-sm text-slate-400">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    preferences.notifications[
                      item.key as keyof typeof preferences.notifications
                    ]
                  }
                  onChange={(e) =>
                    handlePreferenceChange(
                      "notifications",
                      item.key,
                      e.target.checked
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Configurações de Privacidade
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Visibilidade do Perfil
            </label>
            <select
              value={preferences.privacy.profileVisibility}
              onChange={(e) =>
                handlePreferenceChange(
                  "privacy",
                  "profileVisibility",
                  e.target.value
                )
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Público</option>
              <option value="private">Privado</option>
              <option value="friends">Apenas Amigos</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">
                Mostrar Status Online
              </div>
              <div className="text-sm text-slate-400">
                Outros usuários podem ver quando você está online
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.privacy.showOnlineStatus}
                onChange={(e) =>
                  handlePreferenceChange(
                    "privacy",
                    "showOnlineStatus",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Quem Pode Me Contatar
            </label>
            <select
              value={preferences.privacy.whoCanContact}
              onChange={(e) =>
                handlePreferenceChange(
                  "privacy",
                  "whoCanContact",
                  e.target.value
                )
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="everyone">Todos</option>
              <option value="friends">Apenas Amigos</option>
              <option value="nobody">Ninguém</option>
            </select>
          </div>
        </div>
      </div>

      {/* Theme Preferences */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Preferências de Tema
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Modo de Cor
            </label>
            <select
              value={preferences.theme.mode}
              onChange={(e) =>
                handlePreferenceChange("theme", "mode", e.target.value)
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="dark">Escuro</option>
              <option value="light">Claro</option>
              <option value="auto">Automático</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Esquema de Cores
            </label>
            <select
              value={preferences.theme.colorScheme}
              onChange={(e) =>
                handlePreferenceChange("theme", "colorScheme", e.target.value)
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="blue">Azul</option>
              <option value="purple">Roxo</option>
              <option value="green">Verde</option>
              <option value="red">Vermelho</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Acessibilidade
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tamanho da Fonte
            </label>
            <select
              value={preferences.accessibility.fontSize}
              onChange={(e) =>
                handlePreferenceChange(
                  "accessibility",
                  "fontSize",
                  e.target.value
                )
              }
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Pequena</option>
              <option value="medium">Média</option>
              <option value="large">Grande</option>
              <option value="extra-large">Extra Grande</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Alto Contraste</div>
              <div className="text-sm text-slate-400">
                Aumenta o contraste para melhor legibilidade
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.accessibility.highContrast}
                onChange={(e) =>
                  handlePreferenceChange(
                    "accessibility",
                    "highContrast",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">
                Compatibilidade com Leitor de Tela
              </div>
              <div className="text-sm text-slate-400">
                Otimiza a interface para leitores de tela
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.accessibility.screenReader}
                onChange={(e) =>
                  handlePreferenceChange(
                    "accessibility",
                    "screenReader",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      {/* Two-Factor Authentication */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Autenticação de Dois Fatores
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white font-medium">
              2FA {securitySettings.twoFactorEnabled ? "Ativado" : "Desativado"}
            </div>
            <div className="text-sm text-slate-400">
              Adiciona uma camada extra de segurança à sua conta
            </div>
          </div>
          <button
            onClick={() =>
              setSecuritySettings((prev) => ({
                ...prev,
                twoFactorEnabled: !prev.twoFactorEnabled,
              }))
            }
            className={`px-4 py-2 rounded-lg transition-colors ${
              securitySettings.twoFactorEnabled
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {securitySettings.twoFactorEnabled ? "Desativar" : "Ativar"}
          </button>
        </div>
        {securitySettings.twoFactorEnabled && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <IconComponent
                name="shield"
                size={16}
                className="text-green-400"
              />
              <span className="text-green-400 text-sm font-medium">
                2FA está ativo
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Login History */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Histórico de Login
        </h3>
        <div className="space-y-3">
          {[
            {
              device: "Chrome - Windows",
              location: "São Paulo, Brasil",
              time: "2 horas atrás",
              current: true,
            },
            {
              device: "Safari - iPhone",
              location: "São Paulo, Brasil",
              time: "1 dia atrás",
              current: false,
            },
            {
              device: "Firefox - Linux",
              location: "Rio de Janeiro, Brasil",
              time: "3 dias atrás",
              current: false,
            },
          ].map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <IconComponent
                  name="monitor"
                  size={20}
                  className="text-slate-400"
                />
                <div>
                  <div className="text-white font-medium flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        Atual
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-400">
                    {session.location} • {session.time}
                  </div>
                </div>
              </div>
              {!session.current && (
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <IconComponent name="x" size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Connected Devices */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Dispositivos Conectados
        </h3>
        <div className="space-y-3">
          {[
            {
              name: "Computador Principal",
              type: "Desktop",
              lastActive: "Agora",
              trusted: true,
            },
            {
              name: "iPhone de João",
              type: "Mobile",
              lastActive: "1 hora atrás",
              trusted: true,
            },
            {
              name: "Notebook Trabalho",
              type: "Laptop",
              lastActive: "2 dias atrás",
              trusted: false,
            },
          ].map((device, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <IconComponent
                  name={device.type === "Mobile" ? "smartphone" : "monitor"}
                  size={20}
                  className="text-slate-400"
                />
                <div>
                  <div className="text-white font-medium flex items-center gap-2">
                    {device.name}
                    {device.trusted && (
                      <IconComponent
                        name="shield"
                        size={14}
                        className="text-green-400"
                      />
                    )}
                  </div>
                  <div className="text-sm text-slate-400">
                    Último acesso: {device.lastActive}
                  </div>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-300 transition-colors">
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Requisitos de Senha
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">
              Comprimento mínimo: 8 caracteres
            </span>
            <IconComponent name="check" size={16} className="text-green-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Requer caracteres especiais</span>
            <IconComponent name="check" size={16} className="text-green-400" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Requer números</span>
            <IconComponent name="check" size={16} className="text-green-400" />
          </div>
        </div>
      </div>

      {/* Recovery Options */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Opções de Recuperação
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Email de Recuperação</div>
              <div className="text-sm text-slate-400">
                joao.silva@buildsynt.dev
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Alterar
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Códigos de Backup</div>
              <div className="text-sm text-slate-400">
                10 códigos disponíveis
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Ver Códigos
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-8">
      {/* Data Export */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Exportar Meus Dados
        </h3>
        <p className="text-slate-400 mb-4">
          Baixe uma cópia de todos os seus dados em formato JSON
        </p>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          Solicitar Exportação
        </button>
      </div>

      {/* Data Sharing */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Preferências de Compartilhamento
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "analytics",
              label: "Dados de Uso Anônimos",
              description: "Ajuda a melhorar o produto",
            },
            {
              key: "marketing",
              label: "Dados para Marketing",
              description: "Personalização de conteúdo",
            },
            {
              key: "partners",
              label: "Compartilhar com Parceiros",
              description: "Serviços integrados",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-sm text-slate-400">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={item.key === "analytics"}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-slate-800 rounded-xl p-6 border border-red-500/20">
        <h3 className="text-lg font-semibold text-red-400 mb-4">
          Excluir Conta
        </h3>
        <p className="text-slate-400 mb-4">
          Esta ação é irreversível. Todos os seus dados serão permanentemente
          removidos.
        </p>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
          Excluir Minha Conta
        </button>
      </div>

      {/* Legal Links */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Documentos Legais
        </h3>
        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center justify-between text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Política de Privacidade</span>
            <IconComponent name="external-link" size={16} />
          </a>
          <a
            href="#"
            className="flex items-center justify-between text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Termos de Serviço</span>
            <IconComponent name="external-link" size={16} />
          </a>
          <a
            href="#"
            className="flex items-center justify-between text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Política de Cookies</span>
            <IconComponent name="external-link" size={16} />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Configurações
            </h1>
            <p className="text-slate-400">
              Gerencie suas preferências e configurações de conta
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <IconComponent name="x" size={24} />
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <IconComponent name={tab.icon} size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "profile" && renderProfileSettings()}
              {activeTab === "preferences" && renderPreferences()}
              {activeTab === "security" && renderSecurity()}
              {activeTab === "privacy" && renderPrivacy()}
            </motion.div>

            {/* Save/Cancel Buttons */}
            {hasChanges && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-4 mt-8 -mx-4"
              >
                <div className="flex items-center justify-end gap-4">
                  <button
                    onClick={() => setHasChanges(false)}
                    className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
