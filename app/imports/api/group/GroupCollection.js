import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

class GroupCollection extends BaseCollection {
	constructor() {
		super('Group', new SimpleSchema ({
			name: { type: String },
			interests: { type: Array, optional: true },
      'interests.$': { type: String }, 
			website: { type: String, optional: true }, 
			email: { type: String, optional: true },
			type: { type: String, optional: true },
			location: { type: String, optional: true },
			time: { type: String, optional: true },
			route: { type: String, optional: true }
		}, { tracker: Tracker }));
	}

	define({ name = '', interests = [], website = '', email = '', type = '', location = '', time = '', route = '' }) {
		const checkPattern = { name: String, website: String, email: String, type: String, location: String, time: String, route: String };
		check({ name, website, email, type, location, time, route }, checkPattern);
		
		if (this.find({ name }).count() > 0) {
			throw new Meteor.Error(`${name} is already an exsisting group`);
		}

    if (interests.length !== _.uniq(interests).length) {
      throw new Meteor.Error(`${interests} contains duplicates`);
    }

		return this._collection.insert( { name, interests, website, email, type, location, time, route } );
	}

	dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const interests = doc.interests;
    const website = doc.website;
    const email = doc.email;
    const type = doc.type;
    const location = doc.location;
    const time = doc.time;
    const route = doc.route;
    return { name, website, email, type, location, time, route, interests };
  }
}

export const Groups = new GroupCollection();