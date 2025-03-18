export interface Notification {
    id: string;
    notificationType: string;
    title: string;
    message: string;
    createdDate: string;
    isRead: boolean;
    isDismissed: boolean;
  }