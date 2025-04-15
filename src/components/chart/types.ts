import type { Theme, SxProps } from '@mui/material/styles';
import type { Props } from 'react-apexcharts';

// ----------------------------------------------------------------------

export type ChartProps = {
  type: Props['type'];
  series: Props['series'];
  options: Props['options'];
};

export type ChartBaseProps = Props;

export interface ExtendedFilter {
  type?: 'lighten' | 'darken' | 'none';
  value?: number;
}

export interface ExtendedStates {
  hover?: {
    filter?: ExtendedFilter;
  };
  active?: {
    filter?: ExtendedFilter;
  };
}

export type ChartOptions = Props['options'] & { states?: ExtendedStates };

export type ChartLoadingProps = {
  disabled?: boolean;
  sx?: SxProps<Theme>;
};
