import React, { Component, useContext } from 'react';
import { Button } from 'theme-ui';
import { useSlateStatic, ReactEditor } from 'slate-react';
import { Amplify, API, withSSRContext, Storage } from 'aws-amplify';

import { updatePost } from '../../src/graphql/mutations';
import { UpdatePostMutation } from '../../src/API';
import { MyContext } from '../MyContext';

const updateImages = async ({ post, secureUrl, setUploadedImages }) => {
  if (!post) {
    return;
  }
	const existingImages = JSON.parse(post.images)
  const images = existingImages ? existingImages : []

  images.push({ secureUrl });
  console.log(images);
	setUploadedImages(images)

  const results = await API.graphql({
    authMode: 'AMAZON_COGNITO_USER_POOLS',
    query: updatePost,
    variables: {
      input: {
        id: post.id,
        title: post.title,
        images: JSON.stringify(images),
        // content: form.get('content'),
        // components: JSON.stringify(editor.children),
      },
    },
  });
  console.log(results);
  return results;
};

const CloudinaryUploadWidget = ({ post, setUploadedImages}) => {
  const cloudName = 'hzxyensd5';
  const uploadPreset = 'aoh4fpwm';

  var myWidget = window.cloudinary.createUploadWidget(
    {
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
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info);
        updateImages({ post: post, secureUrl: result.info.secure_url, setUploadedImages: setUploadedImages });

        // document
        //   .getElementById('uploadedimage')
        //   .setAttribute('src', result.info.secure_url);
      }
      document.getElementById('upload_widget').addEventListener(
        'click',
        function () {
          myWidget.open();
        },
        false
      );
    }
  );

  return (
    <Button id='upload_widget' className='cloudinary-button'>
      Upload
    </Button>
  );
};

export default CloudinaryUploadWidget;
