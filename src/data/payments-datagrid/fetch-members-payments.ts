import { APIType, Payment } from '../payments-form/post-member-payment'

async function FetchMembersPaymentsAsync(
  api: APIType,
): Promise<Payment[] | undefined> {
  try {
    const response = await fetch(`${api.apiUrl}/members/payments`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${api.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    const data = await response.json()
    const { payments } = data
    return payments
  } catch (error) {
    console.error('Error fetching data:', error)
    return undefined
  }
}

export default FetchMembersPaymentsAsync
