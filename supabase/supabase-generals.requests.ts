import { supabaseClient } from './supabase.client';

import { handleSupabaseError } from '~/utils/database.utils';

export const getData = async (token: string, table: string, filters: Record<string, any> = {}) => {
  const supabase = await supabaseClient(token);
  let query = supabase.from(table).select('*');
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  const { data, error } = await query;
  handleSupabaseError(`Error fetching data from ${table}`, error);

  return data;
};

export const setData = async (
  token: string,
  table: string,
  data: Record<string, any>,
  conflictColumns: string | string[]
) => {
  const updatedConflictColumns = Array.isArray(conflictColumns)
    ? conflictColumns.join(', ')
    : conflictColumns;
  const supabase = await supabaseClient(token);
  const { error } = await supabase.from(table).upsert(data, { onConflict: updatedConflictColumns });
  handleSupabaseError(`Error setting data in ${table}`, error);
};
