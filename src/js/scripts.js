//
// Scripts
// 
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./path/to/serviceAccountKey.json');
// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// sample-metadata:
//   title: Storage Download Public File.
//   description: Download Public File.
//   usage: node downloadPublicFile.js <BUCKET_NAME> <SRC_FILE_NAME> <DEST_FILE_NAME>

const path = require('path');
const cwd = path.join(__dirname, '..');

function main(
  bucketName = 'my-bucket',
  srcFileName = 'test.txt',
  destFileName = path.join(cwd, 'downloaded.txt')
) {
  // [START storage_download_public_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // The ID of your GCS bucket
  // const bucketName = 'your-unique-bucket-name';

  // The ID of your GCS file
  // const srcFilename = 'your-file-name';

  // The path to which the file should be downloaded
  // const destFileName = '/local/path/to/file.txt';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function downloadPublicFile() {
    const options = {
      destination: destFileName,
    };

    // Download public file.
    await storage.bucket(bucketName).file(srcFileName).download(options);

    console.log(
      `Downloaded public file ${srcFileName} from bucket name ${bucketName} to ${destFileName}`
    );
  }

  downloadPublicFile().catch(console.error);
  // [END storage_download_public_file]
}
main(...process.argv.slice(2));

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: '<BUCKET_NAME>.appspot.com'
});

const bucket = getStorage().bucket();

var upload = (localFile, remoteFile) => {

  let uuid = UUID();

  return bucket.upload(localFile, {
        destination: remoteFile,
        uploadType: "media",
        metadata: {
          contentType: 'image/png',
          metadata: {
            firebaseStorageDownloadTokens: uuid
          }
        }
      })
      .then((data) => {

          let file = data[0];

          return Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid);
      });
}
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
