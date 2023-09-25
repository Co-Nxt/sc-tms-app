import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const TableToPDF = () => {
  const tableRef = useRef(null);

  const exportToPDF = () => {
    const input = tableRef.current;

    // Create a new jsPDF instance
    const pdf = new jsPDF("l", "mm", "a4");

    // Load the header image
    const img = new Image();
    img.src = "/src/assets/images/logo_time.png"; // Replace with your image source
    img.onload = function () {
      // After the image is loaded, add it to the PDF
      pdf.addImage(img, "PNG", 10, 15, 30, 5); // Adjust image size and position

      // Calculate the X-position for centered text
      const headerContent = "TIMESHEET";
      const headerSubtitle = "September 2023";
      const headerFontSize = 16;
      const subtitleFontSize = 12;
      const textWidth =
        (pdf.getStringUnitWidth(headerContent) * headerFontSize) /
        pdf.internal.scaleFactor;
      const subtitleWidth =
        (pdf.getStringUnitWidth(headerSubtitle) * subtitleFontSize) /
        pdf.internal.scaleFactor;
      const centerX = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
      const subtitleX = (pdf.internal.pageSize.getWidth() - subtitleWidth) / 2;

      // Add a line under the image that spans the entire width of the page
      pdf.setLineWidth(0.5); // Adjust the line width as needed
      pdf.line(10, 22, pdf.internal.pageSize.getWidth() - 10, 22); // Span the entire width

      // Add the centered header text below the line
      pdf.setFontSize(headerFontSize);
      pdf.text(centerX, 30, headerContent);

      // Add the centered header subtitle below the header
      pdf.setFontSize(subtitleFontSize);
      pdf.text(subtitleX, 40, headerSubtitle);

      // Add additional information under the subtitle
      const additionalInfoX = 5;
      const additionalInfoY = 50;
      const additionalInfoLeft = `
        Name: Novero, John Nico
        Employee Classification: Consultant
        Working Hours: Shift Schedule
      `;
      const additionalInfoRight = `
        Company: Prulife UK
        Department: Your Department
      `;
      pdf.setFontSize(12);
      pdf.text(additionalInfoX, additionalInfoY, additionalInfoLeft);
      pdf.text(
        pdf.internal.pageSize.getWidth() - 100,
        additionalInfoY,
        additionalInfoRight
      );

      // After adding the header and additional information, add the table as an image
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 190; // Adjust as needed
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add the image on the left
        pdf.addImage(imgData, "PNG", 10, 80, 30, 10); // Adjust the position and size as needed

        // Calculate the X-position for the right-aligned text
        const rightX =
          pdf.internal.pageSize.getWidth() -
          10 -
          (pdf.getStringUnitWidth("Konics Dev") * 16) /
            pdf.internal.scaleFactor;

        // Add the text on the right
        pdf.setFontSize(16);
        pdf.text(rightX, 20, "Konics Dev"); // Right-aligned text

        // Save the PDF with the table and header
        pdf.save("table_with_header.pdf");
      });
    };
  };

  return (
    <>
      <button onClick={exportToPDF}>Export to PDF</button>
      <table ref={tableRef}>
        {/* Your table content goes here */}
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            {/* Add more table headers */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            {/* Add more table data */}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableToPDF;
