import React from 'react';
import { FaDownload } from 'react-icons/fa';

interface DownloadReportButtonProps {
  onClick: () => void;
  hasReport: boolean;
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({ onClick, hasReport }) => {
  if (!hasReport) {
    return null;
  }

  return (
    <div className="mt-6 text-center border-t border-muted/20 pt-4">
      <p className="text-sm text-dark mb-2">A summary for your doctor is ready.</p>
      <button
        onClick={onClick}
        className="mt-2 px-6 py-3 bg-blue-50 text-blue-800 font-semibold rounded-lg shadow-lg border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex items-center gap-2 mx-auto"
      >
        <FaDownload className="text-lg" />
        Download Doctor Report (PDF)
      </button>
    </div>
  );
};

export default DownloadReportButton;
