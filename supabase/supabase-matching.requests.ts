import { getData, setData } from './supabase-generals.requests';

import { SwipeType } from '~/types/shared.types';

export const setSwipe = async (
  token: string,
  swiperId: string,
  swipedId: string,
  swipeType: SwipeType
) => {
  try {
    await setData(
      token,
      'swipes',
      { swiper_id: swiperId, swiped_id: swipedId, swipe_type: swipeType },
      ['swiper_id', 'swiped_id']
    );

    if (swipeType === 'like') {
      const existingMatch = await getData(token, 'swipes', {
        swiper_id: swipedId,
        swiped_id: swiperId,
        swipe_type: 'like',
      });

      if (existingMatch.length > 0) {
        await setData(token, 'matches', { user1_id: swiperId, user2_id: swipedId }, [
          'user1_id',
          'user2_id',
        ]);
      }
    }
  } catch (error) {
    throw error;
  }
};
