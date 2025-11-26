import numpy as np
import pandas as pd
from scipy.stats import norm, linregress

def get_interpolated_u(p_value):
    # Sumver : Tabel distribusi normal
    lookup_table = [
        (-3.29, 0.0005), (-3.09, 0.001), (-2.58, 0.005), (-2.33, 0.01),
        (-1.96, 0.025), (-1.64, 0.05), (-1.28, 0.10), (-1.00, 0.16),
        (-0.84, 0.20), (-0.52, 0.30), (-0.25, 0.40), (0.00, 0.50),
        (0.25, 0.60), (0.52, 0.70), (0.84, 0.80), (1.00, 0.84),
        (1.28, 0.90), (1.64, 0.95), (1.96, 0.975), (2.33, 0.99),
        (2.58, 0.995), (3.09, 0.999), (3.29, 0.9995)
    ]
    min_table_p = 0.0005
    max_table_p = 0.9995

    if p_value > max_table_p or p_value < min_table_p:
        return norm.ppf(p_value)

    for u, p in lookup_table:
        if np.isclose(p, p_value, atol=1e-5):
            return u

    u_lower, p_lower = None, None
    u_upper, p_upper = None, None

    for i in range(len(lookup_table) - 1):
        curr_u, curr_p = lookup_table[i]
        next_u, next_p = lookup_table[i+1]
        
        if curr_p <= p_value <= next_p:
            u_lower, p_lower = curr_u, curr_p
            u_upper, p_upper = next_u, next_p
            break
            
    if u_lower is None:
        return norm.ppf(p_value)

    slope = (u_upper - u_lower) / (p_upper - p_lower)
    u_result = u_lower + (p_value - p_lower) * slope
    return u_result

def perform_normality_test(data_input):
    """
    Metode: Normalisasi Kurva.
    Steps:
    1. F Kumulatif & F%
    2. Mencari u (tabel Z)
    3. Mencari u' (Regresi Linear y=mx+c)
    4. Mencari p(u')
    5. Standar Deviasi
    6. Mencari p(x')
    7. Mencari f(x')
    8. Grafik
    """

    df = pd.DataFrame(data_input)
    df = df[df['fi'] > 0]
    
    if df.empty:
        raise ValueError("Data kosong.")

    df = df.sort_values(by='xi').reset_index(drop=True)
    n = df['fi'].sum()

    if len(df) > 1:
        delta = df['xi'].iloc[1] - df['xi'].iloc[0]
    else:
        delta = 1.0

    # 1. Hitung Mean
    mean_val = (df['xi'] * df['fi']).sum() / n 

    # --- STEP 1: F(kumulatif)
    df['f_kum'] = df['fi'].cumsum()
    df['f_percent'] = df['f_kum'] / (n+1)
    df['f_percent_safe'] = df['f_percent'].apply(lambda x: 0.999 if x >= 1.0 else (0.001 if x <= 0 else x))

    # --- STEP 2: Mencari u (Interpolasi Distribusi Normal)
    df['u_obs'] = df['f_percent_safe'].apply(get_interpolated_u)

    # --- TAHAP 3: Regresi Linear (Hanya untuk cari Slope & Kesimpulan Normal) ---
    slope, intercept, r_value, p_value, std_err = linregress(df['xi'], df['u_obs'])
    
    # u_pred (Regresi) -> Untuk kolom tabel "U' (REGRESI)"
    df['u_pred'] = (slope * df['xi']) + intercept

    # --- TAHAP 4: Standar Deviasi (Grafis) ---
    std_dev = 1 / slope

    # --- TAHAP 5 (PERBAIKAN): Mencari p(u') untuk Menggambar Kurva ---
    # Agar kurva berbentuk lonceng simetris di tengah data (Mean = 5),
    # Kita JANGAN pakai u_pred (hasil regresi), tapi pakai rumus u standar.
    
    # Rumus: u = (xi - Mean) / StdDev
    # Atau karena StdDev = 1/Slope, sama saja dengan: (xi - Mean) * Slope
    
    df['u_curve_ideal'] = (df['xi'] - mean_val) * slope
    
    # Hitung tinggi kurva berdasarkan u_curve_ideal
    df['p_u_accent'] = norm.pdf(df['u_curve_ideal'])

    # --- TAHAP 6: Mencari p(x')
    df['p_x_accent'] = df['p_u_accent'] / std_dev

    # --- TAHAP 7: Mencari f(x')
    df['f_x_accent'] = df['p_x_accent'] * delta * n

    # --- TAHAP 8: Kesimpulan
    r_squared = r_value**2
    
    results = df.round(6).to_dict(orient='records')

    threshold = 0.90

    return {
        "statistics": {
            "total_n": int(n),
            "delta": delta,
            "mean": round(mean_val, 4),
            "std_dev": round(std_dev, 4),
            "slope_m": round(slope, 4),
            "intercept_c": round(intercept, 4),
            "r_squared": round(r_squared, 4),
            "conclusion": "NORMAL" if r_squared >= threshold else "MENYIMPANG",
            "is_normal": bool(r_squared >= threshold)
        },
        "table_data": results
    }