export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface AsyncStatus {
    loading: boolean;
    error: string | null;
}
