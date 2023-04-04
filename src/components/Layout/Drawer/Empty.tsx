import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const Empty = () => {
  return (
    <Wrapper>
      <Emoji>👻</Emoji>
      <Typography variant="subtitle1" align="center">
        Please add a Github repository, Github access token and OpenAI token to
        start using Harbour. You can do so in the settings dialog.
      </Typography>
    </Wrapper>
  );
};

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(2),
}));

const Emoji = styled('span')(({ theme }) => ({
  fontSize: '5rem',
  marginBottom: theme.spacing(2),
}));

export default Empty;
