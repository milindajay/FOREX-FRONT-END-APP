import { Notification, ProfileMenu, SearchOptions } from '../types';

// images
// import avatar1 from '../../assets/images/users/user-1.jpg';
// import avatar2 from '../../assets/images/users/user-2.jpg';
// import avatar4 from '../../assets/images/users/user-4.jpg';
// import avatar5 from '../../assets/images/users/user-5.jpg';

// get the notifications
const notifications: Notification[] = [
    
];

// get the profilemenu
const profileMenus: ProfileMenu[] = [
    {
        label: 'My Account',
        icon: 'fe-user',
        redirectTo: '/apps/contacts/profile',
    },
    {
        label: 'Lock Screen',
        icon: 'fe-lock',
        redirectTo: '/auth/lock-screen',
    },
    {
        label: 'Logout',
        icon: 'fe-log-out',
        redirectTo: '/auth/logout',
    },
];

const searchOptions: SearchOptions[] = [
    

];

export { notifications, profileMenus, searchOptions };
