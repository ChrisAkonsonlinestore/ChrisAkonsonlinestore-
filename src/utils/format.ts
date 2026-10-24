/**
 * Utilities for currency formatting, WhatsApp message crafting, and image optimization
 */

export function formatNaira(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₦0';
  return '₦' + Number(amount).toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function createProductWhatsAppMessage(
  productName: string,
  price: number,
  quantity: number = 1
): string {
  const subtotal = price * quantity;
  const total = subtotal;

  const text = `Hello Christian, I visited chrisAkons online store and would like to make inquiry about:
Product: ${productName}
Quantity: ${quantity}
Unit Price: ${formatNaira(price)}
Subtotal: ${formatNaira(subtotal)}
Estimated Total: ${formatNaira(total)}

Please confirm availability and payment/delivery.`;

  return `https://wa.me/2348109226976?text=${encodeURIComponent(text)}`;
}

export function createCartWhatsAppMessage(
  items: Array<{ name: string; price: number; quantity: number }>,
  total: number
): string {
  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. Product: ${item.name}\n   Quantity: ${item.quantity}\n   Unit Price: ${formatNaira(
          item.price
        )}\n   Subtotal: ${formatNaira(item.price * item.quantity)}`
    )
    .join('\n\n');

  const text = `Hello Christian, I visited chrisAkons online store and would like to place an order from my cart:

${itemsText}

Estimated Total: ${formatNaira(total)}
Payment: Secured Escrow (Escrow Village - Referral: ChrisAkons001)

Please confirm availability and dispatch/delivery details.`;

  return `https://wa.me/2348109226976?text=${encodeURIComponent(text)}`;
}

export function createServiceWhatsAppMessage(serviceName: string, priceInfo?: string): string {
  const priceLine = priceInfo ? `Price / Rate: ${priceInfo}\n` : '';
  const text = `Hello Christian, I visited chrisAkons online store and would like to request this service:
Service: ${serviceName}
${priceLine}
Please let me know your availability and how we can proceed.`;

  return `https://wa.me/2348109226976?text=${encodeURIComponent(text)}`;
}

export function createGeneralWhatsAppMessage(): string {
  const text = `Hello Christian, I visited chrisAkons online store and would like to make an inquiry.`;
  return `https://wa.me/2348109226976?text=${encodeURIComponent(text)}`;
}

/**
 * Compresses an image file (e.g. from camera or gallery) to a clean web-ready data URL
 * Max dimension: 1200px, quality: 0.82
 */
export async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please upload an image file (JPG, PNG, or WebP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file format.'));
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use webp if supported, otherwise jpeg
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
