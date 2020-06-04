/*
    Official Pocket Editor V1 read/save file
    © CopyRight by Pocket Inc. All Rights Reserved.
    http://pocket-inc.ml
    http://github.com/PocketInc

    License: MIT

    Contact: Pocket.Inc.Company@gmail.com
*/

// Importing electronjs dialog, FS (npm), and dialog modules.
const { dialog } = require('electron').remote
const fs = require("fs");
const nDialog = require("dialog");

//this variable will hold the loaded file path to save at same path.
var path = "none";

// Read a File Function..
function readFile() {
  // show open file dialog with property of load a file (not directory..)
    dialog.showOpenDialog({
      properties: ['openFile']
    }).then(result => {
      //on result.. (when client chooses a file)


      //console.log(result.canceled)
      //console.log(result.filePaths)
  
  // Read file choosen in file dialog above via FS module
  fs.readFile(result.filePaths[0], function (err, data) {
    if (err) {
      // on error, send error dialog.
      return nDialog.error(err);
    }
    // if no error found, change textarea value to file contents.
    document.getElementById("file").value = data.toString();
    // save path for later use.
    path = result.filePaths[0];
    
  });
  
  // Synchronous read
  var data = fs.readFileSync(result.filePaths[0]);
    }).catch(err => {
      nDialog.log(err)
    })
  }
  //Save a file function
  function saveFile() {
    // if path given then save file with given path
    if (path !== "none") {
      //get data from textarea
        var data = document.getElementById("file").value;
        //write to file of saved path
    fs.writeFile(path, data, function(err) {
        if(err) {
          //if error. send error Dialog.
            nDialog.info("Error! " + err)
            return console.log(err);
        }
        //otherwise save complete. send to console and Dialog.
        console.log("The file was saved!");
        nDialog.info('Saved to ' + path);
    }); 
}
  }