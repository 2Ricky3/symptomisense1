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
            color: rgb(0.161, 0.208, 0.251), 
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
              color: rgb(0.161, 0.208, 0.251), 
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
        color: rgb(0.161, 0.208, 0.251), 
      });
      yPosition -= lineHeight;
    }
  };

  const addSectionHeader = (title: string, withDivider: boolean = true): void => {
    checkNewPage(50);

    if (withDivider && yPosition < height - margin - 20) {
    
      page.drawLine({
        start: { x: margin, y: yPosition + 8 },
        end: { x: width - margin, y: yPosition + 8 },
        thickness: 1,
        color: rgb(0.85, 0.87, 0.89),
      });
      yPosition -= 18;
    }

    page.drawRectangle({
      x: margin - 5,
      y: yPosition - 5,
      width: 4,
      height: 20,
      color: rgb(0.361, 0.416, 0.451), 
    });


    page.drawRectangle({
      x: margin - 5,
      y: yPosition - 5,
      width: maxLineWidth + 10,
      height: 22,
      color: rgb(0.97, 0.98, 0.99),
    });

    page.drawText(title, {
      x: margin + 8,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0.082, 0.125, 0.149), 
    });
    yPosition -= 30;
  };

  checkNewPage(120);


  page.drawRectangle({
    x: 0,
    y: yPosition - 10,
    width: width,
    height: 70,
    color: rgb(0.082, 0.125, 0.149), 
  });

  
  page.drawRectangle({
    x: 0,
    y: yPosition + 60,
    width: width,
    height: 4,
    color: rgb(0.361, 0.416, 0.451), 
  });

  
  page.drawRectangle({
    x: margin,
    y: yPosition + 20,
    width: 32,
    height: 32,
    color: rgb(0.361, 0.416, 0.451), 
  });

  page.drawRectangle({
    x: margin + 3,
    y: yPosition + 23,
    width: 26,
    height: 26,
    color: rgb(0.271, 0.314, 0.349), 
  });

  
  page.drawRectangle({
    x: margin + 13,
    y: yPosition + 26,
    width: 6,
    height: 20,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: margin + 6,
    y: yPosition + 33,
    width: 20,
    height: 6,
    color: rgb(1, 1, 1),
  });

  page.drawText("SYMPTOM-iSENSE", {
    x: margin + 45,
    y: yPosition + 32,
    size: 20,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText("MEDICAL REPORT", {
    x: margin + 45,
    y: yPosition + 14,
    size: 12,
    font: font,
    color: rgb(0.8, 0.85, 0.9),
  });

  page.drawText("Patient-Reported Assessment & Clinical Documentation", {
    x: margin,
    y: yPosition - 5,
    size: 10,
    font: font,
    color: rgb(0.85, 0.9, 0.95),
  });

  yPosition -= 95;

  checkNewPage(75);
  
  
  page.drawRectangle({
    x: margin - 5,
    y: yPosition - 45,
    width: maxLineWidth + 10,
    height: 50,
    color: rgb(0.98, 0.99, 1),
    borderColor: rgb(0.271, 0.314, 0.349), 
    borderWidth: 2,
  });


  page.drawRectangle({
    x: margin - 5,
    y: yPosition - 45,
    width: 5,
    height: 50,
    color: rgb(0.361, 0.416, 0.451), 
  });


  page.drawRectangle({
    x: margin + 5,
    y: yPosition - 20,
    width: 10,
    height: 10,
    borderColor: rgb(0.361, 0.416, 0.451),
    borderWidth: 1.5,
  });

  page.drawLine({
    start: { x: margin + 10, y: yPosition - 15 },
    end: { x: margin + 10, y: yPosition - 18 },
    thickness: 1.5,
    color: rgb(0.361, 0.416, 0.451),
  });

  page.drawLine({
    start: { x: margin + 10, y: yPosition - 15 },
    end: { x: margin + 13, y: yPosition - 15 },
    thickness: 1.5,
    color: rgb(0.361, 0.416, 0.451),
  });

  const dateText = "Generated: " + new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();
  page.drawText(dateText, {
    x: margin + 22,
    y: yPosition - 18,
    size: 10,
    font: boldFont,
    color: rgb(0.082, 0.125, 0.149), 
  });


  page.drawRectangle({
    x: margin + 5,
    y: yPosition - 40,
    width: 10,
    height: 10,
    borderColor: rgb(0.361, 0.416, 0.451),
    borderWidth: 1.5,
  });

  page.drawText("i", {
    x: margin + 7.5,
    y: yPosition - 38,
    size: 9,
    font: boldFont,
    color: rgb(0.361, 0.416, 0.451),
  });

  page.drawText("Please review all information with patient during consultation", {
    x: margin + 22,
    y: yPosition - 38,
    size: 9,
    font: font,
    color: rgb(0.361, 0.416, 0.451), 
  });

  yPosition -= 70;

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

  const footerY = 35;
  
 
  page.drawRectangle({
    x: 0,
    y: footerY - 10,
    width: width,
    height: 30,
    color: rgb(0.98, 0.99, 1),
  });

 
  page.drawRectangle({
    x: 0,
    y: footerY + 20,
    width: width,
    height: 2,
    color: rgb(0.361, 0.416, 0.451), 
  });


  page.drawText("!", {
    x: margin + 3,
    y: footerY + 2,
    size: 10,
    font: boldFont,
    color: rgb(0.361, 0.416, 0.451),
  });


  page.drawRectangle({
    x: margin,
    y: footerY,
    width: 12,
    height: 12,
    borderColor: rgb(0.361, 0.416, 0.451),
    borderWidth: 1.5,
  });

  page.drawText("This document contains patient-reported symptoms and AI-generated analysis.", {
    x: margin + 18,
    y: footerY + 2,
    size: 8,
    font: font,
    color: rgb(0.361, 0.416, 0.451), 
  });

  page.drawText("Not a substitute for professional medical examination and diagnosis.", {
    x: margin + 18,
    y: footerY - 7,
    size: 8,
    font: boldFont,
    color: rgb(0.082, 0.125, 0.149), 
  });


  page.drawText("Page 1", {
    x: width - margin - 30,
    y: footerY,
    size: 8,
    font: font,
    color: rgb(0.361, 0.416, 0.451),
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
