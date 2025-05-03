import {NoticeBoardType} from '@/types/homeTypes';
import React from 'react';
import {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';

interface PROPS {
  notice: NoticeBoardType;
  setDownloading: Dispatch<SetStateAction<boolean>>;
}

export const NoticeButtons = React.memo(({notice, setDownloading}: PROPS) => {
  const navigation = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigation(`/pdf-viewer?file=${notice.url}`);
    }, 200);
  };

  const handleDownloadClick = async () => {
    try {
      setDownloading(true);
      const response = await fetch(notice.url, {
        mode: 'cors',
      });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${notice.name}.pdf`; // you can sanitize filename here if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };
  return (
    <>
      <td className="px-4 py-1 sm:px-8 sm:py-3">
        <div className="flex justify-center gap-2">
          <button
            onClick={handleClick}
            className="cursor-pointer rounded bg-blue-500 p-2 text-white transition-transform duration-180 ease-in-out active:scale-95">
            <i className="fa-solid fa-eye"></i>
          </button>
          <button
            onClick={handleDownloadClick}
            className="cursor-pointer rounded border border-blue-500 p-2 text-blue-500 transition-transform duration-180 ease-in-out active:scale-95">
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </td>
    </>
  );
});
