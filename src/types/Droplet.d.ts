export interface DropletType {
	id?: string;
	title: string;
	audioTrack: string;
	createdAt?: string;
	upVoteCount?: number;
	downVoteCount?: number;
	replyCount?: number;
	isReply?: boolean;
	createdByUser: string;
}
