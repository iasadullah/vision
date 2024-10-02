export const handleExport = (data: any) => {
  const csvRows: string[] = []
  const headers = Object.keys(data[0])

  // Add headers to the CSV
  csvRows.push(headers.join(','))

  // Add each row to the CSV
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = String(row[header]).replace(/"/g, '""')

      return `"${escaped}"`
    })

    csvRows.push(values.join(','))
  }

  const csvString = csvRows.join('\n')
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', 'data.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
