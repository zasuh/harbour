import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { styled } from '@mui/system';
import SettingsDialog from '@/components/Common/Settings';

const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Harbour - Code Analysis
        </Typography>
        <ToolbarButtons>
          <IconButton
            color="inherit"
            aria-label="settings"
            onClick={() => setOpen(true)}
          >
            <Settings />
          </IconButton>
        </ToolbarButtons>
      </Toolbar>
      <SettingsDialog open={open} onClose={() => setOpen(false)} />
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginLeft: 240,
  width: `calc(100% - ${240}px)`,
}));

const ToolbarButtons = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
}));

export default Header;
