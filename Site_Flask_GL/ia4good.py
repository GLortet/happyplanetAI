from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')  # Assurez-vous d'avoir un template 'about.html'

@app.route('/projects')
def projects():
    return render_template('projects.html')  # Assurez-vous d'avoir un template 'projects.html'

@app.route('/contact')
def contact():
    return render_template('contact.html')  # Assurez-vous d'avoir un template 'contact.html'

@app.route('/agriculture')
def agriculture():
    return render_template('agriculture.html')  # Assurez-vous d'avoir un template 'agriculture.html'

@app.route('/eduadapt')
def eduadapt():
    return render_template('eduadapt.html')

@app.route('/eduadapt-enfants')
def eduadapt_enfants():
    return render_template('eduadapt-enfants.html')

@app.route('/eduadapt-enseignants')
def eduadapt_enseignants():
    return render_template('eduadapt-enseignants.html')

@app.route('/eduadapt-parents')
def eduadapt_parents():
    return render_template('eduadapt-parents.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
