import React, { useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { EnvContext, EnvContextType } from '@/pages/_app';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog = ({
  open,
  onClose,
}: SettingsDialogProps): JSX.Element => {
  const {
    ghToken,
    setGhToken,
    ghUsername,
    setGhUsername,
    ghRepository,
    setGhRepository,
    openAiToken,
    setOpenAiToken,
    setSettings,
  } = useContext<EnvContextType>(EnvContext);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle style={{ backgroundColor: '#133651' }}>Settings</DialogTitle>
      <DialogContent style={{ backgroundColor: '#133651' }}>
        <TextField
          autoFocus
          margin="dense"
          label="OpenAI Key"
          type="password"
          value={openAiToken}
          onChange={(e) => setOpenAiToken(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="GitHub Token"
          type="password"
          value={ghToken}
          onChange={(e) => setGhToken(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="GitHub Username"
          type="text"
          value={ghUsername}
          onChange={(e) => setGhUsername(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          label="GitHub Repository"
          type="text"
          value={ghRepository}
          onChange={(e) => setGhRepository(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions style={{ backgroundColor: '#133651' }}>
        <Button onClick={() => onClose()} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setSettings(true);
            onClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
