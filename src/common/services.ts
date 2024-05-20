import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

export const generateId = async (): Promise<string> => {
  return uuid();
};

export const generateSlug = async (title: string): Promise<string> => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const generateHash = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
};

export const compareHash = async (
  data: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(data, hash);
};
