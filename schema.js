const users = {
	id: 'required/generated unique string uuid',
	handle: 'required unique string',
	createdAt: 'required/generated datetime default to now',
	updatedAt: 'datetime default to now',
};

const droplets = {
	id: 'required/generated unique string uuid',
	title: 'required string',
	audioTrack: 'required string URL',
	replyCount: 'number default to 0',
	createdBy: 'foreign_key -> users.id string',
	upVoteCount: 'number default to 0',
	downVoteCount: 'number default to 0',
	isReply: 'boolean true|false required',
};
