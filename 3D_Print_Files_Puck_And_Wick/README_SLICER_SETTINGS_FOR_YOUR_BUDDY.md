# Puck & Wick™ — 3D Print & Slicer Guide (For Your 3D Printer)

Everything in this folder is **100% Manifold / Watertight** and already oriented **flat on the build plate (`Z = 0`)** so **ZERO supports are needed** on any FDM (Bambu Lab, Prusa, Creality) or Resin/SLS printer.

---

## 1. What Each `.STL` File Is

### A. Full-Size 3.0" Regulation Hockey Bag Odor Puck (`76.2 mm OD × 25.4 mm H` — 360 Total Micro-Vents + 4 Side Slots)
1. **`Puck_3in_Bag_76mm_1_Threaded_Bottom_Half_With_180_Vents.stl`** *(Print 1x)*
   - Bottom threaded half-shell featuring **180 micro-perforation holes** (`2 concentric rings × 90 holes`), diamond-knurled hockey puck grip edge, side cross-flow slots, internal retention spokes for the `40g` carbon pouch, and a precision **male helical screw thread** (`0.30 mm` radial clearance).
2. **`Puck_3in_Bag_76mm_2_Threaded_Top_Half_With_180_Vents.stl`** *(Print 1x)*
   - Top symmetrical threaded half-shell featuring **180 micro-perforation holes** on the face, diamond-knurled edge, side cross-flow slots, and the matching **female internal screw thread**.
3. **`Puck_3in_Bag_76mm_3_Center_Medallion_Disc_Insert_Print_2x.stl`** *(Print 2x in Matte Black or Matte Ivory)*
   - `53.7 mm × 0.8 mm` recessed center medallion disc that snaps flush into the top and bottom faces.
4. **`Puck_3in_Bag_76mm_4_Optional_Separate_Gold_Perforated_Ring_Print_2x.stl`** *(Optional — Print 2x in Silk Gold)*
   - Standalone `180-hole` Perforated Gold Bezel Ring if printing on a single-extruder printer and swapping colors without an AMS.
5. **`Puck_3in_Bag_76mm_0_COMPLETE_ASSEMBLED_PREVIEW.stl`** *(Visual Reference Only)*
   - Shows the complete 2-piece puck screwed together so you can inspect the full geometry.

---

### B. Mini 2.0" Skate & Glove Odor Puck (`50.8 mm OD × 20.0 mm H` — 240 Total Micro-Vents + 4 Side Slots)
1. **`MiniPuck_2in_Skate_51mm_1_Threaded_Bottom_Half_With_180_Vents.stl`** *(Print 1x per Mini Puck / 2x per Pair)*
2. **`MiniPuck_2in_Skate_51mm_2_Threaded_Top_Half_With_180_Vents.stl`** *(Print 1x per Mini Puck / 2x per Pair)*
3. **`MiniPuck_2in_Skate_51mm_3_Center_Medallion_Disc_Insert_Print_2x.stl`** *(Print 2x per Mini Puck)*
4. **`MiniPuck_2in_Skate_51mm_4_Optional_Separate_Gold_Perforated_Ring_Print_2x.stl`** *(Optional standalone gold ring)*
5. **`MiniPuck_2in_Skate_51mm_0_COMPLETE_ASSEMBLED_PREVIEW.stl`** *(Visual Reference Only)*

---

### C. Bonus Candle Workshop Tool
* **`BONUS_10oz_Tumbler_Wick_Centering_Press_Jig.stl`** *(Print 1x)*
  - Custom `72.6 mm` stepped press-fit cylinder jig calibrated for **CandleScience 10 oz Straight-Sided Tumbler Jars (`3.06"` OD)**. Drop a `CD-12` or `CD-18` wick with a sticker into the bottom recess and plunge straight into the jar to stamp the wick dead-center in 1.5 seconds.

---

## 2. Recommended Slicer Settings (Bambu Studio / OrcaSlicer / PrusaSlicer)

* **Filament Recommendation:**
  * **Body & Center Medallion Disc:** **Matte Black PLA / Matte PETG / ASA** (e.g., *Bambu Lab Matte Charcoal Black* or *Polymaker PolyTerra Matte Black*) for Men's; **Matte Ivory White** for Women's.
  * **Perforated Bezel Ring:** **Silk Brushed Gold / Bronze PLA or PETG** (e.g., *Bambu Lab Gold Metallic* or *Giantarm Silk Gold*).
* **Layer Height:** **`0.16 mm`** (Optimal) or **`0.20 mm`** (Standard) with `0.4 mm` nozzle.
* **Wall Loops / Perimeters:** **`3 walls`**
* **Infill:** **`20% Gyroid`**
* **Supports:** **`NONE (Disabled)`** — All threads, knurling, side slots, and internal retention spokes are engineered at `≤ 45°` self-supporting angles.
* **Build Plate Orientation:** Leave every `.STL` flat as imported (`Perforated Face Down` on a Smooth PEI or Textured PEI plate gives the outer face a factory-molded finish!).
* **Two-Color Filament Swap Trick (Even Without a Multi-Color AMS):**
  * Slice `1_Threaded_Bottom_Half` and `2_Threaded_Top_Half` starting with **Silk Gold Filament** for layers `0.00 mm – 2.40 mm` (the perforated bezel face), add a **Pause / Filament Change at `Z = 2.40 mm`**, and finish the knurled wall in **Matte Charcoal Black** (`Z = 2.40 mm` to top). Then print `3_Center_Medallion_Disc_Insert` in **Matte Charcoal Black** and press-fit it into the front and back recesses!
