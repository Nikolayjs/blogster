import React from 'react';
import IconUp from '../Icons/IconUp';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);
  window.onscroll = () => {
    let posTop =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : document.documentElement || document.body.parentNode || document.body;
    if (posTop > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const backToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      {visible && (
        <div onClick={backToTop} className="fixed right-6 bottom-6 group">
          <button
            type="button"
            className="flex justify-center items-center ml-auto w-14 h-14 text-white bg-blue-700 rounded-full hover:bg-blue-800 active:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800"
          >
            <IconUp />
            <span className="sr-only">Наверх</span>
          </button>
        </div>
      )}
    </>
  );
};

export default BackToTop;
