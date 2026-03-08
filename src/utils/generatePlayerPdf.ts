
// src/utils/generatePlayerPdf.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface PlayerData {
  fullname: string;
  phone: string;
  place: string;
  club: string;
  position: string;
  status: string;
  facePhotoUrl?: string;
  fullPhotoUrl?: string;
  [key: string]: any;
}


// Updated to handle both Cloudinary URLs and Local URLs
const getBase64Image = async (url: string, isLocal: boolean = false): Promise<string | null> => {
  try {
    // ADDED f_jpg HERE: Forces Cloudinary to return a JPEG, fixing .heic issues
    const optimizedUrl = isLocal 
      ? url 
      : url.replace('/upload/', '/upload/w_100,h_100,c_fill,q_auto,f_jpg/');
      
    const response = await fetch(optimizedUrl);
    const blob = await response.blob();
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn(`Failed to fetch image for PDF: ${url}`, e);
    return null; 
  }
};

export const generatePlayerPdf = async (players: PlayerData[]): Promise<void> => {

    console.log("playerssss", players);
    
    
  const doc = new jsPDF();
  
  //  Fetch the official logo from the public folder
  const logoBase64 = await getBase64Image('/isl_official_logo.jpeg', true);

  // 2. Setup Header Coordinates
  let textStartX = 14; // Default starting X position
  
  if (logoBase64) {
    // Draw Logo (X: 14, Y: 12, Width: 20, Height: 20)
    doc.addImage(logoBase64, 'JPEG', 14, 12, 20, 20);
    textStartX = 38; // Shift text to the right to make room for the logo
  }

  // 3. Premium Document Header
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 58, 138); // Premium Navy Blue
  doc.text("Irumbuzhi Soccer League", textStartX, 22);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100); // Slate Gray
  doc.text(`Registered Players | Total Players: ${players.length}`, textStartX, 28); 
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, textStartX, 33);

  const tableData: any[] = [];
  const imageMap: Record<number, string | null> = {};

  // Process all players
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    
    tableData.push([
      i + 1,
      '', // Placeholder for Photo
      player.fullname,
      player.phone,
      player.place,
      player.club,
      player.position,
      player.status
    ]);

    const targetPhotoUrl = player.facePhotoUrl || player.fullPhotoUrl;
    if (targetPhotoUrl) {
      imageMap[i] = await getBase64Image(targetPhotoUrl);
    }
  }

  // 4. Generate the Aligned, Premium Table
  autoTable(doc, {
    startY: 42, // Start below the header
    head: [['#', 'Photo', 'Name', 'Phone', 'Place', 'Club', 'Pos', 'Status']],
    body: tableData,
    theme: 'grid', // Adds clean, professional borders
    headStyles: { 
      fillColor: [30, 58, 138], // Matches the Premium Navy Blue header
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center', // Centers header text globally
      valign: 'middle'
    }, 
    alternateRowStyles: { 
      fillColor: [247, 249, 252] // Very light blue tint for readability
    },
    bodyStyles: { 
      minCellHeight: 16, // Taller rows for a spacious feel
      valign: 'middle',
      textColor: [40, 40, 40]
    }, 
    // Target specific columns for perfect alignment and width
    columnStyles: { 
      0: { halign: 'center', cellWidth: 10 }, // Index
      1: { halign: 'center', cellWidth: 18 }, // Photo
      2: { halign: 'left', fontStyle: 'bold', cellWidth: 40 }, // Name (Bolded for emphasis)
      3: { halign: 'center', cellWidth: 28 }, // Phone
      4: { halign: 'left' }, // Place
      5: { halign: 'left' }, // Club
      6: { halign: 'center', cellWidth: 16 }, // Position
      7: { halign: 'center', cellWidth: 22 }  // Status
    }, 
    didDrawCell: (data) => {
      // 5. Perfectly center the images inside the Photo column
      if (data.column.index === 1 && data.cell.section === 'body') {
        const imgData = imageMap[data.row.index];
        if (imgData) {
          const imgSize = 12; // 12x12 image size
          // Calculate perfect center coordinates
          const xOffset = data.cell.x + (data.cell.width - imgSize) / 2;
          const yOffset = data.cell.y + (data.cell.height - imgSize) / 2;
          
          doc.addImage(imgData, 'JPEG', xOffset, yOffset, imgSize, imgSize);
        }
      }
    }
  });

  doc.save(`ISL_Players_List.pdf`);
};