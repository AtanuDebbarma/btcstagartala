import {useSearchParams} from 'react-router-dom';

export const PdfIframe = () => {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get('file');

  if (!fileUrl) return <p>No file provided</p>;

  return (
    <div className="absolute z-9999 h-full w-full">
      <iframe
        src={fileUrl}
        width="100%"
        height="100%"
        style={{border: 'none'}}
        title="PDF Viewer"
      />
    </div>
  );
};
