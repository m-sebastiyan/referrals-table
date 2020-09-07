import React from 'react'
import Checkbox from './Checkbox'

import './Filter.css'

const statuses = {
  pending: 'Pending',
  flagged: 'Flagged',
  in_progress: 'In progress',
  blocked: 'Blocked',
  voided: 'Voided',
  approved: 'Approved',
}

const fraudReasons = [
  'Matching Email or Cookie on Friend Purchase',
  'Similar Email Match',
  'Matching Shipping Address',
  'Matching by Combination of IP Address & User Agent',
  'Matching by IP Address only',
  'Friend and Advocate Refer Each Other'
]

const Filter = ({ statusFilters, fraudFilters, onStatusFilter, onFraudTypeFilter }) => (
  <div className="filter-container">
    <h3>Statuses</h3>
    {Object.keys(statuses).map((key) => (
      <Checkbox
        key={key}
        title={statuses[key]}
        value={statusFilters[key]}
        onChange={({ target: { checked } }) => onStatusFilter(key, checked)}
      />
    ))}

    <h3>Fraud reasons</h3>
    {fraudReasons.map((fraudReason) => (
      <Checkbox
        key={fraudReason}
        title={fraudReason}
        value={fraudFilters.includes[fraudReason]}
        onChange={({ target: { checked } }) => onFraudTypeFilter(fraudReason, checked)}
      />
    ))}
  </div>
)

export default Filter