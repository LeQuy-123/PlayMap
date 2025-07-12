import apiClient from "~api/apiClient";

export const challengeApi = {
    sendChallenge: async (to_user_id: string, sport_id: string) => {
        const res = await apiClient.post('/challenges', {
            to_user_id,
            sport_id,
        });
        return res.data;
    },
};
