import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const generateMedicalReportPDF = async (soapNote: string): Promise<void> => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();
  const margin = 50;
  const lineHeight = 16;
  const maxLineWidth = width - 2 * margin;
  const minBottomMargin = 80;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let yPosition = height - margin;

  const checkNewPage = (requiredSpace: number): boolean => {
    if (yPosition - requiredSpace < minBottomMargin) {
      page = pdfDoc.addPage([595, 842]);
      yPosition = height - margin;
      return true;
    }
    return false;
  };

  const addWrappedText = (
    text: string,
    fontSize: number,
    isBold: boolean = false,
    leftIndent: number = 0
  ): void => {
    if (!text.trim()) return;

    const currentFont = isBold ? boldFont : font;
    const words = text.trim().split(/\s+/);
    const availableWidth = maxLineWidth - leftIndent;
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = currentFont.widthOfTextAtSize(testLine, fontSize);

      if (textWidth <= availableWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          checkNewPage(lineHeight + 5);
          page.drawText(currentLine, {
            x: margin + leftIndent,
            y: yPosition,
            size: fontSize,
            font: currentFont,
            color: rgb(0.15, 0.15, 0.15),
          });
          yPosition -= lineHeight;
        }

        if (currentFont.widthOfTextAtSize(word, fontSize) > availableWidth) {
          let remainingWord = word;
          while (remainingWord.length > 0) {
            let charCount = remainingWord.length;
            while (
              charCount > 0 &&
              currentFont.widthOfTextAtSize(remainingWord.substring(0, charCount), fontSize) >
                availableWidth
            ) {
              charCount--;
            }
            if (charCount === 0) charCount = 1;

            checkNewPage(lineHeight + 5);
            page.drawText(remainingWord.substring(0, charCount), {
              x: margin + leftIndent,
              y: yPosition,
              size: fontSize,
              font: currentFont,
              color: rgb(0.15, 0.15, 0.15),
            });
            yPosition -= lineHeight;
            remainingWord = remainingWord.substring(charCount);
          }
          currentLine = '';
        } else {
          currentLine = word;
        }
      }
    }

    if (currentLine) {
      checkNewPage(lineHeight + 5);
      page.drawText(currentLine, {
        x: margin + leftIndent,
        y: yPosition,
        size: fontSize,
        font: currentFont,
        color: rgb(0.15, 0.15, 0.15),
      });
      yPosition -= lineHeight;
    }
  };

  const addSectionHeader = (title: string, withDivider: boolean = true): void => {
    checkNewPage(40);

    if (withDivider && yPosition < height - margin - 20) {
      page.drawLine({
        start: { x: margin, y: yPosition + 5 },
        end: { x: width - margin, y: yPosition + 5 },
        thickness: 0.5,
        color: rgb(0.6, 0.6, 0.6),
      });
      yPosition -= 15;
    }

    page.drawText(title, {
      x: margin,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    yPosition -= 25;
  };

  checkNewPage(100);

  page.drawRectangle({
    x: 0,
    y: yPosition - 10,
    width: width,
    height: 60,
    color: rgb(0.05, 0.25, 0.45),
  });

  page.drawText("SYMPTOM-iSENSE MEDICAL REPORT", {
    x: margin,
    y: yPosition,
    size: 18,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText("Patient-Provided Information for Healthcare Review", {
    x: margin,
    y: yPosition - 20,
    size: 11,
    font: font,
    color: rgb(0.9, 0.9, 0.9),
  });

  yPosition -= 80;

  checkNewPage(60);
  page.drawRectangle({
    x: margin - 5,
    y: yPosition - 25,
    width: maxLineWidth + 10,
    height: 35,
    color: rgb(0.97, 0.97, 0.97),
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 1,
  });

  page.drawText(
    "Generated: " +
      new Date().toLocaleDateString() +
      " at " +
      new Date().toLocaleTimeString(),
    {
      x: margin,
      y: yPosition - 10,
      size: 10,
      font: boldFont,
      color: rgb(0.4, 0.4, 0.4),
    }
  );

  page.drawText("Please review all information with patient during consultation", {
    x: margin,
    y: yPosition - 22,
    size: 9,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  yPosition -= 50;

  const content = soapNote.replace(/^SOAP Note:\s*/i, "").trim();

  if (!content) {
    addWrappedText("No SOAP note content available.", 12);
    yPosition -= 20;
  } else {
    const sections = content.split(/(?=^(?:Subjective|Objective|Assessment|Plan):\s*)/im);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i].trim();
      if (!section) continue;

      const lines = section.split('\n');
      const headerLine = lines[0];
      const contentLines = lines.slice(1);

      const headerMatch = headerLine.match(/^(Subjective|Objective|Assessment|Plan):\s*(.*)/i);

      if (headerMatch) {
        const sectionName = headerMatch[1];
        const firstLineContent = headerMatch[2];

        addSectionHeader(sectionName.toUpperCase(), i > 0);

        if (firstLineContent.trim()) {
          addWrappedText(firstLineContent.trim(), 11, false, 10);
          yPosition -= 8;
        }

        for (const line of contentLines) {
          if (line.trim()) {
            addWrappedText(line.trim(), 11, false, 10);
            yPosition -= 8;
          } else {
            yPosition -= 8;
          }
        }

        yPosition -= 15;
      } else {
        addWrappedText(section, 11);
        yPosition -= 8;
      }
    }
  }

  const footerY = 30;
  page.drawLine({
    start: { x: margin, y: footerY + 15 },
    end: { x: width - margin, y: footerY + 15 },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  page.drawText("This document contains patient-reported symptoms and AI-generated analysis.", {
    x: margin,
    y: footerY,
    size: 8,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  page.drawText("Not a substitute for professional medical examination and diagnosis.", {
    x: width - margin - 220,
    y: footerY,
    size: 8,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const arrayBuffer = pdfBytes.buffer as ArrayBuffer;
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Detailed_Medical_Report.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
