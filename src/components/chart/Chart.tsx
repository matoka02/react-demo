import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import ApexChart from 'react-apexcharts';

import chartClasses from './classes';
import type { ChartProps } from './types';

// ----------------------------------------------------------------------

function Chart(props: BoxProps & ChartProps): React.ReactElement {
  const { sx, type, series, height, options, className, width = '100%', ...other } = props;

  return (
    <Box
      dir="ltr"
      className={chartClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: 'relative',
        ...sx,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      <ApexChart type={type} series={series} options={options} width="100%" height="100%" />
    </Box>
  );
}

export default Chart;
