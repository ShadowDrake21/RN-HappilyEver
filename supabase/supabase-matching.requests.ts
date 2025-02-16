import { createChat } from './supabase-chatting';
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
        const matchExists = await getData(token, 'matches', {
          user1_id: swiperId,
          user2_id: swipedId,
        });

        if (matchExists.length === 0) {
          await setData(token, 'matches', { user1_id: swiperId, user2_id: swipedId }, [
            'user1_id',
            'user2_id',
          ]);

          // TODO: FINISH
          const { data: newChat, error: createChatError } = await createChat(
            token,
            swiperId,
            swipedId
          );
          triggerMatchNotification(token, swiperId, swipedId);
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

const triggerMatchNotification = async (token: string, user1Id: string, user2Id: string) => {
  await setData(
    token,
    'notifications',
    {
      recipient_id: user1Id,
      type: 'match',
      message: `You matched with ${user2Id}`,
    },
    ['recipient_id', 'message']
  );

  await setData(
    token,
    'notifications',
    {
      recipient_id: user2Id,
      type: 'match',
      message: `You matched with ${user1Id}`,
    },
    ['recipient_id', 'message']
  );
};
