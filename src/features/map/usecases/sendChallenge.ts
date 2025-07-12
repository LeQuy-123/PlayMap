import {challengeApi} from '../api/challengeApi';

export const sendChallenge = async ({
    to_user_id,
    sport_id,
}: {
    to_user_id: string;
    sport_id: string;
}) => {
    return await challengeApi.sendChallenge(to_user_id, sport_id);
};
