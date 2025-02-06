import { TDocumentDefinitions } from "pdfmake/interfaces";
import pdfMake from "pdfmake/build/pdfmake";
import Logo from "/images/til-logo.jpg";
import { getBase64ImageFromURL } from ".";

export interface PDFContent {
  title: string;
  headers: string[];
  rows: string[][];
  ticketNumber: string;
  totalMoney: number;
  totalMonthly: number;
}

export const generatePDF = async ({
  title,
  headers,
  rows,
  ticketNumber,
  totalMoney,
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
            stack: [
              {
                text: "ТИ АЙ ЛОЖИСТИК ХХК - ТЭЭВЭР ҮЙЛЧИЛГЭЭНИЙ ЦОГЦОЛБОР",
                alignment: "right",
                fontSize: 11,
                bold: true,
                color: "#475467",
              },
              {
                text: "ЭЛДЭВ ХУРААМЖ ТАСАЛБАР ТАЛОН ҮЙЛДВЭР",
                alignment: "right",
                fontSize: 13,
                bold: true,
                color: "#475467",
                margin: [0, 5, 0, 0],
              },
            ],
          },
        ],
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `Он, сар, өдөр: ..................`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `№: _________________`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `Төлөгч байгууллага: ..................`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `НҮ №: _________________`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: ["5%", "50%", "45%"],
          body: [
            [
              { text: "№", style: "tableHeader" },
              { text: "Үйлчилгээний нэр", style: "tableHeader" },
              { text: "Дүн", style: "tableHeader" },
            ],
            ...Array.from({ length: 9 }).map((row, index) => [
              { text: index + 1, style: "tableItem" },
              { text: "", style: "tableItem" },
              { text: "", style: "tableItem", alignment: "right" },
            ]),
          ],
        },
        layout: {
          hLineWidth: function (i: number, node: any) {
            return i === 0 || i === node.table.body.length ? 1 : 0.5;
          },
          vLineWidth: function () {
            return 1;
          },
          hLineColor: function () {
            return "#aaa";
          },
          vLineColor: function () {
            return "#aaa";
          },
        },
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `Контайнер №: .....................`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `Бүгд дүн:.................................`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `Талбайд буусан огноо: ${Array.from({ length: 25 }).join(
              "."
            )}`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `Үүнээс бэлэн:${Array.from({ length: 25 }).join(".")}`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        text: `Бэлэн бус: ${Array.from({ length: 25 }).join(".")}`,
        alignment: "right",
        color: "#475467",
        fontSize: 11,
        style: "spaceTop",
      },
      {
        text: `Үсгээр: ${Array.from({ length: 50 })
          .map(() => "_")
          .join("")}`,
        alignment: "left",
        color: "#475467",
        fontSize: 11,
        style: "spaceTop",
      },
      {
        alignment: "justify",
        columns: [
          {
            text: `Огноо: .....................`,
            alignment: "left",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
          {
            text: `Ачааны нярав: .....................`,
            alignment: "right",
            color: "#475467",
            fontSize: 11,
            style: "spaceTop",
          },
        ],
      },
      {
        text: `Тушаагч: ......................`,
        alignment: "right",
        color: "#475467",
        fontSize: 11,
        style: "spaceTop",
      },
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
        margin: [0, 30, 0, 15],
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
