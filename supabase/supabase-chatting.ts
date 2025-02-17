import { supabaseClient } from './supabase.client';

export const getAllChats = async (token: string, user_id: string) => {
  const supabase = await supabaseClient(token);
  const { data: chatIds } = await supabase
    .from('chats')
    .select('id, users:chats_users!inner(user_id)')
    .eq('users.user_id', user_id);

  return await supabase
    .from('chats')
    .select('*, users:chats_users!inner(user:profiles(user_id, fullName))')
    .in(
      'id',
      chatIds!.map((chat) => chat.id)
    );
};

export const createChat = async (token: string, match_id: bigint, user_ids: string[]) => {
  const supabase = await supabaseClient(token);

  const { data: chat, error: fetchChatError } = await supabase
    .from('chats')
    .insert({ match_id })
    .select('id')
    .single();

  if (fetchChatError) {
    throw fetchChatError;
  }

  const chatId = chat.id;

  const usersToInsert = user_ids.map((user_id) => ({
    chat_id: chatId,
    user_id,
  }));

  const { error: chatUsersError } = await supabase.from('chats_users').insert(usersToInsert);

  if (chatUsersError) {
    throw chatUsersError;
  }

  return chat;
};

export const getAllMessages = async (token: string, chat_id: string) => {
  const supabase = await supabaseClient(token);

  return await supabase
    .from('messages')
    .select('*, user:profiles(user_id, email)')
    .eq('chat_id', chat_id)
    .order('created_at', { ascending: true });
};

export const getChatByMatchId = async (token: string, match_id: number) => {
  const supabase = await supabaseClient(token);

  const { data: chat, error } = await supabase
    .from('chats')
    .select('id')
    .eq('match_id', match_id)
    .single();

  if (error) throw error;

  return chat;
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
