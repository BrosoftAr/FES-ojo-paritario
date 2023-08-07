import { useEffect } from 'react'
import { requestPermission, requestToken, onBackgroundMessageListener, suscribeToTopic } from '../firebase';
import { APP_NAME } from '../constants';

const useNotifications = ({ topics=[] }: { topics?: string[] }) => {

  useEffect(() => {
    requestPermission();
    requestToken();
    topics.forEach(topic => suscribeToTopic(`${APP_NAME}-${topic}`));
    onBackgroundMessageListener((payload) => console.log("New background FCM message: ", payload));
  }, [topics]);

}

export default useNotifications;