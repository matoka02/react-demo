import { Button, useTheme } from '@mui/material';

const getStyles = (theme: TODO) => ({
  root: {
    margin: theme.spacing(1),
  },
  label: {
    textTransform: 'none',
  },
});

function ButtonGenerator(props: TODO): React.ReactElement {
  const { text, size, color, variant, onClick, ...other } = props;

  const theme = useTheme();
  const classes = getStyles(theme);

  return (
    <Button
      classes={{ root: classes.root, label: classes.label }}
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {text}
    </Button>
  );
}

export default ButtonGenerator;
