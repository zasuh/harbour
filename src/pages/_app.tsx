import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { useGithub } from '@/hooks/use-github';
import { ThemeProvider } from '@mui/system';
import theme from '@/theme';

export interface EnvContextType {
  ghToken: string;
  setGhToken: Dispatch<SetStateAction<string>>;
  ghUsername: string;
  setGhUsername: Dispatch<SetStateAction<string>>;
  ghRepository: string;
  setGhRepository: Dispatch<SetStateAction<string>>;
  openAiToken: string;
  setOpenAiToken: Dispatch<SetStateAction<string>>;
  setFiles: Dispatch<SetStateAction<any>>;
  files: File[];
  settings: boolean;
  setSettings: Dispatch<SetStateAction<any>>;
}

export interface File {
  name: string;
  download_url: string;
}

export const EnvContext = createContext<EnvContextType>({
  ghToken: '',
  setGhToken: () => {},
  ghUsername: '',
  setGhUsername: () => {},
  ghRepository: '',
  setGhRepository: () => {},
  openAiToken: '',
  setOpenAiToken: () => {},
  files: [],
  setFiles: () => {},
  settings: false,
  setSettings: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [ghToken, setGhToken] = useState<string>('');
  const [ghUsername, setGhUsername] = useState<string>('');
  const [ghRepository, setGhRepository] = useState<string>('');
  const [openAiToken, setOpenAiToken] = useState<string>('');
  const [files, setFiles] = useState<Array<File>>([]);
  const [settings, setSettings] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <EnvContext.Provider
        value={{
          ghToken,
          setGhToken,
          ghUsername,
          setGhUsername,
          ghRepository,
          setGhRepository,
          openAiToken,
          setOpenAiToken,
          files,
          setFiles,
          settings,
          setSettings,
        }}
      >
        <Component {...pageProps} />
      </EnvContext.Provider>
    </ThemeProvider>
  );
}
