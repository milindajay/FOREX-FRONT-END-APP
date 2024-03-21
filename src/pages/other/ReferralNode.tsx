import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { MemberData } from './Timeline';
import { Tree, TreeNode } from 'react-organizational-chart';
import profileImg from '../../assets/images/users/user-1.jpg';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ReferralNodeProps {
	members: MemberData[];
}

interface PersonNodeProps extends MemberData {
	isParent?: boolean;
}

function PersonNode({
	first_name,
	last_name,
	sideAReferral,
	sideBReferral,
	member_id,
	introducer,
	sideAPoints,
	sideBPoints,
	referral_side_A_member_id,
	referral_side_B_member_id,
	isParent = false,
}: PersonNodeProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<TreeNode
			label={
				<div
					className="d-inline-block bg-light bg-gradient text-dark p-3"
					onClick={() =>
						searchParams.get('userId') !== member_id && !isParent && setSearchParams({ userId: member_id })
					}>
					{/* <img src="path-to-avatar" alt={`${first_name} ${last_name}`} className="rounded-circle mb-2" /> */}
					<div className="mb-1 col">
						<img src={profileImg} alt={first_name} className="flex-shrink-0 rounded-circle avatar-md img-thumbnail" />
					</div>
					<div className="mb-0">
						{first_name} {last_name}
					</div>
					<div className="text-muted">Member ID : {member_id}</div>
					{/* <div className="text-muted">{children?.length} : 0</div> */}
					<div className="text-muted">Introducer: {introducer}</div>
					<hr />
					<div className="text-muted mt-1 text-start">
						<p className="text-dark">Side A Points: {sideAPoints} </p>
						<p className="text-dark">Side B Points: {sideBPoints} </p>
						{/* <p className="text-dark">Side A Remaining: {sideARemaining} </p>
						<p className="text-dark">Side B Remaining: {sideBRemaining} </p> */}
					</div>

					{/* Render LineConnectors and child PersonNodes if they exist */}
				</div>
			}>
			{/* <TreeNode label={<div>A</div>}>
				{sideAChildren?.length > 0 ? sideAChildren?.map((child) => <PersonNode {...child} />) : undefined}
			</TreeNode>

			<TreeNode label={<div>B</div>}>
				{sideBChildren?.length > 0 ? sideBChildren?.map((child) => <PersonNode {...child} />) : undefined}
			</TreeNode> */}
			{referral_side_A_member_id || referral_side_B_member_id ? (
				<>
					<TreeNode label={<div>A {referral_side_A_member_id === null && <div>(Empty slot)</div>}</div>}>
						{sideAReferral ? <PersonNode {...sideAReferral} /> : undefined}
					</TreeNode>

					<TreeNode label={<div>B {referral_side_B_member_id === null && <div>(Empty slot)</div>}</div>}>
						{sideBReferral ? <PersonNode {...sideBReferral} /> : undefined}
					</TreeNode>
				</>
			) : undefined}

			{/* <TreeNode
				label={
					<div>
						{sideAChildren?.length > 0 ? sideAChildren?.map((child) => <PersonNode {...child} />) : <span>A slot</span>}
					</div>
				}
			/>
			<TreeNode
				label={
					<div>
						{sideBChildren?.length > 0 ? sideBChildren?.map((child) => <PersonNode {...child} />) : <span>B slot</span>}
					</div>
				}
			/> */}
			{/* {isParent ? (
				<>
					<TreeNode label={<div>A</div>}>
						{sideAChildren?.length > 0 ? sideAChildren?.map((child) => <PersonNode {...child} />) : undefined}
					</TreeNode>

					<TreeNode label={<div>B</div>}>
						{sideBChildren?.length > 0 ? sideBChildren?.map((child) => <PersonNode {...child} />) : undefined}
					</TreeNode>
				</>
			) : (
				<>
					<TreeNode label={<></>}>
						{children?.length > 0 ? children.map((child) => <PersonNode {...child} />) : undefined}
					</TreeNode>
				</>
			)} */}
		</TreeNode>
	);
}

const ReferralNode: FC<ReferralNodeProps> = ({ members }) => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	return (
		<Card className="overflow-auto">
			<Card.Body>
				{members.length > 0 ? (
					<Tree
						label={
							<div>
								{searchParams.get('userId') && (
									<button className="btn btn-secondary" onClick={() => navigate(-1)}>
										Go Back
									</button>
								)}
							</div>
						}>
						{members.map((member) => (
							<PersonNode {...member} isParent />
						))}
					</Tree>
				) : (
					<div className="d-flex justify-content-center align-items-center flex-column" style={{ gap: '1rem' }}>
						<span>Seems like the selected user id '{searchParams.get('userId')}' is not found in the system.</span>
						<button className="btn btn-secondary" onClick={() => navigate(-1)}>
							Go Back
						</button>
					</div>
				)}
			</Card.Body>
		</Card>
	);
};

export default ReferralNode;
