import { Flex, Text, Box, Close, Button } from 'theme-ui';
import React from 'react';
import { Transforms, Descendant } from 'slate';
import PowerGraphIcon from './PowerGraphIcon';

import { EditorContext } from './EditorContext';
import ActivityOverviewIcon from './ActivityOverviewIcon';
import TimePowerZonesIcon from './TimePowerZonesIcon';
import { PostContext } from '../PostContext';
import MatchesBurnedIcon from './MatchesBurnedIcon';
import StravaIcon from './StravaIcon';
import HeroBannerIcon from './HeroBannerIcon';

const GraphSelectorMenu = ({ editor }) => {
  const { setIsGraphMenuOpen, setIsGpxUploadOpen } =
    React.useContext(EditorContext);
  const { gpxFile, stravaUrl, currentFtp } = React.useContext(PostContext);

  const addMatchesBurned = () => {
    if (gpxFile) {
      Transforms.insertNodes(editor, [
        { type: 'matchesBurned', children: [{ text: '' }] } as Descendant,
      ]);
    }
    // setIsGraphMenuOpen(false);
  };

  const addHeroBanner = () => {
    Transforms.insertNodes(editor, [
      { type: 'heroBanner', children: [{ text: '' }] } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
  };

  const addStravaLink = () => {
    if (stravaUrl) {
      Transforms.insertNodes(editor, [
        { type: 'stravaLink', children: [{ text: '' }] } as Descendant,
        { type: 'text', children: [{ text: '' }] } as Descendant,
      ]);
    }
  };

  const addTimePowerZones = () => {
    // Zones
    if (gpxFile && currentFtp) {
      Transforms.insertNodes(editor, [
        { type: 'timeInZones', children: [{ text: '' }] } as Descendant,
      ]);
    }
    // setIsGraphMenuOpen(false);
  };

  const addMap = () => {
    if (gpxFile) {
      Transforms.insertNodes(editor, [
        { type: 'visualOverview', children: [{ text: '' }] } as Descendant,
      ]);
    }

    // setIsGraphMenuOpen(false);
  };

  const addPowerCurve = () => {
    if (gpxFile) {
      Transforms.insertNodes(editor, [
        {
          type: 'powergraph',
          children: [{ text: '' }],
          void: true,
        } as Descendant,
        { type: 'text', children: [{ text: '' }] } as Descendant,
      ]);
    }

    // setIsGraphMenuOpen(false);
  };

  const addActivityOverview = () => {
    if (gpxFile) {
      Transforms.insertNodes(editor, [
        {
          type: 'activityOverview',
          children: [{ text: '' }],
          void: true,
        } as Descendant,
        { type: 'text', children: [{ text: '' }] } as Descendant,
      ]);
    }
    // setIsGraphMenuOpen(false);
  };

  const color = gpxFile
    ? `var(--theme-ui-colors-text)`
    : `var(--theme-ui-colors-iconButtonDisabled)`;

  return (
    <Box
      sx={{
        backgroundColor: 'sideMenuBackground',
        // width: '300px',
        minWidth: '300px',
        // height: '100vh',
        position: ['absolute', 'sticky', 'sticky'],
        display: ['absolute', null, null],
        top: [0, '55px', '55px'],
        // position: 'absolute',
        // zIndex: [11, 6, 6],
        marginTop: [0, 0, 0],
        width: ['100%', '300px', '300px'],
        height: 'calc(100vh - 55px)',
      }}
    >
      <Box>
        <Flex
          sx={{
            padding: '15px',
            borderBottomColor: 'divider',
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
          }}
        >
          <Text
            as='span'
            sx={{ lineHeight: '30px', fontSize: '18px', fontWeight: '600' }}
          >
            Components
          </Text>
          <Close
            onClick={() => setIsGraphMenuOpen(false)}
            sx={{ marginLeft: 'auto' }}
          />
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Box
            onClick={() => {
              if (gpxFile) {
                addPowerCurve();
              }
            }}
            sx={{
              // cursor: 'pointer',
              padding: '15px',
              width: '100%',
              '&:hover': { background: 'sideMenuHoverBackground' },
              cursor: gpxFile ? 'pointer' : 'not-allowed',
            }}
          >
            <Flex>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              >
                <PowerGraphIcon color={color} />
              </Box>
              <Text as='span' sx={{ color: color }}>
                Power Curve
              </Text>
            </Flex>
          </Box>

          <Box
            onClick={addActivityOverview}
            sx={{
              // cursor: 'pointer',
              padding: '15px',
              width: '100%',
              '&:hover': { background: 'sideMenuHoverBackground' },
              cursor: gpxFile ? 'pointer' : 'not-allowed',
            }}
          >
            <Flex>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              >
                <ActivityOverviewIcon color={color} />
              </Box>
              <Text as='span' sx={{ color: color }}>
                Activity Overview
              </Text>
            </Flex>
          </Box>
          <Box
            onClick={addTimePowerZones}
            sx={{
              cursor: gpxFile ? 'pointer' : 'not-allowed',
              padding: '15px',
              width: '100%',
              '&:hover': { background: 'sideMenuHoverBackground' },
            }}
          >
            <Flex>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              >
                <TimePowerZonesIcon color={color} />
              </Box>
              <Text as='span' sx={{ color: color }}>
                Time in Zones
              </Text>
            </Flex>
          </Box>
          <Box
            onClick={addMap}
            sx={{
              cursor: gpxFile ? 'pointer' : 'not-allowed',
              padding: '15px',
              width: '100%',
              '&:hover': { background: 'sideMenuHoverBackground' },
            }}
          >
            <Flex>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              >
                <svg
                  className='menu-button'
                  width='24px'
                  height='24px'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z'
                    stroke={color}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Box>
              <Text as='span' sx={{ color: color }}>
                Route Overview
              </Text>
            </Flex>
          </Box>
          <Box
            onClick={addMatchesBurned}
            sx={{
              cursor: gpxFile ? 'pointer' : 'not-allowed',
              padding: '15px',
              width: '100%',
              '&:hover': { background: 'sideMenuHoverBackground' },
            }}
          >
            <Flex>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              >
                <MatchesBurnedIcon color={color} />
              </Box>
              <Text as='span' sx={{ color: color }}>
                Matches Burned
              </Text>
            </Flex>
          </Box>
          <Box
            onClick={addStravaLink}
            sx={{
              cursor: stravaUrl ? 'pointer' : 'not-allowed',
              padding: '15px',
              width: '100%',
              '&:hover': { background: 'sideMenuHoverBackground' },
            }}
          >
            <Flex>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              >
                <StravaIcon
                  color={
                    stravaUrl
                      ? 'var(--theme-ui-colors-text)'
                      : 'var(--theme-ui-colors-iconButtonDisabled'
                  }
                />
              </Box>
              <Text
                as='span'
                sx={{ color: stravaUrl ? null : 'iconButtonDisabled' }}
              >
                Strava Link
              </Text>
            </Flex>
          </Box>
          <Box
            onClick={addHeroBanner}
            sx={{
              cursor: stravaUrl ? 'pointer' : 'not-allowed',
              padding: '15px',
              width: '100%',
              '&:hover': { background: 'sideMenuHoverBackground' },
            }}
          >
            <Flex>
              <Box
                sx={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                }}
              >
                <HeroBannerIcon />
              </Box>
              <Text
                as='span'
                sx={{ color: stravaUrl ? null : 'iconButtonDisabled' }}
              >
                Hero Banner
              </Text>
            </Flex>
          </Box>
        </Flex>

        {/* {!gpxFile && (
          <Flex
            sx={{
              position: 'absolute',
              top: '62px',
              height: '80vh',
              // background: '#9d9d9d8f',
              width: ['100%', '300px', '300px'],
              flexDirection: 'column',
            }}
          ></Flex>
        )} */}
      </Box>
      {!gpxFile && (
        <Box
          sx={{
            marginY: 'auto',
            borderTopColor: 'divider',
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
          }}
        >
          <Box sx={{ marginX: '15px' }}>
            <Text as='p' sx={{ marginY: '10px' }}>
              A GPX file must be uploaded to enabled activity components.
            </Text>
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
        </Box>
      )}
    </Box>
  );
};

export default GraphSelectorMenu;
