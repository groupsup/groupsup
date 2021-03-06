import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';


/*                        LANDING ROUTE                       */

export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});

/*                        DIRECTORY ROUTE                       */

function addDirectoryBodyClass() {
  $('body').addClass('directory-page-body');
}

function removeDirectoryBodyClass() {
  $('body').removeClass('directory-page-body');
}

export const directoryPageRouteName = 'Directory_Page';
FlowRouter.route('/directory', {
  name: directoryPageRouteName,
  action() {
    BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
  },
  triggersEnter: [addDirectoryBodyClass],
  triggersExit: [removeDirectoryBodyClass],
});


/*                        USER ROUTES                      */

function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const dashboardPageRouteName = 'Dashboard_Page';
userRoutes.route('/dashboard', {
  name: dashboardPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: dashboardPageRouteName });
  },
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const editprofilePageRouteName = 'Edit_Profile_Page';
userRoutes.route('/edit-profile', {
  name: editprofilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: editprofilePageRouteName });
  },
});

export const allgroupsdirectoryPageRouteName = 'All_Groups_Directory';
userRoutes.route('/all-groups', {
  name: allgroupsdirectoryPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: allgroupsdirectoryPageRouteName });
  },
});

export const modPageRouteName = 'Mod_Filter_Page';
userRoutes.route('/mod', {
  name: modPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: modPageRouteName });
  },
});

export const groupPageRouteName = 'Group_Page';
userRoutes.route('/group', {
  name: groupPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: groupPageRouteName });
  },
});

export const editgroupPageRouteName = 'Edit_Group_Page';
userRoutes.route('/edit-group', {
  name: editgroupPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: editgroupPageRouteName });
  },
});
/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};
