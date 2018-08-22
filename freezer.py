from flask_frozen import Freezer
from app import app, Bowie

app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_DESTINATION'] = 'docs'

freezer = Freezer(app)

@freezer.register_generator
def show():
    for song in Bowie.query.all():
        yield { 'index': song.index }

if __name__ == '__main__':
    freezer.freeze()