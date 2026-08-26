const ExcelJS = require('exceljs');

async function createExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventario Completo');

  worksheet.columns = [
    { header: 'Marca', key: 'marca', width: 22 },
    { header: 'Producto', key: 'producto', width: 45 },
    { header: 'Tono / Variante', key: 'tono', width: 30 },
    { header: 'Cantidad', key: 'cantidad', width: 15 }
  ];

  const data = [
    { marca: 'Dolce Bella', producto: 'Glow Tint', tono: 'Sand', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Glow Tint', tono: 'Vainilla', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Glow Tint', tono: 'Brown', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Corrector Líquido', tono: 'Carmel', cantidad: 3 },
    { marca: 'Dolce Bella', producto: 'Corrector Líquido', tono: 'Honey', cantidad: 2 },
    { marca: 'Dolce Bella', producto: 'Corrector Líquido', tono: 'Tan (sin caja)', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Blush en Polvo / Rubor Individual', tono: '05', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Blush en Polvo / Rubor Individual', tono: '11', cantidad: 2 },
    { marca: 'Dolce Bella', producto: 'Máscara Volumen & Definition', tono: '-', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Makeup Pencil', tono: 'Dark Brown 803', cantidad: 2 },
    { marca: 'Dolce Bella', producto: 'Makeup Pencil', tono: 'Medium Brown 808', cantidad: 2 },
    { marca: 'Dolce Bella', producto: 'Lip Gloss (en tubo)', tono: 'D6', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Lip Gloss (en tubo)', tono: '07', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Lip Gloss (en tubo)', tono: 'D5', cantidad: 4 },
    { marca: 'Dolce Bella', producto: 'Lip Gloss (en tubo)', tono: '04', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Lip Gloss (con aplicador)', tono: '03', cantidad: 3 },
    { marca: 'Dolce Bella', producto: 'Lip Gloss (con aplicador)', tono: '01', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Lip Gloss (con aplicador)', tono: '05', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Grace Marble', tono: 'Dusty Rose', cantidad: 3 },
    { marca: 'Dolce Bella', producto: 'Glossy Lip Balm', tono: 'Grace', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Glossy Lip Balm', tono: 'Smile', cantidad: 1 },
    { marca: 'Dolce Bella', producto: 'Vinyl Lasting Lip Stain', tono: 'Sweet Tart', cantidad: 1 },

    { marca: 'Salomé', producto: 'Hydratint Concealer', tono: '01', cantidad: 3 },
    { marca: 'Salomé', producto: 'Hydratint Concealer', tono: '03', cantidad: 2 },
    { marca: 'Salomé', producto: 'Vegan Smooth Creamy Lipstick', tono: '01', cantidad: 1 },
    { marca: 'Salomé', producto: 'Vegan Smooth Creamy Lipstick', tono: '04', cantidad: 1 },
    { marca: 'Salomé', producto: 'Sacapuntas 2 en 1', tono: '-', cantidad: 4 },

    { marca: '-', producto: 'Papel Absorbente de Grasa', tono: 'Presentación Animalitos', cantidad: 9 },

    { marca: 'Ushas', producto: 'Sweet Lip Balm', tono: '05', cantidad: 1 },
    { marca: 'Ushas', producto: 'Sweet Lip Balm', tono: '06', cantidad: 1 },
    { marca: 'Ushas', producto: 'Lip Ink', tono: 'Watermelon 02', cantidad: 1 },

    { marca: 'Max Glow', producto: 'Mate Lips Lip Color Liquid', tono: 'Raspberry Rose', cantidad: 1 },
    { marca: 'Max Glow', producto: 'Mate Lips Lip Color Liquid', tono: 'Deep Rose', cantidad: 1 },
    { marca: 'Max Glow', producto: 'Lip Oil Fruity Gloss Plumping Lips', tono: '02', cantidad: 1 },
    { marca: 'Max Glow', producto: 'Lip Oil Fruity Gloss Plumping Lips', tono: '04', cantidad: 2 },

    { marca: 'Beauty Creations', producto: 'Sweet Dose Lip Oil', tono: 'Water Melon', cantidad: 1 },
    { marca: 'Beauty Creations', producto: 'Wooden Lip Pencil', tono: 'Ur Cherry Sweet', cantidad: 1 },
    { marca: 'Beauty Creations', producto: 'Wooden Lip Pencil', tono: 'U Had Me At Expresso', cantidad: 1 },
    { marca: 'Beauty Creations', producto: 'Wooden Lip Pencil', tono: 'Wine About It', cantidad: 1 },

    { marca: 'Kevin & Coco', producto: 'Blusher Lotion', tono: 'Thus', cantidad: 1 },
    { marca: 'Kevin & Coco', producto: 'Blusher Lotion', tono: 'Be Mine', cantidad: 1 },

    { marca: 'Dici', producto: 'Paso 1', tono: '-', cantidad: 1 },

    { marca: 'Trendy', producto: 'Espejo Plegable', tono: '-', cantidad: 1 },

    { marca: 'Sin Marca', producto: 'Sacapuntas 2 en 1 Sin Depósito', tono: 'Morado', cantidad: 1 },
    { marca: 'Sin Marca', producto: 'Borlas Grandes', tono: '-', cantidad: 2 },
    { marca: 'Sin Marca', producto: 'Borlas Pequeñas', tono: '-', cantidad: 4 },
    { marca: 'Sin Marca', producto: 'Esponja tipo Beauty Blender', tono: 'Amarilla', cantidad: 1 },
    { marca: 'Sin Marca', producto: 'Sadoer Repair Lip Mask', tono: '-', cantidad: 1 },
    { marca: 'Sin Marca', producto: 'Kaberline Lip Mask', tono: '-', cantidad: 1 },
    { marca: 'Sin Marca', producto: 'Sadoer Real Rose Moisturizing Facial Mask', tono: '-', cantidad: 2 },
    { marca: 'Sin Marca', producto: 'Grippies', tono: '-', cantidad: 2 },
    { marca: 'Sin Marca', producto: 'Chokers Negros', tono: '-', cantidad: 2 }
  ];

  data.forEach(item => worksheet.addRow(item));

  // Styles
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FF333333' }, size: 12 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = { bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } } };
  });

  let currentRowMarca = '';
  let toggleColor = false;

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const marcaCell = row.getCell('marca').value;
      if (marcaCell !== currentRowMarca) {
         currentRowMarca = marcaCell;
         toggleColor = !toggleColor;
      }
      
      row.eachCell((cell, colNumber) => {
        cell.font = { size: 11, color: { argb: 'FF444444' } };
        cell.alignment = { vertical: 'middle', horizontal: colNumber === 4 ? 'center' : 'left' };
        
        // very soft zebra striping by brand to make it even easier to read
        if (toggleColor) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFAFAFA' } };
        }
      });
    }
  });

  await workbook.xlsx.writeFile('/home/joel/Proyectos/Selene/Inventario_Completo.xlsx');
  console.log('Excel completed!');
}

createExcel();
