import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Layout/Header';
import RepoDrawer from '@/components/Layout/Drawer';
import Main from '@/components/Layout/Main';

const Home = () => {
  const [code, setCode] = useState<string>('');
  const [file, setFile] = useState<string>('');

  return (
    <>
      <Head>
        <title>Harbour</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header file={file} />
      <RepoDrawer
        onSetCode={(code: string) => setCode(code)}
        onSetFile={(file: string) => setFile(file)}
      />
      <Main code={code} />
    </>
  );
};

export default Home;
