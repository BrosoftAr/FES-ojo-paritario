import { useEffect } from 'react'
import { requestPermission, requestToken, onMessageListener, onBackgroundMessageListener, suscribeToTopic } from '../firebase';
import { APP_NAME } from '../constants';

const useNotifications = ({ topics=[] }: { topics?: string[] }) => {

  useEffect(() => {
    requestPermission();
    requestToken();
    topics.forEach(topic => suscribeToTopic(`${APP_NAME}-${topic}`));
    onMessageListener((payload) => console.log("New foreground FCM message: ", payload))
    onBackgroundMessageListener((payload) => console.log("New background FCM message: ", payload));
  }, [topics]);

}

export default useNotifications;