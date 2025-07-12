import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { buttonPrimaryStyles, textStyles, card } from '~theme/components';
import colors from '~theme/colors';
import spacing from '~theme/spacing';

interface Props {
    visible: boolean;
    username: string | null;
    onConfirm: () => void;
    onCancel: () => void;
}

const ChallengeModal: React.FC<Props> = ({ visible, username, onConfirm, onCancel }) => {
    return (
        <ReactNativeModal
            isVisible={visible}
            onBackdropPress={onCancel}
            useNativeDriver
            animationIn="zoomIn"
            animationOut="zoomOut"
        >
            <View style={[card, { padding: spacing.md }]}>
                <Text style={[textStyles.tile, { marginBottom: spacing.sm }]}>
                    Challenge {username}?
                </Text>
                <TouchableOpacity onPress={onConfirm} style={buttonPrimaryStyles}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Yes, Challenge!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCancel} style={{ marginTop: spacing.sm }}>
                    <Text style={{ color: colors.text, textAlign: 'center' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </ReactNativeModal>
    );
};

export default ChallengeModal;
