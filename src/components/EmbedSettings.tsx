import { Flex, Box, Label, Input, Button, Text } from 'theme-ui';
import { Descendant, Transforms, Element as SlateElement } from 'slate';

const EmbedSettings = ({ editor, isModalOpen }) => {
  return (
    <Flex sx={{ gap: '10px', flexDirection: 'row', marginTop: '15px' }}>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          const form = new FormData(event.target);
          const el = document.createElement('html');
          el.innerHTML = form.get('url') as string;

          const iframe = el.querySelector('iframe');
          if (!iframe) {
            return;
          }
          const url = new URL(iframe.src);
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
            <Input id='url' name='url' variant={'defaultInput'} />
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button variant='primaryButton'>
              <Flex sx={{ gap: '10px' }}>
                <Text as='span'>Save</Text>
              </Flex>
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};

export default EmbedSettings;
