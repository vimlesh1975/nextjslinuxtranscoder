import excuteQuery from '../db';
import {  getObjectUrl } from '../uploadToS3';
const thumbnail1location = process.env.thumbnail1location1;
const proxy1location = process.env.proxy1location1;


export async function GET(req, res) {
    const response1= await excuteQuery({
        query:
          "SELECT * FROM  media  ORDER BY MediaUploadedTime DESC",
      }); 
      const urls=await Promise.all(response1.map(element => getObjectUrl(thumbnail1location + element.MediaID +'_th1.jpg')));
      const videoUrls=await Promise.all(response1.map(element => getObjectUrl(proxy1location + element.MediaID +'_proxy1.mp4')));
    const response = new Response(JSON.stringify({media:response1, urls,videoUrls }));
    return response;
  }
  