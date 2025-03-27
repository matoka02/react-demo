import { usePathname as useNextPathname } from 'next/navigation';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

function usePathname() {
  const pathname = useNextPathname();
  return useMemo(() => pathname || '', [pathname]);
}

export default usePathname;
