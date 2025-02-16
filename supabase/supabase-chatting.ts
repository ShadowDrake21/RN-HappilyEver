import { supabaseClient } from './supabase.client';

export const getAllChats = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data: chatIds } = await supabase
    .from('chats')
    .select('id, users:chats_users!inner(user_id)')
    .eq('users.user_id', user_id);

  return await supabase
    .from('chats')
    .select('*, users:chats_users!inner(user:profiles(user_id, email))')
    .in(
      'id',
      chatIds!.map((chat) => chat.id)
    );
};

export const createChat = async (token: string, user1_id: string, user2_id: string) => {
  const supabase = await supabaseClient(token);

  const { data: chat, error: fetchChatError } = await supabase
    .from('chats')
    .insert({})
    .select()
    .single();

  if (fetchChatError) {
    throw fetchChatError;
  }

  const { error: fetchUsersError } = await supabase.from('chats_users').insert([
    { chat_id: chat.id, user_id: user1_id },
    { chat_id: chat.id, user_id: user2_id },
  ]);

  if (fetchUsersError) {
    throw fetchUsersError;
  }

  return chat;
};

// export const getChatId = async (token: string, user1_id: string, user2_id: string) => {
//   const supabase = await supabaseClient(token);

//   return await supabase
//     .from('chats')
//     .select('id')
//     .eq('id', chat_id)
//     .single();
// };

export const getAllMessages = async (token: string, chat_id: string) => {
  const supabase = await supabaseClient(token);

  return await supabase
    .from('messages')
    .select('*, user:profiles(user_id, email)')
    .eq('chat_id', chat_id)
    .order('created_at', { ascending: true });
};

export const sendMessage = async (
  token: string,
  chat_id: string,
  user_id: string,
  message: string
) => {
  const supabase = await supabaseClient(token);

  return await supabase.from('messages').insert([
    {
      chat_id: +chat_id,
      author_id: user_id,
      content: message,
    },
  ]);
};
