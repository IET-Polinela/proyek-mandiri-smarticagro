import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, classification_report, confusion_matrix,
    mean_absolute_error, mean_squared_error, r2_score
)
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# ==========================================
# 1. LOAD DATA
# ==========================================
df = pd.read_csv("Dataset_Cluster_GMM.csv")

# ==========================================
# 2. PERSIAPAN DATA
# ==========================================
features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'EC', 'min_mdpl', 'max_mdpl', 'Cluster_Lahan']
target = 'label'

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ==========================================
# 3. PELATIHAN MODEL
# ==========================================
print("Sedang melatih model...")
rf_model = RandomForestClassifier(n_estimators=150, random_state=42)
rf_model.fit(X_train, y_train)

# ==========================================
# 4. PREDIKSI
# ==========================================
y_pred = rf_model.predict(X_test)

# ==========================================
# 5. METRIK KLASIFIKASI
# ==========================================
akurasi = accuracy_score(y_test, y_pred)
print(f"\n=== AKURASI MODEL ===")
print(f"Akurasi: {akurasi * 100:.2f}%")

print("\n=== CLASSIFICATION REPORT ===")
print(classification_report(y_test, y_pred))

report_df = pd.DataFrame(classification_report(y_test, y_pred, output_dict=True))
print("\n5 baris teratas classification report:")
print(report_df.head())

# ==========================================
# 6. METRIK REGRESI (R2, MAE, MSE, RMSE)
# ==========================================
print("\n=== METRIK TAMBAHAN (REGRESI) ===")

# Karena klasifikasi → ubah label ke angka jika perlu
y_test_numeric = pd.factorize(y_test)[0]
y_pred_numeric = pd.factorize(y_pred)[0]

r2 = r2_score(y_test_numeric, y_pred_numeric)
mae = mean_absolute_error(y_test_numeric, y_pred_numeric)
mse = mean_squared_error(y_test_numeric, y_pred_numeric)
rmse = np.sqrt(mse)

print(f"R² Score: {r2:.4f}")
print(f"MAE      : {mae:.4f}")
print(f"MSE      : {mse:.4f}")
print(f"RMSE     : {rmse:.4f}")

# ==========================================
# 7. CONFUSION MATRIX
# ==========================================
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, cmap="Blues", fmt="d")
plt.title("Confusion Matrix")
plt.xlabel("Prediksi")
plt.ylabel("Aktual")
plt.show()

# ==========================================
# 8. FEATURE IMPORTANCE
# ==========================================
feature_importance = pd.DataFrame({
    'Fitur': features,
    'Pentingnya': rf_model.feature_importances_
}).sort_values(by='Pentingnya', ascending=False)

print("\n=== KONTRIBUSI FITUR ===")
print(feature_importance)

plt.figure(figsize=(10, 6))
sns.barplot(x='Pentingnya', y='Fitur', data=feature_importance, palette='viridis')
plt.title('Kontribusi Fitur Terhadap Prediksi')
plt.tight_layout()
plt.show()

# ==========================================
# 9. SIMPAN MODEL
# ==========================================
joblib.dump(rf_model, 'model_klasifikasi_tanaman.joblib')
print("\nModel berhasil disimpan sebagai 'model_klasifikasi_tanaman.joblib'")
