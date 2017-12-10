import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Groups } from '/imports/api/group/GroupCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Profile_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Groups.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
});

Template.Edit_Profile_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
});


Template.Edit_Group_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const first_name = event.target.First.value;
    const last_name = event.target.Last.value;
    const image = event.target.Image.value;
    const bio = event.target.Bio.value;
    const username = FlowRouter.getParam('username'); // schema requires username.

    const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const interests = _.map(selectedInterests, (option) => option.value);

    const updatedProfileData = {
      first_name, last_name, image, bio, interests,
      username,
    };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

