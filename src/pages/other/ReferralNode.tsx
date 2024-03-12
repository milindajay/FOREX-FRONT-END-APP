import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { MemberData } from './Timeline';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useRedux } from '../../hooks';
import profileImg from '../../assets/images/users/user-1.jpg';


interface ReferralNodeProps {
	members: MemberData[];
}

function PersonNode({ first_name, last_name, children, member_id, introducer }: MemberData) {
	return (
		<TreeNode
			label={
				<div className="d-inline-block bg-light bg-gradient text-dark p-3">
					{/* <img src="path-to-avatar" alt={`${first_name} ${last_name}`} className="rounded-circle mb-2" /> */}
					<div className="mb-1 col"><img src={profileImg} alt={first_name} className="flex-shrink-0 rounded-circle avatar-md img-thumbnail" /></div>
					<div className="mb-0">
						{first_name} {last_name}
					</div>
					<div className="text-muted">Member ID : {member_id}</div>
					{/* <div className="text-muted">{children?.length} : 0</div> */}
					<div className="text-muted">Introducer: {introducer}</div>
					<hr />
					<div className="text-muted mt-1">84:0</div>


					{/* Render LineConnectors and child PersonNodes if they exist */}
				</div>
			}>
			{children &&
				children.map((child) => (
					<>
						{/* <LineConnector /> */}
						<PersonNode {...child} />
					</>
				))}
		</TreeNode>
	);
}

const ReferralNode: FC<ReferralNodeProps> = ({ members }) => {
	const { appSelector } = useRedux();
	const { user } = appSelector((state) => ({
		user: state.Auth.user,
	}));

	return (
		<Card className='overflow-auto'>
			<Card.Body>
				<Tree
					label={
						<div className="d-inline-block bg-light bg-gradient p-3">
							<div className="mb-1 col"><img src={profileImg} alt={user.firstName} className="flex-shrink-0 rounded-circle avatar-md img-thumbnail" /></div>
							<div className="mb-0">
								Name : {user.firstName} {user.lastName} (You)
							</div>
							<div className="text-muted">Member ID : {user.id}</div>
							<div className="text-muted">Your Introducer : {user.introducer}</div>
							<hr />
							<div className="text-muted mt-1">84:0</div>
						</div>
					}>
					{members.map((member) => (
						<PersonNode {...member} />
					))}
				</Tree>
			</Card.Body>
		</Card>
	);
};

export default ReferralNode;
