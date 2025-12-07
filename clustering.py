
# ==========================================
# IMPORT LIBRARIES
# ==========================================
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.mixture import GaussianMixture
import matplotlib.pyplot as plt

# ==========================================
# 1. LOAD DATA
# ==========================================
df = pd.read_csv("Dataset_Pertanian_Indo_Lengkap_MDPL.csv")

features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'EC', 'min_mdpl', 'max_mdpl']
X = df[features]

# ==========================================
# 2. STANDARDISASI
# ==========================================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ==========================================
# 3. PCA (MERAPIKAN DATA)
# ==========================================
pca = PCA(n_components=3)
X_pca = pca.fit_transform(X_scaled)

print("Variansi PCA:", pca.explained_variance_ratio_)

# ==========================================
# 4. GMM CLUSTERING (LEBIH COCOK DARI K-MEANS)
# ==========================================
gmm = GaussianMixture(n_components=4, random_state=42)
clusters = gmm.fit_predict(X_pca)

df['Cluster_Lahan'] = clusters

# ==========================================
# 5. ANALISIS CLUSTER
# ==========================================
summary = df.groupby('Cluster_Lahan')[features].mean()
print("\n=== Profil Rata-rata Setiap Cluster ===")
print(summary)

print("\n=== Jumlah Data per Cluster ===")
print(df['Cluster_Lahan'].value_counts())

# ==========================================
# 6. SAVE
# ==========================================
df.to_csv("Dataset_Cluster_GMM.csv", index=False)
print("File tersimpan sebagai Dataset_Cluster_GMM.csv")
