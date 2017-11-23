import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-console */

Template.Cas_Get_Started.events({
  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-get-started': function casLogin(event) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      }
    };
    Meteor.loginWithCas(callback);
    return false;
  },
});
