import { supabaseClient } from './supabase.client';

export const getData = async (
  token: string,
  table: string,
  filters: Record<string, any> = {},
  selection: string = '*'
) => {
  const supabase = await supabaseClient(token);
  let query = supabase.from(table).select(selection);
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(`Error getting data from ${table}: ${error.message}`);
  }
  return data;
};

export const getLimitedData = async (
  token: string,
  table: string,
  limit: number,
  filters: Record<string, any> = {},
  selection: string = '*'
) => {
  const supabase = await supabaseClient(token);
  let query = supabase.from(table).select(selection).limit(limit);
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(`Error getting data from ${table}: ${error.message}`);
  }
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
  const { data: result, error } = await supabase
    .from(table)
    .upsert(data, { onConflict: updatedConflictColumns })
    .select();
  if (error) {
    throw new Error(`Error setting data to ${table}: ${error.message}`);
  }

  return result;
};
