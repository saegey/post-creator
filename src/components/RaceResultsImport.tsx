import { Flex, Box, Label, Input, Button, Text, Select } from 'theme-ui';

import { API } from 'aws-amplify';
import React from 'react';
import { PostContext, RaceResultRow } from './PostContext';
import { EditorContext } from './EditorContext';
import RaceResultsPreview from './RaceResultsPreview';
import StandardModal from './StandardModal';

const RaceResultsImport = ({ editor }) => {
  const [categories, setCategories] = React.useState<{
    data: { filterValues: Array<Array<string>> };
  }>();
  const [category, setCategory] = React.useState('');
  const [division, setDivision] = React.useState('');
  const [raceId, setRaceId] = React.useState('');
  const [key, setKey] = React.useState();
  const [server, setServer] = React.useState();
  const [previewResults, setPreviewResults] = React.useState(false);

  const { isRaceResultsModalOpen, setIsRaceResultsModalOpen } =
    React.useContext(EditorContext);

  const { setRaceResults } = React.useContext(PostContext);

  const getResults = async () => {
    if (!category || !division) {
      throw new Error('No category or division for results');
    }
    const res = await API.get(
      'api12660653',
      `/raceresult/results?category=${encodeURIComponent(
        category
      )}&division=${encodeURIComponent(
        division
      )}&raceId=${raceId}&key=${key}&server=${server}`,
      { response: true }
    );

    const fields = res.data.list.Fields.map((f) => f.Label);

    const data = res.data.data.map((d) => {
      const temp = {};
      d.map((column, i) => {
        temp[fields[i - 1] ? fields[i - 1].replace(/\s+/g, '') : 'missing'] =
          column;
      });
      return temp;
    });

    return data;
  };

  const getCategories = async ({ url }) => {
    const resultsUrl = new URL(url);
    setRaceId(resultsUrl.pathname.split('/')[1]);

    if (resultsUrl.host === 'my.raceresult.com') {
      const apiName = 'api12660653';
      const path = `/raceresult?raceId=${resultsUrl.pathname.split('/')[1]}`;
      const myInit = {
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      };
      const response = await API.get(apiName, path, myInit);
      // console.log(response);
      setKey(response.data.key);
      setServer(response.data.server);
      setCategories(response);
      return response;
    }
  };

  return (
    <>
      <StandardModal
        title={'Race Results'}
        setIsOpen={setIsRaceResultsModalOpen}
        isOpen={isRaceResultsModalOpen}
      >
        {previewResults && (
          <RaceResultsPreview
            editor={editor}
            // isOpen={setIsRaceResultsModalOpen}
          />
        )}
        {!previewResults && (
          <Flex sx={{ gap: '10px', flexDirection: 'row' }}>
            <form
              onSubmit={(event: any) => {
                event.preventDefault();
                const form = new FormData(event.target);
                const url = form.get('url') as string;
                getCategories({ url });
              }}
              style={{ width: '100%' }}
            >
              <Flex sx={{ gap: '20px', flexDirection: 'column' }}>
                <Box>
                  <Label htmlFor='url'>Url</Label>
                  <Input id='url' name='url' variant={'defaultInput'} />
                </Box>
                {categories && (
                  <>
                    <Select
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <option></option>
                      {categories.data?.filterValues[0].map(
                        (c: string, i: number) => (
                          <option key={`category-${i}`}>{c}</option>
                        )
                      )}
                    </Select>
                    <Select
                      onChange={(e) => {
                        setDivision(e.target.value);
                      }}
                    >
                      <option></option>
                      {categories.data?.filterValues[1].map(
                        (c: string, i: number) => (
                          <option key={`category-${i}`}>{c}</option>
                        )
                      )}
                    </Select>
                  </>
                )}
                {!categories && (
                  <Box sx={{ marginLeft: 'auto' }}>
                    <Button>
                      <Flex sx={{ gap: '10px' }}>
                        <Text as='span'>Import</Text>
                        {/* {isSaving && <Spinner sx={{ size: '20px', color: 'white' }} />} */}
                      </Flex>
                    </Button>
                  </Box>
                )}
                {categories && (
                  <Box sx={{ marginLeft: 'auto' }}>
                    <Button
                      type='button'
                      onClick={() =>
                        getResults().then((r: any) => {
                          setRaceResults({
                            results: r as any,
                            selected: undefined,
                          });
                          // setIsOpen(false);
                          setPreviewResults(true);
                        })
                      }
                    >
                      <Flex sx={{ gap: '10px' }}>
                        <Text as='span'>Get Results</Text>
                        {/* {isSaving && <Spinner sx={{ size: '20px', color: 'white' }} />} */}
                      </Flex>
                    </Button>
                  </Box>
                )}
              </Flex>
            </form>
          </Flex>
        )}
      </StandardModal>
    </>
  );
};

export default RaceResultsImport;
