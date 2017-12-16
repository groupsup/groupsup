import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import {Roles} from 'meteor/alanning:roles';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Groups } from '/imports/api/group/GroupCollection';


const selectedInterestsKey = 'selectedInterests';

Template.Mod_Filter_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  // this.messageFlags.set(selectedInterestsKey, undefined);
  this.messageFlags.set(selectedInterestsKey, undefined);

});

Template.Mod_Filter_Page.helpers({
  profiles() {

    if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestKey, _.map(Interest.findAll(), interest => interest.name));
    }

    const allProfiles = Profiles.findAll();
    const selectedInterests =  Template.instance().messageFlags.get(selectedInterestsKey);
    return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length > 0);
  },

  interests() {
    return _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
          };
        });
    },
});