import { useEffect, useRef, useState } from 'react';

export default function useTimeoutableInterval(intervalCb, iDelay, timeoutCb, tDelay) {
  const savedIntervalCb = useRef(intervalCb);
  const savedTimeoutCb = useRef(timeoutCb);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    savedIntervalCb.current = intervalCb;
  }, [intervalCb]);

  useEffect(() => {
    setHasTimedOut(false);
  }, [iDelay, tDelay]);

  useEffect(() => {
    let id;
    if (!hasTimedOut && iDelay) {
      id = setInterval(() => {
        savedIntervalCb.current();
      }, iDelay);
    }
    return () => {
      clearInterval(id);
    };
  }, [iDelay, hasTimedOut]);

  useEffect(() => {
    let id;
    if (tDelay != null) {
      id = setTimeout(() => {
        setHasTimedOut(true);
        savedTimeoutCb.current && savedTimeoutCb.current();
      }, tDelay);
    }
    return () => {
      clearTimeout(id);
    };
  }, [tDelay]);
}
