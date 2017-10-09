from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from models import db
from run import app

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

# python3 migrate.py db init
# python3 migrate.py db migrate
# python3 migrate.py db upgrade
if __name__ == '__main__':
    manager.run()
