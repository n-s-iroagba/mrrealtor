import Building from "../models/Building.Model";
import { Land } from "../models/Land.Model";
import Notification from "../models/Notification.Model";

export const getNotificationsByRecipientId = async (recipientId: number) => {
  try {
    const notifications = await Notification.findAll({
      where: { recipientId },
      include: [
        { model: Building, as: 'building' },
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
