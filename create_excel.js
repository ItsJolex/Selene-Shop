const ExcelJS = require('exceljs');

async function createExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventario Selene');

  // Define columns with spaces well-distributed
  worksheet.columns = [
    { header: 'Marca', key: 'marca', width: 20 },
    { header: 'Producto', key: 'producto', width: 30 },
    { header: 'Variantes / Tonos', key: 'variantes', width: 35 },
    { header: 'Precio', key: 'precio', width: 15 }
  ];

  // Add rows
  worksheet.addRow({ marca: 'Dolce Bella', producto: 'Glow Tint', variantes: 'Sand, Vainilla, Brown', precio: '$5.99' });
  worksheet.addRow({ marca: 'Salomé', producto: 'Hydratint Concealer', variantes: '-', precio: '$5.99' });
  worksheet.addRow({ marca: 'Max Glow', producto: 'Lip Oil Fruity Gloss', variantes: '-', precio: '$5.99' });
  worksheet.addRow({ marca: 'Ushas', producto: 'Sweet Lip Balm', variantes: '-', precio: '$5.99' });

  // Format header row (legible text, soft colors)
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FF333333' }, size: 12 };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF5F5F5' } // very light gray, not flashy
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } }
    };
  });

  // Format data rows
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell, colNumber) => {
        cell.font = { size: 11, color: { argb: 'FF444444' } };
        cell.alignment = { vertical: 'middle', horizontal: colNumber === 4 ? 'center' : 'left' };
      });
    }
  });

  await workbook.xlsx.writeFile('/home/joel/Proyectos/Selene/Inventario_Selene.xlsx');
  console.log('Excel created!');
}

createExcel();
