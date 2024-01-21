import excuteQuery from '../db';
import { getObjectUrl } from '../uploadToS3';

import ffmpeg from 'fluent-ffmpeg';

import { formatTime } from '../common';
var cron = require('node-cron');
const originallocation = process.env.originallocation1;
//ffmpeg.setFfmpegPath(process.env.ffprobepath1);

var videoFiles = [];

async function getMetadata(MediaID, MediaExt) {
  const file = MediaID + MediaExt;
  const videoPath = await getObjectUrl(originallocation + file);

  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata);
      }
    });
  });
}

const query_getMetadata = async () => {
  if (videoFiles.length === 0) {
    const mediaForProxy = await excuteQuery({
      query:
        "SELECT * FROM  media where (Duration is  NULL or Duration='') and UploadStatus=1 and (MediaType='Video' or MediaType='image') ORDER BY MediaUploadedTime DESC",
    });
    mediaForProxy.forEach((element) => {
      videoFiles.push(element.FILENAMEASUPLOADED);
    });

    for (const { MediaID, MediaExt } of mediaForProxy) {
      const file = MediaID + MediaExt;
      try {
        const metaData = await getMetadata(MediaID, MediaExt);
        const duration = isNaN(metaData.format.duration)
          ? '0:00:00'
          : formatTime(metaData.format.duration);
        const size = metaData.format.size;
        console.log(duration, size);

        // udpadte database to proxyready='1' and fill the name of proxy file

        await excuteQuery({
          query: `update media Set Duration='${duration}', FileSize='${size}' where MediaID='${MediaID}'`,
        });
      } catch (error) {
        console.error(
          error.message || `An error occurred during transcoding of ${file}`
        );
      }
    }
    videoFiles = [];
  }
};

const dd = cron.schedule('* * * * *', () => {
  query_getMetadata();
});

export async function GET(req, res) {
  query_getMetadata();
  const response = new Response(JSON.stringify('Duration and Size Started'));
  return response;
}
