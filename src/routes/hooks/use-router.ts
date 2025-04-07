import { useRouter as useNextRouter } from 'next/navigation';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

function useAppRouter() {
  const router = useNextRouter();

  return useMemo(
    () => ({
      back: () => router.back(),
      forward: () => router.forward,
      refresh: () => router.refresh,
      push: (href: string) => router.push(href),
      replace: (href: string) => router.replace(href),
    }),
    [router]
  );
}

export default useAppRouter;
