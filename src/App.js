import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Table from './components/Table'
import Filter from './components/Filter'

const API_URL = 'http://localhost:3000/referrals_230.json'

const filterByFraud = (fraudFilters, fraudPoliciesStatus) => [
  ...fraudPoliciesStatus.blocked,
  ...fraudPoliciesStatus.flagged
]
  .find((fraudStatus) => fraudFilters.includes(fraudStatus))

class App extends Component {
  state = {
    isLoading: true,
    data: [],
    statusFilters: {
      pending: false,
      flagged: false,
      in_progress: false,
      blocked: false,
      voided: false,
      approved: false,
    },
    fraudFilters: []
  }

  componentDidMount() {
    axios(API_URL)
      .then((response) => {
        this.setState({ data: response.data.result.records, isLoading: false })
      })
      .catch((err) => console.log(err))
  }

  onSelect({ target: { checked } }) {
    console.log(checked)
  }

  onStatusFilter = (key, checked) => {
    this.setState({
      statusFilters: {
        ...this.state.statusFilters,
        [key]: checked,
      }
    })
  }

  onFraudTypeFilter = (key, checked) => {
    this.setState({
      fraudFilters: checked
        ? [...this.state.fraudFilters, key]
        : this.state.fraudFilters.filter((fraudFilter) => fraudFilter !== key)
    })
  }

  render() {
    const { data, isLoading, statusFilters, fraudFilters } = this.state

    const filteredData = data.filter(({ referral: { status, fraud_policies_status } }) => {
      const filter = statusFilters[status];

      if(fraudFilters.length > 0) {
        return filter && filterByFraud(fraudFilters, fraud_policies_status)
      }
      return filter
    })

    return (
      isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="app">
          <div className="app__header">
            <h2>Refferals - {filteredData.length}</h2>
          </div>
          <div>
            <Filter
              statusFilters={statusFilters}
              fraudFilters={fraudFilters}
              onStatusFilter={this.onStatusFilter}
              onFraudTypeFilter={this.onFraudTypeFilter}
            />
          </div>
          <div className="app__container">
            <Table data={filteredData} />
          </div>
        </div>
      )
    );
  }
}

export default App;
