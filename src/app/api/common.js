import fs from 'fs';

export const deleteAFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      // console.log(filePath + ' deleted successfully');
    }
  });
};

export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60); // Remove milliseconds

  // Pad single-digit minutes and seconds with a leading zero
  const formattedTime = `${h}:${m < 10 ? '0' : ''}${m}:${
    s < 10 ? '0' : ''
  }${s}`;
  return formattedTime;
}
