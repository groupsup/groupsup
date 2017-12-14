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
      meeting_info: String,
      admin: String,
      group_image: String,
      image_one: String,
      image_two: String,
      image_three: String,

		}, { tracker: Tracker }));
	}

	define({name = '', interest_id = [] }) {
		check(name, String);
		if (this.find({ name }).count() > 0) {
			throw new Meteor.Error(`${name} is already an existing group`);
		}
		return this._collection.insert( { name, interest_id } );
	}
}

export const Groups = new GroupCollection();