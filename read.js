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

//this variable will hold the loaded file path to save at same path.
var path = "none";

// Read a File Function..
function readFile() {
  // show open file dialog with property of load a file (not directory..)
    dialog.showOpenDialog({
      properties: ['openFile']
    }).then(result => {
      if (result.canceled) return;
      //on result.. (when client chooses a file)


      //console.log(result.canceled)
      //console.log(result.filePaths)
  
  // Read file choosen in file dialog above via FS module
  fs.readFile(result.filePaths[0], function (err, data) {
    if (err) {
      // on error, send error dialog.
      return dialog.showErrorBox("Error Occured!", err + "\n\nhttp://pocket-inc.ml/support")

    }
    // if no error found, change textarea value to file contents.
    document.getElementById("file").value = data.toString();
    // save path for later use.
    path = result.filePaths[0];
    
  });
  
 
    }).catch(err => {
      return dialog.showErrorBox("Error Occured!", err + "\n\nhttp://pocket-inc.ml/support")
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
          dialog.showErrorBox("Error Occured!", err + "\n\nhttp://pocket-inc.ml/support")

            return console.log(err);
        }
        //otherwise save complete. send to console and Dialog.
        console.log("The file was saved!");
        dialog.showMessageBox({title:"Save Successful", message:"File saved to path: " + path,icon:"icon.png"})
      }); 
} else {
  dialog.showSaveDialog({
    properties: ['openFile']
  }).then(result => {
    if (result.canceled) return;
    var newPath = result.filePath;
    var data = document.getElementById("file").value;
    //write to file of saved path
fs.writeFile(newPath, data, function(err) {
    if(err) {
      //if error. send error Dialog.
      dialog.showErrorBox("Error Occured!", err + "\n\nhttp://pocket-inc.ml/support")

        return console.log(err);
    }
    //otherwise save complete. send to console and Dialog.
    console.log("The file was saved!");
   dialog.showMessageBox({title:"Save Successful", message:"File saved to path: " + newPath,icon:"icon.png"})
}); 
      }).catch(err => {
        dialog.showErrorBox("Error Occured!", err + "\n\nhttp://pocket-inc.ml/support")

      })
}
  }
function newFile() {
  document.getElementById("file").value = "";
  path = "none";
  let myNotification = new Notification('Pocket Editor', {
    body: 'New File created successfully!',
    icon: 'icon.ico'
  })
  
}