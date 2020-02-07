import React, { useRef, useEffect, useState } from 'react';
import { TweenMax } from 'gsap';
import { Button } from '@material-ui/core';
import { SDK } from '@directus/sdk-js';

export default () => {
  const client = new SDK({
    url: 'http://localhost:8765',
    project: 'directus'
  });
  const [isDirectus, setIsDirectus] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await client.ping();
        setIsDirectus(true);
      } catch (err) {
        setIsDirectus(false);
      }
    })();
    return () => client.logout();
  }, [isDirectus]);

  const anim = useRef();
  useEffect(() => {
    if (anim.current) {
      TweenMax.fromTo(
        anim.current,
        1,
        { width: 80 },
        {
          width: '90%',
          yoyo: true,
          repeat: -1,
          border: 'solid 1px'
        }
      );
    }
  });

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        border: 'solid 1px',
        borderRadius: '5px'
      }}
    >
      Additional dependencies
      <hr />
      <div>
        styled-jsx ok
        <style jsx>{`
          div {
            width: 150px;
            border: solid 1px;
            padding: 10px;
            border-radius: 5px;
          }
        `}</style>
      </div>
      <Button variant="outlined">Material-ui ok</Button>
      <div style={{ position: 'relative' }} ref={anim}>
        Gsap ok
      </div>
      <div style={{ padding: '10px', border: 'solid 1px' }}>
        @directus/sdk-js : connection {isDirectus ? 'OK' : 'NONE'}
      </div>
    </div>
  );
};
