# Kidney Disease Classification — MLflow & DVC

A deep learning project for kidney disease classification using CNN, with **MLflow** for experiment tracking and **DVC** for data/model versioning.

## Workflows

1. Update config.yaml
2. Update secrets.yaml[optional]
3. Update params.yaml
4. Update the entity
5. Update the configuration manager in src config
6. Update the components
7. Update the pipeline
8. Update the main.py
9. Update the dvc.yaml
10. app.py

## How to Run?

### Steps

### STEP 01 — Clone the Repository

```bash
git clone https://github.com/Prasadanu17/Kidney-Disease-Classification-MLflow-DVC.git
cd Kidney-Disease-Classification-MLflow-DVC
```

### STEP 02 — Create a Conda Environment

After opening the repository, create a new Conda environment:

```bash
conda create -n cnncls python=3.8 -y
```

Activate the environment:

```bash
conda activate cnncls
```

### STEP 03 — Install the Requirements

Install all the required Python packages:

```bash
pip install -r requirements.txt
```

### STEP 04 — Run the Project

Run the application or training pipeline according to the project structure.

```bash
python app.py
```

> **Note:** If your project uses a different entry-point file, replace `app.py` with the appropriate filename.

