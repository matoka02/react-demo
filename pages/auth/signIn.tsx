'use client';

import { SignInPage } from '@toolpad/core';
import type { Session } from '@toolpad/core/AppProvider';
import { useRouter } from 'next/navigation';

import { useSession } from '@/config/SessionContext';

const fakeAsyncGetSession = async (formData: FormData): Promise<Session> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(JSON.stringify(Object.fromEntries(formData.entries())));
      const password = formData.get('password');
      const email = formData.get('email')?.toString() || '';

      if (typeof password === 'string' && password !== '') {
        resolve({
          user: {
            name: process.env.NEXT_PUBLIC_USER_NAME,
            email,
            image: process.env.NEXT_PUBLIC_USER_AVATAR,
          },
        });
      } else {
        reject(new Error('Incorrect credentials.'));
      }
    }, 1000);
  });

function SignInView(): React.ReactElement {
  const { setSession } = useSession();
  const router = useRouter();

  return (
    <SignInPage
      providers={[{ id: 'credentials', name: 'Credentials' }]}
      signIn={async (provider, formData, callbackUrl) => {
        try {
          const session = await fakeAsyncGetSession(formData);
          setSession(session);
          router.push(callbackUrl || '/');
          return {};
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
          };
        }
      }}
    />
  );
}

export default SignInView;
