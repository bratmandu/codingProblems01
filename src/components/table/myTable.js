import React, {
  useState, useEffect
} from 'react'
import {v4 as uuid} from 'uuid'
import './table.scss'

function MyTable() {
  const headerCols = [
    'ID',
    'First Name',
    'Second Name',
    'Active',
    'Salary',
    'Delete'
  ]

  const [mainData, setMainData] = useState([])
  const [editingRow, setEditingRow] = useState()

  const siteCode = '713a6c1a-a5da-42d6-ae57-58f513ab838d'
  const myUrl = `https://run.mocky.io/v3/${siteCode}`

  useEffect(() => {
    console.log('I am a use effect hook')
    if (mainData.length === 0) {
      fetch(myUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log('data received: ', data)
          setMainData(data)
        })
    }
  })

  const removeRow = (rowData) => {
    setMainData(mainData.filter((row) => (row.id !== rowData.id)))
  }

  const updateRow = (value, rowData, field) => {
    const rowToUpdate = mainData.filter((row) => (row.id === rowData.id))
    rowToUpdate[0][field] = value
  }

  return (
    <table className="myTable">
      <thead>
        <tr>
          {headerCols.map((col) => (
            <td key={uuid()}>
              {col}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {mainData.map((data) => (
          <tr key={uuid()}>
            {Object.entries(data).map(([prop, value]) => (
              <td
                key={uuid()}
                contentEditable={data.id === editingRow}
                field={prop}
                onBlur={(event) => {
                  updateRow(event.target.innerHTML, data, prop)
                }}
              >
                {value}
              </td>
            ))}
            <td key={uuid()}>
              <button type="button" onClick={() => { removeRow(data) }}>
                Delete Row
              </button>
              <button type="button" onClick={() => { setEditingRow(data.id) }}>
                Edit Row
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MyTable
