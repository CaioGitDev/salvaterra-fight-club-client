type ColumnsType = {
  apiUrl: string
  accessToken: string
  columns: string[]
}

type MembersAutocomplete = {
  id: string
  fullName: string
}

async function FetchMembersColumns(
  columnsType: ColumnsType,
): Promise<MembersAutocomplete[] | undefined> {
  try {
    const response = await fetch(`${columnsType.apiUrl}/members/columns`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${columnsType.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ columns: columnsType.columns }),
    })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    const data = await response.json()
    const { members } = data
    return members
  } catch (error) {
    console.error('Error fetching data:', error)
    return undefined
  }
}

export default FetchMembersColumns
