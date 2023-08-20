import React from 'react';
import { Button } from 'theme-ui';

import { PostSaveImages } from '../actions/PostSave';

const updateImages = async ({
  postId,
  newImage,
  setUploadedImages,
  images,
}) => {
  images.push(newImage);
  console.log(images);
  setUploadedImages(images);

  PostSaveImages({ postId, images });
};

const uploadSettings = {
  cloudName: 'dprifih4o',
  uploadPreset: 'epcsmymp',
  cropping: true, //add a cropping step
  // showAdvancedOptions: true,  //add advanced options (public_id and tag)
  sources: ['local', 'url'], // restrict the upload sources to URL and local files
  // multiple: false,  //restrict upload to a single file
  folder: 'user_images', //upload files to the specified folder
  // tags: ["users", "profile"], //add the given tags to the uploaded files
  context: { alt: 'user_uploaded' }, //add the given context data to the uploaded files
  clientAllowedFormats: ['jpg', 'png', 'jpeg'], //restrict uploading to image files only
  // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
  // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
  // theme: "purple", //change to a purple theme
};

const CloudinaryUploadWidget = ({ postId, images, setUploadedImages }) => {
  const uploadWidget = window.cloudinary.createUploadWidget(
    uploadSettings,
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
        updateImages({
          postId: postId,
          newImage: result.info,
          setUploadedImages: setUploadedImages,
          images: images ? images : [],
        });
      }
    }
  );

  return <Button onClick={() => uploadWidget.open()}>Upload</Button>;
};

export default CloudinaryUploadWidget;
