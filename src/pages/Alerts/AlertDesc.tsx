import {appStore} from '@/appStore/appStore';
import {AlertsType} from '@/types/homeTypes';
import {convertFirebaseTimestampToDate} from '@/utils/dateTransform';
import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

const AlertDesc: React.FC = () => {
  const {id} = useParams<{id: string; title: string}>();
  const alerts = appStore(state => state.alerts);
  const [alertData, setAlertData] = useState<AlertsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigate();

  useEffect(() => {
    if (id && alerts) {
      const foundAlert = alerts.find(alert => alert.id === id);
      setAlertData(foundAlert || null);
    }
    setLoading(false);
  }, [id, alerts]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!alertData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Alert not found</h1>
        <Link to="/alerts" className="mt-4 text-blue-600 hover:underline">
          Back to Alerts
        </Link>
      </div>
    );
  }

  const handleNavClick = (url: string) => {
    setTimeout(() => {
      navigation(`/pdf-viewer?file=${url}`);
    }, 200);
  };
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Alert Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          {alertData.title}
        </h1>
        {alertData.createdAt && (
          <div className="mb-4 text-sm text-gray-500">
            Published on {convertFirebaseTimestampToDate(alertData.createdAt)}
          </div>
        )}
      </div>

      {/* Alert Content */}
      <div className="prose mb-8 max-w-none">
        <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">
          {alertData.content}
        </p>
      </div>

      {/* File Section */}
      {alertData.fileName && alertData.fileURL && (
        <div className="mb-8 rounded-lg bg-gray-50 p-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Attachment
          </h2>
          <button
            onClick={() => handleNavClick(alertData.fileURL)}
            className="flex cursor-pointer items-center text-blue-600 hover:text-blue-800">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {alertData.fileName}
          </button>
        </div>
      )}
      {/* Links Section */}
      {(alertData.link1Name || alertData.link2Name) && (
        <div className="mb-8 rounded-lg bg-gray-50 p-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Related Links
          </h2>
          <div className="flex flex-col space-y-2">
            {alertData.link1Name &&
              alertData.link1Url &&
              (alertData.link1Url.toLowerCase().endsWith('.pdf') ? (
                // PDF Button for link1
                <button
                  onClick={() => handleNavClick(alertData.link1Url)}
                  className="flex cursor-pointer items-center text-blue-600 hover:text-blue-800">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  {alertData.link1Name}
                </button>
              ) : (
                // Regular external link for link1
                <a
                  href={alertData.link1Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  {alertData.link1Name}
                </a>
              ))}

            {alertData.link2Name &&
              alertData.link2Url &&
              (alertData.link2Url.toLowerCase().endsWith('.pdf') ? (
                // PDF Button for link2
                <button
                  onClick={() => handleNavClick(alertData.link2Url)}
                  className="flex cursor-pointer items-center text-blue-600 hover:text-blue-800">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  {alertData.link2Name}
                </button>
              ) : (
                // Regular external link for link2
                <a
                  href={alertData.link2Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  {alertData.link2Name}
                </a>
              ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-8">
        <Link
          to="/alerts"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Alerts
        </Link>
      </div>
    </div>
  );
};

export default AlertDesc;
