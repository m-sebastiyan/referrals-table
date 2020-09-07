import React from 'react'

import './Table.css'

const isFraud = (fraudPoliciesStatus) => fraudPoliciesStatus.blocked || fraudPoliciesStatus.flagged

const getFraudTitleClass = (fraudPoliciesStatus) => `subtitle ${isFraud(fraudPoliciesStatus) ? 'error' : ''}`

const formatDate = (date) => new Date(date).toUTCString();

const getStatusString = (status) => {
  const statuses = {
    pending: 'Pending',
    flagged: 'Flagged',
    in_progress: 'In progress',
    blocked: 'Blocked',
    voided: 'Voided',
    approved: 'Approved',
  }

  return statuses[status]
}

const getReasonsString = (fraudPoliciesStatus) => {
  return [
    ...fraudPoliciesStatus.blocked,
    ...fraudPoliciesStatus.flagged
  ].join(', ')
}

const Table = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Referral event</th>
        <th>Advocate</th>
        <th>Friend</th>
        <th>Referral status</th>
      </tr>
    </thead>

    <tbody>
      {data.map(({ friend, advocate, referral }) => (
        <tr key={referral.id}>
          <td className="row">
            <p className="title capitalize">{friend.origin.event_category_identifier}</p>
            <p className="subtitle">{formatDate(friend.origin.created_at)}</p>
            <p className="price">{friend.origin.subtotal}</p>
          </td>
          <td>
            <p className="title">{advocate.person.email}</p>
            <p>Advocate</p>
          </td>
          <td>
            <p className="title">{friend.person.email}</p>
            <p>Friend</p>
          </td>
          <td>
            <p className="title">{getStatusString(referral.status)}</p>
            <p className={getFraudTitleClass(referral.fraud_policies_status)}>
              {isFraud(referral.fraud_policies_status) ? (
                'Marked as fraud'
              ) : (
                'Passed fraud checks'
              )}
            </p>
            <p className="subtitle">
              {getReasonsString(referral.fraud_policies_status)}
            </p>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default Table