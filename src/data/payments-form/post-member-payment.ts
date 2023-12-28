export type APIType = {
  apiUrl: string
  accessToken: string
}

export type Payment = {
  id: number
  memberId: number
  paymentType: string
  paymentMethod: string
  paymentAmount: number
  paymentDate: Date
  createdAt: Date
  createdBy: string
  updatedAt: Date
  member: {
    membershipNumber: number
    fullName: string
    Address: [
      {
        postalCode: number
        parish: string
      },
    ]
    IdentityDocument: [
      {
        taxIdentificationNumber: number
      },
    ]
  }
}

type PaymentToDb = {
  memberId: number
  paymentType: string
  paymentMethod: string
  paymentAmount: number
  paymentDate: Date
}

async function PostMemberPaymentAsync(api: APIType, paymentData: PaymentToDb) {
  try {
    const response = await fetch(`${api.apiUrl}/member/payment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${api.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    const data = await response.json()
    const { payment } = data
    return payment
  } catch (error) {
    console.error('Error fetching data:', error)
    return undefined
  }
}

export default PostMemberPaymentAsync
