import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/slices/modal';

const Modal = ({ text, onRemove }) => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const rootEl = React.useRef();
  const handleCloseModal = () => {
    dispatch(setModal());
  };
  React.useEffect(() => {
    if (modal.isOpen) {
      const onClick = (e) => rootEl.current.contains(e.target) || dispatch(setModal());
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }
  }, []);

  return (
    <>
      <div
        className={`${
          !modal.isOpen ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full flex backdrop-blur-sm`}
        ref={rootEl}
      >
        <div className="relative w-full max-w-md h-full md:h-auto backdrop-blur-none">
          <div className="relative bg-white rounded-lg dark:bg-zinc-700">
            <button
              onClick={handleCloseModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Закрыть</span>
            </button>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
              <button
                onClick={onRemove}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-zinc-600"
              >
                Да
              </button>
              <button
                onClick={handleCloseModal}
                type="button"
                className="ml-5 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-zinc-700 dark:text-gray-300 dark:border-zinc-600 dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-zinc-600"
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
