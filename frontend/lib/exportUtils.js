import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatCurrency, formatDate } from './utils';

export function exportToExcel(data, fileName = 'FinanceWise_Export') {
  if (!data || !data.length) return;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export function exportToPDF(title, headers, rows, fileName = 'FinanceWise_Report') {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(`FinanceWise - ${title}`, 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 14, 26);

  doc.autoTable({
    startY: 32,
    head: [headers],
    body: rows,
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59] }, // slate-800
    styles: { fontSize: 9 },
  });

  doc.save(`${fileName}.pdf`);
}
