import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

class GroupCollection extends BaseCollection {
  constructor() {
    super('Group', new SimpleSchema({
      name: { type: String },
      interests: { type: Array, optional: true },
      'interests.$': { type: String },
      meeting_info: { type: String, optional: true },
      admin: { type: String },
      group_image: { type: SimpleSchema.RegEx.Url, optional: true },
      image_one: { type: SimpleSchema.RegEx.Url, optional: true },
      image_two: { type: SimpleSchema.RegEx.Url, optional: true },
      image_three: { type: SimpleSchema.RegEx.Url, optional: true },
    }, { tracker: Tracker }));
  }

  define({
           name = '', interests = [], meeting_info = '', admin = '', group_image = '', image_one = '', image_two = '',
           image_three = '',
         }) {
    const checkPattern = {
      name: String, interests: [String], meeting_info: String, admin: String, group_image: String, image_one: String,
      image_two: String, image_three: String,
    };
    check({ name, interests, meeting_info, admin, group_image, image_one, image_two, image_three }, checkPattern);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is already an existing group`);
    }
    return this._collection.insert({
      name, interests, meeting_info, admin, group_image, image_one, image_two,
      image_three,
    });
  }
}

export const Groups = new GroupCollection();
