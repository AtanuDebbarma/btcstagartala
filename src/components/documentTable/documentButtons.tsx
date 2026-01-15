import React from 'react';
import type {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';
import {logger} from '@/utils/logger';

type DocumentType = {
  id: string;
  name: string;
  url: string;
  createdAt: any;
  order?: number;
  public_id?: string;
};

interface Props {
  document: DocumentType;
  setDownloading: Dispatch<SetStateAction<boolean>>;
}

export const DocumentButtons = React.memo(
  ({document, setDownloading}: Props) => {
    const navigation = useNavigate();

    const handleClick = () => {
      setTimeout(() => {
        void navigation(`/pdf-viewer?file=${document.url}`);
      }, 200);
    };

    const handleDownloadClick = async () => {
      try {
        setDownloading(true);
        const response = await fetch(document.url, {
          mode: 'cors',
        });
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = window.document.createElement('a');
        link.href = blobUrl;
        link.download = `${document.name}.pdf`;
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        logger.error('Download failed:', error);
        alert('Download failed. Please try again.');
      } finally {
        setDownloading(false);
      }
    };

    return (
      <td className="px-4 py-1 sm:px-8 sm:py-3">
        <div className="flex justify-center gap-2">
          <button
            onClick={handleClick}
            className="cursor-pointer rounded bg-[#900090] p-2 text-white transition-transform duration-180 ease-in-out active:scale-95">
            <i className="fa-solid fa-eye"></i>
          </button>
          <button
            onClick={handleDownloadClick}
            className="cursor-pointer rounded border border-[#900090] p-2 text-[#900090] transition-transform duration-180 ease-in-out active:scale-95">
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </td>
    );
  },
);
