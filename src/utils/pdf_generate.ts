import { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import Logo from "/images/til-logo.jpg";
import { getBase64ImageFromURL } from ".";

export interface PDFContent {
  title: string;
  headers: string[];
  rows: string[][];
  totalMonthly: string;
  totalDaily: string;
}

export const generatePDF = async ({
  title,
  headers,
  rows,
  totalDaily,
  totalMonthly,
}: PDFContent): Promise<TDocumentDefinitions> => {
  const header = headers.map((header) => ({
    text: header,
    style: "tableHeader",
  }));
  const body = rows.map((row) =>
    row.map((item) => ({ text: item, style: "tableItem" }))
  );
  return {
    content: [
      {
        alignment: "justify",
        columns: [
          {
            image: await getBase64ImageFromURL(Logo),
            width: 150,
            alignment: "left",
          },
          {
            text: "Үнийн мэдээлэл",
            alignment: "right",
            fontSize: 20,
            bold: true,
            color: "#007FFF",
          },
        ],
      },
      {
        margin: [0, 40, 0, 0],
        // background: "#ebf5ff",

        text: title,
        fontSize: 20,
        bold: true,
        color: "#262e51",
      },
      {
        margin: [0, 20, 0, 0],

        style: "tableExample",

        table: {
          headerRows: 1,
          widths: [150, 100],
          body: [
            header,

            ...body,
            [
              {
                text: "Total price",
                margin: [5, 5, 5, 5],
                fontSize: 16,
                bold: true,
              },
              {
                text: " ",
                margin: [5, 5, 5, 5],
              },
            ],
          ],
        },
        layout: "lightHorizontalLines",
      },
      {
        text: "Дээрх үнэд НӨАТ багтсан болно.",
        alignment: "right",
        color: "#475467",
        fontSize: 10,
        style: "spaceTop",
      },
      {
        text: "(*Таны хэрэглээнээс хамаарч үнэ өөр байж болно)",
        alignment: "right",
        color: "#475467",
        fontSize: 9,
      },

      {
        text: "Дэлгэрэнгүй мэдээлэл авахыг хүсвэл бидэнтэй холбогдоно уу.",
        alignment: "center",
        color: "#262e51",
        // background: "#ebf5ff",

        fontSize: 24,
        bold: true,
        margin: [0, 100, 0, 0],
      },
      {
        alignment: "center",
        style: "spaceTop",

        columns: [
          {
            text: "Холбогдох",
            alignment: "center",
            fontSize: 16,
            color: "#007FFF",
          },
          {
            text: "Утасны дугаар: +976 70189889",
            alignment: "center",
            fontSize: 16,
            color: "#262e51",
          },
          {
            text: "office@til.mn",
            alignment: "center",
            fontSize: 16,
            color: "#262e51",
          },
        ],
      },
      {
        text: "https://www.til.mn, All rights reserved.",
        alignment: "center",
        color: "#475467",
        fontSize: 10,
        style: "spaceTop",
      },
      {
        text: "Монгол улс, Улаанбаатар хот, Баянгол дүүрэг, 4-р хороо, Үйлдвэрийн төвийн бүс – 1, Ажилчны гудамж 16010, Ти Ай Бизнес Центр",
        alignment: "center",
        color: "#475467",
        fontSize: 10,
      },

      // {
      //   image: await getBase64ImageFromURL(Footer.src),
      //   width: 500,
      // },
    ],
    styles: {
      center: {
        alignment: `center`,
      },
      spaceTop: {
        margin: [0, 20, 0, 0],
      },
      spaceBottom: {
        margin: [0, 0, 0, 20],
      },
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        fontSize: 10,
        color: "#475467",
        margin: [5, 5, 5, 5],
      },
      tableItem: {
        fontSize: 12,
        color: "#262e51",
        margin: [5, 5, 5, 5],
      },
    },
    defaultStyle: {
      font: "custom",
      fontSize: 10,
    },
  };
};

export const downloadPDF = (data: TDocumentDefinitions) => {
  const hostname = `${window.location.protocol}//${window.location.host}`;
  pdfMake
    .createPdf(data, undefined, {
      custom: {
        normal: `${hostname}/Manrope/Manrope-Regular.ttf`,
        bold: `${hostname}/Manrope/Manrope-Bold.ttf`,
        italics: `${hostname}/Manrope/Manrope-Regular.ttf`,
        bolditalics: `${hostname}/Manrope/Manrope-Bold.ttf`,
      },
    })
    .open();
};
