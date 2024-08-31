import { Land } from '../land/Land.Model';
import Property from '../property/Property.Model';
import Notification from './Notification.Model';

export const getNotificationsByRecipientId = async (recipientId: number) => {
  try {
    const notifications = await Notification.findAll({
      where: { recipientId },
      include: [
        { model: Property, as: 'relatedProperty' },
        { model: Land, as: 'relatedLand' }
      ],
      order: [['createdAt', 'DESC']],
    });
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};
