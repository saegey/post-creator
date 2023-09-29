import React from 'react';
import { Text, Box, Flex, Button } from 'theme-ui';
import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { Transforms, Descendant } from 'slate';

import { PostContext } from '../PostContext';
import { EditorContext } from './EditorContext';
import { UpdatePostMutation } from '../API';
import { updatePost } from '../../src/graphql/mutations';

const RaceResultsPreview = ({ editor }) => {
  const [selectedRow, setSelectedRow] = React.useState();
  const { raceResults, id } = React.useContext(PostContext);
  const { setIsRaceResultsModalOpen } = React.useContext(EditorContext);

  const saveResults = async () => {
    try {
      const response = await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            raceResults: JSON.stringify({
              results: raceResults,
              selectedRow:
                raceResults && selectedRow ? raceResults[selectedRow] : null,
            }),
            raceResultsProvider: 'myraceresults',
            id: id,
          },
        },
      });
      return response;
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <>
      <Box sx={{ overflowY: 'auto', height: '500px' }}>
        <Flex sx={{ width: '100%', paddingX: '5px' }}>
          <Text as='span' sx={{ width: '60px' }}>
            Place
          </Text>
          <Text as='span' sx={{ width: '300px' }}>
            Name
          </Text>
          <Text as='span'>Speed</Text>
          <Text as='span' sx={{ marginLeft: 'auto' }}>
            Time
          </Text>
        </Flex>
        {raceResults?.map((row, i) => {
          return (
            <Flex
              key={`race-result-row-${i}`}
              sx={{
                backgroundColor:
                  selectedRow === i ? 'selectedBackground' : null,
                color: selectedRow === i ? 'selectedBackgroundText' : null,
                borderRadius: selectedRow === i ? '5px' : null,
                width: '100%',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor:
                    selectedRow === i ? 'selectedBackground' : 'muted',
                  borderRadius: '5px',
                },
                paddingX: '5px',
                paddingY: '2px',
              }}
              onClick={() => {
                if (selectedRow === i) {
                  setSelectedRow(undefined);
                } else {
                  setSelectedRow(i);
                }
              }}
            >
              <Text as='span' sx={{ width: '60px' }}>
                {row.CatPlace}
              </Text>
              <Text as='span' sx={{ width: '300px' }}>
                {row.Name}
              </Text>
              <Text as='span'>{row.Speed}</Text>
              <Text as='span' sx={{ marginLeft: 'auto' }}>
                {row.Time}
              </Text>
            </Flex>
          );
        })}
      </Box>
      <Box
        sx={{
          paddingTop: '15px',
          marginTop: '15px',
          borderTopColor: 'divider',
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
        }}
      >
        <Flex>
          <Button
            title='Save'
            sx={{
              marginLeft: 'auto',
              backgroundColor: selectedRow ? null : 'gray',
            }}
            disabled={selectedRow ? false : true}
            onClick={() => {
              console.log('clicked');
              saveResults().then((r) => {
                Transforms.insertNodes(editor, [
                  {
                    type: 'raceResultsDotCom',
                    children: [{ text: '' }],
                  } as Descendant,
                  { type: 'text', children: [{ text: '' }] } as Descendant,
                ]);
                setIsRaceResultsModalOpen(false);
              });
            }}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default RaceResultsPreview;
