import React, { useContext, useState } from 'react';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { marked } from 'marked';
import { EnvContext } from '@/pages/_app';
import { useSubmitPrompt } from '@/hooks/use-submit-prompt';

interface MainProps {
  code: string;
  file: string;
}

const Main = ({ code, file }: MainProps): JSX.Element => {
  const { files } = useContext(EnvContext);
  const { getChatCompletionWithPrompt } = useSubmitPrompt();
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>('');

  const onPrompt = async () => {
    setLoading(true);
    setAnswer('');

    const prompt = `###${code}###`;
    const response = await getChatCompletionWithPrompt(prompt);
    const answer = marked(response);

    setAnswer(answer);
    setLoading(false);
  };

  return (
    <Wrapper>
      <OuterContainer>
        <InnerContainer maxWidth="md">
          {files.length === 0 ? (
            <Typography variant="body2">
              Follow the instructions in the sidebar to add your Github repo and
              tokens.
            </Typography>
          ) : (
            <>
              <Typography variant="body2">
                Select a repository in the sidebar. Then select a file and click
                the button to get an analysis.
              </Typography>
              <Typography variant="body2">
                Selected file: <strong>{file}</strong>
              </Typography>
              <Button variant="contained" color="primary" onClick={onPrompt}>
                Advice pls
              </Button>
              {loading && <CircularProgress />}
              {answer !== '' && (
                <Typography variant="body1">
                  <div dangerouslySetInnerHTML={{ __html: answer }} />
                </Typography>
              )}
            </>
          )}
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  );
};

const Wrapper = styled('main')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 240,
  marginTop: 64,
}));

const OuterContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  margin: 30,
}));

const InnerContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  gap: 20,
}));

export default Main;
