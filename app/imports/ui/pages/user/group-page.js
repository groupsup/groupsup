import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Groups } from '/imports/api/group/GroupCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

Template.Group_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Groups.getPublicationName());
  this.messageFlags = new ReactiveDict();
});

Template.Group_Page.helpers({
  isAdmin() { // setup admin check here.
    return true;
  },
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});

Template.Group_Page.events({

});

