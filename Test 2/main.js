function calculateShippingCost(destination, weight, priority) {
  // Pengecekan untuk destination
  if (destination !== "domestic" && destination !== "international") {
    return "Invalid destination";
  }

  // Pengecekan untuk berat
  if (weight <= 0) {
    return "Invalid weight";
  }

  // Pengecekan untuk prioritas
  const validPriorities = ["standard", "express", "priority"];
  if (!validPriorities.includes(priority)) {
    return "Invalid priority";
  }

  let baseCostPerKg;
  let additionalCost = 0;

  // Menentukan biaya dasar dan biaya tambahan berdasarkan tujuan dan prioritas
  if (destination === "domestic") {
    switch (priority) {
      case "standard":
        baseCostPerKg = 5;
        break;
      case "express":
        baseCostPerKg = 10;
        break;
      case "priority":
        baseCostPerKg = 20;
        break;
    }

    // Tambahan cost untuk berat lebih dari 10 kg
    if (weight > 10) {
      additionalCost = 10;
    }
  } else if (destination === "international") {
    switch (priority) {
      case "standard":
        baseCostPerKg = 15;
        break;
      case "express":
        baseCostPerKg = 25;
        break;
      case "priority":
        baseCostPerKg = 50;
        break;
    }

    // Tambahan cost untuk berat lebih dari 5 kg
    if (weight > 5) {
      additionalCost = 50;
    }
  }

  // Kalkulasi untuk total cost keseluruhan
  const totalCost = baseCostPerKg * weight + additionalCost;
  return totalCost;
}

console.log(calculateShippingCost("domestic", 8, "express"));
console.log(calculateShippingCost("international", 6, "priority"));
console.log(calculateShippingCost("international", 4, "standard"));
console.log(calculateShippingCost("domestic", -5, "express"));
console.log(calculateShippingCost("domestic", 12, "nextday"));
console.log(calculateShippingCost("overseas", 10, "standard"));

// Jalankan dengan node js
