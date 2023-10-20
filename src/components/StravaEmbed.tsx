import { Flex, Box, Label, Input, Button, Spinner, Text } from 'theme-ui';
import {
  Descendant,
  Transforms,
  Element as SlateElement,
  EditorVoidOptions,
} from 'slate';

const StravaEmbed = ({ editor, isModalOpen }) => {
  return (
    <Flex sx={{ gap: '10px', flexDirection: 'row', marginTop: '15px' }}>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = new FormData(event.target);
          // const el = document.createElement('html');
          const inputUrl = form.get('url') as string;

          // const divContent = el.querySelector('div');
          // if (!iframe) {
          //   return;
          // }
          const url = new URL(inputUrl);
          const activityId = JSON.stringify(url.pathname.match(/(\d+)/));
          console.log(activityId);
          // const finalUrl = `https://ridewithgps.com/embeds?${url.search}`;
          Transforms.insertNodes<SlateElement>(editor, [
            {
              type: 'stravaEmbed',
              void: true,
              activityId: JSON.parse(activityId)[0],
              children: [{ text: '' }],
            } as Descendant,
            { type: 'matchesBurned', children: [{ text: '' }] } as Descendant,
          ]);
          isModalOpen(false);
        }}
        style={{ width: '100%' }}
      >
        <Flex sx={{ gap: '20px', flexDirection: 'column' }}>
          <Box>
            <Label htmlFor='url' variant='defaultLabel'>
              Link to Strava activity
            </Label>
            <Input
              id='url'
              name='url'
              // placeholder='http://strava.url'
              // defaultValue={title ? title : ''}
              variant={'defaultInput'}
            />
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button variant='primaryButton'>
              <Flex sx={{ gap: '10px' }}>
                <Text as='span'>Save</Text>
                {/* {isSaving && <Spinner sx={{ size: '20px', color: 'white' }} />} */}
              </Flex>
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};

export default StravaEmbed;
