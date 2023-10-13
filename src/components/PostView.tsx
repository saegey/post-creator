import {
  Box,
  Container,
  Link as ThemeLink,
  Button,
  Text,
  Flex,
} from 'theme-ui';
import { SlateToReact } from '@slate-serializers/react';
import Header from './Header';
import Link from 'next/link';

import HeaderPublic from './HeaderPublic';

const PostView = ({
  user = undefined,
  signOut,
  components,
  config,
  post,
}: {
  signOut?: any;
  user?: any;
  components: any;
  config: any;
  post: any;
}) => {
  // console.log(user);
  return (
    <Box
      as='main'
      sx={{
        marginBottom: 'auto',
      }}
    >
      {user && <Header user={user} signOut={signOut} title={'Post'} />}
      {!user && <HeaderPublic />}

      <Container
        as='article'
        className='article'
        sx={{
          '&.article>p+p': {
            paddingTop: '30px',
          },
          '&.article>h2+ul': {
            paddingTop: '30px',
          },
          '&.article>ul+h2': {
            paddingTop: '30px',
          },
          '&.article>ol+h2': {
            paddingTop: '30px',
          },
          '&.article>h2+ol': {
            paddingTop: '0px',
          },
          '&.article>p+h2': {
            paddingTop: '30px',
          },
          position: 'relative',
          paddingBottom: '100px',
        }}
      >
        <SlateToReact node={components} config={config} />
        {user && post.author.id === user.attributes.sub && (
          <Box
            sx={{ position: 'absolute', top: '20px', right: '20px' }}
            key='user-settings'
          >
            <ThemeLink
              as={Link}
              sx={{ textDecoration: 'none' }}
              href={`/posts/${post.originalPostId}/edit`}
              key={`link-post-${post.id}`}
            >
              <Button
                sx={{
                  // width: '30px',
                  // height: '30px',
                  width: 'fit-content',
                  '&:hover': {
                    backgroundColor: '#bbbbbb',
                    color: 'background',
                  },
                  // height: 'auto',
                  cursor: 'pointer',
                  backgroundColor: 'iconButtonBackground',
                }}
              >
                <Flex sx={{ gap: '10px' }}>
                  <Box sx={{ width: '20px' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox='0 0 24 24'
                      fill='none'
                      className='menu-button'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z'
                        fill='var(--theme-ui-colors-text)'
                      />
                    </svg>
                  </Box>
                  <Text
                    as='div'
                    sx={{
                      width: 'fit-content',
                      color: 'text',
                      lineHeight: '30px',
                      display: ['none', 'inherit', 'inherit'],
                    }}
                  >
                    Edit
                  </Text>
                </Flex>
              </Button>
            </ThemeLink>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PostView;
