import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Groups } from '/imports/api/group/GroupCollection';

Interests.publish();
Profiles.publish();
Groups.publish();
