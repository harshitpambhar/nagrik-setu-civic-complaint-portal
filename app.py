from flask import Flask, render_template, request
import MySQLdb

app = Flask(__name__, template_folder='html_pages', static_folder='css_files')


# MySQL connection
try:
    db = MySQLdb.connect(host="localhost", user="root", passwd="22Harshit9648", db="nagriksetu")
    print("✅ Connected to MySQL")
except Exception as e:
    print("❌ Connection failed:", e)

cursor = db.cursor()

@app.route('/')
def home():
    return render_template('register-complaint.html')


@app.route('/submit', methods=['POST'])
def submit():
    title = request.form['title']
    description = request.form['description']
    location = request.form['location']
    category = request.form['category']
    date_noticed = request.form['date_noticed']
    citizen_name = request.form['citizen_name']
    phone = request.form['phone']

    query = "INSERT INTO complaints (title, description, location, category, date_noticed, citizen_name, phone) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    values = (title, description, location, category, date_noticed, citizen_name, phone)

    cursor.execute(query, values)
    db.commit()

    return "✅ Complaint submitted successfully!"

if __name__ == '__main__':
    app.run(debug=True)
