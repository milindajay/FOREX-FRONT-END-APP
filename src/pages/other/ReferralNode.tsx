import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { MemberData } from './Timeline';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useRedux } from '../../hooks';

interface ReferralNodeProps {
	members: MemberData[];
}

function PersonNode({ first_name, last_name, children, member_id, introducer }: MemberData) {
	return (
		<TreeNode
			label={
				<div className="d-inline-block mb-2 bg-light p-2">
					{/* <img src="path-to-avatar" alt={`${first_name} ${last_name}`} className="rounded-circle mb-2" /> */}
					<div className="mb-0">
						{first_name} {last_name}
					</div>
					<div className="text-muted">Member ID : {member_id}</div>
					{/* <div className="text-muted">{children?.length} : 0</div> */}
					<div className="text-muted">Introducer: {introducer}</div>
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
		<Card>
			<Card.Body>
				<Tree
					label={
						<div className="d-inline-block mb-2 bg-light p-2">
							{/* <img src="path-to-avatar" alt={`${first_name} ${last_name}`} className="rounded-circle mb-2" /> */}
							<div className="mb-0">
								Name : {user.firstName} {user.lastName} (You)
							</div>
							<div className="text-muted">Member ID : {user.id}</div>
							<div className="text-muted">Introducer : {user.introducer}</div>
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
