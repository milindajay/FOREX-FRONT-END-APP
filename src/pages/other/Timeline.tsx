import React, { useEffect, useState, FC } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
// import { useMemo } from 'react';
import { usePageTitle } from '../../hooks';
import { useRedux } from '../../hooks'; // Make sure the import path matches where you have defined useRedux



interface MemberData {
  member_id: string;
  first_name: string;
  last_name: string;
  referral_type: string;
  children?: MemberData[];
}

interface ReferralNodeProps {
  member: MemberData;
}

const ReferralNode: FC<ReferralNodeProps> = ({ member }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{member.first_name} {member.last_name}</Card.Title>
        <div className="referral-children">
          <div className="side-a">
            {member.children?.filter(child => child.referral_type === 'A').map(child => (
              <ReferralNode key={child.member_id} member={child} />
            ))}
          </div>
          <div className="side-b">
            {member.children?.filter(child => child.referral_type === 'B').map(child => (
              <ReferralNode key={child.member_id} member={child} />
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const ReferralTree: FC = () => {
  usePageTitle({
    title: 'My Referrals',
    breadCrumbItems: [
      {
        path: '/pages/timeline',
        label: 'My Referrals',
        active: true,
      },
    ],
  });

  const { appSelector } = useRedux();
  const { user } = appSelector((state) => ({
    user: state.Auth.user,
  }));

  const [referralData, setReferralData] = useState<MemberData | null>(null);

  useEffect(() => {
    if (!user) {
      console.log('User data is not available in Redux state.');
      return;
    }

    const fetchReferralTree = async () => {
      try {
        const response = await axios.get(`/referral-tree/3667`);
        setReferralData(response.data);
      } catch (error) {
        console.error('Error fetching referral tree:', error);
      }
    };

    fetchReferralTree();
  }, [user]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>Referral Tree</Card.Title>
      </Card.Header>
      <Card.Body>
        {user ? (
          referralData ? (
            <ReferralNode member={referralData} />
          ) : (
            <p>Loading referral tree...</p>
          )
        ) : (
          <p>User is not logged in.</p>
        )}
      </Card.Body>
    </Card>
  );

  
};

export default ReferralTree;
