import Image from 'next/image';

export const logo = (
  <Image
    width={40}
    height={40}
    src="it-logo-mid.png"
    className="logo"
    alt="Company Logo"
    priority
  />
);

export const BRANDING = {
  title: 'React Demo V6',
  logo,
};
