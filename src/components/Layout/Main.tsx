import React, { useContext, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { marked } from 'marked';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atelierSulphurpoolDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { EnvContext } from '@/pages/_app';
import { useSubmitPrompt } from '@/hooks/use-submit-prompt';
import theme from '@/theme';

interface MainProps {
  code: string;
}

interface Assessment {
  id: number;
  title: string;
  value: string;
}

const ASSESSMENTS: Assessment[] = [
  {
    id: 1,
    title: 'Best Practices',
    value: 'best_practices',
  },
  {
    id: 2,
    title: 'Functions',
    value: 'functions',
  },
  {
    id: 3,
    title: 'Write a Unit Test',
    value: 'unit_tests',
  },
];

const Main = ({ code }: MainProps): JSX.Element => {
  const { files } = useContext(EnvContext);
  const { getChatCompletionWithPrompt } = useSubmitPrompt();
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>('');
  const [assessments, setAssessments] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof assessments>) => {
    const {
      target: { value },
    } = event;
    setAssessments(typeof value === 'string' ? value.split(',') : value);
  };

  const onPrompt = async () => {
    setLoading(true);
    setAnswer('');

    const prompt = `${code}`;
    const response = await getChatCompletionWithPrompt(prompt, assessments);
    const answer = marked(response);

    setAnswer(answer);
    setLoading(false);
  };

  return (
    <Wrapper>
      <OuterContainer maxWidth="lg">
        <InnerContainer>
          {files.length === 0 ? (
            <Typography color={theme.palette.text.primary}>
              Follow the instructions in the sidebar to add your Github repo and
              tokens.
            </Typography>
          ) : (
            <StyledBox>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledSyntaxHighlighter
                    language="jsx"
                    style={atelierSulphurpoolDark}
                  >
                    {code}
                  </StyledSyntaxHighlighter>
                </Grid>
                <Grid item xs={12} sm={6} style={{ height: '60vh' }}>
                  <div>
                    <Typography
                      color={theme.palette.text.primary}
                      variant="body2"
                    >
                      Select a repository in the sidebar. Then select a file and
                      click the button to get an analysis.
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 16,
                      }}
                    >
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Select Assessments</InputLabel>
                        <Select
                          id="multiple-checkbox"
                          multiple
                          value={assessments}
                          onChange={handleChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 48 * 12,
                                width: 250,
                                color: 'black',
                              },
                            },
                          }}
                        >
                          {ASSESSMENTS.map((a) => (
                            <MenuItem key={a.id} value={a.value}>
                              <Checkbox
                                style={{ color: 'black' }}
                                checked={assessments.indexOf(a.value) > -1}
                              />
                              <ListItemText primary={a.title} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div>
                        <StyledButton
                          variant="contained"
                          color="primary"
                          onClick={onPrompt}
                          disabled={loading}
                        >
                          Advice pls
                        </StyledButton>
                      </div>
                    </div>
                  </div>
                  {loading && (
                    <LoaderWrapper>
                      <CircularProgress />
                    </LoaderWrapper>
                  )}
                  {answer !== '' && (
                    <AnswerWrapper>
                      <div dangerouslySetInnerHTML={{ __html: answer }} />
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
  marginTop: 24,
  height: 'calc(100vh - 24px)',
  backgroundColor: '#092D48',
}));

const OuterContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  margin: 30,
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
  margin: 16,
  padding: 16,
  height: '100%',
  width: 1200,
}));

const StyledTypography = styled(Typography)(() => ({
  marginBottom: 16,
  fontFamily: 'Roboto, sans-serif',
  color: '#FFFFFF',
  '& strong': {
    fontWeight: 900,
    color: '#FFFFFF',
  },
}));

const StyledButton = styled(Button)(() => ({
  marginRight: 16,
  marginBottom: 16,
}));

const AnswerWrapper = styled('div')(() => ({
  maxHeight: '100%',
  overflowY: 'auto',
  color: '#FFFFFF',
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
