import { BoxProps, InputLabel, useTheme } from '@mui/material';
import React, { useId } from 'react';

import { RouterLink } from '@/routes/components';

import logoClasses from './classes';
import {
  fullLogoD21,
  fullLogoD22,
  fullLogoD23,
  fullLogoD24,
  singleLogoD11,
  singleLogoD12,
  singleLogoD13,
} from './svg';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

function LogoComponent(props: LogoProps, ref: React.Ref<HTMLDivElement>): React.ReactElement {
  const {
    width,
    href = '/',
    height,
    isSingle = true,
    disableLink = false,
    className,
    sx,
    // ...other
  } = props;

  const theme = useTheme();
  const gradientId = useId();

  const TEXT_PRIMARY = theme.vars.palette.text.primary;
  const PRIMARY_LIGHT = theme.vars.palette.primary.light;
  const PRIMARY_MAIN = theme.vars.palette.primary.main;
  const PRIMARY_DARKER = theme.vars.palette.primary.dark;

  /*
    * OR using local (public folder)
    *
    const singleLogo = (
      <Box
        alt="Single logo"
        component="img"
        src={`/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <Box
        alt="Full logo"
        component="img"
        src={`/logo/logo-full.svg`}
        width="100%"
        height="100%"
      />
    );
    *
    */

  const singleLogo = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={`url(#${`${gradientId}-1`})`} d={singleLogoD11} />
      <path
        fill={`url(#${`${gradientId}-2`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d={singleLogoD12}
      />
      <path
        fill={`url(#${`${gradientId}-2`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d={singleLogoD13}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-1`}
          x1="152"
          y1="167.79"
          x2="65.523"
          y2="259.624"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_DARKER} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="86"
          y1="128"
          x2="86"
          y2="384"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-3`}
          x1="402"
          y1="288"
          x2="402"
          y2="384"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
      </defs>
    </svg>
  );

  const fullLogo = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 360 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={`url(#${`${gradientId}-1`})`} d={fullLogoD21} />
      <path
        fill={`url(#${`${gradientId}-2`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d={fullLogoD22}
      />
      <path
        fill={`url(#${`${gradientId}-3`})`}
        fillRule="evenodd"
        clipRule="evenodd"
        d={fullLogoD23}
      />
      <path fill={TEXT_PRIMARY} fillRule="evenodd" clipRule="evenodd" d={fullLogoD24} />
      <defs>
        <linearGradient
          id={`${gradientId}-1`}
          x1="38"
          y1="41.9469"
          x2="16.381"
          y2="64.906"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_DARKER} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="21.5"
          y1="32"
          x2="21.5"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-3`}
          x1="100.5"
          y1="72"
          x2="100.5"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
      </defs>
    </svg>
  );

  const baseSize = {
    width: width ?? 40,
    height: height ?? 40,
    ...(!isSingle && {
      width: width ?? 102,
      height: height ?? 36,
    }),
  };

  return (
    <InputLabel
      ref={ref}
      component={disableLink ? 'div' : RouterLink}
      href={href}
      className={logoClasses.root.concat(className ? ` ${className}` : '')}
      aria-label="Logo"
      sx={{
        ...baseSize,
        flexShrink: 0,
        display: 'inline-flex',
        verticalAlign: 'middle',
        ...(disableLink && { pointerEvents: 'none' }),
        ...sx,
      }}
      // {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </InputLabel>
  );
}

LogoComponent.defaultProps = {
  href: undefined,
  isSingle: true,
  disableLink: true,
};

LogoComponent.displayName = 'Logo';

export default React.forwardRef(LogoComponent);
