import { useEffect } from 'react'
import { requestPermission, requestToken, onBackgroundMessageListener, suscribeToTopic } from '../firebase';

const useNotifications = ({ topics=[] }: { topics?: string[] }) => {

  useEffect(() => {
    requestPermission();
    requestToken();
    topics.forEach(topic => suscribeToTopic(topic));
    onBackgroundMessageListener((payload) => console.log("New background FCM message: ", payload));
  }, [topics]);

}

export default useNotifications;