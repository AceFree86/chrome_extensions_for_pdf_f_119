import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

function countCharacters(str) {
  return str.length;
}

function setYCoordinats(str) {
  if (countCharacters(str) > 90) {
    return 271;
  }
  return 255;
}

async function modifyPdf(copy) {
  const url = await chrome.storage.local.get(["ukrposhta"]);
  const url_1 = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";

  let fontBytes = await fetch(url_1).then((res) => res.arrayBuffer());

  const responsePdfBytes = await fetch(url.ukrposhta).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(responsePdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const text = copy;

  const maxCharactersPerParagraph = 53;

  if (countCharacters(text) < maxCharactersPerParagraph) {
    firstPage.drawText(text, {
      x: 228,
      y: 205,
      size: 12,
      font: customFont,
      color: rgb(0, 0, 0),
    });
  } else if (countCharacters(text) > maxCharactersPerParagraph) {
    const paragraphs = [];
    for (let i = 0; i < text.length; i += maxCharactersPerParagraph) {
      const paragraph = text.substring(i, i + maxCharactersPerParagraph);
      paragraphs.push(paragraph);
    }

    const firstParagraph = paragraphs[0] || "";
    const secondParagraph = paragraphs[1] || "";

    firstPage.drawText(firstParagraph, {
      x: 228,
      y: 205,
      size: 12,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(secondParagraph, {
      x: 228,
      y: setYCoordinats(text),
      size: 12,
      font: customFont,
      color: rgb(0, 0, 0),
    });
  }

  const selected = await chrome.storage.local.get(["pdfHorizontal"]);

  if (
    selected.pdfHorizontal === "unchecked" ||
    typeof selected.pdfHorizontal === "undefined"
  ) {
    firstPage.setSize(612, 870);
    firstPage.translateContent(-3, 575);
  } else {
    console.log("");
  }
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const dataUrl = URL.createObjectURL(blob);
  window.open(dataUrl, "_blank");
  await chrome.storage.local.remove(["ukrposhta"]);
  console.log("Done");
}

export default modifyPdf;
