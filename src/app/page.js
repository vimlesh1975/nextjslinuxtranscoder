'use client';

import { useEffect, useState } from 'react';
import Gallery from './Gallery';

const ApiData = () => {
  const [txt, SetTxt] = useState('');
  const [txt2, SetTxt2] = useState('');
  const [txt3, SetTxt3] = useState('');
  const [txt4, SetTxt4] = useState('');
  const [txt5, SetTxt5] = useState('');


  const startProxy = async () => {
    SetTxt('');
    const response = await fetch('/api/proxy', {
      method: 'GET',
    });
    if (!response.ok) {
      console.log(new Error('Network response was not ok'));
    }
    const jsonData = await response.json();
    SetTxt(jsonData);
  };

  const startThumbnail = async () => {
    SetTxt2('');
    const response = await fetch('/api/thumbnail', {
      method: 'GET',
    });
    if (!response.ok) {
      console.log(new Error('Network response was not ok'));
    }
    const jsonData = await response.json();
    SetTxt2(jsonData);
  };

  const startImageThumbnail = async () => {
    SetTxt3('');
    const response = await fetch('/api/imagethumbnail', {
      method: 'GET',
    });
    if (!response.ok) {
      console.log(new Error('Network response was not ok'));
    }
    const jsonData = await response.json();
    SetTxt3(jsonData);
  };
  const startDurationandSize = async () => {
    SetTxt4('');
    const response = await fetch('/api/durationandsize', {
      method: 'GET',
    });
    if (!response.ok) {
      console.log(new Error('Network response was not ok'));
    }
    const jsonData = await response.json();
    SetTxt4(jsonData);
  };

  const startDeletingLigFiles = async () => {
    SetTxt5('');
    const response = await fetch('/api/deleteLogFiles', {
      method: 'GET',
    });
    if (!response.ok) {
      console.log(new Error('Network response was not ok'));
    }
    const jsonData = await response.json();
    SetTxt5(jsonData);
  };

  useEffect(() => {
    // startTranscoding();
  }, []);

 

  return (
    <div>
      <div>
        <button onClick={startProxy}>Start proxy</button>
        {txt}
      </div>
      <div>
        <button onClick={startThumbnail}>Start Thumbnail</button>
        {txt2}
      </div>
      <div>
        <button onClick={startImageThumbnail}>Start Image Thumbnail</button>
        {txt3}
      </div>
      <div>
        <button onClick={startDurationandSize}>Start Duration and Size</button>
        {txt4}
      </div>

      <div>
        <button onClick={startDeletingLigFiles}>
          Start Deleting log files
        </button>
        {txt5}
      </div>

      <div>
    <Gallery />
      </div>
    </div>
  );
};

export default ApiData;
