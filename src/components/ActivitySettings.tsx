import { Box, Flex, Text, Input, Button, Label, Spinner } from 'theme-ui';
import React from 'react';
import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { PostContext } from '../PostContext';
import { EditorContext } from './EditorContext';
import { UpdatePostMutation } from '../../src/API';
import UploadGpxModal from './UploadGpxModal';
import StandardModal from './StandardModal';
import { updatePost } from '../../src/graphql/mutations';

const ActivitySettings = ({ isOpen, setSavedMessage }) => {
  const {
    id,
    resultsUrl,
    stravaUrl,
    gpxFile,
    setCurrentFtp,
    currentFtp,
    setStravaUrl,
    setResultsUrl,
  } = React.useContext(PostContext);

  const { setIsFtpUpdating } = React.useContext(EditorContext);

  const [uploadModal1, setUploadModal] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const saveSettings = async (event) => {
    // isOpen(false);
    setIsSaving(true);
    const form = new FormData(event.target);
    const newFtp = form.get('currentFtp') as string;
    if (newFtp !== currentFtp) {
      setIsFtpUpdating(true);
    }

    setCurrentFtp(newFtp);
    setStravaUrl(form.get('stravaLink') as string);
    setResultsUrl(form.get('resultsUrl') as string);

    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            stravaUrl: form.get('stravaLink'),
            resultsUrl: form.get('resultsUrl'),
            currentFtp: form.get('currentFtp'),
            id: id,
          },
        },
      })) as GraphQLResult<UpdatePostMutation>;
      console.log('response', response);

      setSavedMessage(true);
      setIsSaving(false);
      isOpen(false);
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <StandardModal isOpen={isOpen} title={'Details'}>
      {uploadModal1 && (
        <>
          <UploadGpxModal openModal={setUploadModal} />
        </>
      )}
      <Flex sx={{ gap: '10px', flexDirection: 'row' }}>
        <form
          onSubmit={(event: any) => {
            event.preventDefault();
            saveSettings(event).then(() => console.log('save settings'));
          }}
          style={{ width: '100%' }}
        >
          <Flex sx={{ gap: '20px', flexDirection: 'column' }}>
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
              <Flex
                sx={{ gap: '10px', flexDirection: ['column', 'row', 'row'] }}
              >
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
                      setUploadModal(true);
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
                // defaultValue={currentFtp ? currentFtp : ''}
                variant={'defaultInput'}
              />
            </Box>
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
                    onClick={() => isOpen(false)}
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
          </Flex>
        </form>
      </Flex>
    </StandardModal>
  );
};

export default ActivitySettings;
