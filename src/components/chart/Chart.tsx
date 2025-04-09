import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
// import ApexChart from 'react-apexcharts';
import dynamic from 'next/dynamic';

import chartClasses from './classes';
import type { ChartProps } from './types';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // Disable SSR for this component
});

// ----------------------------------------------------------------------

function Chart({
  sx,
  type,
  series,
  height,
  options,
  className,
  width = '100%',
  ...other
}: BoxProps & ChartProps): React.ReactElement {
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
