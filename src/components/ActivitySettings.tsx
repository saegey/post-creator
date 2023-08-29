import BlackBox from './BlackBox';
import { Box, Flex, Text, Input, Button, Close, Label } from 'theme-ui';
import { PostContext } from '../PostContext';
import React from 'react';

import UploadGpxModal from './UploadGpxModal';

const ActivitySettings = ({ isOpen }) => {
  const {
    resultsUrl,
    stravaUrl,
    gpxFile,
    setCurrentFtp,
    currentFtp,
    activity,
    setStravaUrl,
    setResultsUrl,
  } = React.useContext(PostContext);
  const [uploadModal1, setUploadModal] = React.useState(false);
  console.log('render activiity settinigs');

  return (
    <>
      <BlackBox>
        <Box
          sx={{
            width: '80%',
            // height: '70%',
            margin: 'auto',
            background: 'white',
            borderRadius: '5px',
            padding: '20px',
            position: 'relative',
          }}
        >
          {uploadModal1 && (
            <>
              <UploadGpxModal openModal={setUploadModal} />
            </>
          )}
          <Flex>
            <Text
              as='h2'
              sx={{
                // borderBottom: '1px solid black',
                marginBottom: '20px',
              }}
            >
              Edit Activity Details
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
              onSubmit={(event) => {
                event.preventDefault();

                isOpen(false);
                const form = new FormData(event.target);
                setCurrentFtp(form.get('currentFtp'));
                setStravaUrl(form.get('stravaLink'));
                setResultsUrl(form.get('resultsUrl'));
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
                  />
                </Box>
                <Box>
                  <Label htmlFor='resultsUrl'>Results Url</Label>
                  <Input
                    id='resultsUrl'
                    name='resultsUrl'
                    placeholder='http://results.url'
                    defaultValue={resultsUrl ? resultsUrl : ''}
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
                        sx={{ width: '100%' }}
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
                  />
                </Box>
                <Box>
                  <Label htmlFor='eventDate'>Event Date</Label>
                  <Input
                    id='eventDate'
                    name='eventDate'
                    // placeholder='http://results.url'
                    defaultValue={currentFtp ? currentFtp : ''}
                  />
                </Box>
                <Flex>
                  <Box sx={{ marginLeft: 'auto' }}>
                    <Flex sx={{ gap: '10px', marginTop: '10px' }}>
                      <Button
                        type='button'
                        sx={{ backgroundColor: 'gray' }}
                        onClick={() => isOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button>Save</Button>
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
