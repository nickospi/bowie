from flask import Flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bowie_data.db'
db = SQLAlchemy(app)



class Bowie(db.Model):
  __tablename__ = 'bowie_songs'
  __table_args__ = {
    'autoload': True,
    'autoload_with': db.engine
  }
  index = db.Column(db.Integer, primary_key=True)


@app.route("/")
def hello():
  return "This is a cool website about bowie"



@app.route("/songs/")
def list():
  songs = Bowie.query.all()
  return render_template("list.html", songs=songs)



@app.route("/songs/<index>/")
def show(index):
  song = Bowie.query.filter_by(index=index).first()
  return render_template("show.html", song=song)



if __name__ == "__main__":
  app.run(debug=True)
