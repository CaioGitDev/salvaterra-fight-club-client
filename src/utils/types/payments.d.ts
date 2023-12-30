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

export type PaymentToDb = {
  memberId: number
  paymentType: string
  paymentMethod: string
  paymentAmount: number
  paymentDate: Date
}

export type ReceiptProps = {
  receiptNumber: string
  receiptDate: Date
  receiptEmail: string
  receiptTaxNumber: string
}

export type Receipt = {
  id: number
  paymentId: number
  receiptNumber: number
  receiptYear: number
  receiptTaxDescription: string
  receiptTaxPercentage: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export type ReceiptToDb = {
  paymentId: number
  receiptTaxDescription: string
  receiptTaxPercentage: number
}
