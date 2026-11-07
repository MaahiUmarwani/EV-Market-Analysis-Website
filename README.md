# ⚡ EV Market Analysis – Electric Vehicle Market Performance & Insights

An interactive EV market analytics web application developed using **Tableau, Python, and Flask** to explore electric vehicle sales, battery technologies, driving range, manufacturers, customer ratings and regional demand.

## 🌐 Live Application

**Live Website:** [EV Market Analysis](https://ev-market-analysis-aj8t.onrender.com/)

## 📌 Project Overview

EV Market Analysis analyzes a dataset containing **200,000 electric vehicle records** with **37 fields**, covering model years **2018 to 2026** across **7 regions**.

The project integrates interactive Tableau visualizations into a responsive Flask web application, allowing users to explore the EV market through a dashboard, a data story and an insights page.

### Key EV Market Insights

- **Annual Sales Units:** 1,550,703,961
- **Average Customer Rating:** 4.09 / 5
- **Average Price:** $64,921
- **Average Range:** 325 km
- **Top Category:** Two-Wheeler Scooters (174.6M units)
- **Top Country:** India (159.2M units)
- **Leading Battery Types:** NMC (33.8%) and LFP (32.0%)
- **Longest Range:** Luxury Sedans (550.6 km on average)

## 📊 Tableau Visualizations

**Interactive Dashboard:** [View on Tableau Public](https://public.tableau.com/app/profile/maahi.umarwani/viz/EVMarketAnalysis_17935995381450/EVDashboard)

**Data Story:** [The EV Market, Step by Step](https://public.tableau.com/app/profile/maahi.umarwani/viz/EVMarketAnalysis_17935995381450/EVStory)

### Worksheets

1. KPI Summary
2. Sales Trend by Model Year
3. Sales by Vehicle Category
4. Sales by Country
5. Sales by Region
6. Top Manufacturers
7. Battery Type Share
8. Average Range by Category
9. Customer Rating Heatmap (Category × Battery Type)

## 🛠️ Technologies Used

- **Tableau Desktop and Tableau Public** – Data visualization and publishing
- **Python** – Application development
- **Flask** – Web application framework
- **HTML, CSS and JavaScript** – Website design (Chart.js for the insight charts)
- **GitHub** – Version control and project hosting
- **Render** – Cloud deployment

## 📁 Project Structure

```text
EV-Market-Analysis-Website/
│
├── app.py
├── Procfile
├── requirements.txt
├── README.md
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── dashboard.html
│   └── story.html
│
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## 🚀 Run Locally

1. Download or clone this repository.
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Start the Flask application:

```bash
python app.py
```

4. Open `http://127.0.0.1:5000` in your browser.

## 🎯 Project Features

- Interactive EV market analytics dashboard
- Nine Tableau worksheets
- Four EV market KPI indicators
- Tableau Story presenting the findings step by step
- Global filters for Category, Battery Type and Model Year, plus a battery-type filter action
- Interactive insight charts and tabs on the home page
- Responsive Flask website (Home, Dashboard and Story pages)
- Tableau Public integration
- Cloud deployment using Render

## 📚 Conclusion

EV Market Analysis demonstrates how a large electric vehicle dataset can be transformed into meaningful visual insights through Tableau and made accessible using a Flask-based web application. The analysis shows that EV adoption is led by affordable everyday vehicles, that NMC and LFP batteries dominate the market, that premium vehicles offer the most range, and that sales are evenly balanced across countries, regions and manufacturers.

## 👩‍💻 Author

**Maahi Umarwani** – [Tableau Public](https://public.tableau.com/app/profile/maahi.umarwani/vizzes) · [GitHub](https://github.com/MaahiUmarwani)
