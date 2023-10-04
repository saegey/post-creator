import { Flex, Box, Label, Input, Button, Spinner, Text } from 'theme-ui';
import {
  Descendant,
  Transforms,
  Element as SlateElement,
  EditorVoidOptions,
} from 'slate';

const EmbedSettings = ({ editor, isModalOpen }) => {
  return (
    <Flex sx={{ gap: '10px', flexDirection: 'row', marginTop: '15px' }}>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = new FormData(event.target);
          const el = document.createElement('html');
          el.innerHTML = form.get('url') as string;
          // console.log(el?.querySelector('iframe')?.src);
          const iframe = el.querySelector('iframe');
          if (!iframe) {
            return;
          }
          const url = new URL(iframe.src);
          console.log(JSON.stringify(url.search));
          const finalUrl = `https://ridewithgps.com/embeds?${url.search}`;
          Transforms.insertNodes<SlateElement>(editor, [
            {
              type: 'embed',
              void: true,
              url: finalUrl,
              children: [{ text: '' }],
            } as Descendant,
          ]);
          isModalOpen(false);
        }}
        style={{ width: '100%' }}
      >
        <Flex sx={{ gap: '20px', flexDirection: 'column' }}>
          <Box>
            <Label htmlFor='url' variant='defaultLabel'>
              Embed Code
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

export default EmbedSettings;
