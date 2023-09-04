import { Flex, Text, Box, Close } from 'theme-ui';
import React from 'react';
import { createEditor, Editor, Transforms, Descendant } from 'slate';
import PowerGraphIcon from './PowerGraphIcon';

import { EditorContext } from './EditorContext';
import ActivityOverviewIcon from './ActivityOverviewIcon';
import TimePowerZonesIcon from './TimePowerZonesIcon';
import { PostContext } from '../PostContext';
import MatchesBurnedIcon from './MatchesBurnedIcon';

const GraphSelectorMenu = ({ editor }) => {
  const { isGraphMenuOpen, setIsGraphMenuOpen } =
    React.useContext(EditorContext);
  const { gpxFile } = React.useContext(PostContext);

  const addMatchesBurned = () => {
    Transforms.insertNodes(editor, [
      { type: 'matchesBurned', children: [{ text: '' }] } as Descendant,
    ]);
    setIsGraphMenuOpen(false);
  };

  const addTimePowerZones = () => {
    // timeInZones
    Transforms.insertNodes(editor, [
      { type: 'timeInZones', children: [{ text: '' }] } as Descendant,
    ]);
    setIsGraphMenuOpen(false);
  };

  const addMap = () => {
    Transforms.insertNodes(editor, [
      { type: 'visualOverview', children: [{ text: '' }] } as Descendant,
    ]);
    setIsGraphMenuOpen(false);
  };

  const addPowerCurve = () => {
    Transforms.insertNodes(editor, [
      {
        type: 'powergraph',
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
    setIsGraphMenuOpen(false);
  };

  const addActivityOverview = () => {
    Transforms.insertNodes(editor, [
      {
        type: 'activityOverview',
        children: [{ text: '' }],
        void: true,
      } as Descendant,
      { type: 'text', children: [{ text: '' }] } as Descendant,
    ]);
    setIsGraphMenuOpen(false);
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
        height: '100vh',
        position: ['absolute', 'sticky', 'sticky'],
        display: ['absolute', null, null],
        top: [0, '55px', '55px'],
        // position: 'absolute',
        zIndex: [1000, 100, 100],
        marginTop: [0, '-20px', '-20px'],
        width: ['100%', '300px', '300px'],
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
            Graphs
          </Text>
          <Close
            onClick={() => setIsGraphMenuOpen(false)}
            sx={{ marginLeft: 'auto' }}
          />
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Box
            onClick={addPowerCurve}
            sx={{
              cursor: 'pointer',
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
                <PowerGraphIcon />
              </Box>
              <Text as='span'>Power Curve</Text>
            </Flex>
          </Box>

          <Box
            onClick={addActivityOverview}
            sx={{
              cursor: 'pointer',
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
                <ActivityOverviewIcon />
              </Box>
              <Text as='span'>Activity Overview</Text>
            </Flex>
          </Box>
          <Box
            onClick={addTimePowerZones}
            sx={{
              cursor: 'pointer',
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
                <TimePowerZonesIcon />
              </Box>
              <Text as='span'>Time in Zones</Text>
            </Flex>
          </Box>
          <Box
            onClick={addMap}
            sx={{
              cursor: 'pointer',
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
              <Text as='span'>Route Overview</Text>
            </Flex>
          </Box>
          <Box
            onClick={addMatchesBurned}
            sx={{
              cursor: 'pointer',
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
                <MatchesBurnedIcon />
              </Box>
              <Text as='span'>Matches Burned</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default GraphSelectorMenu;
