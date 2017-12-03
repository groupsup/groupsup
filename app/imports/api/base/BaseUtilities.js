import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Groups } from '/imports/api/interest/GroupCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Groups.removeAll();
}
