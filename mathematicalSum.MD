Your code performs multiple mathematical calculations related to **truck time, production, and cost data** based on user-provided filters. Below is a breakdown of all the mathematical computations present in the code:

---

## **1. Truck Time Calculations**
### **Total Time Calculation**
```ts
const totalTime = clockOutData.reduce((sum, doc) => sum + doc.totalTime, 0);
```
- **Summing all `totalTime`** from `clockOutData`.
- Represents the **total hours** clocked out.

### **Filtering Active Clocked-in Trucks & Calculating Additional Hours**
```ts
const filteredData = clockInData.map(doc => {
  const filteredTruckDetail = doc.truckDetail.filter(detail => detail.isClockOut === false);
  const truckDetailsWithClockInTime = filteredTruckDetail.map(truck => {
    const clockInTimeMillis = truck.clockInTime;
    const currentTimeMillis = Date.now();
    const timeDifferenceMillis = currentTimeMillis - clockInTimeMillis;
    const timeDifferenceHours = timeDifferenceMillis / (1000 * 60 * 60);
    const totalTime = Math.max(Math.round(timeDifferenceHours), 0);
    return totalTime;
  });
  const totalHours = truckDetailsWithClockInTime.reduce((sum, hours) => sum + hours, 0);

  return totalHours.toFixed(2);
});
```
- Filters out **trucks that are not clocked out**.
- Computes the time difference in **hours** between `clockInTime` and the **current time**.
- Ensures the time difference is **rounded and non-negative**.

### **Total Hours Calculation (Final)**
```ts
const totalHoursFromFilteredData = filteredData.reduce((sum, item) => sum + parseFloat(item), 0);
const totalHour = parseFloat((totalTime + totalHoursFromFilteredData).toFixed(2));
```
- Adds `totalTime` (clock-out) and `totalHoursFromFilteredData` (active trucks).
- Rounds to **two decimal places**.

### **Working Days Calculation**
```ts
const clockOutDays = new Set(clockOutData.map(doc => new Date(doc.timeCardDate).toDateString()));
const clockInDays = new Set(clockInData.map(doc => new Date(doc.createdAt).toDateString()));

const workingDays = new Set([...clockOutDays, ...clockInDays]);
const workingDaysCount = workingDays.size;
```
- Extracts **unique dates** from `clockOutData` and `clockInData`.
- Counts the **number of working days**.

### **Average Hours & Trucks Per Day**
```ts
const averageHoursPerDay = workingDaysCount ? parseFloat((totalHour / workingDaysCount).toFixed(2)) : 0.00;
const averageTrucksPerDay = workingDaysCount ? parseFloat((clockOutData.length / workingDaysCount).toFixed(2)) : 0.00;
```
- `averageHoursPerDay = totalHour / workingDaysCount`
- `averageTrucksPerDay = totalTrucks / workingDaysCount`
- Ensures values are rounded **to two decimal places**.

### **Total Cost Calculation**
```ts
const totalCost = parseFloat(clockOutData.reduce((sum, doc) => {
  const charge = typeof doc.charge === 'number' ? doc.charge : doc.charge;
  return sum + doc.totalTime * charge;
}, 0).toFixed(2));
```
- `totalCost = Σ(totalTime * charge)` for each truck.
- Ensures cost is rounded **to two decimal places**.

---

## **2. Production Data Calculations**
### **Total Loads Calculation**
```ts
let totalLoads = 0;

for (const clockinId in loadData) {
  const group = loadData[clockinId];

  let foundTotalLoad = false;
  let groupLoadCount = 0;

  group.forEach((doc) => {
    if (!foundTotalLoad && doc.totalLoad !== undefined && doc.totalLoad > 0) {
      groupLoadCount = doc.totalLoad;
      foundTotalLoad = true;
    } else if (!foundTotalLoad && doc.totalLoad === 0) {
      groupLoadCount += doc.loadCount;
    }
  });

  totalLoads += groupLoadCount;
}
```
- **Groups clock-out data** by `clockinId`.
- **Finds `totalLoad`**, if available, or sums `loadCount` if not.
- Calculates `totalLoads = Σ(groupLoadCount)`.

### **Total Material Calculation**
```ts
let totalMaterial = 0;

for (const clockinId in materialData) {
  const group = materialData[clockinId];

  let foundTotalMaterial = false;
  let grouptotalQuantity = 0;

  group.forEach((doc) => {
    if (!foundTotalMaterial && doc.totalQuantity !== undefined && doc.totalQuantity > 0) {
      grouptotalQuantity = doc.totalQuantity;
      foundTotalMaterial = true;
    } else if (!foundTotalMaterial && doc.totalQuantity === 0 && doc.costMeasurement === "CY") {
      grouptotalQuantity += doc.quantity;
    }
  });

  totalMaterial += grouptotalQuantity;
}
```
- **Groups clock-out data** by `clockinId`.
- Finds `totalQuantity` if available, otherwise **sums up `quantity`**.
- Computes `totalMaterial = Σ(grouptotalQuantity)`.

### **Average Loads & Material Per Day**
```ts
const averageLoadsPerDay = parseFloat((totalLoads / workingDaysCount).toFixed(2));
const averageMaterialPerDay = parseFloat((totalMaterial / workingDaysCount).toFixed(2));
```
- `averageLoadsPerDay = totalLoads / workingDaysCount`
- `averageMaterialPerDay = totalMaterial / workingDaysCount`
- Ensures values are **rounded** to two decimal places.

---

## **Summary of All Mathematical Calculations**
| Calculation | Formula |
|------------|---------|
| **Total Clocked-Out Time** | `Σ(doc.totalTime)` |
| **Active Truck Time Calculation** | `(Current Time - clockInTime) / 3600000` |
| **Total Hours Calculation** | `totalTime + Σ(active truck hours)` |
| **Working Days Count** | `Unique(ClockOut Dates + ClockIn Dates)` |
| **Average Hours Per Day** | `totalHour / workingDaysCount` |
| **Average Trucks Per Day** | `clockOutData.length / workingDaysCount` |
| **Total Cost Calculation** | `Σ(totalTime * charge)` |
| **Total Loads Calculation** | `Σ(groupLoadCount)` per clock-in group |
| **Total Material Calculation** | `Σ(grouptotalQuantity)` per clock-in group |
| **Average Loads Per Day** | `totalLoads / workingDaysCount` |
| **Average Material Per Day** | `totalMaterial / workingDaysCount` |

---

### **Final Output**
Each function returns data structured like:
```json
{
  "status": 200,
  "message": "Data found successfully",
  "data": {
    "totalHour": 125.50,
    "averageHoursPerDay": 6.28,
    "averageTrucksPerDay": 3.14,
    "totalCost": 5000.75,
    "projectExists": true
  }
}
```

### **Production Output Example**
```json
{
  "status": 200,
  "message": "Data found successfully",
  "data": {
    "totalLoads": 400.00,
    "averageLoadsPerDay": 20.00,
    "totalMaterial": 750.00,
    "averageMaterialPerDay": 37.50
  }
}
```

---

### **Conclusion**
- Your code **processes truck work hours, loads, materials, and costs**.
- **Summations (`Σ`), averages, and filtering** are key calculations.
- Ensures values **do not go negative**, are **rounded to two decimal places**, and **handle missing data** properly.

Let me know if you need further clarifications! 🚀