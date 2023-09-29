import { EditorContext } from './EditorContext';
import StandardModal from './StandardModal';
import React from 'react';
import { Box, Link as ThemeLink, Flex, Text } from 'theme-ui';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';

import { PostContext } from './PostContext';
import { updatePost } from '../../src/graphql/mutations';

const ShareModal = ({ postId }) => {
  const { isShareModalOpen, setIsShareModalOpen } =
    React.useContext(EditorContext);
  const { shortUrl, setShortUrl, id } = React.useContext(PostContext);
  const [isClicked, setIsClicked] = React.useState(false);

  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${asPath}`;
  console.log(URL);

  const createShortUrl = async () => {
    const response = await API.post('api12660653', '/short-url', {
      response: true,
      body: {
        url: `${origin}/j/${postId}`,
      },
    });
    return response;
  };

  const getShortUrl = async () => {
    if (shortUrl) {
      return shortUrl;
    }
    const res = await createShortUrl();
    setShortUrl(res.data.Attributes.id);
    try {
      const results = await API.graphql({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        query: updatePost,
        variables: {
          input: {
            id: id,
            shortUrl: res.data.Attributes.id,
          },
        },
      });
      return shortUrl;
    } catch (error) {
      console.error(error);
    }
    console.log('res', res.data.Attributes.id);
  };

  React.useEffect(() => {
    // console.log('this is  test', shortUrl);
    getShortUrl();
  }, []);
  // return <h1>this is it</h1>;
  return (
    <StandardModal
      isOpen={isShareModalOpen}
      setIsOpen={setIsShareModalOpen}
      title={'Share Post'}
    >
      <Flex
        sx={{
          textDecoration: 'none',
          borderRadius: '5px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: '#d5d5d5',
          // padding: '5px',
        }}
      >
        <Text
          sx={{
            textDecoration: 'none',
            color: 'text',
            marginRight: 'auto',
            // borderRadius: '5px',
            // borderStyle: 'solid',
            // borderWidth: '1px',
            // borderColor: 'red',
            padding: '5px',
          }}
        >{`https://mopd.us/${shortUrl}`}</Text>
        <Box
          sx={{
            width: '30px',
            height: 'auto',
            cursor: 'pointer',
            padding: '5px',
            borderLeft: '1px solid #bebebe',
            '#tooltip2::after': {
              content: '""',
              position: 'absolute',
              top: 'calc(50% + 15px)',
              left: 0,
              right: 0,
              margin: '0 auto',
              height: 0,
              borderTopWidth: '10px',
              borderTopStyle: 'solid',
              borderTopColor: 'tooltipBackground',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              width: 0,
              // marginLeft: '-5px',
              // borderWidth: '5px',
              // borderStyle: 'solid',
              // borderTopColor: 'transparent',
              // borderRightColor: 'tooltipBackground',
              // borderLeftColor: 'transparent',
              // borderBottomColor: 'transparent',
              // borderColor: 'red transparent transparent transparent',
            },
          }}
          onClick={() => {
            navigator.clipboard.writeText(`https://mopd.us/${shortUrl}`);
            setIsClicked(true);
            setTimeout(() => {
              setIsClicked(false);
            }, 1000);
          }}
        >
          <svg width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z'
              fill='var(--theme-ui-colors-text)'
            />
            <path
              d='M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z'
              fill='var(--theme-ui-colors-text)'
            />
          </svg>
          <Text
            id='tooltip2'
            as='span'
            sx={{
              visibility: isClicked ? 'visible' : 'hidden',
              // width: '180px',
              backgroundColor: 'tooltipBackground',
              color: 'text',
              textAlign: 'center',
              fontWeight: 400,
              fontSize: '14px',
              padding: '7px',
              position: 'absolute',
              zIndex: 1000,
              borderRadius: '5px',
              top: '41px',
              right: '5px',
              // left: '120%',
            }}
          >
            Copied!
          </Text>
        </Box>
        {/*  */}
      </Flex>
      <Flex sx={{ gap: '15px', marginTop: '15px' }}>
        <Box>
          <ThemeLink
            target='_blank'
            sx={{ textDecoration: 'none', color: 'text', marginY: '15px' }}
            href={`https://twitter.com/intent/tweet?url=${origin}/j/${postId}`}
          >
            <Text as='span'>Twitter</Text>
          </ThemeLink>
        </Box>
        <Box>
          <ThemeLink
            // as='a'
            target='_blank'
            sx={{ textDecoration: 'none', color: 'text', marginY: '15px' }}
            href={`https://www.facebook.com/sharer/sharer.php?u=${origin}/j/${postId}`}
          >
            <Text as='span'>Facebook</Text>
          </ThemeLink>
          {/* https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fescapecollective.com%2Fgarmin-varia-seatpost-mount-reviews%2F */}
        </Box>
      </Flex>
    </StandardModal>
  );
};

export default ShareModal;
