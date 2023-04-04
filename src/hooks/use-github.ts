import { useContext, useEffect } from 'react';
import axios from 'axios';
import { EnvContext, EnvContextType } from '@/pages/_app';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const useGithub = () => {
  const { ghToken, ghRepository, ghUsername, settings, setFiles } =
    useContext<EnvContextType>(EnvContext);

  const getRepo = async () => {
    try {
      const { data } = await axios.post(`${url}/repository`, {
        ghToken: ghToken || process.env.GITHUB_ACCESS_TOKEN,
        ghRepository: ghRepository || process.env.GITHUB_REPO,
        ghUsername: ghUsername || process.env.GITHUB_USERNAME,
      });
      setFiles(data.data);
    } catch (error) {
      console.log(`Error when getting repository: ${error}`);
    }
  };

  useEffect(() => {
    if (settings) {
      getRepo();
    }
  }, [settings]);

  const getFileContents = async (downloadUrl: string) => {
    try {
      const response = await axios.post(`${url}/file-contents`, {
        downloadUrl,
        ghToken: ghToken || process.env.GITHUB_ACCESS_TOKEN,
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting file contents: ${error}`);
    }
  };

  const getDirectoryContents = async (name: string) => {
    try {
      const response = await axios.post(`${url}/directory-contents`, {
        name,
        ghToken: ghToken || process.env.GITHUB_ACCESS_TOKEN,
        ghRepository: ghRepository || process.env.GITHUB_REPO,
        ghUsername: ghUsername || process.env.GITHUB_USERNAME,
      });
      return response.data;
    } catch (error) {
      console.log(`Error getting directory contents: ${error}`);
    }
  };

  return { getRepo, getFileContents, getDirectoryContents };
};

export { useGithub };
