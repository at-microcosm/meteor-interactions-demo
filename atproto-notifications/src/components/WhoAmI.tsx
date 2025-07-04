import { useRef, useEffect } from 'react';

export function WhoAmI({ onIdentify, origin = 'http://127.0.0.1:9997' }) {
  const frameRef = useRef(null);

  useEffect(() => {
    function handleMessage(ev) {
      if (
        ev.source !== frameRef.current?.contentWindow ||
        ev.origin !== origin
      ) return;
      onIdentify(ev.data);
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      src={`${origin}/prompt`}
      ref={frameRef}
      height="160"
      width="320"
      style={{
        border: 'none',
        display: 'block',
        colorScheme: 'none',
        margin: '0 auto',
      }}
    >
      Ooops, failed to load the login helper
    </iframe>
  );
}
