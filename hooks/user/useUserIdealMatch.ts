import { useEffect, useState } from 'react';

import { profileIdealMatch } from '~/content/profile-ideal-match.content';
import { ProfileIdealMatch } from '~/types/main-settings.types';
import { IdealMatch } from '~/types/shared.types';

const useUserIdealMatch = (idealMatchId: IdealMatch) => {
  const [idealMatch, setIdealMatch] = useState<ProfileIdealMatch | undefined>(undefined);

  useEffect(() => {
    const match = profileIdealMatch.find((item) => item.id === idealMatchId);
    setIdealMatch(match);
  }, [idealMatchId]);

  return { idealMatch };
};

export default useUserIdealMatch;
