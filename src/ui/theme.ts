import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    light: {
      background: '#f0f0f0',
      text: '#2d2d2d',
      // Ajoutez ici d'autres couleurs personnalisées pour le mode clair
    },
    dark: {
      background: '#2d2d2d',
      text: '#f0f0f0',
      // Ajoutez ici d'autres couleurs personnalisées pour le mode sombre
    },
  },
  // Vous pouvez également personnaliser d'autres aspects du thème ici
});

export default theme;
