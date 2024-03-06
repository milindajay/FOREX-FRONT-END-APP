import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../../hooks';

// components
import TeamMembers from '../../../../components/TeamMembers';
import Reminders from '../../../../components/Reminders';

import UserBox from './UserBox';
import NewPost from './NewPost';
import CommentBox from './CommentBox';

// dummy data
import { members, posts, reminder } from './data';

const Profile = () => {
    // set pagetitle
    usePageTitle({
        title: 'Profile',
        breadCrumbItems: [
            {
                path: '/apps/contacts/profile',
                label: 'Contacts',
            },
            {
                path: '/apps/contacts/profile',
                label: 'Profile',
                active: true,
            },
        ],
    });

    return (
        <Row>
            <Col sm={8}>
                <UserBox />
                
            </Col>

        </Row>
    );
};

export default Profile;
