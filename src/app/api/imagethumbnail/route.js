import { spawn } from 'child_process';
import excuteQuery from '../db';
import { uploadToS3, getObjectUrl } from '../uploadToS3';
import fs from 'fs';
import { deleteAFile } from '../common';

var cron = require('node-cron');
const thumbnail1location = process.env.thumbnail1location1;
const thumbnail2location = process.env.thumbnail2location1;

const logpath = process.env.logpath1;

const ffmpegpath = process.env.ffmpegpath1;

const originallocation = process.env.originallocation1;

var videoFiles = [];

async function makeThumbnail(MediaID, MediaExt) {
  const file = MediaID + MediaExt;
  console.log(
    `Starting thumbnail of ${file} at ${
      new Date().getMinutes() + ':' + new Date().getSeconds()
    }`
  );
  const outputLogStream = fs.createWriteStream(
    logpath + MediaID + '_th1_imagefile.log'
  );
  const file1 = await getObjectUrl(originallocation + file);
  return new Promise((resolve, reject) => {
    const ffmpegCommand = spawn(ffmpegpath, [
      '-i',
      file1,
      '-ss',
      '00:00:00.000',
      '-vframes:v',
      '1',
      '-s',
      '320x180',
      '-y',
      logpath + MediaID + '_th1.jpg',
    ]);

    ffmpegCommand.stderr.on('data', (data) => {
      outputLogStream.write(data.toString());
    });

    ffmpegCommand.on('close', (code) => {
      outputLogStream.end();
      if (code === 0) {
        console.log(
          `completed thumbnail of ${file} at ${
            new Date().getMinutes() + ':' + new Date().getSeconds()
          }`
        );
        console.log(`----------------------------`);
        resolve();
      } else {
        console.error(`Transcoding ${file} failed with exit code ${code}`);
        reject(new Error(`Transcoding ${file} failed with exit code ${code}`));
      }
    });
  });
}
async function makeThumbnail2(MediaID, MediaExt) {
  const file = MediaID + MediaExt;
  console.log(
    `Starting thumbnail2 of ${file} at ${
      new Date().getMinutes() + ':' + new Date().getSeconds()
    }`
  );
  const outputLogStream = fs.createWriteStream(
    logpath + MediaID + '_th2_imagefile.log'
  );
  const file1 = await getObjectUrl(originallocation + file);
  return new Promise((resolve, reject) => {
    const ffmpegCommand = spawn(ffmpegpath, [
      '-i',
      file1,
      '-ss',
      '00:00:00.000',
      '-vframes:v',
      '1',
      '-s',
      '80x45',
      '-y',
      logpath + MediaID + '_th2.jpg',
    ]);

    ffmpegCommand.stderr.on('data', (data) => {
      outputLogStream.write(data.toString());
    });

    ffmpegCommand.on('close', (code) => {
      outputLogStream.end();
      if (code === 0) {
        console.log(
          `completed thumbnalil2 of ${file} at ${
            new Date().getMinutes() + ':' + new Date().getSeconds()
          }`
        );
        console.log(`----------------------------`);
        resolve();
      } else {
        console.error(`Transcoding ${file} failed with exit code ${code}`);
        reject(new Error(`Transcoding ${file} failed with exit code ${code}`));
      }
    });
  });
}

const query_makeThumbnail_UploadtoS3_Delete = async () => {
  if (videoFiles.length === 0) {
    const mediaForThumbnail = await excuteQuery({
      query:
        "SELECT * FROM  media where  (ThumbnailBig is  NULL or ThumbnailBig='') and UploadStatus=1 and MediaType='IMAGE'",
    });
    mediaForThumbnail.forEach((element) => {
      videoFiles.push(element.FILENAMEASUPLOADED);
    });

    for (const { MediaID, MediaExt } of mediaForThumbnail) {
      const file = MediaID + MediaExt;
      try {
        await makeThumbnail(MediaID, MediaExt);

        await makeThumbnail2(MediaID, MediaExt);

        await uploadToS3(
          thumbnail1location + MediaID + '_th1.jpg',
          logpath + MediaID + '_th1.jpg'
        );
        await uploadToS3(
          thumbnail2location + MediaID + '_th2.jpg',
          logpath + MediaID + '_th2.jpg'
        );
        deleteAFile(logpath + MediaID + '_th1.jpg');
        deleteAFile(logpath + MediaID + '_th2.jpg');

        // udpadte database to proxyready='1' and fill the name of proxy file
        await excuteQuery({
          query: `update media Set ThumbnailBig='${MediaID}_th1', ThumbnailSmall='${MediaID}_th2' where MediaID='${MediaID}'`,
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

const dd = cron.schedule('* * * * *', () =>
  query_makeThumbnail_UploadtoS3_Delete()
);

export async function GET(req, res) {
  query_makeThumbnail_UploadtoS3_Delete();
  const response = new Response(
    JSON.stringify('thumbnail Transcoding Started')
  );
  return response;
}
