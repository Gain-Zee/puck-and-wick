# Puck & Wick™ — 3D Print & Hardware Enclosure Fabrication Guide

## 1. Project Overview & Target Aesthetic
We are producing custom **heavyweight matte-black hockey-puck hardware enclosures** in two sizes:
1. **Full-Size Regulation Puck (`3.00"` / `76.2 mm` Diameter × `1.00"` / `25.4 mm` Tall)**
2. **Compact Mini Puck (`2.00"` / `50.8 mm` Diameter × `0.79"` / `20.0 mm` Tall)**

**What You Are Printing:**
You are printing the **empty 2-piece outer shells** (**Part A: Bottom Knurled Cup** + **Part B: Vented Top Cap**).
- **Important:** Do **not** glue or seal the Top Cap onto the Bottom Cup after printing. Deliver the Bottom Cups and Top Caps as separate, unsealed pieces so final internal assembly and permanent sealing can be completed in our studio.

---

## 2. Included `.STL` 3D Print Files

| File Name | Part Description | Exact Dimensions |
| :--- | :--- | :--- |
| **`puck-3inch-bottom-knurled-cup.stl`** | **Full-Size `3.0"` Bottom Cup** with 3D diamond-knurled grip band, 8 horizontal side intake channels, top/bottom chamfered bezel collars, recessed `3.5 mm` floor, and `3.0 mm` internal female step-ledge | `76.2 mm` OD × `22.4 mm` Tall (`4.0 mm` wall) |
| **`puck-3inch-top-vent-cap.stl`** | **Full-Size `3.0"` 360° Perimeter Vented Top Cap** with a continuous 360° double staggered ring of 96 precision `1.6 mm` micro-holes around the outer bezel perimeter and a raised `2.9 mm` male snap-lock plug ring | `72.2 mm` OD × `5.9 mm` Total Height (`3.0 mm` faceplate) |
| **`puck-2inch-mini-bottom-cup.stl`** | **Compact `2.0"` Mini Bottom Cup** with 3D diamond-knurled grip band, 8 horizontal side intake channels, chamfered collars, recessed `3.0 mm` floor, and `2.5 mm` internal female step-ledge | `50.8 mm` OD × `17.5 mm` Tall (`3.2 mm` wall) |
| **`puck-2inch-mini-top-vent-cap.stl`** | **Compact `2.0"` Mini 360° Perimeter Vented Top Cap** with a continuous 360° double staggered ring of 72 precision `1.4 mm` micro-holes around the outer bezel perimeter and a raised `2.4 mm` male snap-lock plug ring | `47.6 mm` OD × `4.9 mm` Total Height (`2.5 mm` faceplate) |

---

## 3. Required Filament (Crucial for Look, Heat Resistance & Impact Strength)

- **Recommended Filament:** **Matte-Black Carbon-Fiber Reinforced PETG (`PETG-CF`)** or **Matte-Black `ASA` / `ASA-CF`** (e.g., *Bambu Lab PETG-CF Black*, *Polymaker PolyMax PETG-ESD / Fiberon PETG-CF*, or *Prusament PETG Carbon Fiber*).
- **Why `PETG-CF` / `ASA` Instead of Standard `PLA`:**
  1. **Zero Visible Layer Lines:** The microscopic carbon fibers scatter light and create a dead-matte, anodized-metal/carbon-hockey-stick finish right off the bed.
  2. **High Heat Resistance (`175°F–200°F`):** These pucks live inside hockey bags and car trunks in the summer where temperatures reach `150°F+` (standard `PLA` softens and warps at `130°F`).
  3. **Heavy Impact Toughness:** Will not crack or shatter when tossed onto locker-room floors.
- **Nozzle Note:** Use a **`0.4 mm` (or `0.6 mm`) Hardened Steel Nozzle** for carbon-fiber filament.

---

## 4. Step-by-Step Slicer & Print Settings (Bambu Studio / OrcaSlicer / PrusaSlicer)

### Step 1: Load & Orient the Parts on the Build Plate
1. **Bottom Knurled Cup (`puck-3inch-bottom-knurled-cup.stl`):**
   - Place **flat on its bottom base (`Z = 0`)** with the open cavity facing **UP**.
   - **Supports:** **NONE (`Disable Supports`)** — all chamfers and diamond knurls are self-supporting at 45°.
2. **Vented Top Cap (`puck-3inch-top-vent-cap.stl`):**
   - Place **flat on its smooth outer face (`Z = 0`)** with the raised male plug ring facing **UP** (the STL is already pre-oriented this way).
   - **Build Plate Selection:** Print on a **Smooth PEI Plate** (or fine **Matte Textured PEI Plate**) so the visible front face of the cap comes off the bed completely smooth with **zero top-layer lines**.
   - **First Layer Perimeters around Vent Holes:** Set `First Layer Speed` to `35 mm/s` and `Wall Generator` to `Arachne` so the 18 small `1.7 mm` vent holes print crisp and perfectly round on Layer 1.

### Step 2: Strength, Wall & Infill Profile
- **Layer Height:** `0.16 mm` (Optimal Quality) or `0.20 mm` (Standard Speed)
- **Wall Loops / Perimeters:** **`5 Walls`** (`2.0 mm` solid shell wall thickness for maximum impact strength)
- **Top Shell Layers:** `5 Layers`
- **Bottom Shell Layers:** `5 Layers`
- **Sparse Infill Density:** **`35%` to `40%`**
- **Sparse Infill Pattern:** **`Gyroid`** (isotropic crush resistance in all directions)
- **Seam Position:** **`Random`** on the Bottom Cup (hides the Z-seam completely inside the diamond knurling teeth!) and **`Aligned` / `Back`** on the Top Cap.

### Step 3: Batch Printing Layout (Standard `256 × 256 mm` Bed)
- **Single Test Print (`1x 3.0"` Puck — 1 Bottom Cup + 1 Top Cap):**
  - Print time: **`~48–52 minutes`**
  - Filament used: **`~50 grams`** (1 spool of `1 kg` prints **19–20 complete `3.0"` pucks**)
- **Full-Bed Production Batch (`3.0"` Pucks):**
  - **Plate A:** `9x Bottom Knurled Cups` arranged in a `3 × 3` grid (`~4.5 hours` unattended overnight)
  - **Plate B:** `9x Vented Top Caps` arranged in a `3 × 3` grid (`~1.5 hours`)
- **Full-Bed Production Batch (`2.0"` Mini Pucks):**
  - Fits `8 Complete Mini Pucks` (`8 Cups + 8 Caps`) on a single bed (`~3 hours 10 minutes`, `~22 grams` per mini puck = **44 mini pucks per 1 kg spool**).

---

## 5. Quality Check Before Hand-Off
1. **Dry Fit Test (Do Not Glue):** Test-fit 1 Vented Top Cap into 1 Bottom Knurled Cup just enough to verify the male plug ring seats smoothly into the inner step-ledge with a flush outer rim, then pop it back out.
2. **Vent Hole Check:** Hold the Top Cap up to a light to confirm all 18 micro-vents (`12` on the `2.0"` mini cap) are completely clear and free of stringing.
3. **Deliver Unsealed:** Pack the printed Bottom Cups and Top Caps separately for final studio assembly.
