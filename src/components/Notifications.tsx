import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestPermission, requestToken, onMessageListener, onBackgroundMessageListener, suscribeToTopic } from '../firebase';
import { APP_NAME } from '../constants';

const Notification = () => {
  const [notification, setNotification] = useState({title: '', body: ''});
  const notify = () =>  toast(<ToastDisplay/>);

  useEffect(() => {
    requestPermission();
    requestToken();
    suscribeToTopic(`${APP_NAME}-news`);
    onMessageListener((payload) => {
      console.log("New foreground FCM message: ", payload);
      setNotification({title: payload.gcm.title, body: payload.gcm.body})
    })
    onBackgroundMessageListener((payload) => console.log("New background FCM message: ", payload));
  }, []);
  
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title ) notify()
  }, [notification, notify])

  return (
     <Toaster/>
  )
}

export default Notification