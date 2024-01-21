'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';


const width = 300
const height = 200
const Gallery = () => {

  const [media, setMedia] = useState([])


  const getMedia = async () => {
    const response = await fetch('/api/getmedia', {
      method: 'GET',
    });
    if (!response.ok) {
      console.log(new Error('Network response was not ok'));
    }
    const jsonData = await response.json();
    console.log(jsonData)
    setMedia(jsonData);
  }

  useEffect(() => {
    getMedia()
  }, []);

  return (
    <div>
      {(media?.urls)?.map((element, i) => (
        <div key={i} style={{display:'flex'}}>
          <div  style={{width:370, height:250, border:'2px solid red', margin:10}}>
            <div>{media.media[i].MediaID}</div>
            {(media.media[i].MediaType).toUpperCase() === 'VIDEO' ? <video src={media.videoUrls[i]} width={width} height={height} controls /> : <Image src={element} alt='' width={width} height={height} style={{ border: '2px solid black' }} />}
          <div>size:{(media.media[i].FileSize/1000000).toFixed(1)}MB Duration:{media.media[i].Duration}</div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Gallery


