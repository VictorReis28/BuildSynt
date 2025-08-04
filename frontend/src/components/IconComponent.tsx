import * as LucideIcons from 'lucide-react';
import React from 'react';

interface IconComponentProps {
  name: string;
  size?: number;
  className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({
  name,
  size = 24,
  className = '',
}) => {
  // Mapeamento de nomes customizados para ícones do Lucide
  const iconMap: { [key: string]: string } = {
    react: 'Atom',
    code: 'Code',
    palette: 'Palette',
    server: 'Server',
    smartphone: 'Smartphone',
    sparkles: 'Sparkles',
    search: 'Search',
    bug: 'Bug',
    'file-text': 'FileText',
    'bar-chart': 'BarChart',
    history: 'History',
    bell: 'Bell',
    github: 'Github',
    linkedin: 'Linkedin',
    mail: 'Mail',
    menu: 'Menu',
    x: 'X',
    home: 'Home',
    info: 'Info',
    settings: 'Settings',
    user: 'User',
    'external-link': 'ExternalLink',
    'arrow-right': 'ArrowRight',
    'log-in': 'LogIn',
    'log-out': 'LogOut',
    'user-plus': 'UserPlus',
    'chevron-down': 'ChevronDown',
    sliders: 'Sliders',
    'help-circle': 'HelpCircle',
    shield: 'Shield',
    lock: 'Lock',
    camera: 'Camera',
    monitor: 'Monitor',
    check: 'Check',
  };

  const iconName = iconMap[name] || name;
  const IconElement = (LucideIcons as any)[iconName];

  if (!IconElement) {
    console.warn(`Icon "${name}" (mapped to "${iconName}") not found`);

    return <LucideIcons.HelpCircle size={size} className={className} />;
  }

  return <IconElement size={size} className={className} />;
};

export default IconComponent;
