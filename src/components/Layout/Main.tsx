import React, { useContext, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { marked } from 'marked';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

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

    const prompt = `${code}`;
    const response = await getChatCompletionWithPrompt(prompt);
    const answer = marked(response);

    setAnswer(answer);
    setLoading(false);
  };

  return (
    <Wrapper>
      <OuterContainer maxWidth="lg">
        <InnerContainer>
          {files.length === 0 ? (
            <Typography variant="body2">
              Follow the instructions in the sidebar to add your Github repo and
              tokens.
            </Typography>
          ) : (
            <StyledBox>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledSyntaxHighlighter language="jsx" style={atomOneLight}>
                    {code}
                  </StyledSyntaxHighlighter>
                </Grid>
                <Grid item xs={12} sm={6} style={{ height: '60vh' }}>
                  <div>
                    <StyledTypography variant="body2">
                      Select a repository in the sidebar. Then select a file and
                      click the button to get an analysis.
                    </StyledTypography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={onPrompt}
                        disabled={loading}
                      >
                        Advice pls
                      </StyledButton>
                      <StyledTypography variant="body2">
                        Selected file: <strong>{file}</strong>
                      </StyledTypography>
                    </div>
                  </div>
                  {loading && (
                    <LoaderWrapper>
                      <CircularProgress />
                    </LoaderWrapper>
                  )}
                  {answer !== '' && (
                    <AnswerWrapper>
                      <StyledTypography variant="body1">
                        <div dangerouslySetInnerHTML={{ __html: answer }} />
                      </StyledTypography>
                    </AnswerWrapper>
                  )}
                </Grid>
              </Grid>
            </StyledBox>
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
  marginTop: 48,
  height: '100vh',
}));

const OuterContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  margin: 30,
  width: '100%',
}));

const InnerContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  gap: 20,
}));

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px',
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  width: 1200,
}));

const StyledTypography = styled(Typography)(() => ({
  marginBottom: '16px',
  fontFamily: 'Roboto, sans-serif',
  color: '#666',
  '& strong': {
    fontWeight: 900,
    color: '#333',
  },
}));

const StyledButton = styled(Button)(() => ({
  marginRight: 16,
  marginBottom: 16,
}));

const AnswerWrapper = styled('div')(() => ({
  height: '60vh',
  overflowY: 'auto',
}));

const LoaderWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '16px',
}));

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(() => ({
  flexBasis: '100%',
  borderRadius: '8px',
  height: '70vh',
  overflowY: 'auto',
}));

export default Main;
