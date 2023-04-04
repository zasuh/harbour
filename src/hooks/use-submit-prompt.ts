import { useContext } from 'react';
import axios from 'axios';
import { EnvContext, EnvContextType } from '@/pages/_app';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const useSubmitPrompt = () => {
  const { openAiToken } = useContext<EnvContextType>(EnvContext);

  const getChatCompletionWithPrompt = async (prompt: string) => {
    try {
      const { data } = await axios.post(`${url}/completion`, {
        prompt,
        openAiToken: openAiToken || process.env.OPENAI_API_KEY,
      });
      return data.data;
    } catch (error) {
      console.error(`Error when submitting prompt: ${error}`);
    }
  };

  return { getChatCompletionWithPrompt };
};

export { useSubmitPrompt };
