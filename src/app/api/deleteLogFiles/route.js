const fs = require('fs');
const path = require('path');
var cron = require('node-cron');

// const logpath = 'path/to/your/directory'; // Replace this with the path to the directory containing the files
const logpath = process.env.logpath1;
// Calculate the timestamp for 8 hours ago
// const eightHoursAgo = Date.now() - 8 * 60 * 60 * 1000;

// Read the files in the directory
const deleteFiles = (minutes) => {
  const minutesAgo = Date.now() - minutes * 60 * 1000;

  fs.readdir(logpath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }

    // Iterate over the files
    files.forEach((file) => {
      const filePath = path.join(logpath, file);

      // Get file stats (including the last modification time)
      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error(
            `Error getting file stats for ${filePath}: ${statErr.message}`
          );
          return;
        }

        // Compare the last modification time with the timestamp for 8 hours ago
        if (stats.mtime.getTime() < minutesAgo) {
          // If the file is older than 8 hours, delete it
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(
                `Error deleting file ${filePath}: ${unlinkErr.message}`
              );
            } else {
              console.log(`File deleted: ${filePath}`);
            }
          });
        }
      });
    });
  });
};

const dd = cron.schedule('* * * * *', () => deleteFiles(60));
export async function GET(req, res) {
  deleteFiles(60);
  const response = new Response(JSON.stringify('file deletion Started'));
  return response;
}
