import pandas as pd
import joblib
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, classification_report, confusion_matrix,
    mean_absolute_error, mean_squared_error, r2_score,
    balanced_accuracy_score, cohen_kappa_score,
    matthews_corrcoef
)
import matplotlib.pyplot as plt
import seaborn as sns

# ==========================================
# 1. LOAD DATA
# ==========================================
df = pd.read_csv("Dataset_Cluster_GMM.csv")

# ==========================================
# 2. FEATURE SELECTION
# ==========================================
features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'EC',
            'min_mdpl', 'max_mdpl', 'Cluster_Lahan']
target = 'label'

X = df[features]
y = df[target]

# ==========================================
# 3. TRAIN-TEST SPLIT
# ==========================================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ==========================================
# 4. TRAIN MODEL
# ==========================================
print("Melatih model Random Forest...")
rf_model = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    random_state=42
)
rf_model.fit(X_train, y_train)

# ==========================================
# 5. PREDIKSI
# ==========================================
y_pred = rf_model.predict(X_test)

# ==========================================
# 6. EVALUASI KLASIFIKASI
# ==========================================
print("\n============================")
print("📌 EVALUASI KLASIFIKASI")
print("============================")

acc = accuracy_score(y_test, y_pred)
print(f"Akurasi: {acc * 100:.2f}%")

bal_acc = balanced_accuracy_score(y_test, y_pred)
print(f"Balanced Accuracy: {bal_acc:.4f}")

kappa = cohen_kappa_score(y_test, y_pred)
print(f"Cohen’s Kappa: {kappa:.4f}")

mcc = matthews_corrcoef(y_test, y_pred)
print(f"Matthews Correlation Coefficient: {mcc:.4f}")

print("\n=== Classification Report ===")
print(classification_report(y_test, y_pred))

# Confusion Matrix
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, cmap="Blues", fmt="d")
plt.title("Confusion Matrix")
plt.xlabel("Prediksi")
plt.ylabel("Aktual")
plt.show()

# ==========================================
# 7. EVALUASI REGRESI TAMBAHAN
# ==========================================
print("\n============================")
print("📌 METRIK REGRESI TAMBAHAN")
print("============================")

# Ubah label ke angka
y_test_num = pd.factorize(y_test)[0]
y_pred_num = pd.factorize(y_pred)[0]

r2 = r2_score(y_test_num, y_pred_num)
mae = mean_absolute_error(y_test_num, y_pred_num)
mse = mean_squared_error(y_test_num, y_pred_num)
rmse = np.sqrt(mse)

# Hitung Adjusted R²
n = len(X_test)
p = X_test.shape[1]
adj_r2 = 1 - (1 - r2) * (n - 1) / (n - p - 1)

print(f"R² Score: {r2:.4f}")
print(f"Adjusted R²: {adj_r2:.4f}")
print(f"MAE: {mae:.4f}")
print(f"MSE: {mse:.4f}")
print(f"RMSE: {rmse:.4f}")

# ==========================================
# 8. CROSS VALIDATION (ROBUSTNESS)
# ==========================================
print("\n============================")
print("📌 CROSS VALIDATION (5-Fold)")
print("============================")

cv_scores = cross_val_score(rf_model, X, y, cv=5)
print(f"Mean CV Accuracy: {cv_scores.mean():.4f}")
print(f"Std Dev CV Accuracy: {cv_scores.std():.4f}")
print(f"Semua skor CV: {cv_scores}")

# ==========================================
# 9. FEATURE IMPORTANCE
# ==========================================
print("\n============================")
print("📌 FEATURE IMPORTANCE")
print("============================")

importance = pd.DataFrame({
    'Feature': features,
    'Importance': rf_model.feature_importances_
}).sort_values(by='Importance', ascending=False)

print(importance)

plt.figure(figsize=(10, 6))
sns.barplot(data=importance, x="Importance", y="Feature", palette="viridis")
plt.title("Kontribusi Fitur terhadap Prediksi")
plt.tight_layout()
plt.show()

# ==========================================
# 10. SAVE MODEL
# ==========================================
joblib.dump(rf_model, "model_klasifikasi_tanaman.joblib")
print("\nModel berhasil disimpan sebagai model_klasifikasi_tanaman.joblib")
