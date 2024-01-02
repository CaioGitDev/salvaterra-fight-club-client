/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import logo from './logo-base64'
import { Payment, ReceiptProps } from '../types/payments'

class BuildPaymentReceiptPDF {
  constructor(
    private payment: Payment,
    private reciept: ReceiptProps,
  ) {}

  defaultData = {
    pageMargins: {
      left: 31.7,
      top: 25.4,
      right: 31.7,
      bottom: 25.4,
    },
    fonts: {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
      },
    },
    metaData: {
      title: 'Salvaterra Fight Club - Recibo',
      author: 'dev.caiorosa',
      subject: 'Recibo',
      creator: 'dev.caiorosa@gmail.com',
      producer: 'Salvaterra Fight Club',
    },
  }

  CreatePDFDocument() {
    // @ts-ignore
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    // @ts-ignore
    pdfMake.fonts = this.defaultData.fonts

    const documentDefinition = this.BuildDocumentDefinition()

    // @ts-ignore
    return pdfMake.createPdf(documentDefinition)
  }

  BuildDocumentDefinition() {
    return {
      // a string or { width: number, height: number }
      pageSize: 'A4',
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [this.defaultData.pageMargins.left, 110, 20, 60],
      // set document metadata
      info: this.defaultData.metaData,

      header: (currentPage: number, pageCount: number) => {
        return this.BuidDocumentHeader(currentPage, pageCount)
      },

      footer: this.BuildDcomentFooter(),

      content: this.BuildDocumentContent(),

      styles: this.GetDocumentStyles(),
    }
  }

  BuidDocumentHeader(currentPage: number, pageCount: number) {
    const headerStyles = {
      defaultLineHeight: 1,
      primaryText: {
        fontSize: 12,
        bold: false,
        alignment: 'right',
        color: 'gray',
      },
      secondaryText: {
        fontSize: 13,
        bold: true,
        alignment: 'right',
      },
      tertiaryText: {
        fontSize: 11,
        bold: false,
        alignment: 'right',
        color: 'gray',
      },
      quarternaryText: {
        fontSize: 10,
        bold: false,
        alignment: 'right',
        color: 'gray',
      },
    }
    return {
      columns: [
        {
          image: logo,
          fit: [50, 50],
        },
        {
          stack: [
            {
              lineHeight: 1,
              text: 'Original',
              style: headerStyles.primaryText,
            },
            {
              lineHeight: 1,
              text: `Recibo Nº RC ${this.reciept.receiptNumber}`,
              style: headerStyles.secondaryText,
            },
            {
              lineHeight: 1,
              text: `Data da emissão: ${this.reciept.receiptDate.toLocaleDateString(
                'pt-BR',
              )}`,
              style: headerStyles.tertiaryText,
            },
            {
              lineHeight: 1,
              text: `Pág. ${currentPage.toString()} de ${pageCount.toString()}`,
              style: headerStyles.quarternaryText,
            },
          ],
          style: 'header',
        },
      ],
      margin: [
        this.defaultData.pageMargins.left,
        this.defaultData.pageMargins.top,
      ],
    }
  }

  BuildDcomentFooter() {
    const footerStyles = {
      primaryText: {
        fontSize: 10,
        alignment: 'right',
        color: 'gray',
      },
    }

    return {
      margin: [
        this.defaultData.pageMargins.left,
        0,
        this.defaultData.pageMargins.right,
        this.defaultData.pageMargins.bottom,
      ],
      columns: [
        [
          this.BuildLineSeparetor(),
          {
            lineHeight: 1.5,
            stack: [
              {
                text: `Emitido por ${this.defaultData.metaData.producer}`,
                style: footerStyles.primaryText,
              },
            ],
          },
        ],
      ],
    }
  }

  BuildDocumentContent() {
    const tableStyles = {
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: 'black',
      },
      tableRow: {
        fontSize: 10,
        color: 'black',
      },
    }
    const pdfContent = []
    const table = []
    const headerColumn = [
      {
        lineHeight: 3,
        text: 'Salvaterra Fight Club',
        style: { fontSize: 14, bold: true, alignment: 'left' },
      },
      {
        lineHeight: 1.5,
        text: [
          {
            text: 'E-mail:',
            style: { fontSize: 10, bold: true, alignment: 'left' },
          },
          {
            text: this.reciept.receiptEmail,
            style: { fontSize: 10, bold: false, alignment: 'left' },
          },
        ],
      },
      {
        lineHeight: 1.5,
        text: [
          {
            text: 'Contribuinte:',
            style: { fontSize: 10, bold: true, alignment: 'left' },
          },
          {
            text: this.reciept.receiptTaxNumber,
            style: { fontSize: 10, bold: false, alignment: 'left' },
          },
        ],
      },
    ]

    const clientColumn = [
      {
        lineHeight: 3,
        text: this.payment.member.fullName,
        style: {
          fontSize: 12,
          bold: true,
          alignment: 'left',
        },
      },
      {
        lineHeight: 1.5,
        text: [
          {
            text: `${this.FormatPostalCode(
              this.payment.member.Address[0].postalCode,
            )} ${this.payment.member.Address[0].parish}`,
            style: { fontSize: 10 },
          },
        ],
      },
      {
        lineHeight: 1.5,
        text: [
          {
            text: 'Contribuinte:',
            style: { fontSize: 10, bold: true, alignment: 'left' },
          },
          {
            text: ` ${this.payment.member.IdentityDocument[0].taxIdentificationNumber}`,
            style: { fontSize: 10, bold: false, alignment: 'left' },
          },
        ],
      },
    ]

    pdfContent.push({ columns: [headerColumn, clientColumn] })

    pdfContent.push(this.BuildLineSeparetor())

    table.push([
      { text: 'Data Lançamento', style: tableStyles.tableHeader },
      { text: 'Descrição', style: tableStyles.tableHeader },
      { text: 'Data Pagamento', style: tableStyles.tableHeader },
      { text: 'Método Pagamento', style: tableStyles.tableHeader },
      { text: 'Valor', style: tableStyles.tableHeader },
    ])

    table.push([
      {
        text: new Date(this.reciept.receiptDate).toLocaleDateString('pt-BR'),
        style: tableStyles.tableRow,
      },
      {
        text: this.GetPaymentType(this.payment.paymentType),
        style: tableStyles.tableRow,
      },
      {
        text: new Date(this.payment.paymentDate).toLocaleDateString('pt-BR'),
        style: tableStyles.tableRow,
      },
      {
        text: this.GetPaymentMethod(this.payment.paymentMethod),
        style: tableStyles.tableRow,
      },
      {
        text: `${this.payment.paymentAmount.toFixed(2)} €`,
        style: tableStyles.tableRow,
      },
    ])

    pdfContent.push({
      table: {
        widths: '*',
        style: 'table',
        headerRows: 1,
        keepWithHeaderRows: 1,
        body: table,
      },
      layout: 'lightHorizontalLines',
    })

    pdfContent.push(this.BuildLineSeparetor())

    pdfContent.push({
      columns: [
        {
          text: 'Insento Artigo 9.º do CIVA (Ou similar)',
          fontSize: 11,
          color: 'gray',
          bold: false,
          alignment: 'left',
          margin: [0, 20],
        },
        {
          text: `Total Recebido: ${this.payment.paymentAmount.toFixed(2)} €`,
          fontSize: 12,
          bold: true,
          alignment: 'right',
          margin: [10, 20],
        },
      ],
    })

    return pdfContent
  }

  BuildLineSeparetor = () => {
    return {
      canvas: [
        {
          type: 'line',
          x1: 0,
          y1: 5,
          x2: 543,
          y2: 5,
          lineWidth: 0.5,
        },
      ],
    }
  }

  // create function to format 2120060 to 2120-060
  FormatPostalCode = (postalCode: number) => {
    const postalCodeString = postalCode.toString()
    const postalCodeFormated = `${postalCodeString.slice(
      0,
      4,
    )}-${postalCodeString.slice(4, 7)}`
    return postalCodeFormated
  }

  GetPaymentType = (paymentType: string) => {
    switch (paymentType) {
      case 'COTA_MENSAL':
        return 'Cota mensal'
      case 'COTA_ANUAL':
        return 'Cota anual'
      case 'SEGURO':
        return 'Seguro'
      default:
        return 'Não definido'
    }
  }

  GetPaymentMethod = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'MBWAY':
        return 'MBWAY'
      case 'MULTIBANCO':
        return 'Multibanco'
      case 'TRANSFERENCIA_BANCARIA':
        return 'Transferência Bancária'
      case 'DINHEIRO':
        return 'Dinheiro'
      default:
        return 'Não definido'
    }
  }

  GetDocumentStyles() {
    return {
      table: {
        margin: [0, 5, 0, 15],
        lineHeight: 3,
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: 'black',
      },
      tableRow: {
        fontSize: 10,
        color: 'black',
      },
    }
  }
}

export default BuildPaymentReceiptPDF
