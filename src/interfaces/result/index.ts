import { TestInterface } from 'interfaces/test';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ResultInterface {
  id?: string;
  score: number;
  test_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  test?: TestInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  test_id?: string;
  user_id?: string;
}
