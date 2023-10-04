import { IconButton, Text } from 'theme-ui';

const TooltipButton = ({
  onClick,
  title,
  tooltipText,
  children,
  disabled = false,
}) => {
  return (
    <IconButton
      aria-label={title}
      onClick={onClick}
      variant='iconButton'
      disabled={disabled}
      sx={{
        position: 'relative',
        // display: 'inline-block',
        '&:hover': { '#tooltip1': { visibility: 'visible', opacity: 1 } },
        '#tooltip1::after': {
          content: '""',
          position: 'absolute',
          top: 'calc(50% - 5px)',
          left: '-5px',
          marginLeft: '-5px',
          borderWidth: '5px',
          borderStyle: 'solid',
          borderTopColor: 'transparent',
          borderRightColor: 'tooltipBackground',
          borderLeftColor: 'transparent',
          borderBottomColor: 'transparent',
          // borderColor: 'red transparent transparent transparent',
        },
      }}
    >
      {children}
      {/* <Text
        id='tooltip1'
        as='span'
        sx={{
          visibility: 'hidden',
          width: '180px',
          backgroundColor: 'tooltipBackground',
          color: 'text',
          textAlign: 'center',
          fontWeight: 400,
          fontSize: '14px',
          padding: '5px',
          position: 'absolute',
          zIndex: 1000,
          borderRadius: '5px',
          left: '120%',
        }}
      >
        {tooltipText}
      </Text> */}
    </IconButton>
  );
};

export default TooltipButton;
