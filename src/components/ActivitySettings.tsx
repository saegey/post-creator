import BlackBox from './BlackBox';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Close,
  Label,
  Spinner,
} from 'theme-ui';
import { PostContext } from '../PostContext';
import React from 'react';
import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';

import { UpdatePostMutation } from '../../src/API';
import { updatePostMinimal } from '../graphql/customMutations';
import UploadGpxModal from './UploadGpxModal';

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
  const [uploadModal1, setUploadModal] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const ref = React.useRef<any>();

  const saveSettings = async (event) => {
    // isOpen(false);
    setIsSaving(true);
    const form = new FormData(event.target);
    setCurrentFtp(form.get('currentFtp') as string);
    setStravaUrl(form.get('stravaLink') as string);
    setResultsUrl(form.get('resultsUrl') as string);

    try {
      const response = (await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePostMinimal,
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

  React.useEffect(() => {
    const checkIfClickedOutside1 = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        isOpen(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutside1);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside1);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <BlackBox opacity={'0.7'}>
        <Box
          sx={{
            maxWidth: '690px',
            width: '100%',
            margin: 'auto',
            background: 'background',
            borderRadius: '5px',
            padding: '20px',
            position: 'relative',
          }}
          ref={ref}
        >
          {uploadModal1 && (
            <>
              <UploadGpxModal openModal={setUploadModal} />
            </>
          )}
          <Flex
            sx={{
              borderBottomWidth: '1px',
              borderBottomColor: 'divider',
              borderBottomStyle: 'solid',
              paddingY: '5px',
              marginBottom: '20px',
            }}
          >
            <Text
              as='div'
              sx={{
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              Details
            </Text>
            <Close
              onClick={() => isOpen(false)}
              sx={{
                alignItems: 'center',
                height: '100%',
                marginLeft: 'auto',
              }}
            />
          </Flex>
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
                  <Flex sx={{ gap: '10px' }}>
                    <Box sx={{ width: '100%' }}>
                      <Input
                        id='gpxFile'
                        name='gpxFile'
                        // placeholder='http://results.url'
                        defaultValue={gpxFile ? gpxFile : ''}
                        variant={'defaultInput'}
                      />
                    </Box>
                    <Box sx={{ width: '25%' }}>
                      <Button
                        type='button'
                        onClick={() => {
                          // isOpen(false);
                          setUploadModal(true);
                          console.log('setupload');
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
        </Box>
      </BlackBox>
    </>
  );
};

export default ActivitySettings;
