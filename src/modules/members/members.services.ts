import { TMembers } from './members.interface';
import { Members } from './members.model';

// create member service
const createMember = async (payload: TMembers) => {
  const result = await Members.create(payload);
  return result;
};

export const MemberServices = { createMember };
