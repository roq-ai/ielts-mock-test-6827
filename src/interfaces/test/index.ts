import { ResultInterface } from 'interfaces/result';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TestInterface {
  id?: string;
  name: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  result?: ResultInterface[];
  organization?: OrganizationInterface;
  _count?: {
    result?: number;
  };
}

export interface TestGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
