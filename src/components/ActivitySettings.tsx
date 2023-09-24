import { Box, Flex, Text, Input, Button, Label, Spinner } from 'theme-ui';
import React from 'react';
import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { PostContext } from '../PostContext';
import { EditorContext } from './EditorContext';
import { UpdatePostMutation } from '../../src/API';
import StandardModal from './StandardModal';
import { updatePost } from '../../src/graphql/mutations';

const ActivitySettings = ({ isOpen, setIsOpen, setSavedMessage }) => {
  const {
    id,
    resultsUrl,
    stravaUrl,
    gpxFile,
    setCurrentFtp,
    currentFtp,
    setStravaUrl,
    setResultsUrl,
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

  const saveSettings = async (event) => {
    setIsSaving(true);
    const form = new FormData(event.target);
    const newFtp = form.get('currentFtp') as string;
    if (newFtp !== currentFtp) {
      setIsFtpUpdating(true);
    }

    setCurrentFtp(newFtp);
    setStravaUrl(form.get('stravaLink') as string);
    setResultsUrl(form.get('resultsUrl') as string);
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
            resultsUrl: form.get('resultsUrl'),
            currentFtp: form.get('currentFtp'),
            title: form.get('title'),
            subhead: form.get('subhead'),
            postLocation: form.get('postLocation'),
            date: form.get('eventDate'),
            id: id,
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;
      // console.log('response', response);

      setSavedMessage(true);
      setIsSaving(false);
      setIsOpen(false);
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <StandardModal isOpen={isOpen} setIsOpen={setIsOpen} title={'Details'}>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          saveSettings(event).then(() => console.log('save settings'));
        }}
        // style={{ width: '100%' }}
      >
        <Flex
          sx={{
            gap: '20px',
            flexDirection: 'column',
            maxHeight: ['75vh', '400px', '400px'],
            overflow: 'scroll',
          }}
        >
          <Box>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              name='title'
              // placeholder='http://strava.url'
              defaultValue={title ? title : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='title'>Subhead</Label>
            <Input
              id='subhead'
              name='subhead'
              // placeholder='http://strava.url'
              defaultValue={subhead ? subhead : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='postLocation'>Location</Label>
            <Input
              id='postLocation'
              name='postLocation'
              // placeholder='http://strava.url'
              defaultValue={postLocation ? postLocation : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='stravaLink'>Strava Url</Label>
            <Input
              id='stravaLink'
              name='stravaLink'
              placeholder='http://strava.url'
              defaultValue={stravaUrl ? stravaUrl : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='resultsUrl'>Results Url</Label>
            <Input
              id='resultsUrl'
              name='resultsUrl'
              placeholder='http://results.url'
              defaultValue={resultsUrl ? resultsUrl : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='gpxFile'>GPX File</Label>
            <Flex sx={{ gap: '10px', flexDirection: ['column', 'row', 'row'] }}>
              <Box sx={{ width: '100%' }}>
                <Input
                  id='gpxFile'
                  name='gpxFile'
                  // placeholder='http://results.url'
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
                  sx={{ width: '100%', borderColor: '#898989' }}
                >
                  Upload GPX
                </Button>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Label htmlFor='currentFtp'>Current FTP</Label>
            <Input
              id='currentFtp'
              name='currentFtp'
              // placeholder='http://results.url'
              defaultValue={currentFtp ? currentFtp : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box>
            <Label htmlFor='eventDate'>Event Date</Label>
            <Input
              id='eventDate'
              name='eventDate'
              // placeholder='http://results.url'
              defaultValue={date ? date : ''}
              variant={'defaultInput'}
            />
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
                sx={{
                  backgroundColor: 'cancelButtonColor',
                }}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button>
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
