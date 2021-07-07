from flask import Flask, jsonify, make_response, render_template
from flask_cors import CORS
import os

app = Flask(__name__, static_url_path="/static", static_folder='./static/')
cors = CORS(app)

@app.errorhandler(404)
def not_found(error):
    return render_template('error.html')


@app.route('/')
def index():
    return render_template('index.html', 
                            NEWSCATCHER_API_ENDPOINT=os.environ.get("NEWSCATCHER_API_ENDPOINT"),
                            NEWSCATCHER_API_KEY=os.environ.get("NEWSCATCHER_API_KEY"),
                            NEWSCATCHER_API_HOST=os.environ.get("NEWSCATCHER_API_HOST"))


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=7876)