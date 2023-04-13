import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  CircularProgress,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ArrowBack } from '@mui/icons-material';
import { EnvContext, EnvContextType } from '@/pages/_app';
import { useGithub } from '@/hooks/use-github';
import { styled } from '@mui/system';
import fileIcon from '@/assets/file.svg';
import folderIcon from '@/assets/folder.svg';
import logo from '@/assets/logo_white.svg';
import Empty from './Empty';

interface RepoDrawerProps {
  onSetCode: (code: string) => void;
  onSetFile: (file: string) => void;
}

interface File {
  name: string;
  download_url: string;
}

const RepoDrawer = ({ onSetCode, onSetFile }: RepoDrawerProps): JSX.Element => {
  const { files, setFiles } = useContext<EnvContextType>(EnvContext);
  const { getRepo, getFileContents, getDirectoryContents } = useGithub();
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [history, setHistory] = useState<Array<string>>(['root']);

  useEffect(() => {
    const fetchDirectoryContents = async () => {
      try {
        const path = history.reduce(
          (acc, curr, index) => (index === 0 ? acc : `${acc}/${curr}`),
          ''
        );
        setLoading(true);

        const { data } = await getDirectoryContents(path);

        setLoading(false);
        setFiles(data);
      } catch (error) {
        console.error('Error while fetching repo directory!');
      }
    };

    if (history.length > 1) {
      fetchDirectoryContents();
    }
  }, [history]);

  const onItem = async (file: File) => {
    if (!file.download_url) {
      setHistory((prev) => [...prev, file.name]);
    } else {
      const { data } = await getFileContents(file.download_url);
      onSetCode(data);
      onSetFile(file.name);
    }
  };

  const onBack = async () => {
    try {
      setLoading(true);
      const files = await getRepo();
      setHistory((prev) => prev.slice(0, -1));
      setLoading(false);
    } catch (error) {
      console.error(`Error getting repo: ${error}`);
    }
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: 240,
          borderRight: '2px solid #133651',
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <LogoWrapper>
        <Image src={logo} alt="logo" height={50} width={150} />
      </LogoWrapper>
      {files && files.length === 0 ? (
        <Empty />
      ) : loading ? (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      ) : (
        <List component="nav">
          {history[history.length - 1] !== 'root' ? (
            <ListItem button onClick={() => onBack()}>
              <ListItemIcon>
                <ArrowBack style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={history[history.length - 1]} />
            </ListItem>
          ) : (
            <ListItem button onClick={() => setIsOpen(!isOpen)}>
              <ListItemIcon>
                {isOpen ? (
                  <ExpandLess style={{ color: 'white' }} />
                ) : (
                  <Image
                    alt="Folder logo"
                    src={fileIcon}
                    width={20}
                    height={20}
                  />
                )}
              </ListItemIcon>
              <ListItemText primary="Repository" />
            </ListItem>
          )}
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {files.map((file) => (
                <ListItem button key={file.name} onClick={() => onItem(file)}>
                  <ListItemIcon>
                    {file.download_url ? (
                      <Image
                        alt="Folder logo"
                        src={fileIcon}
                        width={20}
                        height={20}
                      />
                    ) : (
                      <Image
                        alt="Folder logo"
                        src={folderIcon}
                        width={20}
                        height={20}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      )}
    </Drawer>
  );
};

const LoaderWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 16,
}));

const LogoWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 7,
}));

export default RepoDrawer;
