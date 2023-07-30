import React, { useEffect, useRef } from 'react';
import './styles.css';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { Tooltip } from '@mui/material';

function BackToTop() {
  const myBtnRef = useRef(null);

  useEffect(() => {
    const scrollFunction = () => {
      const myBtn = myBtnRef.current;
      if (myBtn) {
        if (
          document.body.scrollTop > 250 ||
          document.documentElement.scrollTop > 250
        ) {
          myBtn.style.display = 'flex';
        } else {
          myBtn.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', scrollFunction);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Tooltip placement="bottom-start" title={'Top'}>
      <div
        className="top-btn"
        ref={myBtnRef}
        onClick={topFunction}
      >
        <ArrowUpwardRoundedIcon className="arrow" />
      </div>
    </Tooltip>
  );
}

export default BackToTop;