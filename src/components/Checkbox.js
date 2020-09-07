import React from 'react'

const Checkbox = ({ title, onChange, value }) => (<div className="checkbox">
  <input type="checkbox" onChange={onChange} checked={value} />
  <label>{title}</label>
</div>)

export default Checkbox