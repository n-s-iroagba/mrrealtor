import Notification from "./Notification.Model";


interface CreateNotificationParams {
    message: string;
    type: 'appointment' | 'like';
    recipientId: number;
    relatedPropertyId?: number | null;
    relatedLandId?: number | null;
  }
  
  export const createNotification = async (params: CreateNotificationParams) => {
    try {
      const notification = await Notification.create({
        message: params.message,
        type: params.type,
        recipientId: params.recipientId,
        relatedPropertyId: params.relatedPropertyId,
        relatedLandId: params.relatedLandId ,
        isRead:false,
      });
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }