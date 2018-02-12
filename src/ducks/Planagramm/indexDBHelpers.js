function ReadFile(currentFile) {
  let reader = {
    progress: function(e) {
      //Useful for notifying the user
    },

    success: function(e) {
      //File processed, e.target.result contains the array buffer

      currentFile.arrayBuffer = e.target.result;

      reader.complete();
    },

    error: function(e) {
      let item = e;

      //Handle the error properly

      reader.complete();
    },

    complete: function() {
      //Pull out some information about the file

      let currentFileJson = {
        name: currentFile.name,

        type: currentFile.type,

        size: currentFile.size,

        lastModified: currentFile.lastModifiedDate,

        arrayBuffer: currentFile.arrayBuffer
      };

      //Store the file using our storageDB letiable (see snippet 2)

      storageDB.set(currentFileJson);
    }
  };

  //Create a new file reader and setup events

  //use the readAsArrayBuffer to read in the contents of the file

  let myfileReader = new FileReader();

  myfileReader.onprogress = reader.progress;

  myfileReader.onload = reader.success;

  myfileReader.onerror = reader.error;

  myfileReader.readAsArrayBuffer(currentFile);
}

function HandleFileUpload(event) {
  let oFileArray = event.currentTarget.files;

  if (oFileArray != null && oFileArray.length > 0) {
    for (let i = 0; i < oFileArray.length; i++) {
      ReadFile(oFileArray[i]);
    }
  }
}

//Add a handler for the file input on change event

// myBestPalIsFileReader.onchange = HandleFileUpload;

//Setup some useful parameters

let dbName = "Files",
  storeName = "FileStore",
  database,
  dbReady = false;

export let storageDB = {
  init: function() {
    // indexedDB is not part of HTML5 so need vendor specifics so that we can use across browsers

    if (!window.indexedDB) {
      alert("What?! No IndexedDB?");
    }

    try {
      // Create new database with name and version

      let request = window.indexedDB.open(dbName, 1);

      request.onerror = function(event) {
        //Handle the error, notify the user, provide fallback using localStorage?
      };

      request.onsuccess = function(event) {
        //Store our new database into a letiable we can access later

        database = request.result;

        dbReady = true;
      };

      //onUpgradeNeeded is fired if the version is changed, so if you want to make

      //schema changes then add them in here and increased your version number

      request.onupgradeneeded = function(event) {
        let db = event.target.result;

        //We are using "id" as the identifier for the object and

        //allowing the database to keep track of this for us by using autoIncrement: true

        let objectStore = db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true
        });
      };
    } catch (Error) {}
  },

  set: function(value) {
    //Use our database parameter set earlier along with our store name

    //Create transaction and use this to access the object store

    let transaction = database.transaction([storeName], "readwrite");

    let objectStore = transaction.objectStore(storeName);

    let request = objectStore.put(value);

    request.onsuccess = function(event) {
      let item = event;

      value.id = event.target.result;

      alert("File Stored, ID: " + value.id);
    };

    request.onerror = function(event) {
      // Handle the error
    };
  },

  get: function(Id) {
    //Retrieve an object by its Id, methods can be chained for shorter scripts

    // Создаётся объект promise
    let promise = new Promise((resolve, reject) => {
      let request = database
        .transaction([storeName], "readwrite")
        .objectStore(storeName)
        .get(Id);

      request.onsuccess = function(event) {
        let item = event.target.result;
        console.log("item img ->", item);
        resolve(item);
      };
    });

    return promise;
  }
};

// Call to setup the database<

storageDB.init();
