import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';

import { callToast } from '~/utils/ui.utils';

const useAuthSocials = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { startOAuthFlow: facebookOAuth } = useOAuth({
    strategy: 'oauth_facebook',
  });
  const { startOAuthFlow: googleOAuth } = useOAuth({
    strategy: 'oauth_google',
  });

  const { startOAuthFlow: appleOAuth } = useOAuth({
    strategy: 'oauth_apple',
  });

  const onSocialAuth = useCallback(
    async (type: 'google' | 'apple' | 'facebook') => {
      try {
        const { createdSessionId, setActive } =
          type === 'google'
            ? await googleOAuth()
            : type === 'facebook'
              ? await facebookOAuth()
              : await appleOAuth();

        if (createdSessionId) {
          setIsLoading(true);
          await setActive!({ session: createdSessionId });
          router.replace('/home');
          setIsLoading(false);
        } else {
          callToast();
        }
      } catch (err: any) {
        console.error(err);

        callToast();
      }
    },
    [googleOAuth, appleOAuth, router]
  );

  return { onSocialAuth, isLoading };
};

export default useAuthSocials;
