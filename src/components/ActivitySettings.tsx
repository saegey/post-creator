import { Box, Flex, Text, Input, Button, Label, Spinner } from 'theme-ui';
import React from 'react';
import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { PostContext } from './PostContext';
import { EditorContext } from './EditorContext';
import { UpdatePostMutation, DeletePostMutation } from '../../src/API';
import StandardModal from './StandardModal';
import { updatePost, deletePost } from '../../src/graphql/mutations';

const ActivitySettings = ({ isOpen, setIsOpen, setSavedMessage }) => {
  const {
    id,
    stravaUrl,
    gpxFile,
    setCurrentFtp,
    currentFtp,
    setStravaUrl,
    title,
    setTitle,
    postLocation,
    setPostLocation,
    setDate,
    date,
    subhead,
    setSubhead,
  } = React.useContext(PostContext);

  const { setIsFtpUpdating, setIsGpxUploadOpen } =
    React.useContext(EditorContext);

  const [isSaving, setIsSaving] = React.useState(false);

  const processDeletePost = async (event) => {
    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        variables: {
          input: {
            id: id,
          },
        },
        query: deletePost,
      })) as GraphQLResult<DeletePostMutation>;
      window.location.href = `/posts`;
    } catch (errors) {
      console.error(errors);
    }
  };

  const saveSettings = async (event) => {
    setIsSaving(true);
    const form = new FormData(event.target);
    const newFtp = form.get('currentFtp') as string;
    if (newFtp !== currentFtp) {
      setIsFtpUpdating(true);
    }

    setCurrentFtp(newFtp);
    setStravaUrl(form.get('stravaLink') as string);
    setTitle(form.get('title') as string);
    setPostLocation(form.get('postLocation') as string);
    setDate(form.get('eventDate') as string);
    setSubhead(form.get('subhead') as string);

    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            stravaUrl: form.get('stravaLink'),
            currentFtp: form.get('currentFtp'),
            title: form.get('title'),
            subhead: form.get('subhead'),
            postLocation: form.get('postLocation'),
            date: form.get('eventDate'),
            id: id,
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;

      setSavedMessage(true);
      setIsSaving(false);
      setIsOpen(false);
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <StandardModal isOpen={isOpen} setIsOpen={setIsOpen} title={'Settings'}>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          saveSettings(event).then(() => console.log('save settings'));
        }}
      >
        <Flex
          sx={{
            gap: '15px',
            flexDirection: 'column',
            // maxHeight: ['75vh', '400px', '400px'],
            overflow: 'scroll',
            paddingTop: '10px',
          }}
        >
          <Box>
            <Label htmlFor='title' variant={'defaultLabel'}>
              Title
            </Label>
            <Input
              id='title'
              name='title'
              defaultValue={title ? title : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='title' variant={'defaultLabel'}>
              Subhead
            </Label>
            <Input
              id='subhead'
              name='subhead'
              defaultValue={subhead ? subhead : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='postLocation' variant={'defaultLabel'}>
              Location
            </Label>
            <Input
              id='postLocation'
              name='postLocation'
              defaultValue={postLocation ? postLocation : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='stravaLink' variant={'defaultLabel'}>
              Strava Url
            </Label>
            <Input
              id='stravaLink'
              name='stravaLink'
              placeholder='http://strava.url'
              defaultValue={stravaUrl ? stravaUrl : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='gpxFile' variant='defaultLabel'>
              GPX File
            </Label>
            <Flex sx={{ gap: '10px', flexDirection: ['column', 'row', 'row'] }}>
              <Box sx={{ width: '100%' }}>
                <Input
                  id='gpxFile'
                  name='gpxFile'
                  defaultValue={gpxFile ? gpxFile : ''}
                  variant={'defaultInput'}
                />
              </Box>
              <Box sx={{ width: ['', '25%', '25%'] }}>
                <Button
                  type='button'
                  onClick={() => {
                    setIsGpxUploadOpen(true);
                  }}
                  sx={{
                    width: '100%',
                    // borderColor: '#898989',
                    // paddingY: '6px',
                  }}
                  variant='primaryButton'
                >
                  Upload GPX
                </Button>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Label htmlFor='currentFtp' variant={'defaultLabel'}>
              Event FTP
            </Label>
            <Input
              id='currentFtp'
              name='currentFtp'
              defaultValue={currentFtp ? currentFtp : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='eventDate' variant={'defaultLabel'}>
              Event Date
            </Label>
            <Input
              id='eventDate'
              name='eventDate'
              defaultValue={date ? date : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Flex>
              <Box sx={{ width: '70%' }}>
                <Text as='p' sx={{ fontWeight: '700', fontSize: '15px' }}>
                  Delete this post
                </Text>
                <Text sx={{ fontSize: '15px' }}>
                  Once you delete a post, there is no going back. Please be
                  certain.
                </Text>
              </Box>
              <Box sx={{ marginLeft: 'auto', marginY: 'auto' }}>
                <Button
                  variant='dangerButton'
                  type='button'
                  onClick={processDeletePost}
                >
                  Delete Post
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex
          sx={{
            borderTopWidth: '1px',
            borderTopColor: 'divider',
            borderTopStyle: 'solid',
            marginTop: '10px',
            paddingTop: '10px',
          }}
        >
          <Box sx={{ marginLeft: 'auto' }}>
            <Flex sx={{ gap: '10px', marginTop: '10px' }}>
              <Button
                type='button'
                variant='secondaryButton'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button variant='primaryButton'>
                <Flex sx={{ gap: '10px' }}>
                  <Text as='span'>Save</Text>
                  {isSaving && (
                    <Spinner sx={{ size: '20px', color: 'white' }} />
                  )}
                </Flex>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </form>
    </StandardModal>
  );
};

export default ActivitySettings;
