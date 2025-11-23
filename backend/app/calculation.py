import numpy as np
import pandas as pd
from scipy.stats import norm, chi2

def perform_normality_test(data_input):
    """
    Menerima list of dict: [{'xi':10, 'fi':5}, ...]
    Mengembalikan dict hasil perhitungan lengkap
    """
    # Konversi dataframe pandas
    df = pd.DataFrame(data_input)

    # Urutkan by xi
    df = df.sort_values(by='xi').reset_index(drop=True)

    # Hitung parameter dasar (mean dan std dev)
    # Mean = Σ(fi . xi) / Σfi
    total_freq = df['fi'].sum()
    mean = (df['fi']* df['xi']).sum() / total_freq

    # Std Dev = sqrt(Σ fi * (xi - mean)^2 / (n-1))
    # Varian sampel
    variance = (df['fi'] * (df['xi'] - mean)**2).sum() / (total_freq - 1)
    std_dev = np.sqrt(variance)

    # Batas kelas
    if len(df) > 1:
        interval = df['xi'].iloc[1] - df['xi'].iloc[0]
    else:
        interval = 1

    # Tepi bawah dan tepi atas
    #TB = xi - 0.5 * interval
    #TA = xi + 0.5 * interval
    df['tb'] = df['xi'] - 0.5 * interval
    df['ta'] = df['xi'] + 0.5 * interval

    # Hitung Z-score untuk batas kelas
    # Z_tb = (TB - mean) / S
    # Z_ta = (TA - mean) / S
    df['z_tb'] = (df['tb'] - mean) / std_dev
    df['z_ta'] = (df['ta'] - mean) / std_dev

    # Luas area di bawah kurva (Probabilitas)
    # Menggunakan Cummulative Distribution Function (CDF)
    # Luas = CDF(Z_ta) - CDF(Z_tb)
    df['prob_z_tb'] = norm.cdf(df['z_tb'])
    df['prob_z_ta'] = norm.cdf(df['z_ta'])
    df['luas_area'] = df['prob_z_ta'] - df['prob_z_tb']

    # Nilai frekuensi ekspektasi (fe)
    df['fe'] = df['luas_area'] * total_freq

    # Nilai Chi-Square per baris
    # (fo - fe)^2 / fe
    df['chi_square_val'] = ((df['fi'] - df['fe'])**2) / df['fe']

    # Total Chi-Square
    chi_square_hitung = df['chi_square_val'].sum()

    # Critical Value (Chi Square Tabel)
    # Derajat kebebasan (dk) = k - 3
    # Jika k (jumlah kelas) <= 3, set dk =1 (menghindari error)
    k = len(df)
    dk = k - 3
    if dk < 1:
        dk = 1

    alpha = 0.05
    chi_square_tabel = chi2.ppf(1 - alpha, dk)

    # Kesimpulan
    is_normal = chi_square_hitung < chi_square_tabel

    results = df.round(4).to_dict(orient='records')

    return {
        "statistics": {
            "mean": round(mean, 4),
            "std_dev": round(std_dev, 4),
            "total_data": int(total_freq),
            "chi_square_hitung": round(chi_square_hitung, 4),
            "chi_square_tabel": round(chi_square_tabel, 4),
            "dk": int(dk),
            "alpha": alpha,
            "conclusion": "NORMAL" if is_normal else "TIDAK NORMAL",
            "is_normal": bool(is_normal)
        }, 
        "table_data": results
    }