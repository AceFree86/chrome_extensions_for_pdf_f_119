import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

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
  console.log(text);
  firstPage.drawText(text, {
    x: 228,
    y: 205,
    size: 12,
    font: customFont,
    color: rgb(0, 0, 0),
  });
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
