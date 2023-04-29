import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
    >
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        aria-label="Toggle dark mode"
        borderRadius="full"
        _hover={{
          transform: 'rotate(360deg)',
          transition: 'transform 0.6s ease-in-out',
        }}
      />
    </Box>
  );
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === 'light' ? 'light.background' : 'dark.background'}
      color={colorMode === 'light' ? 'light.text' : 'dark.text'}
      minH="100vh"
    >
      <DarkModeToggle />
      {children}
    </Box>
  );
};

export default Layout;
