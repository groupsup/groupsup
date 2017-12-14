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
			interest_id: [Number],
      meeting_info: { type: String, optional: true },
      admin: { type: String, optional: true },
      group_image: { type: String, optional: true },
      image_one: { type: String, optional: true },
      image_two: { type: String, optional: true },
      image_three: { type: String, optional: true },

		}, { tracker: Tracker }));
	}

	define({name = '', interest_id = [] }) {
		check(name, String);
		if (this.find({ name }).count() > 0) {
			throw new Meteor.Error(`${name} is already an exsisting group`);
		}
		return this._collection.insert( { name, interest_id } );
	}
}

export const Groups = new GroupCollection();