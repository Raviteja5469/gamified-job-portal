import React from 'react'
import { useJobPortal } from '../context/JobPortalContext.jsx';

function ReferralSection() {
  const { referralLink, referrals } = useJobPortal();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const pendingReferrals = referrals.filter(r => r.status === 'Pending').length;
  const successfulReferrals = referrals.filter(r => r.status === 'Successful').length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Referrals</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Your Referral Link:</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="px-4 py-2 rounded-md border border-gray-300 w-full"
          />
          <button
            onClick={handleCopyLink}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p>Pending Referrals: {pendingReferrals}</p>
        <p>Successful Referrals: {successfulReferrals}</p>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Email</th>
            <th className="py-2">Status</th>
            <th className="py-2">Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map(referral => (
            <tr key={referral.id} className="border-b">
              <td className="py-2">{referral.email}</td>
              <td className="py-2">{referral.status}</td>
              <td className="py-2">{referral.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReferralSection;