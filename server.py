from flask import Flask, jsonify, make_response, render_template
from flask_cors import CORS
import os

app = Flask(__name__, static_url_path="/templates", static_folder='./templates/')
cors = CORS(app)

print(os.environ.get("NEWSCATCHER_API_KEY"))

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
def index():
    return render_template('index.html', 
                            NEWSCATCHER_API_ENDPOINT=os.environ.get("NEWSCATCHER_API_ENDPOINT"),
                            NEWSCATCHER_API_KEY=os.environ.get("NEWSCATCHER_API_KEY"),
                            NEWSCATCHER_API_HOST=os.environ.get("NEWSCATCHER_API_HOST"))


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=7876)