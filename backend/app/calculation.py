import numpy as np
import pandas as pd
from scipy.stats import norm, linregress, skew

def get_interpolated_u(p_value):
    # Sumber : Tabel distribusi normal
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

# --- FUNGSI UTAMA
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
    
    # Validasi input
    if df.empty or 'xi' not in df.columns or 'fi' not in df.columns:
        raise ValueError("Data kosong atau format salah.")
        
    df = df[df['fi'] > 0].sort_values(by='xi').reset_index(drop=True)
    # Hitung N (Total Frekuensi)
    n = df['fi'].sum()

    # Expand data mentah untuk hitung Skewness yang akurat
    raw_data = []
    for _, row in df.iterrows():
        raw_data.extend([row['xi']] * int(row['fi']))
    
    # Hitung Skewness
    data_skewness = skew(raw_data)

    # Delta : Ketelitian alat ukur
    if len(df) > 1:
        delta = df['xi'].iloc[1] - df['xi'].iloc[0]
    else:
        delta = 1.0

    # Hitung Mean
    mean_val = np.mean(raw_data)

    # 2. F Kumulatif & Percent
    df['f_kum'] = df['fi'].cumsum()
    df['f_percent'] = df['f_kum'] / (n + 1)
    
    # Safety clamp agar tidak error saat interpolasi
    df['f_percent_safe'] = df['f_percent'].clip(lower=0.0001, upper=0.9999)

    # 3. Mencari u (Z-score) --source: Tabel distribusi normal
    df['u_obs'] = df['f_percent_safe'].apply(get_interpolated_u)

    # 4. Regresi Linear (X vs u_obs)
    slope, intercept, r_value, p_value, std_err = linregress(df['xi'], df['u_obs'])
    
    # Prediksi u berdasarkan garis lurus
    df['u_pred'] = (slope * df['xi']) + intercept

    # 5. Hitung Parameter Distribusi
    std_dev = 1 / slope if slope != 0 else 0
    
    # 6. Kalkulasi Kurva Lonceng Ideal (f(x'))
    u_curve = (df['xi'] - mean_val) / std_dev
    df['p_u_accent'] = norm.pdf(u_curve)
    df['p_x_accent'] = df['p_u_accent'] / std_dev
    df['f_x_accent'] = df['p_x_accent'] * delta * n

    r_squared = r_value**2
    
    # LOGIKA KESIMPULAN
    if n > 50:
        r2_threshold = 0.980
    else:
        r2_threshold = 0.950
    
    # Cek Skewness : Batas toleransi skewness < 1.0
    is_skew_acceptable = bool(abs(data_skewness) < 1.0)
    
    # Kesimpulan normal = Harus R^2 tinggi DAN tidak miring (skewed)
    is_normal = bool((r_squared >= r2_threshold) and is_skew_acceptable)
    
    conclusion_text = "NORMAL"
    if not is_normal:
        if not is_skew_acceptable:
            conclusion_text = "MENYIMPANG (Skewed)"
        elif r_squared < r2_threshold:
            conclusion_text = f"MENYIMPANG (Linearity R²<{r2_threshold})"
        else:
            conclusion_text = "MENYIMPANG (Linearity)"

    # Konversi semua numpy.float/bool menjadi python float/bool
    return {
        "statistics": {
            "total_n": int(n),
            "delta": float(round(delta, 4)),
            "mean": float(round(mean_val, 4)),
            "std_dev": float(round(std_dev, 4)),
            "slope_m": float(round(slope, 4)),
            "intercept_c": float(round(intercept, 4)),
            "r_squared": float(round(r_squared, 4)),
            "skewness": float(round(data_skewness, 4)),
            "conclusion": conclusion_text,
            "is_normal": is_normal
        },
        "table_data": df.round(4).to_dict(orient='records')
    }